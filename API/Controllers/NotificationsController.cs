using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    //[Authorize]
    public class NotificationsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPhotoService _photoService;

        public NotificationsController(IMapper mapper, IUnitOfWork unitOfWork, IPhotoService photoService)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _photoService = photoService;
        }

        [HttpGet("{id}")] 
        public async Task<ActionResult<NotificationDto>> GetNotificationAsync(int id)
        {
            AppUser user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            
            if(user == null) return Unauthorized();

            var notificationItem = await _unitOfWork.NotificationRepository.GetNotificationByIdAsync(id);
            
            if(notificationItem == null) return NotFound();
    
            var notificationDto = _mapper.Map<NotificationDto>(notificationItem);

            return Ok(notificationDto);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<NotificationDto>>> GetNotificationsForPage([FromQuery] NotificationParams notificationParams)
        {
            //lineParams.CurrentLineId = _unitOfWork.LineRepository.
            AppUser user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            
            if(user == null) return Unauthorized();

            var notifications = await _unitOfWork.NotificationRepository.GetNotificationsAsync(notificationParams);

            Response.AddPaginationHeader(notifications.CurrentPage, notifications.PageSize, notifications.TotalCount, notifications.TotalPages);

            return Ok(notifications);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateNotification(NotificationDto notificationUpdateDto)
        {
            AppUser user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            
            if(user == null) return Unauthorized();

            Notification notificationItem  = await _unitOfWork.NotificationRepository.GetNotificationAsync(notificationUpdateDto);
            
            if (notificationItem == null) return NotFound();

            _mapper.Map(notificationUpdateDto, notificationItem);

            _unitOfWork.NotificationRepository.UpdateNotificationAsync(notificationItem);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update notification");
        }


        [HttpPost("add-photo/{notificationId}")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file, int notificationId)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            
            if(user == null) return Unauthorized();

            var notification = await _unitOfWork.NotificationRepository.GetNotificationByIdAsync(notificationId);

            if(notification == null) return NotFound();

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                AppUser = user,
                NotificationId = notificationId,
                Notification = notification
            };


            notification.Photos.Add(photo);            
            

            //user.Photos.Add(photo);
            

            if (await _unitOfWork.Complete())
            {
                return _mapper.Map<PhotoDto>(photo);
                //return CreatedAtRoute("GetUser", _mapper.Map<PhotoDto>(photo));
                //return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<PhotoDto>(photo));
                //return CreatedAtRoute("GetNotification", new { notification = notification.Id }, _mapper.Map<PhotoDto>(photo));
            }

            return BadRequest("Problem adding photo");
        }

        [HttpDelete("{notificationId}/delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId, int notificationId)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            if(user == null) return Unauthorized();

            var notification = await _unitOfWork.NotificationRepository.GetNotificationByIdAsync(notificationId);

            if(notification == null) return NotFound();

            var photo = notification.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            notification.Photos.Remove(photo);

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Failed to delete the photo");
        }

    }
}
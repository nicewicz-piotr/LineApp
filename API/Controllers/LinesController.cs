using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
    //[Authorize]
    public class LinesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPhotoService _photoService;
        public LinesController(IMapper mapper, IUnitOfWork unitOfWork, IPhotoService photoService)
        {
            _photoService = photoService;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<LineDto>> CreateLine(LineDto lineDto)
        {
            AppUser user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            
            if(user == null) return Unauthorized();

            var lineItem = new Line
            {
                Symbol = lineDto.Symbol,
                Description = lineDto.Description,
                Length = lineDto.Length,
                Notifications = null
            };

            await _unitOfWork.LineRepository.AddLineAsync(lineItem);

            if (await _unitOfWork.Complete()) 
                return StatusCode(StatusCodes.Status201Created);
            //Ok(_mapper.Map<LineDto>(lineItem));

            return BadRequest("Failed to create line");
        }

        /*with notifications dto*/
        [HttpGet("{id}")] 
        public async Task<ActionResult<LineDto>> GetLineAsync(int id)
        {
            AppUser user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            
            if(user == null) return Unauthorized();

            var lineItem = await _unitOfWork.LineRepository.GetLineByIdAsync(id);
            
            if(lineItem == null) return NotFound();
    
            var lineDto = _mapper.Map<LineDto>(lineItem);

            return Ok(lineDto);
        }        

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LineDto>>> GetLinesForPage([FromQuery] LineParams lineParams)
        {
            AppUser user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            
            if(user == null) return Unauthorized();

            //if(string.IsNullOrEmpty(lineParams.LineSymbol)){}
            //    lineParams.LineSymbol = 

            var lines = await _unitOfWork.LineRepository.GetLinesAsync(lineParams);

            Response.AddPaginationHeader(lines.CurrentPage, lines.PageSize, lines.TotalCount, lines.TotalPages);

            return Ok(lines);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLine(int id)
        {
            AppUser user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            
            if(user == null) return Unauthorized();

            Line lineItem = await _unitOfWork.LineRepository.GetLineByIdAsync(id);

            if (lineItem == null) return NotFound();

            _unitOfWork.LineRepository.DeleteLine(lineItem);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Problem deleting that line");
        }

        [HttpPut]
        public async Task<ActionResult> UpdateLine(LineDto lineUpdateDto)
        {
            AppUser user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            
            if(user == null) return Unauthorized();

            Line lineItem  = await _unitOfWork.LineRepository.GetLineAsync(lineUpdateDto);

            if (lineItem == null) return NotFound();

            _mapper.Map(lineUpdateDto, lineItem);

            _unitOfWork.LineRepository.UpdateLineAsync(lineItem);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update line");
        }

        [HttpPost("add-notification")]
        public async Task<ActionResult> AddNotification([FromForm] Request request)        
        {
            List<Photo> photos = new List<Photo>();
            List<IFormFile> files = request.files;
            string jsonData = request.jsonData;

            
            AppUser user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            
            if(user == null) return Unauthorized();

            NotificationDto notificationDto = JsonConvert.DeserializeObject<NotificationDto>(jsonData);
            
            Line lineItem = await _unitOfWork.LineRepository.GetLineByIdAsync(notificationDto.LineId);

            if(lineItem == null) return NotFound(); 


            var result = await _photoService.AddPhotosAsync(files);

            foreach(ImageUploadResult item in result)
            {
                if (item.Error != null) return BadRequest(item.Error.Message);    
            }

            Notification notification = new Notification
            {
                AppUser = user,
                UserId = user.Id,
                Line = lineItem,
                LineId = lineItem.Id,
            };

             

            result.ForEach(r => {
                                    Photo photo = new Photo {
                                           Url = r.SecureUrl.AbsoluteUri, 
                                           PublicId = r.PublicId, 
                                           AppUser = user, 
                                           Notification = notification};   
                                    photos.Add(photo);
                                });
            

            _mapper.Map(notificationDto, notification);

            photos.ForEach(p => notification.Photos.Add(p));
   

            lineItem.Notifications.Add(notification);
            
            if (await _unitOfWork.Complete())

                return StatusCode(StatusCodes.Status201Created//, new {
                    //UserId = user.Id,
                    //LineId = lineItem.Id,
                    //Id = notification.Id
                /*}*/); //CreatedAtAction(); CreatedAtRoute

            return BadRequest("Problem adding notification");
        }

        [HttpDelete("delete-notification/{notificationId}")]
        public async Task<ActionResult> DeleteNotification(int notificationId)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            if(user == null) return Unauthorized();

            Notification notification = await _unitOfWork.NotificationRepository.GetNotificationByIdAsync(notificationId);

            if (notification == null) return NotFound();
            
             _unitOfWork.NotificationRepository.DeleteNotification(notification);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Problem deleting that notification");
        }
    }

    public class Request
    {
        public List<IFormFile> files { get; set; } 
        public string jsonData { get; set; } 
    }
}
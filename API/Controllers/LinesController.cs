using System.Collections.Generic;
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
    public class LinesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public LinesController(IMapper mapper, IUnitOfWork unitOfWork)
        {
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
            
            //if(user == null) return Unauthorized();

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
        public async Task<ActionResult<PhotoDto>> AddNotification(NotificationDto notificationDto)
        {
            AppUser user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            
            if(user == null) return Unauthorized();

            Line lineItem = await _unitOfWork.LineRepository.GetLineByIdAsync(notificationDto.LineId);

            if(lineItem == null) return NotFound(); 

            Notification notification = new Notification
            {
                AppUser = user,
                UserId = user.Id,
                Line = lineItem,
                LineId = lineItem.Id
            };

            _mapper.Map(notificationDto, notification);

            lineItem.Notifications.Add(notification);

            if (await _unitOfWork.Complete())
                return StatusCode(StatusCodes.Status201Created); //CreatedAtAction(); CreatedAtRoute

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
}
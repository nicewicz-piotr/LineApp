using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class NotificationDto
    {
        public int Id { get; set; }
        public int LineId { get; set; }
        //public LineDto Line { get; set; }
        //public UserDto User { get; set; }
        public  int UserId { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public string Description { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
    }
}
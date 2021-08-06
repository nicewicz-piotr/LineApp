using System.Collections.Generic;
using API.DTOs;

namespace API.Entities
{
    public class LineDto
    {
        public int Id { get; set; }
        public string Symbol { get; set; }
        public double Length { get; set; }
        public string Description { get; set; }
        public ICollection<NotificationDto> Notifications { get; set; }
    }
}
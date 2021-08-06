using System.Collections.Generic;

namespace API.DTOs
{
    public class UserDto
    {
        public string UserName { get; set; }
        public string Token { get; set; }
        public string Company { get; set; }
        public string Department { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public ICollection<NotificationDto> Notifications { get; set; }
    }
}
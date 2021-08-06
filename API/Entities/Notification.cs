using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System;

namespace API.Entities
{
    [Table("Notifications")]
    public class Notification
    {
        public int Id { get; set; }
        public int LineId { get; set; }
        public Line Line { get; set; }
        public int UserId { get; set ;}
        public AppUser AppUser { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public string Description { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}
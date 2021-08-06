using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace API.Entities
{
    [Table("Lines")]
    public class Line
    {
        public Line()
        {
            this.Notifications = new HashSet<Notification>();
        }

        public int Id { get; set; }
        public string Symbol { get; set; }
        public double Length { get; set; }
        public string Description { get; set; }
        public ICollection<Notification> Notifications { get; set; }

    }
}
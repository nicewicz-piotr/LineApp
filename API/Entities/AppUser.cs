using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser :IdentityUser<int>
    {
        public string Company { get; set; }
        public string Department { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
        public ICollection<Notification> Notifications { get; set; }

    }
}
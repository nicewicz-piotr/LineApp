using System.Collections.Generic;
using System.Linq;
//using System.Security.Cryptography;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if(await userManager.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/SeedDataJson/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            if(users == null) return;

            var roles = new List<AppRole>
            {
                new AppRole{Name = "User"},
                new AppRole{Name = "Admin"},
                //new AppRole{Name = "Moderator"},
                //you can add here new roles
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach(var user in users)
            {
                //using var hmac = new HMACSHA512();

                user.UserName = user.UserName.ToLower();



                await userManager.CreateAsync(user, "Pa$$w0rd");

                await userManager.AddToRoleAsync(user, "User");


                //user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$word"));
                //user.PasswordSalt = hmac.Key;
                //context.Users.Add(user);
            }

            var admin = new AppUser
            {
                UserName = "admin",
                Department = "XXX",
                Company = "Phizer",
                Email = "nicewicz.piotr@gmail.com",
                PhoneNumber = "99922555"
            };

            await userManager.CreateAsync(admin, "Pa$$w0rd");

            await userManager.AddToRolesAsync(admin, new[] {"Admin"});


            //await context.SaveChangesAsync();
        }

        public static async Task SeedLines(DataContext context)
        {
            if(await context.Lines.AnyAsync()) return;

            var lineData = await System.IO.File.ReadAllTextAsync("Data/SeedDataJson/LineSeedData.json");
            var lines = JsonSerializer.Deserialize<List<Line>>(lineData);
            if(lines == null) return;

            
            await context.Lines.AddRangeAsync(lines);
            await context.SaveChangesAsync();

        }

        public static async Task SeedNotifications(DataContext context)
        {
            if(await context.Notifications.AnyAsync()) return;

            var notificationData = await System.IO.File.ReadAllTextAsync("Data/SeedDataJson/NotificationSeedData.json");
            var notifications = JsonSerializer.Deserialize<List<Notification>>(notificationData);
            if(notifications == null) return;

            await context.Notifications.AddRangeAsync(notifications);
            await context.SaveChangesAsync();
        }

        public static async Task SeedPhotos(DataContext context)
        {
            if(await context.Notifications.AnyAsync() == false) return;

            var photoData = await System.IO.File.ReadAllTextAsync("Data/SeedDataJson/PhotoSeedData.json");
            var photos = JsonSerializer.Deserialize<List<Photo>>(photoData);
            if(photos == null) return;

            await context.Photos.AddRangeAsync(photos);
            await context.SaveChangesAsync();
        }

        public static async Task TruncateTablesResetIndexes(DataContext context)
        {

            // await context.Database.ExecuteSqlRawAsync("DELETE FROM sqlite_sequence WHERE name = Lines;");
            // await context.Database.ExecuteSqlRawAsync("DELETE FROM sqlite_sequence WHERE name = AspNetUsers;");
            // await context.Database.ExecuteSqlRawAsync("DELETE FROM sqlite_sequence WHERE name = Notifications;");
            // await context.Database.ExecuteSqlRawAsync("DELETE FROM sqlite_sequence WHERE name = AspNetUserRoles;");

            await context.Database.ExecuteSqlRawAsync("DELETE FROM AspNetUserRoles;");
            await context.Database.ExecuteSqlRawAsync("DELETE FROM Photos;");
            await context.Database.ExecuteSqlRawAsync("DELETE FROM Notifications;");
            await context.Database.ExecuteSqlRawAsync("DELETE FROM AspNetUsers;");
            await context.Database.ExecuteSqlRawAsync("DELETE FROM Lines;");
            await context.Database.ExecuteSqlRawAsync("DELETE FROM AspNetRoles;");

            await context.Database.ExecuteSqlRawAsync("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='Lines';");
            await context.Database.ExecuteSqlRawAsync("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='AspNetUsers';");
            await context.Database.ExecuteSqlRawAsync("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='Notifications';");
            await context.Database.ExecuteSqlRawAsync("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='Photos';");
            await context.Database.ExecuteSqlRawAsync("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='AspNetUserRoles';");
            await context.Database.ExecuteSqlRawAsync("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='AspNetRoles';");


        }
    }
}
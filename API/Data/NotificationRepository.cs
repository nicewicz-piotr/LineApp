using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public NotificationRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Notification> GetNotificationAsync(NotificationDto notification)
        {
            return await _context.Notifications.Include(s => s.Line)
            .Include(s => s.AppUser)
            .SingleOrDefaultAsync(l => l.Id == notification.Id);
        }

        public async Task<Notification> GetNotificationByIdAsync(int id)
        {
            return await _context.Notifications
              .Include(i => i.Photos)
              .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Notification>> GetNotificationsAsync()
        {
            return await _context.Notifications.Include(p => p.Photos).ToListAsync();
        }

        public async Task<PagedList<NotificationDto>> GetNotificationsAsync(NotificationParams notificationParams)
        {
            var query = _context.Notifications.AsQueryable();

            return await PagedList<NotificationDto>.CreateAsync(query.ProjectTo<NotificationDto>(_mapper.
            ConfigurationProvider).AsNoTracking(), notificationParams.PageNumber, notificationParams.PageSize);
        }

        public void UpdateNotificationAsync(Notification notification)
        {
            _context.Entry(notification).State = EntityState.Modified;
        }

        public void DeleteNotification(Notification notification)
        {
            _context.Notifications.Remove(notification);
        }
    
       
    }
}
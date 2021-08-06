using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface INotificationRepository
    {
        Task<IEnumerable<Notification>> GetNotificationsAsync();
        Task<Notification> GetNotificationByIdAsync(int id);
        Task<PagedList<NotificationDto>> GetNotificationsAsync(NotificationParams notificationParams);
        void UpdateNotificationAsync(Notification notification);
        Task<Notification> GetNotificationAsync(NotificationDto notification);
        void DeleteNotification(Notification notification);
    }
}
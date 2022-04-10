using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILineRepository
    {
        Task<IEnumerable<Line>> GetLinesAsync();
        Task<Line> GetLineByIdAsync(int id);
        Task<LineWithPagedPhotosDto> GetLineByIdAsync(int id, LineParams lineParams);
        Task<Line> GetLineBySymbolAsync(string symbol);
        Task<PagedList<LineDto>> GetLinesAsync(LineParams lineParams);
        
        //przenieść do inotificationrepository
        /*
        Task<PagedList<NotificationDto>> GetNotificationsForLineAsync(NotificationParams notificationParams, int id);
        */

        Task AddLineAsync(Line line);
        void DeleteLine(Line line);
        void UpdateLineAsync(Line line);
        Task<Line> GetLineAsync(LineDto line);
    } 
}
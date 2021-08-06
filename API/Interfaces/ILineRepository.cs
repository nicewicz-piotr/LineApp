using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILineRepository
    {
        Task<IEnumerable<Line>> GetLinesAsync();
        Task<Line> GetLineByIdAsync(int id);
        Task<Line> GetLineBySymbolAsync(string symbol);
        Task<PagedList<LineDto>> GetLinesAsync(LineParams lineParams);
        Task AddLineAsync(Line line);
        void DeleteLine(Line line);
        void UpdateLineAsync(Line line);
        Task<Line> GetLineAsync(LineDto line);
    } 
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LineRepository : ILineRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public LineRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task AddLineAsync(Line line)
        {
            await _context.Lines.AddAsync(line);
        }

        public void DeleteLine(Line line)
        {
            _context.Lines.Remove(line);
        }

        public async Task<Line> GetLineByIdAsync(int id)
        {
            return await _context.Lines
              .Include(i => i.Notifications)
              .FirstOrDefaultAsync(x => x.Id == id);
            //return await _context.Lines.FindAsync(id);
            //return await .FindAsync(id).Include(p => p.Notifications).
        }

        public async Task<Line> GetLineBySymbolAsync(string symbol)
        {
            return await _context.Lines
            //.Include(p => p.Notifications)
            .SingleOrDefaultAsync(u => u.Symbol == symbol);
        }

        public async Task<IEnumerable<Line>> GetLinesAsync()
        {
            return await _context.Lines.Include(p => p.Notifications).ToListAsync();
        }

        public void UpdateLineAsync(Line line)
        {
            _context.Entry(line).State = EntityState.Modified;
        }

        public async Task<Line> GetLineAsync(LineDto line)
        {
            return await _context.Lines.SingleOrDefaultAsync(l => l.Id == line.Id);
        }

        public async Task<PagedList<LineDto>> GetLinesAsync(LineParams lineParams)
        {
            var query = _context.Lines.AsQueryable();
            
            if(!string.IsNullOrEmpty(lineParams.SearchText))
            {
                int.TryParse(lineParams.SearchText, out int id);

                query = lineParams.SearchBy switch 
                {
                    "symbol" => query.Where(u => u.Symbol.Contains(lineParams.SearchText.ToUpper())),
                    "id"  =>  query.Where(u => u.Id == id),

                    _ => query.Where(u => u.Symbol.Contains(lineParams.SearchText.ToUpper()))
                };
                //query = query.Where(u => u.Symbol.Contains(lineParams.SearchBy.ToUpper()));
            }
                
                //if(!string.IsNullOrEmpty(lineParams.SearchBy))
                //query = query.Where(u => u.Symbol == lineParams.LineSymbol);
                //query = query.Where(u => u.Symbol.Contains(lineParams.LineSymbol.ToUpper()));



            // query = query.Where(u => u.UserName != userParams.CurrentUsername);
            // query = query.Where(u => u.Gender == userParams.Gender);

            // var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            // var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

            // query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);

            // query = userParams.OrderBy switch 
            // {
            //     "created" => query.OrderByDescending(u => u.Created),
            //     _ => query.OrderByDescending(u => u.LastActive)
            // };

            query = lineParams.OrderBy switch 
            {
                "notificationsAmountAsc" => query.OrderBy(u => u.Notifications.Count),
                "notificationsAmountDesc" => query.OrderByDescending(u => u.Notifications.Count),
                "idAsc" => query.OrderBy(u => u.Id),
                "idDesc" => query.OrderByDescending(u => u.Id),
                "symbolAsc" => query.OrderBy(u => u.Symbol),
                "symbolDesc" => query.OrderByDescending(u => u.Symbol),
                "lengthAsc" => query.OrderBy(u => u.Length),
                "lengthDesc" => query.OrderByDescending(u => u.Length),
                
                _ => query.OrderBy(u => u.Id)
            };

            return await PagedList<LineDto>.CreateAsync(query.ProjectTo<LineDto>(_mapper.
            ConfigurationProvider).AsNoTracking(), lineParams.PageNumber, lineParams.PageSize);

            // return await PagedList<MemberDto>.CreateAsync(query.ProjectTo<MemberDto>(_mapper.
            // ConfigurationProvider).AsNoTracking(), userParams.PageNumber, userParams.PageSize);
        }

    }
}
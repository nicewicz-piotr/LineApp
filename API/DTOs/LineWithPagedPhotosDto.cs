using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.DTOs
{
    public class LineWithPagedPhotosDto
    {
        public LineDto line;
        public PagedList<PhotoDto> pagedListOfPhotos;
    }
}
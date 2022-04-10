using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.DTOs
{
    public class LineWithPagedPhotosDto
    {
        public PagedList<PhotoDto> pagedListOfPhotos;
        public Line line;

    }
}
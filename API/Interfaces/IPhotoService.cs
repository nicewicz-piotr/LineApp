using System.Collections.Generic;
using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace API.Interfaces
{
    public interface IPhotoService
    {
        Task<List<ImageUploadResult>> AddPhotosAsync(IEnumerable<IFormFile> files);
        Task<DeletionResult> DeletePhotoAsync(string publicId);
    }
}
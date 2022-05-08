using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;
using API.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace API.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary;
        private readonly IOptions<CloudinarySettings> _config;

        public PhotoService(IOptions<CloudinarySettings> config)
        {
            _config = config;

            var acc = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        public async Task<List<ImageUploadResult>> AddPhotosAsync(IEnumerable<IFormFile> files)
        {
            var uploadResult = new ImageUploadResult();

            List<ImageUploadResult> uploadResultsList = new List<ImageUploadResult>();

            foreach(IFormFile file in files ?? Enumerable.Empty<IFormFile>())
            {
                if(file.Length > 0)
                {
                    using var stream  = file.OpenReadStream(); //get our file as an stream of data
                
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Height(500).Width(500).Crop("fill"),//.Gravity("face"), // settings of image
                        Folder = _config.Value.Folder
                    };

                    uploadResult = await _cloudinary.UploadAsync(uploadParams); // upload to cloudinary
                    uploadResultsList.Add(uploadResult);  
                }

            }

            return uploadResultsList;
        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);

            var result = await _cloudinary.DestroyAsync(deleteParams);

            return result;
        }
    }
}
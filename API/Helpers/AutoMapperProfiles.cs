using System;
using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // CreateMap<AppUser, MemberDto>().ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
            // .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            
            CreateMap<Line, LineDto>();
            CreateMap<LineDto, Line>();
            CreateMap<Photo, PhotoDto>();
            CreateMap<AppUser, UserDto>();
            CreateMap<Notification, NotificationDto>();
            
            CreateMap<NotificationDto, Notification>().
            ForMember(x => x.LineId, opt => opt.Ignore()).
            ForMember(x => x.UserId, opt => opt.Ignore());
            //CreateMap<MemberUpdateDto, AppUser>();

            CreateMap<RegisterDto, AppUser>();
            
            // CreateMap<Message, MessageDto>()
            // .ForMember(dest => dest.SenderPhotoUrl, opt => opt.MapFrom(src => src.Sender.Photos.FirstOrDefault(x => x.IsMain).Url))
            // .ForMember(dest => dest.RecipientPhotoUrl, opt => opt.MapFrom(src => src.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}
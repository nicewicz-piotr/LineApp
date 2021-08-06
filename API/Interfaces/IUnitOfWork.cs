using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        ILineRepository LineRepository { get; }
        IUserRepository UserRepository { get; }
        INotificationRepository NotificationRepository { get; }

        //IMessageRepository MessageRepository { get; }

         //ILikesRepository LikesRepository { get; }

         Task<bool> Complete();

         bool HasChanges();
    }
}
using KFC_API.Models;
using KFC_API.Services.EmailService.EmailSetting;

namespace KFC_API.Services.EmailService
{
    public interface IEmailService
    {
         Task SendEmail(MailRequest emailrequest);
    }
}

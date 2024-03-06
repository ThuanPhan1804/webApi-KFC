namespace KFC_API.Services.EmailService.EmailSetting
{
    public class MailRequest
    {
        public string To { get; set; } = string.Empty;


        public string Subject { get; set; } = string.Empty;

        public string Body { get; set; } = string.Empty;
    }
}

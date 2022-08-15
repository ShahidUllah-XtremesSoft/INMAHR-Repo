using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace INMA.HR.Services
{
    public class EmailService
    {

        //public void SendEmail(object Name, object Subject, object Email, object Message)
        //{
        //    try
        //    {
        //        // Thread.Sleep(10000);
        //        var body = "<p><b>Email<b>: {0} ({1})</p><p></p><p>{2}</p>";
        //        var message = new MailMessage();

        //        message.From = new MailAddress("oraksoft@gmail.com", "Shjc Client".ToString());               // replace with valid value
        //        message.To.Add(new MailAddress("matiullahzahirr@gmail.com".ToString()));                                          // replace with valid value

        //        message.Subject = Subject.ToString();
        //        message.Body = string.Format(body, Name, Email, Message);

        //        message.IsBodyHtml = true;
        //        using (var smtp = new SmtpClient())
        //        {
        //            var credential = new NetworkCredential
        //            {
        //                UserName = "oraksoft@gmail.com",  // replace with valid value
        //                Password = "Kfbygh49615194"             // replace with valid value
        //            };
        //            smtp.Credentials = credential;
        //            //  smtp.Host = "smtp-mail.outlook.com";
        //            smtp.Host = "smtp.gmail.com";
        //            smtp.Port = 587;

        //            smtp.EnableSsl = true;
        //            smtp.UseDefaultCredentials = false;
        //            smtp.Send(message);

        //        }

        //    }
        //    catch (Exception ex)
        //    {

        //        ex.ToString();
        //    }
        //}

        //internal class GmailService : IEmailService
        //{
        //    private string hostName = "smtp.gmail.com";
        //    private int port = 587;
        //    private bool sslEnabled = true;
        //    private string senderName = "Dotnetglance.com";
        //    private string senderEmailAddress = string.Empty;
        //    private string senderPassword = string.Empty;


          //  public async Task Send(object Name, object Subject, object Email, object Message)
            public async Task SendEmail(string receiver, string subject, string message, bool isHtmlBody = true)
            {
                try
                {
                    var senderEmail = new MailAddress("shjeng.crm@gmail.com", "Sharjah Engineering Consultants".ToString());
                    var receiverEmail = new MailAddress(receiver, receiver);
                    var password = "qiazrhcxauznjcqu";  //shjeng1122 is real password
                    var sub = subject;
                    var body = message;
                    var smtp = new SmtpClient
                    {
                        Host = "smtp.gmail.com",
                        Port = 587,
                        UseDefaultCredentials = false,
                        EnableSsl = true,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        Credentials = new NetworkCredential(senderEmail.Address, password)
                    };
                   // smtp.SendCompleted += EmailSendComplete;
                    using (var mess = new MailMessage(senderEmail, receiverEmail)
                    {
                        Subject = subject,
                        Body = body,
                        IsBodyHtml = isHtmlBody,
                    })
                    {
                        //smtp.Send(mess);
                      await smtp.SendMailAsync(mess);
                    }
                }
                catch (SmtpFailedRecipientsException ex)
                {
                    throw ex;
                }
                catch (SmtpFailedRecipientException ex)
                {
                    throw ex;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }


            // Event call on success Or On Failure of sending the email.. 
            //private void EmailSendComplete(object sender, System.ComponentModel.AsyncCompletedEventArgs e)
            //{
            //    // https://myaccount.google.com/u/0/lesssecureapps?pli=1&rapt=AEjHL4NFulYl7wbittQ0alCtGctUsjatGuTdcG3EGoQXQp2qFgIxNJKHNsqs2qDdRTJjJaDipUYUSpYnPuMev1oaq-UxjljS_A
            //    if (e.Error != null)
            //    {
            //        this._logger.Error(TraceFor.Communication, e.Error, this.GetType().Name, "Send", "Gmail");
            //    }
            //    this._logger.Information(TraceFor.Communication, this.GetType().Name, "EmailSendComplete", "Email Send");
            //}
        }


   // }
}


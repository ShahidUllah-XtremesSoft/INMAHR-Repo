using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


using System.IO;
using System.Net;
using System.Net.Mail;
using System.Threading;
using System.Web;
using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services;

namespace INMA.Projects.Services.Commands
{
    public class SMSService
    {
        public int SendSMS(string receiverNumber, string messageBody,string title = null,int projectId=0, int clientId=0, int employeeId=0, int userId = 0)
        {
            try
            {
                
                ServicePointManager.Expect100Continue = true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                string html = string.Empty;
                //string url = @"http://api.m4sms.com/api/sendsms?id=xtremessoft&pass=123456789&mobile=" + receiverNumber + "&brandname=XtremesSoft&msg=" + messageBody + "&language=English";
                string url = @"http://www.smartsmsgateway.com/api/api_http.php?username=xxxx&password=xxxxx&senderid=SMS%20Title&to=971522324409&text=SMS%20Description&type=text&datetime=2022-05-10";
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.AutomaticDecompression = DecompressionMethods.GZip;

                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                using (Stream stream = response.GetResponseStream())
                using (StreamReader reader = new StreamReader(stream))
                {
                    html = reader.ReadToEnd();
                }
                SMSModel model = new SMSModel();

                model.Id = 0;
                model.Title = title;
                model.Description = messageBody;
                model.ReceiverNumber = receiverNumber;
                model.Project_Id = projectId;
                model.Client_Id = clientId;
                model.HR_Employee_Id = employeeId;
                model.UserId = userId;
                model.Language = "en-US";
                


                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetSingle<dynamic>(ProjectStoreProcedure.SMS_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);
            }
            catch (Exception)
            {
                return 0;
            }
            return 1;
        }
    }
    public class SMSModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ReceiverNumber { get; set; }
        public int Project_Id { get; set; }
        public int Client_Id { get; set; }
        public int HR_Employee_Id { get; set; }
        public int UserId { get; set; }
        public string Language { get; set; }
    }
}

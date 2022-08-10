using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services;
using System.Collections.Generic;

namespace INMA.Projects.Services.Commands.Email
{

    public class SMSCommand
    {
       

        [Command(Name = "MeetingDetails_SendByEmail")]
        public class MeetingDetails_SendByEmailCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {

                object result = new { status = false, returnUrl = "#" };


                var model = base.MappedModel(new
                {
                     Title =string.Empty,
                    ClientEmail = string.Empty,
                    MeetingEmail = string.Empty,
                  
                }, viewInput);


                //  new EmailService().SendEmail("", model.Title, model.ClientEmail, model.Description + model.Remarks);
                new EmailService().SendEmail(model.ClientEmail, model.Title, model.MeetingEmail, true);
                
                return 0;
            //    return repository.GetMultiple<dynamic>(ProjectStoreProcedure.SMS_GetAll.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
    }
}

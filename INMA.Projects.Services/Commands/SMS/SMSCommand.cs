using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.Projects.Services.Commands.SMS
{
    public class SMSCommand
    {
        [Command(Name = "SMS_GetAll")]
        public class SMS_GetAllCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {

                object result = new { status = false, returnUrl = "#" };


                var model = base.MappedModel(new
                {                    
                    Language = string.Empty
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(ProjectStoreProcedure.SMS_GetAll.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
    }
}

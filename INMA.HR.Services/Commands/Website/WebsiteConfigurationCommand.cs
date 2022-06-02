using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services.Commands.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using XtremeTech.FileUploader;

namespace INMA.HR.Services
{
 


    [Command(Name = "Website_Configuration_Get")]
    public class Website_Configuration_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {

            object result = new { status = false, returnUrl = "#" };

            var model = base.MappedModel(new
            {
                Language = string.Empty,
                MainApplicationModule_Id = 0
            }, v);
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Website_Configuration_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }
    

    [Command(Name = "Website_Services_Get")]
    public class Website_Services_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {

            object result = new { status = false, returnUrl = "#" };
             
            var model = base.MappedModel(new { 
                Language = string.Empty,
                MainApplicationModule_Id = 0 }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Website_Services_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }

  



}

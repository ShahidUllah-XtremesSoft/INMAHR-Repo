using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services;
using INMA.HR.Services.Commands.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using XtremeTech.FileUploader;

namespace INMA.Projects.Services.Common
{



    [Command(Name = "HR_Employee_GetAll")]
    public class HR_Employye_GetAllCommand : CamelCommandBase
    {
        #region ========== GLOBAL PARAMETERS

        object result = new { status = false, returnUrl = "#" };
        IDictionary<string, object> values = new Dictionary<string, object>();
        CommandParameters _params = new CommandParameters(); 
        #endregion

        protected override object DoAction(object v)
        {
            var model = MappedModel(new { Language = string.Empty }, v);
            values = _params.Get(model);
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.HR_Employee_GetAll.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
}

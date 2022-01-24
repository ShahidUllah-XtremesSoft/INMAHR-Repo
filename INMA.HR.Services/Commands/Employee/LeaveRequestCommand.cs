using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services.Commands.Employee
{

    #region Employee_AllLeaves_Get 

 
    [Command(Name = "Employees_Request_Leave_Get")]
    public class Employees_Request_Leave_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
              //  CreatedBy = 0,
                LoggedInUserId = string.Empty,
                LoggedInUserRoleId = 0,
                LoggedInUserDepartmentId = 0,
                Language = string.Empty,

            }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            // Old sp Employee_AllLeaves_Get
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.Employees_Request_Leave_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion

    #region BULK  Employees_Request_Leave_ApproveOrDecline 

    [Command(Name = "Employees_Request_Leave_ApproveOrDecline")]
    public class Employees_Request_Leave_ApproveOrDeclineCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {

                LoggedInUser = string.Empty,
                LoggedInUserDepartmentId = 0,
                RequestIds = string.Empty,
                Status = string.Empty,
                Comment = string.Empty,
                Language = string.Empty,

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var response = repository.GetSingle<dynamic>(StoreProcedure.Employees_Request_Leave_ApproveOrDecline.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return response;

        }
    }

    #endregion

}

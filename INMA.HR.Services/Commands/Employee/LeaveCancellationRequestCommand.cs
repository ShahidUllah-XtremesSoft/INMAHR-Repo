using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services.Commands.Employees
{

    [Command(Name = "Employees_Request_Leave_Cancellation_Get")]
    public class Employees_Request_Leave_Cancellation_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
             //   CreatedBy = 0,
                LoggedInUserId = string.Empty,
                LoggedInUserRoleId = 0,
                LoggedInUserDepartementId = 0,
                Language = string.Empty,

            }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.Employees_Request_Leave_Cancellation_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #region BULK  Request_Employee_Short_Leaves_Save


    [Command(Name = "Request_Employee_Cancel_Leaves_ApprovedORDeclined")]
    public class Request_Employee_Cancel_Leaves_ApprovedORDeclinedCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                EmployeeRequestData = new List<EmployeesCancelLeaveData>(),
                // Language = string.Empty
            }, viewInput); ;


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);

            var table = new KeyValuePair<string, DataTable>("[dbo].[UD_Request_Employee_Cancel_Leaves_ApprovedORDeclined]", ExtensionMethods.ToDataTable(model.EmployeeRequestData));
            var ProductList = new Dictionary<string, KeyValuePair<string, DataTable>>();
            ProductList.Add("@UD_Request_Employee_Cancel_Leaves_ApprovedORDeclined", table);
            var response = repository.GetMultipleWithTableValuParam<dynamic>(StoreProcedure.Request_Employee_Cancel_Leaves_ApprovedORDeclined.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.connectionString);
            return response.ToList()[0];

        }

    }
    #endregion

}

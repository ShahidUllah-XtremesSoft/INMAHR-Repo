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

    #region Employees_Request_Letter_Get 

    [Command(Name = "Employees_Request_Letter_Get")]
    public class Employees_Request_Letter_GetCommand : CamelCommandBase
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
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.Employees_Request_Letter_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion

    #region BULK  Employees_Request_Leave_ApproveOrDecline
     
    [Command(Name = "Employees_Request_Letter_ApproveOrDecline")]
    public class Employees_Request_Letter_ApproveOrDeclineCommand : CamelCommandBase
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
            var response = repository.GetSingle<dynamic>(StoreProcedure.Employees_Request_Letter_ApproveOrDecline.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return response;

        }
    }


    //[Command(Name = "Request_Employee_AllLetter_Save")]
    //public class Request_Employee_AllLetter_SaveCommand : CamelCommandBase
    //{
    //    protected override object DoAction(object viewInput)
    //    {
    //        var model = base.MappedModel(new
    //        {
    //            EmployeeRequestLetterData = new List<EmployeeRequestLetterData>(),               
    //        }, viewInput); ;


    //        var repository = Ioc.Resolve<IRepository>();
    //        IDictionary<string, object> values = new Dictionary<string, object>();
    //        CommandParameters _params = new CommandParameters();

    //        values = _params.Get(model);

    //        var table = new KeyValuePair<string, DataTable>("[dbo].[UD_Request_Employee_AllLetter_Save]", ExtensionMethods.ToDataTable(model.EmployeeRequestLetterData));
    //        var ProductList = new Dictionary<string, KeyValuePair<string, DataTable>>();
    //        ProductList.Add("@UD_Request_Employee_AllLetter_Save", table);
    //        var response = repository.GetMultipleWithTableValuParam<dynamic>(StoreProcedure.Request_Employee_AllLetter_Save.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.connectionString);
    //        return response.ToList()[0];

    //    }

    //}
    #endregion


}

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
    //[Command(Name = "Request_ShortLeave_Save")]
    //public class Request_ShortLeave_SaveCommand : CamelCommandBase
    //{
    //    protected override object DoAction(object v)
    //    {
    //        var model = base.MappedModel(new
    //        {
    //            Id = 0,
    //            RequestDate = string.Empty,
    //            StartTime = string.Empty,
    //            EndTime = string.Empty,
    //            NumberOfHours = "0",
    //            CreatedBy = 0,
    //            Language = string.Empty,

    //        }, v);


    //        var repository = Ioc.Resolve<IRepository>();
    //        IDictionary<string, object> values = new Dictionary<string, object>();
    //        CommandParameters _params = new CommandParameters();

    //        values = _params.Get(model);
    //        var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_ShortLeave_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

    //        return _response;
    //    }
    //}
    //[Command(Name = "Request_ShortLeave_Get")]
    //public class Request_ShortLeave_GetCommand : CamelCommandBase
    //{
    //    protected override object DoAction(object viewInput)
    //    {
    //        var model = base.MappedModel(new
    //        {
    //            //Id = 0,
    //            //CreatedBy = 0,
    //            //Language = string.Empty,
    //            Id = 0,
    //            CreatedBy = 0,
    //            LoggedInUserId = string.Empty,
    //            LoggedInUserRoleId = 0,
    //            LoggedInUserDepartementId = 0,
    //            Language = string.Empty,

    //        }, viewInput);


    //        var repository = Ioc.Resolve<IRepository>();
    //        IDictionary<string, object> values = new Dictionary<string, object>();
    //        CommandParameters _params = new CommandParameters();

    //        values = _params.Get(model);
    //        var _response = repository.GetMultiple<dynamic>(StoreProcedure.Request_ShortLeave_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

    //        return _response;
    //    }
    //}
    //[Command(Name = "Request_ShortLeave_Delete")]
    //public class Request_ShortLeave_DeleteCommand : CamelCommandBase
    //{
    //    protected override object DoAction(object v)
    //    {
    //        var model = base.MappedModel(new
    //        {
    //            Id = 0,
    //            Language = string.Empty

    //        }, v);


    //        var repository = Ioc.Resolve<IRepository>();
    //        IDictionary<string, object> values = new Dictionary<string, object>();
    //        CommandParameters _params = new CommandParameters();

    //        values = _params.Get(model);
    //        var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_ShortLeave_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

    //        return _response;
    //    }
    //}
    //[Command(Name = "Request_ShortLeave_GetEmployeeAvailableBalance")]
    //public class Request_ShortLeave_GetEmployeeAvailableBalanceCommand : CamelCommandBase
    //{
    //    protected override object DoAction(object v)
    //    {
    //        var model = base.MappedModel(new
    //        {
    //            CreatedBy = 0,
    //            Language = string.Empty

    //        }, v);


    //        var repository = Ioc.Resolve<IRepository>();
    //        IDictionary<string, object> values = new Dictionary<string, object>();
    //        CommandParameters _params = new CommandParameters();

    //        values = _params.Get(model);
    //        var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_ShortLeave_GetEmployeeAvailableBalance.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

    //        return _response;
    //    }
    //}
    //[Command(Name = "Request_ShortLeave_ApproveOrDecline")]
    //public class Request_ShortLeave_ApproveOrDeclineCommand : CamelCommandBase
    //{
    //    protected override object DoAction(object v)
    //    {
    //        var model = base.MappedModel(new
    //        {
    //            LoggedInUser = 0,
    //            LoggedInUserDepartmentId = 0,
    //            RoleId = 0,
    //            RequestId = 0,
    //            CreatedBy = 0,
    //            Status = string.Empty,
    //            Comment = string.Empty,
    //            Language = string.Empty

    //        }, v);


    //        var repository = Ioc.Resolve<IRepository>();
    //        IDictionary<string, object> values = new Dictionary<string, object>();
    //        CommandParameters _params = new CommandParameters();

    //        values = _params.Get(model);
    //        var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_ShortLeave_ApproveOrDecline.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

    //        return _response;
    //    }
    //}


    [Command(Name = "Request_All_Employee_ShortLeave_GetBySuperiorRole")]
    public class Request_All_Employee_ShortLeave_GetBySuperiorRoleCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
              
                Id = 0,
                CreatedBy = 0,
                LoggedInUserId = string.Empty,
                LoggedInUserRoleId = 0,
                LoggedInUserDepartementId = 0,
                Language = string.Empty,

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.Request_All_Employee_ShortLeave_GetBySuperiorRole.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }

    #region BULK  Request_Employee_Short_Leaves_Save


    [Command(Name = "Request_Employee_Short_Leaves_Save")]
    public class Request_Employee_Short_Leaves_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                EmployeeRequestData = new List<EmployeesShortLeaveData>(),
                // Language = string.Empty
            }, viewInput); ;


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);

            var table = new KeyValuePair<string, DataTable>("[dbo].[UD_Request_Employee_Short_Leaves_Save]", ExtensionMethods.ToDataTable(model.EmployeeRequestData));
            var ProductList = new Dictionary<string, KeyValuePair<string, DataTable>>();
            ProductList.Add("@UD_Request_Employee_Short_Leaves_Save", table);
            var response = repository.GetMultipleWithTableValuParam<dynamic>(StoreProcedure.Request_Employee_Short_Leaves_Save.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.connectionString);
            return response.ToList()[0];

        }

    }
    #endregion

}

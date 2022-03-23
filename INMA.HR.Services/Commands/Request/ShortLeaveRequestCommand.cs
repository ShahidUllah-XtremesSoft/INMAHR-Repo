using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services.Commands.Request
{
    [Command(Name = "Request_ShortLeave_Save")]
    public class Request_ShortLeave_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                RequestDate = string.Empty,
                StartTime = string.Empty,
                EndTime = string.Empty,
                NumberOfHours = "0",
                CreatedBy = 0,
                LeaveTypeId = 0,
                LeaveTypeName = string.Empty,
                Language = string.Empty,

            }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
           // var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_ShortLeave_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);   OLD SP IS WORKING BUT COMMENTED DUE TO CHANGES
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_ShortLeave_Save_New.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    [Command(Name = "Request_ShortLeave_Get")]
    public class Request_ShortLeave_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                //Id = 0,
                //CreatedBy = 0,
                //Language = string.Empty,
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
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.Request_ShortLeave_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    [Command(Name = "Request_ShortLeave_Delete")]
    public class Request_ShortLeave_DeleteCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                Language = string.Empty

            }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_ShortLeave_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    [Command(Name = "Request_ShortLeave_GetEmployeeAvailableBalance")]
    public class Request_ShortLeave_GetEmployeeAvailableBalanceCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                CreatedBy = 0,
                Language = string.Empty

            }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_ShortLeave_GetEmployeeAvailableBalance.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    [Command(Name = "Request_ShortLeave_ApproveOrDecline")]
    public class Request_ShortLeave_ApproveOrDeclineCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                LoggedInUser = 0,
                LoggedInUserDepartmentId = 0,
                RoleId = 0,
                RequestId = 0,
                CreatedBy = 0,
                Status = string.Empty,
                Comment = string.Empty,
                Language = string.Empty

            }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_ShortLeave_ApproveOrDecline.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    [Command(Name = "Request_ShortLeave_GetBySuperiorRole")]
    public class Request_ShortLeave_GetBySuperiorRoleCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                //Id = 0,
                //CreatedBy = 0,
                //Language = string.Empty,
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
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.Request_ShortLeave_GetBySuperiorRole.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
}

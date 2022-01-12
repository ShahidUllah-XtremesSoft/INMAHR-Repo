using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace INMA.HR.Services.Commands.Request
{
    [Command(Name = "Request_Leave_GetDropdown")]
    public class Request_Leave_GetDropdownCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                CreatedBy = 0,
                Language = string.Empty,

            }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            // string dynamicQuery = $"SELECT {model.Columns},0 [IsSelected] FROM {model.TableName} WHERE IsDeleted = 0 " + (string.IsNullOrEmpty(model.Conditions) == true ? "" : "AND " + model.Conditions);
            values = _params.Get(model);
            var response = repository.GetMultiple<dynamic>(StoreProcedure.Request_Leave_GetDropdown.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return response;

        }
    }


    [Command(Name = "Request_LeaveCancel_Save")]
    public class Request_Leave_Cancel_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                LeaveRequestId = 0,
                CommentEng = string.Empty,
                CommentArb = string.Empty,
                CreatedBy = 0,
                Language = string.Empty,

            }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_LeaveCancel_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }




    //[Command(Name = "Request_LeaveCancel_Get")]
    //public class Request_LeaveCancel_GetCommand : CamelCommandBase
    //{
    //    protected override object DoAction(object v)
    //    {
    //        var model = base.MappedModel(new
    //        {
    //            Language = string.Empty,

    //        }, v);


    //        var repository = Ioc.Resolve<IRepository>();
    //        IDictionary<string, object> values = new Dictionary<string, object>();
    //        CommandParameters _params = new CommandParameters();

    //        values = _params.Get(model);
    //        var _response = repository.GetMultiple<dynamic>(StoreProcedure.Request_LeaveCancel_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

    //        return _response;
    //    }
    //}
    [Command(Name = "Request_LeaveCancel_Get")]
    public class Request_LeaveCancel_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                CreatedBy = 0,
                LoggedInUserId = string.Empty,
                LoggedInUserRoleId = 0,
                LoggedInUserDepartementId = 0,
                Language = string.Empty,

            }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.Request_LeaveCancel_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }

    [Command(Name = "Request_LeaveCancel_Delete")]
    public class Request_LeaveCancel_DeleteCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                Language = string.Empty,
                UserID = 0,

            }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_LeaveCancel_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    [Command(Name = "Request_LeaveCancel_ApproveOrDecline")]
    public class Request_LeaveCancel_ApproveOrDeclineCommand : CamelCommandBase
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
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_LeaveCancel_ApproveOrDecline.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    [Command(Name = "Request_LeaveCancel_GetBySuperiorRole")]
    public class Request_LeaveCancel_GetBySuperiorRoleCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                CreatedBy = 0,
                LoggedInUserId = string.Empty,
                LoggedInUserRoleId = 0,
                LoggedInUserDepartementId = 0,
                Language = string.Empty,

            }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.Request_LeaveCancel_GetBySuperiorRole.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
}

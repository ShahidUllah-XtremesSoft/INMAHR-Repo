using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services.Commands.Request
{
    [Command(Name = "Request_Leave_Save")]
    public class Request_Leave_SaveCommand : CamelCommandBase
    {
        public IFileService Service;
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                StartDate = string.Empty,
                EndDate = string.Empty,
                TotalDays = 0,
                LeaveTypeId = 0,
                CreatedBy = 0,
                Leave_Remarks = string.Empty,
                Language = string.Empty,
                UploadedFiles = new List<FileUploadModel>()
            }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_Leave_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            if (model.UploadedFiles.Count > 0)
            {
                Service = new FileUploadService();
                foreach (var file in model.UploadedFiles)
                { 
                        Service.UploadFile(
                            file.CurrentFilePath, 
                            file.OriginalFileName, 
                            file.CurrentFileName, 
                            (int)EntityType.Requests, 
                            (int)_response.InsertedId, 
                            (int)DocumentType.Requests, 


                            XtremeFactory._factory, 
                            XtremeFactory.connectionString);
                    

                }
            }
            return _response;
        }
    }
    [Command(Name = "Request_Leave_Get")]
    public class Request_Leave_GetCommand : CamelCommandBase
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
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.Request_Leave_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    [Command(Name = "Request_Leave_Delete")]
    public class Request_Leave_DeleteCommand : CamelCommandBase
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
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_Leave_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    [Command(Name = "Request_Leave_GetEmployeeAvailableBalance")]
    public class Request_Leave_GetEmployeeAvailableBalanceCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                CreatedBy = 0,
                SetupTypeDetailId = 0,
                Language = string.Empty

            }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_Leave_GetEmployeeAvailableBalance.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    [Command(Name = "Request_Leave_ApproveOrDecline")]
    public class Request_Leave_ApproveOrDeclineCommand : CamelCommandBase
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
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_Leave_ApproveOrDecline.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    [Command(Name = "Request_Leave_GetBySuperiorRole")]
    public class Request_Leave_GetBySuperiorRoleCommand : CamelCommandBase
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
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.Request_Leave_GetBySuperiorRole.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
}

using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services;
using INMA.HR.Services.Common;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace INMA.Projects.Services.Project
{

    #region Notification GET

    [Command(Name = "Notification_Personal_GetAll")]
    public class Notification_Personal_GetAllCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            object result = new { status = false, returnUrl = "#" };


            var model = base.MappedModel(new
            {
                LoggedInUser = 0,
                RoleId = 0,
                LoggedInEmployeeId = 0,
                StartDate = string.Empty,
                EndDate = string.Empty,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Notification_Personal_GetAll.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    [Command(Name = "Notification_Employee_GetAll")]
    public class Notification_Employee_GetAllCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            object result = new { status = false, returnUrl = "#" };


            var model = base.MappedModel(new
            {
                LoggedInUser = 0,
                RoleId = 0,
                LoggedInEmployeeId = 0,
                StartDate = string.Empty,
                EndDate = string.Empty,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Notification_Employee_GetAll.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion


    #region Notification SAVE

    [Command(Name = "Notification_Save")]
    public class Notification_SaveCommand : CamelCommandBase
    {
        public IFileService Service;
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                CreatedBy = 0,

                Project_Id = 0,
                HR_Employee_Id = 0,

                DescriptionEng = string.Empty,
                DescriptionArb = string.Empty,
                Status = string.Empty,
                Setup_SetupType_Id = 0,
                Setup_SetupTypeDetail_Id = 0,


                Language = string.Empty,
                UploadedFiles = new List<FileUploadModel>()
            }, v);
            #region ==========  PARAMETERS

            object result = new { status = false, returnUrl = "#" };
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            #endregion

            values = _params.Get(model);

            var _response = Ioc.Resolve<IRepository>().GetSingle<dynamic>(ProjectStoreProcedure.Notification_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);


            if (model.UploadedFiles.Count > 0)
            {
                Service = new FileUploadService();
                foreach (var file in model.UploadedFiles)
                {
                    Service.UploadFile(
                        file.CurrentFilePath,
                        file.OriginalFileName,
                        file.CurrentFileName,
                        (int)EntityType.Notification,
                        (int)_response.InsertedId,
                        (int)DocumentType.NotificationAttachment,
                        XtremeFactory._factory, XtremeFactory.connectionString);

                }
            }
            return _response;

        }
    }
    #endregion

     
    #region Notification DETAILS BY ID 


    [Command(Name = "Notification_Details_By_Id")]
    public class Notification_Details_By_IdCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            object result = new { status = false, returnUrl = "#" };


            var model = base.MappedModel(new
            {

                Id = 0,
                LoggedInUser = 0,
                RoleId = 0,
                LoggedInEmployeeId = 0,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetSingle<dynamic>(ProjectStoreProcedure.Notification_Details_By_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region Notification DELETE 


    [Command(Name = "Notification_Delete")]
    public class Notification_DeleteCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            object result = new { status = false, returnUrl = "#" };


            var model = base.MappedModel(new
            {

                Id = 0,
                UserId = 0,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetSingle<dynamic>(ProjectStoreProcedure.Notification_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region Notification CHANGE STATUS  


    [Command(Name = "Notification_Change_Status")]
    public class Notification_Change_StatusCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            object result = new { status = false, returnUrl = "#" };


            var model = base.MappedModel(new
            {

                Notification_Id = 0,
                LoggedInUser = 0,
                RoleId = 0,
                LoggedInEmployeeId = 0
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetSingle<dynamic>(ProjectStoreProcedure.Notification_Change_Status.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
     


}

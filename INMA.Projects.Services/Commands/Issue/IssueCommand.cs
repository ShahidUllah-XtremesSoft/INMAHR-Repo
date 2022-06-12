using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services;
using INMA.HR.Services.Common;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace INMA.Projects.Services.Project
{

    #region Issue GET

    [Command(Name = "Issue_Get")]
    public class Issue_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            object result = new { status = false, returnUrl = "#" };


            var model = base.MappedModel(new
            {
                LoggedInUser = 0,
                RoleId = 0,
                LoggedInEmployeeId = 0,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Issue_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion


    #region Issue SAVE

    [Command(Name = "Issue_Save")]
    public class Issue_SaveCommand : CamelCommandBase
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

            var _response = Ioc.Resolve<IRepository>().GetSingle<dynamic>(ProjectStoreProcedure.Issue_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);


            if (model.UploadedFiles.Count > 0)
            {
                Service = new FileUploadService();
                foreach (var file in model.UploadedFiles)
                {
                    Service.UploadFile(
                        file.CurrentFilePath,
                        file.OriginalFileName,
                        file.CurrentFileName,
                        (int)EntityType.Issue,
                        (int)_response.InsertedId,
                        (int)DocumentType.IssueAttachment,
                        XtremeFactory._factory, XtremeFactory.connectionString);

                }
            }
            return _response;

        }
    }
    #endregion

    #region Issue EDIT BY ID 


    [Command(Name = "Issue_Edit_By_Id")]
    public class Issue_Edit_By_IdCommand : CamelCommandBase
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
            return repository.GetSingle<dynamic>(ProjectStoreProcedure.Issue_Edit_By_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region Issue DETAILS BY ID 


    [Command(Name = "Issue_Details_By_Id")]
    public class Issue_Details_By_IdCommand : CamelCommandBase
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
            return repository.GetSingle<dynamic>(ProjectStoreProcedure.Issue_Details_By_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region Issue DELETE 


    [Command(Name = "Issue_Delete")]
    public class Issue_DeleteCommand : CamelCommandBase
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
            return repository.GetSingle<dynamic>(ProjectStoreProcedure.Issue_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region Issue DELETE 


    [Command(Name = "Issue_Change_Status")]
    public class Issue_Change_StatusCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        { 
            object result = new { status = false, returnUrl = "#" }; 
            var model = base.MappedModel(new
            {

                Id = 0,
                UserId = 0,
                HR_Employee_Id = 0,
                Language = string.Empty,
                Status = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetSingle<dynamic>(ProjectStoreProcedure.Issue_Change_Status.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region Issue CHANGE STATUS  


    [Command(Name = "Issue_isRead_Change_Status")]
    public class Issue_isRead_Change_StatusCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            object result = new { status = false, returnUrl = "#" };


            var model = base.MappedModel(new
            {

                Id = 0,
                LoggedInUser = 0,
                RoleId = 0,
                LoggedInEmployeeId = 0
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetSingle<dynamic>(ProjectStoreProcedure.Issue_isRead_Change_Status.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion


}

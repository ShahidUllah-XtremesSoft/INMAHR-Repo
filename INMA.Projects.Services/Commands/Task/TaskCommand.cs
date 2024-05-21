using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services;
using System.Collections.Generic;

namespace INMA.Projects.Services.Project
{

    #region Task GET

    [Command(Name = "Project_Task_Get")]
    public class Project_Task_GetCommand : CamelCommandBase
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
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            IDictionary<string, object> values = _params.Get(model);
            return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Project_Task_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion


    #region Task SAVE

    [Command(Name = "Project_Task_Save")]
    public class Project_Task_SaveCommand : CamelCommandBase
    {
        public IFileService Service;
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                Title = string.Empty,
                Description = string.Empty,
                Employee_Id = 0,
                Project_Id = 0,
                Priority = string.Empty,
                Setup_Sub_Section_Id = string.Empty,
                StartDate = string.Empty,
                CompletionDate = string.Empty,
                CreatedBy = 0,
                Language = string.Empty,
                UploadedFiles = new List<FileUploadModel>()
            }, v);
            #region ==========  PARAMETERS

            object result = new { status = false, returnUrl = "#" };
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            #endregion

            values = _params.Get(model);

            var _response = Ioc.Resolve<IRepository>().GetSingle<dynamic>(ProjectStoreProcedure.Project_Task_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);


            if (model.UploadedFiles.Count > 0)
            {
                Service = new FileUploadService();
                foreach (var file in model.UploadedFiles)
                {
                    Service.UploadFile(
                        file.CurrentFilePath,
                        file.OriginalFileName,
                        file.CurrentFileName,
                        (int)EntityType.Tasks,
                        (int)_response.InsertedId,
                        (int)DocumentType.Tasks,
                        XtremeFactory._factory, XtremeFactory.connectionString);

                }
            }
            return _response;

        }
    }
    #endregion

    #region Task EDIT BY ID 


    [Command(Name = "Project_Task_Edit_By_Id")]
    public class Project_Task_Edit_By_IdCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            var model = base.MappedModel(new
            {

                Id = 0,
                LoggedInUser = 0,
                RoleId = 0,
                LoggedInEmployeeId = 0,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            IDictionary<string, object> values = _params.Get(model);
            return repository.GetDataSet<dynamic>(ProjectStoreProcedure.Project_Task_Edit_By_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion

    #region  PROJECT  TASK DELETE BY ID
    [Command(Name = "Project_Task_Delete_By_Id")]
    public class Project_Task_Delete_By_IdCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                CreatedBy = 0,
                Language = string.Empty
            }, viewInput);
            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);

            var _response = repository.GetSingle<dynamic>(ProjectStoreProcedure.Project_Task_Delete_By_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



            return _response;

        }
    }
    #endregion

    #region Task DETAILS BY ID 


    [Command(Name = "Project_Task_Detail_By_Id")]
    public class Project_Task_Detail_By_IdCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            var model = base.MappedModel(new
            {

                Id = 0,
                LoggedInUser = 0,
                RoleId = 0,
                LoggedInEmployeeId = 0,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            IDictionary<string, object> values = _params.Get(model);
            return repository.GetSingle<dynamic>(ProjectStoreProcedure.Project_Task_Detail_By_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region Task ATTACHMENT DETAILS BY ID 
    [Command(Name = "Project_Task_Attachment_By_Id")]
    public class Project_Task_Attachment_By_IdCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            var model = base.MappedModel(new
            {

                Id = 0,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Project_Task_Attachment_By_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region Task ATTACHMENT DETAILS BY ID 
    [Command(Name = "Project_Task_Log_by_TaskId")]
    public class Project_Task_Log_by_TaskIdCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            var model = base.MappedModel(new
            {

                Id = 0,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Project_Task_Log_by_TaskId.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion

    #region SUB TASK STATUS UPDATE BY EMPLOYEE 
    [Command(Name = "Project_Task_Log_Save")]
    public class Project_Task_Log_SaveCommand : CamelCommandBase
    {

        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Task_Multiple_Id = 0,
                FkTypeID = 0,
                Name = string.Empty,
                Status = string.Empty,
                Description = string.Empty,
                CreatedBy = 0,
                Type = string.Empty,
                Language = string.Empty

            }, viewInput);
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            var result = Ioc.Resolve<IRepository>().GetSingle<dynamic>(ProjectStoreProcedure.Project_Task_Log_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



            return result;

        }
    }

    #endregion
    
    #region SUB TASK  UPDATE BY EMPLOYEE
    [Command(Name = "Project_Sub_Task_Status_Update_By_Employee_Id")]
    public class Project_Sub_Task_Status_Update_By_Employee_IdCommand : CamelCommandBase
    {

        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Task_Multiple_Id = 0,
                Status = string.Empty,
                CreatedBy = 0

            }, viewInput);
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            var result = Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.Project_Sub_Task_Status_Update_By_Employee_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



            return result;

        }
    }

    #endregion
    #region PRE DEFINED MSGS
    [Command(Name = "Pre_Defined_MSGS_Get")]
    public class Pre_Defined_MSGS_GetCommand : CamelCommandBase
    {

        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Area = string.Empty,
                Language = string.Empty                

            }, viewInput);
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            var result = Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.Pre_Defined_MSGS_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



            return result;

        }
    }

    #endregion
    #region PROJECT TASK WITH DETAILS GET
    [Command(Name = "Project_Task_with_Details_Get")]
    public class Project_Task_with_Details_GetCommand : CamelCommandBase
    {

        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                LoggedInUser = 0,
                RoleId = 0,
                LoggedInEmployeeId = 0,
                Branch_Id = 0,
                Language = string.Empty

            }, viewInput);
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            var result = Ioc.Resolve<IRepository>().GetDataSet<dynamic>(ProjectStoreProcedure.Project_Task_with_Details_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



            return result;


        }
    }

    #endregion
  
}

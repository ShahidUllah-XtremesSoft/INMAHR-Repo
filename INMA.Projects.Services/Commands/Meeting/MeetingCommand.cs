using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services;
using INMA.HR.Services.Common;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace INMA.Projects.Services.Project
{

    #region Meeting GET

    [Command(Name = "Meeting_Get")]
    public class Meeting_GetCommand : CamelCommandBase
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
            return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Meeting_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion


    #region Meeting SAVE

    [Command(Name = "Meeting_Save")]
    public class Meeting_SaveCommand : CamelCommandBase
    {
        public IFileService Service;
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                CreatedBy = 0,
                TotalMinute = 0,
                TotalVisit = 0,
                Project_Id = 0,
                HR_Employee_Id = 0,
                Client_Id = 0,
                MeetingDate = string.Empty,
                StartedTime = string.Empty,
                EndedTime = string.Empty,
                DescriptionEng = string.Empty,
                Status = string.Empty,


                Language = string.Empty,
                UploadedFiles = new List<FileUploadModel>()
            }, v);
            #region ==========  PARAMETERS

            object result = new { status = false, returnUrl = "#" };
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            #endregion

            values = _params.Get(model);

            var _response = Ioc.Resolve<IRepository>().GetSingle<dynamic>(ProjectStoreProcedure.Meeting_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);


            if (model.UploadedFiles.Count > 0)
            {
                Service = new FileUploadService();
                foreach (var file in model.UploadedFiles)
                {
                    Service.UploadFile(
                        file.CurrentFilePath,
                        file.OriginalFileName,
                        file.CurrentFileName,
                        (int)EntityType.Meetings,
                        (int)_response.InsertedId,
                        (int)DocumentType.Meetings,
                        XtremeFactory._factory, XtremeFactory.connectionString);

                }
            }
            return _response;

        }
    }
    #endregion

    //#region Meeting EDIT BY ID 


    //[Command(Name = "Meeting_Edit_By_Id")]
    //public class Meeting_Edit_By_IdCommand : CamelCommandBase
    //{
    //    protected override object DoAction(object viewInput)
    //    {

    //        object result = new { status = false, returnUrl = "#" };


    //        var model = base.MappedModel(new
    //        {

    //            Id = 0,
    //            LoggedInUser = 0,
    //            RoleId = 0,
    //            LoggedInEmployeeId = 0,
    //            Language = string.Empty
    //        }, viewInput);


    //        var repository = Ioc.Resolve<IRepository>();
    //        IDictionary<string, object> values = new Dictionary<string, object>();
    //        CommandParameters _params = new CommandParameters();

    //        values = _params.Get(model);
    //        return repository.GetSingle<dynamic>(ProjectStoreProcedure.Meeting_Edit_By_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

    //    }
    //}
    //#endregion
    //#region Meeting DETAILS BY ID 


    //[Command(Name = "Meeting_Details_By_Id")]
    //public class Meeting_Details_By_IdCommand : CamelCommandBase
    //{
    //    protected override object DoAction(object viewInput)
    //    {

    //        object result = new { status = false, returnUrl = "#" };


    //        var model = base.MappedModel(new
    //        {

    //            Id = 0,
    //            LoggedInUser = 0,
    //            RoleId = 0,
    //            LoggedInEmployeeId = 0,
    //            Language = string.Empty
    //        }, viewInput);


    //        var repository = Ioc.Resolve<IRepository>();
    //        IDictionary<string, object> values = new Dictionary<string, object>();
    //        CommandParameters _params = new CommandParameters();

    //        values = _params.Get(model);
    //        return repository.GetSingle<dynamic>(ProjectStoreProcedure.Meeting_Details_By_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

    //    }
    //}
    //#endregion
    //#region Meeting DELETE 


    //[Command(Name = "Meeting_Delete")]
    //public class Meeting_DeleteCommand : CamelCommandBase
    //{
    //    protected override object DoAction(object viewInput)
    //    {

    //        object result = new { status = false, returnUrl = "#" };


    //        var model = base.MappedModel(new
    //        {

    //            Id = 0,
    //            UserId = 0,
    //            Language = string.Empty
    //        }, viewInput);


    //        var repository = Ioc.Resolve<IRepository>();
    //        IDictionary<string, object> values = new Dictionary<string, object>();
    //        CommandParameters _params = new CommandParameters();

    //        values = _params.Get(model);
    //        return repository.GetSingle<dynamic>(ProjectStoreProcedure.Meeting_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

    //    }
    //}
    //#endregion

    //#region Meeting PERSONAL DOCUMENT SAVE

    //[Command(Name = "Meeting_PersonalDocument_Save")]
    //public class Meeting_PersonalDocument_SaveCommand : CamelCommandBase
    //{
    //    public IFileService Service;

    //    protected override object DoAction(object viewInput)
    //    {
    //        var model = base.MappedModel(new
    //        {
    //            PersonalDocumentId = 0,
    //            PersonalDocumentSetupDetailTypeId = 0,
    //            PersonalDocumentReleaseDate = string.Empty,
    //            PersonalDocumentExpiryDate = string.Empty,
    //            PersonalDocumentMeetingId = 0,
    //            PersonalDocumentCreatedBy = 0,
    //            GenericFkId = 0,
    //            PersonalDocumentLanguage = string.Empty,
    //            UploadedFiles = new List<FileUploadModel>()

    //        }, viewInput);


    //        var repository = Ioc.Resolve<IRepository>();
    //        IDictionary<string, object> values = new Dictionary<string, object>();
    //        CommandParameters _params = new CommandParameters();
    //        values = _params.Get(model);
    //        var _response = repository.GetSingle<dynamic>(ProjectStoreProcedure.Meeting_PersonalDocument_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);


    //        if (model.UploadedFiles.Count > 0 && _response.Type == "success")
    //        {
    //            Service = new FileUploadService();
    //            foreach (var file in model.UploadedFiles)
    //            {
    //                Service.UploadFile(
    //                    file.CurrentFilePath,
    //                    file.OriginalFileName,
    //                    file.CurrentFileName, (int)EntityType.Meeting, (int)_response.InsertedId, (int)DocumentType.MeetingPersonalDocument, XtremeFactory._factory, XtremeFactory.connectionString);

    //            }
    //        }
    //        return _response;

    //    }

    //}
    //#endregion
    //#region  Meeting PERSONAL DOCUMENT LIST
    //[Command(Name = "Meeting_PersonalDocument_Get")]
    //public class Meeting_PersonalDocument_GetCommand : CamelCommandBase
    //{
    //    protected override object DoAction(object viewInput)
    //    {
    //        var model = base.MappedModel(new
    //        {
    //            //   PersonalDocumentId = 0,
    //            //   PersonalDocumentEmployeeId = 0,
    //            PersonalMeeting_Id = 0,
    //            PersonalDocumentLanguage = string.Empty,

    //        }, viewInput);


    //        var repository = Ioc.Resolve<IRepository>();
    //        IDictionary<string, object> values = new Dictionary<string, object>();
    //        CommandParameters _params = new CommandParameters();
    //        values = _params.Get(model);
    //        return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Meeting_PersonalDocument_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

    //    }
    //}
    //#endregion
    //#region  Meeting PERSONAL DOCUMENT DELETE BY ID
    //[Command(Name = "Meeting_PersonalDocument_Delete")]
    //public class Meeting_PersonalDocument_DeleteCommand : CamelCommandBase
    //{
    //    protected override object DoAction(object viewInput)
    //    {
    //        var model = base.MappedModel(new
    //        {
    //            Id = 0,
    //            CreatedBy = 0,
    //            Language = string.Empty
    //        }, viewInput);


    //        var repository = Ioc.Resolve<IRepository>();
    //        IDictionary<string, object> values = new Dictionary<string, object>();
    //        CommandParameters _params = new CommandParameters();
    //        values = _params.Get(model);
    //        return repository.GetSingle<dynamic>(ProjectStoreProcedure.Meeting_PersonalDocument_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

    //    }
    //}
    //#endregion

}

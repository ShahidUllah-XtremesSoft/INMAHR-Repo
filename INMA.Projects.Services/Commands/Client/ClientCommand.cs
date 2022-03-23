using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services;
using INMA.HR.Services.Common;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace INMA.Projects.Services.Project
{

    #region CLIENT GET

    [Command(Name = "Client_Get")]
    public class Client_GetCommand : CamelCommandBase
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
            return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Client_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion


    #region CLIENT SAVE

    [Command(Name = "Client_Save")]
    public class Client_SaveCommand : CamelCommandBase
    {
        public IFileService Service;
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                CreatedBy = 0,
                NameEng = string.Empty,
                NameArb = string.Empty,
                Email1 = string.Empty,
                Email2 = string.Empty,
                PhoneNumber1 = string.Empty,
                PhoneNumber2 = string.Empty,
                City_Id = 0,
                Nationality_Id = 0,
                Location = string.Empty,
                Language = string.Empty,
                UploadedFiles = new List<FileUploadModel>()
            }, v);
            #region ==========  PARAMETERS

            object result = new { status = false, returnUrl = "#" };
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            #endregion

            values = _params.Get(model);

            var _response = Ioc.Resolve<IRepository>().GetSingle<dynamic>(ProjectStoreProcedure.Client_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);
            // repository.GetSingle<dynamic>(StoreProcedure.HR_Employee_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);


            if (model.UploadedFiles.Count > 0)
            {
                Service = new FileUploadService();
                foreach (var file in model.UploadedFiles)
                {
                    Service.UploadFile(
                        file.CurrentFilePath,
                        file.OriginalFileName,
                        file.CurrentFileName,
                        (int)EntityType.Client,
                        (int)_response.InsertedId,
                        (int)DocumentType.ClientProfileImage,
                        XtremeFactory._factory, XtremeFactory.connectionString);

                }
            }
            return _response;

        }
    }
    #endregion

    #region CLIENT EDIT BY ID 


    [Command(Name = "Client_Edit_By_Id")]
    public class Client_Edit_By_IdCommand : CamelCommandBase
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
            return repository.GetSingle<dynamic>(ProjectStoreProcedure.Client_Edit_By_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region CLIENT DETAILS BY ID 


    [Command(Name = "Client_Details_By_Id")]
    public class Client_Details_By_IdCommand : CamelCommandBase
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
            return repository.GetSingle<dynamic>(ProjectStoreProcedure.Client_Details_By_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region CLIENT DELETE 


    [Command(Name = "Client_Delete")]
    public class Client_DeleteCommand : CamelCommandBase
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
            return repository.GetSingle<dynamic>(ProjectStoreProcedure.Client_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion

    #region CLIENT PERSONAL DOCUMENT SAVE

    [Command(Name = "Client_PersonalDocument_Save")]
    public class Client_PersonalDocument_SaveCommand : CamelCommandBase
    {
        public IFileService Service;

        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                PersonalDocumentId = 0,
                PersonalDocumentSetupDetailTypeId = 0,
                PersonalDocumentReleaseDate = string.Empty,
                PersonalDocumentExpiryDate = string.Empty,
                PersonalDocumentClientId = 0,
                PersonalDocumentCreatedBy = 0,
                GenericFkId = 0,
                PersonalDocumentLanguage = string.Empty,
                UploadedFiles = new List<FileUploadModel>()

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(ProjectStoreProcedure.Client_PersonalDocument_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);


            if (model.UploadedFiles.Count > 0 && _response.Type == "success")
            {
                Service = new FileUploadService();
                foreach (var file in model.UploadedFiles)
                {
                    Service.UploadFile(
                        file.CurrentFilePath,
                        file.OriginalFileName,
                        file.CurrentFileName, (int)EntityType.Client, (int)_response.InsertedId, (int)DocumentType.ClientPersonalDocument, XtremeFactory._factory, XtremeFactory.connectionString);

                }
            }
            return _response;

        }

    }
    #endregion
    #region  CLIENT PERSONAL DOCUMENT LIST
    [Command(Name = "Client_PersonalDocument_Get")]
    public class Client_PersonalDocument_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                //   PersonalDocumentId = 0,
                //   PersonalDocumentEmployeeId = 0,
                PersonalClient_Id = 0,
                PersonalDocumentLanguage = string.Empty,

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Client_PersonalDocument_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region  CLIENT PERSONAL DOCUMENT DELETE BY ID
    [Command(Name = "Client_PersonalDocument_Delete")]
    public class Client_PersonalDocument_DeleteCommand : CamelCommandBase
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
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetSingle<dynamic>(ProjectStoreProcedure.Client_PersonalDocument_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion

}

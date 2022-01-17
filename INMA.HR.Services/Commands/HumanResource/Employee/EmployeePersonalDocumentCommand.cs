using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services
{
    [Command(Name = "HR_Employee_PersonalDocument_Save")]
    public class HR_Employee_PersonalDocument_SaveCommand : CamelCommandBase
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
                PersonalDocumentEmployeeId = 0,
                PersonalDocumentCreatedBy = 0,
                PersonalDocumentLanguage = string.Empty,
                UploadedFiles = new List<FileUploadModel>()

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            IDictionary<string, object> ImageValues = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.HR_Employee_PersonalDocument_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);


            if (model.UploadedFiles.Count > 0)
            {
                Service = new FileUploadService();
                foreach (var file in model.UploadedFiles)
                {
                    Service.UploadFile(file.CurrentFilePath, file.OriginalFileName, file.CurrentFileName, (int)EntityType.Employee, (int)_response.InsertedId, (int)DocumentType.EmployeePersonalDocument, XtremeFactory._factory, XtremeFactory.connectionString);

                }
            }
            return _response;

        }

    }
    [Command(Name = "HR_Employee_PersonalDocument_Get")]
    public class HR_Employee_PersonalDocument_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new 
            {
                PersonalDocumentId = 0,
                PersonalDocumentEmployeeId = 0,
                PersonalDocumentLanguage = string.Empty ,                
               
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.HR_Employee_PersonalDocument_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }
    [Command(Name = "HR_Employee_PersonalDocument_Delete")]
    public class HR_Employee_PersonalDocument_DeleteCommand : CamelCommandBase
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
            return repository.GetSingle<dynamic>(StoreProcedure.HR_Employee_PersonalDocument_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }
    [Command(Name = "HR_Employee_PersonalDocument_GetNearToExpire")]
    public class HR_Employee_PersonalDocument_GetNearToExpireCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Language = string.Empty

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.HR_Employee_PersonalDocument_GetNearToExpire.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }
}

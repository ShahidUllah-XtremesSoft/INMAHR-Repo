using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services
{
    [Command(Name = "HR_Employee_EducationalDocument_Save")]
    public class HR_Employee_EducationalDocument_SaveCommand : CamelCommandBase
    {
        public IFileService Service;

        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                EducationalDocumentId = 0,
                EducationalDocumentDegreeNameEng = string.Empty,
                EducationalDocumentDegreeNameArb = string.Empty,
                EducationalDocumentInstituteEng = string.Empty,
                EducationalDocumentInstituteArb = string.Empty,
                EducationalDocumentReleaseDate = string.Empty,
                EducationalDocumentMarks = string.Empty,
                EducationalDocumentDegreeFromCountryId = 0,
                EducationalDocumentEmployeeId = 0,
                EducationalDocumentCreatedBy = 0,
                EducationalDocumentLanguage = string.Empty,
                UploadedFiles = new List<FileUploadModel>()

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            IDictionary<string, object> ImageValues = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.HR_Employee_EducationalDocument_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);


            if (model.UploadedFiles.Count > 0)
            {
                Service = new FileUploadService();
                foreach (var file in model.UploadedFiles)
                {
                    Service.UploadFile(file.CurrentFilePath, file.OriginalFileName, file.CurrentFileName, (int)EntityType.Employee, (int)_response.InsertedId, (int)DocumentType.EmployeeEducationalDocument, XtremeFactory._factory, XtremeFactory.connectionString);

                }
            }
            return _response;

        }

    }
    [Command(Name = "HR_Employee_EducationalDocument_Get")]
    public class HR_Employee_EducationalDocument_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                EducationalDocumentId = 0,
                EducationalDocumentEmployeeId = 0,
                EducationalDocumentLanguage = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.HR_Employee_EducationalDocument_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }
    [Command(Name = "HR_Employee_EducationalDocument_Delete")]
    public class HR_Employee_EducationalDocument_DeleteCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.HR_Employee_EducationalDocument_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }
}

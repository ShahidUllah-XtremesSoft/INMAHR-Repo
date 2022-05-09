using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services
{
    [Command(Name = "HR_CompanyDocument_Save")]
    public class HR_CompanyDocument_SaveCommand : CamelCommandBase
    {
        public IFileService Service;
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {
                Id = 0,
                NameEng = string.Empty,
                NameArb = string.Empty,
                DescriptionEng = string.Empty,
                DescriptionArb = string.Empty,
                IssueDate = string.Empty,
                ExpiryDate = string.Empty,
                CreatedBy = 0,
                Language = string.Empty,
                UploadedFiles = new List<FileUploadModel>()
            }, v);

            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            IDictionary<string, object> ImageValues = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.HR_CompanyDocuments_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            if (model.UploadedFiles.Count > 0)
            {
                Service = new FileUploadService();
                foreach (var file in model.UploadedFiles)
                {
                    Service.UploadFile(file.CurrentFilePath, file.OriginalFileName, file.CurrentFileName, (int)EntityType.Company, (int)_response.InsertedId, (int)DocumentType.CompanyDocument, XtremeFactory._factory, XtremeFactory.connectionString);
                }
            }
            return _response;
        }
    }


    [Command(Name = "HR_CompanyDocument_GetAll")]
    public class HR_CompanyDocument_GetAllCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { Language = string.Empty }, v);
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.HR_CompanyDocument_GetAll.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }

    [Command(Name = "HR_CompanyDocument_Delete")]
    public class HR_CompanyDocument_DeleteCommand : CamelCommandBase
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
            IDictionary<string, object> ImageValues = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            string procedure = StoreProcedure.HR_CompanyDocument_Delete.ToString();
            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(procedure, values, XtremeFactory._factory, XtremeFactory.connectionString);
            return _response;
        }
    }

    [Command(Name = "HR_CompanyDocuments_GetNearToExpire")]
    public class HR_CompanyDocuments_GetNearToExpireCommand : CamelCommandBase
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
            return repository.GetMultiple<dynamic>(StoreProcedure.HR_CompanyDocuments_GetNearToExpire.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }

}

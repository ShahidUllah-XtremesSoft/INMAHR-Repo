using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services
{
    [Command(Name = "HR_Rule_Save")]
    public class HR_Rule_SaveCommand : CamelCommandBase
    {
        public IFileService Service;
        protected override object DoAction(object v)
        { 
            var model = base.MappedModel(new
            {
                Id = 0,
                NameEng = string.Empty,
                NameArb = string.Empty,
                DescriptionEng = string.Empty,
                DescriptionArb = string.Empty, 
                CreatedBy = 0,
                Language = string.Empty,
                UploadedFiles = new List<FileUploadModel>()
            }, v);

            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>(); 
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.HR_Rule_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            if (model.UploadedFiles.Count > 0)
            {
                Service = new FileUploadService();
                foreach (var file in model.UploadedFiles)
                {
                    Service.UploadFile(
                        file.CurrentFilePath, 
                        file.OriginalFileName, 
                        file.CurrentFileName, 
                        (int)EntityType.Rule, 
                        (int)_response.InsertedId, 
                        (int)DocumentType.Rule_Document,
                        XtremeFactory._factory, XtremeFactory.connectionString);
                }
            }
            return _response;
        }
    }


    [Command(Name = "HR_Rule_List")]
    public class HR_Rule_ListCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        { 
            var model = base.MappedModel(new { EmployeeId=0, Language = string.Empty }, v);
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.HR_Rule_List.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }

    [Command(Name = "HR_Rule_Delete")]
    public class HR_Rule_DeleteCommand : CamelCommandBase
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
            var _response = repository.GetSingle<dynamic>(StoreProcedure.HR_Rule_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return _response;
        }
    }

    [Command(Name = "HR_Rule_UpdateStatus")]
    public class HR_Penalties_UpdateStatusCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                
                HR_CompanyRules_Id=0,
                EmployeeId=0,
                LoggedInUserId=0,
                Language = string.Empty
            }, v);

            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.HR_Rule_UpdateStatus.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return _response;
        }
    }

}

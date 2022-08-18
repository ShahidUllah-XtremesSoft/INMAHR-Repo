using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services
{
    [Command(Name = "HR_Penalty_Save")]
    public class HR_Penalty_SaveCommand : CamelCommandBase
    {
        public IFileService Service;
        protected override object DoAction(object v)
        { 
            var model = base.MappedModel(new
            {
                Id = 0,
                DepartmentId = 0,
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
            var _response = repository.GetSingle<dynamic>(StoreProcedure.HR_Penalty_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            if (model.UploadedFiles.Count > 0)
            {
                Service = new FileUploadService();
                foreach (var file in model.UploadedFiles)
                {
                    Service.UploadFile(
                        file.CurrentFilePath, 
                        file.OriginalFileName, 
                        file.CurrentFileName, 
                        (int)EntityType.Penalty, 
                        (int)_response.InsertedId, 
                        (int)DocumentType.Penalty_Document,
                        XtremeFactory._factory, XtremeFactory.connectionString);
                }
            }
            return _response;
        }
    }


    [Command(Name = "HR_Penalty_List")]
    public class HR_Penalty_ListCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        { 
            var model = base.MappedModel(new {EmployeeId=0, employee_Department_ParentId = 0, isHR = string.Empty, Language = string.Empty }, v);
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.HR_Penalty_List.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }

    [Command(Name = "HR_Penalty_Delete")]
    public class HR_Penalty_DeleteCommand : CamelCommandBase
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
            var _response = repository.GetSingle<dynamic>(StoreProcedure.HR_Penalty_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return _response;
        }
    }
    [Command(Name = "HR_Penalty_UpdateStatus")]
    public class HR_Penalty_UpdateStatusCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                HR_Penalty_Id = 0,
                EmployeeId = 0,
                LoggedInUserId = 0,
                Language = string.Empty
            }, v);

            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.HR_Penalty_UpdateStatus.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return _response;
        }
    }


}

using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services.Commands.Employee
{
    [Command(Name = "Employee_InternalLetter_GetNextNumber")]
    public class Employee_InternalLetter_GetNextNumberCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetSingle<dynamic>(StoreProcedure.Employee_InternalLetter_GetNextNumber.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }
    [Command(Name = "Employee_InternalLetter_Save")]
    public class Employee_InternalLetter_SaveCommand : CamelCommandBase
    {
        public IFileService Service;
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                LetterNumber = string.Empty ,
                LetterDate = string.Empty,
                Subject = string.Empty,
                SignedBy = 0,
                Body  = string.Empty,
                IsRead = false,
                IsImportant = false,
                Tag = string.Empty,
                DepartmentIds = string.Empty,
                CreatedBy = 0,
                Language   = string.Empty,
                UploadedFiles = new List<FileUploadModel>()

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Employee_InternalLetter_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            //if (model.UploadedFiles.Count > 0)
            //{                
            //    Service = new FileUploadService();
            //    foreach (var file in model.UploadedFiles)
            //    {
            //        Service.UploadFile(file.CurrentFilePath, file.OriginalFileName, file.CurrentFileName, (int)EntityType.InternalLetter, (int)_response.InsertedId, (int)DocumentType.InternalLetterAttachment, XtremeFactory._factory, XtremeFactory.connectionString);
            //
            //    }
            //}
            return _response;

        }
    }
    [Command(Name = "Employee_InternalLetter_Inbox_Get")]
    public class Employee_InternalLetter_Inbox_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                CreatedBy = 0,
                EmployeeDepartmentId = 0,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var response = repository.GetMultiple<dynamic>(StoreProcedure.Employee_InternalLetter_Inbox_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return response;

        }
    }
    [Command(Name = "Employee_InternalLetter_Outbox_Get")]
    public class Employee_InternalLetter_Outbox_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                CreatedBy = 0,
                EmployeeDepartmentId = 0,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var response = repository.GetMultiple<dynamic>(StoreProcedure.Employee_InternalLetter_Outbox_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return response;

        }
    }
    [Command(Name = "Employee_InternalLetter_GetById")]
    public class Employee_InternalLetter_GetByIdCommand : CamelCommandBase
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
            var response = repository.GetSingle<dynamic>(StoreProcedure.Employee_InternalLetter_GetById.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return response;

        }
    }
    [Command(Name = "Employee_InternalLetter_UpdateIsRead")]
    public class Employee_InternalLetter_UpdateIsReadCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                IsRead = false,
                LoggedInUserId = 0,
                LoggedInEmployeeDepartmentId = 0     ,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var response = repository.GetSingle<dynamic>(StoreProcedure.Employee_InternalLetter_UpdateIsRead.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return response;

        }
    }
    [Command(Name = "Employee_InternalLetter_Delete")]
    public class Employee_InternalLetter_DeleteCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                LoggedInEmployeeDepartmentId = 0,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var response = repository.GetSingle<dynamic>(StoreProcedure.Employee_InternalLetter_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return response;

        }
    }
}

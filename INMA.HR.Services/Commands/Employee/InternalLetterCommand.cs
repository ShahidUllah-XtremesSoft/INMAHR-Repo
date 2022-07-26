using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services.Common;
using System;
using System.Collections.Generic;
using System.Data;
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
    #region ================ Employee Internal Letter Forward =====================


    [Command(Name = "Employee_InternalLetter_Reply")]
    public class Employee_InternalLetter_ReplyCommand : CamelCommandBase
    {
        public IFileService Service;
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                LetterNumber = string.Empty,
                LetterDate = string.Empty,
                Subject = string.Empty,
                SignedBy = 0,
                Signature = string.Empty,
                Body = string.Empty,
                IsRead = false,
                IsImportant = false,
                Tag = string.Empty,
                DepartmentIds = string.Empty,
                CreatedBy = 0,
                Language = string.Empty,
                LetterStatus = string.Empty,
                Reciever_HR_Employee_Ids = string.Empty,
                UploadedFiles = new List<FileUploadModel>()

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Employee_InternalLetter_Reply.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            if (model.UploadedFiles.Count > 0)
            {
                Service = new FileUploadService();
                foreach (var file in model.UploadedFiles)
                {
                    Service.UploadFile(file.CurrentFilePath, file.OriginalFileName, file.CurrentFileName, (int)EntityType.InternalLetter, (int)_response.InsertedId, (int)DocumentType.InternalLetterAttachment, XtremeFactory._factory, XtremeFactory.connectionString);

                }
            }
            return _response;

        }
    }
    [Command(Name = "Employee_InternalLetter_Reply_Multiple")]
    public class Employee_InternalLetter_Reply_MultipleCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                InternalLetterData = new List<InternalLetterData>(),
                CreatedBy = 0,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);


            var table = new KeyValuePair<string, DataTable>("[dbo].[UD_Employee_InternalLetter_Save_Multiple]", ExtensionMethods.ToDataTable(model.InternalLetterData));
            var ProductList = new Dictionary<string, KeyValuePair<string, DataTable>>();
            ProductList.Add("@UD_Employee_InternalLetter_Save_Multiple", table);
            var response = repository.GetMultipleWithTableValuParam<dynamic>(StoreProcedure.Employee_InternalLetter_Reply_Multiple.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.connectionString);
            return response.ToList()[0];


        }

    }


    #endregion    
    #region ================ Employee Internal Letter Forward =====================


    [Command(Name = "Employee_InternalLetter_Forward")]
    public class Employee_InternalLetter_ForwardCommand : CamelCommandBase
    {
        public IFileService Service;
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                LetterNumber = string.Empty,
                LetterDate = string.Empty,
                Subject = string.Empty,
                SignedBy = 0,
                Signature = string.Empty,
                Body = string.Empty,
                IsRead = false,
                IsImportant = false,
                Tag = string.Empty,
                DepartmentIds = string.Empty,
                CreatedBy = 0,
                Language = string.Empty,
                LetterStatus = string.Empty,
                Reciever_HR_Employee_Ids = string.Empty,
                UploadedFiles = new List<FileUploadModel>()

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Employee_InternalLetter_Forward.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            if (model.UploadedFiles.Count > 0)
            {
                Service = new FileUploadService();
                foreach (var file in model.UploadedFiles)
                {
                    Service.UploadFile(file.CurrentFilePath, file.OriginalFileName, file.CurrentFileName, (int)EntityType.InternalLetter, (int)_response.InsertedId, (int)DocumentType.InternalLetterAttachment, XtremeFactory._factory, XtremeFactory.connectionString);

                }
            }
            return _response;

        }
    }
    [Command(Name = "Employee_InternalLetter_Forward_Multiple")]
    public class Employee_InternalLetter_Forward_MultipleCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                InternalLetterData = new List<InternalLetterData>(),
                CreatedBy = 0,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);


            var table = new KeyValuePair<string, DataTable>("[dbo].[UD_Employee_InternalLetter_Save_Multiple]", ExtensionMethods.ToDataTable(model.InternalLetterData));
            var ProductList = new Dictionary<string, KeyValuePair<string, DataTable>>();
            ProductList.Add("@UD_Employee_InternalLetter_Save_Multiple", table);
            var response = repository.GetMultipleWithTableValuParam<dynamic>(StoreProcedure.Employee_InternalLetter_Forward_Multiple.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.connectionString);
            return response.ToList()[0];


        }

    }


    #endregion
    [Command(Name = "Employee_InternalLetter_Save")]
    public class Employee_InternalLetter_SaveCommand : CamelCommandBase
    {
        public IFileService Service;
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                LetterNumber = string.Empty,
                LetterDate = string.Empty,
                Subject = string.Empty,
                SignedBy = 0,
                Signature = string.Empty,
                Body = string.Empty,
                IsRead = false,
                IsImportant = false,
                Tag = string.Empty,
                DepartmentIds = string.Empty,
                CreatedBy = 0,
                Language = string.Empty,
                Reciever_HR_Employee_Ids = string.Empty,
                LetterStatus = string.Empty,
                UploadedFiles = new List<FileUploadModel>()

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Employee_InternalLetter_Save_New.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            if (model.UploadedFiles.Count > 0)
            {
                Service = new FileUploadService();
                foreach (var file in model.UploadedFiles)
                {
                    Service.UploadFile(file.CurrentFilePath, file.OriginalFileName, file.CurrentFileName, (int)EntityType.InternalLetter, (int)_response.InsertedId, (int)DocumentType.InternalLetterAttachment, XtremeFactory._factory, XtremeFactory.connectionString);

                }
            }
            return _response;

        }
    }
    [Command(Name = "Employee_InternalLetter_Save_Multiple")]
    public class Employee_InternalLetter_Save_MultipleCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                InternalLetterData = new List<InternalLetterData>(),
                CreatedBy = 0,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);


            var table = new KeyValuePair<string, DataTable>("[dbo].[UD_Employee_InternalLetter_Save_Multiple]", ExtensionMethods.ToDataTable(model.InternalLetterData));
            var ProductList = new Dictionary<string, KeyValuePair<string, DataTable>>();
            ProductList.Add("@UD_Employee_InternalLetter_Save_Multiple", table);
            var response = repository.GetMultipleWithTableValuParam<dynamic>(StoreProcedure.Employee_InternalLetter_Save_Multiple.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.connectionString);
            return response.ToList()[0];


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
                EmployeeId = 0,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var response = repository.GetMultiple<dynamic>(StoreProcedure.Employee_InternalLetter_Inbox_Get_New.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
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
            var response = repository.GetMultiple<dynamic>(StoreProcedure.Employee_InternalLetter_Outbox_Get_New.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
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
            var response = repository.GetSingle<dynamic>(StoreProcedure.Employee_InternalLetter_GetById_New.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return response;

        }
    }
    [Command(Name = "Employee_InternalLetter_GetById_New_For_Reply")]
    public class Employee_InternalLetter_GetById_New_For_ReplyCommand : CamelCommandBase
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
            var response = repository.GetSingle<dynamic>(StoreProcedure.Employee_InternalLetter_GetById_New_For_Reply.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
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
                LoggedInEmployeeDepartmentId = 0,
                LoggedInEmployeeId = 0,
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
                LoggedInEmployeeId = 0,
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
    [Command(Name = "Employee_InternalLetter_Outbox_Delete")]
    public class Employee_InternalLetter_Outbox_DeleteCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                LoggedInEmployeeDepartmentId = 0,
                LoggedInEmployeeId = 0,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var response = repository.GetSingle<dynamic>(StoreProcedure.Employee_InternalLetter_Outbox_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return response;

        }
    }

    #region ========== Load Employees By Paramters
    [Command(Name = "Employee_InternalLetter_GetEmployeesByParameters")]
    public class Employee_InternalLetter_GetEmployeesByParametersCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                LoggedInUserId = 0,
                LoggedInEmployeeId = 0,
                LoggedInEmployeeDepartmentId = 0,
                DepartmentIds = string.Empty,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var response = repository.GetMultiple<dynamic>(StoreProcedure.Employee_InternalLetter_GetEmployeesByParameters.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return response;

        }
    }
    #endregion


    #region ============= Load Employee Signature 
    [Command(Name = "HR_Employee_Signature_Get")]
    public class HR_Employee_Signature_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {

                LoggedInEmployeeId = 0
                //LoggedInUserId = string.Empty,
                //LoggedInUserRoleId = 0,
                //LoggedInUserDepartementId = 0,
                //Language = string.Empty,


            }, v);


            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetSingle<dynamic>(StoreProcedure.HR_Employee_Signature_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
    #endregion 
    



}

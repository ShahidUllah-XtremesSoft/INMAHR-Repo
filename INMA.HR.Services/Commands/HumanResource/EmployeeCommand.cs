using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services.Commands.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using XtremeTech.FileUploader;

namespace INMA.HR.Services
{

    [Command(Name = "HR_Employee_Save")]
    public class HR_Employee_SaveCommand : CamelCommandBase
    {
        public IFileService Service;

        protected override object DoAction(object v)
        {
            //SharedUploadImage sharedUploadImage = new SharedUploadImage();

            //string AreaType = "Employee";


            object result = new { status = false, returnUrl = "#" };

            var model = base.MappedModel(new
            {
                Id = 0,
                NameEng = string.Empty,
                NameArb = string.Empty,
                Email = string.Empty,
                ProfessionId = 0,
                JoinDate = string.Empty,
                VisaSponsorshipId = 0,
                ContractTypeId = 0,
                Salary = 0,
                PhoneNumber = string.Empty,
                SocialStatusArb = string.Empty,
                SocialStatusEng = string.Empty,
                EIDNumber = string.Empty,
                NationalityId = 0,
                PassportNumber = string.Empty,
                ExpiryDate = string.Empty,
                ReleaseDate = string.Empty,
                VisaReleaseDate = string.Empty,
                VisaExpiryDate = string.Empty,
                OtherStatusEng = string.Empty,
                OtherStatusArb = string.Empty,
                //EmiratesOfResidencyEng = string.Empty,
                //EmiratesOfResidencyArb = string.Empty,
                EmiratesStateId = 0,
                MunicipalityCardNumber = string.Empty,
                MunicipalityCardReleaseDate = string.Empty,
                MunicipalityCardExpirtDate = string.Empty,
                DepartmentId = 0,
                CreatedBy = 0,
                Language = string.Empty,
                UploadedFiles = new List<FileUploadModel>()

            }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            IDictionary<string, object> ImageValues = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            // string procedure = model.Language == "English" ? StoreProcedure.HR_Employee_Save.ToString() : StoreProcedure.HR_Employee_SaveArb.ToString();
            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.HR_Employee_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);


            if (model.UploadedFiles.Count > 0)
            {
                Service = new FileUploadService();
                foreach (var file in model.UploadedFiles)
                {
                    Service.UploadFile(file.CurrentFilePath, file.OriginalFileName, file.CurrentFileName, (int)EntityType.Employee, (int)_response.InsertedId, (int)DocumentType.EmployeeProfileImage, XtremeFactory._factory, XtremeFactory.connectionString);

                }
            }
            return _response;

        }


        [Command(Name = "HR_Employee_GetAll")]
        public class HR_Employye_GetAllCommand : CamelCommandBase
        {
            protected override object DoAction(object v)
            {

                object result = new { status = false, returnUrl = "#" };


                var model = base.MappedModel(new { Language = string.Empty }, v);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.HR_Employee_GetAll.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
        }

        [Command(Name = "HR_Employee_GetAllForGrid")]
        public class HR_Employee_GetAllForGridCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {

                object result = new { status = false, returnUrl = "#" };


                var model = base.MappedModel(new
                {
                    LoggedInUser = 0,
                    RoleId = 0,
                    Language = string.Empty
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.HR_Employee_GetAllForGrid.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
        }



        [Command(Name = "HR_Employee_GetProfileById")]
        public class HR_Employee_GetProfileByIdCommand : CamelCommandBase
        {
            protected override object DoAction(object v)
            {

                object result = new { status = false, returnUrl = "#" };


                var model = base.MappedModel(new { Id = 0, Language = string.Empty }, v);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetSingle<dynamic>(StoreProcedure.HR_Employee_GetProfileById.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
        }


        [Command(Name = "HR_Employee_GetById")]
        public class HR_Employee_GetByIdCommand : CamelCommandBase
        {
            protected override object DoAction(object v)
            {

                object result = new { status = false, returnUrl = "#" };


                var model = base.MappedModel(new { Language = string.Empty, id = 0 }, v);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetSingle<dynamic>(StoreProcedure.HR_Employee_GetById.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
        }
    }


    
    [Command(Name = "HR_Employee_GetAll")]
    public class HR_Employye_GetAllCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {

            object result = new { status = false, returnUrl = "#" };


            var model = base.MappedModel(new { Language = string.Empty }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.HR_Employee_GetAll.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }

    [Command(Name = "HR_Employee_GetAllForGrid")]
    public class HR_Employee_GetAllForGridCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            object result = new { status = false, returnUrl = "#" };


            var model = base.MappedModel(new
            {
                LoggedInUser = 0,
                RoleId = 0,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.HR_Employee_GetAllForGrid.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }



    [Command(Name = "HR_Employee_GetProfileById")]
    public class HR_Employee_GetProfileByIdCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {

            object result = new { status = false, returnUrl = "#" };


            var model = base.MappedModel(new { Id = 0, Language = string.Empty }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetSingle<dynamic>(StoreProcedure.HR_Employee_GetProfileById.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }


    [Command(Name = "HR_Employee_GetById")]
    public class HR_Employee_GetByIdCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {

            object result = new { status = false, returnUrl = "#" };


            var model = base.MappedModel(new { Language = string.Empty, id = 0 }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetSingle<dynamic>(StoreProcedure.HR_Employee_GetById.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }


    [Command(Name = "HR_Employee_Delete")]
    public class HR_Employee_DeleteCommand : CamelCommandBase
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

            string procedure = StoreProcedure.HR_Employee_Delete.ToString();
            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(procedure, values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    [Command(Name = "HR_Employee_GetByNumber")]
    public class HR_Employee_GetByNumberCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            object result = new { status = false, returnUrl = "#" };


            var model = base.MappedModel(new
            {
                Language = string.Empty,
                EmployeeNumber = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetSingle<dynamic>(StoreProcedure.HR_Employee_GetByNumber.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    [Command(Name = "HR_Employee_Leave_TakenDetail_Get")]
    public class HR_Employee_Leave_TakenDetail_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                EmployeeId = 0,
                Language = string.Empty,               
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.HR_Employee_Leave_TakenDetail_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    [Command(Name = "HR_Employee_Leave_AvailableAndTakenDetail_Get")]
    public class HR_Employee_Leave_AvailableAndTakenDetail_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                EmployeeId = 0,
                Language = string.Empty,
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.HR_Employee_Leave_AvailableAndTakenDetail_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    [Command(Name = "HR_Employee_PopulateDropDown")]
    public class HR_Employee_PopulateDropDownCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                EmployeeId = 0,
                Language = string.Empty,
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.HR_Employee_Leave_AvailableAndTakenDetail_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
}

using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services.Commands.UserManagement
{
    [Command(Name = "UserManagement_RoleMenu_GetByDepartmentAndRole")]
    public class UserManagement_RoleMenu_GetByDepartmentAndRoleCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                ModuleId = string.Empty,
                RoleId = string.Empty,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.UserManagement_RoleMenu_GetByDepartmentAndRole.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }
    [Command(Name = "UserManagement_RoleMenu_Save")]
    public class UserManagement_RoleMenu_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                RoleMenus = new List<RoleMenus>(),
                Language = string.Empty
            }, viewInput); ;


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);

            //return repository.GetMultiple<dynamic>(StoreProcedure.UserManagement_RoleMenu_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            var table = new KeyValuePair<string, DataTable>("[dbo].[UD_UserManagement_RoleMenu_Save]", ExtensionMethods.ToDataTable(model.RoleMenus));
            var ProductList = new Dictionary<string, KeyValuePair<string, DataTable>>();
            ProductList.Add("@UD_UserManagement_RoleMenu_Save", table);
            var response = repository.GetMultipleWithTableValuParam<dynamic>(StoreProcedure.UserManagement_RoleMenu_Save.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.connectionString);
            return response.ToList()[0];

            //return repository.GetMultipleWithTableValuParam<dynamic>(StoreProcedure.Attendance_Save_New.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.connectionString);


        }
       
    }
    [Command(Name = "UserManagement_RoleMenu_GetByRole")]
    public class UserManagement_RoleMenu_GetByRoleCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                RoleId = 0,
                IsHR = false,
                LoggedInUserId = 0,
                Language = string.Empty,
                MainApplicationModule_Id = 0
            }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            IDictionary<string, object> ImageValues = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            string procedure = StoreProcedure.UserManagement_RoleMenu_GetByRole.ToString();
            values = _params.Get(model);
            var _response = repository.GetMultiple<dynamic>(procedure, values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    [Command(Name = "UserManagement_RoleMenu_GetByRole_New")]
    public class UserManagement_RoleMenu_GetByRole_NewCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                RoleId = 0,
                IsHR = false,
                LoggedInUserId = 0,
                Language = string.Empty,
                MainApplicationModule_Id = 0
            }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            IDictionary<string, object> ImageValues = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            string procedure = StoreProcedure.UserManagement_RoleMenu_GetByRole_New.ToString();
            values = _params.Get(model);
            var _response = repository.GetMultiple<dynamic>(procedure, values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    [Command(Name = "UserManagement_RoleMenu_GetForAdmin")]
    public class UserManagement_RoleMenu_GetForAdminCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                //RoleId = 0,
                //Language = string.Empty
            }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            IDictionary<string, object> ImageValues = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            string procedure = StoreProcedure.UserManagement_RoleMenu_GetForAdmin.ToString();
            values = _params.Get(model);
            var _response = repository.GetMultiple<dynamic>(procedure, values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    public class RoleMenus
    {
        public int Id { get; set; }
        public int MenuId { get; set; }
        public int RoleId { get; set; }        
        public int CreatedBy { get; set; }
        public bool IsAssigned { get; set; }

    }
}
    

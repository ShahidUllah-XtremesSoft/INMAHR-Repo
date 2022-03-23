using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services;
using INMA.HR.Services.Common;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace INMA.Projects.Services.Project
{
 
    [Command(Name = "HR_Employee_GetAll")]
    public class HR_Employye_GetAllCommand : CamelCommandBase
    {
        #region ==========  PARAMETERS

        object result = new { status = false, returnUrl = "#" };
        IDictionary<string, object> values = new Dictionary<string, object>();
        CommandParameters _params = new CommandParameters();
        #endregion

        protected override object DoAction(object v)
        {
            var model = MappedModel(new { Language = string.Empty }, v);
            values = _params.Get(model);
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.Project_save.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }

    [Command(Name = "Project_Role_Mapping_For_Employees_Save")]
    public class Project_Role_Mapping_For_Employees_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                RoleMappingDataModel = new List<RoleMappingDataModel>()              
               
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);


         //   var table = new KeyValuePair<string, DataTable>("[dbo].[UD_Employee_InternalLetter_Save_Multiple]", ExtensionMethods.ToDataTable(model.RoleMappingDataModel));
            var table = new KeyValuePair<string, DataTable>("[dbo].[UD_Project_Role_Mapping_For_Employees_Save]", ExtensionMethods.ToDataTable(model.RoleMappingDataModel));
            var ProductList = new Dictionary<string, KeyValuePair<string, DataTable>>();
            ProductList.Add("@UD_Project_Role_Mapping_For_Employees_Save", table);
            var response = repository.GetMultipleWithTableValuParam<dynamic>(ProjectStoreProcedure.Project_Role_Mapping_For_Employees_Save.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.projectconnectionString);
            return response.ToList()[0];


        }

    }

    [Command(Name = "UserManagement_Login_Role_Update")]
    public class UserManagement_Login_Role_UpdateCommand : CamelCommandBase
    {
      
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                EmployeeId = 0,
                DepartmentId = 0,
                UserId = 0,
                RoleId = 0,                
                Language = string.Empty
            }, v);
            #region ==========  PARAMETERS

            object result = new { status = false, returnUrl = "#" };
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            #endregion

            values = _params.Get(model);
           
            return Ioc.Resolve<IRepository>().GetSingle<dynamic>(StoreProcedure.UserManagement_Login_Role_Update.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

          
        }
    }
    [Command(Name = "Project_Role_Mapping_For_Employees_Delete")]
    public class Project_Role_Mapping_For_Employees_DeleteCommand : CamelCommandBase
    {
      
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                Language = string.Empty
            }, v);
            #region ==========  PARAMETERS

            object result = new { status = false, returnUrl = "#" };
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            #endregion

            values = _params.Get(model);
           
            return Ioc.Resolve<IRepository>().GetSingle<dynamic>(ProjectStoreProcedure.Project_Role_Mapping_For_Employees_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

          
        }
    }
}

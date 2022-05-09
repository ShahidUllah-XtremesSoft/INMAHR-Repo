using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System.Collections.Generic;
using INMA.HR.Services;

namespace INMA.Projects.Services.Project
{
    #region ==========   CITY DDL

    [Command(Name = "Setup_City_Get")]
    public class DDL_Setup_CityCommand : CamelCommandBase
    {
        #region ==========   PARAMETERS

        //  object result = new { status = false, returnUrl = "#" };
        IDictionary<string, object> values = new Dictionary<string, object>();
        CommandParameters _params = new CommandParameters();
        #endregion

        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new { HR_Nationality_Id = 0, Language = string.Empty }, v);
            values = _params.Get(model);
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.DDL_Setup_City.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region ==========   PROJECT CATEGORY TYPE  DDL

    [Command(Name = "DDL_ProjectCategoryType_In_Setup_TypeDetail_Get")]
    public class DDL_ProjectCategoryType_In_Setup_TypeDetail_GetCommand : CamelCommandBase
    {
        #region ==========   PARAMETERS

        IDictionary<string, object> values = new Dictionary<string, object>();
        CommandParameters _params = new CommandParameters();
        #endregion

        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new { Language = string.Empty }, v);
            values = _params.Get(model);
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.DDL_ProjectCategoryType_In_Setup_TypeDetail_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region ==========   PROJECT DDL

    [Command(Name = "Project_DDL")]
    public class DDL_ProjectCommand : CamelCommandBase
    {
        #region ==========   PARAMETERS

        IDictionary<string, object> values = new Dictionary<string, object>();
        CommandParameters _params = new CommandParameters();
        #endregion

        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new { Language = string.Empty }, v);
            values = _params.Get(model);
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.DDL_Project.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region ==========   EMPLOYEE DDL

    [Command(Name = "HR_Employee_DDL")]
    public class DDL_HR_EmployeeCommand : CamelCommandBase
    {
        #region ==========   PARAMETERS

        IDictionary<string, object> values = new Dictionary<string, object>();
        CommandParameters _params = new CommandParameters();
        #endregion

        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new { Language = string.Empty }, v);
            values = _params.Get(model);
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.DDL_HR_Employee.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region ==========   CLIENT DDL

    [Command(Name = "DDL_Client")]
    public class DDL_ClientCommand : CamelCommandBase
    {
        #region ==========   PARAMETERS

        IDictionary<string, object> values = new Dictionary<string, object>();
        CommandParameters _params = new CommandParameters();
        #endregion

        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new { Language = string.Empty }, v);
            values = _params.Get(model);
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.DDL_Client.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region ==========   CONTRACTOR DDL

    [Command(Name = "DDL_Contractor")]
    public class DDL_ContractorCommand : CamelCommandBase
    {
        #region ==========   PARAMETERS

        IDictionary<string, object> values = new Dictionary<string, object>();
        CommandParameters _params = new CommandParameters();
        #endregion

        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new { Language = string.Empty }, v);
            values = _params.Get(model);
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.DDL_Contractor.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region ==========   PROJECT SECTION  DDL LOAD FROM SETUP_TYPE TABLE 

    [Command(Name = "DDL_Project_MainType_In_Setup_Type")]
    public class DDL_Project_MainType_In_Setup_TypeCommand : CamelCommandBase
    {
        #region ==========   PARAMETERS

        IDictionary<string, object> values = new Dictionary<string, object>();
        CommandParameters _params = new CommandParameters();
        #endregion

        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new { Language = string.Empty }, v);
            values = _params.Get(model);
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.DDL_Project_MainType_In_Setup_Type.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region ==========   PROJECT   SUB SECTION  DDL LOAD FROM SETUP_TYPDETAILS TABLE 

    [Command(Name = "DDL_Project_SubSection_In_Setup_TypeDetail")]
    public class DDL_Project_SubSection_In_Setup_TypeDetailCommand : CamelCommandBase
    {
        #region ==========   PARAMETERS

        IDictionary<string, object> values = new Dictionary<string, object>();
        CommandParameters _params = new CommandParameters();
        #endregion

        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new { Setup_Id = 0, Language = string.Empty }, v);
            values = _params.Get(model);
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.DDL_Project_SubSection_In_Setup_TypeDetail.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion


    #region ==========   PROJECT DESIGN SECTION  DDL LOAD FROM SETUP_TYPE TABLE 

    [Command(Name = "DDL_DESIGN_SECTION_Project_MainType")]
    public class DDL_DESIGN_SECTION_Project_MainTypeCommand : CamelCommandBase
    {
        #region ==========   PARAMETERS

        IDictionary<string, object> values = new Dictionary<string, object>();
        CommandParameters _params = new CommandParameters();
        #endregion

        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new { Language = string.Empty }, v);
            values = _params.Get(model);
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.DDL_DESIGN_SECTION_Project_MainType.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region ==========   PROJECT TECHNICAL SECTION  DDL LOAD FROM SETUP_TYPE TABLE 

    [Command(Name = "DDL_TECHNICAL_SECTION_Project_MainType")]
    public class DDL_TECHNICAL_SECTION_Project_MainTypeCommand : CamelCommandBase
    {
        #region ==========   PARAMETERS

        IDictionary<string, object> values = new Dictionary<string, object>();
        CommandParameters _params = new CommandParameters();
        #endregion

        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new { Language = string.Empty }, v);
            values = _params.Get(model);
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.DDL_TECHNICAL_SECTION_Project_MainType.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region ==========   PROJECT TECHNICAL SECTION  DDL DELETED RECORD LOAD FROM SETUP_TYPE TABLE 
    [Command(Name = "DDL_TECHNICAL_SECTION_Project_Setup_TypeDetail_Deleted_Get")]
    public class DDL_TECHNICAL_SECTION_Project_Setup_TypeDetail_Deleted_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                TypeName = string.Empty,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(ProjectStoreProcedure.DDL_TECHNICAL_SECTION_Project_Setup_TypeDetail_Deleted_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }

    #endregion
    #region ==========   PROJECT SUPER VISION SECTION  DDL LOAD FROM SETUP_TYPE TABLE 

    [Command(Name = "DDL_SUPERVISION_SECTION_Project_MainType")]
    public class DDL_SUPERVISION_SECTION_Project_MainTypeCommand : CamelCommandBase
    {
        #region ==========   PARAMETERS

        IDictionary<string, object> values = new Dictionary<string, object>();
        CommandParameters _params = new CommandParameters();
        #endregion

        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new { Language = string.Empty }, v);
            values = _params.Get(model);
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.DDL_SUPERVISION_SECTION_Project_MainType.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region ==========   PROJECT SUPER VISION SECTION  FINANCE DDL LOAD FROM SETUP_TYPE TABLE 

    [Command(Name = "DDL_SUPERVISION_SECTION_Project_Finance")]
    public class DDL_SUPERVISION_SECTION_Project_FinanceCommand : CamelCommandBase
    {
        #region ==========   PARAMETERS

        IDictionary<string, object> values = new Dictionary<string, object>();
        CommandParameters _params = new CommandParameters();
        #endregion

        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new { Language = string.Empty }, v);
            values = _params.Get(model);
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.DDL_SUPERVISION_SECTION_Project_Finance.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion



}

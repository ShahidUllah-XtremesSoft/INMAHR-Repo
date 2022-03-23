using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository; 
using System.Collections.Generic; 
using INMA.HR.Services;

namespace INMA.Projects.Services.Project
{
    #region ==========   CITY DDL

    [Command(Name = "Setup_City_Get")]
    public class Setup_City_GetCommand : CamelCommandBase
    {
        #region ==========   PARAMETERS

      //  object result = new { status = false, returnUrl = "#" };
        IDictionary<string, object> values = new Dictionary<string, object>();
        CommandParameters _params = new CommandParameters();
        #endregion
        
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new { HR_Nationality_Id=0, Language = string.Empty }, v);
            values = _params.Get(model);
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.Setup_City_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region ==========   PROJECT DDL

    [Command(Name = "Project_DDL")]
    public class Project_Get_DDLCommand : CamelCommandBase
    {
        #region ==========   PARAMETERS

        IDictionary<string, object> values = new Dictionary<string, object>();
        CommandParameters _params = new CommandParameters();
        #endregion
        
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new {   Language = string.Empty }, v);
            values = _params.Get(model);
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.Project_DDL.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion
    #region ==========   EMPLOYEE DDL

    [Command(Name = "HR_Employee_DDL")]
    public class HR_Employee_DDLCommand : CamelCommandBase
    {
        #region ==========   PARAMETERS

        IDictionary<string, object> values = new Dictionary<string, object>();
        CommandParameters _params = new CommandParameters();
        #endregion
        
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new {   Language = string.Empty }, v);
            values = _params.Get(model);
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.HR_Employee_DDL.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

        }
    }
    #endregion

}

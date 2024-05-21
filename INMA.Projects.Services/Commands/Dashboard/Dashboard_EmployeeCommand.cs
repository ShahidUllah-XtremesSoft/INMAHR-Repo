using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.Projects.Services.Commands.Dashboard
{
    public class Dashboard_EmployeeCommand
    {
        [Command(Name = "Project_Employee_Dashboard")]
        public class Project_Employee_DashboardCommand : CamelCommandBase
        {

            protected override object DoAction(object viewInput)
            { 
                var model = base.MappedModel(new
                {
                    EmployeeId = 0,
                    UserId = 0,
                    Role = 0,
                    Language = string.Empty
                }, viewInput);
                _ = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                IDictionary<string, object> values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetDataSet<dynamic>(ProjectStoreProcedure.Project_Employee_Dashboard.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



                return result;

            }
        }
    }
    #region TASK
    [Command(Name = "Project_Task_By_Employee_Id")]
    public class Project_Task_By_Employee_IdCommand : CamelCommandBase
    {

        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                EmployeeId = 0,
                UserId = 0,
                RoleId = 0,
                Language = string.Empty
            }, viewInput);
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            var result = Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.Project_Task_By_Employee_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



            return result;

        }
    }

    #endregion
    #region TASK DETAILS
    [Command(Name = "Project_Task_Details_By_Employee_Id")]
    public class Project_Task_Details_By_Employee_IdCommand : CamelCommandBase
    {

        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                task_Id = 0, 
                Language = string.Empty
            }, viewInput);
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            var result = Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.Project_Task_Details_By_Employee_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



            return result;

        }
    }

    #endregion
    #region TASK SEEN
    [Command(Name = "Project_Task_Seen_Status_Update_By_Employee_Id")]
    public class Project_Task_Seen_Status_Update_By_Employee_IdCommand : CamelCommandBase
    {

        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                task_Id = 0
               
            }, viewInput);
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            var result = Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.Project_Task_Seen_Status_Update_By_Employee_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



            return result;

        }
    }

    #endregion
  
}

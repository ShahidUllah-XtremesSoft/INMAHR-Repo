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
    public class DashboardCommand
    {
        [Command(Name = "Project_Dashboard_CountByStatus_Get")]
        public class Project_Dashboard_CountByStatus_GetCommand : CamelCommandBase
        {

            protected override object DoAction(object viewInput)
            {
                Commands.SMSService smsService = new Commands.SMSService();
                var model = base.MappedModel(new
                {
                    EmployeeId=0,
                    UserId=0,
                    Role = 0,                    
                    Language = string.Empty
                }, viewInput);


                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetSingle<dynamic>(ProjectStoreProcedure.Project_Dashboard_CountByStatus_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);
                
                

                return result;

            }
        }
        [Command(Name = "Project_Dashboard_CountByCategory_Get")]
        public class Project_Dashboard_CountByCategory_GetCommand : CamelCommandBase
        {

            protected override object DoAction(object viewInput)
            {
                Commands.SMSService smsService = new Commands.SMSService();
                var model = base.MappedModel(new
                {
                    EmployeeId = 0,
                    UserId = 0,
                    Role = 0,
                    Language = string.Empty
                }, viewInput);


                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.Project_Dashboard_CountByCategory_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



                return result;

            }
        }
        [Command(Name = "Project_Dashboard_ClientMeetingContractorCount_Get")]
        public class Project_Dashboard_ClientMeetingContractorCount_GetCommand : CamelCommandBase
        {

            protected override object DoAction(object viewInput)
            {
                Commands.SMSService smsService = new Commands.SMSService();
                var model = base.MappedModel(new
                {
                    EmployeeId = 0,
                    UserId = 0,
                    Role = 0,
                    Language = string.Empty
                }, viewInput);


                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetSingle<dynamic>(ProjectStoreProcedure.Project_Dashboard_ClientMeetingContractorCount_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



                return result;

            }
        }
        [Command(Name = "Project_Dashboard_IssueCountByStatus_Get")]
        public class Project_Dashboard_IssueCountByStatus_GetCommand : CamelCommandBase
        {

            protected override object DoAction(object viewInput)
            {
                Commands.SMSService smsService = new Commands.SMSService();
                var model = base.MappedModel(new
                {
                    EmployeeId = 0,
                    UserId = 0,
                    Role = 0,
                    Language = string.Empty
                }, viewInput);


                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.Project_Dashboard_IssueCountByStatus_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



                return result;

            }
        }
        [Command(Name = "Project_Dashboard_ProjectCountByStatus_Get")]
        public class Project_Dashboard_ProjectCountByStatus_GetCommand : CamelCommandBase
        {

            protected override object DoAction(object viewInput)
            {
                Commands.SMSService smsService = new Commands.SMSService();
                var model = base.MappedModel(new
                {
                    EmployeeId = 0,
                    UserId = 0,
                    Role = 0,
                    Language = string.Empty
                }, viewInput);


                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.Project_Dashboard_ProjectCountByStatus_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



                return result;

            }
        }
    }
}

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
                    EmployeeId = 0,
                    UserId = 0,
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
        [Command(Name = "Project_Dashboard_ProjectAndSectionCount_Get")]
        public class Project_Dashboard_ProjectAndSectionCount_GetCommand : CamelCommandBase
        {

            protected override object DoAction(object viewInput)
            {

                var model = base.MappedModel(new
                {
                    EmployeeId = 0,
                    UserId = 0,
                    Role = 0,
                    ProjectId = 0,
                    DesignSectionId = 0,
                    TechnicalSection = 0,
                    SupervisionSection = 0,
                    Language = string.Empty
                }, viewInput);


                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.Project_Dashboard_ProjectAndSectionCount_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



                return result;

            }
        }
        [Command(Name = "Project_SubSectionRecordBySectionInDashboard_Get")]
        public class Project_SubSectionRecordBySectionInDashboard_GetCommand : CamelCommandBase
        {

            protected override object DoAction(object viewInput)
            {

                var model = base.MappedModel(new
                {
                    EmployeeId = 0,
                    UserId = 0,
                    Role = 0,
                    ProjectId = 0,
                    SectionName = string.Empty,
                    Language = string.Empty
                }, viewInput);


                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.Project_SubSectionRecordBySectionInDashboard_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



                return result;

            }
        }
        #region Issue GET

        [Command(Name = "Project_Dashboard_Issue_Get")]
        public class Project_Dashboard_Issue_GetCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {

                object result = new { status = false, returnUrl = "#" };


                var model = base.MappedModel(new
                {
                    LoggedInUser = 0,
                    RoleId = 0,
                    LoggedInEmployeeId = 0,
                    LoggedInDepartmentId = 0,
                    Language = string.Empty
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                var checkResult = repository.GetMultiple<dynamic>(ProjectStoreProcedure.Project_Dashboard_Issue_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);
                return checkResult;

            }
        }
        #endregion

    }
}

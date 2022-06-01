using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.Projects.Services.Commands.Reports
{    
    public class ReportsCommand
    {
        [Command(Name = "Reports_DesignSection_GetBySectionId")]
        public class Reports_DesignSection_GetBySectionIdCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    SectionId = 0,
                    StartDate = string.Empty,
                    EndDate = string.Empty,
                    Language = string.Empty

                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Reports_DesignSection_GetBySectionId.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
        [Command(Name = "Reports_TechnicalSection_GetBySectionId")]
        public class Reports_TechnicalSection_GetBySectionIdCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    SectionId = 0,
                    StartDate = string.Empty,
                    EndDate = string.Empty,
                    Language = string.Empty

                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Reports_TechnicalSection_GetBySectionId.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }//  Reports_TechnicalSection_GetBySectionId

        [Command(Name = "Report_Summary_GetByParamters")]
        public class Report_Summary_GetByParamtersCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    ProjectCategoryDDL = 0,
                    ProjectDDL = 0,
                    StartDate = string.Empty,
                    EndDate = string.Empty,
                    LoggedInUser = 0,
                    LoggedInEmployeeId = 0,
                    RoleId = 0,
                    Language = string.Empty

                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                object repo= repository.GetDataSet<dynamic>(ProjectStoreProcedure.Report_Summary_GetByParamters.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);
                return repo;
            }
        }
    }
}

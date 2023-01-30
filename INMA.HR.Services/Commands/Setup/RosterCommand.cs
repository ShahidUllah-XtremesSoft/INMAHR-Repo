using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services.Commands.Setup
{
    #region ========== Roster Save
    [Command(Name = "Setup_Roster_Save")]
    public class Setup_Roster_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            var model = base.MappedModel(new
            {
                Id = 0,
                TypeEng = string.Empty,
                TypeArb = string.Empty,
                DayStartTime = string.Empty,
                DayEndTime = string.Empty,
                BreakStartTime = string.Empty,
                BreakEndTime = string.Empty,
                StartTimeRelaxationMinutes = 0,
                isNoBreak = 0,
                CreatedBy = 0,
                Language = string.Empty
            }, viewInput);

            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            IDictionary<string, object> values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Setup_Roster_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return _response;
        }
    }
    #endregion
    #region =========== Delete


    [Command(Name = "Setup_Roster_Delete")]
    public class Setup_Roster_DeleteCommand : CamelCommandBase
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
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Setup_Roster_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return _response;
        }
    }
    #endregion
    #region =========== Get List


    [Command(Name = "Setup_Roster_Get")]
    public class Setup_Roster_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            var model = base.MappedModel(new { Language = string.Empty }, viewInput);
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Setup_Roster_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }
    #endregion  
    #region =========== Get Employees List


    [Command(Name = "Roster_Association_Get_AllEmployees_by_DepartmentWise")]
    public class Roster_Association_Get_AllEmployees_by_DepartmentWiseCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            var model = base.MappedModel(new { LoggedInUserId=0, DepartmentId = 0, Language = string.Empty }, viewInput);
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Roster_Association_Get_AllEmployees_by_DepartmentWise.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }
    #endregion

}

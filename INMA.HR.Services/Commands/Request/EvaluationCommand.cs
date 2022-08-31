using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services.Commands.Request
{

    #region ========== Load Evaluation All Requests 

    [Command(Name = "HR_Evaluation_Request_Grid")]
    public class HR_Evaluation_Request_GridCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Language = string.Empty,

            }, viewInput);

            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.HR_Evaluation_Request_Grid.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion
    #region ========== Delete Evaluation Requests By Id

    [Command(Name = "HR_Evaluation_Request_Delete")]
    public class HR_Evaluation_Request_DeleteCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                Language = string.Empty,

            }, viewInput);

            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.HR_Evaluation_Request_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion
    #region ========== Load Line Manger By Department wise
    [Command(Name = "Evaluation_Get_LineManager_by_DepartmentWise")]
    public class Evaluation_Get_LineManager_by_DepartmentWiseCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                LoggedInUserId = 0,
                LoggedInEmployeeId = 0,
                LineManager_DepartmentId = string.Empty,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var response = repository.GetMultiple<dynamic>(StoreProcedure.Evaluation_Get_LineManager_by_DepartmentWise.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return response;

        }
    }
    #endregion

    #region ========== Load Employees By Department wise
    [Command(Name = "Evaluation_Get_AllEmployees_by_DepartmentWise")]
    public class Evaluation_Get_AllEmployees_by_DepartmentWiseCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                LoggedInUserId = 0,
                LoggedInEmployeeId = 0,
                LineManager_DepartmentId = string.Empty,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var response = repository.GetMultiple<dynamic>(StoreProcedure.Evaluation_Get_AllEmployees_by_DepartmentWise.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return response;

        }
    }
    #endregion


}

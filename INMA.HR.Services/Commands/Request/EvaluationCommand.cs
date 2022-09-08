using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services.Commands.Request
{

    #region ========== Load Evaluation Tempalte Get 

    [Command(Name = "Request_Evaluation_History_Get_By_Id")]
    public class Request_Evaluation_History_Get_By_IdCommand : CamelCommandBase
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
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_Evaluation_History_Get_By_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion  
    #region ========== Load Evaluation Tempalte Get 

    [Command(Name = "Evaluation_Template_Get")]
    public class Evaluation_Tempalte_GetCommand : CamelCommandBase
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
            var _response = repository.GetDataSet<dynamic>(StoreProcedure.Evaluation_Template_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion  
    #region ========== Load Evaluation All Requests 

    [Command(Name = "Evaluation_Request_Grid")]
    public class Evaluation_Request_GridCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Employee_Id = 0,
                Language = string.Empty,

            }, viewInput);

            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.Evaluation_Request_Grid.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion
    #region ========== Delete Evaluation Requests By Id

    [Command(Name = "Evaluation_Request_Delete")]
    public class Evaluation_Request_DeleteCommand : CamelCommandBase
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
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.Evaluation_Request_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

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
                LoggedInEmployeeRoleName = string.Empty,
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

    #region Request Evaluation Employee Form Save
    [Command(Name = "Request_Evaluation_Employee_Form_Save")]
    public class Request_Evaluation_Employee_Form_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {

            var model = base.MappedModel(new
            {
                Id = 0,
                EvaluationId = 0,

                //   LM_Employee_Id = 0,
                Employee_Id = 0,
                Employee_Department_Id = 0,
                CreatedBy = 0,
                Employee_Department_Parent_Id = 0,
                EvaluationForm = string.Empty,
               // isHRApproved = 0,
                Language = string.Empty,
            }, v);

            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_Evaluation_Employee_Form_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion
    #region Evaulation Request Save
    [Command(Name = "Evaluation_Request_Save")]
    public class Evaluation_Request_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {

            var model = base.MappedModel(new
            {
                Id = 0,
                DepartmentId = 0,
                LM_Employee_Id = 0,
                Employee_Id = 0,
                CreatedBy = 0,
                Language = string.Empty,
            }, v);

            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Evaluation_Request_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion



    [Command(Name = "Employees_Request_Evaluation_Get")]
    public class Employees_Request_Evaluation_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {

                Id = 0,
                LoggedInUserId = string.Empty,
                LoggedInEmployeeId = string.Empty,
                LoggedInUserRoleId = 0,
                LoggedInUserRoleName = string.Empty,
                LoggedInUserDepartementId = 0,
                Language = string.Empty,
                StatusWise = string.Empty,

            }, viewInput);

            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Employees_Request_Evaluation_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    [Command(Name = "Employees_Request_Evaluation_History_Get")]
    public class Employees_Request_Evaluation_History_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {

                LoggedInUserId = string.Empty,
                LoggedInEmployeeId = string.Empty,
                LoggedInUserRoleId = 0,
                LoggedInUserRoleName = string.Empty,
                LoggedInUserDepartementId = 0,
                LoggedInUserDepartement_Parent_Id = 0,
                Language = string.Empty,


            }, viewInput);

            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Employees_Request_Evaluation_History_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
}

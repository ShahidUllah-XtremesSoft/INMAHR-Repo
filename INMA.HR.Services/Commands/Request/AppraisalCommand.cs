using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services.Common;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace INMA.HR.Services.Commands.Request
{
     
    #region ========== Load Appraisal Pending Requests 

    [Command(Name = "Setup_Appraisal_Permission_isAccess")]
    public class Setup_Appraisal_Permission_isAccessCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Employee_Id = 0,
                DepartmentId = 0,
                Year = string.Empty,
                Language = string.Empty

            }, viewInput);

            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            IDictionary<string, object> values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Setup_Appraisal_Permission_isAccess.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion
    #region ========== Load Appraisal Pending Requests 

    [Command(Name = "Request_Appraisal_AlreadyExist")]
    public class Request_Appraisal_AlreadyExistCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Employee_Id = 0,
                DepartmentId = 0,
                Year = string.Empty,
                Language = string.Empty

            }, viewInput);

            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_Appraisal_AlreadyExist.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion
    #region ========== Load Appraisal Pending Requests 

    [Command(Name = "Request_Appraisal_Pending")]
    public class Request_Appraisal_PendingCommand : CamelCommandBase
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
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.Request_Appraisal_Pending.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion
    #region ========== Load Appraisal Approved Requests 

    [Command(Name = "Request_Appraisal_Approved")]
    public class Request_Appraisal_ApprovedCommand : CamelCommandBase
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
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.Request_Appraisal_Approved.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion
    #region ========== Load Appraisal Template Get 

    [Command(Name = "Appraisal_Template_Get")]
    public class Appraisal_Template_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {   Language = string.Empty,

            }, viewInput);

            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            IDictionary<string, object> values = _params.Get(model);
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.Appraisal_Template_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion  
    #region ========== Load Appraisal Answer Get 

    [Command(Name = "Request_Appraisal_Answer_Get")]
    public class Request_Appraisal_Answer_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Employee_Id = 0,
                HR_Department_Id = 0,
                Year = string.Empty,
                ManagerId = 0,
                LoggedInEmployeeId = 0,
                Language = string.Empty,

            }, viewInput);

            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            IDictionary<string, object> values = _params.Get(model);
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.Request_Appraisal_Answer_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion  
    #region ========== Load Line Manger By Department wise
    [Command(Name = "Appraisal_Get_LineManager_by_DepartmentWise")]
    public class Appraisal_Get_LineManager_by_DepartmentWiseCommand : CamelCommandBase
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
            var response = repository.GetMultiple<dynamic>(StoreProcedure.Appraisal_Get_LineManager_by_DepartmentWise.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return response;

        }
    }
    #endregion

    #region Appraisal Request Generate
    [Command(Name = "Appraisal_Request_Save")]
    public class Appraisal_Request_SaveCommand : CamelCommandBase
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
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Appraisal_Request_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion

    #region =====SELF APPRAISAL  BULK
    [Command(Name = "Request_Appraisal_Answer_Multiple_Save")]
    public class Request_Appraisal_Answer_Multiple_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                AppraisalModel = new List<AppraisalModel>(),
                CreatedBy = 0,
                Appraisal_Id = 0,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);


            var table = new KeyValuePair<string, DataTable>("[dbo].[UD_Request_Appraisal_Answer_Multiple_Save]", ExtensionMethods.ToDataTable(model.AppraisalModel));
            var ProductList = new Dictionary<string, KeyValuePair<string, DataTable>>();
            ProductList.Add("@UD_Request_Appraisal_Answer_Multiple_Save", table);
            var response = repository.GetMultipleWithTableValuParam<dynamic>(StoreProcedure.Request_Appraisal_Answer_Multiple_Save.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.connectionString);




            return response.ToList()[0];

            
        }

    }

    #endregion
    #region =====SELF APPRAISAL  BULK
    [Command(Name = "Request_Appraisal_Answer_Multiple_Remarks_Save")]
    public class Request_Appraisal_Answer_Multiple_Remarks_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                AppraisalModel = new List<AppraisalModel>(),
                CreatedBy = 0,
                Appraisal_Id = 0,
                Status = string.Empty,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);


            var table = new KeyValuePair<string, DataTable>("[dbo].[UD_Request_Appraisal_Answer_Multiple_Save]", ExtensionMethods.ToDataTable(model.AppraisalModel));
            var ProductList = new Dictionary<string, KeyValuePair<string, DataTable>>();
            ProductList.Add("@UD_Request_Appraisal_Answer_Multiple_Save", table);
            var response = repository.GetMultipleWithTableValuParam<dynamic>(StoreProcedure.Request_Appraisal_Answer_Multiple_Remarks_Save.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.connectionString);




            return response.ToList()[0];

            
        }

    }

    #endregion
    #region ========== Delete Appraisal Requests By Id

    [Command(Name = "Appraisal_Request_Delete")]
    public class Appraisal_Request_DeleteCommand : CamelCommandBase
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
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.Appraisal_Request_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion
    #region ========== Status Update Appraisal Requests  By Id

    [Command(Name = "Request_Appraisal_Status_Update")]
    public class Request_Appraisal_Status_UpdateCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                LoggedInRoleName = string.Empty,
                Language = string.Empty,

            }, viewInput);

            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_Appraisal_Status_Update.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion
    #region ========== Request_Appraisal_Update

    [Command(Name = "Request_Appraisal_Update")]
    public class Request_Appraisal_UpdateCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Appraisal_Id = 0,
                LoggedInRoleName = string.Empty,               
                Remarks = string.Empty,
                Status = string.Empty,
                CreatedBy = 0,
                isHR = 0,                
                Language = string.Empty,

            }, viewInput);

            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_Appraisal_Update.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion

    // -------------------- MANAGER REQUEST HISTORY AREA ---------------
    #region Load All Employees Self Pending Request

   
    [Command(Name = "Employees_Request_Appraisal_Get")]
    public class Employees_Request_Appraisal_GetCommand : CamelCommandBase
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
            var _response = Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Employees_Request_Appraisal_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion




    #region ========== Load Manager Appraisal Tempalte Get 

    [Command(Name = "Setup_Appraisal_Template_Get")]
    public class Setup_Appraisal_Template_GetCommand : CamelCommandBase
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
            var _response = repository.GetDataSet<dynamic>(StoreProcedure.Setup_Appraisal_Template_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion
    #region =====APPRAISAL PERFORMANCE  BULK
    [Command(Name = "Request_Appraisal_Performance_Multiple_Save")]
    public class Request_Appraisal_Performance_Multiple_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                AppraisalPerformanceModel = new List<AppraisalPerformanceModel>(),
                CreatedBy = 0,
                AppraisalId = 0, 
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);


            var table = new KeyValuePair<string, DataTable>("[dbo].[UD_Request_Appraisal_Performance_Multiple_Save]", ExtensionMethods.ToDataTable(model.AppraisalPerformanceModel));
            var ProductList = new Dictionary<string, KeyValuePair<string, DataTable>>();
            ProductList.Add("@UD_Request_Appraisal_Performance_Multiple_Save", table);
            var response = repository.GetMultipleWithTableValuParam<dynamic>(StoreProcedure.Request_Appraisal_Performance_Multiple_Save.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.connectionString);




            return response.ToList()[0];


        }

    }

    #endregion
    #region Request Appraisal Performance  Save
    [Command(Name = "Request_Appraisal_Performance_Save")]
    public class Request_Appraisal_Performance_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {

            var model = base.MappedModel(new
            {
                Id = 0,
                AppraisalId = 0,                 
                Employee_Id = 0,
                Employee_Department_Id = 0,
                Employee_Department_Parent_Id = 0,
                CreatedBy = 0,
                AppraisalForm = string.Empty,
                AppraisalFormArb = string.Empty,
                LoggedInEmployee_RoleId = 0, 
                Year = string.Empty,
                Language = string.Empty,
            }, v);

            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_Appraisal_Performance_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion

    #region ========== Load Appraisal  Template Get 

    [Command(Name = "Request_Appraisal_Performance_Get_By_Id")]
    public class Request_Appraisal_Performance_Get_By_IdCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                AppraisalId = 0,
                Language = string.Empty,

            }, viewInput);

            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            IDictionary<string, object> values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Request_Appraisal_Performance_Get_By_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion 
    #region ========== Load Request_Appraisal_Performance_Answer_Get_By_Id Get 

    [Command(Name = "Request_Appraisal_Performance_Answer_Get_By_Id")]
    public class Request_Appraisal_Performance_Answer_Get_By_IdCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                AppraisalId = 0,
                Language = string.Empty, 
            }, viewInput);

            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            IDictionary<string, object> values = _params.Get(model);
            var _response = repository.GetDataSet<dynamic>(StoreProcedure.Request_Appraisal_Performance_Answer_Get_By_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion
    #region BULK  Appraisal_Request_and_Answer_and_Performance_ApproveOrDecline 

    [Command(Name = "Appraisal_Request_and_Answer_and_Performance_ApproveOrDecline")]
    public class Appraisal_Request_and_Answer_and_Performance_ApproveOrDeclineCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {

                LoggedInUser = string.Empty,
                LoggedInUserDepartmentId = 0,
                LoggedInUserRoleId = 0,
                RequestIds = string.Empty,
                Status = string.Empty,
                Comment = string.Empty,
                Language = string.Empty,

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var response = repository.GetSingle<dynamic>(StoreProcedure.Appraisal_Request_and_Answer_and_Performance_ApproveOrDecline.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return response;

        }
    }

    #endregion
    #region ========== Load HR EMPLOYEE GET BY DEPARTMENTID 

    [Command(Name = "HR_Employee_Get_By_DepartmentId")]
    public class HR_Employee_Get_By_DepartmentIdCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                LoggedInUserId = 0,
                LoggedInUserDepartementId = 0,
                LoggedInUserRoleId = 0,
                Language = string.Empty,

            }, viewInput);

            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            IDictionary<string, object> values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.HR_Employee_Get_By_DepartmentId.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion
    
    #region ========== Load HR EMPLOYEE GET BY DEPARTMENTID 

    [Command(Name = "Appraisal_Permission_Get_AllEmployees_by_DepartmentWise")]
    public class Appraisal_Permission_Get_AllEmployees_by_DepartmentWiseCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                LoggedInUserId = 0,
                DepartmentId = 0,
                Year = string.Empty,
                Language = string.Empty,

            }, viewInput);

            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            IDictionary<string, object> values = _params.Get(model);
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.Appraisal_Permission_Get_AllEmployees_by_DepartmentWise.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion

    #region =====Appraisal ASSOCIATION BULK 
    // USED IN SETUP ONLY .........................................

    [Command(Name = "Setup_Appraisal_Association_Multipe_Save")]
    public class Setup_Appraisal_Association_Multipe_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                AssociationModel = new List<AppraisalAssociation>(),
                Year = string.Empty,
                CreatedBy = 0,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);


            var table = new KeyValuePair<string, DataTable>("[dbo].[UD_Setup_Appraisal_Association_Multipe_Save]", ExtensionMethods.ToDataTable(model.AssociationModel));
            var ProductList = new Dictionary<string, KeyValuePair<string, DataTable>>();
            ProductList.Add("@UD_Setup_Appraisal_Association_Multipe_Save", table);
            var response = repository.GetMultipleWithTableValuParam<dynamic>(StoreProcedure.Setup_Appraisal_Association_Multipe_Save.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.connectionString);
             


            return response.ToList()[0];


        }

    }

    #endregion



}

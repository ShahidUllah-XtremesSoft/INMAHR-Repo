using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services.Commands.Setup
{
    #region ========== Allowance Type Save
    [Command(Name = "Setup_Allowance_Type_Save")]
    public class Setup_Allowance_Type_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            var model = base.MappedModel(new
            {
                Id = 0,
                TypeEng = string.Empty,
                TypeArb = string.Empty,
                CreatedBy = 0,
                Language = string.Empty
            }, viewInput);

            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            IDictionary<string, object> values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Setup_Allowance_Type_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return _response;
        }
    }
    #endregion
    #region =========== Delete


    [Command(Name = "Setup_Allowance_Type_Delete")]
    public class Setup_Allowance_Type_DeleteCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                Language = string.Empty
            }, viewInput);

            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            IDictionary<string, object> values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Setup_Allowance_Type_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return _response;
        }
    }
    #endregion
    #region =========== Get List


    [Command(Name = "Setup_Allowance_Type_Get")]
    public class Setup_Allowance_Type_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            var model = base.MappedModel(new { Language = string.Empty }, viewInput);
            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Setup_Allowance_Type_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }
    #endregion

    #region =========== Get Allowance DDL List


    [Command(Name = "Setup_Allowance_Type_Get_DDL")]
    public class Setup_Allowance_Type_Get_DDLCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            var model = base.MappedModel(new { Language = string.Empty }, viewInput);
            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Setup_Allowance_Type_Get_DDL.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }
    #endregion


    // ===============================================  
    // ===============================================  
    // =============================================== ALLOWANCE    


    #region =========== Delete 


    [Command(Name = "Setup_Allowance_Delete")]
    public class Setup_Allowance_DeleteCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                AllowanceID = 0,
                Language = string.Empty
            }, viewInput);

            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Setup_Allowance_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return _response;
        }
    }
    #endregion
    #region =========== Get List


    [Command(Name = "Setup_Allowance_Get")]
    public class Setup_Allowance_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            var model = base.MappedModel(new { Language = string.Empty }, viewInput);
            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Setup_Allowance_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }
    #endregion
    #region ========== Allowance  Save
    [Command(Name = "Setup_Allowance_Save")]
    public class Setup_Allowance_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            var model = base.MappedModel(new
            {
                AllowanceID = 0,
                Setup_Allowance_TypeID = 0,
                DepartmentId = 0,
                HR_Profession_Id = 0,
                AllowanceAmount = string.Empty,
                CreatedByAllowance = 0,
                AllowanceLanguage = string.Empty
            }, viewInput);

            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            IDictionary<string, object> values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Setup_Allowance_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return _response;
        }
    }
    #endregion
}

using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic; 

namespace INMA.HR.Services
{
    [Command(Name = "HR_Employee_RecursiveAdditionDeduction_addUpdateEmployeePayrollAddition")]
    public class HR_Employee_RecursiveAdditionDeduction_addUpdateEmployeePayrollAdditionCommand : CamelCommandBase
    {

        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                RecursiveID = 0,
                EmployeeID = 0,
                Amount = string.Empty,
                Name = string.Empty,
                RecursiveType = string.Empty,
                RecursiveDate = string.Empty,
                CreatedBy = 0,
                Language = string.Empty,

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.HR_Employee_RecursiveAdditionDeduction_addUpdateEmployeePayrollAddition.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

             
            return _response;

        }

    } 
    [Command(Name = "HR_Employee_RecursiveAdditionDeduction_Get")]
    public class HR_Employee_RecursiveAdditionDeduction_GetCommand : CamelCommandBase
    {

        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
              
                EmployeeID = 0, 
                Language = string.Empty,

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.HR_Employee_RecursiveAdditionDeduction_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

             
            return _response;

        }

    } 
    
    [Command(Name = "HR_Employee_RecursiveAddition_Get")]
    public class HR_Employee_RecursiveAddition_GetCommand : CamelCommandBase
    {

        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
              
                EmployeeID = 0, 
                Language = string.Empty,

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.HR_Employee_RecursiveAddition_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

             
            return _response;

        }

    }     

    [Command(Name = "HR_Employee_RecursiveDeduction_Get")]
    public class HR_Employee_RecursiveDeduction_GetCommand : CamelCommandBase
    {

        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
              
                EmployeeID = 0, 
                Language = string.Empty,

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.HR_Employee_RecursiveDeduction_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

             
            return _response;

        }

    }     
    [Command(Name = "HR_Employee_RecursiveAdditionDeduction_Delete")]
    public class HR_Employee_RecursiveAdditionDeduction_DeleteCommand : CamelCommandBase
    {

        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {

                RecursiveID = 0, 
                Language = string.Empty,

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.HR_Employee_RecursiveAdditionDeduction_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

             
            return _response;

        }

    } 
}

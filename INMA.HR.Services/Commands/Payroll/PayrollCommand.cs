using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services.Common;
using System.Collections.Generic;
using System.Data;

namespace INMA.HR.Services
{

    [Command(Name = "Employees_SelectForPayroll")]
    public class Employees_SelectForPayrollCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                DepartmentID = 0,
                DesignationID = 0,
                PayrollMonth = string.Empty,
                PayrollYear = string.Empty,
                Language = string.Empty,

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Employees_SelectForPayroll.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }

    [Command(Name = "PayrolForEmployee_GetLeavesandTotalhourbyid")]
    public class PayrolForEmployee_GetLeavesandTotalhourbyidCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                EmployeeID = 0,
                month = string.Empty,
                year = string.Empty,
                Language = string.Empty,

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            return repository.GetSingle<dynamic>(StoreProcedure.PayrolForEmployee_GetLeavesandTotalhourbyid.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }

    [Command(Name = "Payroll_LoadAdditionByEmployeeByID")]
    public class Payroll_LoadAdditionByEmployeeByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                EmployeeID = 0,
                month = string.Empty,
                year = string.Empty,
                Language = string.Empty,

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            return repository.GetDataSet<dynamic>(StoreProcedure.Payroll_LoadAdditionByEmployeeByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }

    [Command(Name = "Payroll_LoadDeductionByEmployeeByID")]
    public class Payroll_LoadDeductionByEmployeeByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                EmployeeID = 0,
                month = string.Empty,
                PayrollYear = string.Empty,
                Language = string.Empty,

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            return repository.GetDataSet<dynamic>(StoreProcedure.Payroll_LoadDeductionByEmployeeByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }  
   
    [Command(Name = "Payroll_addUpdateEmployeePayrollAddition")]
    public class Payroll_addUpdateEmployeePayrollAdditionCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {
                EmployeeID = 0,
                AllowanceID = 0,
                Amount = string.Empty,
                PayrollMonth = string.Empty,
                PayrollYear = string.Empty,
                EntryStatus = string.Empty,
            }, ((Newtonsoft.Json.Linq.JContainer)((Newtonsoft.Json.Linq.JContainer)viewInput).First).First);


            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Payroll_addUpdateEmployeePayrollAddition.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }
     [Command(Name = "Payroll_addUpdateEmployeePayrollRecursiveAddition")]
    public class Payroll_addUpdateEmployeePayrollRecursiveAdditionCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {
                EmployeeID = 0,
                AllowanceID = 0,
                Amount = string.Empty,
                PayrollMonth = string.Empty,
                PayrollYear = string.Empty,
                EntryStatus = string.Empty,
            }, ((Newtonsoft.Json.Linq.JContainer)((Newtonsoft.Json.Linq.JContainer)viewInput).First).First);


            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Payroll_addUpdateEmployeePayrollRecursiveAddition.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }

    [Command(Name = "Payroll_addUpdateEmployeePayrollDeduction")]
    public class Payroll_addUpdateEmployeePayrollDeductionCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {
                EmployeeID = 0,
                PayrollID = 0,
                PayrollMonth = string.Empty,
                PayrollYear = string.Empty,

                SecurityDeduction = string.Empty,
                LeaveDeduction = string.Empty,
                LabourWelfareDeduction = string.Empty,
                ProvidentFundDeduction = string.Empty,
                OtherDeduction = string.Empty,
                Language = string.Empty
            }, viewInput);
            //   }, ((Newtonsoft.Json.Linq.JContainer)((Newtonsoft.Json.Linq.JContainer)viewInput).First).First);


            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            var results =Ioc.Resolve<IRepository>().GetSingle<dynamic>(StoreProcedure.Payroll_addUpdateEmployeePayrollDeduction.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return results;
        }
    }
    [Command(Name = "Payroll_addUpdateEmployeePayrollRecursiveDeduction")]
    public class Payroll_addUpdateEmployeePayrollRecursiveDeductionCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            var model = base.MappedModel(new
            {
                EmployeeID = 0,
                RecursiveID = 0,
                Amount = string.Empty,
                PayrollMonth = string.Empty,
                PayrollYear = string.Empty,
                EntryStatus = string.Empty,
                PayrollDeductionID = 0,
                PayrollID = 0,
                Language = string.Empty,

            }, ((Newtonsoft.Json.Linq.JContainer)((Newtonsoft.Json.Linq.JContainer)viewInput).First).First);


            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Payroll_addUpdateEmployeePayrollRecursiveDeduction.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }

    [Command(Name = "Payroll_addUpdateEmployeePayroll_New")]
    public class Payroll_addUpdateEmployeePayroll_NewCommand : CamelCommandBase
    {

        protected override object DoAction(object data)
        {

            object result = new { status = false, returnUrl = "#" };

            var model = base.MappedModel(new
            {
                BulkPayrollInsertion = new List<BulkPayrollInsertion>(),
                UserID = 0,
                Language = string.Empty
            }, data);

           
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();


                var table = new KeyValuePair<string, DataTable>("[dbo].[BulkPayrollInsertion]", ExtensionMethods.ToDataTable(model.BulkPayrollInsertion));
                var ProductList = new Dictionary<string, KeyValuePair<string, DataTable>>();
                ProductList.Add("@BulkPayrollInsertion", table);
                values = _params.Get(model);
                return repository.GetMultipleWithTableValuParam<dynamic>(StoreProcedure.Payroll_addUpdateEmployeePayroll_New.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.connectionString);

          
          
        }

    }

    #region  
    [Command(Name = "Payroll_employeeMonthWiseReport")]
    public class Payroll_employeeMonthWiseReportCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                PayrollYear = 0,
                Language = string.Empty,

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Payroll_employeeMonthWiseReport.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }
    #endregion
     #region COMMAND IS USED IN REPORT 
    [Command(Name = "Payroll_LoadEmployeeSalarySlipByID")]
    public class Payroll_LoadEmployeeSalarySlipByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Payroll_Id = 0,
                Language = string.Empty,

            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            return repository.GetDataSet<dynamic>(StoreProcedure.Payroll_LoadEmployeeSalarySlipByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }
    #endregion

}

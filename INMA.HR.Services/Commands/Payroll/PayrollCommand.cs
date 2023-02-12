using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository; 
using System.Collections.Generic; 
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
                PayrollMonth = string.Empty ,
                PayrollYear = string.Empty ,
                Language = string.Empty ,                
               
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Employees_SelectForPayroll.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    } 

}

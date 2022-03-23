using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services.Commands.Common
{
    [Command(Name = "Setup_Type_DropdownByTypeName")]
    public class UserManagement_Menu_GetAllCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                TypeName = string.Empty,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Setup_Type_DropdownByTypeName.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }

    [Command(Name = "Setup_Type_DropdownByTypeName_For_ShortLeave")]
    public class Setup_Type_DropdownByTypeName_For_ShortLeaveCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                TypeName = string.Empty,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Setup_Type_DropdownByTypeName_For_ShortLeave.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }
}

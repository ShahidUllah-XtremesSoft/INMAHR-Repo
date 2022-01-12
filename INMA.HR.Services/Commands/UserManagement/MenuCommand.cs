using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services.Commands.UserManagement
{
    [Command(Name = "UserManagement_Menu_Save")]
    public class UserManagement_Menu_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {        
            var model = base.MappedModel(new
            {
                Id = 0,
                NameEng = string.Empty,
                NameArb = string.Empty,
                //Controller = string.Empty,
                //Action = string.Empty,
                Url = string.Empty,
                Icon = string.Empty,
                MenuGroup = string.Empty,
                ModuleId = 0,
                CreatedBy = 0,
                Language   = string.Empty
            }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            IDictionary<string, object> ImageValues = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            //string procedure = model.Language == "English" ? StoreProcedure./.ToString() : StoreProcedure.UserManagement_Menu_Save_Arb.ToString();
            string procedure = StoreProcedure.UserManagement_Menu_Save.ToString();
            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(procedure, values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    [Command(Name = "UserManagement_Menu_GetAll")]
    public class UserManagement_Menu_GetAllCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.UserManagement_Menu_GetAll.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }
    [Command(Name = "UserManagement_Menu_Delete")]
    public class UserManagement_Menu_DeleteCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                Language = string.Empty
            }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            IDictionary<string, object> ImageValues = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            string procedure = StoreProcedure.UserManagement_Menu_Delete.ToString();
            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(procedure, values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    
}


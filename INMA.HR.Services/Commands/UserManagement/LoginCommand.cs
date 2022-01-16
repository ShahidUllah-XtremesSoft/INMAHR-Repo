using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services.Commands.UserManagement
{
    [Command(Name = "UserManagement_ValidateCredenial")]
    public class UserManagement_ValidateCredenialCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        { 
            var model = base.MappedModel(new
            {
                Email = string.Empty,
                Password = string.Empty,
                Language = string.Empty


            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            IDictionary<string, object> ImageValues = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            string procedure = StoreProcedure.UserManagement_ValidateCredenial.ToString();
            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(procedure, values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }

    }




    [Command(Name = "UserManagement_UserLogin")]
    public class UserManagement_SaveLoginCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Id    = 0,
                Email   = string.Empty,
                Password   = string.Empty,
                EmployeeId = 0,
                RoleId  = 0,
                DepartmentId    = 0,
                CreatedBy   = 0,
                Language  = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            IDictionary<string, object> ImageValues = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.UserManagement_Login_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return _response;
        }
    }  
    [Command(Name = "Users_UpdatedPassword")]
    public class Users_UpdatedPasswordCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                EmployeeNum = string.Empty,
                OldPassword = string.Empty,
                NewPassword = string.Empty,
                Language  = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            IDictionary<string, object> ImageValues = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Users_UpdatedPassword.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return _response;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Configuration;
using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;

namespace INMA.HR.Services
{
   [Command(Name = "login")]
    public class LoginCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, token = "" };
            var model = base.MappedModel(new { username = string.Empty, password = string.Empty }, v);
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            values.Add("@username", model.username);
            values.Add("@password", model.password);
            var _user = repository.GetSingle<dynamic>(StoreProcedure.UserLogin_Select.ToString(), values,XtremeFactory._factory, XtremeFactory.connectionString);
            if (_user != null)
            { result = new { status = true, token = XtremeTokenManager.GenerateToken(_user.UserName) }; }

            return result;
        }
    }
   
   
}

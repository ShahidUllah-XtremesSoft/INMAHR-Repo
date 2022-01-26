using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services
{
    [Command(Name = "HR_Profession_Save")]
    public class HR_Profession_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };

            var model = base.MappedModel(new
            {
                Id = 0,
                NameEng = string.Empty,
                NameArb = string.Empty,
                CreatedBy = 0,
                Language = string.Empty
            }, v);

            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            IDictionary<string, object> ImageValues = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            
            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.HR_Profession_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return _response;
        }
    }


    [Command(Name = "HR_Profession_GetAll")]
    public class HR_Profession_GetAllCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { Language = string.Empty }, v);
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.HR_Profession_GetAll.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }

    [Command(Name = "HR_Profession_Delete")]
    public class HR_Profession_DeleteCommand : CamelCommandBase
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

            string procedure = StoreProcedure.HR_Profession_Delete.ToString();
            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(procedure, values, XtremeFactory._factory, XtremeFactory.connectionString);
            return _response;
        }
    }
    //This Command is for Profession Local Storage
    [Command(Name = "HR_Profession_Get")]
    public class HR_Profession_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { Language = string.Empty }, v);
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.HR_Profession_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }


}

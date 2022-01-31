using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services.Commands.Setup
{
    [Command(Name = "Setup_PublicHoliday_Save")]
    public class Setup_PublicHoliday_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            object result = new { status = false, returnUrl = "#" };

            var model = base.MappedModel(new
            {
                Id = 0,
                NameEng = string.Empty,
                NameArb = string.Empty,
                StartDate = string.Empty,
                EndDate = string.Empty,
                CreatedBy = 0,
                Language = string.Empty
            }, viewInput);

            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            IDictionary<string, object> ImageValues = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Setup_PublicHoliday_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return _response;
        }
    }   

    [Command(Name = "Setup_PublicHoliday_Delete")]
    public class Setup_PublicHoliday_DeleteCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                Language = string.Empty
            }, viewInput);

            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            IDictionary<string, object> ImageValues = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            string procedure = StoreProcedure.Setup_PublicHoliday_Delete.ToString();
            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(procedure, values, XtremeFactory._factory, XtremeFactory.connectionString);
            return _response;
        }
    }
    //This Command is for Contract Type Local Storage
    [Command(Name = "Setup_PublicHoliday_Get")]
    public class Setup_PublicHoliday_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            
            var model = base.MappedModel(new { Language = string.Empty }, viewInput);
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Setup_PublicHoliday_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }
}

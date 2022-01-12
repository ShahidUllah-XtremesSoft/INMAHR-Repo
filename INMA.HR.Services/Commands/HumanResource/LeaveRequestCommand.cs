using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services
{

    [Command(Name = "LeaveRequest_Save")]
    public class LeaveRequest_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };

            var model = base.MappedModel(new
            {
                Id = 0,
                LeaveType = string.Empty,
                StartDate = string.Empty,
                EndDate = string.Empty,
                NumberOfDays = 0,
                Status = string.Empty,
                Language = string.Empty,
                Createdby = 0
            }, v);
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            IDictionary<string, object> ImageValues = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            string procedureName = model.Id == 0 ? StoreProcedure.HR_LeaveRequest_Save.ToString() : StoreProcedure.HR_LeaveRequest_Update.ToString();
            var _response = repository.GetSingle<dynamic>(procedureName, values, XtremeFactory._factory, XtremeFactory.connectionString);
            return _response;

        }


        [Command(Name = "HR_LeaveRequest_GetAll")]
        public class HR_LeaveRequest_GetAllCommand : CamelCommandBase
        {
            protected override object DoAction(object v)
            {
                object result = new { status = false, returnUrl = "#" };
                var model = base.MappedModel(new { Language = string.Empty }, v);
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                var RES = repository.GetMultiple<dynamic>(StoreProcedure.HR_LeaveRequest_GetAll.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                return RES;
            }
        }




        [Command(Name = "HR_LeaveRequest_GetLeaveQuota")]
        public class HR_LeaveRequest_GetLeaveQuotaCommand : CamelCommandBase
        {
            protected override object DoAction(object v)
            {
                object result = new { status = false, returnUrl = "#" };
                var model = base.MappedModel(new { Id = 0 }, v);
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                var RES = repository.GetSingle<dynamic>(StoreProcedure.HR_LeaveType_GetQuota.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                return RES;
            }
        }


    }
}


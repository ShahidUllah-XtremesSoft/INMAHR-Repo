using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services
{
   
        [Command(Name = "HR_VisaSponsorship_Save")]
        public class HR_VisaSponsorship_SaveCommand : CamelCommandBase
        {
            protected override object DoAction(object v)
            {
            try
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
                var _response = repository.GetSingle<dynamic>(StoreProcedure.HR_VisaSponsorship_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                return _response;
            }
            catch (Exception ex)
            {

                throw ex;
            }
            }
        }


        [Command(Name = "HR_VisaSponsorship_GetAll")]
        public class HR_VisaSponsorship_GetAllCommand : CamelCommandBase
        {
            protected override object DoAction(object v)
            {
            try
            {
                object result = new { status = false, returnUrl = "#" };
                var model = base.MappedModel(new { Language = string.Empty }, v);
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                var RES= repository.GetMultiple<dynamic>(StoreProcedure.HR_VisaSponsorship_GetAll.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                return RES;
            }
            catch (Exception EX)
            {

                throw EX;
            }

               

            }
        }

        [Command(Name = "HR_VisaSponsorship_Delete")]
        public class HR_VisaSponsorship_DeleteCommand : CamelCommandBase
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

                string procedure = StoreProcedure.HR_VisaSponsorship_Delete.ToString();
                values = _params.Get(model);
                var _response = repository.GetSingle<dynamic>(procedure, values, XtremeFactory._factory, XtremeFactory.connectionString);
                return _response;
            }
        }

    }


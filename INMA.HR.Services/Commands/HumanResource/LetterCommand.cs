using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services
{

    
    [Command(Name = "Letter_Save")]
    public class Letter_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };

            var model = base.MappedModel(new
            {
                Id = 0,
                LetterTypeArb = string.Empty,
                LetterTypeEng = string.Empty,
                NoteEng = string.Empty,
                NoteArb = string.Empty,
                Status = string.Empty,
                CreatedBy = 0,
                Language = string.Empty
            }, v);
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            IDictionary<string, object> ImageValues = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.HR_LetterRequest_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return _response;
        }


        [Command(Name = "Letter_GetAll")]
        public class Letter__GetAllCommand  : CamelCommandBase
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
                    var RES = repository.GetMultiple<dynamic>(StoreProcedure.HR_LetterRequest_GetAll.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                    return RES;
                }
                catch (Exception EX)
                {

                    throw EX;
                }



            }
        }


    }
}

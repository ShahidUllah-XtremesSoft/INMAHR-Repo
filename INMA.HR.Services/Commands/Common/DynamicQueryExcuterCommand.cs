using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services.Commands.Common
{
    [Command(Name = "Common_DropdownList")]
    public class Common_DropdownListCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Columns = string.Empty,
                TableName = string.Empty,
                Conditions = string.Empty,
                SelectedValue = string.Empty,
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            string dynamicQuery = $"SELECT {model.Columns},0 [IsSelected] FROM {model.TableName} WHERE IsDeleted = 0 " + (string.IsNullOrEmpty(model.Conditions) == true ? "" : "AND "+model.Conditions);
            //values = _params.Get(model);
            var response = repository.GetByQuery<dynamic>(dynamicQuery.ToString(),  XtremeFactory._factory, XtremeFactory.connectionString);
            int rowIndex = 0;
            List<dynamic> dynamicResponse = new List<dynamic>();
            foreach(var row in response)
            {
                if (model.SelectedValue != null)
                {
                    if (model.SelectedValue.Equals(row.Value.ToString()))
                    {
                        row.IsSelected = row.Value.ToString();
                    }
                }
                dynamicResponse.Add(row);                

                rowIndex++;
            }
            //for(int row = 0; row < response.Count(); row++)
            //{
            //    response[row].Valu
            //}
            return dynamicResponse;

        }
    }
    
}

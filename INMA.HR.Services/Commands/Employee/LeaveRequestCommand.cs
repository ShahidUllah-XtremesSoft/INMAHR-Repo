﻿using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services.Commands.Employee
{

    #region Employee_AllLeaves_Get 

 
    [Command(Name = "Employees_Request_Leave_Get")]
    public class Employees_Request_Leave_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
              //  CreatedBy = 0,
                LoggedInUserId = string.Empty,
                LoggedInUserRoleId = 0,
                LoggedInUserDepartmentId = 0,
                Language = string.Empty,

            }, v);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            // Old sp Employee_AllLeaves_Get
            var _response = repository.GetMultiple<dynamic>(StoreProcedure.Employees_Request_Leave_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            return _response;
        }
    }
    #endregion

    #region BULK  Request_Employee_AllLeaves_Save

 
    [Command(Name = "Request_Employee_AllLeaves_Save")]
    public class Request_Employee_AllLeaves_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                EmployeeRequestData = new List<EmployeeRequestData>(),
               // Language = string.Empty
            }, viewInput); ;


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
             
            var table = new KeyValuePair<string, DataTable>("[dbo].[UD_Request_Employee_AllLeaves_Save]", ExtensionMethods.ToDataTable(model.EmployeeRequestData));
            var ProductList = new Dictionary<string, KeyValuePair<string, DataTable>>();
            ProductList.Add("@UD_Request_Employee_AllLeaves_Save", table);
            var response = repository.GetMultipleWithTableValuParam<dynamic>(StoreProcedure.Request_Employee_AllLeaves_Save.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.connectionString);
            return response.ToList()[0]; 

        }

    }
    #endregion

}

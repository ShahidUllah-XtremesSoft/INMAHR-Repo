using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services;
using System;
using System.Collections.Generic;

namespace INMA.Projects.Services.Commands.Dashboard
{
    public class Dashboard_TwoCommand
    {
        #region  GET NEW PROJECTS 
        [Command(Name = "Dashboard_Two_Get_Projects_by_Year")]
        public class Dashboard_Two_Get_Projects_by_YearCommand : CamelCommandBase
        {

            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    //LoggedInUser = 0,
                    //RoleId = 0,
                    //LoggedInEmployeeId = 0,

                    Year = 0,
                    AreaType = string.Empty,
                    Language = string.Empty

                }, viewInput);
                _ = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                IDictionary<string, object> values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.Dashboard_Two_Get_Projects_by_Year.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



                return result;


            }
        }

        #endregion
        #region  GET NEW PROJECTS 
        [Command(Name = "Dashboard_Two_Get_Project_Tenders_by_Year")]
        public class Dashboard_Two_Get_Project_Tenders_by_YearCommand : CamelCommandBase
        {

            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                { 
                    Year = 0,
                    AreaType = string.Empty,
                    Language = string.Empty

                }, viewInput);
                _ = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                IDictionary<string, object> values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.Dashboard_Two_Get_Project_Tenders_by_Year.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



                return result;


            }
        }

        #endregion
        #region  GET TOTAL DELAY PROJECTS 
        [Command(Name = "Dashboard_Two_Get_Delay_Projects_basedOn_Task")]
        public class Dashboard_Two_Get_Delay_Projects_basedOn_TaskCommand : CamelCommandBase
        {

            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                { 
                    LoggedInUser = 0,
                    RoleId = 0,
                    LoggedInEmployeeId = 0,
                    Branch_Id = 0,

                    Year = 0,
                    AreaType = string.Empty,
                    Language = string.Empty

                }, viewInput);
                _ = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                IDictionary<string, object> values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetDataSet<dynamic>(ProjectStoreProcedure.Dashboard_Two_Get_Delay_Projects_basedOn_Task.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);
                 

                return result;


            }
        }

        #endregion
        #region  GET PROJECTS BY MONTH NAME
        [Command(Name = "Dashboard_Two_Projects_Getby_Month_name")]
        public class Dashboard_Two_Projects_Getby_Month_nameCommand : CamelCommandBase
        {

            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {

                    MonthName = string.Empty,
                    Language = string.Empty

                }, viewInput);
                _ = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                IDictionary<string, object> values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetDataSet<dynamic>(ProjectStoreProcedure.Dashboard_Two_Projects_Getby_Month_name.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



                return result;


            }
        }

        #endregion
        #region  GET PROJECTS BY MONTH NAME
        [Command(Name = "Dashboard_Two_Tender_Projects_Getby_Month_name")]
        public class Dashboard_Two_Tender_Projects_Getby_Month_nameCommand : CamelCommandBase
        {

            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {

                    MonthName = string.Empty,
                    Language = string.Empty

                }, viewInput);
                _ = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                IDictionary<string, object> values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetDataSet<dynamic>(ProjectStoreProcedure.Dashboard_Two_Tender_Projects_Getby_Month_name.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



                return result;


            }
        }

        #endregion

    }
}

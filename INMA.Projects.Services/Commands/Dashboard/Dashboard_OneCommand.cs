using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services;
using System;
using System.Collections.Generic;

namespace INMA.Projects.Services.Commands.Dashboard
{
    public class Dashboard_OneCommand
    {
        #region PROJECT TASK WITH DETAILS GET
        [Command(Name = "Dashboard_One_Project_Task_with_Details_Getby_Project_Id")]
        public class Dashboard_One_Project_Task_with_Details_Getby_Project_IdCommand : CamelCommandBase
        {

            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    LoggedInUser = 0,
                    RoleId = 0,
                    LoggedInEmployeeId = 0,
                    Project_No = 0,
                    Language = string.Empty

                }, viewInput);
                _ = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                IDictionary<string, object> values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetDataSet<dynamic>(ProjectStoreProcedure.Dashboard_One_Project_Task_with_Details_Getby_Project_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



                return result;


            }
        }

        #endregion
        #region PROJECT SUMMARY DETAILS GET BY PROJECT NUMBER
        [Command(Name = "Dashboard_One_Project_Summary_Getby_Project_No")]
        public class Dashboard_One_Project_Summary_Getby_Project_NoCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {

                    LoggedInUser = 0,
                    RoleId = 0,
                    LoggedInEmployeeId = 0,
                    Project_No = 0,
                    Language = string.Empty

                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                object repo = repository.GetMultiple<dynamic>(ProjectStoreProcedure.Dashboard_One_Project_Summary_Getby_Project_No.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);
                return repo;
            }
        }

        #endregion
        #region PROJECT TASK WITH DETAILS GET
        [Command(Name = "Dashboard_One_Project_Summary_Document_Expiry_Getby_Project_No")]
        public class Dashboard_One_Project_Summary_Document_Expiry_Getby_Project_NoCommand : CamelCommandBase
        {

            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    LoggedInUser = 0,
                    RoleId = 0,
                    LoggedInEmployeeId = 0,
                    Project_No = 0,
                    Language = string.Empty

                }, viewInput);
                _ = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                IDictionary<string, object> values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetMultiple<dynamic>(ProjectStoreProcedure.Dashboard_One_Project_Summary_Document_Expiry_Getby_Project_No.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



                return result;


            }
        }

        #endregion
        #region  GET ALL PROJECTS BY STATUS
        [Command(Name = "Dashboard_One_Project_total_Getby")]
        public class Dashboard_One_Project_total_GetbyCommand : CamelCommandBase
        {

            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    LoggedInUser = 0,
                    RoleId = 0,
                    LoggedInEmployeeId = 0,
                    Project_No = 0,
                    Project_Status = string.Empty,
                    Project_ByYear = string.Empty,
                    Project_ByMonth = string.Empty,
                    Project_ByWeek = string.Empty,
                    Language = string.Empty

                }, viewInput);
                _ = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                IDictionary<string, object> values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetDataSet<dynamic>(ProjectStoreProcedure.Dashboard_One_Project_total_Getby.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



                return result;


            }
        }

        #endregion
        #region  GET ALL PROJECTS BY STATUS new
        [Command(Name = "Dashboard_One_Project_total_Getby_New")]
        public class Dashboard_One_Project_total_Getby_NewCommand : CamelCommandBase
        {

            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    LoggedInUser = 0,
                    RoleId = 0,
                    LoggedInEmployeeId = 0,
                    Project_No = 0,
                    Project_Status = string.Empty,
                    Project_ByYear = string.Empty,
                    Project_ByMonth = string.Empty,
                    Project_ByWeek = string.Empty,
                    Language = string.Empty

                }, viewInput);
                _ = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                IDictionary<string, object> values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetDataSet<dynamic>(ProjectStoreProcedure.Dashboard_One_Project_total_Getby_New.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



                return result;


            }
        }

        #endregion
        #region  GET PROJECTS BY STATUS Id
        [Command(Name = "Dashboard_One_Projects_Getby_Status_Id")]
        public class Dashboard_One_Projects_Getby_Status_IdCommand : CamelCommandBase
        {

            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    Status_Id = 0,
                    Language = string.Empty

                }, viewInput);
                _ = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                IDictionary<string, object> values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetDataSet<dynamic>(ProjectStoreProcedure.Dashboard_One_Projects_Getby_Status_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



                return result;


            }
        }

        #endregion
        #region  GET PROJECTS BY STATUS TEXT
        [Command(Name = "Dashboard_One_Projects_Getby_Status_Text")]
        public class Dashboard_One_Projects_Getby_Status_TextCommand : CamelCommandBase
        {

            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    Project_Id = 0,
                    Task_Status = string.Empty,
                    Language = string.Empty

                }, viewInput);
                _ = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                IDictionary<string, object> values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetDataSet<dynamic>(ProjectStoreProcedure.Dashboard_One_Projects_Getby_Status_Text.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



                return result;


            }
        }

        #endregion
        #region  GET PROJECTS SECTION SUMMARY BY PROJECT ID
        [Command(Name = "Dashboard_One_Project_STEPPER_Summary_Getby_Project_Id")]
        public class Dashboard_One_Project_STEPPER_Summary_Getby_Project_IdCommand : CamelCommandBase
        {

            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    Project_Id = 0,
                    Language = string.Empty

                }, viewInput);
                _ = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                IDictionary<string, object> values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetDataSet<dynamic>(ProjectStoreProcedure.Dashboard_One_Project_STEPPER_Summary_Getby_Project_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



                return result;


            }
        }

        #endregion

        #region  GET PROJECTS SECTION SUMMARY BY PROJECT ID
        [Command(Name = "Dashboard_One_Project_STEPPER_Summary_Getby_Project_Id_and_SectionId")]
        public class Dashboard_One_Project_STEPPER_Summary_Getby_Project_Id_and_SectionIdCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    Project_Id = 0,
                    Section_Id = 0,
                    Language = string.Empty

                }, viewInput);
                _ = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                IDictionary<string, object> values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetDataSet<dynamic>(ProjectStoreProcedure.Dashboard_One_Project_STEPPER_Summary_Getby_Project_Id_and_SectionId.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);
                 

                return result;


            }
        }

        #endregion
        #region  GET PROJECTS TENDER DATA
        [Command(Name = "Dashboard_One_Projects_Getby_Tender")]
        public class Dashboard_One_Projects_Getby_TenderCommand : CamelCommandBase
        {

            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    Project_Id = 0,
                    Language = string.Empty

                }, viewInput);
                _ = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                IDictionary<string, object> values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetDataSet<dynamic>(ProjectStoreProcedure.Dashboard_One_Projects_Getby_Tender.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



                return result;


            }
        }

        #endregion
    }
}

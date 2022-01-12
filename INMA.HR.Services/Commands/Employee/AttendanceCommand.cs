using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services.Commands.Employee
{
    [Command(Name = "Employee_Attendance_GetByDepartment")]
    public class Employee_Attendance_GetByDepartmentCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                LoggedInEmployeeId = 0,
                DepartmentIds = string.Empty,
                CheckInDate = string.Empty,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var response = repository.GetMultiple<dynamic>(StoreProcedure.Employee_Attendance_GetByDepartment.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return response;

        }
    }
    [Command(Name = "Employee_Attendance_Today_GetByDepartment")]
    public class Employee_Attendance_Today_GetByDepartmentCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {                
                DepartmentId = 0,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var response = repository.GetMultiple<dynamic>(StoreProcedure.Employee_Attendance_Today_GetByDepartment.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return response;

        }
    }
    [Command(Name = "Employee_Attendance_SaveForToday")]
    public class Employee_Attendance_SaveForTodayCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                CreatedBy = 0,
                LoggedInUserDepartmentId = 0,
                RoleId = 0,
                SearchByDepartmentId = 0,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var response = repository.GetMultiple<dynamic>(StoreProcedure.Employee_Attendance_SaveForToday.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return response;

        }
    }
    [Command(Name = "Employee_Attendance_TodayAttendance_Get")]
    public class Employee_Attendance_TodayAttendance_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                CreatedBy = 0,
                LoggedInUserDepartmentId = 0,
                RoleId = 0,
                SearchByDepartmentId = 0,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var response = repository.GetMultiple<dynamic>(StoreProcedure.Employee_Attendance_TodayAttendance_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return response;

        }
    }
    [Command(Name = "Employee_Attendance_UpdateTodayAttendanceAsProcessed")]
    public class Employee_Attendance_UpdateTodayAttendanceAsProcessedCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                CreatedBy = 0,
                DepartmentId = 0,
                AttendanceIds = string.Empty,
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var response = repository.GetSingle<dynamic>(StoreProcedure.Employee_Attendance_UpdateTodayAttendanceAsProcessed.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return response;

        }
    }
    [Command(Name = "Employee_Attendance_GetByEmployee")]
    public class Employee_Attendance_GetByEmployeeCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                EmployeeId = 0,
                StartDate = string.Empty,
                EndDate = string.Empty,                
                Language = string.Empty
            }, viewInput);


            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            var response = repository.GetMultiple<dynamic>(StoreProcedure.Employee_Attendance_GetByEmployee.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return response;

        }
    }
}

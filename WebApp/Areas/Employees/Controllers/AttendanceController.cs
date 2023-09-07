using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApp.Areas.Employees.Controllers
{
    public class AttendanceController : Controller
    {
        // GET: Employees/Attendance
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Today()
        {
            return View();
        }
        public ActionResult Personal()
        {
            return View();
        }
        public ActionResult Detail()
        {
            return View();
        }
        public ActionResult Report()
        {
            return View();
        }
        public PartialViewResult PersonalAttendancePartialView()
        {
            return PartialView();
        }
        public PartialViewResult EmployeeAttendancePartialView()
        {
            return PartialView();
        }
       
    }
}
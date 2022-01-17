using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApp.Areas.EmployeesRequest.Controllers
{
    public class LeaveController : Controller
    {
        // GET: Request/Leave
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Cancel()
        {
            return View();
        }
    }
}
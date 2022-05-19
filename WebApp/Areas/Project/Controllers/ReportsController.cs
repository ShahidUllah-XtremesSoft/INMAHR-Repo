using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApp.Areas.Project.Controllers
{
    public class ReportsController : Controller
    {
        // GET: Project/Reports
        public ActionResult TechnicalSection()
        {
            return View();
        }
        public ActionResult DesignSection()
        {
            return View();
        }
        public ActionResult Summary()
        {
            return View();
        }
    }
}
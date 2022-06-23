using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApp.Areas.Project.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Project/Dashboard
        public ActionResult Index()
        {
            return View();
        }
    }
}
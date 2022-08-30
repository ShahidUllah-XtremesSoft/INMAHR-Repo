using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApp.Areas.Employees.Controllers
{
    public class RequestController : Controller
    {
        // GET: Employees/Letters
        public ActionResult Letters()
        {
            return View("~/Areas/Employees/Views/Request/Letters.cshtml");
        }
        // GET: Request/Leaves
        public ActionResult Leaves()
        {
            return View("~/Areas/Employees/Views/Request/Leaves.cshtml");
        }
        // GET: Request/ShortLeaves
        public ActionResult ShortLeaves()
        {
            return View("~/Areas/Employees/Views/Request/ShortLeaves.cshtml");
        }
        // GET: Request/Cancel
        public ActionResult Cancel()
        {
            return View("~/Areas/Employees/Views/Request/Cancel.cshtml");
        }
        // GET: Request/CashInLeaves
        public ActionResult CashInLeaves()
        {
            return View("~/Areas/Employees/Views/Request/CashInLeaves.cshtml");
        }
           public ActionResult Details()
        {
            return View("~/Areas/Employees/Views/Request/RequestDetails.cshtml");
        }
           public ActionResult Detail()
        {
            return View("~/Areas/Employees/Views/Request/ShorLeave_RequestDetails.cshtml");
        }
     
    }
}
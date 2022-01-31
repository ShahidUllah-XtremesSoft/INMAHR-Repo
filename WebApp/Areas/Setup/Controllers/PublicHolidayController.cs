using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApp.Areas.Setup.Controllers
{
    public class PublicHolidayController : Controller
    {
        // GET: Setup/PublicHoliday
        public ActionResult Index()
        {
            return View();
        }
    }
}
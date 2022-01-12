using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApp.Areas.UserManagement.Controllers
{
    public class MenuController : Controller
    {
        // GET: UserManagement/Menu
        public ActionResult Index()
        {
            return View();
        }
    }
}
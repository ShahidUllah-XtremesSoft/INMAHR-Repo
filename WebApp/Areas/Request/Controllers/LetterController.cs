using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApp.Areas.Request.Controllers
{
    public class LetterController : Controller
    {
        // GET: Request/Letter
        public ActionResult Index()
        {
            return View();
        }
    }
}
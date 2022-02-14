using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApp.Areas.Employees.Controllers
{
    public class InternalLetterController : Controller
    {
        // GET: Employees/InternalLetter
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult New()
        {
            return View();
        }
        public ActionResult Read()
        {
            return View();
        }

        public ActionResult Forward()
        {
            return View();
        }
        public ActionResult Reply()
        {
            return View();
        }




        public PartialViewResult InboxPartialView(object inputJSON)//object menuItems)
        {
            //ViewBag.LetterInboxJSON = inputJSON;
            //ViewBag.MenuItems = menuItems;            
            //var menuItem = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(menuItems);


            //return PartialView("~/Views/Shared/PartialViews/_LeftMenuPartialView.cshtml");
            return PartialView("~/Areas/Employees/Views/Shared/PartialViews/InternalLetter/_InternalLetterInboxPartialView.cshtml");
        }
        public PartialViewResult OutboxPartialView(string inputJSON)//object menuItems)
        {

            ViewBag.LetterInboxJSON = inputJSON;
            //var menuItem = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(menuItems);


            //return PartialView("~/Views/Shared/PartialViews/_LeftMenuPartialView.cshtml");
            return PartialView("~/Areas/Employees/Views/Shared/PartialViews/InternalLetter/_InternalLetterOutboxPartialView.cshtml");
        }
    }
}
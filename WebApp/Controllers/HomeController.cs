using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace WebApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Test()
        {
            return View();
        }
        public ActionResult Index()//string language)
        {

            return View();

        }
        public ActionResult ChangeLanguage(string language)
        {

            Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(language);
            Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo(language);
            var myLanguageCookie = new HttpCookie("Lang");
            myLanguageCookie.Value = language;
            myLanguageCookie.Expires = DateTime.Now.AddYears(1);
            Response.Cookies.Add(myLanguageCookie);
            return Redirect(HttpContext.Request.UrlReferrer.PathAndQuery);
        }
        //[HttpPost]
        //public ActionResult Index(string language)
        //{
        //    string lang = language;
        //    Session["Language"] = language;
        //    Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(language);
        //    Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo(language);
        //    var myLanguageCookie = new HttpCookie("Lang");
        //    myLanguageCookie.Value = language;
        //    myLanguageCookie.Expires = DateTime.Now.AddYears(1);
        //    Response.Cookies.Add(myLanguageCookie);
        //    return Redirect(HttpContext.Request.UrlReferrer.PathAndQuery);


        //   // return View();
        //}

        public ActionResult Login()
        {
            HttpContext.Request.Cookies["Lang"].Value = "en-US";
            ViewBag.Message = "Your application description page.";

            return View();
        }
        public ActionResult Application()
        {
            HttpContext.Request.Cookies["Lang"].Value = "en-US";
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public new ActionResult Request()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public PartialViewResult LoadLeftMenuPartialView(string menuItems,string menuCount)//object menuItems)
        {
            //Session["MenuItems"]
            ViewBag.MenuItems = menuItems;
            ViewBag.MenuCount = menuCount;
            //var test = HttpContext.Request.Cookies["Lang"].Value;
            var menuItem = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(menuItems);


            return PartialView("~/Views/Shared/PartialViews/_LeftMenuPartialView.cshtml");
        }
    }
}
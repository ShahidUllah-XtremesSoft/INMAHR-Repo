using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApp.Areas.HumanResource.Controllers
{
    public class EmployeeController : Controller
    {
        // GET: HumanResource/Employee
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult List()
        {
            return View();
        }
         public ActionResult Resigned()
        {
            return View();
        }

        public ActionResult Add()
        {
            return View();

        }


        public ActionResult Edit(int id)
        {
            return View();
        }

        public ActionResult Detail()
        {
            return View();
        }
        public ActionResult View(int id)
        {
            return View();
        }
        public new ActionResult Profile()
        {
            return View();
        }
        public ActionResult SalarySetting()
        {
            return View();
        }
        public ActionResult Progress()
        {
            return View();
        }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApp.Areas.Project.Controllers
{
    public class ProjectController : Controller
    {
        #region ============ PROJECT ==================


        public ActionResult List()
        {
            return View();
        }
        public ActionResult Delay()
        {
            return View();
        }
        public ActionResult Save()
        {
            return View();
        }
        public ActionResult Details()
        {
            return View();
        }  
        //Below Detail is used for employees ..
        public ActionResult Detail()
        {
            return View("~/Areas/Project/Views/Project/Details-for-employee.cshtml");

        }
        public ActionResult LoadAllEmployees()
        {
            return PartialView("~/Areas/Project/Views/Shared/PartialViews/Project/_Load_All_Employees.cshtml");
        }
        public ActionResult LoadAllEmployeess()
        {
            return PartialView("~/Areas/Project/Views/Shared/PartialViews/Project/_Load_DesignSection_All_Employees.cshtml");
        }
        //public ActionResult Load_Assigned_Employees()
        //{
        //    return PartialView("~/Areas/Project/Views/Shared/PartialViews/Project/_Load_DesignSection_All_Assigned_Employees.cshtml");
        //}
        public ActionResult Load_Technical_Section_Employees()
        {
            return PartialView("~/Areas/Project/Views/Shared/PartialViews/Project/_Load_Technical_Section_Employees.cshtml");
        }
        public ActionResult Load_Supervision_Section_Employees()
        {
            return PartialView("~/Areas/Project/Views/Shared/PartialViews/Project/_Load_Supervision_Section_Employees.cshtml");
        }
        #endregion
     

    }
}

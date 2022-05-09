using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApp.Areas.HumanResource.Controllers
{
    public class CompanyDocumentController : Controller
    {
        // GET: HumanResource/CompanyDocument
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult LoadCompanyDocument()
        {
            return PartialView("~/Areas/HumanResource/Views/Shared/PartialViews/_CompanyNearToExpireDocument.cshtml");
        }
    }
}
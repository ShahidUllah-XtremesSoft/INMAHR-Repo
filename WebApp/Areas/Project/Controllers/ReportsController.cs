 
using System.Web.Mvc;

namespace WebApp.Areas.Project.Controllers
{
    public class ReportsController : Controller
    {
        // GET: Project/Reports
        public ActionResult TechnicalSection()
        {
            return View();
        }
        public ActionResult DesignSection()
        {
            return View();
        }
        public ActionResult Summary()
        {
            return View();
        }

        [ActionName("project-summary-list")]
        public ActionResult SummaryList()
        {
            return View("~/Areas/Project/Views/Reports/SummaryList.cshtml");
        }

     
    }
}
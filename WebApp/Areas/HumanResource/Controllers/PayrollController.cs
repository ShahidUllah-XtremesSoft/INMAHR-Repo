 
using System.Web.Mvc;
namespace WebApp.Areas.HumanResource.Controllers
{

    public class PayrollController : Controller
    {
        // GET: Payroll/
        public ActionResult Index()
        {
            return View("~/Areas/HumanResource/Views/Payroll/Index.cshtml");

        }
        public ActionResult Report()
        {
            return View("~/Areas/HumanResource/Views/Payroll/Report.cshtml");
        }
        //public ActionResult Deduction()
        //{
        //    return View();
        //}


    }
}
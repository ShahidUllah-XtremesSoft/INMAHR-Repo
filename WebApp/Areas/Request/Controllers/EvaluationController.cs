 
using System.Web.Mvc;

namespace WebApp.Areas.Request.Controllers
{
    public class EvaluationController : Controller
    {
        // GET: Request/Evaluation
        public ActionResult Index()
        {
            return View();
        } 
        public ActionResult Create()
        {
            return View();
        }
    }
}
using System.Web.Mvc;

namespace WebApp.Areas.Setup.Controllers
{
    public class RosterController : Controller
    {
        // GET: Setup/Roster
        public ActionResult Index()
        {
            return View();
        }
    }
}
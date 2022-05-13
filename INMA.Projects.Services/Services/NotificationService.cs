using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.Projects.Services.Services
{
    public class NotificationService
    {
        public dynamic Save(string subjectEng, string subjectArb = "", string descriptionEng = "", string descriptionArb = "", string area = "", int projectId =0, int userId=0,int employeeId = 0,  string language = "en-US")
        {
            IDictionary<string, object> values = new Dictionary<string, object>();
            values.Add("@Id", 0);
            values.Add("@SubjectEng", subjectEng);
            values.Add("@SubjectArb", subjectArb);
            values.Add("@DescriptionEng", descriptionEng);
            values.Add("@DescriptionArb", descriptionArb);
            values.Add("@Area", area);
            values.Add("@Status", "Active");
            values.Add("@Project_Id", projectId);            
            values.Add("@UserId", userId);
            values.Add("@EmployeeId", employeeId);
            values.Add("@Language", language);            
            var _response = Ioc.Resolve<IRepository>().GetSingle<dynamic>(ProjectStoreProcedure.Notification_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            return _response;
        }
    }
}

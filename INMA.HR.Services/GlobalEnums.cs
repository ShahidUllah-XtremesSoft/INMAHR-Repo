using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services
{
    //Once an Enum created do not change it's value because used in multiple areas - Change will cause major issues
    public enum EntityType
    {
        Employee = 1,
        Requests = 2,
        InternalLetter = 3,
        Company = 4,
        Client = 5,
        Meetings = 6,
    }
    public enum DocumentType
    {
        #region EMPLOYEE DOCUMENT ENUM

        EmployeeProfileImage = 1,
        EmployeePersonalDocument      = 2,
        EmployeeEducationalDocument   = 3,
        InternalLetterAttachment      = 4,
        CompanyDocument               = 5,
        EmployeeSignature             = 6,

        #endregion

        #region CLIENT DOCUMENT ENUM

        ClientProfileImage      = 7,
        ClientPersonalDocument  = 8,
        ClientSignature         = 9,

        #endregion 
        #region CLIENT MEETINGS ENUM

        Meetings = 10,
       

        #endregion

    }
}

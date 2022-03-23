using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.Projects.Services
{
    //Once an Enum created do not change it's value because used in multiple areas - Change will cause major issues
    public enum EntityType
    {
        Employee = 1,
        Requests = 2,
        InternalLetter = 3,
        Company = 4,
    }
    public enum DocumentType
    {
        EmployeeProfileImage = 1,
        EmployeePersonalDocument = 2,
        EmployeeEducationalDocument = 3,
        InternalLetterAttachment = 4,
        CompanyDocument = 5,
        EmployeeSignature = 6,


    }
}

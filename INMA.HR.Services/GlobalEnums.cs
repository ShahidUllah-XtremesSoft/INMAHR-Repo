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

        Project = 7,
        //DESIGN SECTION
        Project_DesignSection_GovernmentDocument = 8,
        Project_DesignSection_InitialSketch = 9,
        Project_DesignSection_SketchPlanning = 10,
        Project_DesignSection_TownPlanning = 11,
        Project_DesignSection_Modifications = 12,
        Project_DesignSection_Other = 13,
        Project_DesignSection_Modification_Type = 14,
        Project_DesignSection_Modification_Services = 15,

        //TECHNICAL SECTION
        Project_TechnicalSection_TechnicalManager = 16,
        Project_TechnicalSection_MEP_Section = 17,
        Project_TechnicalSection_MEP_Submission_Section = 18,
        Project_TechnicalSection_MEP_Approval_Section = 19,
        Project_TechnicalSection_Structural_Section = 20,
        Project_TechnicalSection_Municipality_Section = 21,
        Project_TechnicalSection_Municipality_Submission_Section = 22,
        Project_TechnicalSection_Tender_Section = 23,

        //SUPERVISION SECTION
        Project_SupervisionSection_Payments = 24,
        Project_SupervisionSection_Site = 25,
        Project_SupervisionSection_Supervision_Letters = 26,
        Project_SupervisionSection_Supervision_Municipality = 27,
        Project_SupervisionSection_Shop_Drawing_SubContractor = 28,
        Project_SupervisionSection_Supervision_Documents = 29,
        Project_SupervisionSection_CashFlow = 30,
        Project_SupervisionSection_SupervisionContract = 31,
        Project_SupervisionSection_CompletionDocument = 32,


        Issue = 35,
        Notification = 36,
        Contractor = 37,
        CommentAttachment = 38,
        Rule = 39,
        Penalty = 40,
        //PROMOTION
        Promotion = 41,
        Tasks = 42
    }
    public enum DocumentType
    {
        #region EMPLOYEE DOCUMENT ENUM

        EmployeeProfileImage = 1,
        EmployeePersonalDocument = 2,
        EmployeeEducationalDocument = 3,
        InternalLetterAttachment = 4,
        CompanyDocument = 5,
        EmployeeSignature = 6,

        #endregion

        #region CLIENT DOCUMENT ENUM

        ClientProfileImage = 7,
        ClientPersonalDocument = 8,
        ClientSignature = 9,

        #endregion 
        #region CLIENT MEETINGS ENUM

        Meetings = 10,

        #endregion

        #region PROJECT ENUM

        ProjectAttachment = 11,
        ProjectUnitAttachment = 12,
        Project_DesignSection_GovernmentDocument_Attachment = 13,
        Project_DesignSection_InitialSketch_Attachment = 14,
        Project_DesignSection_SketchPlanning_Attachment = 15,
        Project_DesignSection_TownPlanning_Attachment = 16,
        Project_DesignSection_Modifications_Attachment = 17,
        Project_DesignSection_Other_Attachment = 18,
        Project_DesignSection_Modifications_Type_Attachment = 19,
        Project_DesignSection_Modifications_Services_Attachment = 20,
        //TECHNICAL SECTION
        Project_TechnicalSection_TechnicalManager_Attachment = 21,
        Project_TechnicalSection_MEP_Section_Attachment = 22,
        Project_TechnicalSection_MEP_Submission_Section_Attachment = 23,
        Project_TechnicalSection_MEP_Approval_Section_Attachment = 24,
        Project_TechnicalSection_Structural_Section_Attachment = 25,
        Project_TechnicalSection_Municipality_Section_Attachment = 26,
        Project_TechnicalSection_Municipality_Submission_Section_Attachment = 27,
        Project_TechnicalSection_Tender_Section_Attachment = 28,

        //SUPERVISION SECTION
        Project_SupervisionSection_Payments_Attachment = 29,
        Project_SupervisionSection_Site_Attachment = 30,
        Project_SupervisionSection_Supervision_Letters_Attachment = 31,
        Project_SupervisionSection_Supervision_Municipality_Attachment = 32,
        Project_SupervisionSection_Shop_Drawing_SubContractor_Attachment = 33,
        Project_SupervisionSection_Supervision_Documents_Attachment = 34,
        Project_SupervisionSection_CashFlow_Attachment = 39,
        Project_SupervisionSection_SupervisionContract_Attachment = 40,
        Project_SupervisionSection_CompletionDocument_Attachment = 42,




        #endregion



        #region PROJECT ISSUE ENUM
        IssueAttachment = 35,
        #endregion

        #region PROJECT NOTIFICATION ENUM
        NotificationAttachment = 36,
        #endregion
        #region PROJECT NOTIFICATION ENUM
        ContractorProfileImage = 37,
        #endregion
        #region COMMENT ENUM
        CommentAttachment = 38,  // STARTING FROM 42 ....
        #endregion
        Meeting_Multiple = 39,



        Requests = 10001,
        ShorLeave_Requests = 10002,
        Rule_Document = 10003,
        Penalty_Document = 10004,
        Promotion_Document = 10005,

        #region TASK
        Tasks = 42000,
        #endregion


    }
}

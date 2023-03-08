public enum StoreProcedure
{

    #region Common
    Setup_Type_DropdownByTypeName,
    DDL_Attendance_Leave,
    DDL_Department_Parent_Section,
    Setup_Type_DropdownByTypeName_New,
    Setup_Type_DropdownByTypeName_For_ShortLeave,
    Get_All_Count_Notifications,
    Notification_Save,
    //------------ WEBSITE
    Website_Configuration_Get,
    Website_Services_Get,
    #endregion
    DashboardCounter_Select,
    UserLogin_Select,

    UserManagement_Login_Save,
    Users_ChangePassword,
    Users_UpdatedPassword,

    #region HR_Employee

    HR_Employee_SaveArb,
    HR_Employee_Save,
    HR_Employee_GetAll,
    HR_Employee_GetProfileById,
    HR_Employee_GetById,
    HR_Employee_GetByNumber,
    HR_Employee_Delete,
    HR_Employee_GetAllForGrid,
    HR_Employee_Resigned_GetAll_ForGrid,
    HR_Employee_GetAll_For_Admin,

    HR_Employee_Leave_TakenDetail_Get,
    HR_Employee_Leave_AvailableAndTakenDetail_Get,
    #endregion
    #region Employee Personal Document
    HR_Employee_PersonalDocument_Save,
    HR_Employee_PersonalDocument_Get,

    HR_Employee_PersonalDocument_Delete,
    HR_Employee_PersonalDocument_Exist,
    HR_Employee_PersonalDocument_GetNearToExpire,
    HR_Employee_PersonalDocument_GetNearToExpire_ById,
    DDL_HR_Employee_Get,
    #endregion
    #region Employee Educational Document
    HR_Employee_EducationalDocument_Save,
    HR_Employee_EducationalDocument_Get,
    HR_Employee_EducationalDocument_Delete,
    //---------- Employee Addition Deduction
    HR_Employee_RecursiveAdditionDeduction_addUpdateEmployeePayrollAddition,
    HR_Employee_RecursiveAdditionDeduction_Get,
    HR_Employee_RecursiveAddition_Get,
    HR_Employee_RecursiveDeduction_Get,
    HR_Employee_RecursiveAdditionDeduction_Delete,

    //---------------- PARYOLL
    Employees_SelectForPayroll,
    PayrolForEmployee_GetLeavesandTotalhourbyid,
    Payroll_LoadAdditionByEmployeeByID,
    Payroll_LoadDeductionByEmployeeByID,
    Payroll_addUpdateEmployeePayrollAddition,
    Payroll_addUpdateEmployeePayrollRecursiveAddition,
    Payroll_addUpdateEmployeePayrollDeduction,
    Payroll_addUpdateEmployeePayrollRecursiveDeduction,
    Payroll_addUpdateEmployeePayroll_New,
    Payroll_employeeMonthWiseReport,

    //----Payroll Report
    Payroll_LoadEmployeeSalarySlipByID,
    //----Payroll Bonus
    PayrollBonus_Save,
    PayrollBonus_Delete,
    Payroll_BonusByEmployeeByID,
    #endregion

    #region Human Resource Department
    HR_Department_GetAll,
    HR_Department_GetAll_New_By_ID,
    HR_Department_GetAll_New_By_ID_New,
    HR_Department_GetAll_For_Evaluation,
    HR_Department_GetAllWithParent,
    HR_Department_Save_Arb,
    HR_Department_Save,
    HR_Department_Delete,
    HR_Department_GetOnlyDepartments,
    ZK_Department_Dropdown_GetAll,
    #endregion


    #region Human Resource Profession
    HR_Profession_GetAll,
    HR_Profession_Save_Arb,
    HR_Profession_Save,
    HR_Profession_Delete,
    HR_Profession_Get,

    #endregion


    #region Human Resource Profession
    HR_CompanyDocuments_Save,
    HR_CompanyDocument_GetAll,
    HR_CompanyDocument_Delete,
    HR_CompanyDocuments_GetNearToExpire,
    #endregion

    #region Company Rules
    HR_Rule_Save,
    HR_Rule_List,
    HR_Rule_Delete,
    HR_Rule_UpdateStatus,
    #endregion
    
    #region Company Rules
    HR_Penalty_Save,
    HR_Penalty_List,
    HR_Penalty_Delete,
    HR_Penalty_UpdateStatus,
    #endregion

    #region Human Resource Nationality

    HR_Nationality_GetAll,
    HR_Nationality_Save_Arb,
    HR_Nationality_Save_Eng,
    HR_Nationality_Delete,
    HR_Nationality_Get,

    #endregion


    #region Human Resource ContractType

    HR_ContractType_GetAll,
    HR_ContractType_Save_Arb,
    HR_ContractType_Save,
    HR_ContractType_Delete,
    HR_ContractType_Get,

    #endregion


    #region Human Resource LETTER

    HR_LetterRequest_Save,
    HR_LetterRequest_GetAll,

    #endregion



    #region Human Resource Request
    HR_LeaveRequest_Save,
    HR_LeaveRequest_Update,
    HR_LeaveType_GetQuota,
    HR_LeaveRequest_GetAll,
    Request_Signed_Leave,
    Request_History_Signed_Get,
    Request_ShortLeave_History_Signed_Get,
    Request_ShortLeave_Request_Submitted_Count_Monthly,
    #endregion


    #region Human Resource VisaType

    HR_VisaSponsorship_GetAll,
    HR_VisaSponsorship_Save,
    HR_VisaSponsorship_Save_Eng,
    HR_VisaSponsorship_Delete,
    HR_VisaSponsorship_Get,
    HR_EmiratesStates_Get,
    #endregion



    #region User Management
    #region Module
    UserManagement_Module_Save_Eng,
    UserManagement_Module_Save_Arb,
    UserManagement_Module_GetAll,
    UserManagement_MainApplicationModules_Load,
    UserManagement_Module_GetById,
    UserManagement_Module_Delete,

    #endregion
    #region Menu
    UserManagement_Menu_Save,
    UserManagement_Menu_Save_Eng,
    UserManagement_Menu_Save_Arb,
    UserManagement_Menu_GetAll,
    UserManagement_Menu_Delete,
    UserManagement_ValidateCredenial,
    UserManagement_ValidateCredenial_New,
    UserManagement_RoleMenu_GetByRole,
    UserManagement_RoleMenu_GetByRole_New,

    UserManagement_RoleMenu_GetForAdmin,
    #endregion

    #region Role
    UserManagement_Role_Save_Eng,
    UserManagement_Role_Save_Arb,
    UserManagement_Role_GetAll,
    UserManagement_Role_Delete,
    UserManagement_Role_Get,
    #endregion

    #region Role Menus
    UserManagement_RoleMenu_GetByDepartmentAndRole,
    UserManagement_RoleMenu_Save,
    #endregion
    #endregion

    #region Request Detail

    Request_Letter_Save,
    Request_Letter_Get,
    Request_Letter_Delete,
    Request_Leave_Save,
    Request_Leave_Get,
    Request_Leave_Delete,

    Request_ShortLeave_Save,
    Request_ShortLeave_Save_New,
    Request_ShortLeave_Get,
    Request_ShortLeave_Delete,
    Request_Leave_GetDropdown,
    Request_LeaveCancel_Save,
    Request_LeaveCancel_Get,
    Request_LeaveCancel_Delete,

    Request_Leave_GetEmployeeAvailableBalance,
    Request_ShortLeave_GetEmployeeAvailableBalance,
    Request_Leave_GetBySuperiorRole,
    Request_ShortLeave_GetBySuperiorRole,
    Request_Letter_GetBySuperiorRole,
    Request_LeaveCancel_GetBySuperiorRole,

    #endregion
    #region Request Approve or Decline
    Request_Leave_ApproveOrDecline,
    Request_ShortLeave_ApproveOrDecline,
    Request_LetterRequest_ApproveOrDecline,
    Request_LeaveCancel_ApproveOrDecline,
    #endregion
    #region Attachment
    Attachment_Save,
    Attachment_Save_Single_OR_Multiple,
    #endregion

    #region Letter Detail
    Letter_Get,
    Letter_Save,
    #endregion

    #region Cash In Leave Request
    Request_CashInLeave_Get,
    Request_CashInLeave_Save,
    Request_CashInLeave_GetEmployeeAvailableBalance,
    Request_CashInLeave_ApproveOrDecline,
    Request_CashInLeave_Delete,
    Request_CashInLeave_GetBySuperiorRole,
    #endregion

    #region Internal Letter
    Employee_InternalLetter_Save,
    Employee_InternalLetter_Save_New,
    Employee_InternalLetter_Save_Multiple,
    Employee_InternalLetter_Forward,
    Employee_InternalLetter_Forward_Multiple,
    Employee_InternalLetter_Reply,
    Employee_InternalLetter_Reply_Multiple,
    Employee_InternalLetter_GetNextNumber,
    Employee_InternalLetter_Inbox_Get,
    Employee_InternalLetter_Inbox_Get_New,
    Employee_InternalLetter_Outbox_Get,
    Employee_InternalLetter_Outbox_Get_New,
    Employee_InternalLetter_GetById,
    Employee_InternalLetter_GetById_New,
    Employee_InternalLetter_Attachment_GetById,
    Employee_InternalLetter_GetById_New_For_Reply,
    Employee_InternalLetter_UpdateIsRead,
    Employee_InternalLetter_Delete,
    Employee_InternalLetter_Outbox_Delete,
    Employee_InternalLetter_GetEmployeesByParameters,
    HR_Employee_Signature_Get,

    #endregion
    #region Employee Attendance
    Employee_Attendance_GetByDepartment,
    Employee_Attendance_SaveForToday,
    Employee_Attendance_Today_GetByDepartment,
    Employee_Attendance_UpdateTodayAttendanceAsProcessed,
    Employee_Attendance_GetByEmployee,
    Employee_Attendance_LeaveDetail_History,
    Employee_Attendance_TodayAttendance_Get,
    Employee_Attendance_Linking,
    ZK_Employees_Get_By_DepartmentID,
    Employee_Attendance_ZkData_Emplployee_Linking,
    Attendance_INMA_And_Attendance_EmployeeNumber_Association,
    #endregion


    #region Employee Request
    //LETTER AREA
    Employees_Request_Letter_Get,
    //Request_Employee_AllLetter_Save,
    Employees_Request_Letter_ApproveOrDecline,
    // LEAVES AREA
    Employee_AllLeaves_Get,
    Employees_Request_Leave_Get,
    Employees_Request_Leave_ApproveOrDecline,
    //Short Leave AREA
    Employees_Request_Permission_Leave_Get,
    Employees_Request_Permission_Leave_ApproveOrDecline,
    //Leave Cancel AREA
    Employees_Request_Leave_Cancellation_Get,
    Employees_Request_Leave_Cancellation_ApproveOrDecline,
    //Cash In Leave AREA
    Employees_Request_CashInLeave_Get,
    Employees_Request_CashInLeave_ApproveOrDecline,



    // Employees Evaluation Request
    Employees_Request_Evaluation_Get,
    Employees_Request_Evaluation_History_Get,


    #endregion

    #region Setup
    Setup_PublicHoliday_Save,
    Setup_PublicHoliday_Delete,
    Setup_PublicHoliday_Get,
    
    
    Setup_Allowance_Save,
    Setup_Allowance_Delete,
    Setup_Allowance_Get,
    Setup_Allowance_Type_Get_DDL,

    Setup_Allowance_Type_Save,
    Setup_Allowance_Type_Delete,
    Setup_Allowance_Type_Get,



    Setup_Roster_Save,
    Setup_Roster_Delete,
    Setup_Roster_Get,
    Setup_Roster_Get_DDL,

    Roster_Association_Get_AllEmployees_by_DepartmentWise,
    Roster_Associated_Employees_Get,
    Setup_Roster_Association_Multipe_Save,
    Setup_Roster_Association_Delete,



    Image_Save,

    //------ PROMOTION
    Employees_Get_By_DepartmentID,
    Setup_Promotion_Save,
    Setup_Promotion_Delete,
    Setup_Promotion_Get,
    #endregion
    UserManagement_Login_Role_Update,

    #region Evaluation
    Evaluation_Get_AllEmployees_by_DepartmentWise,
    Evaluation_Get_LineManager_by_DepartmentWise,
    Evaluation_Request_Grid,
    Evaluation_Template_Get,
    Request_Evaluation_History_Get_By_Id,
    Evaluation_Request_Delete,
    Evaluation_Request_Save,
    Request_Evaluation_Employee_Form_Save,
    #endregion

    #region APPRAISAL 
    Appraisal_Template_Get,
    Request_Appraisal_Answer_Get,
    Request_Appraisal_Pending,
    Request_Appraisal_AlreadyExist,
    Appraisal_Request_Save,
    Appraisal_Request_Delete,
    Request_Appraisal_Status_Update,
    Appraisal_Get_AllEmployees_by_DepartmentWise,
    Appraisal_Get_LineManager_by_DepartmentWise,

    Request_Appraisal_Answer_Multiple_Save,
    Request_Appraisal_Answer_Multiple_Remarks_Save,
    // -------------------- MANAGER REQUEST HISTORY AREA ---------------

    Employees_Request_Appraisal_Get,
    Setup_Appraisal_Template_Get,
    Request_Appraisal_Performance_Save,
    Request_Appraisal_Performance_Get_By_Id,
    #endregion

}

public enum ProjectStoreProcedure
{


    #region PROJECT  
    Project_Get,
    Project_Get_BySearch,
    Project_Delay_Get,
    Project_Get_By_Employee_Id,
    Project_save,
    Project_Edit_By_Id,
    Project_Details_By_Id,
    Project_Attachment_By_Id,
    Project_Delete,
    Project_HR_Employee,
    Project_Linked_Employees_By_SectionId,
    Project_Linked_Employees_By_Project_Id_Get,
    Project_Linked_Employees_By_ProjectId,

    // PROJECT UNIT
    Project_Unit_Save,
    Project_Unit_Edit_By_Id,

    // PROJECT  DESIGN SECTION GOVERNMENT DOCUMENT
    Return_Common_Msg,
    Project_DesignSection_GovernmentDocument_Edit_By_Id,
    Project_DesignSection_GovernmentDocument_Get,
    Project_DesignSection_Document_Get,
    Project_DesignSection_Document_Delete,
    Project_Save_Multiple_Employees,
    Project_Linked_Multiple_Employees_Delete_By_Id,
    // PROJECT DETAILS DESIGN SECTION
    Project_DesignSection_Document_GetById,
    Project_DesignSection_Document_Transfer_ById,
    STEPPER_SUB_SECTION_MENU,
    Project_Linked_Multiple_Employees_Update_StartedDate_By_Paramters,
    Project_Linked_Multiple_Update_Employees_Work_EndDate_By_Paramters,
    Project_Employees_Started_Work,
    Project_UpdateStatus,
    Project_Main_Progress_Get_By_Id,


    Project_Role_Mapping_For_Employees_Delete,
    Project_Role_Mapping_For_Employees_Save,
    // PROJECT  TECHNICAL SECTION 
    Project_Linked_Employees_Technical_Section_By_SectionId_Get,
    Project_TechnicalSection_Document_Get,
    Project_TechnicalSection_Document_Delete,
    Project_TechnicalSection_Document_GetById,
    Project_TechnicalSection_Document_Transfer_ById,

    //PROJECT SUPERVISION SECTION
    Project_SupervisionSection_Document_Get,
    Project_Linked_Employees_Supervision_Section_By_SectionId_Get,
    Project_SupervisionSection_Area_Save,
    Project_Unit_Supervision_Section_Edit_By_Id,
    Project_SupervisionSection_Document_GetById,
    Project_SupervisionSection_Document_Transfer_ById,
    Project_SupervisionSection_Document_Delete,

    Prject_CreatorInfo_GetByProjectId,
    #endregion
    #region Client
    Client_Save,
    Client_Get,
    Client_Delete,
    Client_Details_By_Id,
    Client_Edit_By_Id,
    // CLIENT PERSONAL DOCUMENT
    Client_PersonalDocument_Save,
    Client_PersonalDocument_Get,
    Client_PersonalDocument_Delete,
    // CLIENT PROJECT INFORMATION
    Client_Project_Get,
    // CLIENT MEETING INFORMATION
    Client_Project_Meeting_Get,
    Client_Project_Issues_Get,
    Client_Detail_By_ProjectId,


    //---------- Client Login
    Client_Login,
    #endregion


    #region CONTRACTOR
    Contractor_Save,
    Contractor_Get,
    Contractor_Delete,
    Contractor_Details_By_Id,
    Contractor_Edit_By_Id,
    

    #endregion

    #region MEETING
    Meeting_Save,
    Meeting_Multiple_Save,
    Meeting_Get,
    Meeting_Multiple_Get_By_Id,
    Meeting_Delete,
    Meeting_Details_By_Id,
    Meeting_Multiple_Details_By_Id,
    Meeting_Edit_By_Id,

    #endregion

    #region ISSUE
    Issue_Save,
    Issue_Get,
    Issue_Get_New,
    Project_Dashboard_Issue_Get,
    Issue_Delete,
    Issue_isRead_Change_Status,
    Issue_Details_By_Id,
    Issue_Edit_By_Id,
    Issue_Change_Status,
    Issue_Assign,
    Issue_Transfer,
    #endregion

    #region NOTIFICATION
    Notification_Save,
    Notification_GetAll,
    Notification_Delete,
    Notification_Change_Status,
    Notification_Details_By_Id,

    Notification_Personal_GetAll,
    Notification_Employee_GetAll,
    #endregion



    #region COMMENT
    Comment_Save,
    Comment_Get_ByAreaID,
    Comment_Delete, 

    #endregion




    #region   DROP DOWNS

    DDL_Setup_City,
    DDL_ProjectCategoryType_In_Setup_TypeDetail_Get,
    DDL_Project,
    Project_DDL_By_Role,
    DDL_HR_Employee,
    DDL_HR_Employee_By_Department,
    DDL_Project_MainType_In_Setup_Type,
    DDL_Project_SubSection_In_Setup_TypeDetail,
    DDL_Client,
    DDL_Contractor,
    DDL_DESIGN_SECTION_Project_MainType,
    DDL_SUPERVISION_SECTION_Project_MainType,
    DDL_SUPERVISION_SECTION_Project_Finance,
    DDL_TECHNICAL_SECTION_Project_MainType,
    DDL_TECHNICAL_SECTION_Project_Setup_TypeDetail_Deleted_Get,
    DDL_Load_SetupType_By_ParentName,
    DDL_Department_GetBy_ProjectSection_Name,
    #endregion

    #region SMS
    SMS_Save,
    SMS_GetAll ,
    #endregion

    #region REPORTS
    Reports_DesignSection_GetBySectionId,
    Reports_TechnicalSection_GetBySectionId,
    Report_Summary_GetByParamters,
    Report_Summary_for_Grid,
    #endregion
    #region Project Dashbaord
    Project_Dashboard_CountByStatus_Get,
    Project_Dashboard_CountByCategory_Get,
    Project_Dashboard_ClientMeetingContractorCount_Get,
    Project_Dashboard_IssueCountByStatus_Get,
    Project_Dashboard_ProjectCountByStatus_Get,
    Project_Dashboard_ProjectAndSectionCount_Get,
    Project_SubSectionRecordBySectionInDashboard_Get,
    #endregion

}







public class appCommands
{

    //employee commands

    //  public const string SMS_GET_ALL = "SMS_GetAll";
    public const string SMS_GET_ALL = "SMS_GetAll";


};

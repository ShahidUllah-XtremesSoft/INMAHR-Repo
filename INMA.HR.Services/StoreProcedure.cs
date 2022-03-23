public enum StoreProcedure
{

    #region Common
    Setup_Type_DropdownByTypeName,
    Setup_Type_DropdownByTypeName_For_ShortLeave,
    Get_All_Count_Notifications,
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
    #endregion
    #region Employee Educational Document
    HR_Employee_EducationalDocument_Save,
    HR_Employee_EducationalDocument_Get,
    HR_Employee_EducationalDocument_Delete,

    #endregion

    #region Human Resource Department
    HR_Department_GetAll,
    HR_Department_GetAll_New_By_ID,
    HR_Department_GetAll_New_By_ID_New,
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
    UserManagement_RoleMenu_GetByRole,

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
    #endregion

    #region Setup
    Setup_PublicHoliday_Save,
    Setup_PublicHoliday_Delete,
    Setup_PublicHoliday_Get,
    Image_Save,
    #endregion
    UserManagement_Login_Role_Update,
}

public enum ProjectStoreProcedure
{
     

    #region PROJECT  
    Project_save,
    Project_Role_Mapping_For_Employees_Delete,
    #endregion

    #region PROJECT  
    Project_Role_Mapping_For_Employees_Save,
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
    #endregion

    #region MEETING
    Meeting_Save,
    Meeting_Get,
    Meeting_Delete,
    Meeting_Details_By_Id,
    Meeting_Edit_By_Id,
    
    #endregion




    #region   DROP DOWNS

    Setup_City_Get,
    Project_DDL,
    HR_Employee_DDL,
    #endregion
}

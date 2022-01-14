public enum StoreProcedure
{

    #region Common
    Setup_Type_DropdownByTypeName,
    #endregion
    DashboardCounter_Select,
    UserLogin_Select,

    UserManagement_Login_Save,
    Users_ChangePassword,

    #region HR_Employee

    HR_Employee_SaveArb,
    HR_Employee_Save,
    HR_Employee_GetAll,
    HR_Employee_GetProfileById,
    HR_Employee_GetById,
    HR_Employee_GetByNumber,
    HR_Employee_Delete,
    HR_Employee_GetAllForGrid,

    HR_Employee_Leave_TakenDetail_Get,
    HR_Employee_Leave_AvailableAndTakenDetail_Get,
    #endregion
    #region Employee Personal Document
    HR_Employee_PersonalDocument_Save,
    HR_Employee_PersonalDocument_Get,

    HR_Employee_PersonalDocument_Delete,
    HR_Employee_PersonalDocument_Exist,
    #endregion
    #region Employee Educational Document
    HR_Employee_EducationalDocument_Save,
    HR_Employee_EducationalDocument_Get,
    HR_Employee_EducationalDocument_Delete,

    #endregion

    #region Human Resource Department
    HR_Department_GetAll,
    HR_Department_GetAllWithParent,
    HR_Department_Save_Arb,
    HR_Department_Save,
    HR_Department_Delete,
    HR_Department_GetOnlyDepartments,
    #endregion


    #region Human Resource Profession
    HR_Profession_GetAll,
    HR_Profession_Save_Arb,
    HR_Profession_Save,
    HR_Profession_Delete,

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

    #endregion


    #region Human Resource ContractType

    HR_ContractType_GetAll,
    HR_ContractType_Save_Arb,
    HR_ContractType_Save,
    HR_ContractType_Delete,

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
    #endregion



    #region User Management
    #region Module
    UserManagement_Module_Save_Eng,
    UserManagement_Module_Save_Arb,
    UserManagement_Module_GetAll,
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
    Employee_InternalLetter_GetNextNumber,
    Employee_InternalLetter_Inbox_Get,
    Employee_InternalLetter_Outbox_Get,
    Employee_InternalLetter_GetById,
    Employee_InternalLetter_UpdateIsRead,
    Employee_InternalLetter_Delete,
    #endregion
    #region Employee Attendance
    Employee_Attendance_GetByDepartment,
    Employee_Attendance_SaveForToday,
    Employee_Attendance_Today_GetByDepartment,
    Employee_Attendance_UpdateTodayAttendanceAsProcessed,
    Employee_Attendance_GetByEmployee,
    Employee_Attendance_TodayAttendance_Get,
    #endregion


}
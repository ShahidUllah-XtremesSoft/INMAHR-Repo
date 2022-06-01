using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using INMA.HR.Services;
using INMA.HR.Services.Common;
using INMA.Projects.Services.Services;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace INMA.Projects.Services.Project
{
    public class ProjectCommand
    {



        [Command(Name = "Project_Role_Mapping_For_Employees_Save")]
        public class Project_Role_Mapping_For_Employees_SaveCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    RoleMappingDataModel = new List<RoleMappingDataModel>()

                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);


                //   var table = new KeyValuePair<string, DataTable>("[dbo].[UD_Employee_InternalLetter_Save_Multiple]", ExtensionMethods.ToDataTable(model.RoleMappingDataModel));
                var table = new KeyValuePair<string, DataTable>("[dbo].[UD_Project_Role_Mapping_For_Employees_Save]", ExtensionMethods.ToDataTable(model.RoleMappingDataModel));
                var ProductList = new Dictionary<string, KeyValuePair<string, DataTable>>();
                ProductList.Add("@UD_Project_Role_Mapping_For_Employees_Save", table);
                var response = repository.GetMultipleWithTableValuParam<dynamic>(ProjectStoreProcedure.Project_Role_Mapping_For_Employees_Save.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.projectconnectionString);
                return response.ToList()[0];


            }

        }

        [Command(Name = "UserManagement_Login_Role_Update")]
        public class UserManagement_Login_Role_UpdateCommand : CamelCommandBase
        {

            protected override object DoAction(object v)
            {
                var model = base.MappedModel(new
                {
                    EmployeeId = 0,
                    DepartmentId = 0,
                    UserId = 0,
                    RoleId = 0,
                    Language = string.Empty
                }, v);
                #region ==========  PARAMETERS

                object result = new { status = false, returnUrl = "#" };
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                #endregion

                values = _params.Get(model);

                return Ioc.Resolve<IRepository>().GetSingle<dynamic>(StoreProcedure.UserManagement_Login_Role_Update.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);


            }
        }
        [Command(Name = "Project_Role_Mapping_For_Employees_Delete")]
        public class Project_Role_Mapping_For_Employees_DeleteCommand : CamelCommandBase
        {

            protected override object DoAction(object v)
            {
                var model = base.MappedModel(new
                {
                    Id = 0,
                    Language = string.Empty
                }, v);
                #region ==========  PARAMETERS

                object result = new { status = false, returnUrl = "#" };
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                #endregion

                values = _params.Get(model);

                return Ioc.Resolve<IRepository>().GetSingle<dynamic>(ProjectStoreProcedure.Project_Role_Mapping_For_Employees_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);


            }
        }

        #region PROJECT GET

        [Command(Name = "Project_Get")]
        public class Project_GetCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {

                object result = new { status = false, returnUrl = "#" };


                var model = base.MappedModel(new
                {
                    LoggedInUser = 0,
                    RoleId = 0,
                    LoggedInEmployeeId = 0,
                    Language = string.Empty
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Project_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
        public static List<dynamic> GetProjectLinkedEmployeesByProjectId(object projectId)
        {
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            values.Add("@ProjectId", projectId);
            CommandParameters _params = new CommandParameters();

            //values = _params.Get(model);
            var projectLinkedEmployees = repository.GetMultiple<dynamic>(ProjectStoreProcedure.Project_Linked_Employees_By_ProjectId.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);
            return projectLinkedEmployees.ToList();
        }
        public static dynamic GetClientDetailByProjectId(object id, object projectId)
        {
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            values.Add("@Id", id);
            values.Add("@ProjectId", projectId);
            CommandParameters _params = new CommandParameters();

            //values = _params.Get(model);
            var projectLinkedEmployees = repository.GetSingle<dynamic>(ProjectStoreProcedure.Client_Detail_By_ProjectId.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);
            return projectLinkedEmployees;
        }
        #endregion

        #region PROJECT  SAVE

        [Command(Name = "Project_Save")]
        public class Project_SaveCommand : CamelCommandBase
        {
            public IFileService Service;
            protected override object DoAction(object v)
            {
                var model = base.MappedModel(new
                {
                    Id = 0,
                    CreatedBy = 0,
                    NameEng = string.Empty,
                    NameArb = string.Empty,
                    DescriptionEng = string.Empty,
                    DescriptionArb = string.Empty,

                    ProjectCategoryType_In_Setup_TypeDetail_Id = 0,
                    IsVIP = 0,
                    IsUrgent = 0,
                    City_Id = 0,
                    HR_Employee_Id = 0,
                    Client_Id = 0,
                    ProjectStatus = string.Empty,
                    Location = string.Empty,

                    Language = string.Empty,
                    UploadedFiles = new List<FileUploadModel>()
                }, v);
                #region ==========  PARAMETERS

                object result = new { status = false, returnUrl = "#" };
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                #endregion

                values = _params.Get(model);

                var _response = Ioc.Resolve<IRepository>().GetSingle<dynamic>(ProjectStoreProcedure.Project_save.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);


                if (model.UploadedFiles.Count > 0)
                {
                    Service = new FileUploadService();
                    foreach (var file in model.UploadedFiles)
                    {
                        Service.UploadFileForSingleAndMultiple(
                            file.CurrentFilePath,
                            file.OriginalFileName,
                            file.CurrentFileName,
                            (int)EntityType.Project,
                            (int)_response.InsertedId,
                            (int)DocumentType.ProjectAttachment,
                            (int)model.CreatedBy,
                             (string)"",
                             (string)"",
                             (int)0,
                              (string)"",

                            XtremeFactory._factory, XtremeFactory.connectionString);

                    }
                }
                var clientDetailInfo = GetClientDetailByProjectId(model.Client_Id, _response.InsertedId);
                if (_response.Type.ToString().ToLower() == "success" && model.Id == 0)
                {
                    //var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)_response.InsertedId);

                    string messageBody = string.Empty;
                    Commands.SMSService smsService = new Commands.SMSService();
                    //foreach (var employee in projectLinkedEmployees)
                    //{                     
                    //    messageBody = "Project Info has been "+(model.Id == 0 ? "created" : "updated") + System.Environment.NewLine+"Project # - " + employee.ProjectNumber + System.Environment.NewLine + "Name - " + employee.NameEng + System.Environment.NewLine + "Location - " + employee.Location;
                    //    int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody,"Project Info",_response.InsertedId,model.Client_Id,employee.EmployeeId);
                    //
                    //}
                    //messageBody = "Project Info has been " + (model.Id == 0 ? "created" : "updated") + System.Environment.NewLine + "Project # - " + clientDetailInfo.ProjectNumber + System.Environment.NewLine + "Name - " + clientDetailInfo.NameEng + System.Environment.NewLine + "Location - " + clientDetailInfo.Location;
                    messageBody = "Project Info has been " + (model.Id == 0 ? "created" : "updated") + ". " + " Project # - " + clientDetailInfo.ProjectNumber + ". " + " Name - " + clientDetailInfo.NameEng + "" + " Location - " + clientDetailInfo.Location;
                    //Below commented code will send SMS to the added Client
                    //int _smsResponse = smsService.SendSMS(clientDetailInfo.PhoneNumber1, messageBody, "Project Info", _response.InsertedId, model.Client_Id, 0, 0);


                }
                //Send Notification
                var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)_response.InsertedId);
                NotificationService notificationService = new NotificationService();
                foreach (var employee in projectLinkedEmployees)
                {
                    //messageBody = "Project Info "+(model.Id == 0 ? "created" : "updated") + System.Environment.NewLine+"Project # - " + employee.ProjectNumber + System.Environment.NewLine + "Name - " + employee.NameEng + System.Environment.NewLine + "Location - " + employee.Location;
                    //int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody,"Project Info",_response.InsertedId,model.Client_Id,employee.EmployeeId);

                    var res = notificationService.Save("Project info " + (model.Id == 0 ? "created" : "updated") + "", "Project info " + (model.Id == 0 ? "created" : "updated") + "", "Project info " + (model.Id == 0 ? "created" : "updated") + " for project# " + clientDetailInfo.ProjectNumber + " ", "Project info " + (model.Id == 0 ? "created" : "updated") + " for project# " + clientDetailInfo.ProjectNumber + " ", "", _response.InsertedId, model.CreatedBy, employee.EmployeeId, model.Language);

                }
                var projectCreator = GetProjectCreatorInfoByProjectId((int)_response.InsertedId);
                if (projectCreator != null && projectCreator.UserId != model.CreatedBy)
                {
                    var res = notificationService.Save("Project info " + (model.Id == 0 ? "created" : "updated") + "", "Project info " + (model.Id == 0 ? "created" : "updated") + "", "Project info " + (model.Id == 0 ? "created" : "updated") + " for project# " + clientDetailInfo.ProjectNumber + " ", "Project info " + (model.Id == 0 ? "created" : "updated") + " for project# " + clientDetailInfo.ProjectNumber + " ", "", _response.InsertedId, model.CreatedBy, projectCreator.EmployeeId, model.Language);
                }
                return _response;

            }
        }
        #endregion


        #region PROJECT EDIT BY ID 


        [Command(Name = "Project_Edit_By_Id")]
        public class Project_Edit_By_IdCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {

                object result = new { status = false, returnUrl = "#" };


                var model = base.MappedModel(new
                {

                    Id = 0,
                    LoggedInUser = 0,
                    RoleId = 0,
                    LoggedInEmployeeId = 0,
                    Language = string.Empty
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetSingle<dynamic>(ProjectStoreProcedure.Project_Edit_By_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
        #endregion
        #region PROJECT DETAILS BY ID 


        [Command(Name = "Project_Details_By_Id")]
        public class Project_Details_By_IdCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {

                object result = new { status = false, returnUrl = "#" };


                var model = base.MappedModel(new
                {

                    Id = 0,
                    LoggedInUser = 0,
                    RoleId = 0,
                    LoggedInEmployeeId = 0,
                    Language = string.Empty
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetSingle<dynamic>(ProjectStoreProcedure.Project_Details_By_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
        #endregion

        #region PROJECT ATTACHMENT BY ID 


        [Command(Name = "Project_Attachment_By_Id")]
        public class Project_Attachment_By_IdCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {

                object result = new { status = false, returnUrl = "#" };


                var model = base.MappedModel(new
                {

                    Id = 0,
                    LoggedInUser = 0,
                    RoleId = 0,
                    LoggedInEmployeeId = 0,
                    Language = string.Empty
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Project_Attachment_By_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
        #endregion
        #region PROJECT GET ALL ASSIGNED EMPLOYEES  BY PROJECT ID 


        [Command(Name = "Project_Linked_Employees_By_Project_Id_Get")]
        public class Project_Linked_Employees_By_Project_Id_GetCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {

                object result = new { status = false, returnUrl = "#" };


                var model = base.MappedModel(new
                {

                    Project_Id = 0,
                    LoggedInUser = 0,
                    RoleId = 0,
                    LoggedInEmployeeId = 0,
                    Language = string.Empty
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Project_Linked_Employees_By_Project_Id_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
        #endregion
        #region PROJECT DELETE 


        [Command(Name = "Project_Delete")]
        public class Project_DeleteCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {

                object result = new { status = false, returnUrl = "#" };


                var model = base.MappedModel(new
                {

                    Id = 0,
                    UserId = 0,
                    Language = string.Empty
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetSingle<dynamic>(ProjectStoreProcedure.Project_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
        #endregion

        #region PROJECT UNIT SAVE

        [Command(Name = "Project_Unit_Save")]
        public class Project_Unit_SaveCommand : CamelCommandBase
        {
            //  public IFileService Service;
            protected override object DoAction(object v)
            {
                var model = base.MappedModel(new
                {
                    UnitId = 0,
                    UnitCreatedBy = 0,
                    UnitProject_Id = 0,
                    ProjectUnitTypeSetupDetailTypeId = 0,
                    AreaUnit = string.Empty,
                    Area = string.Empty,
                    Floor = string.Empty,
                    Rooms = string.Empty,
                    Bathrooms = string.Empty,
                    Hall = string.Empty,
                    Kitchen = string.Empty,
                    Garage = string.Empty,
                    StartDate = string.Empty,
                    EndDate = string.Empty,
                    Price = string.Empty,
                    Note = string.Empty,
                    MulkNo = string.Empty,
                    PlotNo = string.Empty,
                    UnitLanguage = string.Empty
                    // UploadedFiles = new List<FileUploadModel>()
                }, v);
                #region ==========  PARAMETERS

                object result = new { status = false, returnUrl = "#" };
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                #endregion

                values = _params.Get(model);

                var _response = Ioc.Resolve<IRepository>().GetSingle<dynamic>(ProjectStoreProcedure.Project_Unit_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);


                //if (model.UploadedFiles.Count > 0)
                //{
                //    Service = new FileUploadService();
                //    foreach (var file in model.UploadedFiles)
                //    {
                //        Service.UploadFile(
                //            file.CurrentFilePath,
                //            file.OriginalFileName,
                //            file.CurrentFileName,
                //            (int)EntityType.Project,
                //            (int)_response.InsertedId,
                //            (int)DocumentType.ProjectAttachment,
                //            XtremeFactory._factory, XtremeFactory.connectionString);

                //    }
                //}

                /*SMS Sending Code
                if (_response.Type.ToString().ToLower() == "success")
                {
                    var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)model.UnitProject_Id);
                    string messageBody = string.Empty;
                    Commands.SMSService smsService = new Commands.SMSService();
                    foreach (var employee in projectLinkedEmployees)
                    {
                        messageBody = "Project Basic Info has been " + (model.UnitId == 0 ? "created" : "updated") + System.Environment.NewLine + "Project # - " + employee.ProjectNumber + System.Environment.NewLine + "Name - " + employee.NameEng + System.Environment.NewLine + "Location - " + employee.Location;
                        //int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody);
                        int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody, "Project Basic Info",model.UnitProject_Id, 0, employee.EmployeeId);

                    }
                }
                */
                //Send Notification
                var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)model.UnitProject_Id);
                var clientDetailInfo = GetClientDetailByProjectId(0, model.UnitProject_Id);
                NotificationService notificationService = new NotificationService();
                foreach (var employee in projectLinkedEmployees)
                {
                    //messageBody = "Project Info "+(model.Id == 0 ? "created" : "updated") + System.Environment.NewLine+"Project # - " + employee.ProjectNumber + System.Environment.NewLine + "Name - " + employee.NameEng + System.Environment.NewLine + "Location - " + employee.Location;
                    //int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody,"Project Info",_response.InsertedId,model.Client_Id,employee.EmployeeId);
                    var res = notificationService.Save("Basic info " + (model.UnitId == 0 ? "created" : "updated") + "", "Basic info " + (model.UnitId == 0 ? "created" : "updated") + "", "Basic info " + (model.UnitId == 0 ? "created" : "updated") + " for project# " + clientDetailInfo.ProjectNumber + " ", "Basic info " + (model.UnitId == 0 ? "created" : "updated") + " for project# " + clientDetailInfo.ProjectNumber + " ", "", model.UnitProject_Id, model.UnitCreatedBy, employee.EmployeeId, model.UnitLanguage);

                }
                var projectCreator = GetProjectCreatorInfoByProjectId((int)model.UnitProject_Id);
                if (projectCreator != null && projectCreator.UserId != model.UnitCreatedBy)
                {
                    var res = notificationService.Save("Basic info " + (model.UnitId == 0 ? "created" : "updated") + "", "Basic info " + (model.UnitId == 0 ? "created" : "updated") + "", "Basic info " + (model.UnitId == 0 ? "created" : "updated") + " for project# " + clientDetailInfo.ProjectNumber + " ", "Basic info " + (model.UnitId == 0 ? "created" : "updated") + " for project# " + clientDetailInfo.ProjectNumber + " ", "", model.UnitProject_Id, model.UnitCreatedBy, projectCreator.EmployeeId, model.UnitLanguage);
                }
                return _response;

            }
        }
        #endregion
        #region PROJECT UNIT EDIT BY ID 


        [Command(Name = "Project_Unit_Edit_By_Id")]
        public class Project_Unit_Edit_By_IdCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {

                object result = new { status = false, returnUrl = "#" };


                var model = base.MappedModel(new
                {

                    Id = 0,
                    LoggedInUser = 0,
                    RoleId = 0,
                    LoggedInEmployeeId = 0,
                    Language = string.Empty
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                var checkresult = repository.GetSingle<dynamic>(ProjectStoreProcedure.Project_Unit_Edit_By_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);
                return checkresult;

            }
        }
        #endregion

        #region PROJECT  DESIGN SECTION GOVERNMENT DOCUMENT  SAVE

        [Command(Name = "Project_DesignSection_GovernmentDocument_Save")]
        public class Project_DesignSection_GovernmentDocument_SaveCommand : CamelCommandBase
        {
            public IFileService Service;
            protected override object DoAction(object v)
            {
                var model = base.MappedModel(new
                {
                    DesignSection_Document_Id = 0,
                    Project_DesignSection_Entity_Id = 0,
                    DesignSection_Document_ProjectId = 0,
                    DesignSection_Document_CreatedBy = 0,
                    DesignSection_Document_StartDate = string.Empty,
                    Project_Section_Parent_Type_DDL_Text = string.Empty,
                    DesignSection_Document_EndDate = string.Empty,
                    DesignSection_Document_Language = string.Empty,
                    DesignSection_Remarks = string.Empty,
                    UploadedFiles = new List<FileUploadModel>()
                }, v);
                #region ==========  PARAMETERS

                object result = new { status = false, returnUrl = "#" };
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                #endregion
                values.Add("@Id", model.DesignSection_Document_ProjectId);
                values.Add("@Language", model.DesignSection_Document_Language);
                //   values = _params.Get(model);

                var _response = Ioc.Resolve<IRepository>().GetSingle<dynamic>(ProjectStoreProcedure.Return_Common_Msg.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);


                if (model.UploadedFiles.Count > 0)
                {
                    Service = new FileUploadService();
                    foreach (var file in model.UploadedFiles)
                    {
                        object entityType_Id = 0, documentType_Id = 0;

                        if (model.Project_Section_Parent_Type_DDL_Text == "Government Documents")
                        {
                            entityType_Id = EntityType.Project_DesignSection_GovernmentDocument;
                            documentType_Id = DocumentType.Project_DesignSection_GovernmentDocument_Attachment;
                        }
                        else if (model.Project_Section_Parent_Type_DDL_Text == "Initial Sketch")
                        {
                            entityType_Id = EntityType.Project_DesignSection_InitialSketch;
                            documentType_Id = DocumentType.Project_DesignSection_InitialSketch_Attachment;

                        }
                        else if (model.Project_Section_Parent_Type_DDL_Text == "Sketch Planning")
                        {
                            entityType_Id = EntityType.Project_DesignSection_SketchPlanning;
                            documentType_Id = DocumentType.Project_DesignSection_SketchPlanning_Attachment;

                        }
                        else if (model.Project_Section_Parent_Type_DDL_Text == "Town Planning")
                        {
                            entityType_Id = EntityType.Project_DesignSection_TownPlanning;
                            documentType_Id = DocumentType.Project_DesignSection_TownPlanning_Attachment;

                        }
                        else if (model.Project_Section_Parent_Type_DDL_Text == "Modifications")
                        {
                            entityType_Id = EntityType.Project_DesignSection_Modifications;
                            documentType_Id = DocumentType.Project_DesignSection_Modifications_Attachment;

                        }
                        else if (model.Project_Section_Parent_Type_DDL_Text == "Modification Type")
                        {
                            entityType_Id = EntityType.Project_DesignSection_Modification_Type;
                            documentType_Id = DocumentType.Project_DesignSection_Modifications_Type_Attachment;

                        }
                        else if (model.Project_Section_Parent_Type_DDL_Text == "Modification Services")
                        {
                            entityType_Id = EntityType.Project_DesignSection_Modification_Services;
                            documentType_Id = DocumentType.Project_DesignSection_Modifications_Services_Attachment;

                        }
                        else
                        {
                            entityType_Id = EntityType.Project_DesignSection_Other;
                            documentType_Id = DocumentType.Project_DesignSection_Other_Attachment;

                        }



                        Service.UploadFileForSingleAndMultiple(
                        file.CurrentFilePath,
                        file.OriginalFileName,
                        file.CurrentFileName,
                        (int)entityType_Id,
                        (int)model.Project_DesignSection_Entity_Id,
                        (int)documentType_Id,
                        (int)model.DesignSection_Document_CreatedBy,
                        (string)model.DesignSection_Document_StartDate,
                        (string)model.DesignSection_Document_EndDate,
                        (int)model.DesignSection_Document_ProjectId,
                        (string)model.DesignSection_Remarks,

                        XtremeFactory._factory, XtremeFactory.connectionString);


                    }
                }

                /*SMS Sending Code
                if (_response.Type.ToString().ToLower() == "success")
                {
                    var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)model.DesignSection_Document_ProjectId);
                    string messageBody = string.Empty;
                    Commands.SMSService smsService = new Commands.SMSService();
                    foreach (var employee in projectLinkedEmployees)
                    {
                        messageBody = model.Project_Section_Parent_Type_DDL_Text+" document has been uploaded"+ System.Environment.NewLine + "Project # - " + employee.ProjectNumber + System.Environment.NewLine + "Name - " + employee.NameEng + System.Environment.NewLine + "Location - " + employee.Location;
                        //int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody);
                        int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody, "Project Design Section", model.DesignSection_Document_ProjectId, 0, employee.EmployeeId);

                    }
                }
                */
                //Send Notification
                if (_response.Type.ToString().ToLower() == "success")
                {
                    var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)model.DesignSection_Document_ProjectId);
                    var clientDetailInfo = GetClientDetailByProjectId(0, model.DesignSection_Document_ProjectId);
                    if (projectLinkedEmployees.Count > 0 && clientDetailInfo != null)
                    {
                        NotificationService notificationService = new NotificationService();
                        string subject = string.Empty, description = string.Empty;
                        subject = "New document attachment";
                        description = "New document( " + model.Project_Section_Parent_Type_DDL_Text + " ) attached for  project# " + clientDetailInfo.ProjectNumber + ", section: " + model.Project_Section_Parent_Type_DDL_Text + "";
                        foreach (var employee in projectLinkedEmployees)
                        {
                            var res = notificationService.Save(subject, subject, description, description, "", model.DesignSection_Document_ProjectId, model.DesignSection_Document_CreatedBy, employee.EmployeeId, model.DesignSection_Document_Language);
                        }
                        var projectCreator = GetProjectCreatorInfoByProjectId((int)model.DesignSection_Document_ProjectId);
                        if (projectCreator != null && projectCreator.UserId != model.DesignSection_Document_CreatedBy)
                        {
                            var res = notificationService.Save(subject, subject, description, description, "", model.DesignSection_Document_ProjectId, model.DesignSection_Document_CreatedBy, projectCreator.EmployeeId, model.DesignSection_Document_Language);
                        }
                    }
                }
                return _response;

            }
        }
        #endregion
        #region  PROJECT  DESIGN SECTION  DOCUMENT LIST
        [Command(Name = "Project_DesignSection_Document_Get")]
        public class Project_DesignSection_Document_GetCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    Project_Id = 0,
                    Language = string.Empty,
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Project_DesignSection_Document_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
        #endregion
        #region  PROJECT  DESIGN SECTION GOVERNMENT DOCUMENT LIST
        [Command(Name = "Project_DesignSection_GovernmentDocument_Get")]
        public class Project_DesignSection_GovernmentDocument_GetCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    Project_Id = 0,
                    Language = string.Empty,
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Project_DesignSection_GovernmentDocument_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
        #endregion


        #region  PROJECT DETAILS  STEPPER MENU  LIST
        [Command(Name = "STEPPER_SUB_SECTION_MENU")]
        public class STEPPER_SUB_SECTION_MENUCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    Project_Id = 0,
                    ParentType = string.Empty,
                    Language = string.Empty,
                    // LoggedInEmployeeId = 0,
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(ProjectStoreProcedure.STEPPER_SUB_SECTION_MENU.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
        #endregion
        #region  PROJECT DETAILS DESIGN SECTION DOCUMENTS LIST
        [Command(Name = "Project_DesignSection_Document_GetById")]
        public class Project_DesignSection_Document_GetByIdCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    Project_Id = 0,
                    Setup_Type_Id = 0,
                    Language = string.Empty,
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Project_DesignSection_Document_GetById.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
        #endregion
        #region  PROJECT  DESIGN SECTION DOCUMENT DELETE BY ID
        [Command(Name = "Project_DesignSection_Document_Delete")]
        public class Project_DesignSection_Document_DeleteCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    Id = 0,
                    CreatedBy = 0,
                    Language = string.Empty
                }, viewInput);




                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                var _response = repository.GetSingle<dynamic>(ProjectStoreProcedure.Project_DesignSection_Document_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

                //SMS Sending Code
                var smsModel = base.MappedModel(new
                {
                    Id = 0,
                    CreatedBy = 0,
                    Document = string.Empty,
                    ProjectId = 0,
                    Language = string.Empty
                }, viewInput);
                /*if (_response.Type.ToString().ToLower() == "success")
                {
                    var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)smsModel.ProjectId);
                    string messageBody = string.Empty;
                    Commands.SMSService smsService = new Commands.SMSService();
                    foreach (var employee in projectLinkedEmployees)
                    {
                        messageBody = smsModel.Document + " document has been removed" + System.Environment.NewLine + "Project # - " + employee.ProjectNumber + System.Environment.NewLine + "Name - " + employee.NameEng + System.Environment.NewLine + "Location - " + employee.Location;
                        //int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody);
                        int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody, "Project Design Section", smsModel.ProjectId, 0, employee.EmployeeId);

                    }
                }
                */
                //Send Notification
                if (_response.Type.ToString().ToLower() == "success")
                {
                    var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)smsModel.ProjectId);
                    var clientDetailInfo = GetClientDetailByProjectId(0, smsModel.ProjectId);
                    if (projectLinkedEmployees.Count > 0 && clientDetailInfo != null)
                    {
                        NotificationService notificationService = new NotificationService();
                        string subject = string.Empty, description = string.Empty;
                        subject = "Document removed";
                        description = "Document( " + smsModel.Document.Split('|')[0] + " ) removed from  project# " + clientDetailInfo.ProjectNumber + ", section: " + smsModel.Document.Split('|')[0] + "";
                        foreach (var employee in projectLinkedEmployees)
                        {
                            var res = notificationService.Save(subject, subject, description, description, "", smsModel.ProjectId, smsModel.CreatedBy, employee.EmployeeId, smsModel.Language);
                        }
                        var projectCreator = GetProjectCreatorInfoByProjectId((int)smsModel.ProjectId);
                        if (projectCreator != null && projectCreator.UserId != smsModel.CreatedBy)
                        {
                            var res = notificationService.Save(subject, subject, description, description, "", smsModel.ProjectId, smsModel.CreatedBy, projectCreator.EmployeeId, smsModel.Language);
                        }
                    }
                }
                return _response;

            }
        }
        #endregion

        #region DESIGN SECTION DOCUMENT TRANSFER BY ID 


        [Command(Name = "Project_DesignSection_Document_Transfer_ById")]
        public class Project_DesignSection_Document_Transfer_ByIdCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {

                object result = new { status = false, returnUrl = "#" };
                var model = base.MappedModel(new
                {

                    Project_Id = 0,
                    Attachment_Id = 0,
                    From_SetupType_Id = 0,
                    To_SetupType_Id = 0,
                    EmployeeId = 0,
                    UserId = 0,
                    AttachmentRemarks = string.Empty,
                    ApprovedOrReturned = string.Empty,
                    Language = string.Empty
                }, viewInput);

                var smsModel = base.MappedModel(new
                {

                    Project_Id = 0,
                    Attachment_Id = 0,
                    From_SetupType_Id = 0,
                    To_SetupType_Id = 0,
                    EmployeeId = 0,
                    UserId = 0,
                    AttachmentRemarks = string.Empty,
                    FromDocumentType = string.Empty,
                    ToDocumentType = string.Empty,
                    Language = string.Empty
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                var _response = repository.GetSingle<dynamic>(ProjectStoreProcedure.Project_DesignSection_Document_Transfer_ById.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);
                /* SMS Sending Code
                if (_response.Type.ToString().ToLower() == "success")
                {
                    //var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)_response.InsertedId);
                    var clientDetailInfo = GetClientDetailByProjectId(0, smsModel.Project_Id);
                    string messageBody = string.Empty;
                    Commands.SMSService smsService = new Commands.SMSService();
                    //foreach (var employee in projectLinkedEmployees)
                    //{                     
                    //    messageBody = "Project Info has been "+(model.Id == 0 ? "created" : "updated") + System.Environment.NewLine+"Project # - " + employee.ProjectNumber + System.Environment.NewLine + "Name - " + employee.NameEng + System.Environment.NewLine + "Location - " + employee.Location;
                    //    int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody,"Project Info",_response.InsertedId,model.Client_Id,employee.EmployeeId);
                    //
                    //}
                    //messageBody = "Project Info has been " + (model.Id == 0 ? "created" : "updated") + System.Environment.NewLine + "Project # - " + clientDetailInfo.ProjectNumber + System.Environment.NewLine + "Name - " + clientDetailInfo.NameEng + System.Environment.NewLine + "Location - " + clientDetailInfo.Location;
                    messageBody = "Project document has been transferred from " + smsModel.FromDocumentType + " to " + smsModel.ToDocumentType;
                    int _smsResponse = smsService.SendSMS(clientDetailInfo.PhoneNumber1, messageBody, "Project Info", smsModel.Project_Id, 0, 0, 0);
                }
                */

                //Send Notification
                if (_response.Type.ToString().ToLower() == "success")
                {
                    var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)smsModel.Project_Id);
                    var clientDetailInfo = GetClientDetailByProjectId(0, smsModel.Project_Id);
                    if (projectLinkedEmployees.Count > 0 && clientDetailInfo != null)
                    {
                        NotificationService notificationService = new NotificationService();
                        string subject = string.Empty, description = string.Empty;
                        subject = "Document transferred";
                        description = "Document transferred from " + smsModel.FromDocumentType + " to " + smsModel.ToDocumentType + "  project# " + clientDetailInfo.ProjectNumber + "";
                        foreach (var employee in projectLinkedEmployees)
                        {
                            var res = notificationService.Save(subject, subject, description, description, "", smsModel.Project_Id, smsModel.UserId, employee.EmployeeId, smsModel.Language);
                        }
                        var projectCreator = GetProjectCreatorInfoByProjectId((int)smsModel.Project_Id);
                        if (projectCreator != null && projectCreator.UserId != smsModel.UserId)
                        {
                            var res = notificationService.Save(subject, subject, description, description, "", smsModel.Project_Id, smsModel.UserId, projectCreator.EmployeeId, smsModel.Language);
                        }
                    }
                }
                return _response;
            }
        }
        #endregion



        #region  PROJECT LOAD ENGINEERS FOR PROJECT DESIGN SECTION

        [Command(Name = "Project_HR_Employee")]
        public class Project_HR_EmployeeCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    Project_Id = 0,
                    Main_Section_Id = 0,
                    Sub_Section_Id = 0,
                    Language = string.Empty,
                    callingArea = string.Empty

                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Project_HR_Employee.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
        #endregion
        #region  PROJECT LOAD ASSIGNED ENGINEERS FOR PROJECT DESIGN SECTION

        [Command(Name = "Project_Linked_Employees_By_SectionId")]
        public class Project_Linked_Employees_By_SectionIdCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    Project_Id = 0,
                    Sub_Section_Id = 0,
                    Language = string.Empty

                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Project_Linked_Employees_By_SectionId.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
        #endregion
        #region PROJECT DELETE ASSIGNED ENGINEERS BY ID 


        [Command(Name = "Project_Linked_Multiple_Employees_Delete_By_Id")]
        public class Project_Linked_Multiple_Employees_Delete_By_IdCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {

                object result = new { status = false, returnUrl = "#" };

                /*SMS Sending Code*/
                //Get Linked Employee by Lnk Id
                var modelEmp = base.MappedModel(new
                {

                    Id = 0,
                }, viewInput);

                var repositoryEmp = Ioc.Resolve<IRepository>();
                IDictionary<string, object> valuesEmp = new Dictionary<string, object>();
                CommandParameters _paramsEmp = new CommandParameters();

                valuesEmp = _paramsEmp.Get(modelEmp);
                var _responseEmp = repositoryEmp.GetSingle<dynamic>("Project_Linked_Multiple_Employees_Get_By_Id".ToString(), valuesEmp, XtremeFactory._factory, XtremeFactory.projectconnectionString);



                //Project_Linked_Multiple_Employees_Get_By_Id



                var model = base.MappedModel(new
                {

                    Id = 0,
                    UserId = 0,
                    Language = string.Empty
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                var _response = repository.GetSingle<dynamic>(ProjectStoreProcedure.Project_Linked_Multiple_Employees_Delete_By_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);



                /*SMS Sending Code*/
                if (_response.Type.ToString().ToLower() == "success")
                {
                    var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)_responseEmp.Project_Id);
                    string messageBody = string.Empty;
                    Commands.SMSService smsService = new Commands.SMSService();
                    //Added below logic to send SMS only to now added employee(s)
                    if (projectLinkedEmployees.Count > 0)
                    {

                        messageBody = "Employee(" + _responseEmp.NameEng.ToString().Trim() + ") has been removed from " + _responseEmp.SetupType + " - " + _responseEmp.SetupTypeDetail + "" + "." + " Project # - " + projectLinkedEmployees[0].ProjectNumber + "." + "Name - " + projectLinkedEmployees[0].NameEng + "." + " Location - " + projectLinkedEmployees[0].Location;
                        //int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody);
                    }
                    int _smsResponse = smsService.SendSMS(_responseEmp.PhoneNumber, messageBody, "" + _responseEmp.SetupType + " - " + _responseEmp.SetupTypeDetail + "", _responseEmp.Project_Id, 0, _responseEmp.HR_Employee_Id, model.UserId);

                    //Below commented code will send SMS to all asigned employees now and previous
                    //foreach (var employee in projectLinkedEmployees)
                    //{
                    //    messageBody = "Employee(" + _responseEmp.NameEng + ") has been removed from " + _responseEmp.SetupType + " - " + _responseEmp.SetupTypeDetail + "" + System.Environment.NewLine + "Project # - " + employee.ProjectNumber + System.Environment.NewLine + "Name - " + employee.NameEng + System.Environment.NewLine + "Location - " + employee.Location;
                    //    //int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody);
                    //    int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody, "" + _responseEmp.SetupType + " - " + _responseEmp.SetupTypeDetail + "", _responseEmp.Project_Id, 0, employee.EmployeeId);
                    //
                    //}
                }

                //Send Notification
                if (_response.Type.ToString().ToLower() == "success")
                {
                    var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)_responseEmp.Project_Id);
                    var clientDetailInfo = GetClientDetailByProjectId(0, _responseEmp.Project_Id);

                    if (projectLinkedEmployees.Count > 0 && clientDetailInfo != null)
                    {
                        NotificationService notificationService = new NotificationService();
                        string subject = string.Empty, description = string.Empty;
                        subject = "1 employee removed";
                        description = "1 employee(" + _responseEmp.NameEng + ") removed from project# " + clientDetailInfo.ProjectNumber + ", section: " + _responseEmp.SetupType + "";
                        foreach (var employee in projectLinkedEmployees)
                        {
                            var res = notificationService.Save(subject, subject, description, description, "", _responseEmp.Project_Id, model.UserId, employee.EmployeeId, model.Language);
                        }
                        var projectCreator = GetProjectCreatorInfoByProjectId((int)_responseEmp.Project_Id);
                        if (projectCreator != null && projectCreator.UserId != model.UserId)
                        {
                            var res = notificationService.Save(subject, subject, description, description, "", _responseEmp.Project_Id, model.UserId, projectCreator.EmployeeId, model.Language);
                        }
                    }
                }
                return _response;

            }
        }
        #endregion
        #region  PROJECT SAVE MULTIPLE ENGINEERS FOR DESIGN SECTION

        [Command(Name = "Project_Save_Multiple_Employees")]
        public class Project_Save_Multiple_EmployeesCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    ProjectModel = new List<ProjectModel>(),
                    CreatedBy = 0,
                    CompletionDate = string.Empty,
                    Language = ""
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);


                var table = new KeyValuePair<string, DataTable>("[dbo].[UD_Project_Save_Multiple_Employees]", ExtensionMethods.ToDataTable(model.ProjectModel));
                var ProductList = new Dictionary<string, KeyValuePair<string, DataTable>>();
                ProductList.Add("@UD_Project_Save_Multiple_Employees", table);
                var response = repository.GetMultipleWithTableValuParam<dynamic>(ProjectStoreProcedure.Project_Save_Multiple_Employees.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.projectconnectionString);

                var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)model.ProjectModel[0].Project_Id);
                IDictionary<string, object> valuesGetTypeAndDetail = new Dictionary<string, object>();
                valuesGetTypeAndDetail.Add("@SetupTypeId", model.ProjectModel[0].Section_Entity_Id);
                valuesGetTypeAndDetail.Add("@SetupTypeDetailId", model.ProjectModel[0].Sub_Section_Entity_Id);
                valuesGetTypeAndDetail.Add("@Language", "en-US");
                var responseSetupTypeAndDetail = repository.GetSingle<dynamic>("Setup_Type_With_Detail_GetByTypeAndDetailId".ToString(), valuesGetTypeAndDetail, XtremeFactory._factory, XtremeFactory.connectionString);
                var clientDetailInfo = GetClientDetailByProjectId(0, model.ProjectModel[0].Project_Id);
                //SMS Sending Code
                if (response.ToList()[0].Type.ToString().ToLower() == "success")
                {

                    string messageBody = string.Empty;
                    Commands.SMSService smsService = new Commands.SMSService();
                    //Added below logic to send SMS only to now added employee(s)
                    foreach (var asignedEmployee in model.ProjectModel)
                    {
                        var employee = projectLinkedEmployees.Where(filter => filter.EmployeeId == asignedEmployee.HR_Employee_Id).FirstOrDefault();
                        if (employee != null)
                        {
                            //messageBody = model.ProjectModel.Count().ToString()+" more employee(s) has been added to Design Section" + System.Environment.NewLine + "Project # - " + employee.ProjectNumber + System.Environment.NewLine + "Name - " + employee.NameEng + System.Environment.NewLine + "Location - " + employee.Location;
                            messageBody = employee.EmpNameEng.ToString().Trim() + " has been added to " + responseSetupTypeAndDetail.SetupType + " - " + responseSetupTypeAndDetail.SetupTypeDetail + "" + "." + "Project # - " + employee.ProjectNumber + "." + "Name - " + employee.NameEng + "." + "Location - " + employee.Location;
                            //int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody);
                            int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody, "" + responseSetupTypeAndDetail.SetupType + " - " + responseSetupTypeAndDetail.SetupTypeDetail + "", model.ProjectModel[0].Project_Id, 0, employee.EmployeeId);

                        }
                    }
                    //Below commented code will send SMS to all asigned employees now and previous
                    //foreach (var employee in projectLinkedEmployees)
                    //{
                    //    //messageBody = model.ProjectModel.Count().ToString()+" more employee(s) has been added to Design Section" + System.Environment.NewLine + "Project # - " + employee.ProjectNumber + System.Environment.NewLine + "Name - " + employee.NameEng + System.Environment.NewLine + "Location - " + employee.Location;
                    //    messageBody = model.ProjectModel.Count().ToString()+" more employee(s) has been added to "+ responseSetupTypeAndDetail.SetupType + " - "+responseSetupTypeAndDetail.SetupTypeDetail + "" + System.Environment.NewLine + "Project # - " + employee.ProjectNumber + System.Environment.NewLine + "Name - " + employee.NameEng + System.Environment.NewLine + "Location - " + employee.Location;
                    //    //int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody);
                    //    int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody, ""+ responseSetupTypeAndDetail.SetupType + " - "+responseSetupTypeAndDetail.SetupTypeDetail + "", model.ProjectModel[0].Project_Id, 0, employee.EmployeeId);
                    //
                    //}
                }
                //Ends SMS Sending Code

                //Send Notification
                if (response.ToList()[0].Type.ToString().ToLower() == "success")
                {


                    if (projectLinkedEmployees.Count > 0 && clientDetailInfo != null)
                    {
                        NotificationService notificationService = new NotificationService();
                        //string subject = string.Empty, description = string.Empty;
                        string subject = string.Empty, description = string.Empty;
                        subject = "Employee added";
                        //description = model.ProjectModel.Count().ToString() + " employee(s) added for project# " + clientDetailInfo.ProjectNumber + ", section: " + responseSetupTypeAndDetail.SetupType + "";
                        //foreach (var asignedEmployee in model.ProjectModel)                        
                        foreach (var employee in projectLinkedEmployees)
                        {
                            foreach (var asignedEmployee in model.ProjectModel)
                            {
                                var employeeAdded = projectLinkedEmployees.Where(filter => filter.EmployeeId == asignedEmployee.HR_Employee_Id).FirstOrDefault();
                                description = "Employee(" + employeeAdded.EmpNameEng.ToString().Trim() + ") has been added for project# " + clientDetailInfo.ProjectNumber + ", section: " + responseSetupTypeAndDetail.SetupType + "";
                                var res = notificationService.Save(subject, subject, description, description, "", model.ProjectModel[0].Project_Id, model.ProjectModel[0].CreatedBy, employee.EmployeeId, model.ProjectModel[0].Language);
                            }
                        }
                        var projectCreator = GetProjectCreatorInfoByProjectId((int)model.ProjectModel[0].Project_Id);
                        if (projectCreator != null && projectCreator.UserId != model.ProjectModel[0].CreatedBy)
                        {
                            var res = notificationService.Save(subject, subject, description, description, "", model.ProjectModel[0].Project_Id, model.ProjectModel[0].CreatedBy, projectCreator.EmployeeId, model.ProjectModel[0].Language);
                        }
                    }
                }
                return response.ToList()[0];


            }

        }



        #endregion

        #region PROJECT  TECHNICAL SECTION  DOCUMENT  SAVE

        [Command(Name = "Project_TechnicalSection_Document_Save")]
        public class Project_TechnicalSection_Document_SaveCommand : CamelCommandBase
        {
            public IFileService Service;
            protected override object DoAction(object v)
            {
                var model = base.MappedModel(new
                {
                    TechnicalSection_Document_Id = 0,
                    TechnicalSection_Document_ProjectId = 0,
                    Project_TechnicalSection_Entity_Id = 0,
                    TechnicalSection_Document_CreatedBy = 0,
                    Project_Section_Parent_Type_DDL_Text = string.Empty,
                    Project_Technical_Section_Parent_Type_DDL_Text = string.Empty,
                    TechnicalSection_Document_StartDate = string.Empty,
                    TechnicalSection_Document_EndDate = string.Empty,
                    TechnicalSection_Document_Language = string.Empty,
                    TechnicalSection_Remarks = string.Empty,
                    UploadedFiles = new List<FileUploadModel>()
                }, v);
                #region ==========  PARAMETERS

                object result = new { status = false, returnUrl = "#" };
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                #endregion
                values.Add("@Id", model.TechnicalSection_Document_ProjectId);
                values.Add("@Language", model.TechnicalSection_Document_Language);
                //   values = _params.Get(model);

                var _response = Ioc.Resolve<IRepository>().GetSingle<dynamic>(ProjectStoreProcedure.Return_Common_Msg.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);


                if (model.UploadedFiles.Count > 0)
                {
                    Service = new FileUploadService();
                    foreach (var file in model.UploadedFiles)
                    {
                        object entityType_Id = 0, documentType_Id = 0;

                        if (model.Project_Section_Parent_Type_DDL_Text == "Technical Manager")
                        {
                            entityType_Id = EntityType.Project_TechnicalSection_TechnicalManager;
                            documentType_Id = DocumentType.Project_TechnicalSection_TechnicalManager_Attachment;
                        }
                        else if (model.Project_Section_Parent_Type_DDL_Text == "MEP Section")
                        {
                            entityType_Id = EntityType.Project_TechnicalSection_MEP_Section;
                            documentType_Id = DocumentType.Project_TechnicalSection_MEP_Section_Attachment;

                        }
                        else if (model.Project_Section_Parent_Type_DDL_Text == "Structural Section")
                        {
                            entityType_Id = EntityType.Project_TechnicalSection_Structural_Section;
                            documentType_Id = DocumentType.Project_TechnicalSection_Structural_Section_Attachment;

                        }
                        else if (model.Project_Section_Parent_Type_DDL_Text == "Municipality Section")
                        {
                            entityType_Id = EntityType.Project_TechnicalSection_Municipality_Section;
                            documentType_Id = DocumentType.Project_TechnicalSection_Municipality_Section_Attachment;

                        }
                        else if (model.Project_Section_Parent_Type_DDL_Text == "Tender Section")
                        {
                            entityType_Id = EntityType.Project_TechnicalSection_Tender_Section;
                            documentType_Id = DocumentType.Project_TechnicalSection_Tender_Section_Attachment;

                        }
                        else if (model.Project_Section_Parent_Type_DDL_Text == "MEP Approval Section")
                        {
                            entityType_Id = EntityType.Project_TechnicalSection_MEP_Approval_Section;
                            documentType_Id = DocumentType.Project_TechnicalSection_MEP_Approval_Section_Attachment;

                        }
                        else if (model.Project_Section_Parent_Type_DDL_Text == "MEP Submission Section")
                        {
                            entityType_Id = EntityType.Project_TechnicalSection_MEP_Submission_Section;
                            documentType_Id = DocumentType.Project_TechnicalSection_MEP_Submission_Section_Attachment;

                        }
                        else if (model.Project_Section_Parent_Type_DDL_Text == "Municipality Submission Section")
                        {
                            entityType_Id = EntityType.Project_TechnicalSection_Municipality_Submission_Section;
                            documentType_Id = DocumentType.Project_TechnicalSection_Municipality_Submission_Section_Attachment;

                        }




                        Service.UploadFileForSingleAndMultiple(
                        file.CurrentFilePath,
                        file.OriginalFileName,
                        file.CurrentFileName,
                        (int)entityType_Id,
                        (int)model.Project_TechnicalSection_Entity_Id,
                        (int)documentType_Id,
                        (int)model.TechnicalSection_Document_CreatedBy,
                        (string)model.TechnicalSection_Document_StartDate,
                        (string)model.TechnicalSection_Document_EndDate,
                        (int)model.TechnicalSection_Document_ProjectId,
                        (string)model.TechnicalSection_Remarks,

                        XtremeFactory._factory, XtremeFactory.connectionString);


                    }
                }
                /* SMS Sending Code                 
                if (_response.Type.ToString().ToLower() == "success")
                {
                    var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)model.TechnicalSection_Document_ProjectId);
                    string messageBody = string.Empty;
                    Commands.SMSService smsService = new Commands.SMSService();
                    foreach (var employee in projectLinkedEmployees)
                    {
                        //messageBody = "Project Technical Section Info has been " + (model.TechnicalSection_Document_Id == 0 ? "created" : "updated") + System.Environment.NewLine + "Project # - " + employee.ProjectNumber + System.Environment.NewLine + "Name - " + employee.NameEng + System.Environment.NewLine + "Location - " + employee.Location;
                        messageBody = model.Project_Technical_Section_Parent_Type_DDL_Text + " document has been uploaded" + System.Environment.NewLine + "Project # - " + employee.ProjectNumber + System.Environment.NewLine + "Name - " + employee.NameEng + System.Environment.NewLine + "Location - " + employee.Location;
                        //int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody);
                        int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody, "Project Technical Section", model.TechnicalSection_Document_ProjectId, 0, employee.EmployeeId);

                    }
                }
                */
                if (_response.Type.ToString().ToLower() == "success")
                {
                    var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)model.TechnicalSection_Document_ProjectId);
                    var clientDetailInfo = GetClientDetailByProjectId(0, model.TechnicalSection_Document_ProjectId);
                    if (projectLinkedEmployees.Count > 0 && clientDetailInfo != null)
                    {
                        NotificationService notificationService = new NotificationService();
                        string subject = string.Empty, description = string.Empty;
                        subject = "New document attached";
                        description = "New document( " + model.Project_Technical_Section_Parent_Type_DDL_Text + " ) attached for  project# " + clientDetailInfo.ProjectNumber + ", section: " + model.Project_Technical_Section_Parent_Type_DDL_Text + "";
                        foreach (var employee in projectLinkedEmployees)
                        {
                            var res = notificationService.Save(subject, subject, description, description, "", model.TechnicalSection_Document_ProjectId, model.TechnicalSection_Document_CreatedBy, employee.EmployeeId, model.TechnicalSection_Document_Language);
                        }
                        var projectCreator = GetProjectCreatorInfoByProjectId((int)model.TechnicalSection_Document_ProjectId);
                        if (projectCreator != null && projectCreator.UserId != model.TechnicalSection_Document_CreatedBy)
                        {
                            var res = notificationService.Save(subject, subject, description, description, "", model.TechnicalSection_Document_ProjectId, model.TechnicalSection_Document_CreatedBy, projectCreator.EmployeeId, model.TechnicalSection_Document_Language);
                        }
                    }
                }
                return _response;

            }
        }
        #endregion
        #region  PROJECT LOAD ASSIGNED ENGINEERS FOR PROJECT TECHNICAL SECTION

        [Command(Name = "Project_Linked_Employees_Technical_Section_By_SectionId_Get")]
        public class Project_Linked_Employees_Technical_Section_By_SectionId_GetCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    Project_Id = 0,
                    Section_Id = 0,
                    Sub_Section_Id = 0,
                    Language = string.Empty

                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Project_Linked_Employees_Technical_Section_By_SectionId_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
        #endregion
        #region  PROJECT  TECHNICAL SECTION  DOCUMENT LIST
        [Command(Name = "Project_TechnicalSection_Document_Get")]
        public class Project_TechnicalSection_Document_GetCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    Project_Id = 0,
                    Language = string.Empty,
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Project_TechnicalSection_Document_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
        #endregion
        #region  PROJECT  TECHNICAL SECTION DOCUMENT DELETE BY ID
        [Command(Name = "Project_TechnicalSection_Document_Delete")]
        public class Project_TechnicalSection_Document_DeleteCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    Id = 0,
                    CreatedBy = 0,
                    Language = string.Empty
                }, viewInput);


                var smsModel = base.MappedModel(new
                {
                    Id = 0,
                    CreatedBy = 0,
                    Document = string.Empty,
                    ProjectId = 0,
                    Language = string.Empty
                }, viewInput);





                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                var _response = repository.GetSingle<dynamic>(ProjectStoreProcedure.Project_TechnicalSection_Document_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

                /*SMS Sending Code
                if (_response.Type.ToString().ToLower() == "success")
                {
                    var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)smsModel.ProjectId);
                    string messageBody = string.Empty;
                    Commands.SMSService smsService = new Commands.SMSService();
                    foreach (var employee in projectLinkedEmployees)
                    {
                        messageBody = smsModel.Document + " document has been removed" + System.Environment.NewLine + "Project # - " + employee.ProjectNumber + System.Environment.NewLine + "Name - " + employee.NameEng + System.Environment.NewLine + "Location - " + employee.Location;                        
                        int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody, "Project Technical Section", smsModel.ProjectId, 0, employee.EmployeeId);

                    }
                }
                */
                //Send Notification
                if (_response.Type.ToString().ToLower() == "success")
                {
                    var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)smsModel.ProjectId);
                    var clientDetailInfo = GetClientDetailByProjectId(0, smsModel.ProjectId);
                    if (projectLinkedEmployees.Count > 0 && clientDetailInfo != null)
                    {
                        NotificationService notificationService = new NotificationService();
                        string subject = string.Empty, description = string.Empty;
                        subject = "Document removed";
                        description = "Document( " + smsModel.Document.Split('|')[0] + " ) removed from  project# " + clientDetailInfo.ProjectNumber + ", section: " + smsModel.Document.Split('|')[0] + "";
                        foreach (var employee in projectLinkedEmployees)
                        {
                            var res = notificationService.Save(subject, subject, description, description, "", smsModel.ProjectId, smsModel.CreatedBy, employee.EmployeeId, smsModel.Language);
                        }
                        var projectCreator = GetProjectCreatorInfoByProjectId((int)smsModel.ProjectId);
                        if (projectCreator != null && projectCreator.UserId != smsModel.CreatedBy)
                        {
                            var res = notificationService.Save(subject, subject, description, description, "", smsModel.ProjectId, smsModel.CreatedBy, projectCreator.EmployeeId, smsModel.Language);
                        }
                    }
                }
                return _response;

            }
        }
        #endregion

        #region  PROJECT DETAILS TECHNICAL SECTION DOCUMENTS LIST
        [Command(Name = "Project_TechnicalSection_Document_GetById")]
        public class Project_TechnicalSection_Document_GetByIdCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    Project_Id = 0,
                    Setup_Type_Id = 0,
                    Language = string.Empty,
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Project_TechnicalSection_Document_GetById.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
        #endregion
        #region TECHNICAL SECTION DOCUMENT TRANSFER BY ID 


        [Command(Name = "Project_TechnicalSection_Document_Transfer_ById")]
        public class Project_TechnicalSection_Document_Transfer_ByIdCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {

                object result = new { status = false, returnUrl = "#" };


                var model = base.MappedModel(new
                {

                    Project_Id = 0,
                    Attachment_Id = 0,
                    From_SetupType_Id = 0,
                    To_SetupType_Id = 0,
                    EmployeeId = 0,
                    UserId = 0,
                    AttachmentRemarks = string.Empty,
                    ApprovedOrReturned = string.Empty,
                    Language = string.Empty
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetSingle<dynamic>(ProjectStoreProcedure.Project_TechnicalSection_Document_Transfer_ById.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
        #endregion





        #region PROJECT  SUPERVISION SECTION  DOCUMENT  SAVE

        [Command(Name = "Project_SupervisionSection_Document_Save")]
        public class Project_SupervisionSection_Document_SaveCommand : CamelCommandBase
        {
            public IFileService Service;
            protected override object DoAction(object v)
            {
                var model = base.MappedModel(new
                {
                    SupervisionSection_Document_Id = 0,
                    SupervisionSection_Document_ProjectId = 0,
                    Project_SupervisionSection_Entity_Id = 0,
                    SupervisionSection_Document_CreatedBy = 0,
                    Project_Supervision_Section_Parent_Type_DDL = string.Empty,
                    SupervisionSection_Document_StartDate = string.Empty,
                    SupervisionSection_Document_EndDate = string.Empty,
                    SupervisionSection_Document_Language = string.Empty,
                    SupervisionSection_Remarks = string.Empty,
                    UploadedFiles = new List<FileUploadModel>()
                }, v);
                #region ==========  PARAMETERS

                object result = new { status = false, returnUrl = "#" };
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                #endregion
                values.Add("@Id", model.SupervisionSection_Document_ProjectId);
                values.Add("@Language", model.SupervisionSection_Document_Language);
                //   values = _params.Get(model);

                var _response = Ioc.Resolve<IRepository>().GetSingle<dynamic>(ProjectStoreProcedure.Return_Common_Msg.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);


                if (model.UploadedFiles.Count > 0)
                {
                    Service = new FileUploadService();
                    foreach (var file in model.UploadedFiles)
                    {
                        object entityType_Id = 0, documentType_Id = 0;

                        if (model.Project_Supervision_Section_Parent_Type_DDL == "Payments")
                        {
                            entityType_Id = EntityType.Project_SupervisionSection_Payments;
                            documentType_Id = DocumentType.Project_SupervisionSection_Payments_Attachment;
                        }
                        else if (model.Project_Supervision_Section_Parent_Type_DDL == "Site")
                        {
                            entityType_Id = EntityType.Project_SupervisionSection_Site;
                            documentType_Id = DocumentType.Project_SupervisionSection_Site_Attachment;

                        }
                        else if (model.Project_Supervision_Section_Parent_Type_DDL == "Supervision Letters")
                        {
                            entityType_Id = EntityType.Project_SupervisionSection_Supervision_Letters;
                            documentType_Id = DocumentType.Project_SupervisionSection_Supervision_Letters_Attachment;

                        }
                        else if (model.Project_Supervision_Section_Parent_Type_DDL == "Supervision Municipality")
                        {
                            entityType_Id = EntityType.Project_SupervisionSection_Supervision_Municipality;
                            documentType_Id = DocumentType.Project_SupervisionSection_Supervision_Municipality_Attachment;

                        }
                        else if (model.Project_Supervision_Section_Parent_Type_DDL == "Shop Drawing/Sub Contractor")
                        {
                            entityType_Id = EntityType.Project_SupervisionSection_Shop_Drawing_SubContractor;
                            documentType_Id = DocumentType.Project_SupervisionSection_Shop_Drawing_SubContractor_Attachment;

                        }
                        else if (model.Project_Supervision_Section_Parent_Type_DDL == "Supervision Documents")
                        {
                            entityType_Id = EntityType.Project_SupervisionSection_Supervision_Documents;
                            documentType_Id = DocumentType.Project_SupervisionSection_Supervision_Documents_Attachment;

                        }
                        else if (model.Project_Supervision_Section_Parent_Type_DDL == "Cash Flow")
                        {
                            entityType_Id = EntityType.Project_SupervisionSection_CashFlow;
                            documentType_Id = DocumentType.Project_SupervisionSection_CashFlow_Attachment;

                        }
                        else if (model.Project_Supervision_Section_Parent_Type_DDL == "Supervision Contract")
                        {
                            entityType_Id = EntityType.Project_SupervisionSection_SupervisionContract;
                            documentType_Id = DocumentType.Project_SupervisionSection_SupervisionContract_Attachment;

                        }
                        else if (model.Project_Supervision_Section_Parent_Type_DDL == "Completion Document")
                        {
                            entityType_Id = EntityType.Project_SupervisionSection_CompletionDocument;
                            documentType_Id = DocumentType.Project_SupervisionSection_CompletionDocument_Attachment;

                        }




                        Service.UploadFileForSingleAndMultiple(
                        file.CurrentFilePath,
                        file.OriginalFileName,
                        file.CurrentFileName,
                        (int)entityType_Id,
                        (int)model.Project_SupervisionSection_Entity_Id,
                        (int)documentType_Id,
                        (int)model.SupervisionSection_Document_CreatedBy,
                        (string)model.SupervisionSection_Document_StartDate,
                        (string)model.SupervisionSection_Document_EndDate,
                        (int)model.SupervisionSection_Document_ProjectId,
                        (string)model.SupervisionSection_Remarks,

                        XtremeFactory._factory, XtremeFactory.connectionString);


                    }
                }
                /*SMS Sending Code
                if (_response.Type.ToString().ToLower() == "success")
                {
                    IDictionary<string, object> valuesGetTypeAndDetail = new Dictionary<string, object>();
                    valuesGetTypeAndDetail.Add("@SetupTypeId", model.Project_Supervision_Section_Parent_Type_DDL);
                    valuesGetTypeAndDetail.Add("@SetupTypeDetailId", model.Project_SupervisionSection_Entity_Id);
                    valuesGetTypeAndDetail.Add("@Language", "en-US");
                    var responseSetupTypeAndDetail = Ioc.Resolve<IRepository>().GetSingle<dynamic>("Setup_Type_With_Detail_GetByTypeAndDetailId".ToString(), valuesGetTypeAndDetail, XtremeFactory._factory, XtremeFactory.connectionString);


                    var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)model.SupervisionSection_Document_ProjectId);
                    string messageBody = string.Empty;
                    Commands.SMSService smsService = new Commands.SMSService();
                    foreach (var employee in projectLinkedEmployees)
                    {
                        //messageBody = "Project Supervision Section Info has been " + (model.SupervisionSection_Document_Id == 0 ? "created" : "updated") + System.Environment.NewLine + "Project # - " + employee.ProjectNumber + System.Environment.NewLine + "Name - " + employee.NameEng + System.Environment.NewLine + "Location - " + employee.Location;
                        messageBody = responseSetupTypeAndDetail.SetupType+" - "+ responseSetupTypeAndDetail.SetupTypeDetail + " document has been uploaded" + System.Environment.NewLine + "Project # - " + employee.ProjectNumber + System.Environment.NewLine + "Name - " + employee.NameEng + System.Environment.NewLine + "Location - " + employee.Location;
                        //int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody);
                        int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody, "Project Supervision Section", model.SupervisionSection_Document_ProjectId, 0, employee.EmployeeId);

                    }
                }
                */
                //Send Notification
                if (_response.Type.ToString().ToLower() == "success")
                {
                    var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)model.SupervisionSection_Document_ProjectId);
                    var clientDetailInfo = GetClientDetailByProjectId(0, model.SupervisionSection_Document_ProjectId);

                    IDictionary<string, object> valuesGetTypeAndDetail = new Dictionary<string, object>();
                    valuesGetTypeAndDetail.Add("@SetupTypeId", model.Project_Supervision_Section_Parent_Type_DDL);
                    valuesGetTypeAndDetail.Add("@SetupTypeDetailId", model.Project_SupervisionSection_Entity_Id);
                    valuesGetTypeAndDetail.Add("@Language", "en-US");
                    var responseSetupTypeAndDetail = Ioc.Resolve<IRepository>().GetSingle<dynamic>("Setup_Type_With_Detail_GetByTypeAndDetailId".ToString(), valuesGetTypeAndDetail, XtremeFactory._factory, XtremeFactory.connectionString);



                    if (projectLinkedEmployees.Count > 0 && clientDetailInfo != null && responseSetupTypeAndDetail != null)
                    {
                        NotificationService notificationService = new NotificationService();
                        string subject = string.Empty, description = string.Empty;
                        subject = "New document attachment";
                        description = "New document( " + responseSetupTypeAndDetail.SetupType + " ) attached for  project# " + clientDetailInfo.ProjectNumber + ", section: " + responseSetupTypeAndDetail.SetupType + "";
                        foreach (var employee in projectLinkedEmployees)
                        {
                            var res = notificationService.Save(subject, subject, description, description, "", model.SupervisionSection_Document_ProjectId, model.SupervisionSection_Document_CreatedBy, employee.EmployeeId, model.SupervisionSection_Document_Language);
                        }
                        var projectCreator = GetProjectCreatorInfoByProjectId((int)model.SupervisionSection_Document_ProjectId);
                        if (projectCreator != null && projectCreator.UserId != model.SupervisionSection_Document_CreatedBy)
                        {
                            var res = notificationService.Save(subject, subject, description, description, "", model.SupervisionSection_Document_ProjectId, model.SupervisionSection_Document_CreatedBy, projectCreator.EmployeeId, model.SupervisionSection_Document_Language);
                        }
                    }
                }
                return _response;

            }
        }
        #endregion
        #region PROJECT  SUPERVISION SECTION AREA SAVE

        [Command(Name = "Project_SupervisionSection_Area_Save")]
        public class Project_SupervisionSection_Area_SaveCommand : CamelCommandBase
        {
            public IFileService Service;
            protected override object DoAction(object v)
            {
                var model = base.MappedModel(new
                {

                    SupervisionSection_Update_Area_ProjectId = 0,
                    Project_SupervisionSection_Contractor_Id = 0,
                    SupervisionSection_Update_Area_CreatedBy = 0,
                    ConstructionStartDate = string.Empty,
                    ConstructionMonths = 0,
                    ConstructionEndDate = string.Empty,
                    ExtendedConstructionStartDate = string.Empty,
                    ExtendedConstructionMonths = 0,
                    ExtendedConstructionEndDate = string.Empty,
                    Project_SupervisionSection_Finance_Id = string.Empty,
                    SupervisionSection_Update_Area_Language = string.Empty,

                }, v);
                #region ==========  PARAMETERS

                object result = new { status = false, returnUrl = "#" };
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                #endregion
                values = _params.Get(model);

                var _response = Ioc.Resolve<IRepository>().GetSingle<dynamic>(ProjectStoreProcedure.Project_SupervisionSection_Area_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);


                //if (model.UploadedFiles.Count > 0)
                //{
                //    Service = new FileUploadService();
                //    foreach (var file in model.UploadedFiles)
                //    {
                //        object entityType_Id = 0, documentType_Id = 0;



                //        Service.UploadFileForSingleAndMultiple(
                //        file.CurrentFilePath,
                //        file.OriginalFileName,
                //        file.CurrentFileName,
                //        (int)entityType_Id,
                //        (int)model.Project_SupervisionSection_Entity_Id,
                //        (int)documentType_Id,
                //        (int)model.SupervisionSection_Document_CreatedBy,
                //        (string)model.ConstructionStartDate,
                //        (string)model.ConstructionEndDate,
                //        (int)model.SupervisionSection_Document_ProjectId,
                //        (string)model.SupervisionSection_Remarks,

                //        XtremeFactory._factory, XtremeFactory.connectionString);


                //    }
                //}

                /* SMS Sendign Code
                if (_response.Type.ToString().ToLower() == "success")
                {
                    var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)model.SupervisionSection_Update_Area_ProjectId);
                    string messageBody = string.Empty;
                    Commands.SMSService smsService = new Commands.SMSService();
                    foreach (var employee in projectLinkedEmployees)
                    {
                        messageBody = "Supervision Section Info has been updated" + System.Environment.NewLine + "Project # - " + employee.ProjectNumber + System.Environment.NewLine + "Name - " + employee.NameEng + System.Environment.NewLine + "Location - " + employee.Location;
                        int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody, "Supervision Section Info", _response.InsertedId, 0, employee.EmployeeId);

                    }
                }
                */
                //Send Notification
                if (_response.Type.ToString().ToLower() == "success")
                {
                    var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)model.SupervisionSection_Update_Area_ProjectId);
                    var clientDetailInfo = GetClientDetailByProjectId(0, model.SupervisionSection_Update_Area_ProjectId);
                    if (projectLinkedEmployees.Count > 0 && clientDetailInfo != null)
                    {
                        NotificationService notificationService = new NotificationService();
                        string subject = string.Empty, description = string.Empty;
                        subject = "Supervison info updated";
                        description = "Supervison info updated for project# " + clientDetailInfo.ProjectNumber + "";
                        foreach (var employee in projectLinkedEmployees)
                        {
                            var res = notificationService.Save(subject, subject, description, description, "", model.SupervisionSection_Update_Area_ProjectId, model.SupervisionSection_Update_Area_CreatedBy, employee.EmployeeId, model.SupervisionSection_Update_Area_Language);
                        }
                        var projectCreator = GetProjectCreatorInfoByProjectId((int)model.SupervisionSection_Update_Area_ProjectId);
                        if (projectCreator != null && projectCreator.UserId != model.SupervisionSection_Update_Area_CreatedBy)
                        {
                            var res = notificationService.Save(subject, subject, description, description, "", model.SupervisionSection_Update_Area_ProjectId, model.SupervisionSection_Update_Area_CreatedBy, projectCreator.EmployeeId, model.SupervisionSection_Update_Area_Language);
                        }
                    }
                }
                return _response;

            }
        }

        [Command(Name = "Project_SupervisionSection_Document_Delete")]
        public class Project_SupervisionSection_Document_DeleteCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    Id = 0,
                    CreatedBy = 0,
                    Language = string.Empty
                }, viewInput);

                var smsModel = base.MappedModel(new
                {
                    Id = 0,
                    CreatedBy = 0,
                    Document = string.Empty,
                    ProjectId = 0,
                    Language = string.Empty
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                var _response = repository.GetSingle<dynamic>(ProjectStoreProcedure.Project_SupervisionSection_Document_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

                /* SMS Sending Code
                if (_response.Type.ToString().ToLower() == "success")
                {
                    var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)smsModel.ProjectId);
                    string messageBody = string.Empty;
                    Commands.SMSService smsService = new Commands.SMSService();
                    foreach (var employee in projectLinkedEmployees)
                    {
                        messageBody = smsModel.Document + " document has been removed" + System.Environment.NewLine + "Project # - " + employee.ProjectNumber + System.Environment.NewLine + "Name - " + employee.NameEng + System.Environment.NewLine + "Location - " + employee.Location;
                        //int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody);
                        int _smsResponse = smsService.SendSMS(employee.PhoneNumber, messageBody, "Project Supervision Section", smsModel.ProjectId, 0, employee.EmployeeId);

                    }
                }
                */
                //Send Notification
                if (_response.Type.ToString().ToLower() == "success")
                {
                    var projectLinkedEmployees = GetProjectLinkedEmployeesByProjectId((object)smsModel.ProjectId);
                    var clientDetailInfo = GetClientDetailByProjectId(0, smsModel.ProjectId);
                    if (projectLinkedEmployees.Count > 0 && clientDetailInfo != null)
                    {
                        NotificationService notificationService = new NotificationService();
                        string subject = string.Empty, description = string.Empty;
                        subject = "Document removed";
                        description = "Document( " + smsModel.Document.Split('|')[0] + " ) removed from  project# " + clientDetailInfo.ProjectNumber + ", section: " + smsModel.Document.Split('|')[0] + "";
                        foreach (var employee in projectLinkedEmployees)
                        {
                            var res = notificationService.Save(subject, subject, description, description, "", smsModel.ProjectId, smsModel.CreatedBy, employee.EmployeeId, smsModel.Language);
                        }
                        var projectCreator = GetProjectCreatorInfoByProjectId((int)smsModel.ProjectId);
                        if (projectCreator != null && projectCreator.UserId != smsModel.CreatedBy)
                        {
                            var res = notificationService.Save(subject, subject, description, description, "", smsModel.ProjectId, smsModel.CreatedBy, projectCreator.EmployeeId, smsModel.Language);
                        }
                    }
                }
                return _response;

            }
        }
        #endregion

        #region  PROJECT  SUPERVISION SECTION GOVERNMENT DOCUMENT LIST
        [Command(Name = "Project_SupervisionSection_Document_Get")]
        public class Project_SupervisionSection_Document_GetCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    Project_Id = 0,
                    Language = string.Empty,
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Project_SupervisionSection_Document_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
        #endregion
        #region  PROJECT DETAILS SUPERVISION SECTION DOCUMENTS LIST
        [Command(Name = "Project_SupervisionSection_Document_GetById")]
        public class Project_SupervisionSection_Document_GetByIdCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    Project_Id = 0,
                    Setup_Type_Id = 0,
                    Language = string.Empty,
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Project_SupervisionSection_Document_GetById.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
        #endregion
        #region SUPERVISION SECTION DOCUMENT TRANSFER BY ID 


        [Command(Name = "Project_SupervisionSection_Document_Transfer_ById")]
        public class Project_SupervisionSection_Document_Transfer_ByIdCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {

                object result = new { status = false, returnUrl = "#" };


                var model = base.MappedModel(new
                {

                    Project_Id = 0,
                    Attachment_Id = 0,
                    From_SetupType_Id = 0,
                    To_SetupType_Id = 0,
                    EmployeeId = 0,
                    UserId = 0,
                    AttachmentRemarks = string.Empty,
                    ApprovedOrReturned = string.Empty,
                    Language = string.Empty
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetSingle<dynamic>(ProjectStoreProcedure.Project_SupervisionSection_Document_Transfer_ById.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
        #endregion

        #region  PROJECT LOAD ASSIGNED ENGINEERS FOR PROJECT TECHNICAL SECTION

        [Command(Name = "Project_Linked_Employees_Supervision_Section_By_SectionId_Get")]
        public class Project_Linked_Employees_Supervision_Section_By_SectionId_GetCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    Project_Id = 0,
                    Section_Id = 0,
                    Sub_Section_Id = 0,
                    Language = string.Empty

                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Project_Linked_Employees_Supervision_Section_By_SectionId_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }
        #endregion
        #region PROJECT UNIT SUPERVISION SECTION EDIT BY ID 


        [Command(Name = "Project_Unit_Supervision_Section_Edit_By_Id")]
        public class Project_Unit_Supervision_Section_Edit_By_IdCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {

                object result = new { status = false, returnUrl = "#" };
                var model = base.MappedModel(new
                {

                    Project_Id = 0,
                    LoggedInUser = 0,
                    RoleId = 0,
                    LoggedInEmployeeId = 0,
                    Language = string.Empty
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                var checkresult = repository.GetSingle<dynamic>(ProjectStoreProcedure.Project_Unit_Supervision_Section_Edit_By_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);
                return checkresult;

            }
        }
        #endregion




        [Command(Name = "SendSMS")]
        public class SendSMSCommand : CamelCommandBase
        {

            protected override object DoAction(object viewInput)
            {
                Commands.SMSService smsService = new Commands.SMSService();
                var model = base.MappedModel(new
                {
                    Id = 0,
                    Title = string.Empty,
                    Description = string.Empty,
                    ReceiverNumber = string.Empty,
                    //Status = string.Empty,
                    //SendDate = string.Empty,
                    Project_Id = 0,
                    Client_Id = 0,
                    UserId = 0,
                    Language = string.Empty
                }, viewInput);


                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                var result = Ioc.Resolve<IRepository>().GetSingle<dynamic>(ProjectStoreProcedure.SMS_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);
                //var result = repository.GetMultiple<dynamic>(ProjectStoreProcedure.Project_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);
                string messageBody = model.Title + System.Environment.NewLine + model.Description;
                int _response = smsService.SendSMS(model.ReceiverNumber, messageBody);


                return result;

            }
        }



        #region PROJECT GET BY EMPLOYEE ID

        [Command(Name = "Project_Get_By_Employee_Id")]
        public class Project_Get_By_Employee_IdCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {

                object result = new { status = false, returnUrl = "#" };


                var model = base.MappedModel(new
                {
                    LoggedInUser = 0,
                    RoleId = 0,
                    LoggedInEmployeeId = 0,
                    Language = string.Empty
                }, viewInput);


                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(ProjectStoreProcedure.Project_Get_By_Employee_Id.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);

            }
        }

        #endregion



        #region  PROJECT  DESIGN SECTION DOCUMENT START DATE UPDATE BY PARAMETERS
        [Command(Name = "Project_Linked_Multiple_Employees_Update_StartedDate_By_Paramters")]
        public class Project_Linked_Multiple_Employees_Update_StartedDate_By_ParamtersCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    Project_Id = 0,
                    UserId = 0,
                    Employee_Id = 0,
                    Selected_Document_Step_Id = 0,
                    Language = string.Empty
                }, viewInput);



                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetSingle<dynamic>(ProjectStoreProcedure.Project_Linked_Multiple_Employees_Update_StartedDate_By_Paramters.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);


            }
        }
        #endregion

        public static dynamic GetProjectCreatorInfoByProjectId(int projectId)
        {
            IDictionary<string, object> values = new Dictionary<string, object>();
            values.Add("@ProjectId", projectId);
            var _response = Ioc.Resolve<IRepository>().GetSingle<dynamic>(ProjectStoreProcedure.Prject_CreatorInfo_GetByProjectId.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);
            return _response;
        }
        #region  PROJECT  IS EMPLOYEE START WORKING ON PROJECT ?
        [Command(Name = "Project_Employees_Started_Work")]
        public class Project_Employees_Started_WorkCommand : CamelCommandBase
        {
            protected override object DoAction(object viewInput)
            {
                var model = base.MappedModel(new
                {
                    Project_Id = 0,
                    UserId = 0,
                    Employee_Id = 0,
                    Selected_Document_Step_Id = 0,
                    Selected_Document_Sub_Step_Id = 0,
                    Language = string.Empty
                }, viewInput);



                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetSingle<dynamic>(ProjectStoreProcedure.Project_Employees_Started_Work.ToString(), values, XtremeFactory._factory, XtremeFactory.projectconnectionString);


            }
        }
        #endregion
    }
}

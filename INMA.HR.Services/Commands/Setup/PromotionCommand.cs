using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System.Collections.Generic;

namespace INMA.HR.Services.Commands.Setup
{
    #region ========== Promotion Type Save
    [Command(Name = "Setup_Promotion_Save")]
    public class Setup_Promotion_SaveCommand : CamelCommandBase
    {
        public IFileService Service;
        protected override object DoAction(object viewInput)
        {

            var model = base.MappedModel(new
            {
                PromotionID = 0,
                HR_DepartmentId = string.Empty,
                HR_Employee_Id = string.Empty,
                PromotionType = string.Empty,
                From_HR_Profession_Id = string.Empty,
                To_HR_Profession_Id = string.Empty,
                PromotionDate = string.Empty,
                CreatedBy = 0,
                Language = string.Empty,
                UploadedFiles = new List<FileUploadModel>()

            }, viewInput);

            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            IDictionary<string, object> values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Setup_Promotion_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            if (model.UploadedFiles.Count > 0)
            {
                Service = new FileUploadService();
                foreach (var file in model.UploadedFiles)
                {
                    Service.UploadFile(
                        file.CurrentFilePath,
                        file.OriginalFileName,
                        file.CurrentFileName,
                        (int)EntityType.Promotion,
                        (int)_response.InsertedId,
                        (int)DocumentType.Promotion_Document,
                        XtremeFactory._factory, XtremeFactory.connectionString);

                }
            }
            return _response;
        }
    }
    #endregion
    #region =========== Delete


    [Command(Name = "Setup_Promotion_Delete")]
    public class Setup_Promotion_DeleteCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {
            var model = base.MappedModel(new
            {
                Id = 0,
                Language = string.Empty
            }, viewInput);

            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            IDictionary<string, object> values = _params.Get(model);
            var _response = repository.GetSingle<dynamic>(StoreProcedure.Setup_Promotion_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            return _response;
        }
    }
    #endregion
    #region =========== Get List


    [Command(Name = "Setup_Promotion_Get")]
    public class Setup_Promotion_GetCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            var model = base.MappedModel(new
            {
                Language = string.Empty
            }, viewInput);
            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Setup_Promotion_Get.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }
    #endregion

    #region =========== Get Promotion DDL List


    [Command(Name = "Employees_Get_By_DepartmentID")]
    public class Employees_Get_By_DepartmentIDCommand : CamelCommandBase
    {
        protected override object DoAction(object viewInput)
        {

            var model = base.MappedModel(new
            {
                CreatedBy = 0,
                LoggedInUserDepartmentId = 0,
                RoleId = 0,
                SearchByDepartmentId = 0,
                Language = string.Empty
            }, viewInput);
            var repository = Ioc.Resolve<IRepository>();
            _ = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            IDictionary<string, object> values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Employees_Get_By_DepartmentID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }
    #endregion



}

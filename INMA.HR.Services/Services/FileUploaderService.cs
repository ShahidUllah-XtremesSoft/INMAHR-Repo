using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Configuration;
using CastleWindsor.Factory.Repository;
using CastleWindsor.Factory.Core;

namespace INMA.HR.Services
{
    public class UploadAttribute : Attribute
    {
        public string Name { get; set; }
    }
    public interface IFileService
    {
       // void UploadFileExt(string FilePath, string FileExt, Guid EntityId, int fileType, int UserId, string _factory, string _connectionString, int LinkId = 0);
        void UploadFile(string filePath, string origName, string curName,int entityType,int entityId, int documentType, string _factory, string _connectionString);
    }
    public class FileUploadService : IFileService
    {
        public void UploadFile(string filePath, string origName, string curName, int entityType, int entityId, int documentType, string _factory, string _connectionString)
        {
            var distination = AppDomain.CurrentDomain.BaseDirectory + ConfigurationManager.AppSettings["uploadFile"].ToString() + filePath.Substring(filePath.LastIndexOf("\\") + 1);
            if (!File.Exists(distination))
            {
                File.Copy(filePath, distination, true);
            }

            IDictionary<string, object> sqlParameters = new Dictionary<string, object>();
            sqlParameters.Add("@FilePath", distination);
            sqlParameters.Add("@OrignalPath", filePath);
            sqlParameters.Add("@OrignalFileName", origName);
            sqlParameters.Add("@CurrentFileName", curName);
            sqlParameters.Add("@EntityType", entityType);
            //sqlParameters.Add("@FileExtention", FileExt);
            sqlParameters.Add("@EntityId", entityId);
            sqlParameters.Add("@DocumentType", documentType);

            var repository = Ioc.Resolve<IRepository>();
            repository.ExecuteProcedure(StoreProcedure.Attachment_Save.ToString(), sqlParameters, _factory, _connectionString);
        }
    }
}

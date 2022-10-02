using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Configuration;
using CastleWindsor.Factory.Repository;
using CastleWindsor.Factory.Core;
using System.Globalization;

namespace INMA.HR.Services
{
    public class UploadAttribute : Attribute
    {
        public string Name { get; set; }
    }
    public interface IFileService
    {
        // void UploadFileExt(string FilePath, string FileExt, Guid EntityId, int fileType, int UserId, string _factory, string _connectionString, int LinkId = 0);
        void UploadFile(string filePath, string origName, string curName, int entityType, int entityId, int documentType, string _factory, string _connectionString);
        void UploadFileForSingleAndMultiple(string filePath, string origName, string curName, int entityType, int entityId, int documentType, int createdBy, string startDate, string endDate, string noExpiry, int FKGeneric_Id, string remarks,string comment_for_client_or_employee, string _factory, string _connectionString);
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
        // THIS IS FOR SINGLE AND MULTIPLE FILE SAVING WITH CREATER ID 
        public void UploadFileForSingleAndMultiple(string filePath, string origName, string curName, int entityType, int entityId, int documentType, int createdBy, string startDate, string endDate,string noExpiry, int FKGeneric_Id, string remarks, string comment_for_client_or_employee, string _factory, string _connectionString)
        {
            var distination = AppDomain.CurrentDomain.BaseDirectory + ConfigurationManager.AppSettings["uploadFile"].ToString() + filePath.Substring(filePath.LastIndexOf("\\") + 1);
            if (!File.Exists(distination))
            {
                File.Copy(filePath, distination, true);
            }
            //string startDater = DateTime.Parse(startDate).ToString("MM/dd/yyyy HH:mm:ss:tt", CultureInfo.InvariantCulture);
            //string eDates = DateTime.Parse(endDate).ToString("MM/dd/yyyy HH:mm:ss:tt", CultureInfo.InvariantCulture);
            //string startDater = DateTime.Parse(startDate).ToString("yyyy-MM-dd HH:mm:ss:tt", CultureInfo.InvariantCulture);
            //string eDates = DateTime.Parse(endDate).ToString("yyyy-MM-dd  HH:mm:ss:tt", CultureInfo.InvariantCulture);
            //DateTime startDates = DateTime.ParseExact(startDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
             //DateTime eDates = ParseDate(endDate); //DateTime.ParseExact(endDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);



            IDictionary<string, object> sqlParameters = new Dictionary<string, object>();
            sqlParameters.Add("@FilePath", distination);
            sqlParameters.Add("@OrignalPath", filePath);
            sqlParameters.Add("@OrignalFileName", origName);
            sqlParameters.Add("@CurrentFileName", curName);
            sqlParameters.Add("@EntityType", entityType);
            //sqlParameters.Add("@FileExtention", FileExt);
            sqlParameters.Add("@EntityId", entityId);
            sqlParameters.Add("@DocumentType", documentType);
            sqlParameters.Add("@CreatedBy", createdBy);
            //sqlParameters.Add("@EndDate", DateTime.Parse(startDate).ToString("MM/dd/yyyy :hh:mm tt"));
            //sqlParameters.Add("@EndDate", DateTime.Parse(endDate).ToString("MM/dd/yyyy :hh:mm tt"));
            sqlParameters.Add("@StartDate", startDate);
            sqlParameters.Add("@EndDate", endDate);
            sqlParameters.Add("@NoExpiry", noExpiry);
            sqlParameters.Add("@FKGeneric_Id", FKGeneric_Id);
            sqlParameters.Add("@remarks", remarks);
            sqlParameters.Add("@comment_for_client_or_employee", comment_for_client_or_employee);


            var repository = Ioc.Resolve<IRepository>();
            repository.ExecuteProcedure(StoreProcedure.Attachment_Save_Single_OR_Multiple.ToString(), sqlParameters, _factory, _connectionString);
        }


        private static DateTime ParseDate(string input)
        {
            return DateTime.ParseExact(input, formats, CultureInfo.InvariantCulture, DateTimeStyles.None);
        }
        private static string[] formats = new string[]
         {
                "MM/dd/yyyy HH:mm:ss tt",
                "MM/dd/yyyy HH:mm:ss",
                "M/dd/yyyy H:mm:ss tt",
                "M/dd/yyyy H:mm:ss"  ,
                "MM/dd/yyyy hh:mm tt",

                "dd/MM/yyyy HH:mm:ss tt",
                "dd/MM/yyyy HH:mm:ss",
                "d/M/yyyy H:mm:ss tt",
                "dd/MM/yyyy H:mm:ss"  ,
                "dd/MM/yyyy hh:mm tt",


                "yyyy-MM-dd HH:mm:ss:tt",
                "yyyy-MM-dd HH:mm:ss",
                "yyyy-M-d H:mm:ss tt",
                "yyyy-MM-dd H:mm:ss ",
                "yyyy-MM-dd H:mm tt"





         };


    }



}

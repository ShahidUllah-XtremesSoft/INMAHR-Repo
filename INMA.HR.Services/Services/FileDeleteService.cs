
using System.IO;
using System.Web.Hosting;

namespace INMA.HR.Services
{


    public static class PhysicalFileManager
    {
        public static void PhysicalFileDelete(string fileName)
        {
            var filePath = HostingEnvironment.MapPath("~/UploadFile/" + fileName);
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
        }
    }

    


}

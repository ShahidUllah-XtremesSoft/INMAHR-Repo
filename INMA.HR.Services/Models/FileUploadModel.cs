using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services
{
    public class FileUploadModel
    {
        public string CurrentFileName { get; set; }
        public string CurrentFilePath { get; set; }
        public string OriginalFileName { get; set; }
        public byte[] File { get; set; }
        public string FileType { get; set; }
        public string AttachmentType { get; set; }
        public int EntityType { get; set; }
    }
}

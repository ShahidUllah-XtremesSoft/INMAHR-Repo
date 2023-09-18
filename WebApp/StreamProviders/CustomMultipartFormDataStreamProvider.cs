using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Resources;
using System.Web;

namespace WebApp.StreamProviders
{
    public class CustomMultipartFormDataStreamProvider : MultipartFormDataStreamProvider
    {
        private string _fileName;

        public CustomMultipartFormDataStreamProvider(string path) : base(path)
        { }

        public CustomMultipartFormDataStreamProvider(string path, string fileName) : base(path)
        {
            _fileName = fileName;
        }

        public override string GetLocalFileName(HttpContentHeaders headers)
        {
            // var fileName_ = headers.ContentDisposition.FileName.ToString();
            var fileName_ = System.IO.Path.GetFileName(headers.ContentDisposition.FileName.Replace("\"", "")).Split('.')[0];

            try
            { 
                var ext = System.IO.Path.GetExtension(headers.ContentDisposition.FileName.Replace("\"", ""));
                // return "XtremeTech-" + Guid.NewGuid().ToString() + ext;
                return fileName_+"__" + Guid.NewGuid().ToString() + ext;
            }
            catch (Exception ex)
            {
                string error = ex.Message;
                // return "XtremeTech-" + Guid.NewGuid().ToString();
                return fileName_ + "__"+ Guid.NewGuid().ToString();
            }

        }

    }
}
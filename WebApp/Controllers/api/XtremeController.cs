
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using CastleWindsor.Factory.Core;
using WebApp.StreamProviders;
using WebApp.token;
using INMA.HR.Services;

namespace WebApp.Controllers
{
    public class XtremeController : ApiController
    {
        
        [AllowAnonymous]
        [HttpPost]
         [ActionName("gettoken")]
        public Response GetToken(Request request)
        {
            try
            {
                var command = Ioc.Resolve<ICommand>(request.Type);
                return command.Process(request);
            }
            catch (Exception ex)
            {
                Logger.Info("Command Name:" + request.Type);
                Logger.Info("Parameters:" + request.Value.ToString());
                Logger.Info("Exception:" + ex.ToString());
                throw new HttpResponseException(getErrorResponse());
            }
        }

      //  [JwtAuthentication]
        [HttpPost]
        [ActionName("process")]
        public Response Process(Request request)
        {
            try { 
                    var command = Ioc.Resolve<ICommand>(request.Type);
                    return command.Process(request);
                }
                    catch (Exception ex)
                    {
                        Logger.Info("Command Name:" + request.Type);
                        Logger.Info("Parameters:" + request.Value.ToString());
                        Logger.Info("Exception:" + ex.ToString());
                        throw new HttpResponseException(getErrorResponse());
            }
        }
        
        [HttpPost]
        [ActionName("multipart")]
        public async Task<HttpResponseMessage> Multipart()
        {
            var root = System.Web.Hosting.HostingEnvironment.MapPath("~/Temp");
            var provider = new CustomMultipartFormDataStreamProvider(root);
          //  bool isRemoveTempFile = true;
            var http = new HttpResponseMessage();
            try
            {
                Task<Response> task;
                var context = HttpContext.Current;
                List<FileUploadModel> uploadedFiles = new List<FileUploadModel>();
                HttpContext.Current = context;
                if (Request.Content.IsMimeMultipartContent())
                {
                    task = Request.Content.ReadAsMultipartAsync(provider).ContinueWith(o =>
                    {
                        var request = CreateRequestObject(provider, uploadedFiles);
                        
                        try
                        {
                            var command = Ioc.Resolve<ICommand>(request.Type);
                            return command.Process(request);
                        }
                        catch (Exception ex)
                        {
                            Logger.Info("Command Name:" + request.Type);
                            Logger.Info("Parameters:" + request.Value.ToString());
                            Logger.Info("Exception:" + ex.ToString());
                            throw new HttpResponseException(getErrorResponse());
                        }
                    });
                }
                else
                {
                    task = Request.Content.ReadAsFormDataAsync().ContinueWith(formFields =>
                    {
                        var request = CreateObject(formFields.Result, new Collection<MultipartFileData>(), uploadedFiles);
                        try
                        {
                            var command = Ioc.Resolve<ICommand>(request.Type);
                            return command.Process(request);
                        }
                        catch (Exception ex)
                        {
                            Logger.Info("Command Name:" + request.Type);
                            Logger.Info("Parameters:" + request.Value.ToString());
                             Logger.Info("Exception:" + ex.ToString());
                            throw new HttpResponseException(getErrorResponse());
                        }
                    });
                }
                var response = await task;
                if (uploadedFiles.Count > 0)
                {
                    try
                    {
                        foreach (var filePath in uploadedFiles)
                        {
                            if (System.IO.File.Exists(filePath.CurrentFilePath))
                            {
                                System.IO.File.Delete(filePath.CurrentFilePath);
                            }
                        }
                    }
                    catch
                    {

                    }
                }
                if (!(response.Value.ToString() == "null"))
                {
                    http.Content = new JsonContent(response.Value);
                    http.StatusCode = HttpStatusCode.OK;
                }
                else
                {
                    http.StatusCode = HttpStatusCode.NoContent;
                }

            }
            catch (Exception ex)
            {
                http.Content = new StringContent(ex.ToString());
                http.StatusCode = HttpStatusCode.InternalServerError;
            }
            return http;

        }
        private Request CreateObject(NameValueCollection form, Collection<MultipartFileData> files, List<FileUploadModel> uploadedFiles)
        {
            var request = new Request();
            var type = form.Get("type");
            if (string.IsNullOrEmpty(type))
                throw new Exception();
            request.Type = type;
            var fields = new Dictionary<string, object>();
            foreach (var file in files)
            {
                var content = file.Headers.ContentDisposition;
                uploadedFiles.Add(new FileUploadModel
                {
                    CurrentFileName = System.IO.Path.GetFileName(file.LocalFileName),
                    CurrentFilePath = file.LocalFileName,
                    OriginalFileName = content.FileName.Replace("\"", ""),
                    File = FileManager.ToBytes(file.LocalFileName),
                    AttachmentType = content.Name.Replace("\"", string.Empty)
                });
            }
            foreach (var key in form.AllKeys)
            {
                if (string.IsNullOrEmpty(key))
                    continue;
                // if checkbox is in form then check the key values to avoid the dublicate entry dictionary
                bool isBoolean;
                if (form.GetValues(key).Length > 0 && bool.TryParse(form.GetValues(key).FirstOrDefault(), out isBoolean))
                {
                    var checkBoxValue = form.GetValues(key).Length > 1 ? true : false;
                    fields.Add(key, checkBoxValue);
                    continue;
                }
                foreach (var val in form.GetValues(key))
                {
                    if (key.Contains("[]"))
                    {
                        //Handling for multiple option parameters
                        var k = key.Replace("[]", "");
                        //If already contains key, update key value
                        if (fields.ContainsKey(k))
                        {
                            object items;
                            fields.TryGetValue(k, out items);
                            ((List<string>)items).Add(val);

                            fields.Remove(k);
                            fields.Add(k, (object)items);
                        }
                        else
                        {
                            //Add New key with list of options
                            List<string> items = new List<string>();
                            items.Add(val);
                            fields.Add(k, (object)items);
                        }
                    }
                    else
                        fields.Add(key, val);
                }
            }
            //CreateObjectList(fileUpload);
            fields.Add("UploadedFiles", uploadedFiles);
            request.Value = JsonConvert.SerializeObject(fields);
            return request;
        }
        private Request CreateRequestObject(MultipartFormDataStreamProvider provider, List<FileUploadModel> uploadedFiles)
        {
            var form = provider.FormData;
            var files = provider.FileData;
            var request = new Request();
            request = CreateObject(form, files, uploadedFiles);
            return request;
        }


        private HttpResponseMessage getErrorResponse()
        {
            return new HttpResponseMessage(HttpStatusCode.InternalServerError)
            {
                Content = new StringContent(string.Format("Oops! Sorry! Something went wrong. Please contact mati@nss.ae so we can try to fix it.")),
                ReasonPhrase = "Oops!Sorry!Something went wrong.Please contact mati@nss.ae so we can try to fix it."
            };
        }
        private HttpResponseMessage getAccessErrorMessage()
        {
            return new HttpResponseMessage(HttpStatusCode.InternalServerError)
            {
                Content = new StringContent(string.Format("Oops! Sorry! You are not authorized to access this page.")),
                ReasonPhrase = "Oops! Sorry! You are not authorized to access this page."
            };
        }
    }
}


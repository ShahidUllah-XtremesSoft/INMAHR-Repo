using CastleWindsor.Factory.Core;
using CastleWindsor.Factory.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services.Commands.Common
{
    public class SharedUploadImage
    {
        IDictionary<string, object> ImageValues = new Dictionary<string, object>();

        public void SaveDynamicImages(object Id, object imageName, object imagePath, object Area)
        {


            ImageValues.Add("@FkId", Id);
            ImageValues.Add("@Name", imageName.ToString());
            ImageValues.Add("@Path", imagePath.ToString());
            ImageValues.Add("@Area", Area.ToString());
            Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Image_Save.ToString(), ImageValues, XtremeFactory._factory, XtremeFactory.connectionString);
            ImageValues = new Dictionary<string, object>();

        }
        //public void SaveProjectDocument(object Id, object imageName, object imagePath)
        //{


        //    ImageValues.Add("@FkGuidId", Id);
        //    ImageValues.Add("@Name", imageName.ToString());
        //    ImageValues.Add("@Path", imagePath.ToString());
        //    Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.SaveProjectDocument.ToString(), ImageValues, XtremeFactory._factory, XtremeFactory.connectionString);
        //    ImageValues = new Dictionary<string, object>();

        //}
        //public void SaveProfileImages(object Id, object imageName, object imagePath)
        //{


        //    ImageValues.Add("@FkGuidId", Id);
        //    ImageValues.Add("@Name", imageName.ToString());
        //    ImageValues.Add("@Path", imagePath.ToString());
        //    Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Image_SaveSingleProfileImage.ToString(), ImageValues, XtremeFactory._factory, XtremeFactory.connectionString);
        //    ImageValues = new Dictionary<string, object>();

        //}

        //public void Project_UpdateImagesByID(object Id, object imageName, object imagePath)
        //{


        //    ImageValues.Add("@FkGuidId", Id);
        //    ImageValues.Add("@Name", imageName.ToString());
        //    ImageValues.Add("@Path", imagePath.ToString());
        //    Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Project_UpdateImagesByID.ToString(), ImageValues, XtremeFactory._factory, XtremeFactory.connectionString);
        //    ImageValues = new Dictionary<string, object>();

        //}
        //public void SaveCustomerDynamicImagesFiels(object Id, object imageName, object imagePath, object userID)
        //{


        //    ImageValues.Add("@FkGuidId", Id);
        //    ImageValues.Add("@Name", imageName.ToString());
        //    ImageValues.Add("@Path", imagePath.ToString());
        //    ImageValues.Add("@UserId", userID);
        //    Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Image_Common_Save.ToString(), ImageValues, XtremeFactory._factory, XtremeFactory.connectionString);
        //    ImageValues = new Dictionary<string, object>();

        //}
        //public void SaveStaticImages(object Id)
        //{
        //    ImageValues = new Dictionary<string, object>();
        //    var defaultImage = "xpmDef25-b1e0-4ac4-82d9-bb10eebcc55c.png";
        //    var defaultRout = HostingEnvironment.MapPath(@"~/Temp");


        //    ImageValues.Add("@FkGuidId", Id);
        //    ImageValues.Add("@Name", defaultImage.ToString());
        //    ImageValues.Add("@Path", defaultRout.ToString() + "\\" + defaultImage);
        //    var checkResult = Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Image_Save.ToString(), ImageValues, XtremeFactory._factory, XtremeFactory.connectionString);



        //}
    }
}

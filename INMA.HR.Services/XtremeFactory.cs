﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services
{
    public class XtremeFactory
    {
        public static string _factory = "xtreme";
        public static string connectionString = ConfigurationManager.ConnectionStrings["INMAConnectionString"].ConnectionString;

        ////--------------- FOR PROJECT 
        public static string projectconnectionString = ConfigurationManager.ConnectionStrings["INMAProject"].ConnectionString;
    }

}

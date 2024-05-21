var loggedInUser = {};
var $grid_Project_document_expiry = "project-documents-expiry-grid", requestFrom = '';


$(function () {
    fn_Load_Project_Document_expiry();

});





function fn_Load_Project_Document_expiry() {
    ajaxRequest({
        commandName: 'Project_Dashboard_Document_Expiry_Get', values: {
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Branch_Id: loggedInUser.departmentId == undefined ? JSON.parse(localStorage.getItem('User')).departmentId : loggedInUser.departmentId,
            Language: _currentLanguage
        }, CallBack: fn_Load_Project_Document_expiryCallBack
    });

}
var fn_Load_Project_Document_expiryCallBack = function (inputDataJSON) {

     
    var gridColumns = [
        { title: "#", template: "<b>#= ++record #</b>", width: 10, },
        { field: "id", title: "id", width: 10, hidden: true },
        { field: "totalDays", title: "totalDays", width: 10, hidden: true },
        { field: "project_Id", title: "project_Id", width: 10, hidden: true },
        {
            field: "projectNo", title: lblProjectNo, width: 50, filterable: false, hidden: false
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fn_Load_Project_Document_expiry_Details(this)  '>#=projectNo#</a> ",
        },
        {
            field: "document", title: lblDocumentType, width: 100, filterable: false, hidden: false
        //    , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fnLoadDetailScreen(this)  '>#=document#</a> ",
        },

        {
            field: "expiryDate", title: lblExpiryDate, width: 30, filterable: false,
            template: "#if (totalDays <= 0) { # <span class='badge badge-danger'>#:expiryDate#</span> # } else " +
                "if (totalDays <= 29) { # <span class='badge badge-warning'>#:expiryDate#</span> # } else" +
                "{# <span class='badge badge-success'>#:expiryDate#</span> # }#"
        },
        {
            field: "totalDays", title: lblExpiresIn, width: 30, filterable: false,
            template: "#if (totalDays <= 0) { # <span class='badge badge-danger'>#:totalDays#</span> # } else " +
                "if (totalDays <= 29) { # <span class='badge badge-warning'>#:totalDays#</span> # } else" +
                "{# <span class='badge badge-success'>#:totalDays#</span> # }#"

        },
        {
            field: "", title: lblStatus, width: 30, filterable: false,
            template: "#if (totalDays <= 0) { # <span class='badge badge-danger'>" + lblStatusExpired + "</span> # } else " +
                "if (totalDays <= 29) { # <span class='badge badge-warning'>" + lblStatusValid + "</span> # } else" +
                "{# <span class='badge badge-success'>" + lblStatusValid + "</span> # }#"
        },
    ];
    bindKendoGrid('project-documents-expiry-grid', 1000, gridColumns, JSON.parse(inputDataJSON.Value), false, 365, false);



};
 

function fn_Load_Project_Document_expiry_Details(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid_Project_document_expiry).data("kendoGrid");
    var dataItem = grid.dataItem(row);


    window.location.href = '/Project/Project/Detail?id=' + dataItem.project_Id + '';

}



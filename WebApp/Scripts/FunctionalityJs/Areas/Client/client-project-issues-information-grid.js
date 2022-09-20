var param_Client_Id = (new URL(location.href)).searchParams.get('id');

$(function () {
   
    

});
  function loadClientProjectIssueInformationKendoGrid() {
    ajaxRequest({
        commandName: 'Client_Project_Issues_Get',
        values: {
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            Client_Id: param_Client_Id ,
            Language: _currentLanguage
        }, CallBack: loadClientProjectIssueInformationKendoGridCallBack
    });
}
var loadClientProjectIssueInformationKendoGridCallBack = function (inputDataJSON) {
     
    loadClientProjectIssueInformationKendoGridResponse(JSON.parse(inputDataJSON.Value));
}


var loadClientProjectIssueInformationKendoGridResponse = function (inputDataJSON) {
  //  console.log(inputDataJSON)
    var gridColumns = [

        { field: "issueId", title: "IssueId", hidden: true },
        { title: "#", template: "<b>#= ++record #</b>", width: 10, },

        {
            field: "projectNumber", hidden: true, title: lblProjectNo, width: 50, filterable: false
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= IssueDetailsById(this)  title=''>#=projectNumber#</a> ",
        },
        {
            field: "projectName", title: lblProject, width: 50, filterable: false
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= IssueDetailsById(this)  title=''>#=projectName#</a> ",
        },
         { field: "employeeName", title: employeeName, width: 80, filterable: false,hidden:true },

        { field: "issueDate", title: lblIssueDate, width: 20, filterable: false, template: "<span class=' '>#:issueDate#</span>" },
        { field: "dayName", title: lblDay, width: 30, filterable: false, hidden: true , template: "<span class=''>#:dayName#</span>" },
        { field: "departmentName", title: lblTransferTo , width: 30, hidden: false, filterable: false, template: "<span class=' '>#:departmentName#</span>"},
        { field: "assignORTransfer", title: lblStatus, width: 30, hidden: true, filterable: false, template: "<span class=' '>#:assignORTransfer#</span>"},
        {
            field: "status", title: lblStatus, width: 20, filterable: false
            , template: "#if (status == 'Pending')" +
                " { # <span class='badge badge-danger'>#:status#</span> # }" +
                " else if(status == 'Completed') " +
                "{# <span class='badge badge-success'>#:status#</span> # } else " +
                "{# <span class='badge badge-primary'>#:status#</span> # }#"

        },
        { field: "remarks", title: lblRemarks, width: 80, hidden: false, filterable: false, template: "<span class=' '>#:remarks#</span>"},
 

   


    ];
    bindKendoGrid('grid-client-project-issues-information', 50, gridColumns, inputDataJSON, true, 400);

};

function IssueDetailsById(e) {
    var row = $(e).closest("tr");
    var grid = $("#grid-client-project-issues-information").data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Project/Issue/Details?id=' + dataItem.issueId + '';
}

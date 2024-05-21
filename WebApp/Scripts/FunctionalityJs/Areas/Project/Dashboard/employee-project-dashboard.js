var loggedInUser = {};
$(function () {

    loggedInUser = JSON.parse(localStorage.getItem('User'));
    fnLoadProjectandSectionCount();

});



//------------- load Project  count based on employee id  by |\/|ati

function fnLoadProjectandSectionCount() {
    ajaxRequest({
        commandName: 'Project_Employee_Dashboard', values:
        {
            EmployeeId: loggedInUser.employeeId,
            UserId: loggedInUser.id,
            Role: loggedInUser.roleId,
            ProjectId: 0
            , DesignSectionId: 0
            , TechnicalSection: 0
            , SupervisionSection: 0
            , Language: _currentLanguage
        }, CallBack: fnLoadProjectandSectionCountCallBack
    });
}
var fnLoadProjectandSectionCountCallBack = function (responseJSON) {
    /*console.log(JSON.parse(responseJSON.Value)[0][0]);*/
    var header_Count_data = JSON.parse(responseJSON.Value)[0][0];

    $('.TotalProjectCount').text(header_Count_data.projectCount);
    $('.TotalTask').text(header_Count_data.total_task);
    $('.TotalNotifications').text(header_Count_data.total_notifications);
   
    loadProjectGridByEmployeeId();
}

function fnLoadSectionAllDocument(sectionName) {
    localStorage.setItem('ProjectSectionNameInDashboard', sectionName);

    $("#load-project-subsection-record-by-section-partial-view").load("/Project/Dashboard/LoadProjectSubSectionRecordBySection");


}


function loadProjectGridByEmployeeId() {


    ajaxRequest({
        commandName: 'Project_Get_By_Employee_Id', values: {
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Language: $('#Language').val()
        }, CallBack: loadProjectGridByEmployeeIdCallBack
    });

}
var loadProjectGridByEmployeeIdCallBack = function (inputDataJSON) {
    loadProjectGridByEmployeeIdbindGrid(JSON.parse(inputDataJSON.Value));
}
var loadProjectGridByEmployeeIdbindGrid = function (inputDataJSONs) {
    var record = 0;
    // console.log(inputDataJSONs);
    


        var gridColumnss = [

            { field: "id", title: "id", hidden: true }, 
            { title: "#", template: "<b>#= ++record #</b>", width: 5, }, 
            {
                field: "projectNumber", title: lblProjectNo, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" }, hidden: false }
                , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= detailProject(this)  title=''>#=projectNumber#</a> ",
            },
            {
                field: "projectName", title: lblProject, width: 200, filterable: false
            },
            { field: "clientName", title: ".clientName", width: 100, filterable: false, hidden: true },
            { field: "vipStatus", title: lblVIP, width: 50, filterable: false, hidden: true  },
            { field: "urgentStatus", title: lblUrgent, width: 80, filterable: false, hidden: true  },
            { field: "projectCreatedDate", title: lblIssueDate, width: 100, filterable: false },
            //  { field: "projectCreatedDate", title: lblIssueDate, width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
            // {
            //     field: "", title: "", width: 30
            //     , template: "#  <a style='font-size:20px;cursor:pointer;' onClick= deleteProjectById(this)  title='Delete'><span class='fa fa-trash'></span></a>    #"
            // },




        ];
        bindKendoGrid("load-project-grid-employee-by-id", 100, gridColumnss, inputDataJSONs, true, 400);
     

};

function detailProject(e) {
    var row = $(e).closest("tr");
    var grid = $("#load-project-grid-employee-by-id").data("kendoGrid");
    var dataItem = grid.dataItem(row);


    window.location.href = '/Project/Project/Detail?id=' + dataItem.id + '';
    //  window.location.href = '/Project/Project/Details?id=' + dataItem.id + '';

}
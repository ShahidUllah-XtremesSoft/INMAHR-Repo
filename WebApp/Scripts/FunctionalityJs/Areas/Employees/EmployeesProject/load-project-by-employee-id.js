
var emp_ID = 0;
$(function () {

    if (localStorage.getItem('MainApplicationModule_Id') == 2) {
        $('.project-search-icon').show();
        $('.divEmployeeProject').show();
        if (JSON.parse(localStorage.getItem('Menus'))[0].staticComment != 'Lock') { // Lock - mean to upload document first then employee will be able to see project

            setTimeout(function () {
                loadProjectGridByEmployeeId();
            }, 50);
        } else {

            $('.hide_HR_project_tabs').hide();

        }
        $('.hide_HR_project_tabs').hide();
    } else {
        $('#divEmployeeProject').hide();

    }
});





//***************************************************************************************************************************************************
//*************************************************** PROJECT LOADED BY EMPLOYEE ID ********************
//*****************************BY /\/\ati ***********

function loadProjectGridByEmployeeId() {

    emp_ID = 0;
    if ($('#EmployeeId').val() == JSON.parse(localStorage.getItem('User')).employeeId) {
        emp_ID = JSON.parse(localStorage.getItem('User')).employeeId
    } else {

        emp_ID = $('#EmployeeId').val()
    }
    ajaxRequest({
        commandName: 'Project_Get_By_Employee_Id', values: {
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: emp_ID,
            Language: $('#Language').val()
        }, CallBack: loadProjectGridByEmployeeIdCallBack
    });

}
var loadProjectGridByEmployeeIdCallBack = function (inputDataJSON) {
    loadProjectGridByEmployeeIdbindGrid(JSON.parse(inputDataJSON.Value));
}
var loadProjectGridByEmployeeIdbindGrid = function (inputDataJSONs) {
    var record = 0;
    console.log(inputDataJSONs);
    if (inputDataJSONs.length <= 0) { $('#divEmployeeProject').hide(); } else {


        var gridColumnss = [

            { field: "id", title: "id", hidden: true },
            { field: "isEmployeeExist ", title: "isEmployeeExist ", hidden: true },
            { title: "#", template: "<b>#= ++record #</b>", width: 5, },

            {
                field: "projectNumber", title: lblProjectNo, width: 20, filterable: { cell: { operator: "contains", suggestionOperator: "contains" }, hidden: false }
                , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= detailProject(this)  title=''>#=projectNumber#</a> ",
            },
            {
                field: "projectName", title: lblProject, width: 50, filterable: false
            },
            { field: "clientName", title: ".clientName", width: 50, filterable: false,hidden:true},
            { field: "vipStatus", title: lblVIP, width: 10, filterable: false },
            { field: "urgentStatus", title: lblUrgent, width: 10, filterable: false },
            { field: "projectCreatedDate", title: lblIssueDate, width: 20, filterable: false},
            //  { field: "projectCreatedDate", title: lblIssueDate, width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
            // {
            //     field: "", title: "", width: 30
            //     , template: "#  <a style='font-size:20px;cursor:pointer;' onClick= deleteProjectById(this)  title='Delete'><span class='fa fa-trash'></span></a>    #"
            // },




        ];
        bindKendoGrid("load-project-grid-employee-by-id", 100, gridColumnss, inputDataJSONs, true, 400);

    }

};

function detailProject(e) {
    var row = $(e).closest("tr");
    var grid = $("#load-project-grid-employee-by-id").data("kendoGrid");
    var dataItem = grid.dataItem(row);

    //  var check_isEmployeeExist = dataItem.isEmployeeExist;
    //   if (check_isEmployeeExist == "No") {

    //  window.location.href = '/Project/Project/Details?id=' + dataItem.id + '';
    //  } else {

    //    window.location.href = '/Project/Project/Detail?id=' + dataItem.id + '';
    //
    //  }
    if ($('#EmployeeId').val() == JSON.parse(localStorage.getItem('User')).employeeId) {
        window.location.href = '/Project/Project/Detail?id=' + dataItem.id + '';
    } else {

        window.location.href = '/Project/Project/Details?id=' + dataItem.id + '';
    }
}
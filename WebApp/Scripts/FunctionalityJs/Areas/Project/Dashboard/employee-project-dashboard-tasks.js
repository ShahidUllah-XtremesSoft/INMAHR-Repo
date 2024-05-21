var loggedInUser = '';
$(function () {

    loggedInUser = JSON.parse(localStorage.getItem('User'));
    fnLoadTaskGrid();

});




function fnLoadTaskGrid() {


    ajaxRequest({
        commandName: 'Project_Task_By_Employee_Id', values: {
            EmployeeId: loggedInUser.employeeId,
            UserId: loggedInUser.id,
            RoleId: loggedInUser.roleId,
            Language: _currentLanguage
        }, CallBack: fnLoadTaskGrid_CallBack
    });
}


var fnLoadTaskGrid_CallBack = function (inputDataJSON) {

    KendoGrid(JSON.parse(inputDataJSON.Value));


}

var KendoGrid = function (_data) {
    //console.log(_data);
    var record = 0;


    var colModel = [
        { field: "task_Id", title: "task_Id", hidden: true },
        { field: "employee_Id", title: "employee_Id", hidden: true },
        { field: "project_Id", title: "project_Id", hidden: true },
        { field: "isRead", title: "isRead", hidden: true },
        // { field: "projectName", title: lblProject, width: 170, hidden: false, filterable: false },
        {
            field: "title", width: 170, title: lblTitle,
            template: "#if(isRead == false){#<a style='cursor:pointer;text-decoration:underline;font-weight:bold;'  class='viewbutton' onClick=LoadRecordByID(this)>#=title#</a> #} else {#<a style='cursor:pointer;text-decoration:underline;'  class='viewbutton' onClick=LoadRecordByID(this)>#=title#</a>#}#",

        },


        {
            field: "priority", title: lblPriority, hidden: false, width: 80, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } },
            template: " #  if(priority.match(/Extreme.*/))" +
                " { # <label class='badge  btn-danger'>#=priority #</label># }  else if(priority.match(/High.*/))" +
                " { # <label class='badge  btn-warning'>#=priority#</label># }  else if(priority.match(/Medium.*/))" +
                " { # <label class='badge   ' style='background-color:yellow; color:black;'>#=priority#</label># } else if(priority.match(/Low.*/))" +
                " { # <label class='badge badge-success '>#=priority#</label># }  else if(priority.match(/None.*/))" +
                " { # <label class='badge   ' style='background-color:lightgray; color:black;'>#=priority#</label># } #"
        },
        { field: "completionDate_new", title: lblCompletionDate, width: 150, filterable: false },
        { field: "status", title: lblStatus, width: 80, filterable: false },
    ];

    bindHeiraricalkendoGrid('load-tasks-grid-employee-by-id', 50, colModel, _data, 378);
};

var globalNestedGridE = '';
function loadChildGridData(e) {

    globalNestedGridE = e;
    ajaxRequest({
        commandName: 'Project_Task_Details_By_Employee_Id', values: {
            task_Id: e.data.task_Id,
            Language: $('#Language').val()
        }, CallBack: loadChilddata
    });

}


var loadChilddata = function (d) {
    detailInit_(JSON.parse(d.Value));
}
function detailInit_(response) {

    var responNew = [];
    for (var i = 0; i < response.length; i++) {
        responNew.push(
            {
                "project_Task_Multiple_Id": response[i].project_Task_Multiple_Id,
                "task_Id": response[i].task_Id,
                "setup_Sub_Section_Id": response[i].setup_Sub_Section_Id,
                "completionDate_new": response[i].completionDate_new,
                "taskName": response[i].taskName,
                "percentage": response[i].percentage,
                "defaultValidity_In_Month": response[i].defaultValidity_In_Month


            });
    }

    $("<div id='Nextedgrid' style='border-color:red;' />").appendTo(globalNestedGridE.detailCell).kendoGrid({
        dataSource: {
            data: responNew,
        },
        //sortable: {
        //    mode: "multiple"//,
        //    //  allowUnsort: true
        //},

        sortable: true,
        //  pageSize: 50,
        //  pageable: true,
        filterable: { mode: "row" },
        scrollable: false,
        selectable: true,
        //pageable: {
        //    pageSizes: [50, 100, 250, 500, 1000],
        //    width: 20,
        //},

        columns: [
            { field: "project_Task_Multiple_Id", title: "project_Task_Multiple_Id", filterable: false, hidden: true },
            { field: "task_Id", title: "task_Id", filterable: false, hidden: true },
            { field: "status", title: "status", filterable: false, hidden: true },
            { field: "setup_Sub_Section_Id", title: "setup_Sub_Section_Id", filterable: false, hidden: true },
            {
            //    field: "taskName", title: lblTask, width: "8%", filterable: { cell: { operator: "contains", suggestionOperator: "contains" } },
                field: "taskName", title: lblTask, width: "8%", filterable: false  ,
             //   template: " #  if(status == '') { # <label style='text-decoration:line-through' class='badge  btn-danger'>#=taskName #</label># } #"
            },
            { field: "completionDate_new", title: lblCompletionDate, width: "5%", filterable: false },
            { field: "percentage", title: "percentage", width: "8%", filterable: false, hidden: true },
            { field: "defaultValidity_In_Month", title: "defaultValidity_In_Month", width: "8%", filterable: false, hidden: true },



        ]
    });

}

$('#collapse').click(function (e) {
    var grid = $("#load-tasks-grid-employee-by-id").data("kendoGrid");
    $(".k-master-row").each(function (index) {
        grid.collapseRow(this);
    });
});

function LoadRecordByID(e) {
    var row = $(e).closest("tr");
    var grid = $("#load-tasks-grid-employee-by-id").data("kendoGrid");
    var dataItem = grid.dataItem(row);
     
    if (dataItem.isRead == false) {

        ajaxRequest({
            commandName: 'Project_Task_Seen_Status_Update_By_Employee_Id', values: {
                task_Id: dataItem.task_Id
            }, CallBack: ''
        });
    }

    window.location.href = '/Project/Task/Details?id=' + dataItem.task_Id + '';

}


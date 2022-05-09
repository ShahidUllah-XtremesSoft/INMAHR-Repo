var param_Client_Id = (new URL(location.href)).searchParams.get('id');

$(function () {
   
    

});
  function loadClientMeetingInformationKendoGrid() {
    ajaxRequest({
        commandName: 'Client_Project_Meeting_Get',
        values: {
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            Client_Id: param_Client_Id ,
            Language: _currentLanguage
        }, CallBack: loadClientMeetingInformationKendoGridCallBack
    });
}
var loadClientMeetingInformationKendoGridCallBack = function (inputDataJSON) {
     
    loadClientMeetingInformationKendoGridResponse(JSON.parse(inputDataJSON.Value));
}


var loadClientMeetingInformationKendoGridResponse = function (inputDataJSON) {
    console.log(inputDataJSON)
    var gridColumns = [

        { field: "meetingId", title: "meetingId", hidden: true },
        { title: "#", template: "<b>#= ++record #</b>", width: 10, },

        {
            field: "projectNumber", hidden:true,title: "ProjectNumber", width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" }  }
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= meetingDetailsById(this)  title=''>#=projectNumber#</a> ",
        },
        {
            field: "projectName", title: "project", width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= meetingDetailsById(this)  title=''>#=projectName#</a> ",
        },
        //{
        //    field: "projectName", title: "projectName", width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        //    //, template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= meetingDetailsById(this)  title='Project Name'>#=projectName#</a> ",
        //},
        { field: "employeeName", title: "Employee", width: 80, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },

        { field: "dayName", title: "day", width: 30, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }, template: "<span class='badge badge-info'>#:dayName#</span>" },
        { field: "startedTimeFormated", title: "startedTimeFormated", width: 30, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }, template: "<span class='badge badge-success'>#:startedTimeFormated#</span>" },
        { field: "endedTimeFormated", title: "endedTimeFormated", width: 30, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }, template: "<span class='badge badge-danger'>#:endedTimeFormated#</span>" },
        { field: "meetingDate", title: "MeetingDate", width: 30, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }, template: "<span class='badge badge-danger'>#:meetingDate#</span>" },
        { field: "status", title: "status", width: 30, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }, template: "<span class='badge badge-info'>#:status#</span>"},
        
        //{
        //    field: "",
        //    width: 10,
        //    title: ' ',

        //    template:
        //        //"<a style='cursor:pointer; font-size:20px;' onClick= meetingDetailsById(this) title='View Project Detail' ><span class='fa fa-eye'></span></a>" +
        //        " <a style='font-size:20px;cursor:pointer;' onClick= editProject(this) title='Edit Project' ><span class='fa fa-pencil'></span></a> " +
        //        " <a style='font-size:20px;cursor:pointer;' onClick= deleteProjectById(this)  title='Delete Project'><span class='fa fa-trash'></span></a>  "
        //},
      


   


    ];
    bindKendoGrid('grid-client-meeting-information', 50, gridColumns, inputDataJSON, true, 400);

};

function meetingDetailsById(e) {
    var row = $(e).closest("tr");
    var grid = $("#grid-client-meeting-information").data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Project/Meeting/Details?id=' + dataItem.meetingId + '';
}

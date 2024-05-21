var param_Client_Id = (new URL(location.href)).searchParams.get('id');

$(function () {



});
function loadClientProjectInformationKendoGrid() {
    ajaxRequest({
        commandName: 'Client_Project_Get',
        values: {
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            Client_Id: param_Client_Id,
            Language: _currentLanguage
        }, CallBack: loadClientProjectInformationKendoGridCallBack
    });
}
var loadClientProjectInformationKendoGridCallBack = function (inputDataJSON) {

    loadClientProjectInformationKendoGridResponse(JSON.parse(inputDataJSON.Value));
}


var loadClientProjectInformationKendoGridResponse = function (inputDataJSON) {
    //   console.log(inputDataJSON)
    
    var gridColumns = [

        { field: "id", title: "id", hidden: true },
        { title: "#", template: "<b>#= ++record #</b>", width: 10, },

        {
            field: "projectNumber", title: lblProjectNo, width: 50, filterable: false
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= detailProject(this)  title=''>#=projectNumber#</a> ",
        },
        {
            field: "projectName", title: lblProject, width: 100, filterable: false
            //, template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= detailProject(this)  title='Project Name'>#=projectName#</a> ",
        },
        { field: "projectStartDate", title: lblStartDate, width: 50, filterable: false, template: "<span class=''>#:projectStartDate#</span>" },
        { field: "projectEndDate", title: lblEndDate, width: 50, filterable: false, template: "<span class=''>#:projectEndDate#</span>", hidden: true },
        { field: "urgentStatus", title: lblUrgent, width: 50, filterable: false, template: "<span class=''>#:urgentStatus#</span>" },
        { field: "vipStatus", title: lblVIP, width: 50, filterable: false, template: "<span class=''>#:vipStatus#</span>" },
        { field: "progressStatus", title: lblProjectStatus, width: 50, filterable: false, template: "<span class=''>#:progressStatus#</span>" },
        //{
        //    field: "",
        //    width: 10,
        //    title: ' ',

        //    template:
        //        //"<a style='cursor:pointer; font-size:20px;' onClick= detailProject(this) title='View Project Detail' ><span class='fa fa-eye'></span></a>" +
        //        " <a style='font-size:20px;cursor:pointer;' onClick= editProject(this) title='Edit Project' ><span class='fa fa-pencil'></span></a> " +
        //        " <a style='font-size:20px;cursor:pointer;' onClick= deleteProjectById(this)  title='Delete Project'><span class='fa fa-trash'></span></a>  "
        //},



    ];
    bindKendoGrid('grid-client-project-information', 50, gridColumns, inputDataJSON, true, 400);

};

function detailProject(e) {
    var row = $(e).closest("tr");
    var grid = $("#grid-client-project-information").data("kendoGrid");
    var dataItem = grid.dataItem(row);
    //window.location.href = '/Project/Project/Details?id=' + dataItem.id + '';
    window.location.href = '/Project/Project/Detail?id=' + dataItem.id + '';
}

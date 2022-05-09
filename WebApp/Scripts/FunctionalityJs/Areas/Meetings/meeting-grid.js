var $grid = "meeting-grid", requestFrom = '';

$(function () {

    $('#Language').val(_currentLanguage);
    loadGrid();


});





function loadGrid() {
    ajaxRequest({
        commandName: 'Meeting_Get', values: {
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Language: $('#Language').val()
        }, CallBack: loadGridCallBack
    });

}
var loadGridCallBack = function (inputDataJSON) {
    bindGrid(JSON.parse(inputDataJSON.Value));
}
var bindGrid = function (inputDataJSON) {
    var record = 0;



    var gridColumns = [

        { field: "meetingId", title: "meetingId", hidden: true },
        { field: "projectId", title: "ProjectId", hidden: true },
        { field: "employeeId", title: "EmployeeId", hidden: true },
        { field: "clientId", title: "ClientId", hidden: true },
        { title: "#", template: "<b>#= ++record #</b>", width: 5, },

        {
            field: "projectNumber", title: "ProjectNumber", width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fnDetailById(this)  title=''>#=projectNumber#</a> ",
        },
        { field: "employeeName", title: "Employee", width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "startedTimeFormated", title: "StartedTime", width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "endedTimeFormated", title: "EndedTime", width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "startedTime", title: "StartedTime", width: 50, hidden: true, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "endedTime", title: "EndedTime", width: 50, hidden: true, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        {
            field: "",width: 10,title: ' ',
            template:
                //"<a style='cursor:pointer; font-size:20px;' onClick= detailClient(this) title='View Client Detail' ><span class='fa fa-eye'></span></a>" +
                " <a style='font-size:20px;cursor:pointer;' onClick= fneditById(this) title='Edit' ><span class='fa fa-pencil'></span></a> " +
                " <a style='font-size:20px;cursor:pointer;' onClick= fndeleteById(this)  title='Delete'><span class='fa fa-trash'></span></a>  "
        },



    ];

    bindKendoGrid($grid, 100, gridColumns, inputDataJSON, true, 750);
};

function fneditById(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Project/Meeting/Save?id=' + dataItem.meetingId + '';
}

function fnDetailById(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Project/Meeting/Details?id=' + dataItem.meetingId + '';
}


function fndeleteById(event) {

    var row = $(event).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    Swal.fire({

        title: areYouSureTitle,
        text: doYouReallyWantToDeletThisRecord,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#5cb85c',
        cancelButtonColor: '#d9534f',
        confirmButtonText: btnYesText,
        cancelButtonText: btnNoText,
        buttons: {
            cancel: {
                text: "No",
                value: null,
                visible: true,
                className: "btn btn-danger",
                closeModal: true
            },
            confirm: {
                text: "Yes",
                value: true,
                visible: true,
                className: "btn btn-warning",
                closeModal: true
            }
        }
    }).then(function (restult) {
        if (restult.value) {
            ajaxRequest({ commandName: 'Meeting_Delete', values: { Id: dataItem.meetingId, UserId: JSON.parse(localStorage.getItem('User')).id, Language: $('#Language').val() }, CallBack: deleteByIdCallBack });
        }
    });
    var deleteByIdCallBack = function (response) {
        swal(response.Value);
        loadGrid();
    }

}

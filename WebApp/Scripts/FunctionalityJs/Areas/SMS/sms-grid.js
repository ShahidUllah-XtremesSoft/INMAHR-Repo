var $grid = "sms-grid", requestFrom = '';

$(function () {
    $('#Language').val(_currentLanguage);
    loadGrid();
});





function loadGrid() {
    ajaxRequest({
        commandName: 'SMS_GetAll', values: {            
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

        { field: "id", title: "id", hidden: true },
        { field: "project_Id", title: "ProjectId", hidden: true },
        { field: "client_Id", title: "ClientId", hidden: true },
        
        { title: "#", template: "<b>#= ++record #</b>", width: 5, },
        { field: "empName", title: "Receiver Name", hidden: true, width: 70 },
        { field: "clientName", title: "Receiver Name", hidden: false, width: 70 },
        { field: "title", title: "Title", hidden: false,width:50 },        
        { field: "description", title: "Description", hidden: false,width:100 },
        { field: "sendDate", title: "Date", hidden: false,width:25 },
        { field: "client", title: "Client", hidden: false,width:50 },
        { field: "project", title: "Project", hidden: false,width:50 },
        
        //{
        //    field: "", width: 10, title: ' ',
        //    template:
        //        //"<a style='cursor:pointer; font-size:20px;' onClick= detailClient(this) title='View Client Detail' ><span class='fa fa-eye'></span></a>" +
        //        " <a style='font-size:20px;cursor:pointer;' onClick= fneditById(this) title=" + lblEdit + " ><span class='fa fa-pencil'></span></a> " +
        //        " <a style='font-size:20px;cursor:pointer;' onClick= fndeleteById(this)  title=" + lblDelete + "><span class='fa fa-trash'></span></a>  "
        //},



    ];

    bindKendoGrid($grid, 100, gridColumns, inputDataJSON, true, 750);
};

function fneditById(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Project/Issue/Save?id=' + dataItem.issueId + '';
}

function fnDetailById(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Project/Issue/Details?id=' + dataItem.issueId + '';
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
            ajaxRequest({ commandName: 'issue_Delete', values: { Id: dataItem.issueId, UserId: JSON.parse(localStorage.getItem('User')).id, Language: $('#Language').val() }, CallBack: deleteByIdCallBack });
        }
    });
    var deleteByIdCallBack = function (response) {
        swal(response.Value);
        loadGrid();
    }

}

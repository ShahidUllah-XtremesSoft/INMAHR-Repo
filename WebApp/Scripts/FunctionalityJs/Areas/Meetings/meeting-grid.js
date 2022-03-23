var $grid = "meeting-grid", requestFrom = '';

$(function () {

   // requestFrom = (new URL(location.href)).searchParams.get('from');
    $('#Language').val(_currentLanguage);
    loadClientGrid();
 

});
 




function loadClientGrid() {
    ajaxRequest({
        commandName: 'Client_Get', values: {
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Language: $('#Language').val()
        }, CallBack: loadClientGridCallBack
    });

}
var loadClientGridCallBack = function (inputDataJSON) {
    bindGrid(JSON.parse(inputDataJSON.Value));
}
var bindGrid = function (inputDataJSON) {
    var record = 0;



    var gridColumns = [

        { field: "id", title: "id", hidden: true },
        { field: "nationality_Id", title: "Nationality_Id", hidden: true },
        { field: "city_Id", title: "City_Id", hidden: true },
        { title: "#", template: "<b>#= ++record #</b>", width: 5, },

        {
            field: "clientName", title: "ClientName", width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= detailClient(this)  title='Client Name'>#=clientName#</a> ",
        },
        { field: "clientEmails", title: "ClientEmails", width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "clientPhoneNumbers", title: "ClientPhoneNumbers", width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        {
            field: "",
            width: 10,
            title: ' ',
           
            template:
                //"<a style='cursor:pointer; font-size:20px;' onClick= detailClient(this) title='View Client Detail' ><span class='fa fa-eye'></span></a>" +
                " <a style='font-size:20px;cursor:pointer;' onClick= editClient(this) title='Edit Client' ><span class='fa fa-pencil'></span></a> " +
                " <a style='font-size:20px;cursor:pointer;' onClick= deleteClientById(this)  title='Delete Client'><span class='fa fa-trash'></span></a>  "
        },



    ];

    bindKendoGrid($grid, 100, gridColumns, inputDataJSON, true, 750);
};
 
function editClient(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Project/Client/Save?id=' + dataItem.id + '';
}

function detailClient(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
     window.location.href = '/Project/Client/Details?id=' + dataItem.id + ''; 
}
 

function deleteClientById(event) {

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
            ajaxRequest({ commandName: 'Client_Delete', values: { Id: dataItem.id, UserId: JSON.parse(localStorage.getItem('User')).id, Language: $('#Language').val() }, CallBack: deleteByIdCallBack });
        }
    });
    var deleteByIdCallBack = function (response) {          
        swal(response.Value);         
        loadClientGrid();
    }

}
 
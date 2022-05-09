var $grid = "contractor-grid", requestFrom = '';

$(function () {

   // requestFrom = (new URL(location.href)).searchParams.get('from');
    $('#Language').val(_currentLanguage);
    loadContractorGrid();
 

});
 




function loadContractorGrid() {
    ajaxRequest({
        commandName: 'Contractor_Get', values: {
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Language: $('#Language').val()
        }, CallBack: loadContractorGridCallBack
    });

}
var loadContractorGridCallBack = function (inputDataJSON) {
    bindGrid(JSON.parse(inputDataJSON.Value));
}
var bindGrid = function (inputDataJSON) {
    var record = 0;



    var gridColumns = [

        { field: "id", title: "id", hidden: true },
        { title: "#", template: "<b>#= ++record #</b>", width: 5, },
        {
            field: "currentFileName",
            title: ".Photo",
            hidden: false,
            width: 20,
            filterable: false,
            template: " #  if (currentFileName == null )" +
              //  " { #  <label class='pcoded-badge label label-danger'>No Attachment</label># } else" +
                " {# <img class='' src='/Content/Images/user.jpg' style='width:30%' /> #} else" +
                " { # <a  target='_blank' href='/UploadFile/#=currentFileName #'>  <img class='' src='/UploadFile/#=currentFileName#' style='width:30%' /></a> #} #" 
                
        },
        {
            field: "contractorName", title: ".Name", width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            //, template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= detailContractor(this)  title='Contractor Name'>#=contractorName#</a> ",
        },
        { field: "email", title: ".email", width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "phoneNumber", title: ".Phone No", width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        {
            field: "",
            width: 10,
            title: ' ',
           
            template:
                //"<a style='cursor:pointer; font-size:20px;' onClick= detailContractor(this) title='View Contractor Detail' ><span class='fa fa-eye'></span></a>" +
                " <a style='font-size:20px;cursor:pointer;' onClick= editContractor(this) title='Edit Contractor' ><span class='fa fa-pencil'></span></a> " +
                " <a style='font-size:20px;cursor:pointer;' onClick= deleteContractorById(this)  title='Delete Contractor'><span class='fa fa-trash'></span></a>  "
        },



    ];

    bindKendoGrid($grid, 100, gridColumns, inputDataJSON, true, 750);
};
 
function editContractor(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Project/Contractor/Save?id=' + dataItem.id + '';
}

function detailContractor(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
     window.location.href = '/Project/Contractor/Details?id=' + dataItem.id + ''; 
}
 

function deleteContractorById(event) {

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
            ajaxRequest({ commandName: 'Contractor_Delete', values: { Id: dataItem.id, UserId: JSON.parse(localStorage.getItem('User')).id, Language: $('#Language').val() }, CallBack: deleteByIdCallBack });
        }
    });
    var deleteByIdCallBack = function (response) {          
        swal(response.Value);         
        loadContractorGrid();
    }

}
 
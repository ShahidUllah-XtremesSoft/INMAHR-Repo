var $grid = "employee-resigned-grid";
$(function () { 
 
    $('#Language').val(_currentLanguage);
    loadEmployeeGrid();
 
 
});


function loadEmployeeGrid() {
    ajaxRequest({ commandName: 'HR_Employee_Resigned_GetAll_ForGrid', values: { LoggedInUser: JSON.parse(localStorage.getItem('User')).id, RoleId: JSON.parse(localStorage.getItem('User')).roleId, Language: $('#Language').val() }, CallBack: loadEmployeeGridCallBack });
}
var loadEmployeeGridCallBack = function (inputDataJSON) {
    bindEmployeeGrid(JSON.parse(inputDataJSON.Value));
}
var bindEmployeeGrid = function (inputDataJSON) {
    var record = 0;


    for (var i = 0; i < inputDataJSON.length; i++) {
        if (inputDataJSON[i].childParent == null) {

            inputDataJSON[i].childParent = inputDataJSON[i].companyName

        } else {
            inputDataJSON[i].companyName = inputDataJSON[i].childParent

        }
    }

     
    var gridColumns = [

        { field: "id", title: "id", hidden: true },

        { title: "#", template: "<b>#= ++record #</b>", width: 20, },
         {
            field: "employeeNumber", title: employeeNumber, width: 40, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } },
            template: "<a style='cursor:pointer;text-decoration:underline;'  class='viewbutton' onClick= redirectToEmployeeDetailView(this)  title='Employee Number'>#=employeeNumber#</a> ",
 
        },
         {
            field: "employeeName", title: employeeName, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        {
            field: "department", title: department, width: 100, filterable: false
        },
        { field: "phoneNumber", title: phone, width: 50, filterable: false },
        { field: "email", title: email, width: 100, hidden: true, filterable: false },
        { field: "joinDate", title: joinDate, width: 50, filterable:false },
        { field: "professionId", title: "Profession", width: 100, filterable: false, hidden: true },
        { field: "profession", title: profession, width: 100, filterable: false },
        {
            field: "companyName", title: lblCompany, width: 100, filterable: true,
 
        },
        { field: "passportNumber", title: PassportNumber, width: 100, filterable: false, hidden: true },
        { field: "eidNumber", title: eidNumber, width: 100, filterable: false, hidden: true },
         
        {
            field: "", width: 40,
            title: ' ',
            hidden: true,
            template: 
                    "  <a style='font-size:20px;cursor:pointer;' onClick= editEmployee(this) title='Edit Employee' ><span class='fa fa-pencil'></span></a>  " +
                    "  <a style='font-size:20px;cursor:pointer;' onClick= deleteEmployeeById(this)  title='Delete Employee'><span class='fa fa-trash'></span></a>  "
        },

    ];

    bindKendoGrid($grid, 100, gridColumns, inputDataJSON, true, 750); 
};
function redirectToEmployeeDetailView(e) {

    var row = $(e).closest("tr");
    var grid = $("#employee-resigned-grid").data("kendoGrid");
    var dataItem = grid.dataItem(row);
    localStorage.setItem('EmployeeNumber', dataItem.employeeNumber);
    localStorage.setItem('LoggedInEmployeeId', dataItem.id);
    localStorage.setItem('EmployeeIdToLoadLeaveBalance', dataItem.id);
     
        window.location.href = '/HumanResource/Employee/Detail';
    
   


}
 
/*
 function editEmployee(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/HumanResource/Employee/Edit?id=' + dataItem.id + '';
}

function viewDetailEmployee(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/HumanResource/Employee/View?id=' + dataItem.id + '';
}

 
function deleteEmployeeById(event) {

    var row = $(event).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    Swal.fire({
         title: areYouSureTitle,
        text: doYouReallyWantToDeletThisRecord,
        //input: 'text',
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
            ajaxRequest({ commandName: 'HR_Employee_Delete', values: { Id: dataItem.id, Language: $('#Language').val() }, CallBack: deleteEmployeeByIdCallBack });
        }
    });
    var deleteEmployeeByIdCallBack = function (response) {
        swal(response.Value);
        loadEmployeeGrid();
    }

}
 
  */
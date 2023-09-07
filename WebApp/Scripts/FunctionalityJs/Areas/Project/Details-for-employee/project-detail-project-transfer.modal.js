
 


//***************** FN ASSIGN   AREA START---------------------------BY |\/|ati
function fn_open_project_assign_modal(event) { 
    //project_Id = project_Id;
    $('#load-project-assign-model').click();
    setTimeout(function () {
        loadAllEmployees_in_Project();
    }, 150);

}
function fn_Load_Project_Employees_Area(e) {


    var areaname = e.value;
    $('.checkbtnValue_Project').removeClass('active')
    $(e).addClass('active')


    if (areaname == 'Available Employee') {

        //$("#div-project-section-employees-area").load("/Project/Project/LoadAllEmployeess");
        $('#div-project-section-employees-area').show();
        $('.div-project-section-assigned-employees-area').hide();

        setTimeout(function () {
            loadAllEmployees_in_Project();

        }, 150);
    } else if (areaname == 'Assigned Employee') {


        setTimeout(function () {
            fnloadAssignedEmployees_ProjectSection(0);
        }, 150);
        $('.div-project-section-assigned-employees-area').show();
        $('#div-project-section-employees-area').hide();

    }
}
// --------------------- LOAD ALL EMPLOYEES START----------------------BY |\/|ati
function loadAllEmployees_in_Project() {

    ajaxRequest({
        commandName: 'Project_Transfer_To_Employee',
        values: {
            Project_Id: project_Id,
            EmployeeDepartmentId: JSON.parse(localStorage.User).employeeDepartmentId,
            Language: _currentLanguage
        }, CallBack: loadAllEmployees_in_ProjectCallBack
    });
}

var loadAllEmployees_in_ProjectCallBack = function (inputDataJSON) {


    var gridColumns = [

        { title: "#", template: "<b>#= ++record #</b>", width: 15 },
        { field: "id", title: "id", width: 10, hidden: true },
        {
            field: "employeeNumber", title: employeeNumber, width: 50, hidden: false, filterable: false
        },
        { field: "empName", title: employeeName, width: 100, filterable: false },
        { field: "professionName", title: lblProfessionName, width: 100, filterable: false },
        {
            headerTemplate: "<input type='checkbox' id='checkAll'  class='k-checkbox header-checkbox'>",
            template: function (dataItem) {
                if (dataItem.isAssigned == 1) {
                    return "<div><input type='checkbox' class='k-checkbox row-checkbox' id='target' checked ></div>";
                }
                else {
                    return "<div><input type='checkbox' class='k-checkbox row-checkbox' id='target' unchecked='true'></div>";
                }
            },
            width: 15
        },

    ];

    bindKendoGrid('grid-project-load-all-employees', 100, gridColumns, JSON.parse(inputDataJSON.Value), true, 550);
    $('#checkAll').show();
};
$(document).on("click", "#checkAll", function () {
    if (this.checked) {

        $("#grid-project-load-all-employees tbody input:checkbox").attr("checked", true);
    } else {
        $("#grid-project-load-all-employees tbody input:checkbox").attr("checked", false);


    }
});

$('#projectDetail_btnSave_ProjectSection').click(function (e) {

    loopThrough_Project_Section(this.value, 'projectDetail_btnSave_ProjectSection', 'save');

});

function loopThrough_Project_Section(btnValue, btnId, btnIcon) {

    var grid = $("#grid-project-load-all-employees").data("kendoGrid");

    var gridd = grid.dataSource._data;
    var postingArray = [];
    for (var i = 0; i < gridd.length; i++) {
        var isAssigned = grid.tbody.find("tr:eq(" + i + ")").find('.row-checkbox').is(':checked');

        var gridRow = gridd[i];
        if (isAssigned == true) {
            postingArray.push(
                {

                    //--------- Grid Data-------------
                    Id: 0,
                    Project_Id: project_Id,
                    HR_Employee_Id: parseInt(gridRow.id),
                    Section_Entity_Id: $('#Project_assignedModal_setup_type_Id').val(),
                    Sub_Section_Entity_Id: $('#Project_assignedModal_setup_type_detail_Id').val(),
                    CreatedBy: parseInt(JSON.parse(localStorage.getItem('User')).id),
                    LoggedIn_EmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,

                });
        }

    }
    if (postingArray.length > 0) {
        // console.log(postingArray);

        ajaxRequest({
            commandName: 'Project_Send_To_Multiple_Employees_By_SectionHead',
            values:
            {
                ProjectModel: postingArray,
                CreatedBy: JSON.parse(localStorage.getItem('User')).id,
                Language: _currentLanguage == null ? '' : _currentLanguage
            }, CallBack: fn_project_save_Multiple_employee_callback
        });


    } else {
        swalMessage('info', lblFristSelectRecordFromGrid, 1500);
        return 0;
    }
}
var fn_project_save_Multiple_employee_callback = function (response) {
    swal(response.Value);
    loadAllEmployees_in_Project($('#Project_assignedModal_setup_type_detail_Id').val(), $('#Project_assignedModal_setup_type_Id').val());
    //| Date Picker
    renderKendoDateAndTimePickerWithNewFormat('DesignSection_AssignedDocument_StartDate');
    renderKendoDateAndTimePickerWithNewFormat('DesignSection_AssignedDocument_CompletionDate');
    //|End Date Picker
}

// --------------------- LOAD ALL EMPLOYEES END----------------------BY |\/|ati


function fnloadAssignedEmployees_ProjectSection(setup_TypeDetail_Id) {


    ajaxRequest({
        commandName: 'Project_Linked_Multiple_Employees_GetBy_Project_and_DepartmentId',
        values: {
            Project_Id: project_Id,
            LoggedInEmployeeId: JSON.parse(localStorage.User).employeeId,
            EmployeeDepartmentId: JSON.parse(localStorage.User).employeeDepartmentId,
            Language: _currentLanguage
        }, CallBack: fnloadAssignedEmployees_ProjectSectionCallBack
    });
}
var fnloadAssignedEmployees_ProjectSectionCallBack = function (inputDataJSON) {


    var gridColumns = [

        { title: "#", template: "<b>#= ++record #</b>", width: 15 },
        { field: "id", title: "id", width: 10, hidden: true },
        {
            field: "employeeNumber", title: employeeNumber, width: 50, hidden: false, filterable: false
            //    , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fnLoadDetailScreen(this)  '>#=document#</a> ",
        },
        { field: "empName", title: employeeName, width: 100, filterable: false },
        /*{ field: "setup_type_detail_name", title: lblAssignedSubSection, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },*/
        {
            field: "", width: 15, title: ' ',
            template: " <a style='font-size:20px;cursor:pointer;' onClick= deleteAssignedEmployeeById_ProjectSection(this)  title=" + lblDelete + "><span class='fa fa-trash'></span></a>  "
        },
    ];

    bindKendoGrid('grid-load-project-all-assigned-employees', 100, gridColumns, JSON.parse(inputDataJSON.Value), true, 550);
    $('#checkAll').hide();
};


function deleteAssignedEmployeeById_ProjectSection(event) {

    var row = $(event).closest("tr");
    var grid = $("#grid-load-project-all-assigned-employees").data("kendoGrid");
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
            ajaxRequest({ commandName: 'Project_Linked_Multiple_Employees_Delete_By_Id', values: { Id: dataItem.id, UserId: JSON.parse(localStorage.getItem('User')).id, Language: _currentLanguage }, CallBack: deleteAssignedEmployeeById_ProjectSection_Callback });
        }
    });
    var deleteAssignedEmployeeById_ProjectSection_Callback = function (response) {
        swal(response.Value);
        fnloadAssignedEmployees_ProjectSection($('#Project_assignedModal_setup_type_detail_Id').val());

    }

}

//----------------------------------- SEND PROJECT TO EMPLOYEES FLOW ENDED

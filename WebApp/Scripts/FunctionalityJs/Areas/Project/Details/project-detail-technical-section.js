/*
$(function () {
    $("#technical_section_progressBar").kendoProgressBar({
        min: 0, max: 0,
        type: "percent",
        animation: {
            duration: 10 
        }
        //  change: onChange,
        // complete: onComplete
    });
});
*/

var project_Id = (new URL(location.href)).searchParams.get('id');
/*

************LOAD TECHNICAL SECTION SUB STEPPER ********************* By /\/\ati

*/


function loadProject_TechnicalSectiondownList(technicalSection_callingArea) {
    ajaxRequest({ commandName: 'STEPPER_SUB_SECTION_MENU', values: { ParentType: 'TechnicalSection', Project_Id: project_Id, Language: _currentLanguage }, CallBack: fnloadProject_TechnicalSectiondownListCallBack });
    localStorage.setItem('TechnicalSection_Menu_Area', technicalSection_callingArea);

}
function fnloadProject_TechnicalSectiondownListCallBack(response) { stepper_TECHNICAL_SECTION(response) }

function stepper_TECHNICAL_SECTION(response) {


    var step_Columns = []

    for (var i = 0; i < JSON.parse(response.Value).length; i++) {

        //************************ CHANGE COLOR OF MAIN STEPPER MENU BY /\/\ati 
        if (JSON.parse(response.Value)[i].parent_Type == 'DesignSection' && JSON.parse(response.Value)[i].project_sub_stepper_menu_error == true) {
            error_PROJECT_MAIN_SECTION_Design_Stepper = true;

        } else if (JSON.parse(response.Value)[i].parent_Type == 'TechnicalSection' && JSON.parse(response.Value)[i].project_sub_stepper_menu_error == true) {
            error_PROJECT_MAIN_SECTION_Technical_Stepper = true;
        } else if (JSON.parse(response.Value)[i].parent_Type == 'SupervisionSection' && JSON.parse(response.Value)[i].project_sub_stepper_menu_error == true) {
            error_PROJECT_MAIN_SECTION_Supervision_Stepper = true;
        }


        step_Columns.push({
            Id: JSON.parse(response.Value)[i].id,
            label: JSON.parse(response.Value)[i].name,
            error: JSON.parse(response.Value)[i].project_sub_stepper_menu_error,
            enabled: JSON.parse(response.Value)[i].project_sub_stepper_menu_enabled,
            selected: JSON.parse(response.Value)[i].project_sub_stepper_menu_selected,
            // successIcon: JSON.parse(response.Value)[i].project_sub_stepper_menu_successIcon,
        });

        if (JSON.parse(response.Value)[i].project_sub_stepper_menu_successIcon == 'check') {
            step_Columns.push({ label: "Completed", enabled: false, selected: true, successIcon: "k-icon k-i-check", iconTemplate: function (e) { return '<strong> </strong>'; } });
        }
    }
     
    setTimeout(function () {

        if (localStorage.getItem('TechnicalSection_Menu_Area') != '') {

            progressbar_subSection(JSON.parse(response.Value), localStorage.getItem('TechnicalSection_Menu_Area'));
        }
    }, 100)

    bindkendoStepper('technical-section-stepper', false, step_Columns, '', stepper_Fn_TechnicalSection_Onselect, 'auto', "vertical");
}
function stepper_Fn_TechnicalSection_Onselect(e) {

    var stepper_data = e.step.options;
    //e.step.element 
    fnCheckProject_SubSection_Tab(stepper_data.label, stepper_data.Id);



}

/*
 
************LOAD TECHNICAL SECTION SUB STEPPER END ********************* By /\/\ati
 
*/

function fnLoadTechnicalSection_Document(project_Id, Setup_Type_Id, grid_Id) {
    ajaxRequest({
        commandName: 'Project_TechnicalSection_Document_GetById', values: { Project_Id: project_Id, Setup_Type_Id: Setup_Type_Id, Language: _currentLanguage }, CallBack: fnLoadTechnicalSection_Document_CallBacck
    });

    localStorage.setItem('grid_id', grid_Id);
}

var fnLoadTechnicalSection_Document_CallBacck = function (inputDataJSON) {
    var pass_GridName = localStorage.getItem('grid_id');


    if (pass_GridName != "") {

        var gridTemplate = '';
        gridTemplate = "<button type='button' onclick='fn_technical_section_transfer_file(this);' data-grid-name=" + pass_GridName + " class='btn-sm btn btn-info    waves-effect'style='font-size: small;'>Transfer</button>";



        var gridColumns = [
            { field: "entityId", title: "EntityId", hidden: true, width: 20 },
            { field: "entityType", title: "EntityType", hidden: true, width: 20 },
            { field: "documentType", title: "DocumentType", hidden: true, width: 20 },
            { field: "setup_Type_Id", title: "setup_Type_Id", hidden: true, width: 20 },
            { field: "setup_TypeDetail_Id", title: "setup_TypeDetail_Id", hidden: true, width: 20 },
            { field: "attachmentId", title: "attachmentId", hidden: true, width: 20 },
            { title: "#", template: "<b>#= ++record #</b>", width: 10, },
            {
                field: "currentFileName",
                title: lblDocumentAttachment,
                hidden: false,
                width: 20,
                filterable: false,
                template: " #  if (currentFileName == null )" +
                    " { # <label class='pcoded-badge label label-danger'>No Attachment</label># }        else if(currentFileName.split('.')[1]=='pdf')" +
                    " { #  <a  target='_blank' href='/UploadFile/#=currentFileName #'> <img class='' src='/Content/Images/pdf.png'        style='width:100%;cursor: pointer;'/> </a># }else if(currentFileName.split('.')[1]=='xlsx')" +
                    " { #  <a  target='_blank' href='/UploadFile/#=currentFileName #'> <img class='' src='/Content/Images/xls.png'        style='width:100%;cursor: pointer;'/> </a># }else if(currentFileName.split('.')[1]=='docs' || currentFileName.split('.')[1]=='docx'|| currentFileName.split('.')[1]=='doc')" +
                    " { #  <a  target='_blank' href='/UploadFile/#=currentFileName #'> <img class='' src='/Content/Images/docx.png'       style='width:100%;cursor: pointer;'/> </a># } else" +
                    " { # <a  target='_blank' href='/UploadFile/#=currentFileName #'>  <img class='' src='/UploadFile/#=currentFileName#' style='width:100%';cursor: pointer; /></a> #} #"


            },
            { field: "documentType", title: documentType, hidden: true },
            { field: "combineDocumentType", title: documentType, hidden: false, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
            {
                field: "releaseDate", title: lblIssueDate, hidden: false, width: 40, filterable: false,
                template: "   <label class='badge   badge-success'>#=releaseDate #</label>"
            },
            {
                field: "expiryDate", title: lblExpiryDate, hidden: false, width: 40, filterable: false,
                template: "   <label class='badge   badge-danger'>#=expiryDate #</label>",

            },

            {
                field: "expiryIn", title: lblExpiresIn, hidden: false, width: 40, filterable: false,
                template: "#if (totalDays <= 0) { # <span class='badge badge-danger'>#:expiryIn#</span> # } else " +
                    "if (totalDays <= 29) { # <span class='badge badge-warning'>#:expiryIn#</span> # } else" +
                    "{# <span class='badge badge-success'>#:expiryIn#</span> # }#"

            },

            {
                title: status,
                field: 'status',
                width: 40,
                hidden: false,
                filterable: false,
                template: "#if (totalDays <= 0) { # <span class='badge badge-danger'>#:status#</span> # } else " +
                    "if (totalDays <= 29) { # <span class='badge badge-warning'>#:status#</span> # } else" +
                    "{# <span class='badge badge-success'>#:status#</span> # }#"

            }, {
                field: "attachmentRemarks",
                title: lblRemarks,
                width: 50,
                hidden: true,
                filterable: false,
                template: "  <span class='badge badge-info'>#:attachmentRemarks#</span>  "

            },
            {
                field: "", title: "", width: 60 //, template: gridTemplate,
                , template: "#if(statusForCondition =='Transfered'){ #" +
                    "<button type='button' onclick='fn_technicalsection_open_assign_modal(this);' data-grid-name=" + pass_GridName + " class='btn-sm btn btn-danger    waves-effect'style='font-size: smaller;'>Assign</button> " +
                    " <button type='button' onclick='fn_technical_section_transfer_file(this);' data-grid-name=" + pass_GridName + " class='btn-sm btn btn-info    waves-effect'style='font-size: smaller;'>Transfer</button> # }" +
                    "else {# " +
                    " <button type='button' onclick='fn_technical_section_transfer_file(this);' data-grid-name=" + pass_GridName + " class='btn-sm btn btn-info    waves-effect'style='font-size: smaller;'>Transfer</button> #}#"
            },



        ];
        bindKendoGrid(pass_GridName, 50, gridColumns, JSON.parse(inputDataJSON.Value), true, 490);
        localStorage.grid_id = '';
    }
};


function fn_technical_section_transfer_file(event) {

    var row = $(event).closest("tr");
    var grid = $("#" + event.getAttribute('data-grid-name')).data("kendoGrid");
    var dataItem = grid.dataItem(row);


    $('#load-technical-section-model').click();
    loadProject_TechnicalSectiondownLists();
    loadProject_TechnicalSection_SubSection_DDL('Project_TechnicalSection_SetupDetailTypeDDL', '0');



    $('#TechnicalSection_Attachment_Id').val(dataItem.attachmentId);
    $('#TechnicalSection_From_SetupType_Id').val(dataItem.setup_Type_Id);
    $('#TechnicalSection_Grid-Name').val(event.getAttribute('data-grid-name'));

}
$('.clearField').click(function () {
    $('#TechnicalSection_Attachment_Id').val(0);
    $('#TechnicalSection_From_SetupType_Id').val(0);
    $('#TechnicalSection_Grid-Name').val(0);
});
$('#btn-TechnicalSection-transfer').click(function () {

    if (customValidateForm('frm_TechnicalSection_TransferDataModal')) {
        fn_technical_section_transfer_file_save();
        return false;
    }
});


function fn_technical_section_transfer_file_save() {



    Swal.fire({

        title: areYouSureTitle,
        text: doYouReallyWantToTransferThisFile,
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
            ajaxRequest({
                commandName: 'Project_TechnicalSection_Document_Transfer_ById', values: {
                    Project_Id: project_Id,
                    Attachment_Id: $('#TechnicalSection_Attachment_Id').val(),
                    From_SetupType_Id: $('#TechnicalSection_From_SetupType_Id').val(),
                    //     To_SetupType_Id: $('#Project_TechnicalSection_Setup_SetupType_Id').val(),
                    To_SetupType_Id: $('#Project_TechnicalSection_Entity_Id').val(),
                    EmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
                    UserId: JSON.parse(localStorage.getItem('User')).id,
                    AttachmentRemarks: $('#TechnicalSection_Remarks').val(),
                    Language: $('#Language').val()
                }, CallBack: fn_technical_section_transfer_file_saveCallBack
            });
        }
    });
    var fn_technical_section_transfer_file_saveCallBack = function (response) {
        swal(response.Value);

        fnLoadTechnicalSection_Document(project_Id, $('#TechnicalSection_From_SetupType_Id').val(), $('#TechnicalSection_Grid-Name').val());
        $('.btnClose').click();
        loadProject_TechnicalSectiondownList('TechnicalSection');
    }

}

//***************** FN TRANSFER FILE AREA END------------------------BY /\/\ati



//***************** FN ASSIGN   AREA START---------------------------BY /\/\ati
function fn_technicalsection_open_assign_modal(event) {

    var row = $(event).closest("tr");
    var grid = $("#" + event.getAttribute('data-grid-name')).data("kendoGrid");
    var dataItem = grid.dataItem(row);


    $('#load-technical-section-assign-model').click();
    fnLoadTechnicalSectionArea($('.checkbtnValue_TechnicalSection.active')[0], dataItem.setup_TypeDetail_Id, dataItem.setup_Type_Id);
    $('#technicalSection_assignedModal_setup_type_Id').val(dataItem.setup_Type_Id);
    $('#technicalSection_assignedModal_setup_type_detail_Id').val(dataItem.setup_TypeDetail_Id);

    //$('#Grid-Name').val(event.getAttribute('data-grid-name'));

}
function fnloadAssignedEmployees_TechnicalSection(setup_TypeDetail_Id) {


    ajaxRequest({
        commandName: 'Project_Linked_Employees_By_SectionId',
        values: {
            Project_Id: project_Id,
            Sub_Section_Id: setup_TypeDetail_Id,
            Language: _currentLanguage
        }, CallBack: fnloadAssignedEmployees_TechnicalSectionCallBack
    });
}
var fnloadAssignedEmployees_TechnicalSectionCallBack = function (inputDataJSON) {


    var gridColumns = [

        { title: "#", template: "<b>#= ++record #</b>", width: 15 },
        { field: "id", title: "id", width: 10, hidden: true },
        {
            field: "employeeNumber", title: ".employee #", width: 50, hidden: false, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            //    , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fnLoadDetailScreen(this)  '>#=document#</a> ",
        },
        { field: "empName", title: ".empName", width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "setup_type_detail_name", title: ".Assigned Sub Section", width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        {
            field: "", width: 15, title: ' ',
            template: " <a style='font-size:20px;cursor:pointer;' onClick= deleteAssignedEmployeeById_TechnicalSection(this)  title='Delete '><span class='fa fa-trash'></span></a>  "
        },
    ];

    bindKendoGrid('grid-technical-section-load-all-assigned-employees', 100, gridColumns, JSON.parse(inputDataJSON.Value), true, 550);
    $('#checkAll').hide();
};


function deleteAssignedEmployeeById_TechnicalSection(event) {

    var row = $(event).closest("tr");
    var grid = $("#grid-technical-section-load-all-assigned-employees").data("kendoGrid");
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
            ajaxRequest({ commandName: 'Project_Linked_Multiple_Employees_Delete_By_Id', values: { Id: dataItem.id, UserId: JSON.parse(localStorage.getItem('User')).id, Language: _currentLanguage }, CallBack: deleteAssignedEmployeeById_TechnicalSectionCallBack });
        }
    });
    var deleteAssignedEmployeeById_TechnicalSectionCallBack = function (response) {
        swal(response.Value);
        fnloadAssignedEmployees_TechnicalSection($('#technicalSection_assignedModal_setup_type_detail_Id').val());

    }

}


//***************** FN ASSIGN   AREA END---------------------------BY /\/\ati


function loadProject_TechnicalSectiondownLists() { ajaxRequest({ commandName: 'DDL_TECHNICAL_SECTION_Project_MainType', values: { Language: _currentLanguage }, CallBack: fnloadProject_TechnicalSectiondownListsCallBack }); }
function fnloadProject_TechnicalSectiondownListsCallBack(response) {

    $("#Project_TechnicalSection_Parent_Type_DDL").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        //  value: -1,
        dataSource: JSON.parse(response.Value),
        popup: { appendTo: $("#TechnicalSection_ParentSection_container") },
        select: fn_TechnicalSection_OnSelect_Section_DDL,

    });
    $('#Project_TechnicalSection_Parent_Type_DDL').data("kendoDropDownList").options.enabled
}

function fn_TechnicalSection_OnSelect_Section_DDL(e) {

    var selected_Id = e.dataItem.id;
    $('#Project_TechnicalSection_Setup_SetupType_Id').val(selected_Id);
    var selected_Text = e.dataItem.name;
    // $('#Project_Section_Parent_Type_DDL_Text').val(selected_Text.trim());

    loadProject_TechnicalSection_SubSection_DDL('Project_TechnicalSection_SetupDetailTypeDDL', selected_Text.trim());


};



function loadProject_TechnicalSection_SubSection_DDL(controlId, typeName, selectText = null) {

    ajaxRequest({ commandName: 'Setup_Type_DropdownByTypeName_New', values: { TypeName: typeName, Language: _currentLanguage }, controlId, CallBack: loadProject_TechnicalSection_SubSection_DDLCallBackk });
}
var loadProject_TechnicalSection_SubSection_DDLCallBackk = function (loadjQueryDropdownListResponse, controlId) {


    $("#" + controlId).kendoDropDownList({
        dataValueField: "id",
        dataTextField: "name",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(loadjQueryDropdownListResponse.Value),
        popup: { appendTo: $("#TechnicalSection_SubSection_container") },
        select: onSelect_TechnicalSection_SubSection_DDL,
    });

}
function onSelect_TechnicalSection_SubSection_DDL(e) {
    var selected_Id = e.dataItem.id;
    $('#Project_TechnicalSection_Entity_Id').val(selected_Id);
};

function fnLoadTechnicalSectionArea(e, setup_TypeDetail_Id, setup_Type_Id) {

    var areaname = e.value;
    $('.checkbtnValue_TechnicalSection').removeClass('active')
    $(e).addClass('active')


    if (areaname == 'Available Employee') {

        $('#div-technical-section-employees-area').show();

        $('.div-technical-section-document-upload-area').hide();
        $('.div-technical-section-assigned-employees-area').hide();
        setTimeout(function () {
            load_TechnicalSection_AllEmployees($('#technicalSection_assignedModal_setup_type_detail_Id').val(), $('#technicalSection_assignedModal_setup_type_Id').val());
        }, 150);
    } else if (areaname == 'Assigned Employee') {



        setTimeout(function () {
            fnloadAssignedEmployees_TechnicalSection($('#technicalSection_assignedModal_setup_type_detail_Id').val());
        }, 150);
        $('.div-technical-section-assigned-employees-area').show();
        $('#div-technical-section-employees-area').hide();
        $('.div-technical-section-document-upload-area').hide();

    }
}

// --------------------- LOAD ALL EMPLOYEES START----------------------BY /\/\ati
function load_TechnicalSection_AllEmployees(setup_TypeDetail_Id, setup_Type_Id) {

    ajaxRequest({
        commandName: 'Project_HR_Employee', values: {
            Project_Id: project_Id,
            Main_Section_Id: setup_Type_Id,
            Sub_Section_Id: setup_TypeDetail_Id,
            Language: _currentLanguage
        }, CallBack: load_TechnicalSection_AllEmployeesCallBack
    });
}

var load_TechnicalSection_AllEmployeesCallBack = function (inputDataJSON) {


    var gridColumns = [

        { title: "#", template: "<b>#= ++record #</b>", width: 15 },
        { field: "id", title: "id", width: 10, hidden: true },
        {
            field: "employeeNumber", title: ".employee #", width: 50, hidden: false, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            //    , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fnLoadDetailScreen(this)  '>#=document#</a> ",
        },
        { field: "empName", title: ".empName", width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "professionName", title: ".professionName", width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        {
            headerTemplate: "<input type='checkbox' id='checkAll_TechnicalSection'  class='k-checkbox header-checkbox'>",
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

    bindKendoGrid('grid-technical-section-load-all-employees', 100, gridColumns, JSON.parse(inputDataJSON.Value), true, 550);
    $('#checkAll_TechnicalSection').show();
};
$(document).on("click", "#checkAll_TechnicalSection", function () {
    if (this.checked) {

        $("#grid-technical-section-load-all-employees tbody input:checkbox").attr("checked", true);
    } else {
        $("#grid-technical-section-load-all-employees tbody input:checkbox").attr("checked", false);


    }
});

$('#projectDetail_btnSave_TechnicalSection').click(function (e) {
    loopThroughGrid_TechnicalSection(this.value, 'projectDetail_btnSave_TechnicalSection', 'save');

});

function loopThroughGrid_TechnicalSection(btnValue, btnId, btnIcon) {

    var grid = $("#grid-technical-section-load-all-employees").data("kendoGrid");

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
                    Section_Entity_Id: $('#technicalSection_assignedModal_setup_type_Id').val(),
                    Sub_Section_Entity_Id: $('#technicalSection_assignedModal_setup_type_detail_Id').val(),
                    CreatedBy: parseInt(JSON.parse(localStorage.getItem('User')).id),
                    LoggedIn_EmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
                });
        }

    }
    if (postingArray.length > 0) {
        console.log(postingArray)
        ajaxRequest({
            commandName: 'Project_Save_Multiple_Employees',
            values:
            {
                ProjectModel: postingArray,
                CreatedBy: JSON.parse(localStorage.getItem('User')).id,
                Language: _currentLanguage == null ? '' : _currentLanguage
            }, CallBack: fn_project_save_Multiple_employee_TechnicalSection_callback
        });

    } else {
        swalMessage('info', lblFristSelectRecordFromGrid, 1500);
        return 0;
    }
}
var fn_project_save_Multiple_employee_TechnicalSection_callback = function (response) {
    swal(response.Value);
    load_TechnicalSection_AllEmployees($('#technicalSection_assignedModal_setup_type_detail_Id').val(), $('#technicalSection_assignedModal_setup_type_Id').val());
}
// --------------------- LOAD ALL EMPLOYEES END----------------------BY /\/\ati

/*
// --------------------- LOAD PROGRESS BAR START----------------------BY /\/\ati



 
function progress_technicalSection(technicalSectionMenuResponse, technicalSectionCallingArea) {
     
    var technicalSection_PB = $("#technical_section_progressBar").data("kendoProgressBar");
    //technicalSection_PB.value(0);

    technicalSection_PB.options.max = technicalSectionMenuResponse.length;//- 1;

    for (var technicaSection_loopCount = 0; technicaSection_loopCount < technicalSectionMenuResponse.length + 1; technicaSection_loopCount++) {

        technicalSection_PB.value(technicaSection_loopCount);
      
        if (technicalSectionMenuResponse[technicaSection_loopCount].project_sub_stepper_menu_error == true) {
            return true;
       
        }

    }
}
// --------------------- LOAD PROGRESS BAR END----------------------BY /\/\ati
 */

$(function () {
    //| Date Picker
    renderKendoDateAndTimePickerWithNewFormat('DesignSection_AssignedDocument_StartDate');
    renderKendoDateAndTimePickerWithNewFormat('DesignSection_AssignedDocument_CompletionDate');
    //|End Date Picker

});


var project_Id = (new URL(location.href)).searchParams.get('id');

/*

************LOAD DESING SECTION SUB STEPPER ********************* By /\/\ATI

*/


//function loadProjectSectiondownList() { ajaxRequest({ commandName: 'DDL_DESIGN_SECTION_Project_MainType', values: { Language: _currentLanguage }, CallBack: fnloadloadProjectSectiondownListCallBack }); }
function loadProjectSectiondownList(callingArea) {
    var employee_Id = 0;
    var checkResult = localStorage.getItem('isEmployeeExist');
    if (checkResult == 'Yes') {
        employee_Id: JSON.parse(localStorage.getItem('User')).employeeId
    }
    ajaxRequest({ commandName: 'STEPPER_SUB_SECTION_MENU', values: { ParentType: 'DesignSection', Project_Id: project_Id, Language: _currentLanguage }, CallBack: fnloadloadProjectSectiondownListCallBack });

    localStorage.setItem('DesignSection_Menu_Area', callingArea);


}
function fnloadloadProjectSectiondownListCallBack(response) { stepper_DESIGN_SECTION(response) }

function stepper_DESIGN_SECTION(response) {
    /*
    var designSection_Stepper_Validation_data = JSON.parse(localStorage.getItem('DesignSection_Stepper_Validation_data'));

    var step_Columns = []


    for (var i = 1; i < JSON.parse(response.Value).length; i++) {
        for (var j = 0; j < designSection_Stepper_Validation_data.length; j++) {

            if (JSON.parse(response.Value)[i].name == designSection_Stepper_Validation_data[j].setup_typeName) {
                if (parseInt(designSection_Stepper_Validation_data[j].totalDays) <= 0) {


                    error_PROJECT_MAIN_SECTION_Design_Stepper = true;
                    error_DESIGN_SECTION_Stepper = true;
                    selected_DESIGN_SECTION_Stepper = false;

                    step_Columns.push({
                        Id: JSON.parse(response.Value)[i].id,
                        label: JSON.parse(response.Value)[i].name,
                        error: error_DESIGN_SECTION_Stepper,
                        selected: selected_DESIGN_SECTION_Stepper,
                    });


                } else {
                    error_PROJECT_MAIN_SECTION_Design_Stepper = false;
                    error_DESIGN_SECTION_Stepper = false;
                    selected_DESIGN_SECTION_Stepper = false;
                }

            }


        }

    }
   
   */


    
    var step_Columns = []

    for (var i = 0; i < JSON.parse(response.Value).length; i++) {

        //************************ CHANGE COLOR OF MAIN STEPPER MENU BY /\/\ATI 
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

        if (localStorage.getItem('DesignSection_Menu_Area') != '') {

            progressbar_subSection(JSON.parse(response.Value), localStorage.getItem('DesignSection_Menu_Area'));
        }
    }, 100);


    //bindkendoStepper('design-section-stepper', false, step_Columns, '', stepper_Fn_DesignSection_Onselect, 243, "vertical");
    bindkendoStepper('design-section-stepper', false, step_Columns, '', stepper_Fn_DesignSection_Onselect, 'auto', "vertical");

    fnApprovedOrReturn_DDL('ApprovedOrReturned'); // Load approved or Return ddl
}
//function onActivate(e) {

//    var stepper_data = e.step.options;
//    //console.log("Activated: " + e.step.options.label);
//}
 
function stepper_Fn_DesignSection_Onselect(e) {
     
    var stepper_data = e.step.options;
    //e.step.element 
    

    fnCheckProject_SubSection_Tab(stepper_data.label, stepper_data.Id);
      
     


}

/*
 
************LOAD DESING SECTION SUB STEPPER END ********************* By /\/\ATI
 
*/

function fnLoadDesignSection_Document(project_Id, Setup_Type_Id, grid_Id) {
    ajaxRequest({
        commandName: 'Project_DesignSection_Document_GetById', values: { Project_Id: project_Id, Setup_Type_Id: Setup_Type_Id, Language: _currentLanguage }, CallBack: fnLoadDesignSection_Document_CallBacck
    });
    localStorage.setItem('grid_id', grid_Id);
}

var fnLoadDesignSection_Document_CallBacck = function (inputDataJSON) {
    var pass_GridName = localStorage.getItem('grid_id');
    //console.log(JSON.parse(inputDataJSON.Value))

    if (pass_GridName != "") {

        var gridTemplate = '';
        //  if (pass_GridName == 'grid-project-initial-sketch-document') {
        gridTemplate = "<button type='button' onclick='fn_transfer_file(this);' data-grid-name=" + pass_GridName + " class='btn-sm btn btn-info    waves-effect'style='font-size: small;'>Transfer</button>";

        // } else {
        //      gridTemplate = ''//"<span class='badge badge-success'>Not found</span>";
        // }


        var gridColumns = [
            { field: "entityId", title: "EntityId", hidden: true, width: 20 },
            { field: "entityType", title: "EntityType", hidden: true, width: 20 },
            { field: "documentType", title: "DocumentType", hidden: true, width: 20 },
            { field: "setup_Type_Id", title: "setup_Type_Id", hidden: true, width: 20 },
            { field: "setup_TypeDetail_Id", title: "setup_TypeDetail_Id", hidden: true, width: 20 },
            { field: "attachmentId", title: "attachmentId", hidden: true, width: 20 },
            { field: "DesignSection_Document_Id", title: "DesignSection_Document_Id", hidden: true },
            { title: "#", template: "<b>#= ++record #</b>", width: 10, },
            {
                field: "currentFileName",
                title: lblDocumentAttachment,
                hidden: false,
                width: 20,
                filterable: false,
                template: " #  if (currentFileName == null )" +
                    " { # <label class='pcoded-badge label label-danger'>" + lblNoAttachment + "</label># }                                                                     else if(currentFileName.split('.')[1]=='pdf')" +
                    " { #  <a  target='_blank' href='/UploadFile/#=currentFileName #'> <img class='' src='/Content/Images/pdf.png'        style='width:100%;cursor: pointer;'/> </a># }else if(currentFileName.split('.')[1]=='xlsx')" +
                    " { #  <a  target='_blank' href='/UploadFile/#=currentFileName #'> <img class='' src='/Content/Images/xls.png'        style='width:100%;cursor: pointer;'/> </a># }else if(currentFileName.split('.')[1]=='docs' || currentFileName.split('.')[1]=='docx'|| currentFileName.split('.')[1]=='doc')" +
                    " { #  <a  target='_blank' href='/UploadFile/#=currentFileName #'> <img class='' src='/Content/Images/docx.png'       style='width:100%;cursor: pointer;'/> </a># } else" +
                    " { # <a  target='_blank' href='/UploadFile/#=currentFileName #'>  <img class='' src='/Content/Images/attachment-icon.png' style='width:70%';cursor: pointer; /></a> #} #"


            },
            { field: "documentType", title: documentType, hidden: true },
            { field: "combineDocumentType", title: documentType, hidden: false, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
            {
                field: "releaseDate", title: lblIssueDate, hidden: false, width: 40, filterable: false,
                template: "   <label class='badge   badge-success'>#=releaseDate #</label>"
            },
            {
                field: "expiryDate", title: lblExpiryDate, hidden: false, width: 40, filterable: false,
                template: "#if(noExpiry != 1) { #<label class='badge   badge-danger'>#=expiryDate #</label> #} else {# <label class='badge  '>" + lblNoExpiry + "</label> #}#",

            },

            {
                field: "expiryIn", title: lblExpiresIn, hidden: false, width: 40, filterable: false,
                template: "#if(noExpiry == 1) { #<label class='badge  '>" + lblNoExpiry + "</label>#} else {#" +
                    " #if (totalDays <= 0) { #<span class='badge badge-danger'>#:expiryIn#</span> # } else if (totalDays <= 29) { # <span class='badge badge-warning'>#:expiryIn#</span> # } " +
                    "else {# <span class='badge badge-success'>#:expiryIn#</span> # }# #}#"


            },

            {
                title: status,
                field: 'status',
                width: 40,
                hidden: false,
                filterable: false,
                template: "#if (totalDays <= 0  && noExpiry == 0) { # <span class='badge badge-danger'>" + lblStatusExpired + "</span> # } else " +
                    "if (totalDays <= 29  && noExpiry == 0) { # <span class='badge badge-warning'>" + lblStatusValid + "</span> # }" +
                    " else {# <span class='badge badge-success'>#:status#</span> # }#"

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
                    "<button type='button' onclick='fn_open_assign_modal(this);' data-grid-name=" + pass_GridName + " class='btn-sm btn btn-danger    waves-effect'style='font-size: smaller;'>" + lblAssign + "</button> " +
                    " <button type='button' onclick='fn_transfer_file(this);' data-grid-name=" + pass_GridName + " class='btn-sm btn btn-info    waves-effect'style='font-size: smaller;'>" + lblTransfer + "</button> # }" +
                    "else {# " +
                    " <button type='button' onclick='fn_transfer_file(this);' data-grid-name=" + pass_GridName + " class='btn-sm btn btn-info    waves-effect'style='font-size: smaller;'>" + lblTransfer + "</button> #}#"
            },
            //{
            //    field: "", title: "", width: 20,
            //    template: "#if ('pass_GridName' == 'grid-project-initial-sketch-document') { # <button type='button' onclick='fn_transfer_file(this);' data-grid-name=" + pass_GridName + " class='btn-sm btn btn-info    waves-effect'style='font-size: small;'>Transfer</button> # }" +
            //        "else " +
            //        "{# <span class='badge badge-success'>Not found</span> # }#"

            //},

            //{
            //    field: "",
            //    width: 50,
            //    title: "Action",
            //    template: "" +
            //        "<button type='button' onclick='LoadRecordByIDAwaitingSupplier(this);' class='btn btn-sm btn-success  waves-effect  f-w-600 d-inline-block' title='View Detail'><i class='fas fa-eye'></i></button> | " +
            //        "<button type='button' onclick='fn_transfer_file(this);' class='btn-sm btn btn-success text-white   waves-effect  f-w-600 d-inline-block save_btn'>Approve</button> | " +
            //        "<button type='button' onclick='fnCancelPayment(this);' class='btn-sm btn btn-danger text-white   waves-effect  f-w-600 d-inline-block'>Cancel</button>"

            //}


        ];
        bindKendoGrid(pass_GridName, 50, gridColumns, JSON.parse(inputDataJSON.Value), true, 490);
        localStorage.grid_id = '';
    }
};


//function fn_transfer_file(event) {
//    debugger
//    var row = $(event).closest("tr");
//    var grid = $("#" + event.getAttribute('data-grid-name')).data("kendoGrid");
//    var dataItem = grid.dataItem(row);
//    Swal.fire({

//        title: areYouSureTitle,
//        text: doYouReallyWantToDeletThisRecord,
//        icon: 'question',
//        showCancelButton: true,
//        confirmButtonColor: '#5cb85c',
//        cancelButtonColor: '#d9534f',
//        confirmButtonText: btnYesText,
//        cancelButtonText: btnNoText,
//        buttons: {
//            cancel: {
//                text: "No",
//                value: null,
//                visible: true,
//                className: "btn btn-danger",
//                closeModal: true
//            },
//            confirm: {
//                text: "Yes",
//                value: true,
//                visible: true,
//                className: "btn btn-warning",
//                closeModal: true
//            }
//        }
//    }).then(function (restult) {
//        if (restult.value) {
//            ajaxRequest({ commandName: 'Csslient_Delete', values: { Id: dataItem.id, UserId: JSON.parse(localStorage.getItem('User')).id, Language: $('#Language').val() }, CallBack: deleteByIdCallBack });
//        }
//    });
//    var deleteByIdCallBack = function (response) {
//        swal(response.Value);
//        loadClientGrid();
//    }

//}
//***************** FN TRANSFER FILE AREA BY /\/\ATI

var selectedRecordDocumentType = null;
function fn_transfer_file(event) {

    var row = $(event).closest("tr");
    var grid = $("#" + event.getAttribute('data-grid-name')).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    selectedRecordDocumentType = dataItem.combineDocumentType;

    $('#frmTransferDataModal').trigger('reset')
    $('#load-model').click();
    $('.div_showHide_Main_stepper').hide();
    $(".main_Section_In_Sub_section_transfer_modal").prop('selectedIndex', 0);


    loadProjectSectiondownLists();
    loadProject_DesignSection_SubSection_DDL('Project_DesignSection_SetupDetailTypeDDL', '0');


    $('#Attachment_Id').val(dataItem.attachmentId);
    $('#From_SetupType_Id').val(dataItem.setup_Type_Id);
    $('#Grid-Name').val(event.getAttribute('data-grid-name'));



}
$('.clearField').click(function () {
    $('#Attachment_Id').val(0);
    $('#From_SetupType_Id').val(0);
    $('#Grid-Name').val(0);
});
$('#btn-transfer').click(function () {

    if (customValidateForm('frmTransferDataModal')) {
        fn_transfer_file_save();
        return false;
    }
});


function fn_transfer_file_save() {



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
            //alert(selectedRecordDocumentType);
            //alert($('#Project_Section_Parent_Type_DDL').data("kendoDropDownList").text());
            //alert($('#Project_DesignSection_SetupDetailTypeDDL').data("kendoDropDownList").text());


            ajaxRequest({
                commandName: 'Project_DesignSection_Document_Transfer_ById', values: {
                    Project_Id: project_Id,
                    Attachment_Id: $('#Attachment_Id').val(),
                    From_SetupType_Id: $('#From_SetupType_Id').val(),
                    //     To_SetupType_Id: $('#Setup_SetupType_Id').val(),
                    To_SetupType_Id: $('#Project_DesignSection_Entity_Id').val(),
                    EmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
                    UserId: JSON.parse(localStorage.getItem('User')).id,
                    AttachmentRemarks: $('#DesignSection_Remarks').val(),
                    FromDocumentType: selectedRecordDocumentType,
                    ToDocumentType: $('#Project_Section_Parent_Type_DDL').data("kendoDropDownList").text() + ' | ' + $('#Project_DesignSection_SetupDetailTypeDDL').data("kendoDropDownList").text(),
                    ApprovedOrReturned: $('#ApprovedOrReturned').val(),
                    DesignSection_comment_for_client_or_employee: $('#DesignSection_comment_for_client_or_employee').val(),
                    Language: $('#Language').val()
                }, CallBack: fn_transfer_file_saveCallBack
            });
        }
    });
    var fn_transfer_file_saveCallBack = function (response) {
        selectedRecordDocumentType = null;
        swal(response.Value);

        fnLoadDesignSection_Document(project_Id, $('#From_SetupType_Id').val(), $('#Grid-Name').val());
        $('.btnClose').click();
        loadProjectSectiondownList('DesignSection');
        fnLoadMain_Progress_DetailsById(); //Load Main Progress
    }

}

//***************** FN TRANSFER FILE AREA END------------------------BY /\/\ati



//***************** FN ASSIGN   AREA START---------------------------BY /\/\ati
function fn_open_assign_modal(event) {

    var row = $(event).closest("tr");
    var grid = $("#" + event.getAttribute('data-grid-name')).data("kendoGrid");
    var dataItem = grid.dataItem(row);


    $('#load-assign-model').click();
    fnLoadDesignSectionArea($('.checkbtnValue_DesignSection.active')[0], dataItem.setup_TypeDetail_Id, dataItem.setup_Type_Id);
    $('#assignedModal_setup_type_Id').val(dataItem.setup_Type_Id);
    $('#assignedModal_setup_type_detail_Id').val(dataItem.setup_TypeDetail_Id);

    //$('#Grid-Name').val(event.getAttribute('data-grid-name'));

}
function fnloadAssignedEmployees_DesignSection(setup_TypeDetail_Id) {


    ajaxRequest({
        commandName: 'Project_Linked_Employees_By_SectionId',
        values: {
            Project_Id: project_Id,
            Sub_Section_Id: setup_TypeDetail_Id,
            Language: _currentLanguage
        }, CallBack: fnloadAssignedEmployees_DesignSectionCallBack
    });
}
var fnloadAssignedEmployees_DesignSectionCallBack = function (inputDataJSON) {


    var gridColumns = [

        { title: "#", template: "<b>#= ++record #</b>", width: 15 },
        { field: "id", title: "id", width: 10, hidden: true },
        {
            field: "employeeNumber", title: employeeNumber, width: 50, hidden: false, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            //    , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fnLoadDetailScreen(this)  '>#=document#</a> ",
        },
        { field: "empName", title: employeeName, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "setup_type_detail_name", title: lblAssignedSubSection, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        {
            field: "", width: 15, title: ' ',
            template: " <a style='font-size:20px;cursor:pointer;' onClick= deleteAssignedEmployeeById_DesignSection(this)  title=" + lblDelete + "><span class='fa fa-trash'></span></a>  "
        },
    ];

    bindKendoGrid('grid-load-all-assigned-employees', 100, gridColumns, JSON.parse(inputDataJSON.Value), true, 550);
    $('#checkAll').hide();
};


function deleteAssignedEmployeeById_DesignSection(event) {

    var row = $(event).closest("tr");
    var grid = $("#grid-load-all-assigned-employees").data("kendoGrid");
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
            ajaxRequest({ commandName: 'Project_Linked_Multiple_Employees_Delete_By_Id', values: { Id: dataItem.id, UserId: JSON.parse(localStorage.getItem('User')).id, Language: _currentLanguage }, CallBack: deleteAssignedEmployeeById_DesignSection_Callback });
        }
    });
    var deleteAssignedEmployeeById_DesignSection_Callback = function (response) {
        swal(response.Value);
        fnloadAssignedEmployees_DesignSection($('#assignedModal_setup_type_detail_Id').val());

    }

}


//***************** FN ASSIGN   AREA END---------------------------BY /\/\ati


function loadProjectSectiondownLists() { ajaxRequest({ commandName: 'DDL_DESIGN_SECTION_Project_MainType', values: { Language: _currentLanguage }, CallBack: fnloadloadProjectSectiondownListsCallBack }); }
function fnloadloadProjectSectiondownListsCallBack(response) {
    $("#Project_Section_Parent_Type_DDL").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        //  value: -1,
        dataSource: JSON.parse(response.Value),
        popup: { appendTo: $("#container") },
        select: fn_DesignSection_OnSelect_Section_DDL,

    });
    $('#Project_Section_Parent_Type_DDL').data("kendoDropDownList").options.enabled
}

function fn_DesignSection_OnSelect_Section_DDL(e) {


    var selected_Id = e.dataItem.id;
    $('#Setup_SetupType_Id').val(selected_Id);
    var selected_Text = e.dataItem.name;
    $('#Project_Section_Parent_Type_DDL_Text').val(selected_Text.trim());
    loadProject_DesignSection_SubSection_DDL('Project_DesignSection_SetupDetailTypeDDL', selected_Text.trim());


};



function loadProject_DesignSection_SubSection_DDL(controlId, typeName, selectText = null) {

    ajaxRequest({ commandName: 'Setup_Type_DropdownByTypeName_New', values: { TypeName: typeName, Language: _currentLanguage }, controlId, CallBack: loadProject_DesignSection_SubSection_DDLCallBackk });
}
var loadProject_DesignSection_SubSection_DDLCallBackk = function (loadjQueryDropdownListResponse, controlId) {


    $("#" + controlId).kendoDropDownList({
        dataValueField: "id",
        dataTextField: "name",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(loadjQueryDropdownListResponse.Value),
        popup: { appendTo: $("#container") },
        select: onSelect_DesignSection,
    });

}
function onSelect_DesignSection(e) {
    var selected_Id = e.dataItem.id;

    $('#Project_DesignSection_Entity_Id').val(selected_Id);

    /*
    var selected_Text = e.dataItem.name;
    
    if (selected_Text == 'Architecture Engineer' || selected_Text == 'Engineer') { 
        fnLoadDesignSectionArea($('.checkbtnValue_DesignSection.active')[0]);
    }
    */
};

function fnLoadDesignSectionArea(e, setup_TypeDetail_Id, setup_Type_Id) {


    var areaname = e.value;
    $('.checkbtnValue_DesignSection').removeClass('active')
    $(e).addClass('active')

    //if (areaname == 'Upload Document') {
    //    $('.div-design-section-document-upload-area').show();
    //    $('#div-design-section-employees-area').hide();
    //    $('.div-design-section-assigned-employees-area').hide();
    //    //$('.show-sub-section-name').empty();


    //} else

    if (areaname == 'Available Employee') {

        $('#div-design-section-employees-area').show();

        //$("#div-design-section-employees-area").load("/Project/Project/LoadAllEmployeess");

        $('.div-design-section-document-upload-area').hide();
        $('.div-design-section-assigned-employees-area').hide();
        $('.div-show-only-for-design-section-employee-available-area').show();

        setTimeout(function () {

            loadloadAllEmployees_DesignSection($('#assignedModal_setup_type_detail_Id').val(), $('#assignedModal_setup_type_Id').val());



        }, 150);
    } else if (areaname == 'Assigned Employee') {


        setTimeout(function () {
            fnloadAssignedEmployees_DesignSection($('#assignedModal_setup_type_detail_Id').val());
        }, 150);
        $('.div-design-section-assigned-employees-area').show();
        $('#div-design-section-employees-area').hide();
        $('.div-design-section-document-upload-area').hide();

        $('.div-show-only-for-design-section-employee-available-area').hide();

    }
}

// --------------------- LOAD ALL EMPLOYEES START----------------------BY /\/\ati
function loadloadAllEmployees_DesignSection(setup_TypeDetail_Id, setup_Type_Id) {

    ajaxRequest({
        commandName: 'Project_HR_Employee', values: {
            Project_Id: project_Id,
            Main_Section_Id: setup_Type_Id,
            Sub_Section_Id: setup_TypeDetail_Id,
            Language: _currentLanguage,
            callingArea: 'DesignSection'
        }, CallBack: loadloadAllEmployees_DesignSectionCallBack
    });
}

var loadloadAllEmployees_DesignSectionCallBack = function (inputDataJSON) {


    var gridColumns = [

        { title: "#", template: "<b>#= ++record #</b>", width: 15 },
        { field: "id", title: "id", width: 10, hidden: true },
        {
            field: "employeeNumber", title: employeeNumber, width: 50, hidden: false, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            //    , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fnLoadDetailScreen(this)  '>#=document#</a> ",
        },
        { field: "empName", title: employeeName, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "professionName", title: lblProfessionName, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
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

    bindKendoGrid('grid-load-all-employees', 100, gridColumns, JSON.parse(inputDataJSON.Value), true, 550);
    $('#checkAll').show();
};
$(document).on("click", "#checkAll", function () {
    if (this.checked) {

        $("#grid-load-all-employees tbody input:checkbox").attr("checked", true);
    } else {
        $("#grid-load-all-employees tbody input:checkbox").attr("checked", false);


    }
});

$('#projectDetail_btnSave_DesingSection').click(function (e) {

    loopThroughGrid_DesingSection(this.value, 'projectDetail_btnSave_DesingSection', 'save');

});

function loopThroughGrid_DesingSection(btnValue, btnId, btnIcon) {

    var grid = $("#grid-load-all-employees").data("kendoGrid");

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
                    Section_Entity_Id: $('#assignedModal_setup_type_Id').val(),
                    Sub_Section_Entity_Id: $('#assignedModal_setup_type_detail_Id').val(),
                    CreatedBy: parseInt(JSON.parse(localStorage.getItem('User')).id),
                    LoggedIn_EmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,

                });
        }

    }
    if (postingArray.length > 0) {

        ajaxRequest({
            commandName: 'Project_Save_Multiple_Employees',
            values:
            {
                ProjectModel: postingArray,
                CreatedBy: JSON.parse(localStorage.getItem('User')).id,
                Assign_StartDate: $('#DesignSection_AssignedDocument_StartDate').val(),
                Assign_CompletionDate: $('#DesignSection_AssignedDocument_CompletionDate').val(),
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
    loadloadAllEmployees_DesignSection($('#assignedModal_setup_type_detail_Id').val(), $('#assignedModal_setup_type_Id').val());
    //| Date Picker
    renderKendoDateAndTimePickerWithNewFormat('DesignSection_AssignedDocument_StartDate');
    renderKendoDateAndTimePickerWithNewFormat('DesignSection_AssignedDocument_CompletionDate');
    //|End Date Picker
}
// --------------------- LOAD ALL EMPLOYEES END----------------------BY /\/\ati



/*
// --------------------- LOAD PROGRESS BAR START----------------------BY /\/\ati


function progress_designSection(designSectionMenuResponse, designSectionCallingArea) {

    var designSection_PB = $("#design_section_progressBar").data("kendoProgressBar");
    //designSection_PB.value(0);

    designSection_PB.options.max = designSectionMenuResponse.length;//- 1;

    for (var loopCount = 0; loopCount < designSectionMenuResponse.length + 1; loopCount++) {

        designSection_PB.value(loopCount);
     //   if (designSectionMenuResponse[loopCount].project_sub_stepper_menu_error != undefined) {

            if (designSectionMenuResponse[loopCount].project_sub_stepper_menu_error == true) {
                return true;

            }
       // }

    }
    setTimeout(console.clear(), 200);
}
// --------------------- LOAD PROGRESS BAR END----------------------BY /\/\ati
*/

function fnLoadOtherMainSection(selectedValue) {

    if (selectedValue == 'Yes') {
        $('.div_showHide_Main_stepper').show();
        var step_Columnss = [

            {
                label: lblSelect,
                icon: " ",
            },
            //{
            //    label: "Design Section",
            //    // error: error_PROJECT_MAIN_SECTION_Design_Stepper,
            //    // selected: selected_PROJECT_MAIN_SECTION_Design_Stepper,
            //    // Id: 333,
            //},
            {
                label: "Technical Section",
                icon: " ",

            },
            {
                label: "Supervision Section",
                icon: " ",
            },
        ];

        bindkendoStepper('Project_load_other_main_section_stepper_in_DesignSection', false, step_Columnss, '', stepper_Fn_otherMainSection_Onselect, 800, "horizontal");


        function stepper_Fn_otherMainSection_Onselect(e) {
            var stepper_data = e.step.options;
            if (stepper_data.label != 'Select') {
                ajaxRequest({ commandName: 'DDL_Load_SetupType_By_ParentName', values: { ParentType: stepper_data.label.replace(/ /g, ""), Language: _currentLanguage }, CallBack: fnLoadOtherMainSection_Callback });
            } else {
                loadProjectSectiondownLists();
                $("#Project_DesignSection_SetupDetailTypeDDL").data("kendoDropDownList").dataSource.data([]);

            }

        }


    } else {

        $('.div_showHide_Main_stepper').hide();
        loadProjectSectiondownLists();
        $("#Project_DesignSection_SetupDetailTypeDDL").data("kendoDropDownList").dataSource.data([]);

    }

    function fnLoadOtherMainSection_Callback(response) {
        $("#Project_DesignSection_SetupDetailTypeDDL").data("kendoDropDownList").dataSource.data([]);
        fnloadloadProjectSectiondownListsCallBack(response);
    }

}
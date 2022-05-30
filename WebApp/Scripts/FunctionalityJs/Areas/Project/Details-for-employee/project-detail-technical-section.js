
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
                , template: " <a style='font-size:20px;cursor:pointer;' onClick= fn_delete_TechnicalSection_DocumentById(this)  title=" + lblDelete + "><span class='fa fa-trash'></span></a>  "
            },



        ];
        bindKendoGrid(pass_GridName, 50, gridColumns, JSON.parse(inputDataJSON.Value), true, 490);
        localStorage.grid_id = '';
    }
};
function fn_delete_TechnicalSection_DocumentById(event) {

    var row = $(event).closest("tr");
    var gridId = $(event).closest("div").parent()[0].id;
    var grid = $("#" + gridId).data("kendoGrid");
    localStorage.setItem('grid__id', gridId);
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

            ajaxRequest({
                commandName: 'Project_TechnicalSection_Document_Delete',
                values: {
                    Id: dataItem.attachmentId, CreatedBy: JSON.parse(localStorage.getItem('User')).id, Language: _currentLanguage
                }, CallBack: fn_delete_TechnicalSection_DocumentCallBack
            });
        }
    });
    var fn_delete_TechnicalSection_DocumentCallBack = function (response) {
        $('#frmAddUpdate_TechnicalSection_Document')[0].reset();
        $('#TechnicalSection_Document_Id').val(0);
        swal(response.Value);
        fnLoadTechnicalSection_Document(project_Id, $("#technical-section-stepper").data('kendoStepper').selectedStep.options.Id, localStorage.getItem('grid__id'));

        localStorage.grid__id = '';

    }

}

//|Click Event
$('#btn-technical-section-upload-document').click(function () {

    $('#TechnicalSection_Document_ProjectId').val(project_Id);
    $('#TechnicalSection_Document_Language').val(_currentLanguage);
    $('#TechnicalSection_Document_CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    if (customValidateForm('frmAddUpdate_TechnicalSection_Document')) {
        if (!firstDateShouldBeGreaterThanSecondDate($('#TechnicalSection_Document_StartDate').val(), $('#TechnicalSection_Document_EndDate').val(), $('.lbl-startDate').text(), $('.lbl-endDate').text())) {
            return false;
        }
        buttonAddPleaseWait('btn-technical-section-upload-document');

        $("#frmAddUpdate_TechnicalSection_Document").ajaxForm();
        var options = {
            success: function (response, statusText, jqXHR) {
                buttonRemovePleaseWait('btn-technical-section-upload-document', save, 'save');

                document.getElementById("frmAddUpdate_TechnicalSection_Document").reset();
                swal(response);

                var messageResponseParse = JSON.parse(response);
                if (messageResponseParse.type == undefined) {
                    messageResponseParse = JSON.parse(messageResponseParse);
                } if (messageResponseParse.type == undefined) {
                    messageResponseParse = JSON.parse(messageResponseParse);
                }
                location.reload();
            },
            error: function (xhr, status, error) {
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                buttonRemovePleaseWait('btn-technical-section-upload-document', save, 'save');
                alert(errmsg);
            },
            complete: function () {
                buttonRemovePleaseWait('btn-technical-section-upload-document', save, 'save');
            }
        };
        $("#frmAddUpdate_TechnicalSection_Document").ajaxSubmit(options);
    }
    else {
        buttonRemovePleaseWait('btn-technical-section-upload-document', save, 'save');
        return false;
    }
});

//|End Click Event



$('#btn-technical-section-load-upload-document-modal').click(function () {
    document.getElementById("frmAddUpdate_TechnicalSection_Document").reset();
    fn_IsWorkStarted_TechnicalSection();


});

//***************** FN TRANSFER FILE AREA END------------------------BY /\/\ati

function fn_IsWorkStarted_TechnicalSection() {
    ajaxRequest({
        commandName: 'Project_Employees_Started_Work', values: {

            Project_Id: project_Id,
            UserId: JSON.parse(localStorage.getItem('User')).id,
            Employee_Id: JSON.parse(localStorage.getItem('User')).employeeId,
            Selected_Document_Step_Id: $("#technical-section-stepper").data('kendoStepper').selectedStep.options.Id,
            Language: _currentLanguage
        }, CallBack: fn_IsWorkStarted_TechnicalSection_Callback
    });
    function fn_IsWorkStarted_TechnicalSection_Callback(response) {


         
        $('.employee-work-date').text(JSON.parse(response.Value).employeeTaskDate);
        $('.employee-work-time').text(JSON.parse(response.Value).employeeTaskTime);

        if (JSON.parse(response.Value).isEmployeeWorkStarted == 'No') { // No mean loggedin employee is envoled in this project and it's exist in Project Multple table .

            Swal.fire({

                //  title: areYouSureTitle,
                text: doYouReallyWantToStartWorkingOnIt,
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
                        commandName: 'Project_Linked_Multiple_Employees_Update_StartedDate_By_Paramters', values: {

                            Project_Id: project_Id,
                            UserId: JSON.parse(localStorage.getItem('User')).id,
                            Employee_Id: JSON.parse(localStorage.getItem('User')).employeeId,
                            Selected_Document_Step_Id: $("#technical-section-stepper").data('kendoStepper').selectedStep.options.Id,
                            Language: _currentLanguage
                        }, CallBack: ''
                    });

                    //After ajax call .
                    $('#load-technical-section-model').click();
                    if (JSON.parse(response.Value).employeeTaskDate != null) {
                        $('.show-hide-employee-start-datetime').show();
                        $('.show-hide-employee-start-datetime').addClass('btn-success')
                    }

                    loadProject_TechnicalSectiondownLists()
                    loadProject_TechnicalSection_SubSection_DDL('Project_TechnicalSection_SetupDetailTypeDDL', '0');

                }
            });
        } else {

            //After ajax call .  

            $('.employee-work-date').text(JSON.parse(response.Value).employeeTaskDate);
            $('.employee-work-time').text(JSON.parse(response.Value).employeeTaskTime);
            $('#load-technical-section-model').click();
            if (JSON.parse(response.Value).employeeTaskDate != null) {
                $('.show-hide-employee-start-datetime').show();
                $('.show-hide-employee-start-datetime').addClass('btn-success')
            }
            loadProject_TechnicalSectiondownLists()
            loadProject_TechnicalSection_SubSection_DDL('Project_TechnicalSection_SetupDetailTypeDDL', '0');
        }
    }

}



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


    //$('#Project_TechnicalSection_Parent_Type_DDL').data("kendoDropDownList").options.enabled
    setTimeout(function () {
        $("#Project_TechnicalSection_Parent_Type_DDL").data("kendoDropDownList").value($("#technical-section-stepper").data('kendoStepper').selectedStep.options.Id);
        loadProject_TechnicalSection_SubSection_DDL('Project_TechnicalSection_SetupDetailTypeDDL', $("#technical-section-stepper").data('kendoStepper').selectedStep.options.label.trim());

    }, 100);
}

function fn_TechnicalSection_OnSelect_Section_DDL(e) {

    var selected_Id = e.dataItem.id;
    $('#Project_TechnicalSection_Setup_SetupType_Id').val(selected_Id);
    var selected_Text = e.dataItem.name;

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


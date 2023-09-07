
var project_Id = (new URL(location.href)).searchParams.get('id');
/*

************LOAD Supervision SECTION SUB STEPPER ********************* By |\/|ati

*/


function loadProject_SupervisionSectiondownList(callingArea) {
    ajaxRequest({ commandName: 'STEPPER_SUB_SECTION_MENU', values: { ParentType: 'SupervisionSection', Project_Id: project_Id, Language: _currentLanguage }, CallBack: fnloadProject_SupervisionSectiondownListCallBack });
    localStorage.setItem('SupervisionSection_Menu_Area', callingArea);
}
function fnloadProject_SupervisionSectiondownListCallBack(response) { stepper_SUPERVISION_SECTION(response) }

function stepper_SUPERVISION_SECTION(response) {


    var step_Columns = []

    for (var i = 0; i < JSON.parse(response.Value).length; i++) {

        //************************ CHANGE COLOR OF MAIN STEPPER MENU BY |\/|ati 
        if (JSON.parse(response.Value)[i].parent_Type == 'DesignSection' && JSON.parse(response.Value)[i].project_sub_stepper_menu_error == true) {
            error_PROJECT_MAIN_SECTION_Design_Stepper = true;

        } else if (JSON.parse(response.Value)[i].parent_Type == 'SupervisionSection' && JSON.parse(response.Value)[i].project_sub_stepper_menu_error == true) {
            error_PROJECT_MAIN_SECTION_Supervision_Stepper = true;
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
    /*
    setTimeout(function () {

        if (localStorage.getItem('SupervisionSection_Menu_Area') != '') {

            progressbar_subSection(JSON.parse(response.Value), localStorage.getItem('SupervisionSection_Menu_Area'));
        }
    }, 100);
    */
    bindkendoStepper('supervision-section-stepper', false, step_Columns, '', stepper_Fn_SupervisionSection_Onselect, 'auto', "vertical");
    if ($("#supervision-section-stepper").data('kendoStepper').selectedStep.options.Id == undefined) {

        var stepperInstance_supervision = $("#supervision-section-stepper").data('kendoStepper');
       
        //  fnCheckProject_SubSection_Tab(stepperInstance_supervision.options.steps[0].label, stepperInstance_supervision.options.steps[0].Id)
        fn_Project_Dynamic_Section_Tab(stepperInstance_supervision.options.steps[0].label, stepperInstance_supervision.options.steps[0].Id)
    }
}
function stepper_Fn_SupervisionSection_Onselect(e) {

    var stepper_data = e.step.options;
    //e.step.element 
    // fnCheckProject_SubSection_Tab(stepper_data.label, stepper_data.Id);



}

/*$("#supervision-section-stepper").on("click", '.k-step', function (e) {*/
$("#supervision-section-stepper").on("click", ".k-step", function (e) {

    e.stopPropagation();
    var currentStep = $(this).select();
    var stepName = 0;
    if (currentStep.find('a').attr('title') != '') {
        stepName = currentStep.find('a').attr('title').trim();
    }

    var stepIdFromFilter = 0;
    $.grep($("#supervision-section-stepper").data('kendoStepper').options.steps, function (obj) {

        obj.label == stepName ? (stepIdFromFilter = obj.Id) : 0;
    });
    if (stepIdFromFilter != 0) {

        //  fnCheckProject_SubSection_Tab(stepName, stepIdFromFilter)
        fn_Project_Dynamic_Section_Tab(stepName, stepIdFromFilter)
    }
    //console.log(stepIdFromFilter);

});



/*
 
************LOAD Supervision SECTION SUB STEPPER END ********************* By |\/|ati
 
*/

function fnLoadSupervisionSection_Document(project_Id, Setup_Type_Id, grid_Id) {
    ajaxRequest({
        commandName: 'Project_SupervisionSection_Document_GetById',
        values: {
            Project_Id: project_Id,
            Setup_Type_Id: Setup_Type_Id,
            Language: _currentLanguage
        }, CallBack: fnLoadSupervisionSection_Document_CallBacck
    });

    localStorage.setItem('grid_id', grid_Id);
}

var fnLoadSupervisionSection_Document_CallBacck = function (inputDataJSON) {
    var pass_GridName = localStorage.getItem('grid_id');


    if (pass_GridName != "") {

        var gridTemplate = '';
        gridTemplate = "<button type='button' onclick='fn_supervision_section_transfer_file(this);' data-grid-name=" + pass_GridName + " class='btn-sm btn btn-info    waves-effect'style='font-size: small;'>Transfer</button>";



        var gridColumns = [
            { field: "entityId", title: "EntityId", hidden: true, width: 20 },
            { field: "entityType", title: "EntityType", hidden: true, width: 20 },
            /*{ field: "documentType", title: "DocumentType", hidden: true, width: 20 },*/
            { field: "setup_Type_Id", title: "setup_Type_Id", hidden: true, width: 20 },
            { field: "setup_TypeDetail_Id", title: "setup_TypeDetail_Id", hidden: true, width: 20 },
            { field: "attachmentId", title: "attachmentId", hidden: true, width: 20 },
            { title: "#", template: "<b>#= ++record #</b>", width: 15, },
            {
                field: "currentFileName",
                title: lblFile,
                hidden: false,
                width: 20,
                filterable: false,
                template: " #  if (currentFileName == null )" +
                    " { # <label class='pcoded-badge label label-danger'>" + lblNoAttachment + "</label># }                                                                     else if(currentFileName.split('.')[1]=='pdf')" +
                    " { #  <a  target='_blank' href='/UploadFile/#=currentFileName #'> <img class='' src='/Content/Images/pdf.png'        style='width:60%;cursor: pointer;'/> </a># }else if(currentFileName.split('.')[1]=='xlsx')" +
                    " { #  <a  target='_blank' href='/UploadFile/#=currentFileName #'> <img class='' src='/Content/Images/xls.png'        style='width:60%;cursor: pointer;'/> </a># }else if(currentFileName.split('.')[1]=='docs' || currentFileName.split('.')[1]=='docx'|| currentFileName.split('.')[1]=='doc')" +
                    " { #  <a  target='_blank' href='/UploadFile/#=currentFileName #'> <img class='' src='/Content/Images/docx.png'       style='width:60%;cursor: pointer;'/> </a># } else" +
                    " { # <a  target='_blank' href='/UploadFile/#=currentFileName #'>  <img class='' src='/Content/Images/attachment-icon.png' style='width:60%';cursor: pointer; /></a> #} #"



            },

            { field: "documentTypeName", title: lblFileName, hidden: false, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
            { field: "combineDocumentType", title: documentType, hidden: true, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
            {
                field: "releaseDate", title: lblIssueDate, hidden: false, width: 40, filterable: false,
                template: "   <label class=' '>#=releaseDate #</label>"
            },
            {
                field: "expiryDate", title: lblExpiryDate, hidden: false, width: 40, filterable: false,
                template: "#if(noExpiry != 1) { #<label class=''>#=expiryDate #</label> #} else {# <label class='badge  '>" + lblNoExpiry + "</label> #}#",

            },

            {
                field: "expiryIn", title: lblExpiresIn, hidden: true, width: 40, filterable: false,
                template: "#if(noExpiry == 1) { #<label class='badge  '>" + lblNoExpiry + "</label>#} else {#" +
                    " #if (totalDays <= 0) { #<span class='badge badge-danger'>#:expiryIn#</span> # } else if (totalDays <= 29) { # <span class='badge badge-warning'>#:expiryIn#</span> # } " +
                    "else {# <span class='badge badge-success'>#:expiryIn#</span> # }# #}#"

            },

            {
                title: status,
                field: 'status',
                width: 40,
                hidden: true,
                filterable: false,
                template: "#if (totalDays <= 0 && noExpiry == 0) { # <span class='badge badge-danger'>#:status#</span> # } else " +
                    "if (totalDays <= 29 && noExpiry == 0) { # <span class='badge badge-warning'>#:status#</span> # } else" +
                    "{# <span class='badge badge-success'>#:status#</span> # }#"

            }, {
                field: "attachmentRemarks",
                title: lblRemarks,
                width: 150,
                hidden: false,
                filterable: false,
                template: "  <span class='badge badge-danger'>#:attachmentRemarks#</span>  "

            }, {
                title: status,
                field: 'statusForCondition',
                width: 40,
                hidden: true,
                filterable: false


            },

            //{
            //    field: "", title: "", width: 60
            //    , template: "#if(localStorage.isSectionHead == 'Yes'){ #" +
            //        " <button type='button' onclick='fn_supervision_section_transfer_file(this);' data-grid-name=" + pass_GridName + " class='btn-outline-sm waves-effect    waves-effect'style='font-size: smaller;border:1px solid;'>" + lblTransfer + "</button> " +
            //        "#}" +
            //        "else if(createdBy !=JSON.parse(localStorage.getItem('User')).id && (statusForCondition !=null ? statusForCondition.match(/Return.*/) :statusForCondition )){ #" +
            //        " <button type='button' onclick='fn_supervision_section_transfer_file(this);' data-grid-name=" + pass_GridName + " class=' btn-sm btn-outline-sm waves-effect    waves-effect'style='font-size: smaller;border:1px solid;'>" + lblTransfer + "</button> " +
            //        "#}" +

            //        "else if(createdBy ==JSON.parse(localStorage.getItem('User')).id && statusForCondition ==null){ #" +
            //        "<a style='font-size:20px;cursor:pointer;' onClick= fn_delete_SupervisionSection_DocumentById(this)  title=" + lblDelete + "><span class='fa fa-trash'></span></a>   " +
            //        " <button type='button' onclick='fn_supervision_section_transfer_file(this);' data-grid-name=" + pass_GridName + " class=' btn-sm btn-outline-sm waves-effect    waves-effect'style='font-size: smaller;border:1px solid;'>" + lblTransfer + "</button> " +

            //        "#}#"

            //},

            //{
            //    field: "", title: "", width: 60

            //    , template: function (dataItem) {

            //        if (localStorage.isSectionHead == 'Yes') {
            //            return `<button type='button' onclick='fn_supervision_section_transfer_file(this);' data-grid-name=` + pass_GridName + ` class='btn-outline-sm waves-effect    waves-effect'style='font-size: smaller;border:1px solid;'>` + lblTransfer + `</button>`
            //        }
            //        else if (dataItem.createdBy != JSON.parse(localStorage.getItem('User')).id && (dataItem.statusForCondition != null ? dataItem.statusForCondition.match(/Return.*/) : dataItem.statusForCondition)) {
            //            return `<button type='button' onclick='fn_supervision_section_transfer_file(this);' data-grid-name=` + pass_GridName + ` class=' btn-sm btn-outline-sm waves-effect    waves-effect'style='font-size: smaller;border:1px solid;'>` + lblTransfer + `</button>`
            //        }
            //        else if (dataItem.createdBy == JSON.parse(localStorage.getItem('User')).id) {

            //            if (dataItem.statusForCondition == null) {
            //                return (
            //                    `<a style='font-size:20px;cursor:pointer;' onClick= fn_delete_SupervisionSection_DocumentById(this)  title=` + lblDelete + `><span class='fa fa-trash'></span></a>
            //                    <button type='button' onclick='fn_supervision_section_transfer_file(this);' data-grid-name=` + pass_GridName + ` class=' btn-sm btn-outline-sm waves-effect    waves-effect'style='font-size: smaller;border:1px solid;'>` + lblTransfer + `</button>`
            //                )
            //            } else {
            //                return (`<button type='button' onclick='fn_supervision_section_transfer_file(this);' data-grid-name=` + pass_GridName + ` class=' btn-sm btn-outline-sm waves-effect    waves-effect'style='font-size: smaller;border:1px solid;'>` + lblTransfer + `</button>`)
            //            }
            //        } else {
            //            return (``)
            //        }

            //    }
            //},

            {
                field: "", title: "", width: 60 //, hidden: 'statusForCondition !="Transfered" :' + false + '? ' + true + '' //, template: gridTemplate,
                , template: "#if(localStorage.isSectionHead == 'Yes' && localStorage.employeeDepartment.match(/Supervision Section.*/)){ #" +
                    "#if(createdBy ==JSON.parse(localStorage.getItem('User')).id){# <a style='font-size:20px;cursor:pointer;' onClick= fn_delete_SupervisionSection_DocumentById(this)  title=" + lblDelete + "><span class='fa fa-trash'></span></a>#}#" +
                    " <button type='button' onclick='fn_supervision_section_transfer_file(this);' data-grid-name=" + pass_GridName + " class='btn-outline-sm waves-effect    waves-effect'style='font-size: smaller;border:1px solid;'>" + lblTransfer + "</button> " +
                    "#}" +
                    "else if(createdBy ==JSON.parse(localStorage.getItem('User')).id && statusForCondition ==null && localStorage.employeeDepartment.match(/Supervision Section.*/)){ #" +
                    "<a style='font-size:20px;cursor:pointer;' onClick= fn_delete_SupervisionSection_DocumentById(this)  title=" + lblDelete + "><span class='fa fa-trash'></span></a>   " +
                    " <button type='button' onclick='fn_supervision_section_transfer_file(this);' data-grid-name=" + pass_GridName + " class=' btn-sm btn-outline-sm  waves-effect'style='font-size: smaller;border:1px solid;'>" + lblTransfer + "</button> " +
                    "#}" +
                    "else { ''} #"

            },


        ];
        bindKendoGrid(pass_GridName, 50, gridColumns, JSON.parse(inputDataJSON.Value), true, 490);
        localStorage.grid_id = '';
    }
};



function fn_delete_SupervisionSection_DocumentById(event) {

    var row = $(event).closest("tr");
    var gridId = $(event).closest("div").parent()[0].id;
    var grid = $("#" + gridId).data("kendoGrid");
    localStorage.setItem('grid__id', gridId);
    var dataItem = grid.dataItem(row);
    console.clear();
    console.log(dataItem)
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
                commandName: 'Project_SupervisionSection_Document_Delete',
                values: {
                    Id: dataItem.attachmentId,
                    ProjectId: project_Id,
                    CreatedBy: JSON.parse(localStorage.getItem('User')).id,
                    Document: dataItem.combineDocumentType,
                    Language: _currentLanguage
                }, CallBack: fn_delete_SupervisionSection_DocumentCallBack
            });
        }
    });
    var fn_delete_SupervisionSection_DocumentCallBack = function (response) {
        $('#frmAddUpdate_SupervisionSection_Document')[0].reset();
        $('#SupervisionSection_Document_Id').val(0);
        swal(response.Value);
        fnLoadSupervisionSection_Document(project_Id, $("#supervision-section-stepper").data('kendoStepper').selectedStep.options.Id, localStorage.getItem('grid__id'));

        localStorage.grid__id = '';

    }

}


//|Click Event
$('#btn-supervision-section-upload-document').click(function () {

    $('#SupervisionSection_Document_ProjectId').val(project_Id);
    $('#SupervisionSection_Document_Language').val(_currentLanguage);
    $('#SupervisionSection_Document_CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    $('#Project_Supervision_Section_Parent_Type_DDL_Text').val($("#supervision-section-stepper").data('kendoStepper').selectedStep.options.label);

    if (customValidateForm('frmAddUpdate_SupervisionSection_Document')) {
        //   if (!firstDateShouldBeGreaterThanSecondDate($('#SupervisionSection_Document_StartDate').val(), $('#SupervisionSection_Document_EndDate').val(), $('.lbl-startDate').text(), $('.lbl-endDate').text())) {
        //       return false;
        //   }
        buttonAddPleaseWait('btn-supervision-section-upload-document');

        $("#frmAddUpdate_SupervisionSection_Document").ajaxForm();
        var options = {
            success: function (response, statusText, jqXHR) {
                buttonRemovePleaseWait('btn-supervision-section-upload-document', save, 'save');

                document.getElementById("frmAddUpdate_SupervisionSection_Document").reset();
                swal(response);

                var messageResponseParse = JSON.parse(response);
                if (messageResponseParse.type == undefined) {
                    messageResponseParse = JSON.parse(messageResponseParse);
                } if (messageResponseParse.type == undefined) {
                    messageResponseParse = JSON.parse(messageResponseParse);
                }
                fnUpdateSupervisionSection_Employee_document_CompletionDate();

            },
            error: function (xhr, status, error) {
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                buttonRemovePleaseWait('btn-supervision-section-upload-document', save, 'save');
                alert(errmsg);
            },
            complete: function () {
                buttonRemovePleaseWait('btn-supervision-section-upload-document', save, 'save');
            }
        };
        $("#frmAddUpdate_SupervisionSection_Document").ajaxSubmit(options);
    }
    else {
        buttonRemovePleaseWait('btn-supervision-section-upload-document', save, 'save');
        return false;
    }
});

//|End Click Event
function fnUpdateSupervisionSection_Employee_document_CompletionDate() {
    ajaxRequest({
        commandName: 'Project_Linked_Multiple_Update_Employees_Work_EndDate_By_Paramters', values: {

            Project_Id: project_Id,
            UserId: JSON.parse(localStorage.getItem('User')).id,
            Employee_Id: JSON.parse(localStorage.getItem('User')).employeeId,
            Selected_Document_Step_Id: $("#supervision-section-stepper").data('kendoStepper').selectedStep.options.Id,
            Language: _currentLanguage
        }, CallBack: ''

    });

    var gridId_supervisionSection = $('.SupervisionSection_Tab.active').find('.k-grid').attr('id');
    fnLoadSupervisionSection_Document(project_Id, $("#supervision-section-stepper").data('kendoStepper').selectedStep.options.Id, gridId_supervisionSection);

    $('.close-supervision-upload-modal').click();
}

$('#btn-supervision-section-load-upload-document-modal').click(function () {
    document.getElementById("frmAddUpdate_SupervisionSection_Document").reset();

    if ($("#supervision-section-stepper").data('kendoStepper').selectedStep.options.Id != undefined) {
        fn_IsWorkStarted_SupervisionSection();
    } else {
        $($($(this).parent())[0]).append(('<h5 class="lblPleaseSelectSection" style="background-color:#f9df6c4f">' + lblPleaseSelectSection + '</h5>'))
        $("#supervision-section-stepper").data('kendoStepper').element.css('background-color', '#f9df6c4f');

        setTimeout(function () {
            $('.lblPleaseSelectSection').empty();
            $("#supervision-section-stepper").data('kendoStepper').element.css('background-color', 'transparent');
        }, 1500);

    }
    

});
function fn_IsWorkStarted_SupervisionSection() {
    ajaxRequest({
        commandName: 'Project_Employees_Started_Work', values: {

            Project_Id: project_Id,
            UserId: JSON.parse(localStorage.getItem('User')).id,
            Employee_Id: JSON.parse(localStorage.getItem('User')).employeeId,
            Selected_Document_Step_Id: $("#supervision-section-stepper").data('kendoStepper').selectedStep.options.Id,
            Language: _currentLanguage
        }, CallBack: fn_IsWorkStarted_SupervisionSection_Callback
    });
    function fn_IsWorkStarted_SupervisionSection_Callback(response) {



        //$('.employee-work-date').text(JSON.parse(response.Value).employeeTaskDate);
        //$('.employee-work-time').text(JSON.parse(response.Value).employeeTaskTime);

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
                            Selected_Document_Step_Id: $("#supervision-section-stepper").data('kendoStepper').selectedStep.options.Id,
                            Language: _currentLanguage
                        }, CallBack: ''
                    });

                    //After ajax call .
                    $('#load-supervision-section-model').click();

                    if (JSON.parse(response.Value).assign_employee_StartDate != null) {
                        setTimeout(function () {


                            $('.show-hide-employee-start-datetime').show();
                            $('.show-hide-employee-start-datetime').addClass('btn-success')

                            $('.show-hide-assign-start-datetime').show();
                            $('.show-hide-assign-start-datetime').addClass('btn-info')

                            $('.show-hide-completion-start-datetime').show();
                            $('.show-hide-completion-start-datetime').addClass('btn-danger')


                            $('.assign-employee-start-date').text(JSON.parse(response.Value).assign_employee_StartDate);
                            $('.assign-employee-end-date').text(JSON.parse(response.Value).assign_employee_CompletionDate);

                            $('.employee-work-date').text(JSON.parse(response.Value).employeeTask_StartDate);
                            $('.employee-work-time').text(JSON.parse(response.Value).employeeTask_StartTime);
                            $('.show-hide-employee-task-area').show();
                        }, 100);
                    } else {

                        $('.show-hide-employee-task-area').hide();
                    }

                    loadProject_SupervisionSectiondownLists();
                    loadProject_SupervisionSection_SubSection_DDL('Project_SupervisionSection_SetupDetailTypeDDL', '0');

                }
            });
        } else {

            //After ajax call .  


            $('#load-supervision-section-model').click();
            if (JSON.parse(response.Value).assign_employee_StartDate != null) {
                setTimeout(function () {
                    $('.show-hide-employee-start-datetime').show();
                    $('.show-hide-employee-start-datetime').addClass('btn-success')

                    $('.show-hide-assign-start-datetime').show();
                    $('.show-hide-assign-start-datetime').addClass('btn-info')

                    $('.show-hide-completion-start-datetime').show();
                    $('.show-hide-completion-start-datetime').addClass('btn-danger')


                    $('.assign-employee-start-date').text(JSON.parse(response.Value).assign_employee_StartDate);
                    $('.assign-employee-end-date').text(JSON.parse(response.Value).assign_employee_CompletionDate);

                    $('.employee-work-date').text(JSON.parse(response.Value).employeeTask_StartDate);
                    $('.employee-work-time').text(JSON.parse(response.Value).employeeTask_StartTime);
                    $('.show-hide-employee-task-area').show();
                }, 100);
            } else {

                $('.show-hide-employee-task-area').hide();
            }
            loadProject_SupervisionSectiondownLists();
            //   loadProject_SupervisionSection_SubSection_DDL('Project_SupervisionSection_SetupDetailTypeDDL', '0');
        }
    }

}

function loadProject_SupervisionSectiondownLists() { ajaxRequest({ commandName: 'DDL_SUPERVISION_SECTION_Project_MainType', values: { Language: _currentLanguage }, CallBack: fnloadProject_SupervisionSectiondownListsCallBack }); }
function fnloadProject_SupervisionSectiondownListsCallBack(response) {

    $("#Project_SupervisionSection_Parent_Type_DDL").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        //  value: -1,
        dataSource: JSON.parse(response.Value),
        popup: { appendTo: $("#SupervisionSection_ParentSection_container") },
        select: fn_SupervisionSection_OnSelect_Section_DDL,

    });

    setTimeout(function () {
        $("#Project_SupervisionSection_Parent_Type_DDL").data("kendoDropDownList").value($("#supervision-section-stepper").data('kendoStepper').selectedStep.options.Id);
        loadProject_SupervisionSection_SubSection_DDL('Project_SupervisionSection_SetupDetailTypeDDL', $("#supervision-section-stepper").data('kendoStepper').selectedStep.options.label.trim());

    }, 100);

}

function fn_SupervisionSection_OnSelect_Section_DDL(e) {

    var selected_Id = e.dataItem.id;
    $('#Project_SupervisionSection_Setup_SetupType_Id').val(selected_Id);
    var selected_Text = e.dataItem.name;

    loadProject_SupervisionSection_SubSection_DDL('Project_SupervisionSection_SetupDetailTypeDDL', selected_Text.trim());


};



function loadProject_SupervisionSection_SubSection_DDL(controlId, typeName, selectText = null) {

    ajaxRequest({
        //commandName: 'Setup_Type_DropdownByTypeName_New',
        commandName: 'Setup_Main_Section_DropdownByTypeName',
        values: { TypeName: typeName, Language: _currentLanguage }, controlId, CallBack: loadProject_SupervisionSection_SubSection_DDLCallBackk
    });
}
var loadProject_SupervisionSection_SubSection_DDLCallBackk = function (loadjQueryDropdownListResponse, controlId) {


    $("#" + controlId).kendoDropDownList({
        dataValueField: "id",
        dataTextField: "name",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(loadjQueryDropdownListResponse.Value),
        popup: { appendTo: $("#SupervisionSection_SubSection_container") },
        select: onSelect_SupervisionSection_SubSection_DDL,
    });

}
function onSelect_SupervisionSection_SubSection_DDL(e) {
    var selected_Id = e.dataItem.id;
    $('#Project_SupervisionSection_Entity_Id').val(selected_Id);
    $('#Project_Supervision_Section_Parent_Type_DDL_Text').val(e.dataItem.name.trim());

};


function fnCheck_NoExpiry_SupervisionSection(e, areaName) {

    if (areaName == 'EndDate') {
        $('#SupervisionSection_Document_NoExpiry_Call')[0].checked = false
        $('#SupervisionSection_Document_NoExpiry').val(0);
    } else {

        $('#SupervisionSection_Document_NoExpiry').val(1);
        var checkExpiry = $('#SupervisionSection_Document_NoExpiry_Call').is(':Checked', true);
        checkExpiry == true ? $('#SupervisionSection_Document_EndDate').val('') : $('#SupervisionSection_Document_NoExpiry_Call')[0].checked = false;
    }

}
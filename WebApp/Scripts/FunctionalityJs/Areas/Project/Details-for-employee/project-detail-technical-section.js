
var project_Id = (new URL(location.href)).searchParams.get('id');
/*

************LOAD TECHNICAL SECTION SUB STEPPER ********************* By |\/|ati

*/


function loadProject_TechnicalSectiondownList(technicalSection_callingArea) {
    ajaxRequest({ commandName: 'STEPPER_SUB_SECTION_MENU', values: { ParentType: 'TechnicalSection', Project_Id: project_Id, Language: _currentLanguage }, CallBack: fnloadProject_TechnicalSectiondownListCallBack });
    localStorage.setItem('TechnicalSection_Menu_Area', technicalSection_callingArea);

}
function fnloadProject_TechnicalSectiondownListCallBack(response) { stepper_TECHNICAL_SECTION(response) }

function stepper_TECHNICAL_SECTION(response) {


    var step_Columns = []
    //  console.log(JSON.parse(response.Value));
    for (var i = 0; i < JSON.parse(response.Value).length; i++) {
     //   console.log(JSON.parse(response.Value)[i].parent_Type);
        //************************ CHANGE COLOR OF MAIN STEPPER MENU BY |\/|ati 
        if (JSON.parse(response.Value)[i].parent_Type == 'TechnicalSection' && JSON.parse(response.Value)[i].project_sub_stepper_menu_error == true) {
            error_PROJECT_MAIN_SECTION_Technical_Stepper = true;
        }


        step_Columns.push({
            Id: JSON.parse(response.Value)[i].id,
            label: JSON.parse(response.Value)[i].name,
            error: JSON.parse(response.Value)[i].project_sub_stepper_menu_error,
            enabled: JSON.parse(response.Value)[i].project_sub_stepper_menu_enabled,
            approved_file: JSON.parse(response.Value)[i].approved_file,
            return_file: JSON.parse(response.Value)[i].return_file,
            selected: JSON.parse(response.Value)[i].project_sub_stepper_menu_selected,
            // successIcon: JSON.parse(response.Value)[i].project_sub_stepper_menu_successIcon,
        });

        if (JSON.parse(response.Value)[i].project_sub_stepper_menu_successIcon == 'check') {
            step_Columns.push({
                label: "Completed",
                enabled: false,
                selected: true,
                successIcon: "k-icon k-i-check",
                iconTemplate: function (e) { return '<strong> </strong>'; }
            });
        }
    }

    /*
    setTimeout(function () {

        if (localStorage.getItem('TechnicalSection_Menu_Area') != '') {

            progressbar_subSection(JSON.parse(response.Value), localStorage.getItem('TechnicalSection_Menu_Area'));
        }
    }, 100)
    */
    bindkendoStepper('technical-section-stepper', false, step_Columns, '', stepper_Fn_TechnicalSection_Onselect, 'auto', "vertical");
    if ($("#technical-section-stepper").data('kendoStepper').selectedStep.options.Id == undefined) {
         
        var stepper_t = JSON.parse(response.Value)
        const enabledObjects_t = stepper_t.filter(item_t => item_t.project_sub_stepper_menu_selected === 1);
        fn_Project_Dynamic_Section_Tab(enabledObjects_t[0].conditionalField, enabledObjects_t[0].id)


    } else {
        fn_Project_Dynamic_Section_Tab($("#technical-section-stepper").data('kendoStepper').selectedStep.options.label, $("#technical-section-stepper").data('kendoStepper').selectedStep.options.Id)

    }
}
function stepper_Fn_TechnicalSection_Onselect(e) {

    var stepper_data = e.step.options;
    //e.step.element 
    // fnCheckProject_SubSection_Tab(stepper_data.label, stepper_data.Id);



}

$("#technical-section-stepper").on("click", '.k-step', function (e) {
    e.stopPropagation();


    var currentStep = $(this).select();
    var stepName = 0;
    if (currentStep.find('a').attr('title') != '') {
        stepName = currentStep.find('a').attr('title').trim();
    }
    var stepIdFromFilter = 0;
    $.grep($("#technical-section-stepper").data('kendoStepper').options.steps, function (obj) {

        obj.label == stepName ? (stepIdFromFilter = obj.Id) : 0;
    });
    //  fnCheckProject_SubSection_Tab(stepName, stepIdFromFilter)
    fn_Project_Dynamic_Section_Tab(stepName, stepIdFromFilter)
});


/*
 
************LOAD TECHNICAL SECTION SUB STEPPER END ********************* By |\/|ati
 
*/

function fnLoadTechnicalSection_Document(project_Id, Setup_Type_Id, grid_Id) {
    ajaxRequest({
        commandName: 'Project_TechnicalSection_Document_GetById',
        values: {
            Project_Id: project_Id,
            Setup_Type_Id: Setup_Type_Id,
            Language: _currentLanguage
        }, CallBack: fnLoadTechnicalSection_Document_CallBacck
    });

    localStorage.setItem('grid_id', grid_Id);
}

var fnLoadTechnicalSection_Document_CallBacck = function (inputDataJSON) {
    var pass_GridName = localStorage.getItem('grid_id');

    //console.log(JSON.parse(inputDataJSON.Value));
    if (pass_GridName != "") {

        var gridTemplate = '';
        gridTemplate = "<button type='button' onclick='fn_technical_section_transfer_file(this);' data-grid-name=" + pass_GridName + " class='btn-sm btn btn-info    waves-effect'style='font-size: small;'>Transfer</button>";



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
            { field: "combineDocumentType", title: lblFileName, hidden: true, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
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
            //    field: "", title: "", width: 40 //, template: gridTemplate,
            //    //  , template: " <a style='font-size:20px;cursor:pointer;' onClick= fn_delete_TechnicalSection_DocumentById(this)  title=" + lblDelete + "><span class='fa fa-trash'></span></a>  "
            //    , template: "#if(createdBy ==JSON.parse(localStorage.getItem('User')).id){ #" +
            //        "<a style='font-size:20px;cursor:pointer;' onClick= fn_delete_TechnicalSection_DocumentById(this)  title=" + lblDelete + "><span class='fa fa-trash'></span></a>  # }" +
            //        "else {#    #}#"


            //},

            //{
            //    field: "", title: "", width: 60 //, hidden: 'statusForCondition !="Transfered" :' + false + '? ' + true + '' //, template: gridTemplate,
            //    , template: "#if(localStorage.isSectionHead == 'Yes'){ #" +
            //        " <button type='button' onclick='fn_technical_section_transfer_file(this);' data-grid-name=" + pass_GridName + " class='btn-outline-sm waves-effect    waves-effect'style='font-size: smaller;border:1px solid;'>" + lblTransfer + "</button> " +
            //        "#}" +
            //        "else if(createdBy ==JSON.parse(localStorage.getItem('User')).id && (statusForCondition !=null ? statusForCondition.match(/Return.*/) :statusForCondition )){ #" +

            //        //" <button type='button' onclick='fn_technical_section_transfer_file(this);' data-grid-name=" + pass_GridName + " class=' btn-sm btn-outline-sm waves-effect    waves-effect'style='font-size: smaller;border:1px solid;'>" + lblTransfer + "</button> " +
            //        "#}" +
            //        //"else if(createdBy ==JSON.parse(localStorage.getItem('User')).id && (statusForCondition !=null ? statusForCondition.match(/Transfer.*/) :statusForCondition )){ #" +

            //        //"#}" +
            //        "else if(createdBy ==JSON.parse(localStorage.getItem('User')).id && statusForCondition ==null){ #" +
            //        "<a style='font-size:20px;cursor:pointer;' onClick= fn_delete_TechnicalSection_DocumentById(this)  title=" + lblDelete + "><span class='fa fa-trash'></span></a>   " +
            //        " <button type='button' onclick='fn_technical_section_transfer_file(this);' data-grid-name=" + pass_GridName + " class=' btn-sm btn-outline-sm waves-effect    waves-effect'style='font-size: smaller;border:1px solid;'>" + lblTransfer + "</button> " +

            //        "#}#"

            //},

            {
                field: "", title: "", width: 60 //, hidden: 'statusForCondition !="Transfered" :' + false + '? ' + true + '' //, template: gridTemplate,
                , template: "#if(localStorage.isSectionHead == 'Yes' && localStorage.employeeDepartment.match(/Technical Section.*/)){ #" +
                    "#if(createdBy ==JSON.parse(localStorage.getItem('User')).id  && statusForCondition ==null){# <a style='font-size:20px;cursor:pointer;' onClick= fn_delete_TechnicalSection_DocumentById(this)  title=" + lblDelete + "><span class='fa fa-trash'></span></a>#}#" +
                    " <button type='button' onclick='fn_technical_section_transfer_file(this);' data-grid-name=" + pass_GridName + " class='btn-outline-sm waves-effect    waves-effect'style='font-size: smaller;border:1px solid;'>" + lblTransfer + "</button> " +
                    "#}" +
                    "else if(createdBy ==JSON.parse(localStorage.getItem('User')).id && statusForCondition ==null && localStorage.employeeDepartment.match(/Technical Section.*/)){ #" +
                    "<a style='font-size:20px;cursor:pointer;' onClick= fn_delete_TechnicalSection_DocumentById(this)  title=" + lblDelete + "><span class='fa fa-trash'></span></a>   " +
                    " <button type='button' onclick='fn_technical_section_transfer_file(this);' data-grid-name=" + pass_GridName + " class=' btn-sm btn-outline-sm waves-effect'style='font-size: smaller;border:1px solid;'>" + lblTransfer + "</button> " +
                    "#}" +
                    "else if(statusForCondition !=null && localStorage.employeeDepartment.match(/Technical Section.*/)){ #" +
                    "  #if(!statusForCondition.match(/approve.*/) && localStorage.employeeDepartment.match(/Technical Section.*/)){ # <button type='button' onclick='fn_technical_section_transfer_file(this);' data-grid-name=" + pass_GridName + " class=' btn-sm btn-outline-sm waves-effect'style='font-size: smaller;border:1px solid;'>" + lblTransfer + "</button> #}#" +
                    "#}" +
                    "else { ''} #"

                    //"else if(createdBy ==JSON.parse(localStorage.getItem('User')).id && statusForCondition ==null && localStorage.employeeDepartment.match(/Technical Section.*/)){ #" +
                    //"<a style='font-size:20px;cursor:pointer;' onClick= fn_delete_TechnicalSection_DocumentById(this)  title=" + lblDelete + "><span class='fa fa-trash'></span></a>   " +
                    //" <button type='button' onclick='fn_technical_section_transfer_file(this);' data-grid-name=" + pass_GridName + " class=' btn-sm btn-outline-sm  waves-effect'style='font-size: smaller;border:1px solid;'>" + lblTransfer + "</button> " +
                    //"#}" +
                    //"else { ''} #"
                     
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
                    Id: dataItem.attachmentId,
                    FileName: dataItem.currentFileName,
                    CreatedBy: JSON.parse(localStorage.getItem('User')).id,
                    ProjectId: project_Id,
                    Document: dataItem.combineDocumentType,
                    Language: _currentLanguage
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
    $('#Project_Technical_Section_Parent_Type_DDL_Text').val($("#technical-section-stepper").data('kendoStepper').selectedStep.options.label);

    if (customValidateForm('frmAddUpdate_TechnicalSection_Document')) {
        //  if (!firstDateShouldBeGreaterThanSecondDate($('#TechnicalSection_Document_StartDate').val(), $('#TechnicalSection_Document_EndDate').val(), $('.lbl-startDate').text(), $('.lbl-endDate').text())) {
        //      return false;
        //  }
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
                fnUpdateTechnicalSection_Employee_document_CompletionDate();
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
function fnUpdateTechnicalSection_Employee_document_CompletionDate() {
    ajaxRequest({
        commandName: 'Project_Linked_Multiple_Update_Employees_Work_EndDate_By_Paramters', values: {

            Project_Id: project_Id,
            UserId: JSON.parse(localStorage.getItem('User')).id,
            Employee_Id: JSON.parse(localStorage.getItem('User')).employeeId,
            Selected_Document_Step_Id: $("#technical-section-stepper").data('kendoStepper').selectedStep.options.Id,
            Language: _currentLanguage
        }, CallBack: ''

    });
    var gridId_technicalSection = $('.TechnicalSection_Tab.active').find('.k-grid').attr('id');
    fnLoadTechnicalSection_Document(project_Id, $("#technical-section-stepper").data('kendoStepper').selectedStep.options.Id, gridId_technicalSection);
    $('.close-technical-upload-modal').click();
}



$('#btn-technical-section-load-upload-document-modal').click(function () {
    document.getElementById("frmAddUpdate_TechnicalSection_Document").reset();
    if ($("#technical-section-stepper").data('kendoStepper').selectedStep.options.Id != undefined) {
        fn_IsWorkStarted_TechnicalSection();
    } else {
        $($($(this).parent())[0]).append(('<h5 class="lblPleaseSelectSection" style="background-color:#f9df6c4f">' + lblPleaseSelectSection + '</h5>'))
        $("#technical-section-stepper").data('kendoStepper').element.css('background-color', '#f9df6c4f');

        setTimeout(function () {
            $('.lblPleaseSelectSection').empty();
            $("#technical-section-stepper").data('kendoStepper').element.css('background-color', 'transparent');
        }, 1500);

    }



});

//***************** FN TRANSFER FILE AREA END------------------------BY |\/|ati

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
                            Selected_Document_Step_Id: $("#technical-section-stepper").data('kendoStepper').selectedStep.options.Id,
                            Language: _currentLanguage
                        }, CallBack: ''
                    });

                    //After ajax call .
                    $('#load-technical-section-model').click();

                    if (JSON.parse(response.Value).assign_employee_StartDate != null) {
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
                    } else {

                        $('.show-hide-employee-task-area').hide();
                    }

                    loadProject_TechnicalSectiondownLists()
                    loadProject_TechnicalSection_SubSection_DDL('Project_TechnicalSection_SetupDetailTypeDDL', '0');
                    setTimeout(function () { $("#Project_TechnicalSection_SetupDetailTypeDDL").data("kendoDropDownList").toggle(); }, 500);

                }
            });
        } else {

            //After ajax call .  


            $('#load-technical-section-model').click();

            if (JSON.parse(response.Value).assign_employee_StartDate != null) {
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
            } else {

                $('.show-hide-employee-task-area').hide();
            }
            loadProject_TechnicalSectiondownLists()
            //  loadProject_TechnicalSection_SubSection_DDL('Project_TechnicalSection_SetupDetailTypeDDL', '0');
            setTimeout(function () { $("#Project_TechnicalSection_SetupDetailTypeDDL").data("kendoDropDownList").toggle(); }, 500);

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

    ajaxRequest({
        //commandName: 'Setup_Type_DropdownByTypeName_New',
        commandName: 'Setup_Main_Section_DropdownByTypeName',
        values: { TypeName: typeName, Language: _currentLanguage }, controlId, CallBack: loadProject_TechnicalSection_SubSection_DDLCallBackk
    });
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

    $('#Project_Technical_Section_Parent_Type_DDL_Text').val(e.dataItem.name.trim());

    $('#Project_TechnicalSection_Entity_Id').val(selected_Id);
};



function fnCheck_NoExpiry_TechnicalSection(e, areaName) {

    if (areaName == 'EndDate') {
        $('#TechnicalSection_Document_NoExpiry_Call')[0].checked = false
        $('#TechnicalSection_Document_NoExpiry').val(0);
    } else {

        $('#TechnicalSection_Document_NoExpiry').val(1);
        var checkExpiry = $('#TechnicalSection_Document_NoExpiry_Call').is(':Checked', true);
        checkExpiry == true ? $('#TechnicalSection_Document_EndDate').val('') : $('#TechnicalSection_Document_NoExpiry_Call')[0].checked = false;
    }

}
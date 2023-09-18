
var project_Id = (new URL(location.href)).searchParams.get('id');

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
    // console.log(JSON.parse(response.Value));
    var step_Columns = []
    var stepper_d = JSON.parse(response.Value)
    for (var i = 0; i < stepper_d.length; i++) {
        // console.log(stepper_d[i].parent_Type);
        //************************ CHANGE COLOR OF MAIN STEPPER MENU BY |\/|ATI 
        if (stepper_d[i].parent_Type == 'DesignSection' && stepper_d[i].project_sub_stepper_menu_error == true) {
            error_PROJECT_MAIN_SECTION_Design_Stepper = true;
        }
        // console.log(stepper_d);

        step_Columns.push({
            Id: stepper_d[i].id,
            label: stepper_d[i].name,
            error: stepper_d[i].project_sub_stepper_menu_error,
            //    enabled: stepper_d[i].project_sub_stepper_menu_enabled,
            approved_file: stepper_d[i].approved_file,
            return_file: stepper_d[i].return_file,
            transfer_file: stepper_d[i].transfer_file,
            selected: stepper_d[i].project_sub_stepper_menu_selected,
            //  icon: "circle",
            // successIcon: stepper_d[i].project_sub_stepper_menu_successIcon,
        });






        if (stepper_d[i].project_sub_stepper_menu_successIcon == 'check') {
            step_Columns.push({
                label: "Completed",
                enabled: false,
                selected: true,
                successIcon: "k-icon k-i-check",
                iconTemplate: function (e) { return '<strong> </strong>'; }
            });
        }
    }


    bindkendoStepper('design-section-stepper', false, step_Columns, '', stepper_Fn_DesignSection_Onselect, 'auto', "vertical");
    setTimeout(function () {


        if ($("#design-section-stepper").data('kendoStepper').selectedStep.options.Id == undefined) {

            var stepperInstance = $("#design-section-stepper").data('kendoStepper');
            //  fnCheckProject_SubSection_Tab(stepperInstance.options.steps[0].label, stepperInstance.options.steps[0].Id)
            const enabledObjects = stepper_d.filter(item => item.project_sub_stepper_menu_selected === 1);

            // console.log(enabledObjects);
            // fn_Project_Dynamic_Section_Tab(stepperInstance.options.steps[0].label, stepperInstance.options.steps[0].Id)
            fn_Project_Dynamic_Section_Tab(enabledObjects[0].conditionalField, enabledObjects[0].id)
        } else {



            fn_Project_Dynamic_Section_Tab($("#design-section-stepper").data('kendoStepper').selectedStep.options.label, $("#design-section-stepper").data('kendoStepper').selectedStep.options.Id)

        }
    }, 100);


}


function stepper_Fn_DesignSection_Onselect(e) {

    var stepper_data = e.step.options;
    //e.step.element 
    //  fnCheckProject_SubSection_Tab(stepper_data.label, stepper_data.Id);



}
function onActivate(e) {

    var stepper_data = e.step.options;
    //console.log("Activated: " + e.step.options.label);
}


$("#design-section-stepper").on("click", '.k-step', function (e) {
    e.stopPropagation();


    var stepperInstance = $("#design-section-stepper").data('kendoStepper');
    var currentStep = $(this).select();
    var stepName = 0;
    if (currentStep.find('a').attr('title') != '') {
        stepName = currentStep.find('a').attr('title').trim();
    }
    var stepIdFromFilter = 0;
    $.grep(stepperInstance.options.steps, function (obj) {

        obj.label == stepName ? (stepIdFromFilter = obj.Id) : 0;
    });

    //  fnCheckProject_SubSection_Tab(stepName, stepIdFromFilter)
    fn_Project_Dynamic_Section_Tab(stepName, stepIdFromFilter)
});




/*
 
************LOAD DESING SECTION SUB STEPPER END ********************* By |\/|ATI
 
*/

function fnLoadDesignSection_Document(project_Id, Setup_Type_Id, grid_Id) {
    ajaxRequest({
        commandName: 'Project_DesignSection_Document_GetById', values: { Project_Id: project_Id, Setup_Type_Id: Setup_Type_Id, Language: _currentLanguage }, CallBack: fnLoadDesignSection_Document_CallBacck
    });
    localStorage.setItem('grid_id', grid_Id);


}

var fnLoadDesignSection_Document_CallBacck = function (inputDataJSON) {
    var pass_GridName = localStorage.getItem('grid_id');

    //  var MainStepper_ = $('#project-section-stepper').data('kendoStepper').selectedStep.options.conditionalField;
    //  console.log(MainStepper_);
    // console.log(JSON.parse(inputDataJSON.Value));
    if (pass_GridName != "") {

        var gridTemplate = '';

        gridTemplate = "<button type='button' onclick='fn_transfer_file(this);' data-grid-name=" + pass_GridName + " class='btn-sm btn btn-info    waves-effect'style='font-size: small;'>Transfer</button>";



        var gridColumns = [
            { field: "entityId", title: "EntityId", hidden: true, width: 20 },
            { field: "entityType", title: "EntityType", hidden: true, width: 20 },
            { field: "documentType", title: "DocumentType", hidden: true, width: 20 },
            { field: "setup_Type_Id", title: "setup_Type_Id", hidden: true, width: 20 },
            { field: "setup_TypeDetail_Id", title: "setup_TypeDetail_Id", hidden: true, width: 20 },
            { field: "attachmentId", title: "attachmentId", hidden: true, width: 20 },
            { field: "DesignSection_Document_Id", title: "DesignSection_Document_Id", hidden: true },
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

            },
            //, {
            //    field: "employee_uploading_document_time_status", title: " ", hidden: false, width: 40, filterable: false,
            //    template: "   <label class='badge   badge-info'>#=employee_uploading_document_time_status #</label>",

            //},
            /* {
                 field: "", title: "", width: 40 //, template: gridTemplate,
 
                  , template: "#if(createdBy ==JSON.parse(localStorage.getItem('User')).id){ #" +
                     "<a style='font-size:20px;cursor:pointer;' onClick= fn_delete_DesignSection_SubSection_DocumentById(this)  title=" + lblDelete + "><span class='fa fa-trash'></span></a>  # }" +
                     "else {#    #}#"
 
             },
             */

            {
                field: "", title: "", width: 60 //, hidden: 'statusForCondition !="Transfered" :' + false + '? ' + true + '' //, template: gridTemplate,
                , template: "#if(localStorage.isSectionHead == 'Yes' && localStorage.employeeDepartment.match(/Design Section.*/)){ #" +
                    "#if(createdBy ==JSON.parse(localStorage.getItem('User')).id){# <a style='font-size:20px;cursor:pointer;' onClick= fn_delete_DesignSection_SubSection_DocumentById(this)  title=" + lblDelete + "><span class='fa fa-trash'></span></a>#}#" +
                    " <button type='button' onclick='fn_transfer_file(this);' data-grid-name=" + pass_GridName + " class='btn-outline-sm waves-effect    waves-effect'style='font-size: smaller;border:1px solid;'>" + lblTransfer + "</button> " +
                    "#}" +
                    "else if(createdBy ==JSON.parse(localStorage.getItem('User')).id && statusForCondition ==null && localStorage.employeeDepartment.match(/Design Section.*/)){ #" +
                    "<a style='font-size:20px;cursor:pointer;' onClick= fn_delete_DesignSection_SubSection_DocumentById(this)  title=" + lblDelete + "><span class='fa fa-trash'></span></a>   " +
                    " <button type='button' onclick='fn_transfer_file(this);' data-grid-name=" + pass_GridName + " class=' btn-sm btn-outline-sm waves-effect'style='font-size: smaller;border:1px solid;'>" + lblTransfer + "</button> " +
                    "#}" +
                    "else if(statusForCondition !=null && localStorage.employeeDepartment.match(/Design Section.*/)){ #" +
                    "  #if(!statusForCondition.match(/approve.*/) && localStorage.employeeDepartment.match(/Design Section.*/)){ # <button type='button' onclick='fn_transfer_file(this);' data-grid-name=" + pass_GridName + " class=' btn-sm btn-outline-sm waves-effect'style='font-size: smaller;border:1px solid;'>" + lblTransfer + "</button> #}#" +
                    "#}" +
                    "else { ''} #"


            },






        ];
        bindKendoGrid(pass_GridName, 50, gridColumns, JSON.parse(inputDataJSON.Value), true, 490);
        localStorage.grid_id = '';
    }
};

function fn_delete_DesignSection_SubSection_DocumentById(event) {

    var row = $(event).closest("tr");
    var gridId = $(event).closest("div").parent()[0].id;
    var grid = $("#" + gridId).data("kendoGrid");
    
    localStorage.setItem('grid__id', gridId);
    var dataItem = grid.dataItem(row);
   // console.log(dataItem.currentFileName);
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
                commandName: 'Project_DesignSection_Document_Delete',
                values: {
                    Id: dataItem.attachmentId,
                    FileName: dataItem.currentFileName,
                    CreatedBy: JSON.parse(localStorage.getItem('User')).id,
                    ProjectId: project_Id,
                    Document: dataItem.combineDocumentType,
                    Language: _currentLanguage
                }, CallBack: fn_delete_DesignSection_SubSection_DocumentCallBack
            });
        }
    });
    var fn_delete_DesignSection_SubSection_DocumentCallBack = function (response) {

        $('#DesignSection_Document_Id').val(0);
        swal(response.Value);

        fnLoadDesignSection_Document(project_Id, $("#design-section-stepper").data('kendoStepper').selectedStep.options.Id, localStorage.getItem('grid__id'));
        $('#frmAddUpdate_DesignSection_Document')[0].reset();


        localStorage.grid__id = '';

    }

}
var isEmployeeWorkStarted = 0;
$('#btn-load-upload-document').click(function () {

    if ($("#design-section-stepper").data('kendoStepper').selectedStep.options.Id != undefined) {
        fn_IsWorkStarted();
    } else {
        $($($(this).parent())[0]).append(('<h5 class="lblPleaseSelectSection" style="background-color:#f9df6c4f">' + lblPleaseSelectSection + '</h5>'))
        $("#design-section-stepper").data('kendoStepper').element.css('background-color', '#f9df6c4f');

        setTimeout(function () {

            $('.lblPleaseSelectSection').empty();
            $("#design-section-stepper").data('kendoStepper').element.css('background-color', 'transparent');
        }, 1500);

    }



});

function fn_IsWorkStarted() {
    ajaxRequest({
        commandName: 'Project_Employees_Started_Work', values: {

            Project_Id: project_Id,
            UserId: JSON.parse(localStorage.getItem('User')).id,
            Employee_Id: JSON.parse(localStorage.getItem('User')).employeeId,
            Selected_Document_Step_Id: $("#design-section-stepper").data('kendoStepper').selectedStep.options.Id,
            Language: _currentLanguage
        }, CallBack: fn_IsWorkStarted_Callback
    });
    function fn_IsWorkStarted_Callback(response) {


        //  console.log(JSON.parse(response.Value));

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
                            Selected_Document_Step_Id: $("#design-section-stepper").data('kendoStepper').selectedStep.options.Id,
                            Language: _currentLanguage
                        }, CallBack: ''
                    });

                    //After ajax call .
                    $('#load-model').click();


                    if (JSON.parse(response.Value).assign_employee_StartDate != null) {
                        setTimeout(function () {

                            $('.show-hide-employee-start-datetime').show();
                            $('.show-hide-employee-start-datetime').addClass('btn-success')

                            $('.show-hide-assign-start-datetime').show();
                            $('.show-hide-assign-start-datetime').addClass('btn-info')

                            $('.show-hide-completion-start-datetime').show();
                            $('.show-hide-completion-start-datetime').addClass('btn-danger')
                            $('.show-hide-employee-task-area').show();

                            $('.assign-employee-start-date').text(JSON.parse(response.Value).assign_employee_StartDate);
                            $('.assign-employee-end-date').text(JSON.parse(response.Value).assign_employee_CompletionDate);

                            $('.employee-work-date').text(JSON.parse(response.Value).employeeTask_StartDate);
                            $('.employee-work-time').text(JSON.parse(response.Value).employeeTask_StartTime);

                        }, 100);
                    } else {

                        $('.show-hide-employee-task-area').hide();
                    }
                    loadProjectSectiondownLists();
                    loadProject_DesignSection_SubSection_DDL('Project_DesignSection_SetupDetailTypeDDL', '0');


                }
            });
        } else {

            //After ajax call .  

            $('#load-model').click();
            /*
            $('.assign-employee-start-date').text(JSON.parse(response.Value).assign_employee_StartDate);
            $('.assign-employee-end-date').text(JSON.parse(response.Value).assign_employee_CompletionDate);

            $('.employee-work-date').text(JSON.parse(response.Value).employeeTask_StartDate);
            $('.employee-work-time').text(JSON.parse(response.Value).employeeTask_StartTime);
            */

            if (JSON.parse(response.Value).assign_employee_StartDate != null) {
                setTimeout(function () {
                    $('.show-hide-employee-start-datetime').show();
                    $('.show-hide-employee-start-datetime').addClass('btn-success')

                    $('.show-hide-assign-start-datetime').show();
                    $('.show-hide-assign-start-datetime').addClass('btn-info')

                    $('.show-hide-completion-start-datetime').show();
                    $('.show-hide-completion-start-datetime').addClass('btn-danger')


                    $('.show-hide-employee-task-area').show();

                    $('.assign-employee-start-date').text(JSON.parse(response.Value).assign_employee_StartDate);
                    $('.assign-employee-end-date').text(JSON.parse(response.Value).assign_employee_CompletionDate);

                    $('.employee-work-date').text(JSON.parse(response.Value).employeeTask_StartDate);
                    $('.employee-work-time').text(JSON.parse(response.Value).employeeTask_StartTime);


                }, 100);
            } else {

                $('.show-hide-employee-task-area').hide();
            }
            loadProjectSectiondownLists();
            // loadProject_DesignSection_SubSection_DDL('Project_DesignSection_SetupDetailTypeDDL', '0');
        }
    }

}



$('.clearField').click(function () {
    $('#Attachment_Id').val(0);
    $('#From_SetupType_Id').val(0);
    $('#Grid-Name').val(0);
});
//|Click Event
$('#btn-design-section-upload-document').click(function () {

    $('#DesignSection_Document_ProjectId').val(project_Id);
    $('#DesignSection_Document_Language').val(_currentLanguage);
    $('#DesignSection_Document_CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    $('#Project_Section_Parent_Type_DDL_Text').val($("#design-section-stepper").data('kendoStepper').selectedStep.options.label);


    if (customValidateForm('frmAddUpdate_DesignSection_Document')) {
        // if (!firstDateShouldBeGreaterThanSecondDate($('#DesignSection_Document_StartDate').val(), $('#DesignSection_Document_EndDate').val(), $('.lbl-startDate').text(), $('.lbl-endDate').text())) {
        //     return false;
        // }
        buttonAddPleaseWait('btn-design-section-upload-document');

        $("#frmAddUpdate_DesignSection_Document").ajaxForm();
        var options = {
            success: function (response, statusText, jqXHR) {
                buttonRemovePleaseWait('btn-design-section-upload-document', save, 'save');

                document.getElementById("frmAddUpdate_DesignSection_Document").reset();
                swal(response);

                var messageResponseParse = JSON.parse(response);
                if (messageResponseParse.type == undefined) {
                    messageResponseParse = JSON.parse(messageResponseParse);
                } if (messageResponseParse.type == undefined) {
                    messageResponseParse = JSON.parse(messageResponseParse);
                }
                fnUpdateDesignSection_Employee_document_CompletionDate();

            },
            error: function (xhr, status, error) {
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                buttonRemovePleaseWait('btn-design-section-upload-document', save, 'save');
                alert(errmsg);
            },
            complete: function () {
                buttonRemovePleaseWait('btn-design-section-upload-document', save, 'save');
            }
        };
        $("#frmAddUpdate_DesignSection_Document").ajaxSubmit(options);
    }
    else {
        buttonRemovePleaseWait('btn-design-section-upload-document', save, 'save');
        return false;
    }
});

//|End Click Event
function fnUpdateDesignSection_Employee_document_CompletionDate() {
    ajaxRequest({
        commandName: 'Project_Linked_Multiple_Update_Employees_Work_EndDate_By_Paramters', values: {

            Project_Id: project_Id,
            UserId: JSON.parse(localStorage.getItem('User')).id,
            Employee_Id: JSON.parse(localStorage.getItem('User')).employeeId,
            Selected_Document_Step_Id: $("#design-section-stepper").data('kendoStepper').selectedStep.options.Id,
            Language: _currentLanguage
        }, CallBack: ''

    });


    var gridId = $('.DesignSection_Tab.active').find('.k-grid').attr('id');
    fnLoadDesignSection_Document(project_Id, $("#design-section-stepper").data('kendoStepper').selectedStep.options.Id, gridId);
    $('.close-design-upload-modal').click();
    //  location.reload();
}





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

    setTimeout(function () {


        // $('#Project_Section_Parent_Type_DDL').data("kendoDropDownList").options.enabled(false);
        $("#Project_Section_Parent_Type_DDL").data("kendoDropDownList").value($("#design-section-stepper").data('kendoStepper').selectedStep.options.Id);
        //    $('#Project_Section_Parent_Type_DDL').val($("#design-section-stepper").data('kendoStepper').selectedStep.options.Id);
        loadProject_DesignSection_SubSection_DDL('Project_DesignSection_SetupDetailTypeDDL', $("#design-section-stepper").data('kendoStepper').selectedStep.options.label.trim());

    }, 100);
}

function fn_DesignSection_OnSelect_Section_DDL(e) {


    var selected_Id = e.dataItem.id;
    //  $('#To_id_design').val(selected_Id);
    var selected_Text = e.dataItem.name;

    $('#Project_Section_Parent_Type_DDL_Text').val(selected_Text.trim());
    loadProject_DesignSection_SubSection_DDL('Project_DesignSection_SetupDetailTypeDDL', selected_Text.trim());


};



function loadProject_DesignSection_SubSection_DDL(controlId, typeName, selectText = null) {

    ajaxRequest({
        //commandName: 'Setup_Type_DropdownByTypeName_New',
        commandName: 'Setup_Main_Section_DropdownByTypeName',
        values: { TypeName: typeName, Language: _currentLanguage }, controlId, CallBack: loadProject_DesignSection_SubSection_DDLCallBackk
    });
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


};



/*
// --------------------- LOAD PROGRESS BAR START----------------------BY |\/|ati


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
// --------------------- LOAD PROGRESS BAR END----------------------BY |\/|ati
*/


function fnCheck_NoExpiry_in_design(e, areaName) {

    if (areaName == 'EndDate') {
        $('#DesignSection_Document_NoExpiry_Call')[0].checked = false
        $('#DesignSection_Document_NoExpiry').val(0);
        $('#DesignSection_Document_NoExpiry_Call').is(':Checked', false);
    } else {

        $('#DesignSection_Document_NoExpiry').val(1);
        var checkExpiry_d = $('#DesignSection_Document_NoExpiry_Call').is(':Checked', true);
        checkExpiry_d == true ? $('#DesignSection_Document_EndDate').val('') : $('#DesignSection_Document_NoExpiry_Call')[0].checked = false;
    }

}



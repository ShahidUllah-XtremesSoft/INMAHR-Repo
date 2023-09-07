



$('.clearField_transfer_modal').click(function () {

    $('#Attachment_Id_design_transfer_modal').val(0);
    $('#From_id_design').val(0);
    $('#Grid_name_transfer_design').val(0);
});
//|Click Event


//***************** FN TRANSFER FILE AREA BY |\/|ATI

var selectedRecordDocumentType = null;
function fn_transfer_file(event) {

    var row = $(event).closest("tr");
    var grid = $("#" + event.getAttribute('data-grid-name')).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    selectedRecordDocumentType = dataItem.documentTypeName;

    $('#frmTransferDataModal').trigger('reset')
    fnApprovedOrReturn_DDL('ApprovedOrReturned'); // Load approved or Return ddl

    $('#load-design-transfer-model').click();
    $('.div_showHide_Main_stepper').hide();
    $(".main_Section_In_Sub_section_transfer_modal").prop('selectedIndex', 0);


    loadProjectSectiondownList_in_transfer_modal();
    //  loadProject_DesignSection_SubSection_DDL('Project_DesignSection_Transfer_Modal_SetupDetailTypeDDL_design_transfer_modal', '0');


    $('#Attachment_Id_design_transfer_modal').val(dataItem.attachmentId);
    $('#From_id_design').val(dataItem.setup_Type_Id);
    $('#Grid_name_transfer_design').val(event.getAttribute('data-grid-name'));



}

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


            ajaxRequest({
                commandName: 'Project_DesignSection_Document_Transfer_ById',
                values: {
                    Project_Id: project_Id,
                    Attachment_Id: $('#Attachment_Id_design_transfer_modal').val(),
                    From_SetupType_Id: $('#From_id_design').val(),
                    //     To_SetupType_Id: $('#To_id_design').val(),
                    To_SetupType_Id: $('#Project_DesignSection_Entity_Id_transfer_modal').val(),
                    EmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
                    UserId: JSON.parse(localStorage.getItem('User')).id,
                    AttachmentRemarks: $('#DesignSection_transfer_modal_Remarks').val(),
                    FromDocumentType: selectedRecordDocumentType,
                    ToDocumentType: $('#Project_DesignSection_Transfer_Modal_SetupDetailTypeDDL_design_transfer_modal').data("kendoDropDownList").text(),
                    // ToDocumentType: $('#Project_Section_Parent_Type_DDL_design_transfer_modal').data("kendoDropDownList").text() + ' |  ' + $('#Project_DesignSection_Transfer_Modal_SetupDetailTypeDDL_design_transfer_modal').data("kendoDropDownList").text(),
                    ApprovedOrReturned: $('#ApprovedOrReturned').data("kendoDropDownList").value(),
                    DesignSection_comment_for_client_or_employee: $('#DesignSection_comment_for_client_or_employee_in_transfer_modal').val(),
                    Language: $('#Language').val()
                }, CallBack: fn_transfer_file_saveCallBack
            });
        }
    });
    var fn_transfer_file_saveCallBack = function (response) {
        selectedRecordDocumentType = null;
        swal(response.Value);

        fnLoadDesignSection_Document(project_Id, $('#From_id_design').val(), $('#Grid_name_transfer_design').val());
        $('.btnClose').click();
        loadProjectSectiondownList_in_transfer_modal();
        //    fnLoadMain_Progress_DetailsById(); //Load Main Progress
    }

}

//***************** FN TRANSFER FILE AREA END------------------------BY |\/|ati 



function loadProjectSectiondownList_in_transfer_modal() { ajaxRequest({ commandName: 'DDL_DESIGN_SECTION_Project_MainType', values: { Language: _currentLanguage }, CallBack: fnloadloadProjectSectiondownList_in_transfer_modalCallBack }); }
function fnloadloadProjectSectiondownList_in_transfer_modalCallBack(response) {

    $("#Project_Section_Parent_Type_DDL_design_transfer_modal").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        //  value: -1,
        dataSource: JSON.parse(response.Value),
        popup: { appendTo: $("#container_parent_type_ddl_design_transfer_modal") },
        select: fn_DesignSection_OnSelect_Section_DDL,

    });
    setTimeout(function () {
        $("#Project_Section_Parent_Type_DDL_design_transfer_modal").data("kendoDropDownList").value($("#design-section-stepper").data('kendoStepper').selectedStep.options.Id);
        loadProject_transfer_modal_DesignSection_SubSection_DDL($("#design-section-stepper").data('kendoStepper').selectedStep.options.label.trim());

    }, 100);
}

function fn_DesignSection_OnSelect_Section_DDL(e) {


    var selected_Id = e.dataItem.id;
    $('#To_id_design').val(selected_Id);
    var selected_Text = e.dataItem.name;

    $('#Project_Section_Parent_Type_DDL_Text').val(selected_Text.trim());

    loadProject_transfer_modal_DesignSection_SubSection_DDL(selected_Text.trim());

};



function loadProject_transfer_modal_DesignSection_SubSection_DDL(selectText = null) {

    ajaxRequest({
        //commandName: 'Setup_Type_DropdownByTypeName_New',
        commandName: 'Setup_Main_Section_DropdownByTypeName',
        values: { TypeName: selectText, Language: _currentLanguage }, CallBack: loadProject_transfer_modal_DesignSection_SubSection_DDLCallBack
    });
}
var loadProject_transfer_modal_DesignSection_SubSection_DDLCallBack = function (loadjQueryDropdownListResponse) {


    $("#Project_DesignSection_Transfer_Modal_SetupDetailTypeDDL_design_transfer_modal").kendoDropDownList({
        dataValueField: "id",
        dataTextField: "name",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(loadjQueryDropdownListResponse.Value),
        popup: { appendTo: $("#container_child_type_ddl_design_transfer_modal") },
        select: onSelect_DesignSection_transfer_modal,
    });

}
function onSelect_DesignSection_transfer_modal(e) {
    var selected_Id = e.dataItem.id;
    $('#Project_DesignSection_Entity_Id_transfer_modal').val(selected_Id);

};




function fnCheck_NoExpiry(e, areaName) {

    if (areaName == 'EndDate') {
        $('#DesignSection_Document_NoExpiry_Call')[0].checked = false
        $('#DesignSection_Document_NoExpiry').val(0);
    } else {

        $('#DesignSection_Document_NoExpiry').val(1);
        var checkExpiry = $('#DesignSection_Document_NoExpiry_Call').is(':Checked', true);
        checkExpiry == true ? $('#DesignSection_Document_EndDate').val('') : $('#DesignSection_Document_NoExpiry_Call')[0].checked = false;
    }

}




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
                label: lblTechnicalSection,
                icon: " ",

            },
            {
                label: lblSupervisionSection,
                icon: " ",
            },
        ];

        bindkendoStepper('Project_load_other_main_section_stepper_in_DesignSection', false, step_Columnss, '', stepper_Fn_otherMainSection_Onselect, 800, "horizontal");


        function stepper_Fn_otherMainSection_Onselect(e) {
            var stepper_data = e.step.options;
            if (stepper_data.label != 'Select') {
                ajaxRequest({ commandName: 'DDL_Load_SetupType_By_ParentName', values: { ParentType: stepper_data.label.replace(/ /g, ""), Language: _currentLanguage }, CallBack: fnLoadOtherMainSection_Callback });
            } else {
                loadProjectSectiondownList_in_transfer_modal();
                $("#Project_DesignSection_Transfer_Modal_SetupDetailTypeDDL_design_transfer_modal").data("kendoDropDownList").dataSource.data([]);

            }

        }


    } else {

        $('.div_showHide_Main_stepper').hide();
        loadProjectSectiondownList_in_transfer_modal();
        $("#Project_DesignSection_Transfer_Modal_SetupDetailTypeDDL_design_transfer_modal").data("kendoDropDownList").dataSource.data([]);

    }

    function fnLoadOtherMainSection_Callback(response) {
        $("#Project_DesignSection_Transfer_Modal_SetupDetailTypeDDL_design_transfer_modal").data("kendoDropDownList").dataSource.data([]);
        fnloadloadProjectSectiondownList_in_transfer_modalCallBack(response);
    }

}
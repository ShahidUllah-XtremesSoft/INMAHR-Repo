var Parameter_Project_Id = (new URL(location.href)).searchParams.get('id');
$(function () {

    //var optional = $("#Project_SupervisionSection_Finance_DDL").kendoMultiSelect({
    //    autoClose: false
    //}).data("kendoMultiSelect");
    // ------ CALL DDL'S  FN
    //  loadProject_Supervision_Section_dropdownList();

    //| Date Picker
    renderKendoDateAndTimePickerWithNewFormat('SupervisionSection_Document_StartDate');
    renderKendoDateAndTimePickerWithNewFormat('SupervisionSection_Document_EndDate');

    renderKendoDatePickerWithNewFormat('ConstructionStartDate');
    renderKendoDatePickerWithNewFormat('ConstructionEndDate');

    renderKendoDatePickerWithNewFormat('ExtendedConstructionStartDate');
    renderKendoDatePickerWithNewFormat('ExtendedConstructionEndDate');
    //|End Date Picker
    $('#SupervisionSection_Document_CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    $('#SupervisionSection_Update_Area_CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);    

});
function fnLoadSupervisionSectionReady() {

    $('#SupervisionSection_Document_Language').val(_currentLanguage);
    $('#SupervisionSection_Update_Area_Language').val(_currentLanguage);
    $('#SupervisionSection_Document_CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    $('#SupervisionSection_Update_Area_CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    

    loadProject_Supervision_Section_dropdownList();
    loadProject_SupervisionSection_SubSection_DDL('Project_SupervisionSection_SetupDetailTypeDDL', '0');
    load_Supervision_Section_finance_dropdownList();


    if (Parameter_Project_Id > 0 == true) {
        $('#ProjectSupervisionSectionLI').show();

        $('#SupervisionSection_Document_ProjectId').val(Parameter_Project_Id);
        $('#SupervisionSection_Update_Area_ProjectId').val(Parameter_Project_Id);
        fnLoadSupervisionSection_Document_Grid(Parameter_Project_Id);

        // fnLoadSupervisionSection_Document(Parameter_Project_Id);


    }


}

//|Click Event
$('#btn-save-supervision-section-government-documents').click(function () {

    if (customValidateForm('frmAddUpdate_SupervisionSection_Document')) {
        if (!firstDateShouldBeGreaterThanSecondDate($('#SupervisionSection_Document_StartDate').val(), $('#SupervisionSection_Document_EndDate').val(), $('.lbl-startDate').text(), $('.lbl-endDate').text())) {
            return false;
        }
        buttonAddPleaseWait('btn-save-supervision-section-government-documents');

        $("#frmAddUpdate_SupervisionSection_Document").ajaxForm();
        var options = {
            success: function (response, statusText, jqXHR) {
                buttonRemovePleaseWait('btn-save-supervision-section-government-documents', save, 'save');
                $('#frmAddUpdate_SupervisionSection_Document')[0].reset();

                swal(response);

                var messageResponseParse = JSON.parse(response);
                if (messageResponseParse.type == undefined) {
                    messageResponseParse = JSON.parse(messageResponseParse);
                } if (messageResponseParse.type == undefined) {
                    messageResponseParse = JSON.parse(messageResponseParse);
                }
                fnLoadSupervisionSection_Document_Grid(Parameter_Project_Id == 0 ? $('#DesignSection_Document_ProjectId').val() : Parameter_Project_Id);
                //----------- Reload DateTime Picker 
                renderKendoDateAndTimePickerWithNewFormat('SupervisionSection_Document_StartDate');
                renderKendoDateAndTimePickerWithNewFormat('SupervisionSection_Document_EndDate');
                $('#ProjectSupervisionSectionLI').show();

            },
            error: function (xhr, status, error) {
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                buttonRemovePleaseWait('btn-save-supervision-section-government-documents', save, 'save');
                alert(errmsg);
            },
            complete: function () {
                buttonRemovePleaseWait('btn-save-supervision-section-government-documents', save, 'save');
            }
        };
        $("#frmAddUpdate_SupervisionSection_Document").ajaxSubmit(options);
    }
    else {
        buttonRemovePleaseWait('btn-save-supervision-section-government-documents', save, 'save');
        //----------- Reload DateTime Picker 
        renderKendoDateAndTimePickerWithNewFormat('SupervisionSection_Document_StartDate');
        renderKendoDateAndTimePickerWithNewFormat('SupervisionSection_Document_EndDate');
        return false;
    }
});
//btn-save-supervision-update-section-area
$('#btn-save-supervision-update-section-area').click(function () {    
    if (customValidateForm('frmAddUpdate_SupervisionSection_Update_area')) {
        if (!firstDateShouldBeGreaterThanSecondDate($('#ConstructionStartDate').val(), $('#ConstructionEndDate').val(), $('.lbl-startDate').text(), $('.lbl-endDate').text())) {
            return false;
        }
        buttonAddPleaseWait('btn-save-supervision-update-section-area');

        $("#frmAddUpdate_SupervisionSection_Update_area").ajaxForm();
        var options = {
            success: function (response, statusText, jqXHR) {
                buttonRemovePleaseWait('btn-save-supervision-update-section-area', save, 'save');
                $('#frmAddUpdate_SupervisionSection_Update_area')[0].reset();

                swal(response);

                var messageResponseParse = JSON.parse(response);
                if (messageResponseParse.type == undefined) {
                    messageResponseParse = JSON.parse(messageResponseParse);
                } if (messageResponseParse.type == undefined) {
                    messageResponseParse = JSON.parse(messageResponseParse);
                }

                fnEditProject_Supervision_Updated_Area_ById(Parameter_Project_Id == 0 ? $('#SupervisionSection_Document_ProjectId').val() : Parameter_Project_Id);
                //----------- Reload DateTime Picker 
                renderKendoDatePickerWithNewFormat('ConstructionStartDate');
                renderKendoDatePickerWithNewFormat('ConstructionEndDate');

                renderKendoDatePickerWithNewFormat('ExtendedConstructionStartDate');
                renderKendoDatePickerWithNewFormat('ExtendedConstructionEndDate');

            },
            error: function (xhr, status, error) {
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                buttonRemovePleaseWait('btn-save-supervision-update-section-area', save, 'save');
                alert(errmsg);
            },
            complete: function () {
                buttonRemovePleaseWait('btn-save-supervision-update-section-area', save, 'save');
            }
        };
        $("#frmAddUpdate_SupervisionSection_Update_area").ajaxSubmit(options);
    }
    else {
        buttonRemovePleaseWait('btn-save-supervision-section-government-documents', save, 'save');
        return false;
    }
});

//|End Click Event
function fnEditProject_Supervision_Updated_Area_ById(projectId) {
    ajaxRequest({
        commandName: 'Project_Unit_Supervision_Section_Edit_By_Id',
        values: {
            Project_Id: projectId,
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Language: _currentLanguage
        }, CallBack: fnEditProject_Supervision_Updated_Area_ByIdCallBack
    });
}
function fnEditProject_Supervision_Updated_Area_ByIdCallBack(response) {
    var response = JSON.parse(response.Value);
    console.log(response);
    if (response != null) {

        setTimeout(function () {
            $('#SupervisionSection_Update_Area_ProjectId').val(response.project_Id);

            $("#ConstructionStartDate").kendoDatePicker({ value: response.constructionStartDate, format: "dd/MM/yyyy" });
            $('#ConstructionMonths').val(response.constructionMonths != null ? response.constructionMonths : 0 );
            $("#ConstructionEndDate").kendoDatePicker({ value: response.constructionEndDate, format: "dd/MM/yyyy" });

            $("#ExtendedConstructionStartDate").kendoDatePicker({ value: response.extendedConstructionStartDate, format: "dd/MM/yyyy" });
            $('#ExtendedConstructionMonths').val(response.extendedConstructionMonths != null ? response.extendedConstructionMonths : 0); 
            $("#ExtendedConstructionEndDate").kendoDatePicker({ value: response.extendedConstructionEndDate, format: "dd/MM/yyyy" });

            $("#Project_SupervisionSection_Contractor_DDL").data('kendoDropDownList').value(response.contractor_Id != null ? response.contractor_Id : -1);
            $("#Project_SupervisionSection_Finance_DDL").data("kendoMultiSelect").value(response.finance_Id != null ? response.finance_Id.split(',') : 0);





        }, 100);


    }
}



function loadProject_Supervision_Section_dropdownList() { ajaxRequest({ commandName: 'DDL_Supervision_SECTION_Project_MainType', values: { Language: _currentLanguage }, CallBack: fnloadProject_Supervision_Section_dropdownListCallBack }); }
function fnloadProject_Supervision_Section_dropdownListCallBack(response) {

    $("#Project_Supervision_Section_Parent_Type_DDL").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(response.Value),
        select: fnSupervision_Section_DDL_Callback,

    });
}
function fnSupervision_Section_DDL_Callback(e) {

    var selected_Id = e.dataItem.id;
    $('#Project_SupervisionSection_Entity_Id').val(selected_Id);
    var selected_Text = e.dataItem.name;

    $('#Project_Supervision_Section_Parent_Type_DDL_Text').val(selected_Text.trim());
    $('#Setup_SetupType_Id_for_Supervision_Section').val(selected_Id);

    //|Functions Calling
    loadProject_SupervisionSection_SubSection_DDL('Project_SupervisionSection_SetupDetailTypeDDL', selected_Text.trim());
    localStorage.setItem('Main-Section-Name-for-Supervision-Section-MEP', selected_Text.trim());


}




function loadProject_SupervisionSection_SubSection_DDL(controlId, typeName, selectText = null) {

    ajaxRequest({
        commandName: 'Setup_Type_DropdownByTypeName_New',
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
        select: onSelect_SupervisionSection,
    });

}
function onSelect_SupervisionSection(e) {

    var selected_Id = e.dataItem.id;
    $('#Project_SupervisionSection_Entity_Id').val(selected_Id);
    var selected_Text = e.dataItem.name;
    fnLoadSupervisionSectionArea($('.checkbtnValue.active')[0]);
};



function load_Supervision_Section_Contractor_dropdownList() { ajaxRequest({ commandName: 'DDL_Contractor', values: { Language: _currentLanguage }, CallBack: load_Supervision_Section_Contractor_dropdownListCallBack }); }
function load_Supervision_Section_Contractor_dropdownListCallBack(response) {

    $("#Project_SupervisionSection_Contractor_DDL").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(response.Value),
        select: fnSupervision_Section_Contractor_DDL_Callback,

    });
}
function fnSupervision_Section_Contractor_DDL_Callback(e) {

    var selected_Id = e.dataItem.id;
    $('#Project_SupervisionSection_Contractor_Id').val(selected_Id);
    var selected_Text = e.dataItem.name;
}

function load_Supervision_Section_finance_dropdownList() { ajaxRequest({ commandName: 'DDL_SUPERVISION_SECTION_Project_Finance', values: { Language: _currentLanguage }, CallBack: load_Supervision_Section_finance_dropdownListCallBack }); }
function load_Supervision_Section_finance_dropdownListCallBack(response) {
    $("#avoidMultipleDDLappends").empty();
    $("#avoidMultipleDDLappends").append('<input type="text" class="form-control pname" name="Project_SupervisionSection_Finance_DDL[]" id="Project_SupervisionSection_Finance_DDL" multiple><input type="hidden" class="form-control pname" name="Project_SupervisionSection_Finance_Id" id="Project_SupervisionSection_Finance_Id" value="0">');
    $("#Project_SupervisionSection_Finance_DDL").kendoMultiSelect({
        autoClose: false,
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        //value: -1,
        dataSource: JSON.parse(response.Value),
        select: fnSupervision_Section_Finance_DDL_Callback,
        deselect: fnSupervision_Section_Finance_DeSelect_DDL_Callback
    });


}
function fnSupervision_Section_Finance_DeSelect_DDL_Callback(e) {
    var selected_Id = e.dataItem.id;
    var ids_Array = '0';
    setTimeout(function () {
        ids_Array = $("#Project_SupervisionSection_Finance_DDL").data("kendoMultiSelect").value().toString();

        $('#Project_SupervisionSection_Finance_Id').empty();
        $('#Project_SupervisionSection_Finance_Id').val(ids_Array);
    }, 50);
    var selected_Text = e.dataItem.name;
}
function fnSupervision_Section_Finance_DDL_Callback(e) {

    var selected_Id = e.dataItem.id;
    var ids_Array = '0';
    setTimeout(function () {
        ids_Array = $("#Project_SupervisionSection_Finance_DDL").data("kendoMultiSelect").value().toString();

        $('#Project_SupervisionSection_Finance_Id').empty();
        $('#Project_SupervisionSection_Finance_Id').val(ids_Array);
    }, 50);
    var selected_Text = e.dataItem.name;
}




function fnLoadSupervisionSectionArea(e) {

    var areaname = e.value;
    $('.checkbtnValue').removeClass('active')
    $(e).addClass('active')


    if (areaname == 'Upload Document') {
        $('.div-Supervision-section-document-upload-area').show();
        $('#div-Supervision-section-employees-area').hide();
        $('.div-Supervision-section-assigned-employees-area').hide();
        $('.div-Supervision-section-update-supervision-area').hide();


        $("#Project_Supervision_Section_Parent_Type_DDL").data("kendoDropDownList").enable(true);
        $("#Project_SupervisionSection_SetupDetailTypeDDL").data("kendoDropDownList").enable(true);
    } else if (areaname == 'Available Employee') {

        $('#div-Supervision-section-employees-area').show();

        $("#div-Supervision-section-employees-area").load("/Project/Project/Load_Supervision_Section_Employees");
        $('.div-Supervision-section-document-upload-area').hide();
        $('.div-Supervision-section-assigned-employees-area').hide();
        $('.div-Supervision-section-update-supervision-area').hide();

        $("#Project_Supervision_Section_Parent_Type_DDL").data("kendoDropDownList").enable(true);
        $("#Project_SupervisionSection_SetupDetailTypeDDL").data("kendoDropDownList").enable(true);

    } else if (areaname == 'Assigned Employee') {

        $("#Project_Supervision_Section_Parent_Type_DDL").data("kendoDropDownList").enable(true);
        $("#Project_SupervisionSection_SetupDetailTypeDDL").data("kendoDropDownList").enable(true);

        if ($('#Project_SupervisionSection_Entity_Id').val() == '0') {
            swalMessage('info', 'Please select section and sub section', 2500);
        } else {


            $('.div-Supervision-section-assigned-employees-area').show();
            $('#div-Supervision-section-employees-area').hide();
            $('.div-Supervision-section-document-upload-area').hide();
            $('.div-Supervision-section-update-supervision-area').hide();

            setTimeout(function () {

                fnloadAssignedEmployees_SupervisionSection($('#Project_Supervision_Section_Parent_Type_DDL').val(), $('#Project_SupervisionSection_SetupDetailTypeDDL').val());
            }, 100);



        }
    } else if (areaname == 'Update Supervision') {



        $('.div-Supervision-section-update-supervision-area').show();
        $('.div-Supervision-section-assigned-employees-area').hide();
        $('#div-Supervision-section-employees-area').hide();
        $('.div-Supervision-section-document-upload-area').hide();
        load_Supervision_Section_Contractor_dropdownList();
        //load_Supervision_Section_finance_dropdownList();
        fnEditProject_Supervision_Updated_Area_ById(Parameter_Project_Id == 0 ? $('#SupervisionSection_Document_ProjectId').val() : Parameter_Project_Id);


        $("#Project_Supervision_Section_Parent_Type_DDL").data("kendoDropDownList").enable(false);
        $("#Project_SupervisionSection_SetupDetailTypeDDL").data("kendoDropDownList").enable(false);

    }

}




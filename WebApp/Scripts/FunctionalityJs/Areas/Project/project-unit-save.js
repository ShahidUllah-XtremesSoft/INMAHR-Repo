var UnitProject_Id = (new URL(location.href)).searchParams.get('id');

$(function () {
     
    //| Date Picker
    // renderKendoDatePickerWithNewFormat('StartDate');
    //  renderKendoDatePickerWithNewFormat('EndDate');
    //|End Date Picker
     
    if (UnitProject_Id > 0 == true) {
       
        $('#UnitProject_Id').val(UnitProject_Id);

        /*
        $('#ProjectDesingSectionLI').show();
        $('#ProjectTechnicalSectionLI').show();
        $('#ProjectSupervisionSectionLI').show();
       */
    }
});
// This FN is Calling from Project-info-Save.js which is parent js .for avoid repeatition of ajax calls
function fnLoadUnitReady() {

    $('#UnitLanguage').val(_currentLanguage);
    $('#UnitCreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    //|Functions Calling
    loadProjectUnitTypeDDL('ProjectUnitType_SetupDetailTypeDDL', 'ProjectUnitType');
    loadProjectUnitAreaDDL('ProjectUnitArea_SetupDetailTypeDDL', 'ProjectUnitArea');
 
    if (UnitProject_Id > 0 == true) {

        $('#UnitProject_Id').val(UnitProject_Id);
        fnEditProjectUnitById(UnitProject_Id);
    }


}

//|Click Event
$('#btn-save-unit').click(function () {






    if (customValidateForm('frmAddUpdateProject') && customValidateForm('frmAddUpdateProjectUnit')) {
        //if (!firstDateShouldBeGreaterThanSecondDate($('#StartDate').val(), $('#EndDate').val(), $('.lbl-startDate').text(), $('.lbl-endDate').text())) {
        //    return false;
        //}
        $('#btn-save-project').click();
        //   var checkBot = document.getElementById('btn-save-project').getAttribute("_ProjectId");


        buttonAddPleaseWait('btn-save-unit');
        setTimeout(function () {


            $("#frmAddUpdateProjectUnit").ajaxForm();
            var options = {
                success: function (response, statusText, jqXHR) {
                    buttonRemovePleaseWait('btn-save-unit', save, 'save');
                    $('#frmAddUpdateProjectUnit')[0].reset();

                    swal(response);

                    var messageResponseParse = JSON.parse(response);
                    if (messageResponseParse.type == undefined) {
                        messageResponseParse = JSON.parse(messageResponseParse);
                    } if (messageResponseParse.type == undefined) {
                        messageResponseParse = JSON.parse(messageResponseParse);
                    }
                    fnEditProjectUnitById(messageResponseParse.insertedId);
                    window.location.href = '/Project/Project/List';
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    buttonRemovePleaseWait('btn-save-unit', save, 'save');
                    alert(errmsg);
                },
                complete: function () {
                    buttonRemovePleaseWait('btn-save-unit', save, 'save');
                }
            };
            $("#frmAddUpdateProjectUnit").ajaxSubmit(options);
        }, 1500);
    }
    else {
        buttonRemovePleaseWait('btn-save-unit', save, 'save');
        return false;
    }
});

//|End Click Event




function loadProjectUnitTypeDDL(controlId, typeName, selectText = null) {

    ajaxRequest({ commandName: 'Setup_Type_DropdownByTypeName_New', values: { TypeName: typeName, Language: _currentLanguage }, controlId, CallBack: loadProjectUnitTypeDDLCallBackk });
}
var loadProjectUnitTypeDDLCallBackk = function (loadjQueryDropdownListResponse, controlId) {


    $("#" + controlId).kendoDropDownList({
        dataValueField: "id",
        dataTextField: "name",
        filter: "contains",
      //  value: 82, // 82 is Residential default value
        dataSource: JSON.parse(loadjQueryDropdownListResponse.Value),
        change: function (e) {

            var selected_Id = this.value();
            $('#ProjectUnitTypeSetupDetailTypeId').val(selected_Id);

        },
    });
  //  $('#ProjectUnitTypeSetupDetailTypeId').val(82);


}

function loadProjectUnitAreaDDL(controlId, typeName, selectText = null) {

    ajaxRequest({ commandName: 'Setup_Type_DropdownByTypeName_New', values: { TypeName: typeName, Language: _currentLanguage }, controlId, CallBack: loadloadProjectUnitAreaDDLCallBack });
   // ajaxRequest({ commandName: 'Setup_Main_Section_DropdownByTypeName', values: { TypeName: typeName, Language: _currentLanguage }, controlId, CallBack: loadloadProjectUnitAreaDDLCallBack });
}
var loadloadProjectUnitAreaDDLCallBack = function (loadjQueryDropdownListResponse, controlId) {


    $("#" + controlId).kendoDropDownList({
        dataValueField: "id",
        dataTextField: "name",
        filter: "contains",
        //  value: -1,
        dataSource: JSON.parse(loadjQueryDropdownListResponse.Value),
        change: function (e) {

            var selected_Id = this.value();
            $('#AreaUnit').val(selected_Id);


        },
    });

    //------- this is for default
 //   $("#ProjectUnitArea_SetupDetailTypeDDL").data('kendoDropDownList').value(87);
  //  $('#AreaUnit').val(87);

}
function fnEditProjectUnitById(projectId) {

    ajaxRequest({
        commandName: 'Project_Unit_Edit_By_Id',
        values: {
            Id: projectId,
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Language: $('#UnitLanguage').val()
        }, CallBack: fnEditProjectUnitByIdCallBack
    });
}
function fnEditProjectUnitByIdCallBack(response) {
     
    var response = JSON.parse(response.Value);

    if (response != null) {
        $('#UnitId').val(response.unitId);
        $('#UnitProject_Id').val(response.project_Id);



        $('#ProjectUnitTypeSetupDetailTypeId').val(response.projectUnitTypeSetupDetailTypeId);
        $('#AreaUnit').val(response.areaUnit);
        $('#Area').val(response.area);
        $('#Floor').val(response.floor);
        $('#PlotNo').val(response.plotNo);
        $('#MulkNo').val(response.mulkNo);
        $('#Rooms').val(response.rooms);
        $('#Bathrooms').val(response.bathrooms);
        $('#Kitchen').val(response.kitchen);
        $('#Garage').val(response.garage);
        $('#Hall').val(response.hall);
        $('#Price').val(response.price);

        //   $("#StartDate").kendoDatePicker({ value: response.startDate, format: "dd/MM/yyyy" });
        //   $("#EndDate").kendoDatePicker({ value: response.endDate, format: "dd/MM/yyyy" });
        setTimeout(function () {
            $("#ProjectUnitType_SetupDetailTypeDDL").data('kendoDropDownList').value(response.projectUnitTypeSetupDetailTypeId);
            $("#ProjectUnitArea_SetupDetailTypeDDL").data('kendoDropDownList').value(response.areaUnit);
        }, 100);

     

        $('#DesignSection_Document_ProjectId').val(response.project_Id);
        //$('#ProjectDesingSectionLI').show();


    }
}

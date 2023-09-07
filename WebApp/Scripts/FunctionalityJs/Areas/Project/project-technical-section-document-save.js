var Parameter_Project_Id = (new URL(location.href)).searchParams.get('id');

$(function () {

    // ------ CALL DDL'S  FN
    //  loadProject_Technical_Section_dropdownList();

    //| Date Picker
    renderKendoDateAndTimePickerWithNewFormat('TechnicalSection_Document_StartDate');
    renderKendoDateAndTimePickerWithNewFormat('TechnicalSection_Document_EndDate');

    // renderKendoDatePicker('TechnicalSection_Document_StartDate');
    // renderKendoDatePicker('TechnicalSection_Document_EndDate');
    //|End Date Picker
});
function fnLoadTechnicalSectionReady() {

    $('#TechnicalSection_Document_Language').val(_currentLanguage);
    $('#TechnicalSection_Document_CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    fnLoadTechnicalSectionArea($('.checkbtnValue_TechnicalSection.active')[0]);

    loadProject_Technical_Section_dropdownList();

    loadProject_TechnicalSection_SubSection_DDL('Project_TechnicalSection_SetupDetailTypeDDL', '0');
    if (Parameter_Project_Id > 0 == true) {
        $('#ProjectSupervisionSectionLI').show();

        $('#TechnicalSection_Document_ProjectId').val(Parameter_Project_Id);
        //  fnLoadTechnicalSection_Document_Grid(Parameter_Project_Id);

        // fnLoadTechnicalSection_Document(Parameter_Project_Id);


    }


}

//|Click Event
$('#btn-save-technical-section-government-documents').click(function () {

    if (customValidateForm('frmAddUpdate_TechnicalSection_Document')) {
        //  if (!firstDateShouldBeGreaterThanSecondDate($('#StartDate').val(), $('#EndDate').val(), $('.lbl-startDate').text(), $('.lbl-endDate').text())) {
        //      return false;
        //  }
        buttonAddPleaseWait('btn-save-technical-section-government-documents');

        $("#frmAddUpdate_TechnicalSection_Document").ajaxForm();
        var options = {
            success: function (response, statusText, jqXHR) {
                buttonRemovePleaseWait('btn-save-technical-section-government-documents', save, 'save');
                $('#frmAddUpdate_TechnicalSection_Document')[0].reset();

                swal(response);

                var messageResponseParse = JSON.parse(response);
                if (messageResponseParse.type == undefined) {
                    messageResponseParse = JSON.parse(messageResponseParse);
                } if (messageResponseParse.type == undefined) {
                    messageResponseParse = JSON.parse(messageResponseParse);
                }
                fnLoadTechnicalSection_Document_Grid(Parameter_Project_Id == 0 ? $('#DesignSection_Document_ProjectId').val() : Parameter_Project_Id);
                //----------- Reload DateTime Picker 
                renderKendoDateAndTimePickerWithNewFormat('TechnicalSection_Document_StartDate');
                renderKendoDateAndTimePickerWithNewFormat('TechnicalSection_Document_EndDate');
                $('#ProjectSupervisionSectionLI').show();

            },
            error: function (xhr, status, error) {
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                buttonRemovePleaseWait('btn-save-technical-section-government-documents', save, 'save');
                alert(errmsg);
            },
            complete: function () {
                buttonRemovePleaseWait('btn-save-technical-section-government-documents', save, 'save');
            }
        };
        $("#frmAddUpdate_TechnicalSection_Document").ajaxSubmit(options);
    }
    else {
        buttonRemovePleaseWait('btn-save-technical-section-government-documents', save, 'save');
        //----------- Reload DateTime Picker 
        renderKendoDateAndTimePickerWithNewFormat('TechnicalSection_Document_StartDate');
        //    renderKendoDateAndTimePickerWithNewFormat('TechnicalSection_Document_EndDate');
        return false;
    }
});

//|End Click Event




function loadProject_Technical_Section_dropdownList() { ajaxRequest({ commandName: 'DDL_TECHNICAL_SECTION_Project_MainType', values: { Language: _currentLanguage }, CallBack: fnloadProject_Technical_Section_dropdownListCallBack }); }
function fnloadProject_Technical_Section_dropdownListCallBack(response) {

    $("#Project_Technical_Section_Parent_Type_DDL").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(response.Value),
        select: fnTechnical_Section_DDL_Callback,

    });
}
function fnTechnical_Section_DDL_Callback(e) {

    var selected_Id = e.dataItem.id;
    $('#Project_TechnicalSection_Entity_Id').val(selected_Id);
    var selected_Text = e.dataItem.name;

    $('#Project_Technical_Section_Parent_Type_DDL_Text').val(selected_Text.trim());
    $('#Setup_SetupType_Id_for_Technical_Section').val(selected_Id);

    //|Functions Calling
    loadProject_TechnicalSection_SubSection_DDL('Project_TechnicalSection_SetupDetailTypeDDL', selected_Text.trim());
    localStorage.setItem('Main-Section-Name-for-Technical-Section-MEP', selected_Text.trim());


}

function loadProject_TechnicalSection_SubSection_DDL(controlId, typeName, selectText = null) {

    //ajaxRequest({ commandName: 'Setup_Type_DropdownByTypeName_New', values: { TypeName: typeName, Language: _currentLanguage }, controlId, CallBack: loadProject_TechnicalSection_SubSection_DDLCallBackk });
    ajaxRequest({ commandName: 'Setup_Main_Section_DropdownByTypeName', values: { TypeName: typeName, Language: _currentLanguage }, controlId, CallBack: loadProject_TechnicalSection_SubSection_DDLCallBackk });
}
var loadProject_TechnicalSection_SubSection_DDLCallBackk = function (loadjQueryDropdownListResponse, controlId) {


    $("#" + controlId).kendoDropDownList({
        dataValueField: "id",
        dataTextField: "name",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(loadjQueryDropdownListResponse.Value),
        select: onSelect_TechnicalSection,
        /*
        select: function (e) {
          
                var selected_Id = this.value();
                $('#Project_TechnicalSection_Entity_Id').val(selected_Id);
                var selected_Text = this.text();


                if (selected_Text == 'Architecture Engineer') {

                    $("#div-load-all-employees-partial-view").load("/Project/Project/LoadAllEmployees");

                }
           

        },
        */
    });

}
function onSelect_TechnicalSection(e) {

    var selected_Id = e.dataItem.id;
    $('#Project_TechnicalSection_Entity_Id').val(selected_Id);
    var selected_Text = e.dataItem.name;
    fnLoadTechnicalSectionArea($('.checkbtnValue_TechnicalSection.active')[0]);
    /* if (selected_Text == 'Design Section'           ||
          selected_Text == 'Engineer'                 ||
          selected_Text == 'Structural Engineer'      ||
          selected_Text == 'Municipality Engineer'    ||
          selected_Text == 'Auditing Engineer') {
          /*
          $("#div-technical-section-employees-area").load("/Project/Project/Load_Technical_Section_Employees");
          setTimeout(function () {
  
              $('.technical-section-show-sub-section-name').empty();
              $('.technical-section-show-sub-section-name').append('' +
                  '<button type="button" class="btn btn-outline-success waves-effect waves-light technical-section-parent-ddl-name"> ' + localStorage.getItem('Main-Section-Name-for-Technical-Section-MEP') + '</button>-' +
                  '<button type="button" technical-section-data-sub-section-id=' + selected_Id + ' technical-section-data-main-section-id=' + $('#Setup_SetupType_Id_for_Technical_Section').val() + ' class="btn btn-outline-primary waves-effect waves-light sectionAndSubSectionId"> ' + selected_Text + '</button>');
  
          }, 50);
         
  
              fnLoadTechnicalSectionArea($('.checkbtnValue_TechnicalSection.active')[0]);
  
      }*/
};

function fnLoadTechnicalSectionArea(e) {
    
    var areaname = e.value;
    $('.checkbtnValue_TechnicalSection').removeClass('active')
    $(e).addClass('active')


    if (areaname == 'Upload Document') {
        $('.div-technical-section-document-upload-area').show();
        $('#div-technical-section-employees-area').hide();
        $('.div-technical-section-assigned-employees-area').hide();
        //$('.show-sub-section-name').empty();
        fnLoadTechnicalSection_Document_Grid(Parameter_Project_Id == 0 || Parameter_Project_Id == null ? $('#TechnicalSection_Document_ProjectId').val() : Parameter_Project_Id);

    } else if (areaname == 'Available Employee') {

        $('#div-technical-section-employees-area').show();
        if ($("#div-technical-section-employees-area > div.grid-main-div").children().length <= 0) { 
                $("#div-technical-section-employees-area").load("/Project/Project/Load_Technical_Section_Employees");
            
        }
        $('.div-technical-section-document-upload-area').hide();
        $('.div-technical-section-assigned-employees-area').hide();

    } else if (areaname == 'Assigned Employee') {
         

        //  if ($('#Project_TechnicalSection_Entity_Id').val() == '0') {
        //      swalMessage('info', 'Please select section and sub section', 2500);
        //  } else {

      //  if ($('#Project_TechnicalSection_Entity_Id').val() > 0) {
      //      fnloadAssignedEmployees_TechnicalSection($('#Project_TechnicalSection_Entity_Id').val());
      //  } else {
            fnLoadDefault_AssignedEmployees_TechnicalSection('TechnicalSection');
     //   }

        $('.div-technical-section-assigned-employees-area').show();
        $('#div-technical-section-employees-area').hide();
        $('.div-technical-section-document-upload-area').hide();
        /*
      setTimeout(function () {
              fnloadAssignedEmployees_TechnicalSection($('#Project_Technical_Section_Parent_Type_DDL').val(), $('#Setup_SetupType_Id_for_Technical_Section').val());

          }, 550);
      */
        // }
    }
}


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
var Parameter_Project_Id = 0;

$(function () {

    Parameter_Project_Id = (new URL(location.href)).searchParams.get('id');
    if (Parameter_Project_Id > 0) {
        $('#DesignSection_Document_ProjectId').val(Parameter_Project_Id);
    }
    // ------ CALL DDL'S  FN
    // loadProjectSectiondownList();

    //| Date Picker
    //renderKendoDateAndTimePickerWithNewFormat('DesignSection_Document_StartDate');
    //renderKendoDateAndTimePickerWithNewFormat('DesignSection_Document_EndDate');

    renderKendoDateAndTimePickerWithNewFormat('DesignSection_Document_StartDate');
    renderKendoDateAndTimePickerWithNewFormat('DesignSection_Document_EndDate');
    //|End Date Picker
});
function fnLoadDesignSectionReady() {

    $('#DesignSection_Document_Language').val(_currentLanguage);
    $('#DesignSection_Document_CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);

    //$('#DesignSection_Document_ProjectId').val(Parameter_Project_Id);
    loadProjectSectiondownList();
    loadProject_DesignSection_SubSection_DDL('Project_DesignSection_SetupDetailTypeDDL', '0');

    if (Parameter_Project_Id > 0 == true) {
        $('#ProjectTechnicalSectionLI').show();

        $('#DesignSection_Document_ProjectId').val(Parameter_Project_Id);
        loadProjectSectiondownList();
        fnLoadDesignSection_GovernmentDocument_(Parameter_Project_Id);


    }


}

//|Click Event
$('#btn-save-design-section-government-documents').click(function () {

    if (customValidateForm('frmAddUpdate_DesignSection_Document')) {
        //if (!firstDateShouldBeGreaterThanSecondDate($('#StartDate').val(), $('#EndDate').val(), $('.lbl-startDate').text(), $('.lbl-endDate').text())) {
        //    return false;
        //}

        buttonAddPleaseWait('btn-save-design-section-government-documents');

        $("#frmAddUpdate_DesignSection_Document").ajaxForm();
        var options = {
            success: function (response, statusText, jqXHR) {
                buttonRemovePleaseWait('btn-save-design-section-government-documents', save, 'save');

                document.getElementById("frmAddUpdate_DesignSection_Document").reset();
                swal(response);

                var messageResponseParse = JSON.parse(response);
                if (messageResponseParse.type == undefined) {
                    messageResponseParse = JSON.parse(messageResponseParse);
                } if (messageResponseParse.type == undefined) {
                    messageResponseParse = JSON.parse(messageResponseParse);
                }
                fnLoadDesignSection_GovernmentDocument_(Parameter_Project_Id == 0 || Parameter_Project_Id == null ? $('#DesignSection_Document_ProjectId').val() : Parameter_Project_Id);
                //----------- Reload DateTime Picker 
                renderKendoDateAndTimePickerWithNewFormat('DesignSection_Document_StartDate');
                renderKendoDateAndTimePickerWithNewFormat('DesignSection_Document_EndDate');
                $('#ProjectTechnicalSectionLI').show();
            },
            error: function (xhr, status, error) {
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                buttonRemovePleaseWait('btn-save-design-section-government-documents', save, 'save');
                alert(errmsg);
            },
            complete: function () {
                buttonRemovePleaseWait('btn-save-design-section-government-documents', save, 'save');
            }
        };
        $("#frmAddUpdate_DesignSection_Document").ajaxSubmit(options);
    }
    else {
        buttonRemovePleaseWait('btn-save-design-section-government-documents', save, 'save');
        //----------- Reload DateTime Picker 
        renderKendoDateAndTimePickerWithNewFormat('DesignSection_Document_StartDate');
        renderKendoDateAndTimePickerWithNewFormat('DesignSection_Document_EndDate');
        return false;
    }
});

//|End Click Event




function loadProjectSectiondownList() { ajaxRequest({ commandName: 'DDL_DESIGN_SECTION_Project_MainType', values: { Language: _currentLanguage }, CallBack: fnloadloadProjectSectiondownListCallBack }); }
function fnloadloadProjectSectiondownListCallBack(response) {
    $("#Project_Section_Parent_Type_DDL").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(response.Value),
        select: fn_OnSelect_Section_DDL,
        /*
        change: function (e) {
            var selected_Id = this.value();
            //   var selected_Text = this.text().split('|')[1];
            var selected_Text = this.text();
            $('#Project_Section_Parent_Type_DDL_Text').val(selected_Text.trim());  //


            $('#Setup_SetupType_Id').val(selected_Id);
            //$("#Project_SubSections_DDL").data("kendoDropDownList").enable(true);
            // ---- SEARCH RECORD IN Sub Section DDL

            //|Functions Calling
            //loadProject_DesignSection_SubSection_DDL('Project_DesignSection_SetupDetailTypeDDL', 'Project Government Documents');
            //loadProject_DesignSection_SubSection_DDL('Project_DesignSection_SetupDetailTypeDDL', selected_Text.trim());
            loadProject_DesignSection_SubSection_DDL('Project_DesignSection_SetupDetailTypeDDL', selected_Text.trim());
            localStorage.setItem('Main-Section-Name', selected_Text.trim());

        },
        */
    });
}

function fn_OnSelect_Section_DDL(e) {

    var selected_Id = e.dataItem.id;
    $('#Setup_SetupType_Id').val(selected_Id);
    var selected_Text = e.dataItem.name;
    $('#Project_Section_Parent_Type_DDL_Text').val(selected_Text.trim());  //

    loadProject_DesignSection_SubSection_DDL('Project_DesignSection_SetupDetailTypeDDL', selected_Text.trim());
    localStorage.setItem('Main-Section-Name', selected_Text.trim());

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
        select: onSelect,
        /*
        select: function (e) {
          
                var selected_Id = this.value();
                $('#Project_DesignSection_Entity_Id').val(selected_Id);
                var selected_Text = this.text();


                if (selected_Text == 'Architecture Engineer') {

                    $("#div-design-section-employees-area").load("/Project/Project/LoadAllEmployees");

                } 
        },
        */
    });

}
function onSelect(e) {
    var selected_Id = e.dataItem.id;
    $('#Project_DesignSection_Entity_Id').val(selected_Id);
    var selected_Text = e.dataItem.name;
    if (selected_Text == 'Architecture Engineer' || selected_Text == 'Engineer') {

        //$("#div-design-section-employees-area").load("/Project/Project/LoadAllEmployees");
        //setTimeout(function () {

        //    $('.show-sub-section-name').empty();
        //    $('.show-sub-section-name').append('' +
        //        '<button type="button" class="btn btn-success waves-effect waves-light"> ' + localStorage.getItem('Main-Section-Name') + '</button>' +
        //        '<button type="button" class="btn btn-outline-success waves-effect waves-light"> <i class="fa fa-arrow-right"></i></button>' +
        //        '<button type="button" data-sub-section-id=' + selected_Id + ' data-main-section-id=' + $('#Setup_SetupType_Id').val() + ' class="btn btn-primary waves-effect waves-light sectionAndSubSectionId"> ' + selected_Text + '</button>');
        //    //  $('.show-sub-section-name').append('<button type="button" data-sub-section-id=' + selected_Id + ' data-main-section-id=' + $('#Setup_SetupType_Id').val()+' class="btn btn-outline-primary waves-effect waves-light sectionAndSubSectionId"> ' + selected_Text + '</button>');
        //}, 50);





        fnLoadDesignSectionArea($('.checkbtnValue.active')[0]);


    }
};

function fnLoadDesignSectionArea(e) {

    var areaname = e.value;
    $('.checkbtnValue').removeClass('active')
    $(e).addClass('active')


    if (areaname == 'Upload Document') {
        $('.div-design-section-document-upload-area').show();
        $('#div-design-section-employees-area').hide();
        $('.div-design-section-assigned-employees-area').hide();

        $('.div-show-only-for-design-section-employee-available-area').hide();
        //$('.show-sub-section-name').empty();


    } else if (areaname == 'Available Employee') {

        $('#div-design-section-employees-area').show();
        $('.div-show-only-for-design-section-employee-available-area').show();

        $("#div-design-section-employees-area").load("/Project/Project/LoadAllEmployeess");
        $('.div-design-section-document-upload-area').hide();
        $('.div-design-section-assigned-employees-area').hide();
    } else if (areaname == 'Assigned Employee') {


        if ($('#Project_DesignSection_Entity_Id').val() == '0') {
            swalMessage('info', 'Please select section and sub section', 2500);
        } else {

            fnloadAssignedEmployees($('#Project_DesignSection_Entity_Id').val());   

            $('.div-design-section-assigned-employees-area').show();
            $('#div-design-section-employees-area').hide();
            $('.div-design-section-document-upload-area').hide();
            $('.div-show-only-for-design-section-employee-available-area').hide();
        }
    }
}



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
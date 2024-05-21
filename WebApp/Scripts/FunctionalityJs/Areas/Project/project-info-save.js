var parameterId = (new URL(location.href)).searchParams.get('id');
$(function () {


    $('#Language').val(_currentLanguage);
    $('#CreatedBy').val(parseInt(JSON.parse(localStorage.getItem('User')).id));
    $('#Department_Id').val(JSON.parse(localStorage.User).employee_Department_ParentId);

    //--------------------------FN LOAD AREA--------------------------
    _currentLanguage == 'en-US' ? loadCityDropdownListEng() : loadCityDropdownListArb();
    loadProjectCategoryTypeDDL();
    loadClientDDL();
    fnLoadUnitReady();
    //--------------------------FN LOAD AREA END --------------------------
    if (parameterId > 0 == true) {
        fnEditProjectById(parameterId);

    }




    $('#btn-save-project').click(function () {

        $("#DescriptionEng").val(tinymce.get("DescriptionEng").getContent({ format: "html" }));

        if (customValidateForm('frmAddUpdateProject')) {

            buttonAddPleaseWait('btn-save-project');

            $("#frmAddUpdateProject").ajaxForm();
            var options = {
                success: function (response, statusText, jqXHR) {
                    buttonRemovePleaseWait('btn-save-project', save, 'save');

                    // swal(response);
                    var messageResponseParse = JSON.parse(response);
                    if (messageResponseParse.type == undefined) {
                        messageResponseParse = JSON.parse(messageResponseParse);
                    } if (messageResponseParse.type == undefined) {
                        messageResponseParse = JSON.parse(messageResponseParse);
                    }

                    //  $('#EmployeeId').val(messageResponseParse.insertedId);
                    fnEditProjectById(messageResponseParse.insertedId);

                    //   window.location.href = '/Project/Project/List';

                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    buttonRemovePleaseWait('btn-save-project', save, 'save');
                    alert(errmsg);
                },
                complete: function () {
                    buttonRemovePleaseWait('btn-save-project', save, 'save');
                }
            };
            $("#frmAddUpdateProject").ajaxSubmit(options);
        }
        else {
            buttonRemovePleaseWait('btn-save-project', save, 'save');
            return false;
        }
    });



    //------------- DDL LOAD -------------------------------

    //Load Lists to Local Storage
    function loadCityDropdownListEng() {
        // ajaxRequest({ commandName: 'Setup_City_Get', values: { HR_Nationality_Id: $('#NationalityDDL').val(), Language: 'en-US' }, CallBack: fnloadCityDropdownListEngCallBack });
        ajaxRequest({ commandName: 'Setup_City_Get', values: { HR_Nationality_Id: 234, Language: 'en-US' }, CallBack: fnloadCityDropdownListEngCallBack });
    }
    function fnloadCityDropdownListEngCallBack(response) {

        window.localStorage.setItem('CityListEng', response.Value);

        fnLoadCityByNationalityId();

    }
    function loadCityDropdownListArb() {
        ajaxRequest({ commandName: 'Setup_City_Get', values: { HR_Nationality_Id: 234, Language: 'ar-AE' }, CallBack: loadCityDropdownListArbCallBack });
    }
    function loadCityDropdownListArbCallBack(response) {

        window.localStorage.setItem('CityListArb', response.Value);
        fnLoadCityByNationalityId();
    }




    function loadProjectCategoryTypeDDL() {
        ajaxRequest({ commandName: 'DDL_ProjectCategoryType_In_Setup_TypeDetail_Get', values: { Language: _currentLanguage }, CallBack: loadloadProjectCategoryTypeDDLCallBack });
    }
    function loadloadProjectCategoryTypeDDLCallBack(response) {
        //console.log(JSON.parse(response.Value));
        $("#ProjectCategoryDDL").kendoDropDownList({
            dataTextField: "name",
            dataValueField: "id",
            filter: "contains",
            value: -1,
            // index: 3,
            //    dataSource: _currentLanguage == 'en-US' ? JSON.parse(localStorage.getItem('CityListEng')) : fnRemoveSelectInArabic(JSON.parse(localStorage.getItem('CityListArb'))),
            dataSource: JSON.parse(response.Value),
            change: function (e) {
                var selected_Id = this.value();
                $('#ProjectCategoryType_In_Setup_TypeDetail_Id').val(selected_Id);

            },
        });
        // $("#ProjectCategoryDDL").data('kendoDropDownList').value(80)
    }



    //------------------------------------------------- CLIENT SAVE FROM PARTIAL VIEW 
    $('#btn-save-client-limited-fields').click(function (e) {
        $('.errorField').remove();
        if ($('#NameEng').val() == '') { $('#NameEng').parent().append('<span class="errorField" style="   color:red;">' + lblMissing + '</span>') }
        else if ($('#Email1').val() == '') { $('#Email1').parent().append('<span class="errorField" style="   color:red;">' + lblMissing + '</span>') }
        else {
            ajaxRequest({
                commandName: 'Client_Save_Limited_field',
                values: {
                    Id: 0,
                    NameEng: $('#NameEng').val(),
                    Email1: $('#Email1').val(),
                    PhoneNumber1: $('#PhoneNumber1').val(),
                    CreatedBy: $('#CreatedBy').val(),

                }, CallBack: saveClient_CallBack
            });
        }


    });


    function saveClient_CallBack(response) {

        var response = JSON.parse(response.Value);
        ajaxRequest({ commandName: 'DDL_Client', values: { Language: _currentLanguage }, CallBack: loadClientDDLCallBack });
        $('.clientAddDiv').toggle();

        $('#Client_Id').val(response.id);
        setTimeout(function () {
            $("#ClientDDL").data('kendoDropDownList').value(response.id);

        }, 500);
    }




    $('#btn-cancel-client-limited-field').click(function () {
        $('.clientAddDiv').toggle();

    });
    //------------------------------------------------- CLIENT SAVE FROM PARTIAL VIEW  end

    function loadClientDDL() {
        ajaxRequest({ commandName: 'DDL_Client', values: { Language: _currentLanguage }, CallBack: loadClientDDLCallBack });
    }
    function loadClientDDLCallBack(response) {

        $("#ClientDDL").kendoDropDownList({
            dataTextField: "name",
            dataValueField: "id",
            filter: "contains",
            value: -1,
            //    dataSource: _currentLanguage == 'en-US' ? JSON.parse(localStorage.getItem('CityListEng')) : fnRemoveSelectInArabic(JSON.parse(localStorage.getItem('CityListArb'))),
            dataSource: JSON.parse(response.Value),
            change: function (e) {
                var selected_Id = this.value();
                $('#Client_Id').val(selected_Id);

            },
        });
    }

    function fnLoadCityByNationalityId() {

        $("#CityDDL").kendoDropDownList({
            dataTextField: "name",
            dataValueField: "id",
            filter: "contains",
            value: -1,
            // index:3,
            //    dataSource: _currentLanguage == 'en-US' ? JSON.parse(localStorage.getItem('CityListEng')) : fnRemoveSelectInArabic(JSON.parse(localStorage.getItem('CityListArb'))),
            dataSource: JSON.parse(localStorage.getItem('CityListEng')),
            change: function (e) {
                var selected_Id = this.value();
                $('#City_Id').val(selected_Id);

            },
        });
        //  $("#CityDDL").data('kendoDropDownList').value(3);

    }


    $('#btnSendSMS').click(function () {

        if (customValidateForm('frmSendSMS')) {

            buttonAddPleaseWait('btnSendSMS');

            $("#frmSendSMS").ajaxForm();
            var options = {
                success: function (response, statusText, jqXHR) {
                    buttonRemovePleaseWait('btnSendSMS', save, 'save');

                    swal(response);
                    var messageResponseParse = JSON.parse(response);
                    if (messageResponseParse.type == undefined) {
                        messageResponseParse = JSON.parse(messageResponseParse);
                    } if (messageResponseParse.type == undefined) {
                        messageResponseParse = JSON.parse(messageResponseParse);
                    }

                    //  $('#EmployeeId').val(messageResponseParse.insertedId);
                    //fnEditProjectById(messageResponseParse.insertedId);

                    //   window.location.href = '/Project/Project/List';

                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    buttonRemovePleaseWait('btnSendSMS', save, 'save');
                    alert(errmsg);
                },
                complete: function () {
                    buttonRemovePleaseWait('btnSendSMS', save, 'save');
                }
            };
            $("#frmSendSMS").ajaxSubmit(options);
        }
        else {
            buttonRemovePleaseWait('btnSendSMS', save, 'save');
            return false;
        }
    });
});



function fnEditProjectById(projectId) {
    ajaxRequest({
        commandName: 'Project_Edit_By_Id',
        values: {
            Id: projectId,
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Language: $('#Language').val()
        }, CallBack: editProjectByIdCallBack
    });
}
function editProjectByIdCallBack(response) {

    var response = JSON.parse(response.Value);

    $('#Id').val(response.id);
    $('#UnitProject_Id').val(response.id);
    document.getElementById('btn-save-project').setAttribute("_ProjectId", response.id);
    $('#ProjectName').val(response.projectName);
    $('#DescriptionEng').html(response.descriptionEng);




    $('#Location').val(response.location);
    $('#IsVIP').val(response.vipStatus);
    $('#IsUrgent').val(response.urgentStatus);
    $('#OldProjectNo').val(response.oldProjectNo);


    $('#ProjectCategoryType_In_Setup_TypeDetail_Id').val(response.projectCategoryType_In_Setup_TypeDetail_Id);
    $('#Client_Id').val(response.client_Id);
    $('#City_Id').val(response.city_Id);
    $('#ProjectUnitInformationLI').show();

    if (response.isTender == true) {
        $('#isTender').val(1)
        $('#isTender').prop('checked', true)
    } else {
        $('#isTender').val(0)
        $('#isTender').prop('checked', false)
    }

    setTimeout(function () {

        $("#ProjectCategoryDDL").data('kendoDropDownList').value(response.projectCategoryType_In_Setup_TypeDetail_Id);
        $("#ClientDDL").data('kendoDropDownList').value(response.client_Id);
        $("#CityDDL").data('kendoDropDownList').value(response.city_Id);
        // fnEditProjectUnitById(parameterId);
    }, 50);

}



$('.nav-tabs').on('click', function (e) {
    // BELOW CODE FOR CALLING CHILD EVENTS

    if (e.target.href != undefined) {
        if (e.target.href.split('#')[1] == 'ProjectUnitInformation') {
            fnLoadUnitReady();
        }
        else if (e.target.href.split('#')[1] == 'ProjectDesingSection') {
            fnLoadDesignSectionReady();

        } else if (e.target.href.split('#')[1] == 'ProjectTechnicalSection') {
            fnLoadTechnicalSectionReady();
        } else if (e.target.href.split('#')[1] == 'ProjectSupervisionSection') {
            fnLoadSupervisionSectionReady();
        }
    }


});



function fnShowClientPartialView() {
    $('.clientAddDiv').toggle();
}





//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------

function fnCheckValue(e) {

    //if (e.id == "isTender") {
    //    $('#isTender').prop('checked', false)
    //} else {
    //    $('#isTender').prop('checked', false)
    //}
    var isTender = $('#isTender').prop('checked');
    if (isTender == true) {

        $('#isTender').val(1)
    } else {
        $('#isTender').val(0)

    }
}
var parameterId = (new URL(location.href)).searchParams.get('id');
$(function () {


    $('#Language').val(_currentLanguage);
    $('#CreatedBy').val(parseInt(JSON.parse(localStorage.getItem('User')).id));


    //--------------------------FN LOAD AREA--------------------------
    _currentLanguage == 'en-US' ? loadCityDropdownListEng() : loadCityDropdownListArb();
    loadProjectCategoryTypeDDL();
    loadClientDDL();
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

                    swal(response);
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

        $("#ProjectCategoryDDL").kendoDropDownList({
            dataTextField: "name",
            dataValueField: "id",
            filter: "contains",
            value: -1,
            //    dataSource: _currentLanguage == 'en-US' ? JSON.parse(localStorage.getItem('CityListEng')) : fnRemoveSelectInArabic(JSON.parse(localStorage.getItem('CityListArb'))),
            dataSource: JSON.parse(response.Value),
            change: function (e) {
                var selected_Id = this.value();
                $('#ProjectCategoryType_In_Setup_TypeDetail_Id').val(selected_Id);

            },
        });
    }
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
            //    dataSource: _currentLanguage == 'en-US' ? JSON.parse(localStorage.getItem('CityListEng')) : fnRemoveSelectInArabic(JSON.parse(localStorage.getItem('CityListArb'))),
            dataSource: JSON.parse(localStorage.getItem('CityListEng')),
            change: function (e) {
                var selected_Id = this.value();
                $('#City_Id').val(selected_Id);

            },
        });
    }


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

    $('#NameEng').val(response.projectName);
    $('#DescriptionEng').html(response.descriptionEng);



    $('#Location').val(response.location);
    $('#IsVIP').val(response.vipStatus);
    $('#IsUrgent').val(response.urgentStatus);


    $('#ProjectCategoryType_In_Setup_TypeDetail_Id').val(response.projectCategoryType_In_Setup_TypeDetail_Id);
    $('#Client_Id').val(response.client_Id);
    $('#City_Id').val(response.city_Id);
    $('#ProjectUnitInformationLI').show();


    setTimeout(function () {

        $("#ProjectCategoryDDL").data('kendoDropDownList').value(response.projectCategoryType_In_Setup_TypeDetail_Id);
        $("#ClientDDL").data('kendoDropDownList').value(response.client_Id);
        $("#CityDDL").data('kendoDropDownList').value(response.city_Id);
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
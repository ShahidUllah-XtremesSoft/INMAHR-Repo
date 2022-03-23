var parameterId = (new URL(location.href)).searchParams.get('id');
$(function () {

    $('#Language').val(_currentLanguage);
    $('#CreatedBy').val(parseInt(JSON.parse(localStorage.getItem('User')).id));

    if (parameterId > 0 == true) {

      
        fnEditClientById(parameterId);
    }



    fnLoadCityByNationalityId(0)

    $("#NationalityDDL").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        value: -1,
        dataSource: _currentLanguage == 'en-US' ? JSON.parse(localStorage.getItem('NationalityListEng')) : fnRemoveSelectInArabic(JSON.parse(localStorage.getItem('NationalityListArb'))),
        change: function (e) {

            var selected_Id = this.value();
            $('#Nationality_Id').val(selected_Id);
            setTimeout(function () {

                loadCityDropdownListEng();
                loadCityDropdownListArb();
            }, 50);
           

            /*   fnLoadCityByNationalityId(selected_Id);*/
            // $("#CityId").data('kendoDropDownList').value(selected_Id);

        },
    });




    $('#btn-save-client').click(function () {
         
        $('#CreatedBy').val(parseInt(JSON.parse(localStorage.getItem('User')).id));

        if (customValidateForm('frmAddUpdateClient')) {

            buttonAddPleaseWait('btn-save-client');

            $("#frmAddUpdateClient").ajaxForm();
            var options = {
                success: function (response, statusText, jqXHR) {
                    buttonRemovePleaseWait('btn-save-client', save, 'save');

                    swal(response);
                    var messageResponseParse = JSON.parse(response);
                    if (messageResponseParse.type == undefined) {
                        messageResponseParse = JSON.parse(messageResponseParse);
                    } if (messageResponseParse.type == undefined) {
                        messageResponseParse = JSON.parse(messageResponseParse);
                    }
                     
                  //  $('#EmployeeId').val(messageResponseParse.insertedId);
                    fnEditClientById(messageResponseParse.insertedId);

                 //   window.location.href = '/Project/Client/List';

                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    buttonRemovePleaseWait('btn-save-client', save, 'save');
                    alert(errmsg);
                },
                complete: function () {
                    buttonRemovePleaseWait('btn-save-client', save, 'save');
                }
            };
            $("#frmAddUpdateClient").ajaxSubmit(options);
        }
        else {
            buttonRemovePleaseWait('btn-save-client', save, 'save');
            return false;
        }
    });



    //------------- DDL LOAD -------------------------------

    //Load Lists to Local Storage
    function loadCityDropdownListEng() {
        ajaxRequest({ commandName: 'Setup_City_Get', values: { HR_Nationality_Id: $('#NationalityDDL').val(), Language: 'en-US' }, CallBack: fnloadCityDropdownListEngCallBack });
    }
    function fnloadCityDropdownListEngCallBack(response) {

        window.localStorage.setItem('CityListEng', response.Value);
       
            fnLoadCityByNationalityId();
        
    }
    function loadCityDropdownListArb() {
        ajaxRequest({ commandName: 'Setup_City_Get', values: { HR_Nationality_Id: $('#NationalityDDL').val(), Language: 'ar-AE' }, CallBack: loadCityDropdownListArbCallBack });
    }
    function loadCityDropdownListArbCallBack(response) {

        window.localStorage.setItem('CityListArb', response.Value);
      //  fnLoadCityByNationalityId();
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



function fnEditClientById(clientId) {
    ajaxRequest({
        commandName: 'Client_Edit_By_Id',
        values: {
            Id: clientId,
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Language: $('#Language').val()
        }, CallBack: editClientByIdCallBack
    });
}
function editClientByIdCallBack(response) {
    var response = JSON.parse(response.Value);
    /*console.log(response)*/
    $('#Id').val(response.id);
    
    $('#NameEng').val(response.clientName);
    $('#PhoneNumber1').val(response.phoneNumber1);
    $('#PhoneNumber2').val(response.phoneNumber2);
    $('#Email1').val(response.email1);
    $('#Email2').val(response.email2);
    $('#Location').val(response.location);
    $('#Nationality_Id').val(response.nationality_Id);
    $('#City_Id').val(response.city_Id);
     
    $("#NationalityDDL").data('kendoDropDownList').value(response.nationality_Id);
    $("#CityDDL").data('kendoDropDownList').value(response.city_Id);
    $('#ClientDocumentInformationLI').show();
    
    $('#PersonalDocumentClientId').val(response.id);
}
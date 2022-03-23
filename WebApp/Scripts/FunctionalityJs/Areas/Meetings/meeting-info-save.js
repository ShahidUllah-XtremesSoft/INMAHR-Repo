var parameterId = (new URL(location.href)).searchParams.get('id');
$(function () {

    $('#Language').val(_currentLanguage);
    $('#CreatedBy').val(parseInt(JSON.parse(localStorage.getItem('User')).id));
    loadProjectDropdownListEng();
    loadEmployeeDropdownList();
    // LOAD KENDO DATE PICKERS
    renderKendoDatePickerWithNewFormat('MeetingDate');
    renderKendoTimePicker('StartedTime');
    renderKendoTimePicker('EndedTime');



    if (parameterId > 0 == true) {
        fnEditById(parameterId);
    }




    $('#btn-save').click(function () {



        $("#DescriptionEng").val(tinymce.get("DescriptionEng").getContent({ format: "html" }));

        if (customValidateForm('frmAddUpdateMeeting')) {

            buttonAddPleaseWait('btn-save');

            $("#frmAddUpdateMeeting").ajaxForm();
            var options = {
                success: function (response, statusText, jqXHR) {
                    buttonRemovePleaseWait('btn-save', save, 'save');

                    swal(response);
                    var messageResponseParse = JSON.parse(response);
                    if (messageResponseParse.type == undefined) {
                        messageResponseParse = JSON.parse(messageResponseParse);
                    } if (messageResponseParse.type == undefined) {
                        messageResponseParse = JSON.parse(messageResponseParse);
                    }
                  //  $('#EmployeeId').val(messageResponseParse.insertedId);


                    //   window.location.href = '/Project/Client/List';

                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    buttonRemovePleaseWait('btn-save', save, 'save');
                    alert(errmsg);
                },
                complete: function () {
                    buttonRemovePleaseWait('btn-save', save, 'save');
                }
            };
            $("#frmAddUpdateMeeting").ajaxSubmit(options);
        }
        else {
            buttonRemovePleaseWait('btn-save', save, 'save');
            return false;
        }
    });



    //------------- DDL LOAD -------------------------------

    //Load Lists to Local Storage
    function loadProjectDropdownListEng() { ajaxRequest({ commandName: 'Project_DDL', values: { Language: _currentLanguage }, CallBack: fnloadProjectDropdownListEngCallBack }); }
    function fnloadProjectDropdownListEngCallBack(response) {

        // window.localStorage.setItem('CityListEng', response.Value);


        $("#ProjectDDL").kendoDropDownList({
            dataTextField: "name",
            dataValueField: "id",
            filter: "contains",
            value: -1,
            dataSource: JSON.parse(response.Value),
            change: function (e) {
                var selected_Id = this.value();
                $('#Project_Id').val(selected_Id);

            },
        });
    }

    function loadEmployeeDropdownList() { ajaxRequest({ commandName: 'HR_Employee_DDL', values: { Language: _currentLanguage }, CallBack: fnloadEmployeeDropdownListEngCallBack }); }
    function fnloadEmployeeDropdownListEngCallBack(response) {

        // window.localStorage.setItem('CityListEng', response.Value);


        $("#EmployeeDDL").kendoDropDownList({
            dataTextField: "name",
            dataValueField: "id",
            filter: "contains",
            value: -1,
            dataSource: JSON.parse(response.Value),
            change: function (e) {
                var selected_Id = this.value();

                $('#HR_Employee_Id').val(selected_Id);
            },
        });
    }




});



function fnEditById(clientId) {
    ajaxRequest({
        commandName: 'Client_Edit_By_Id',
        values: {
            Id: clientId,
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Language: $('#Language').val()
        }, CallBack: editByIdCallBack
    });
}
function editByIdCallBack(response) {
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

    $("#EmployeeDDL").data('kendoDropDownList').value(response.hr_Employee_Id);
    $("#ProjectDDL").data('kendoDropDownList').value(response.project_Id);

}
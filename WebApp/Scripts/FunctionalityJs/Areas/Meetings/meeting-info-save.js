var parameterId = (new URL(location.href)).searchParams.get('id'); var selectedProjectId= null, selectedEmployeeId = null
$(function () {

    $('#Language').val(_currentLanguage);
    $('#CreatedBy').val(parseInt(JSON.parse(localStorage.getItem('User')).id));
   
    // LOAD KENDO DATE PICKERS
    renderKendoDatePickerWithNewFormat('MeetingDate');
  //  renderKendoTimePicker('StartedTime');
  //  renderKendoTimePicker('EndedTime');



    if (parameterId > 0 == true) {
        fnEditById(parameterId);
    }
    else {
        loadProjectDropdownListEng();
        loadEmployeeDropdownList();
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


                       window.location.href = '/Project/Meeting/List';

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



    



});



function fnEditById(parameterId) {
     
    ajaxRequest({
        commandName: 'Meeting_Edit_By_Id',
        values: {
            Id: parseInt(parameterId),
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Language: $('#Language').val()
        }, CallBack: editByIdCallBack
    });
}
function editByIdCallBack(response) {
    var response = JSON.parse(response.Value);
    console.log(response)
    $('#Id').val(response.meetingId);
    $('#HR_Employee_Id').val(response.employeeId);
 
    $('#Client_Id').val(response.clientId);
    $('#Project_Id').val(response.projectId);
    $('#DescriptionEng').html(response.descriptionEng);
    //$("#StartedTime").data("kendoTimePicker").value(response.startedTime); 
    //$("#EndedTime").data("kendoTimePicker").value(response.endedTime);

    $('#StartedTime').val(response.startedTime);
    $('#EndedTime').val(response.endedTime);

    $("#MeetingDate").kendoDatePicker({ value: response.meetingDate, format: "dd/MM/yyyy" });

    //$("#ProjectDDL").data('kendoDropDownList').value(response.projectId);    
    //$("#EmployeeDDL").data('kendoDropDownList').value(response.employeeId);
    selectedProjectId = response.projectId;
    selectedEmployeeId= response.employeeId;
    loadProjectDropdownListEng();
    loadEmployeeDropdownList();
}



//------------- DDL LOAD -------------------------------

//Load Lists to Local Storage
function loadProjectDropdownListEng() { ajaxRequest({ commandName: 'Project_DDL', values: { Language: _currentLanguage }, CallBack: fnloadProjectDropdownListEngCallBack }); }
function fnloadProjectDropdownListEngCallBack(response) {

    // window.localStorage.setItem('CityListEng', response.Value);

    bindKendoDropdownList(JSON.parse(response.Value), 'Project_Id','name','id', 'Select', selectedProjectId);
    //$("#ProjectDDL").kendoDropDownList({
    //    dataTextField: "name",
    //    dataValueField: "id",
    //    filter: "contains",
    //    value: -1,
    //    dataSource: JSON.parse(response.Value),
    //    change: function (e) {
    //        var selected_Id = this.value();
    //        $('#Project_Id').val(selected_Id);

    //    },
    //});
}

function loadEmployeeDropdownList() { ajaxRequest({ commandName: 'HR_Employee_DDL', values: { Language: _currentLanguage }, CallBack: fnloadEmployeeDropdownListEngCallBack }); }
function fnloadEmployeeDropdownListEngCallBack(response) {

    // window.localStorage.setItem('CityListEng', response.Value);

    bindKendoDropdownList(JSON.parse(response.Value), 'HR_Employee_Id', 'name', 'id', 'Select', selectedEmployeeId);
    //$("#EmployeeDDL").kendoDropDownList({
    //    dataTextField: "name",
    //    dataValueField: "id",
    //    filter: "contains",
    //    value: -1,
    //    dataSource: JSON.parse(response.Value),
    //    change: function (e) {
    //        var selected_Id = this.value();

    //        $('#HR_Employee_Id').val(selected_Id);
    //    },
    //});
}

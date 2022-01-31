
$(function () {
    $('#Language').val(_currentLanguage);

 
    $("#ProfessionId").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        index: -1,
        dataSource: _currentLanguage == 'en-US' ? JSON.parse(localStorage.getItem('ProfessionListEng')) : JSON.parse(localStorage.getItem('ProfessionListArb')),
    });
    $("#NationalityId").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        index: -1,
        dataSource: _currentLanguage == 'en-US' ? JSON.parse(localStorage.getItem('NationalityListEng')) : JSON.parse(localStorage.getItem('NationalityListArb')),
    });
    $("#VisaSponsorshipId").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        index: -1,
        dataSource: _currentLanguage == 'en-US' ? JSON.parse(localStorage.getItem('SponsorshipListEng')) : JSON.parse(localStorage.getItem('SponsorshipListArb')),
    });
    $("#ContractTypeId").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        index: -1,
        dataSource: _currentLanguage == 'en-US' ? JSON.parse(localStorage.getItem('ContractTypeListEng')) : JSON.parse(localStorage.getItem('ContractTypeListArb')),
    });

    $("#EmiratesStateId").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        index: -1,
        dataSource: _currentLanguage == 'en-US' ? JSON.parse(localStorage.getItem('EmiratesStatesListEng')) : JSON.parse(localStorage.getItem('EmiratesStatesListArb')),
    });

    






    $('#btn-edit-employee').click(function () {
        
        if ($('#DepartmentId').val() == '') {
            $('#DepartmentId').val('0');
        }
        if (customValidateForm('frmAddUpdateEmployee')) {

            buttonAddPleaseWait('btn-edit-employee');

            $("#frmAddUpdateEmployee").ajaxForm();
            var options = {
                success: function (response, statusText, jqXHR) {
                    buttonRemovePleaseWait('btn-edit-employee', save, 'save');
              
                    swal(response);
                    //var messageResponseParse = JSON.parse(response);
                    //if (messageResponseParse.type == undefined) {
                    //    messageResponseParse = JSON.parse(messageResponseParse);
                    //} if (messageResponseParse.type == undefined) {
                    //    messageResponseParse = JSON.parse(messageResponseParse);
                    //}
                    //$('#EmployeeId').val(messageResponseParse.insertedId);


                    // window.location.href = '/HumanResource/Employee/Edit?id=' + messageResponseParse.insertedId;

                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    buttonRemovePleaseWait('btn-edit-employee', save, 'save');
                    alert(errmsg);
                },
                complete: function () {
                    buttonRemovePleaseWait('btn-edit-employee', save, 'save');
                }
            };
            $("#frmAddUpdateEmployee").ajaxSubmit(options);
        }
        else {
            buttonRemovePleaseWait('btn-edit-employee', save, 'save');
            return false;
        }
    });

    

});

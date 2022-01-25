
$(function () {
    $('#Language').val(_currentLanguage);

   
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

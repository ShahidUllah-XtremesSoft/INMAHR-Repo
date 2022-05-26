var parameterId = (new URL(location.href)).searchParams.get('id');
$(function () {

    $('#Language').val(_currentLanguage);
    $('#CreatedBy').val(parseInt(JSON.parse(localStorage.getItem('User')).id));

    if (parameterId > 0 == true) {


        fnEditContractorById(parameterId);
    }




    $('#btn-save-contractor').click(function () {
        var isEmailValid = true;
        if (customValidateForm('frmAddUpdateContractor')) {
            var thisFieldIsRequired = _currentLanguage == 'en-US' ? 'Email is invalid' : 'Email is invalid';
            if (!isValidEmail($('#Email').val())) {
                $('#Email').addClass('invalid');
                $('#Email').removeClass("invalid");
                $('#Email').next("span").remove();
                $('#Email').attr('title', thisFieldIsRequired);
                $('#Email').after("<span style='color:red;'>" + thisFieldIsRequired + "</span>");
                isEmailValid = false;
            } else {
                $('#Email').removeClass("invalid");
                $('#Email').next("span").remove();
            }
            
            if (isEmailValid) {
                buttonAddPleaseWait('btn-save-contractor');
                $("#frmAddUpdateContractor").ajaxForm();
                var options = {
                    success: function (response, statusText, jqXHR) {
                        buttonRemovePleaseWait('btn-save-contractor', save, 'save');

                        swal(response);
                        var messageResponseParse = JSON.parse(response);
                        if (messageResponseParse.type == undefined) {
                            messageResponseParse = JSON.parse(messageResponseParse);
                        } if (messageResponseParse.type == undefined) {
                            messageResponseParse = JSON.parse(messageResponseParse);
                        }

                        // fnEditContractorById(messageResponseParse.insertedId);

                        window.location.href = '/Project/Contractor/List';

                    },
                    error: function (xhr, status, error) {
                        var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                        buttonRemovePleaseWait('btn-save-contractor', save, 'save');
                        alert(errmsg);
                    },
                    complete: function () {
                        buttonRemovePleaseWait('btn-save-contractor', save, 'save');
                    }
                };
                $("#frmAddUpdateContractor").ajaxSubmit(options);
            }
            else {
                buttonRemovePleaseWait('btn-save-contractor', save, 'save');
                return false;
            }
        }
        else {
            buttonRemovePleaseWait('btn-save-contractor', save, 'save');
            return false;
        }
    });




});



function fnEditContractorById(ContractorId) {
    ajaxRequest({
        commandName: 'Contractor_Edit_By_Id',
        values: {
            Id: ContractorId,
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Language: $('#Language').val()
        }, CallBack: editContractorByIdCallBack
    });
}
function editContractorByIdCallBack(response) {
    var response = JSON.parse(response.Value);
    /*console.log(response)*/
    $('#Id').val(response.id);
    $('#NameEng').val(response.contractorName);
    $('#PhoneNumber').val(response.phoneNumber);
    $('#Email').val(response.email);
    $('#Location').val(response.location);
}
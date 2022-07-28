﻿$(function () {
    $('#Language').val(_currentLanguage);
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    $('#btn-save-penalty').on('click', function (e) {


        if (customValidateForm('frmCompanypenalty')) {
            $("#frmCompanypenalty").ajaxForm();
            buttonAddPleaseWait('btn-save-penalty');
            var options = {
                success: function (response, statusText, jqXHR) {
                    swal(response);
                    loadPenaltyGrid();
                    $('#btn-reset').click();
                },
                error: function (xhr, status, error) {
                    buttonRemovePleaseWait('btn-save-penalty', lblSave, 'save');
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
                , complete: function () {
                    buttonRemovePleaseWait('btn-save-penalty', lblSave, 'save');
                }
            };
            $("#frmCompanypenalty").ajaxSubmit(options);
        }
        else {

            buttonRemovePleaseWait('btn-save-penalty', lblSave, 'save');
        }
    });
})

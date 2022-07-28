$(function () {
    $('#Language').val(_currentLanguage);
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    $('#btn-save-rule').on('click', function (e) {


        if (customValidateForm('frmCompanyRules')) {
            $("#frmCompanyRules").ajaxForm();
            buttonAddPleaseWait('btn-save-rule');
            var options = {
                success: function (response, statusText, jqXHR) {
                    swal(response);
                    loadRulesGrid();
                    $('#btn-reset').click();
                },
                error: function (xhr, status, error) {
                    buttonRemovePleaseWait('btn-save-rule', lblSave, 'save');
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
                , complete: function () {
                    buttonRemovePleaseWait('btn-save-rule', lblSave, 'save');
                }
            };
            $("#frmCompanyRules").ajaxSubmit(options);
        }
        else {

            buttonRemovePleaseWait('btn-save-rule', lblSave, 'save');
        }
    });
})

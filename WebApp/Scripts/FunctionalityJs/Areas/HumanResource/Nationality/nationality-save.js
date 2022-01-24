$(function () {

    $('#btnSave').on('click', function (e) {

        if (customValidateForm('frmNationalityDetail')) {
            $("#frmNationalityDetail").ajaxForm();
            buttonAddPleaseWait('btnSave');
            var options = {
                success: function (response, statusText, jqXHR) {
                    swal(response);
                    loadNationalityGrid();
                    $('#Id').val(0);
                    ClearControls();
                },
                error: function (xhr, status, error) {
                    buttonRemovePleaseWait('btnSave', save, 'save');
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
                , complete: function () {
                    buttonRemovePleaseWait('btnSave', save, 'save');
                }
            };
            $("#frmNationalityDetail").ajaxSubmit(options);
        }
        else {

            buttonRemovePleaseWait('btnSave', save, 'save');
        }
    });
})


function ClearControls() {
    $('#NameEng').val('');
    $('#NameArb').val('');
}
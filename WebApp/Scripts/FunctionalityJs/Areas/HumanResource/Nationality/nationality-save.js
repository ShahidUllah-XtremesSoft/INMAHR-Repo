$(function () {

    $('#btn-save-nationality').on('click', function (e) {

        if (customValidateForm('frmNationalityDetail')) {
            $("#frmNationalityDetail").ajaxForm();
            buttonAddPleaseWait('btn-save-nationality');
            var options = {
                success: function (response, statusText, jqXHR) {
                    swal(response);
                    loadNationalityGrid();
                    $('#Id').val(0);
                    ClearControls();
                },
                error: function (xhr, status, error) {
                    buttonRemovePleaseWait('btn-save-nationality', 'Save', 'save');
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
                , complete: function () {
                    buttonRemovePleaseWait('btn-save-nationality', 'Save', 'save');
                }
            };
            $("#frmNationalityDetail").ajaxSubmit(options);
        }
        else {

            buttonRemovePleaseWait('btn-save-nationality', 'Save', 'save');
        }
    });
})


function ClearControls() {
    $('#NameEng').val('');
    $('#NameArb').val('');
}
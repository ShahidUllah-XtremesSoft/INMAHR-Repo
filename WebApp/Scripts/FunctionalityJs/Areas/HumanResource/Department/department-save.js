$(function () {

    $('#btn-save-Department').on('click', function (e) {

        if (customValidateForm('frmDepartmentDetail')) {
            $("#frmModuleDetail").ajaxForm();
            buttonAddPleaseWait('btn-save-Department');
            var options = {
                success: function (response, statusText, jqXHR) {
                    swal(response);
                    loadDepartmentGrid();
                    loadDepartmentDropdownList();
                },
                error: function (xhr, status, error) {
                    buttonRemovePleaseWait('btn-save-Department', 'Save', 'save');
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
                , complete: function () {
                    buttonRemovePleaseWait('btn-save-Department', 'Save', 'save');
                }
            };
            $("#frmDepartmentDetail").ajaxSubmit(options);
        }
        else {

            buttonRemovePleaseWait('btn-save-Department', 'Save', 'save');
        }
    });
})
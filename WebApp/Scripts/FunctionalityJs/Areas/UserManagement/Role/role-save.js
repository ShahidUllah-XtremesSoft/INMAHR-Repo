$(function () {

    $('#btnSave').on('click', function (e) {


        if (customValidateForm('frmRoleDetail')) {
            $("#frmRoleDetail").ajaxForm();
            buttonAddPleaseWait('btnSave');
            var options = {
                success: function (response, statusText, jqXHR) {
                    console.log(response);
                    swal(response);
                    loadRoleGrid();
                    loadRoleDropdownList(true);
                    buttonRemovePleaseWait('btnSave', 'Save', 'save');

                },
                error: function (xhr, status, error) {
                    
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
                , complete: function () {
                    buttonRemovePleaseWait('btnSave', 'Save', 'save');
                }
            };
            $("#frmRoleDetail").ajaxSubmit(options);
        }
        else {

            buttonRemovePleaseWait('btnSave', 'Save', 'save');
        }
    });
})
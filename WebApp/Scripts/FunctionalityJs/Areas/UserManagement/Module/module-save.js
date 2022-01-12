$(function () {

    $('#btnSave').on('click', function (e) {


        if (customValidateForm('frmModuleDetail')) {
            $("#frmModuleDetail").ajaxForm();          
            buttonAddPleaseWait('btnSave');
            var options = {
                success: function (response, statusText, jqXHR) {
                    console.log(response);
                    swal(response);                   
                    loadModuleGrid();
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
            $("#frmModuleDetail").ajaxSubmit(options);
        }
        else {

            buttonRemovePleaseWait('btnSave', 'Save', 'save');
        }
    });
})
$(function () {

    $('#btnSave').on('click', function (e) {
        
        if (customValidateForm('frmDepartmentDetail')) {
            $("#frmModuleDetail").ajaxForm();
            buttonAddPleaseWait('btnSave');
            var options = {
                success: function (response, statusText, jqXHR) {
                    var type = swal(response);                    
                    if (type == 'success') {
                        loadDepartmentGrid();
                        loadDepartmentDropdownList();
                        clearFields();
                    }
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
            $("#frmDepartmentDetail").ajaxSubmit(options);
        }
        else {

            buttonRemovePleaseWait('btnSave', save, 'save');
        }        
    });
});
function clearFields() {
    $('#Id').val('0');
    $('#DepartmentId').data("kendoDropDownList").value('');
    $('#NameEng').val('');
    $('#NameArb').val('');
}
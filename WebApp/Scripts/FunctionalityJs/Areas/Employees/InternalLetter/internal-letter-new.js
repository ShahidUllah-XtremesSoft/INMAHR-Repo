$(function () {
    //Values settings starts
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    $("#LetterDate").kendoDatePicker({
        //format: "yyyy-MM-dd"
    });
    var todayDate = kendo.toString(kendo.parseDate(new Date()), 'MM/dd/yyyy');
    $("#LetterDate").data("kendoDatePicker").value(todayDate);
    var datepicker = $("#LetterDate").data("kendoDatePicker");
    datepicker.readonly();
    //Values settings ends

    //Functions calling
    getLetterNextNumber();
    loadDepartmentTreeDropdownListWithCheckbox();
    loadRoleDropdownList(false);
    setTimeout(function () {
        $("#DepartmentId").data("kendoDropDownTree").bind("change", departmentTreeViewCheck);
        //var treeview = $("#DepartmentId").data("kendoDropDownTree");
        //treeview.bind("check", tree_check);
    }, 500);
    //Events Starts
    $('#btnSave').on('click', function (e) {
        var valid = true;
        $("#Body").val(tinymce.get("Body").getContent({ format: "html" }));
        if ($('#DepartmentIds').val() == null || $('#DepartmentIds').val() == '' || $('#DepartmentIds').val() == -1 || $('#DepartmentIds').val() == '0') {
            $('#DepartmentId').addClass('invalid');
            $('#DepartmentId').attr('title', 'This field is required');
            $('#DepartmentId').removeClass("invalid");
            $('#DepartmentId').next("span").remove();
            $('#DepartmentId').after("<span style='color:red;'>This field is required</span>");
            valid = false;
        }
        else {
            $('#DepartmentId').removeClass("invalid");
            $('#DepartmentId').next("span").remove();

        }
        if (true == customValidateForm('frmEmployeeInternalLetter') && valid == true) {            
            $("#frmEmployeeInternalLetter").ajaxForm();
            buttonAddPleaseWait('btnSave');
            var options = {
                success: function (response, statusText, jqXHR) {
                    buttonRemovePleaseWait('btnSave', 'Save', 'save');
                    swal(response);
                    //clearFields();
                    //getLetterNextNumber                    
                    window.location.href = '/Employees/InternalLetter';
            
                },
                error: function (xhr, status, error) {
                    buttonRemovePleaseWait('btnSave', 'Save', 'save');
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
                , complete: function () {
                    buttonRemovePleaseWait('btnSave', 'Save', 'save');
                }
            };
            $("#frmEmployeeInternalLetter").ajaxSubmit(options);
        }
        else {
            
            buttonRemovePleaseWait('btnSave', 'Save', 'save');
        }
    });
    //Events ends
});

function loadRoleDropdownList(isBindChangeEvent = false) {
    if ('en-US' == _currentLanguage) {
        loadKendoDropdownList('SignatureBy', 'Id [Value], NameEng [Text]', 'UserManagement_Role', "NameEng IS NOT NULL AND NameEng <> 'User'", 0, 'moduleDropdownListOnChange');
    }
    else {
        loadKendoDropdownList('SignatureBy', 'Id [Value], NameArb [Text]', 'UserManagement_Role', "NameArb IS NOT NULL AND NameEng <> 'User'", 0, 'moduleDropdownListOnChange');
    }
    setTimeout(function () {
        if (isBindChangeEvent) {
            $("#ModuleDropdownList").data("kendoDropDownList").bind("change", moduleDropdownListOnChange);
        }
    }, 1500);
}
function getLetterNextNumber() {
    ajaxRequest({ commandName: 'Employee_InternalLetter_GetNextNumber', values: {}, CallBack: getLetterNextNumberCallBack });

}
var getLetterNextNumberCallBack = function (inputDataJSON) {
    $('#LetterNumber').val(JSON.parse(inputDataJSON.Value).letterNumber);
}

function departmentTreeViewCheck(e) {

    //console.log("Checking", e.sender._values);
    $('#DepartmentIds').val('');
    var selectedDepartments = e.sender._values;
    var concatenatedDepartments = '';
    selectedDepartments.forEach(function (item) {
        //console.log("item", item);
        concatenatedDepartments += concatenatedDepartments == '' ? item : ',' + item;
    });
    //alert(concatenatedDepartments);
    $('#DepartmentIds').val(concatenatedDepartments);
    //$('#DepartmentIds').val()
}

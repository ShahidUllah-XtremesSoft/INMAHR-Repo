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

    //loadDepartmentTreeDropdownListWithCheckbox();   // THIS IS OLD DEPARTMENT DDL LOAD FN
    loadDepartmentTreeDropdownListWithRoleBaseAndCheckbox();
    // loadRoleDropdownList(false);
    setTimeout(function () {
        $("#DepartmentId").data("kendoDropDownTree").bind("change", departmentTreeViewCheck);
        //var treeview = $("#DepartmentId").data("kendoDropDownTree");
        //treeview.bind("check", tree_check);
    }, 500);
    //Events Starts
    $('#btnSave').on('click', function (e) {
        var thisFieldIsRequired = _currentLanguage == 'en-US' ? 'This field is required' : 'هذه الخانة مطلوبة';
        var valid = true;
        $("#Body").val(tinymce.get("Body").getContent({ format: "html" }));
        if ($('#DepartmentIds').val() == null || $('#DepartmentIds').val() == '' || $('#DepartmentIds').val() == -1 || $('#DepartmentIds').val() == '0') {
            $('#DepartmentId').addClass('invalid');
            $('#DepartmentId').attr('title', thisFieldIsRequired);
            $('#DepartmentId').removeClass("invalid");
            $('#DepartmentId').next("span").remove();
            $('#DepartmentId').after("<span style='color:red;'>" + thisFieldIsRequired + "</span>");
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
                    buttonRemovePleaseWait('btnSave', lblSend, 'send');
                    swal(response);
                    //clearFields();
                    //getLetterNextNumber                    
                    // Insertion to multiple Internal letter table .

                    if (JSON.parse(JSON.parse(response)).type == 'success') {
                        setTimeout(function () {
                            loopThroughGrid();
                        }, 100);
                    }

                },
                error: function (xhr, status, error) {
                    buttonRemovePleaseWait('btnSave', lblSend, 'send');
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
                , complete: function () {
                    buttonRemovePleaseWait('btnSave', lblSend, 'send');
                }
            };
            $("#frmEmployeeInternalLetter").ajaxSubmit(options);

        }
        else {

            buttonRemovePleaseWait('btnSave', lblSend, 'send');
        }
    });
    //Events ends
    setTimeout(function () { $('.tox-notifications-container').hide(); }, 1000);

    if (JSON.parse(localStorage.getItem('User')).roleName == 'User') {
        $('#btn-signature').hide();
    }
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
    var getLastValue = 0
    //console.log("Checking", e.sender._values);
    $('#DepartmentIds').val('');
    var selectedDepartments = e.sender._values;
    var concatenatedDepartments = '';
    selectedDepartments.forEach(function (item) {
        //console.log("item", item);
        concatenatedDepartments += concatenatedDepartments == '' ? item : ',' + item;
        getLastValue = item;
    });
    //alert(concatenatedDepartments);
    $('#DepartmentIds').val(concatenatedDepartments);

    //$('#DepartmentIds').val() 
    loadAllEmployeesAsPerDepartmentId();
}


function loadAllEmployeesAsPerDepartmentId() {

    ajaxRequest({
        commandName: 'Employee_InternalLetter_GetEmployeesByParameters',
        values:
        {
            LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            LoggedInEmployeeDepartmentId: JSON.parse(localStorage.getItem('User')).employeeDepartmentId,
            DepartmentIds: $('#DepartmentIds').val(),
            Language: _currentLanguage
        }, CallBack: getloadAllEmployeesAsPerDepartmentId
    });

}

var getloadAllEmployeesAsPerDepartmentId = function (inputDataJSON) { bindGridData(JSON.parse(inputDataJSON.Value)); }
var bindGridData = function (inputDataJSON) {

    var gridColumns = [
        {
            title: '',

            headerTemplate: "<input type='checkbox' id='checkAll'  class='k-checkbox header-checkbox'>",
            template: function (dataItem) {
                if (dataItem.isAssigned == 1) { return "<div><input type='checkbox' class='k-checkbox row-checkbox' onclick='fnCheckUncheck(this)' id='target' checked ></div>"; }
                else { return "<div><input type='checkbox' class='k-checkbox row-checkbox' onclick='fnCheckUncheck(this)' id='target' unchecked='true'></div>"; }
            },
            width: 5
        },
        { field: "id", title: "id", hidden: true },
        { field: "internalLetterRoleId", title: "InternalLetterRoleId", hidden: true },
        { field: "departmentId", title: "DepartmentId", hidden: true },
        { field: "isCompany", title: "IsCompany", hidden: true },
        { field: "employeeNumber", title: employeeNumber, hidden: false, width: 20 },
        { field: "name", title: lblName, hidden: false, width: 20 },
        { field: "department", title: section, hidden: false, width: 20 },
        { field: "roleName", title: lblRole, hidden: false, width: 20 },


    ];

    bindKendoGrid('load-employees-by-role-and-department', 50, gridColumns, inputDataJSON, true);

    $('#btn-select-records-from-grid').attr('disabled', true)
};
function fnCheckUncheck(e) {

    if (e.checked) {
        $('#btn-select-records-from-grid').attr('disabled', false)
    } else {
        $('#btn-select-records-from-grid').attr('disabled', true)

    }
}

$(document).on("click", "#checkAll", function () {

    if (this.checked) {

        $("#load-employees-by-role-and-department tbody input:checkbox").attr("checked", true);
        $('#btn-select-records-from-grid').attr('disabled', false)
    } else {
        $("#load-employees-by-role-and-department tbody input:checkbox").attr("checked", false);
        $('#btn-select-records-from-grid').attr('disabled', true)

    }
});

$('#btn-select-records-from-grid').click(function (e) {
    buttonAddPleaseWait('btn-select-records-from-grid');

    var getSelectedEmployeesIdFromGrid = getIdsFromGrid(this.value, 'btn-select-records-from-grid', 'save');
    $('#Reciever_HR_Employee_Ids').val(getSelectedEmployeesIdFromGrid);
});

function getIdsFromGrid(btnValue, btnId, btnIcon) {
    $('.showAllSelecttedEmployee').empty('');
    $('.showAllSelecttedSection').empty('');
    var grid = $("#load-employees-by-role-and-department").data("kendoGrid");
    var gridDataSource = grid.dataSource._data;
    var ids = '';

    for (var i = 0; i < gridDataSource.length; i++) {
        var isAssigned = grid.tbody.find("tr:eq(" + i + ")").find('.row-checkbox').is(':checked');
        if (isAssigned == true) {
            var gridRow = gridDataSource[i];
            ids += ids == '' ? gridRow.id : ',' + gridRow.id;
            //   nameArray.push(gridRow.name);

            $('.showAllSelecttedEmployee').append('<button type="button" class="btn btn-outline-primary waves-effect waves-light"> ' + gridRow.name + '</button>');
            $('.showAllSelecttedSection').append('<button type="button" class="btn btn-outline-danger waves-effect waves-light"> ' + gridRow.department + '</button>')
        }
    }
    if (ids.length > 0) {

        if (btnValue == "Select") {
            btnValue = _currentLanguage == "en-US" ? "Select" : "اختر";
        }
        buttonRemovePleaseWait(btnId, btnValue, btnIcon);
        $('.btnClose').click();

        // $('.showAllSelecttedSection').text( $('.k-multiselect-wrap.k-floatwrap').text())
        //--ASSIGN EMPLOYEE NAMES
        //for (var i = 0; i < nameArray.length; i++) {
        //    $('.showAllSelecttedEmployee').append('<button type="button" class="btn btn-outline-primary waves-effect waves-light"> ' + gridRow.name + '</button>')
        //}
        return ids;



    } else {

        if (btnValue == "Select") {
            btnValue = _currentLanguage == "en-US" ? "Select" : "اختر";
        }

        buttonRemovePleaseWait(btnId, btnValue, btnIcon);
        swalMessage('info', lblFristSelectRecordFromGrid, 1500);
        return 0;
    }


}


function loopThroughGrid(e) {

    var grid = $("#load-employees-by-role-and-department").data("kendoGrid");
    /*
        { field: "id", title: "id", hidden: true },
        { field: "internalLetterRoleId", title: "InternalLetterRoleId", hidden: true },
        { field: "departmentId", title: "DepartmentId", hidden: true },
        { field: "isCompany", title: "IsCompany", hidden: true },
        { field: "employeeNumber", title: employeeNumber, hidden: false, width: 20 },
        { field: "name", title: lblName, hidden: false, width: 20 },
        { field: "department", title: section, hidden: false, width: 20 },
        { field: "roleName", title: lblRole, hidden: false, width: 20 },
    @Id							INT
   ,@LetterNumber				NVARCHAR(50)
   ,@LetterDate					DATETIME
   ,@Subject					NVARCHAR(MAX)
   ,@SignedBy					INT
   ,@Body						NVARCHAR(MAX)
   ,@IsRead						BIT = 0
   ,@IsImportant				BIT = 0
   ,@Tag						NVARCHAR(MAX)
   ,@DepartmentIds				NVARCHAR(MAX)
   ,@CreatedBy					INT
   ,@Language					NVARCHAR(10)
   ,@Reciever_HR_Employee_Ids	NVARCHAR(MAX)
     
      
       * */


    var gridd = grid.dataSource._data;
    var postingArray = [];
    for (var i = 0; i < gridd.length; i++) {
        var isAssigned = grid.tbody.find("tr:eq(" + i + ")").find('.row-checkbox').is(':checked');

        var gridRow = gridd[i];
        if (isAssigned == true) {
            postingArray.push(
                {

                    //--------- Grid Data-------------
                    LetterId: 0,
                    C_Employee_InternalLetterMultiple_Id: 0,
                    LetterNumber: $('#LetterNumber').val(),
                    LetterDate: $('#LetterDate').val(),
                    EmployeeId: parseInt(gridRow.id),
                    DepartmentId: parseInt(gridRow.departmentId),
                    EmployeeInternalLetterRoleId: parseInt(gridRow.internalLetterRoleId),
                    CreatedBy: parseInt($('#CreatedBy').val()),
                    SignedBy: 0,
                    IsRead: 0,
                    IsImportant: 0,
                    LetterStatus: 'New'
                });
        }

    }
    if (postingArray.length > 0) {
        console.log(postingArray)
        ajaxRequest({
            commandName: 'Employee_InternalLetter_Save_Multiple',
            values:
            {
                InternalLetterData: postingArray,
                CreatedBy: $('#CreatedBy').val(),
                Language: $('#Language').val()
            }, CallBack: ''
        });
        setTimeout(function () {
            //       window.location.href = '/Employees/InternalLetter';
            window.location.href = '/Employees/InternalLetter/SendLetters';
        }, 1000);
    }
    //else {
    //    buttonRemovePleaseWait('btnSave', save, 'save');
    //    swalMessage('info', 'First select records from grid', 1500);
    //}

}




function fnUploadEmployeeSignature() {

    ajaxRequest({
        commandName: 'HR_Employee_Signature_Get',
        values: {
            //LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
            //LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId,
            //LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            // Language: _currentLanguage,
        }, CallBack: loadfnUploadEmployeeSignatureCallBack
    });

}

function loadfnUploadEmployeeSignatureCallBack(d) {

    var _employeeSignature = JSON.parse(d.Value);

    if (_employeeSignature == null) {
        $('#noSignature').show();
    } else {
        $('#noSignature').hide();
        $('#loadSignature').show();

         if (_employeeSignature.currentFileName != null) {
            var singature_ = '/UploadFile/' + _employeeSignature.currentFileName;
            $('#loadEmployeeSignature').attr('src', singature_);
             $('#SignedBy').val(1);
            $('#Signature').val(_employeeSignature.currentFileName);
        }
    }

}
 
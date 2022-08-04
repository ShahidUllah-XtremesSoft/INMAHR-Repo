var queryStringLetterId = 0, requestCameFrom;

$(function () {
    queryStringLetterId = (new URL(location.href)).searchParams.get('value');


    getInternalLetterById(queryStringLetterId);
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
    // getLetterNextNumber();

    //loadDepartmentTreeDropdownListWithCheckbox();   // THIS IS OLD DEPARTMENT DDL LOAD FN
    //loadDepartmentTreeDropdownListWithRoleBaseAndCheckbox();

    // setTimeout(function () { $("#DepartmentId").data("kendoDropDownTree").bind("change", departmentTreeViewCheck); }, 500);


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
                    buttonRemovePleaseWait('btnSave', lblSend, 'reply');
                    swal(response);
                    setTimeout(function () {
                        fnInsertToMultipleTable();
                    }, 200);

                },
                error: function (xhr, status, error) {
                    buttonRemovePleaseWait('btnSave', lblSend, 'reply');
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
                , complete: function () {
                    buttonRemovePleaseWait('btnSave', lblSend, 'reply');
                }
            };
            $("#frmEmployeeInternalLetter").ajaxSubmit(options);

        }
        else {

            buttonRemovePleaseWait('btnSave', lblSend, 'reply');
        }
    });
    //Events ends
    setTimeout(function () { $('.tox-notifications-container').hide(); }, 1000);



    if (JSON.parse(localStorage.getItem('User')).roleName == 'User') {
        $('#btn-signature').hide();
    }
});


//------------------ LOAD DATA AS PER LETTER ID   --------------------
function getInternalLetterById(queryStringLetterId) {
    ajaxRequest({ commandName: 'Employee_InternalLetter_GetById_New_For_Reply', values: { Id: parseInt(queryStringLetterId), Language: _currentLanguage }, CallBack: getInternalLetterByIdCallBack });

}
var getInternalLetterByIdCallBack = function (inputDataJSON) {



    var responseJSON = JSON.parse(inputDataJSON.Value);
    var letterToArray = responseJSON.letterTo.split(',');

    $('#Id').val(responseJSON.id);
    $('#LetterNumber').val(responseJSON.number);
    $('#Subject').val(responseJSON.subject);
    $('#DepartmentIds').val(responseJSON.senderDepartmentID);
    $('#Reciever_HR_Employee_Ids').val(responseJSON.senderEmployeeId);
 //   $('#divFrom').append('<button type="button" class="btn btn btn-success waves-effect waves-light">' + responseJSON.createdBy + '</button>');
    $('#divFrom').append('<button type="button" class="btn btn btn-outline-dark waves-effect waves-light">' + responseJSON.createdBy + '</button>');
    //setTimeout(function () {
    //    $('#Body').html(responseJSON.body);
    //}, 100);

    // fnUploadEmployeeSignature(responseJSON.empSignature);

}

//--------------------------------------------------- END





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
//function getLetterNextNumber() {
//    ajaxRequest({ commandName: 'Employee_InternalLetter_GetNextNumber', values: {}, CallBack: getLetterNextNumberCallBack });

//}
//var getLetterNextNumberCallBack = function (inputDataJSON) {

//    $('#LetterNumber').val(JSON.parse(inputDataJSON.Value).letterNumber);
//}

/*
function departmentTreeViewCheck(e) {
    var getLastValue = 0

    $('#DepartmentIds').val('');
    var selectedDepartments = e.sender._values;
    var concatenatedDepartments = '';
    selectedDepartments.forEach(function (item) {

        concatenatedDepartments += concatenatedDepartments == '' ? item : ',' + item;
        getLastValue = item;
    });

    $('#DepartmentIds').val(concatenatedDepartments);
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

    var grid = $("#load-employees-by-role-and-department").data("kendoGrid");
    var gridDataSource = grid.dataSource._data;
    var ids = '';
    for (var i = 0; i < gridDataSource.length; i++) {
        var isAssigned = grid.tbody.find("tr:eq(" + i + ")").find('.row-checkbox').is(':checked');
        if (isAssigned == true) {
            var gridRow = gridDataSource[i];
            ids += ids == '' ? gridRow.id : ',' + gridRow.id;
        }
    }
    if (ids.length > 0) {

        if (btnValue == "Select") {
            btnValue = _currentLanguage == "en-US" ? "Select" : "اختر";
        }
        buttonRemovePleaseWait(btnId, btnValue, btnIcon);
        $('.btnClose').click();

        $('.showAllSelecttedSection').text($('.k-multiselect-wrap.k-floatwrap').text())

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


    var gridd = grid.dataSource._data;
    var postingArray = [];
    for (var i = 0; i < gridd.length; i++) {
        var isAssigned = grid.tbody.find("tr:eq(" + i + ")").find('.row-checkbox').is(':checked');

        var gridRow = gridd[i];
        if (isAssigned == true || gridRow.id > 0) {
            postingArray.push(
                {

                    //--------- Grid Data-------------
                    LetterId: parseInt($('#Id').val()),
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
                    LetterStatus: 'Reply'
                });
        }

    }
    if (postingArray.length > 0) {
        ajaxRequest({
            commandName: 'Employee_InternalLetter_Reply_Multiple',
            values:
            {
                InternalLetterData: postingArray,
                CreatedBy: $('#CreatedBy').val(),
                Language: $('#Language').val()
            }, CallBack: ''
        });
        setTimeout(function () {
            window.location.href = '/Employees/InternalLetter';
        }, 1000);
    }
}
*/
function fnInsertToMultipleTable(e) {
    var postingArray = [];


    postingArray.push(
        {
            LetterId: parseInt($('#Id').val()),
            C_Employee_InternalLetterMultiple_Id: 0,
            LetterNumber: $('#LetterNumber').val(),
            LetterDate: $('#LetterDate').val(),
            EmployeeId: parseInt($('#Reciever_HR_Employee_Ids').val()),
            DepartmentId: parseInt($('#DepartmentIds').val()),
            EmployeeInternalLetterRoleId: 0,
            CreatedBy: parseInt($('#CreatedBy').val()),
            SignedBy: 0,
            IsRead: 0,
            IsImportant: 0,
            LetterStatus: 'Reply'
        });

    if (postingArray.length > 0) {
        ajaxRequest({
            commandName: 'Employee_InternalLetter_Reply_Multiple',
            values:
            {
                InternalLetterData: postingArray,
                CreatedBy: $('#CreatedBy').val(),
                Language: $('#Language').val()
            }, CallBack: ''
        });
        setTimeout(function () {
            window.location.href = '/Employees/InternalLetter/ReceivedLetters';
        }, 1000);
    }
}



//--------------------- LOAD EMPLOYEE SIGNAGUE 


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

var $PromotionGrid = "grid-promotion";

$(function () {
    //--- Load DDL's
    loadEmployeeProfile();
    fnLoadSection_DDL();
    fnLoadProfession_DDL();
    //--- Load Grid
    fnLoadPromotionGrid();
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    $('#Language').val(_currentLanguage)
    renderKendoDatePickerWithNewFormat('PromotionDate');

    var NewDate = $("#PromotionDate").data('kendoDatePicker');
    NewDate.value(new Date());
});


$('#btn-save-promotion').on('click', function (e) {
     
    if (customValidateForm('frmAddUpdatePromotion')) {
        $("#frmAddUpdatePromotion").ajaxForm();
        buttonAddPleaseWait('btn-save-promotion');
        var options = {
            success: function (response, statusText, jqXHR) {
                swal(response);
                fnLoadPromotionGrid();
                $('#frmAddUpdatePromotion')[0].reset();
                $('#PromotionID').val(0);

            },
            error: function (xhr, status, error) {
                buttonRemovePleaseWait('btn-save-promotion', save, 'save');
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                alert(errmsg);
            }
            , complete: function () {
                buttonRemovePleaseWait('btn-save-promotion', save, 'save');
                fnLoadAllowanceTypeGrid();
            }
        };
        $("#frmAddUpdatePromotion").ajaxSubmit(options);
    }
    else {

        buttonRemovePleaseWait('btn-save-promotion', save, 'save');
    }

});

 
$('#btn-search').on('click', function (e) {

    var departmentID = $("#DepartmentId").val();
    var hr_Employee_Id = $("#HR_Employees").data("kendoDropDownList");
    var text = hr_Employee_Id.text();
    var employeeNumber = $.trim(text.split('-')[0]);
    $('#HR_Employee_Id').val(hr_Employee_Id.value());
    $('#HR_DepartmentId').val(departmentID);

    ajaxRequest({ commandName: 'HR_Employee_GetByNumber', values: { Language: _currentLanguage, EmployeeNumber: employeeNumber }, CallBack: loadEmployeeProfileCallBack });

});
function loadEmployeeProfile() {
    var employeeNumber = JSON.parse(localStorage.getItem('User')).employeeNumber;
    ajaxRequest({ commandName: 'HR_Employee_GetByNumber', values: { Language: _currentLanguage, EmployeeNumber: employeeNumber }, CallBack: loadEmployeeProfileCallBack });
}
function loadEmployeeProfileCallBack(response) {
    if (JSON.parse(response.Value) != null) {

        $('#CreatedBy').val(JSON.parse(response.Value).id);
        $('#EmployeeId').val(JSON.parse(response.Value).employeeId);
        localStorage.setItem('EmployeeIdToLoadLeaveBalance', JSON.parse(response.Value).employeeId);
        $('#CurrentProfessionId').val(JSON.parse(response.Value).professionId);
        $.each(JSON.parse(response.Value), function (key, value) {
            $('#' + capitalizeFirstLetter(key)).text(value);
        });
         
        var profileImage = '';
        if (JSON.parse(response.Value).currentFileName != null) {
              profileImage = '/UploadFile/' + JSON.parse(response.Value).currentFileName;
          
        } else {
            profileImage = '/Content/Images/user.jpg';

        }
        $('#ProfileImage').attr('src', profileImage);
        if ($('#From_HR_Profession_Id').data("kendoDropDownList") != undefined) {

            $('#From_HR_Profession_Id').data("kendoDropDownList").value($('#CurrentProfessionId').val());
        }
    }
}


function fnLoadPromotionGrid() {

    //values - are key value pair json object
    ajaxRequest({ commandName: 'Setup_Promotion_Get', values: { Language: _currentLanguage }, CallBack: fnLoadPromotionGridCallBack });
}
var fnLoadPromotionGridCallBack = function (inputDataJSON) {
    bindfnLoadPromotionGrid(JSON.parse(inputDataJSON.Value));
}
var bindfnLoadPromotionGrid = function (inputDataJSONs) {
    
    var gridColumns = [
        { title: "#", template: "<b>#= ++record #</b>", width: 10, },
        { field: "promotionID", title: "PromotionID", hidden: true },
        { field: "departmentId", title: "DepartmentId", hidden: true },
        { field: "employee_Id", title: "Employee_Id", hidden: true },
        { field: "from_HR_Profession_Id", title: "from_HR_Profession_Id", hidden: true },
        { field: "to_HR_Profession_Id", title: "To_HR_Profession_Id", hidden: true },

        { field: "departmentName", title: lblSection, width: 80, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "employeeName", title: lblEmployeeName, width: 80, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "profession_from", title: lblFrom, width: 50, filterable: false },
        { field: "profession_to", title: lblTo, width: 50, filterable: false },
        { field: "promotionDate", title: "Date", hidden: true, width: 50, filterable: false },
        { field: "promotionDateFormated", title: lblDate, width: 40, filterable: false },
        { field: "promotionType", title: lblType, width: 40, filterable: false },
        {
            field: "",
            width: 40,
            title: lblAttachment,
            template: `<a style='font-size:20px;cursor:pointer;' onClick= viewAttachment('#=currentFileName#')  title=" + lblAttachment+">
                        #if(currentFileName == null){}
                        else{
                        if(currentFileName.split('.').pop().toLowerCase() == 'pdf')
                        {#<img src='/Content/Images/pdf.png' style='width:30px;cursor:pointer;'/></a>#}
                        else if(currentFileName.split('.').pop().toLowerCase() == 'xls' || currentFileName.split('.').pop().toLowerCase() == 'xlsx')
                        {#<img src='/Content/Images/xls.png' style='width:30px;cursor:pointer;'/></a>#}
                        else
                        {#<img src='/Content/Images/ImageIcon.png' style='width:33px;height:34px;cursor:pointer;'/></a>
                        #}
                        }#`
        },
          //Below is action column
        {
            field: "", width: 20,
            title: "",
            template: `<a style='font-size:20px;cursor:pointer;' onClick=deletePromotion(this)  title='Delete'><span class='fa fa-trash'></span></a>  `
 /*<a style='font-size:20px;cursor:pointer;' onClick=editPromotion(this) title='Edit' ><span class='fa fa-edit'></span></a>*/

        }
    ];

    bindKendoGrid($PromotionGrid, 250, gridColumns, inputDataJSONs,false,410);
};
function viewAttachment(currentFileName) {

    if (currentFileName == "null") {
        swalMessage('info', 'Attachment not found', 2000);
        return false;
    }
    window.open('/UploadFile/' + currentFileName, '_blank');
}

function editPromotion(eventt) {
/*
    var rows = $(eventt).closest("tr");
    var grid = $("#" + $PromotionGrid).data("kendoGrid");
    var dataItem = grid.dataItem(rows);
    $('#PromotionID').val(dataItem.promotionID);
    
    $("#HR_Employee_Id").data("kendoDropDown").value(dataItem.employee_Id);
    $("#DepartmentId").data("kendoDropDown").value(dataItem.from_HR_Profession_Id);
    $("#DepartmentId").data("kendoDropDownTree").value(dataItem.departmentId);
    $("#HR_DepartmentId").val(dataItem.departmentId);

*/
}

function deletePromotion(event) {
    var rows = $(event).closest("tr");
    var gridd = $("#" + $PromotionGrid).data("kendoGrid");
    var dataIteem = gridd.dataItem(rows);
    Swal.fire({

        title: areYouSureTitle,
        text: doYouReallyWantToDeletThisRecord,
        //input: 'text',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#5cb85c',
        cancelButtonColor: '#d9534f',
        confirmButtonText: btnYesText,
        cancelButtonText: btnNoText,
        buttons: {
            cancel: {
                text: "No",
                value: null,
                visible: true,
                className: "btn btn-danger",
                closeModal: true
            },
            confirm: {
                text: "Yes",
                value: true,
                visible: true,
                className: "btn btn-warning",
                closeModal: true
            }
        }
    }).then(function (restult) {
        if (restult.value) {
            ajaxRequest({ commandName: 'Setup_Promotion_Delete', values: { Id: dataIteem.promotionID, Language: _currentLanguage }, CallBack: deletePromotionByIdCallBack });
        }
    });
    var deletePromotionByIdCallBack = function (response) {
        swal(response.Value);
        fnLoadPromotionGrid();
    }
}




//---------------------------------  DDL's

function fnLoadSection_DDL() {

    loadDepartmentTreeDropdownList();
    setTimeout(function () {

        $("#DepartmentId").data("kendoDropDownTree").bind("change", fnLoadSection_DDLCallBack);
    }, 1000);
}

function fnLoadSection_DDLCallBack(e) {

    $('#DepartmentId').val('');
    var selectedDepartments = e.sender._values;
    var concatenatedDepartments = '';
    selectedDepartments.forEach(function (item) {
        concatenatedDepartments += concatenatedDepartments == '' ? item : ',' + item;
    });
    $('#DepartmentId').val(concatenatedDepartments);


    fnLoadEmployees_DDL();

}
function fnLoadEmployees_DDL() {

    ajaxRequest({
        commandName: 'Employees_Get_By_DepartmentID', values: {
            CreatedBy: JSON.parse(localStorage.getItem('User')).id,
            LoggedInUserDepartmentId: JSON.parse(localStorage.getItem('User')).departmentId,
            SearchByDepartmentId: $('#DepartmentId').val() == '' ? JSON.parse(localStorage.getItem('User')).departmentId : $('#DepartmentId').val(),
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            Language: _currentLanguage
        }, CallBack: fnLoadEmployees_DDLCallBack
    });
}
var fnLoadEmployees_DDLCallBack = function (response) {
    //  console.log(JSON.parse(response.Value))
    $("#HR_Employees").kendoDropDownList({
        dataTextField: "employeeName",
        dataValueField: "employeeId",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(response.Value),
        // change: function (e) {
        //     var selected_Id = this.value();
        //     var text = this.text();
        //     var employeeNumber = $.trim(text.split('-')[0]);
        //
        //
        //     $('#HR_Employees').val(selected_Id);
        //     ajaxRequest({ commandName: 'HR_Employee_GetByNumber', values: { Language: _currentLanguage, EmployeeNumber: employeeNumber }, CallBack: loadEmployeeProfileCallBack });
        //
        //
        // },
    });

}
function fnLoadProfession_DDL() {

    ajaxRequest({ commandName: 'HR_Profession_Get', values: { Language: _currentLanguage }, CallBack: fnLoadProfession_DDLCallBack });
}
var fnLoadProfession_DDLCallBack = function (response) {

    $("#From_HR_Profession_Id").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(response.Value),
        change: function (e) {
            var selected_Id = this.value();

            $('#From_HR_Profession_Id').val(selected_Id);


        },
    });


    $("#To_HR_Profession_Id").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(response.Value),
        change: function (e) {
            var selected_Id = this.value();

            $('#To_HR_Profession_Id').val(selected_Id);


        },
    });


}

function fnSelectType(e) {

    var dataFrom = e;
    if (dataFrom.value == "Position") {
        //  fnLoadProfession_DDL();
        $('#div-show-hide-from-to').show();
    } else {
        $('#div-show-hide-from-to').hide();

    }

}
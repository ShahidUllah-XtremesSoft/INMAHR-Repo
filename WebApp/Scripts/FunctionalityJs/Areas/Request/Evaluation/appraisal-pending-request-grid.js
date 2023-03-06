/*
var AppraisalPendingGrid = "appraisal-pending-request-grid";
$(function () {
    $('#PendingAppraisalTabLi').click(function () {

        loadAppraisalPendingGrid();

    });

    function loadAppraisalPendingGrid() {
        ajaxRequest({
            commandName: 'Request_Appraisal_Pending',
            values: {
                Employee_Id: JSON.parse(localStorage.getItem('User')).employeeId,
                Language: _currentLanguage
            }, CallBack: load_AppraisalPendingGridCallBack
        });
    }
    var load_AppraisalPendingGridCallBack = function (inputDataJSON) {

        bindAppraisalPendingGrid(JSON.parse(inputDataJSON.Value));
    }
    var bindAppraisalPendingGrid = function (inputDataJSON) {
        debugger
        var gridColumns = [

            { title: "#", template: "<b>#= ++record #</b>", width: 10, },

            { field: "appraisalId", title: "AppraisalId", hidden: true },
            { field: "employee_Number", title: "Employee_Number", hidden: true },
            { field: "employeeId", title: "EmployeeId", hidden: true },
            { field: "departmentId", title: "DepartmentId", hidden: true },
            { field: "employeeName", title: lblFrom, width: 100, filterable: false },
            { field: "manager_Name", title: lblTo, width: 100, filterable: false },
            { field: "departmentName", title: lblSection, width: 100, filterable: false },

            { title: status, field: lblStatus, width: 30, hidden: false, filterable: false },

            //Below is action column
            {
                field: "", width: 15,
                title: ' ',
                filterable: false,
                //  template: "#if(isRecordExist == 0){ #<a style='font-size:20px;cursor:pointer;' onClick= delete_AppraisalPendingGridById(this)  title='Delete '><span class='fa fa-trash'></span></a>#}" +
                //      "else{ #<a style='font-size:20px;cursor:pointer;' onClick= see_AppraisalDetailsById(this)  title='See Detail '><span class='fa fa-eye'></span></a>#}#"
                template: "#if(isRecordExist == 0){ #<a style='font-size:20px;cursor:pointer;' onClick= delete_AppraisalPendingGridById(this)  title='Delete '><span class='fa fa-trash'></span></a>#}" +
                    "else{ #<a style='font-size:20px;cursor:pointer;' onClick= see_AppraisalDetailsById(this)  title='See Detail '><span class='fa fa-eye'></span></a>#}#"

            }
        ];

        bindKendoGrid(AppraisalPendingGrid, 50, gridColumns, inputDataJSON);
    };


    function see_AppraisalDetailsById(event) {

        var row = $(event).closest("tr");
        var grid = $("#" + AppraisalPendingGrid).data("kendoGrid");
        var dataItem = grid.dataItem(row);

        window.location.href = '/Request/Appraisal/Index?AppraisalId=' + dataItem.request_Appraisal_Id + '?' + 'EmployeeNumber=' + dataItem.hR_Employee_Number + '?' + 'Appraisal_History_Id=' + dataItem.request_Appraisal_History_Id + '';

    }
    function delete_AppraisalPendingGridById(event) {

        var row = $(event).closest("tr");
        var grid = $("#" + AppraisalPendingGrid).data("kendoGrid");
        var dataItem = grid.dataItem(row);

        Swal.fire({

            title: areYouSureTitle,
            text: doYouReallyWantToDeletThisRecord,

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
                ajaxRequest({ commandName: 'Appraisal_Request_Delete', values: { Id: dataItem.request_Appraisal_Id, Language: _currentLanguage }, CallBack: delete_AppraisalPendingGridByIdCallBack });
            }
        });
        var delete_AppraisalPendingGridByIdCallBack = function (response) {
            location.reload();

        }

    }
});
*/
 
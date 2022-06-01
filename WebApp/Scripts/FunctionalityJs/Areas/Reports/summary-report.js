var $grid = "grid", requestFrom = '';

$(function () {
    $('#Language').val(_currentLanguage);

    // LOAD KENDO DATE PICKERS
    //renderKendoDatePickerWithNewFormat('StartDate');
    //renderKendoDatePickerWithNewFormat('EndDate');
    loadProjectCategoryTypeDDL();
    loadProjectDropdownListEng();

});
//PROJECT CATEGORY DDL

function loadProjectCategoryTypeDDL() {
    ajaxRequest({ commandName: 'DDL_ProjectCategoryType_In_Setup_TypeDetail_Get', values: { Language: _currentLanguage }, CallBack: loadloadProjectCategoryTypeDDLCallBack });
}
function loadloadProjectCategoryTypeDDLCallBack(response) {

    $("#ProjectCategoryDDL").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(response.Value),
        change: function (e) {
            var selected_Id = this.value();
            //   $('#ProjectCategoryType_In_Setup_TypeDetail_Id').val(selected_Id);

        },
    });
}

//PROJECT DDL
function loadProjectDropdownListEng() { ajaxRequest({ commandName: 'Project_DDL', values: { Language: _currentLanguage }, CallBack: fnloadProjectDropdownListEngCallBack }); }
function fnloadProjectDropdownListEngCallBack(response) {
    $("#ProjectDDL").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(response.Value),
        change: function (e) {
            var selected_Id = this.value();
            // $('#Project_Id').val(selected_Id);

        },
    });
}


/*
function loadDesignSectionDropdownList() {
    ajaxRequest({ commandName: 'DDL_DESIGN_SECTION_Project_MainType', values: { Language: _currentLanguage }, CallBack: loadDesignSectionDropdownListCallBack });
}
var loadDesignSectionDropdownListCallBack = function (responseJSON) {
    $("#DesignSection").kendoDropDownList({
        dataValueField: "id",
        dataTextField: "name",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(responseJSON.Value),
        popup: { appendTo: $("#container") },
        //select: onSelect_DesignSection,
    });
}
function loadDesignSectionReportGrid(sectionId){
    ajaxRequest({ commandName: 'Reports_DesignSection_GetBySectionId', values: { SectionId: sectionId, Language: _currentLanguage }, CallBack: loadDesignSectionReportGridCallBack });
}
var loadDesignSectionReportGridCallBack = function (responseJSON) {
    bindloadDesignSectionReportGrid(responseJSON);
}
function bindloadDesignSectionReportGrid(inputDataJSON) {    
    var gridColumns = [

        { title: "#", template: "<b>#= ++record #</b>", width: 15 },
        { field: "id", title: "id", width: 10, hidden: true },
        {
            field: "projectNumber", title: lblProjectNo, width: 50, hidden: false, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }            
        },
        { field: "assignedBy", title: 'Assigned By Engr', width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "assignedTo", title: 'Assigned To Engr', width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "submissionDate", title: 'Submission Date', width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "approvedDate", title: 'Approved Date', width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },        
        
    ];

    bindKendoGrid($grid, 100, gridColumns, JSON.parse(inputDataJSON.Value), true, 550);    
};
*/

function fnLoadProject_SummaryDataByParamter() {


    if (customValidateForm('frmProjectSummary')) {

        buttonAddPleaseWait('btnSearch');

        ajaxRequest({
            commandName: 'Report_Summary_GetByParamters',
            values: {
                ProjectCategoryDDL: $('#ProjectCategoryDDL').val(),
                ProjectDDL: $('#ProjectDDL').val(),
                StartDate: $('#StartDate').val(),
                EndDate: $('#EndDate').val(),
                LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
                LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
                RoleId: JSON.parse(localStorage.getItem('User')).roleId,
                Language: $('#Language').val()
            }, CallBack: fnLoadProject_SummaryDataByParamterCallBack
        });
        buttonRemovePleaseWait('btnSearch', 'Search', 'search');

    }
    else {
        buttonRemovePleaseWait('btnSearch', 'Search', 'search');
        return false;
    }
}

function fnLoadProject_SummaryDataByParamterCallBack(response) {
    var response = JSON.parse(response.Value);
     

    if (response[0].length > 0) {

        $('.txt-project-title').text(response[0][0].projectName);
        $('.project-number').text(response[0][0].projectNumber);
        $('.txt-description').empty();
        $('.txt-description').append(response[0][0].descriptionEng);


        if (response[1].length > 0 && response[0].length > 0) {

            //------------------- LOOP 
            $('.div-append-multiple-summary-record').empty();
            /*$('.tr-append-multiple-summary-record').empty();*/
            for (var i = 0; i < response[1].length; i++) {

                var pass_Status = '-', status_td_Color = '';
                if (response[1][i].employee_uploading_document_time_status == 'OnTime') {
                    pass_Status = lblOnTime;
                    status_td_Color = 'badge-success';
                } else if (response[1][i].employee_uploading_document_time_status == 'NotStartYet') {
                    pass_Status = lblNotStartedYet;
                    status_td_Color = 'badge-secondary';
                } else if (response[1][i].employee_uploading_document_time_status == 'Delay') {
                    pass_Status = lblDelay;
                    status_td_Color = 'badge-danger';
                } else {
                    pass_Status = '-';
                    status_td_Color = '';
                }

                $('.div-append-multiple-summary-record').append('' +
                    '<div class="col-sm-3" style="width: unset;font-size: smaller;">' +
                    '<div class="card">' +
                    '<div class="card-header" style="background: #eceff1;">' +
                    '<b><span class="">' + response[1][i].sT_Name + '</span></b>' +
                    // '<hr><b><span class="">' + response[1][i].stD_Name + '</span></b>' +
                    '</div>' +
                    '<table class="table table-striped table-border">' +
                    '<tbody>' +
                    '<tr>' +
                    '<td style="background: antiquewhite;">' + lblSubmission + ' :</td>' +
                    '<td style="background: antiquewhite;"><span class="btn btn-sm badge-danger">' + response[1][i].plmE_CreatedDate + '</span> </td>' +

                    '</tr>' +
                    '<tr>' +
                    '<td style="background:#10e7101c;">' + lblApproval + ' :</td>' +
                    '<td style="background:#10e7101c;"><span class="btn btn-sm badge-success">' + response[1][i].plmE_EndDate + '</span></td>' +

                    '</tr>' +
                    '<tr>' +
                    '<td style="background:#ffff0045;">' + lblName + ' :</td>' +
                    '<td style="background:#ffff0045;"><span class="btn btn-sm badge-info">' + response[1][i].emP_Name + '</span></td>' +

                    '</tr>' +
                    '<tr>' +
                    '<td style="background:beige;">' + lblStatus + ' :</td>' +
                    '<td style="background:beige;"><span class="btn btn-sm ' + status_td_Color+'">' + pass_Status + '</span></td>' +

                    '</tr>' +
                    '</tbody>' +
                    '</table>' +
                    '</div>' +
                    '</div>');
                /*


                $('.tr-append-multiple-summary-record').append('' +
                    '<td>' +
                    '<table class="table table-striped "  >' +
                    '<thead>' +
                    '<tr><th>' + response[1][i].sT_Name + ' </th><th> </th></tr>' +
                    '</thead> ' +
                    '<tbody> ' +
                    '<tr>' +
                    '<td style="background: antiquewhite;">' + lblSubmission + ' :</td>' +
                    '<td style="background: antiquewhite;"><span class="btn btn-sm badge-danger">' + response[1][i].plmE_CreatedDate + '</span> </td>' +
                    '</tr> ' +
                    '<tr> ' +
                    '<td style="background:#10e7101c;">' + lblApproval + ' :</td> ' +
                    '<td style="background:#10e7101c;"><span class="btn btn-sm badge-success">' + response[1][i].plmE_EndDate + '</span></td>' +
                    '</tr> ' +
                    '</tr>' +
                    '<tr>' +
                    '<td style="background:#ffff0045;">' + lblName + ' :</td>' +
                    '<td style="background:#ffff0045;"><span class="btn btn-sm badge-info">' + response[1][i].emP_Name + '</span></td>' +

                    '</tr>' +
                    '<tr>' +
                    '<td style="background:beige;">' + lblStatus + ' :</td>' +
                    '<td style="background:beige;"><span class="btn btn-sm badge-secondary">' + response[1][i].employee_uploading_document_time_status + '</span></td>' +

                    '</tr>' +
                    '</tbody> ' +
                    '</table>' +
                    '</td>');
                    */

            }
        } else {
            $('.div-append-multiple-summary-record').empty();
            /*$('.tr-append-multiple-summary-record').empty();*/

        }

    } else {

        $('.txt-project-title').empty();
        $('.project-number').empty();
        $('.txt-description').empty();        
        $('.div-append-multiple-summary-record').empty();

    }


}
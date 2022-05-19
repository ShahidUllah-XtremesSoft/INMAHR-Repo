var $grid = "grid", requestFrom = '';

$(function () {
    $('#Language').val(_currentLanguage);

    // LOAD KENDO DATE PICKERS
    renderKendoDatePickerWithNewFormat('StartDate');
    renderKendoDatePickerWithNewFormat('EndDate');
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

function fnLoadDataByParamter() {
    $('#ProjectCategoryDDL').val()
    $('#ProjectDDL').val()
    $('#StartDate').val()
    $('#EndDate').val()
    console.log($('#ProjectCategoryDDL').val())
    console.log($('#ProjectDDL').val())
    console.log($('#StartDate').val())
    console.log($('#EndDate').val())
}
var $grid = "grid", requestFrom = '';

$(function () {
    $('#Language').val(_currentLanguage);


    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    $('#StartDate').kendoDatePicker({
        format: "yyyy-MM-dd"
        , value: firstDay//new Date()
    });
    $('#EndDate').kendoDatePicker({
        format: "yyyy-MM-dd"
        , value: new Date()
    });

    loadTechnicalSectionDropdownList();
    loadTechnicalSectionReportGrid(-1);
    $('#btnSearch').click(function () {
        if ($("#TechnicalSection").val() != '-1') {
            loadTechnicalSectionReportGrid($("#TechnicalSection").val());
        }
        else {
            swalMessage('info', 'First select a type', 1500);
        }
    });


});
function loadTechnicalSectionDropdownList() {
    ajaxRequest({ commandName: 'DDL_TECHNICAL_SECTION_Project_MainType', values: { Language: _currentLanguage }, CallBack: loadTechnicalSectionDropdownListCallBack });
}
var loadTechnicalSectionDropdownListCallBack = function (responseJSON) {
    $("#TechnicalSection").kendoDropDownList({
        dataValueField: "id",
        dataTextField: "name",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(responseJSON.Value),
        popup: { appendTo: $("#container") },
        //select: onSelect_TechnicalSection,
    });
    //$('#Project_Section_Parent_Type_DDL').data("kendoDropDownList").options.enabled
}
function loadTechnicalSectionReportGrid(sectionId) {
    ajaxRequest({ commandName: 'Reports_TechnicalSection_GetBySectionId', values: { SectionId: sectionId, Language: _currentLanguage }, CallBack: loadTechnicalSectionReportGridCallBack });
}
var loadTechnicalSectionReportGridCallBack = function (responseJSON) {
    bindloadTechnicalSectionReportGrid(responseJSON);
}
function bindloadTechnicalSectionReportGrid(inputDataJSON) {
    var gridColumns = [

        { title: "#", template: "<b>#= ++record #</b>", width: 15 },
        { field: "id", title: "id", width: 10, hidden: true },
        {
            field: "projectNumber", title: lblProjectNo, width: 50, hidden: false, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        { field: "assignedBy", title: 'Assigned By Engr', width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "assignedTo", title: 'Assigned To Engr', width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "submissionDate", title: 'Assign Date', width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "startDate", title: 'Start Date', width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "endDate", title: 'Ready Date', width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },

    ];

    bindKendoGrid($grid, 100, gridColumns, JSON.parse(inputDataJSON.Value), true, 550);
};
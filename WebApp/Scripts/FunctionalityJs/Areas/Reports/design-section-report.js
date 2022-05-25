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

    loadDesignSectionDropdownList();
    loadDesignSectionReportGrid(-1);
    $('#btnSearch').click(function () {        
        if ($("#DesignSection").val() != '-1') {
            loadDesignSectionReportGrid($("#DesignSection").val());
        }
        else {
            swalMessage('info', 'First select a type', 1500);
        }
    });    
    
   
});
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
    //$('#Project_Section_Parent_Type_DDL').data("kendoDropDownList").options.enabled
}
function loadDesignSectionReportGrid(sectionId){
    ajaxRequest({
        commandName: 'Reports_DesignSection_GetBySectionId', values: {
            SectionId: sectionId,
            Language: _currentLanguage,
            StartDate: $("#StartDate").val(),
            EndDate: $("#EndDate").val(),
        }, CallBack: loadDesignSectionReportGridCallBack
    });
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
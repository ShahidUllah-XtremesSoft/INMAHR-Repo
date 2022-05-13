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

    //loadGrid();

    $('#btnSearch').click(function () {
        //loadGrid();
        alert($("#DesignSection").val());
    });
    //ajaxRequest({
    //    commandName: 'Project_Linked_Employees_By_SectionId',
    //    values: {
    //        Project_Id: project_Id,
    //        Sub_Section_Id: setup_TypeDetail_Id,
    //        Language: _currentLanguage
    //    }, CallBack: fnloadAssignedEmployees_DesignSectionCallBack
    //});
    loadDesignSectionDropdownList();
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
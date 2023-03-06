var $EmployeesAssociatedRosterGrid = "load-employees-roster";
 
$('#EmployeesRosterTabLi').click(function () {
    fnLoadAssociatedRoster();
 
})

 function fnLoadAssociatedRoster() {
     ajaxRequest({
         commandName: 'Roster_Associated_Employees_Get',
         values: {
             LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
            DepartmentId: 0,
             Language: _currentLanguage
         }, CallBack: fnLoadAssociatedRosterCallBack
     });

    
}
var fnLoadAssociatedRosterCallBack = function (response) { 
 
    var gridColumns = [
       
        { title: "#", template: "<b>#= ++record #</b>", width: 20, },

        { field: "EmployeeId", title: "EmployeeId", hidden: true },
        { field: "employeeNumber", title: employeeNumber, hidden: true, width: 20, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }, editable: true },
        { field: "name", title: lblName, hidden: false, width: 150, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }, editable: true },
        { field: "sunday", title: lblSunday, encoded: false, hidden: false, width: 100, filterable: false, editor: categoryDropDownEditor, /*template: ' <span class="k-state-default"> <p style="font-size:x-smaller;">#: sunday #</p></span>'*/ },
        { field: "monday", title: lblMonday, encoded: false, hidden: false, width: 100, filterable: false, editor: categoryDropDownEditor,/* template: ' <span class="k-state-default"> <p style="font-size:smaller;">#: monday #</p></span>'*/ },
        { field: "tuesday", title: lblTuesday, encoded: false, hidden: false, width: 100, filterable: false, editor: categoryDropDownEditor,/* template: ' <span class="k-state-default"> <p style="font-size:smaller;">#: tuesday #</p></span>'*/ },
        { field: "wednesday", title: lblWednesday, encoded: false, hidden: false, width: 100, filterable: false, editor: categoryDropDownEditor,/* template: ' <span class="k-state-default"> <p style="font-size:smaller;">#: wednesday #</p></span>'*/ },
        { field: "thursday", title: lblThursday, encoded: false,hidden: false, width: 100, filterable: false, editor: categoryDropDownEditor, /*template: ' <span class="k-state-default"> <p style="font-size:smaller;">#: thursday #</p></span>'*/ },
        { field: "friday", title: lblFriday, encoded: false,hidden: false, width: 50, filterable: false, editor: categoryDropDownEditor,/*template: ' <span class="k-state-default"> <p style="font-size:smaller;">#: friday #</p></span>'*/ },
        { field: "saturday", title: lblSaturday, encoded: false, width: 50, filterable: false, editor: categoryDropDownEditor, /*template: ' <span class="k-state-default"> <p style="font-size:smaller;">#: saturday #</p></span>' */ },
     
    ];

    bindKendoGrid($EmployeesAssociatedRosterGrid, 100, gridColumns, JSON.parse(response.Value));

 
};

 
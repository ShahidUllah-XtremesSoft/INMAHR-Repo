$(function () {
    
    loadEmployeeGrid();
});
function loadEmployeeGrid() {

    //values - are key value pair json object
    ajaxRequest({ commandName: 'Employee_Select', values: { Status: Status }, CallBack: loadEmployeeGridCallBack });
}
var loadEmployeeGridCallBack = function (inputDataJSON) {
    bindEmployeeGrid(JSON.parse(inputDataJSON));
}
var bindEmployeeGrid = function (inputDataJSON) {    
    var gridColumns = [

        { field: "id", title: "id", hidden: true, width: 200 },
        //Below is column example with click event and call a function on click
        {
            field: "Name", width: 140, title: "Name",            
            template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= loadDetail(this)  title='Show Details'>#=name#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },

        { field: "prefix", title: "Prefix", width: 80, filterable: true, hidden: true },
        { field: "firstName", title: "First Name", width: 110, filterable: true, hidden: true },
        //Below is action column
        {
            field: "", width: 170,
            title: "Action",
            template: "<a style='cursor:pointer; font-size:20px;' onClick= whatsapp_btn(this) title='Share Employee' ><span class='icofont icofont-phone'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Employee' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Employee'><span class='fa fa-trash'></span></a>  "

        }];

    bindKendoGrid($grid, 50, gridColumns, inputDataJSON);
};
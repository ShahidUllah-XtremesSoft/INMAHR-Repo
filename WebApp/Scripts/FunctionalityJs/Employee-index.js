var userId = "";
var username = "";


var $grid = "show-all-employee-grid";



//$(document).ready(function () {
//    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
//    //userId = window.localStorage.getItem("userId");
//    //username = window.localStorage.getItem('userName');
//     LoadBankDetailKendo();
//});


function LoadBankDetailKendo() {
    KendoGlobalAjax({ commandName: 'BankDetail_Select', values: {}, CallBack: fnLoadBankDetailKendo });
}


var fnLoadBankDetailKendo = function (d) {

    KendoGrid(JSON.parse(d.Value));
}

var KendoGrid = function (_data) {


    var colModel = [

        { field: "bankID", title: "BankID", hidden: true, width: 200 },

        {
            field: "bankName", title: "Bank Name",
            // template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=name#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        { field: "bankCode", title: "Bank Code", filterable: true },
        {
            field: "",
            title: "Action",
            template: "<a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Bank Detail' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=bankID#')  title='Delete Bank'><span class='fa fa-trash'></span></a>  "
        }];
    BindkendoGrid($grid, 50, colModel, _data);
};
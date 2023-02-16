

var userId = "";
var username = "";
var roleID = "";
var agentID = "";
$(document).ready(function () {


    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId"); 

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);


    LoadPrintData();

});
//====================================== AJAX DATA LOAD START ================================================================
function LoadPrintData() {
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('?'); //Split 
    var employeeID = url_array[url_array.length - 1];//Get ID
    LoadAllowanceByEmployeeID(employeeID);
    LoadAdditionDeductionByEmployeeID(employeeID);
    KendoGlobalAjax({ commandName: 'EmployeeSalarySlipPrintByID', values: { EmployeeID: employeeID }, CallBack: loadDataForPrint });


}
var loadDataForPrint = function (d) {


    $('#txt-name').text(JSON.parse(d.Value)[0].nameofEmployee);
    $('#txt-profession').text(JSON.parse(d.Value)[0].designationName);
    $('#txt-labour-welfare-deduction-value').text(JSON.parse(d.Value)[0].labourWelfareDeduction);
    $('#txt-leave-deduction-value').text(JSON.parse(d.Value)[0].leaveDeduction);
    $('#txt-other-deduction-value').text(JSON.parse(d.Value)[0].otherDeduction);
    $('#txt-provident-fund-deduction-value').text(JSON.parse(d.Value)[0].providentFundDeduction);
    $('#txt-security-deduction-value').text(JSON.parse(d.Value)[0].securityDeduction);
    $('#txt-tota-deduction-value').text(JSON.parse(d.Value)[0].totalDeduction);
    $('#txt-total-gross-value').text(JSON.parse(d.Value)[0].grosssalary);
    $('#txt-addition-value').text(JSON.parse(d.Value)[0].totaladdation);
    $('#txt-basic-salary-value').text(JSON.parse(d.Value)[0].basicSalary);
    $('#txt-month').text(JSON.parse(d.Value)[0].payrollCurrentMonth);
    $('#txt-date').text(JSON.parse(d.Value)[0].postedDate);
   
}

//====================================== AJAX DATA LOAD END ================================================================

$('#btn-print').click(function () {
    $('#btn-print').hide();
    window.print();
});
$(document).bind("keyup keydown", function (e) {
    if (e.ctrlKey && e.keyCode == 80) {
        $('#btn-print').hide();
       
    }
});


function PrintElem() {


    var contents = $("#div-print").html();
    var frame1 = $('<iframe />');
    frame1[0].name = "frame1";
    //  frame1.css({ "position": "absolute", "top": "-1000000px" });
    $("body").append(frame1);
    var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
    frameDoc.document.open();
    //Create a new HTML document.
    frameDoc.document.write('<html><head><title>DIV Contents</title>');
    frameDoc.document.write('</head><body>');
    //Append the external CSS file.
    frameDoc.document.write('<link href="/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css" />');
    frameDoc.document.write('<link href="/Content/Assets/css/PrintMembership.css" rel="stylesheet" type="text/css" />');

    //Append the DIV contents.
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();
    setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        frame1.remove();
    }, 500);



    //  return true;
}



function LoadAllowanceByEmployeeID(employeeID) {
    KendoGlobalAjax({ commandName: 'AllowanceType_LoadByEmployeeByIDForPrint', values: { Id: employeeID }, CallBack: getLoadAllowanceByEmployeeID });
}
var getLoadAllowanceByEmployeeID = function (d) {

    $('.tbl-additions').empty();

    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
         $('.tbl-additions').append('<tr><th id="" style="width: 68%;">' + JSON.parse(d.Value)[i].allowanceTypeName + '</th><td id="">' + JSON.parse(d.Value)[i].allowanceAmount + '</td></tr>');
    }
}
function LoadAdditionDeductionByEmployeeID(employeeID) {
    KendoGlobalAjax({ commandName: 'RecursiveAdditionDeduction_LoadByEmployeeByID', values: { Id: employeeID }, CallBack: getLoadAdditionDeductionByEmployeeID });
}
var getLoadAdditionDeductionByEmployeeID = function (d) {

    $('.tbl-deductions').empty();

    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
        if (JSON.parse(d.Value)[i].recursiveType == "Dedcution") {

            $('.tbl-deductions').append('<tr><th id="" style="width: 78%;">' + JSON.parse(d.Value)[i].name + '</th><td id="">' + JSON.parse(d.Value)[i].amount + '</td></tr>');
        } else {
            $('.tbl-additions').append('<tr><th id="" style="width: 68%;">' + JSON.parse(d.Value)[i].name + '</th><td id="">' + JSON.parse(d.Value)[i].amount + '</td></tr>');
        }

    }
}
function fnAfterPrint() {
    $('#btn-print').show();  
}
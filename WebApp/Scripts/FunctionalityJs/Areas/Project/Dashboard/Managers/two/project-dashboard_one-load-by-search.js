var loggedInUser = {};


$(function () {
    //  fn_LoadStatuses()
});


// ------------------- LOAD BRANCHES DDL 
function fn_LoadStatuses() {
    ajaxRequest({
        commandName: 'DDL_Setup_Statuses',
        values:
        {

            Area: 'PROJECT',
            Language: _currentLanguage
        }, CallBack: fn_LoadStatuses_Callback
    });
}
var fn_LoadStatuses_Callback = function (responseJSON) {
    var array_ = JSON.parse(responseJSON.Value)
    // arrayyy.push({ "id": 2007, "value": "Neww" })
    // console.log(arrayyy);

    $("#NewOldProjectsPicker").kendoDropDownList({
        dataTextField: "value",
        dataValueField: "id",
        dataSource: array_
    });
}
$('#btn-search-project-records').click(function () {

    fn_Load_Total_Projects_Grid();
    $('.showTotalProjectBasedOnStatus').show();
    //   $('.showHide-app-dynamic-data').show();

});
$('#btn-reset-project-records').click(function () {

    $("#NewOldProjectsPicker").data("kendoDropDownList").value("");
    $("#weekPicker").data("kendoDropDownList").value("");
    $("#monthPicker").data("kendoDropDownList").value("");

    $('.showHide-app-dynamic-data').hide();
    $('.append-dynamic-data').empty();


    //SECTIONS HIDE
    hideDesignSection();
    hideTechnicalSection();
    hideSupervisionSection();
    hideSubSection();

});

function hideDynamicDataCard() {

    $('.showHide-app-dynamic-data').hide();
    $('.append-dynamic-data').empty();

}

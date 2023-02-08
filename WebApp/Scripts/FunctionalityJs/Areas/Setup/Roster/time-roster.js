var $RosterGrid = "div-roster-grid";
$(function () {
    fnLoadRosterGrid();
    //renderKendoDatePicker('DayStartTime'); 
    renderKendoTimePicker('DayStartTime');
    renderKendoTimePicker('DayEndTime');
    renderKendoTimePicker('BreakStartTime');
    renderKendoTimePicker('BreakEndTime');

    $('#DayStartTime').val(null)
    $('#DayEndTime').val(null)
    $('#BreakStartTime').val(null)
    $('#BreakEndTime').val(null)

    $('#btn-save-roster').on('click', function (e) {

        if (customValidateForm('frmAddUpdateRoster')) {
            $("#frmAddUpdateRoster").ajaxForm();
            buttonAddPleaseWait('btn-save-roster');
            var options = {
                success: function (response, statusText, jqXHR) {
                    swal(response);
                    fnLoadRosterGrid();
                    $('#frmAddUpdateRoster')[0].reset();
                    $('#Id').val(0);
                    setTimeout(function () {

                        $('#DayStartTime').val(null)
                        $('#DayEndTime').val(null)
                        $('#BreakStartTime').val(null)
                        $('#BreakEndTime').val(null)
                    }, 100);
                },
                error: function (xhr, status, error) {
                    buttonRemovePleaseWait('btn-save-roster', save, 'save');
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
                , complete: function () {
                    buttonRemovePleaseWait('btn-save-roster', save, 'save');
                    fnLoadRosterGrid();
                }
            };
            $("#frmAddUpdateRoster").ajaxSubmit(options);
        }
        else {

            buttonRemovePleaseWait('btn-save-roster', save, 'save');
        }

    });

});
function fnLoadRosterGrid() {

    //values - are key value pair json object
    ajaxRequest({ commandName: 'Setup_Roster_Get', values: { Language: $('#Language').val() }, CallBack: fnLoadRosterGridCallBack });
}
var fnLoadRosterGridCallBack = function (inputDataJSON) {
    bindfnLoadRosterGrid(JSON.parse(inputDataJSON.Value));
}
var bindfnLoadRosterGrid = function (inputDataJSON) {
    var gridColumns = [
        { title: "#", template: "<b>#= ++record #</b>", width: 30, },
        { field: "id", title: "id", hidden: true },
        { field: "typeEng", title: typeEng, width: 150, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "typeArb", title: typeArb, width: 150, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "dayStartTime", title: dayStartTime, width: 80, filterable: false, hidden: false },
        { field: "dayEndTime", title: dayEndTime, width: 80, filterable: false, hidden: false },
        { field: "breakStartTime", title: breakStartTime, width: 100, filterable: false, hidden: false },
        { field: "breakEndTime", title: breakEndTime, width: 100, filterable: false, hidden: false },
        { field: "relaxationTime", title: relaxationTime, width: 100, filterable: false, hidden: false },
        // { field: "isNoBreak", title: isNoBreak, width: 80, filterable: false, hidden: false },
        // { field: "isOffDay", title: "isOffDay", width: 80, filterable: false, hidden: true },
        //Below is action column
        {
            field: "", width: 100,
            title: "",
            //template: "<a style='cursor:pointer; font-size:20px;' onClick= editRoster(this) title='Edit menu' ><span class='fa fa-eye'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= deleteRoster(this) title='Edit Menu' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRoster(this)  title='Delete Menu'><span class='fa fa-trash'></span></a>  "
            template: "<a style='font-size:20px;cursor:pointer;' onClick= editRoster(this) title='Edit Menu' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRoster(this)  title='Delete Menu'><span class='fa fa-trash'></span></a>  "

        }
    ];

    bindKendoGrid($RosterGrid, 50, gridColumns, inputDataJSON);
};
function editRoster(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $RosterGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    $('#Id').val(dataItem.id);
    $('#TypeEng').val(dataItem.typeEng);
    $('#TypeArb').val(dataItem.typeArb);
    $('#DayStartTime').val(dataItem.dayStartTime);
    $('#DayEndTime').val(dataItem.dayEndTime);
    $('#BreakStartTime').val(dataItem.breakStartTime);
    $('#BreakEndTime').val(dataItem.breakEndTime);
    $('#StartTimeRelaxationMinutes').val(dataItem.relaxationTime);
    /*
    $('#isOffDay').val(dataItem.isOffDay);
    dataItem.isOffDay == 1 ? document.getElementById("isOffDay").checked = 1 : document.getElementById("isOffDay").checked = 0;
    $('#isNoBreak').val(dataItem.isNoBreak);
    dataItem.isNoBreak == 1 ? document.getElementById("isNoBreak").checked = 1 : document.getElementById("isNoBreak").checked = 0;
    */




}
function deleteRoster(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $RosterGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    Swal.fire({

        title: areYouSureTitle,
        text: doYouReallyWantToDeletThisRecord,
        //input: 'text',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#5cb85c',
        cancelButtonColor: '#d9534f',
        confirmButtonText: btnYesText,
        cancelButtonText: btnNoText,
        buttons: {
            cancel: {
                text: "No",
                value: null,
                visible: true,
                className: "btn btn-danger",
                closeModal: true
            },
            confirm: {
                text: "Yes",
                value: true,
                visible: true,
                className: "btn btn-warning",
                closeModal: true
            }
        }
    }).then(function (restult) {
        if (restult.value) {
            ajaxRequest({ commandName: 'Setup_Roster_Delete', values: { Id: dataItem.id, Language: $('#Language').val() }, CallBack: deleteRosterByIdCallBack });
        }
    });
    var deleteRosterByIdCallBack = function (response) {
        swal(response.Value);
        fnLoadRosterGrid();
    }
}
/*
function fnCheckBox(e) {

    var dayStartTime = $("#DayStartTime").data("kendoTimePicker");
    var dayEndTime = $("#DayEndTime").data("kendoTimePicker");
    var breakStart = $("#BreakStartTime").data("kendoTimePicker")//.value(null).trigger("change");
    var breakEnd = $("#BreakEndTime").data("kendoTimePicker")//.value(null).trigger("change");

    if (e == 'isNoBreak') {



        var _IsNoBreak = document.getElementById("isNoBreak").checked;
        if (_IsNoBreak == true) {
            breakStart.value('');
            breakStart.trigger("change");
            breakEnd.value('');
            breakEnd.trigger("change");
            $("#BreakStartTime").removeAttr("required");
            $("#BreakEndTime").removeAttr("required");

            document.getElementById("isNoBreak").value = 1;


        } else {


            $("#BreakStartTime").attr("required", true);
            $("#BreakEndTime").attr("required", true);
            document.getElementById("isNoBreak").value = 0;

        }
    } else if (e == 'isOffDay') {

        var isOffDay = document.getElementById("isOffDay").checked;
        if (isOffDay == true) {
            document.getElementById("isOffDay").value = 1;
            $('#frmAddUpdateRoster :input').removeAttr('required')
            dayStartTime.value('');
            dayStartTime.trigger("change");
            dayEndTime.value('');
            dayEndTime.trigger("change");
            breakStart.value('');
            breakStart.trigger("change");
            breakEnd.value('');
            breakEnd.trigger("change");

            $('#StartTimeRelaxationMinutes').val(0);



        } else {

            $('#frmAddUpdateRoster :input').attr('required', 'required')
            //$('#DayStartTime').attr('required', true);
            document.getElementById("isOffDay").value = 0;
        }
    }
}
*/
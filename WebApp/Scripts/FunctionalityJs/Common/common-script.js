////var areYouSureTitle = 'Are you sure?';
////var doYouReallyWantToDeletThisRecord = 'Do you really want to delete selected record';
////var btnYesText = 'Yes';

////var btnNoText = 'No';
////var approveTitle = 'Approve?';
////var declineTitle = 'Decline?';
////var approveText = 'Do you really want to approve this request';
////var declineText = 'Do you really want to decline this request';


$(document).ready(function () {

    //if (_currentLanguage != 'en-US') {
    //    areYouSureTitle = 'هل أنت متأكد؟';
    //    doYouReallyWantToDeletThisRecord = 'هل تريد حقًا حذف السجل المحدد';
    //    btnYesText = 'نعم';
    //    btnNoText = 'رقم';

    //    approveTitle = 'يعتمد؟';
    //    approveText = 'هل تريد حقًا الموافقة على هذه الإجازة'
    //    declineTitle = 'انخفاض؟';
    //    declineText = 'هل تريد حقًا رفض هذه الإجازة';
    //}

    $("#Language").val(_currentLanguage);

    $("#FilUploader").change(function () {
        var fileExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
        if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
            alert("Only formats are allowed : " + fileExtension.join(', '));
        }
    });
    //$(document).ajaxStart(function () {
    //    // Show image container
    //    $('#RequestLoader').show();
    //});
    $(document).ajaxComplete(function () {
        // Hide image container
        $('#RequestLoader').hide();
    });
    $(document).ajaxError(function () {
        // Hide image container
        $('#RequestLoader').hide();
    });






});

var ajaxRequest = function (options) {
    $('#loading').show().fadeIn(500);

    $('#RequestLoader').show();
    $.ajax({
        type: 'POST',
        /*async:false,*/
        url: '/services/Xtreme/process',
        data: JSON.stringify({ type: options.commandName, value: options.values }),
        contentType: "application/json; charset=utf-8",
        xhrFields: { withCredentials: true },
        statusCode: {
            401: function () {
            }
        },
        success: function (data) {

            if (options.CallBack !== '') {
                options.CallBack(data, options.controlId);
                $('#loading').fadeOut(500);
                $('#loading').hide();
            }
        },
        complete: function () {
            $('#RequestLoader').hide();
        }
    });
    //   $('#loading').hide();
}
var ajaxRequestAsync = function (options) {

    $.ajax({
        type: 'POST',
        url: '/services/Xtreme/process',
        data: JSON.stringify({ type: options.commandName, value: options.values }),
        contentType: "application/json; charset=utf-8",
        xhrFields: { withCredentials: true },
        async: true,
        statusCode: {
            401: function () {
            }
        },
        success: function (data) {

            if (options.CallBack !== '') { options.CallBack(data); }
        }
    });
}


var bindEditAblekendoGrid = function ($gridid, $pageSize, $colModel, $data, $gridHeight = 550) {

    $("#" + $gridid).kendoGrid({
        //  toolbar: ["excel", "pdf"],
        //  excel: {
        //      fileName: "Export To Exceel.xlsx"
        //  },
        //pdf: {
        //    fileName: "Export To pdf.pdf"
        //},
        dataSource: {
            data: $data,
            pageSize: $pageSize
        },

        // mobile: "phone",
        height: $gridHeight,
        scrollable: true,
        sortable: true,

        selectable: true,
        filterable: { mode: "row" },
        pageable: {
            pageSizes: [50, 100, 250, 500, 1000],
            width: 20,
        },
        columns: $colModel,
        editable: true,
        //edit: function (e) {
        // 
        //    var input = e.container.find(".k-input");
        //    var value = input.val();
        //    input.keyup(function () {
        //        value = input.val();
        //    });
        //    $("[name='checkintime']", e.container).blur(function () {
        //       
        //        var input = $(this);

        //        var grid = $("#" + $gridid).data("kendoGrid");
        //        var row = $(this).closest("tr");
        //        var item = grid.dataItem(row);
        //        alert("Check in Time is : " + item.checkintime);
        //    });
        //},
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();// this is use to add dynamic serial number in grid 
        }
    }).data("kendoGrid");


}

var bindKendoGrid = function ($gridid, $pageSize, $colModel, $data, selectable = false, height = 550, $pageable = true) {

    $("#" + $gridid).kendoGrid({
        //toolbar: ["excel", "pdf", "search"],
        //pdf: {
        //    allPages: true,
        //    paperSize: "A4",
        //    //  margin: { top: "3cm", right: "1cm", bottom: "1cm", left: "1cm" },
        //    margin: { top: "3cm", right: "1cm", bottom: "1cm", left: "1cm" },
        //    landscape: true,
        //    template: $("#page-template").html()
        //},
        //excel: {
        //    fileName: "Export To Exceel.xlsx"
        //},
        dataSource: {
            data: $data,
            pageSize: $pageSize
        },
        height: height,
        scrollable: true,
        resizable: true,
        sortable: true,
        // editable:false,
        filterable: { mode: "row" },
        selectable: selectable,
       // pageable: $pageable
        pageable: ($pageable === true) ? { pageSizes: [50, 100, 250, 500, 1000], width: 20 } : false,
        //pageable: {
        //    pageSizes: [50, 100, 250, 500, 1000],
        //    width: 20,
        //},
        columns: $colModel,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();// this is use to add dynamic serial number in grid 
        }
    }).data("kendoGrid");
    //$("#" + $gridid).kendoGrid({
    //    toolbar: ["excel"],
    //    excel: {
    //        fileName: "Export To Exceel.xlsx"
    //    },
    //    dataSource: {
    //        data: $data,
    //        pageSize: $pageSize
    //    },
    //    // mobile: "phone",
    //    height: 550,
    //    scrollable: true,
    //    sortable: true,
    //    filterable: { mode: "row" },
    //    //filterable: true,
    //    selectable: true,
    //    pageable: {
    //        pageSizes: [50, 100, 250, 500, 1000],
    //        width: 20,
    //    },
    //    columns: $colModel,
    //    dataBinding: function () {
    //        record = (this.dataSource.page() - 1) * this.dataSource.pageSize();// this is use to add dynamic serial number in grid 
    //    }
    //}).data("kendoGrid");

}
var bindAttendanceKendoGridOnly = function ($gridid, $pageSize, $colModel, $data, selectable = false, height = 550) {



    $("#" + $gridid).kendoGrid({
        toolbar: ["excel"],
        pdf: {
            allPages: true,
            paperSize: "A4",
            //  margin: { top: "3cm", right: "1cm", bottom: "1cm", left: "1cm" },
            margin: { top: "3cm", right: "1cm", bottom: "1cm", left: "1cm" },
            landscape: true,
            template: $("#page-template").html()
        },
        excel: { fileName: "Export To Exceel.xlsx" },


        dataSource: {
            data: $data,
            pageSize: 500// $pageSize
        },
        height: height,
        scrollable: true,
        sortable: true,
        filterable: { mode: "row" },
        selectable: selectable,
        //pageable:false,
        // pageable: {
        //     pageSizes: [50, 100, 250, 500, 1000],
        //     width: 20,
        // },
        columns: $colModel,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();// this is use to add dynamic serial number in grid 
        }
    }).data("kendoGrid");


    //    $("#" + $gridid).data("kendoGrid").wrapper.find(".k-grid-header-wrap").off("scroll.kendoGrid");



}




var bindKendoGrid_Groupable = function ($gridid, $pageSize, $colModel, $data, selectable = false, height = 550) {
    $("#" + $gridid).kendoGrid({

        dataSource: {
            data: $data,
            pageSize: $pageSize
        },
        height: height,
        scrollable: true,
        resizable: true,
        sortable: true,
        filterable: { mode: "row" },
        selectable: selectable,
        pageable: {
            pageSizes: [50, 100, 250, 500, 1000],
            width: 20,
        },
        groupable: true,
        columns: $colModel,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();// this is use to add dynamic serial number in grid 
        }
    }).data("kendoGrid");

}


var bindkendoGridForProperty = function ($gridid, $pageSize, $colModel, $data, onChange) {

    $("#" + $gridid).kendoGrid({
        toolbar: kendo.template($("#template").html()),
        dataSource: {
            data: $data,
            pageSize: $pageSize
        },
        height: 550,
        scrollable: true,
        sortable: true,
        //filterable: true,
        selectable: "multiple",
        filterable: { mode: "row" },
        change: onChange,
        pageable: {
            pageSizes: [50, 100, 250, 500, 1000],
            width: 20,
        },
        columns: $colModel,

        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();// this is use to add dynamic serial number in grid 
        }
    }).data("kendoGrid");


}
var bindkendoGridPrint = function ($gridid, $pageSize, $colModel, $data) {

    $("#" + $gridid).kendoGrid({


        dataSource: {
            data: $data,
            pageSize: $pageSize
        },
        //toolbar: ["search"],
        // mobile: "phone",
        height: 550,
        scrollable: true,
        sortable: true,
        // filterable: { mode: "row" },
        //filterable: true,
        selectable: true,
        //pageable: {
        //    pageSizes: [50, 100, 250, 500, 1000],
        //    width: 20,
        //},
        columns: $colModel,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();// this is use to add dynamic serial number in grid 
        }
    }).data("kendoGrid");


}

var bindkendoGrid2 = function ($gridid, $pageSize, $colModel, $data) {

    $("#" + $gridid).kendoGrid({
        toolbar: ["excel", "pdf", "search"],
        pdf: {
            allPages: true,
            paperSize: "A3",
            //  margin: { top: "3cm", right: "1cm", bottom: "1cm", left: "1cm" },
            margin: { top: "3cm", right: "1cm", bottom: "1cm", left: "1cm" },
            landscape: true,
            template: $("#page-template").html()
        },
        excel: {
            fileName: "Export To Exceel.xlsx"
        },
        dataSource: {
            data: $data,
            pageSize: $pageSize
        },
        //toolbar: ["search"],
        // mobile: "phone",
        height: 550,
        scrollable: true,
        sortable: true,
        // filterable: { mode: "row" },
        //filterable: true,
        selectable: true,
        pageable: {
            pageSizes: [50, 100, 250, 500, 1000],
            width: 20,
        },
        columns: $colModel,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();// this is use to add dynamic serial number in grid 
        }
    }).data("kendoGrid");


}


var bindHeiraricalkendoGrid = function ($gridid, $pageSize, $colModel, $data, height = 550) {

    $("#" + $gridid).kendoGrid({
        dataSource: {
            data: $data,
            pageSize: $pageSize
        },
        toolbar: ["search"],
        height: height,
        scrollable: true,
        sortable: true,
        //filterable: true,
        selectable: true,
        pageable: {
            pageSizes: [5, 10, 15, 20, 50, 100],
            width: 20,
        },
        columns: $colModel,
        detailInit: loadChildGridData,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();// this is use to add dynamic serial number in grid 

            if (record != 0) {
                this.expandRow(this.tbody.find("tr.k-master-row").first());
            }
        },
        //change: function () {
        //    let $row = this.select();

        //    if ($row.length && $row.find('[aria-expanded="true"]').length) {
        //        this.collapseRow($row);
        //    }
        //    else { this.expandRow($row); }
        //},

    }).data("kendoGrid");


}

function detailInit(e) {

    $("<div/>").appendTo(e.detailCell).kendoGrid({
        dataSource: {
            //  data: $data, 
            //  type: "odata",
            //transport: {
            //    read: ""
            //  },
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,

            filter: { field: "PropertyID", operator: "eq", value: e.data.propertyID }
        },
        scrollable: false,
        sortable: true,
        pageable: true,
        pageable: {
            pageSizes: [5, 10, 15, 20, 50, 100],
            width: 20,
        },
        columns: [
            { field: e.data.unitID, title: "UnitID", width: "10%" },
            { field: e.data.title, title: "Title", width: "10%" },

        ]
    });
}


var bindkendoStepper = function ($stepperId, $linear, $steps, $onActivate, $onSelect, $width, $orientation) {

    $("#" + $stepperId).kendoStepper({
        orientation: $orientation,
        linear: $linear,  // If linear true then we cant select any step ... by |\/|ati
        steps: $steps,
        //  width:$width,
        activate: $onActivate, //pass function name  ...  
        select: $onSelect,      //pass function name  ...  


    });

    var stepper = $("#" + $stepperId).width($width);
    var stepperr = $("#" + $stepperId).data('kendoStepper')
    stepper.resize();


    for (var index = 0; index < $steps.length; index++) {


        /*
        if ($steps[index].approved_file == '') {
            $(stepperr.steps()[index].element[0]).css("background-color", "rgb(197 197 197 / 20%)");

        }
        */
        /*
        if ($steps[index].approved_file > 0) {

            //stepper.find('.k-step-done').css("background-color", "#a1f94a9c");
            $(stepperr.steps()[index].element[0]).css("background-color", "#a1f94a9c").css("border", "ridge");


        } if ($steps[index].return_file > 0) {

            $(stepperr.steps()[index].element[0]).css("background-color", "mistyrose").css("border", "ridge");
            // $(stepperr.steps()[index].element[0]).css("background-color", "mistyrose").css("border", "1px ridge");
            //  $(stepperr.steps()[index].element[0]).css("background-color", "mistyrose").css("border", "groove");

        }
         */


        //---------- FOR MAIN SECTION
        var parent_stepper = $("#project-section-stepper").data('kendoStepper');
        if ($steps[index].error === true) {

            $(parent_stepper.steps()[index].element[0]).css("background-color", "mistyrose").css("border", "1px solid darkred");


            if (parent_stepper.selectedStep.options.conditionalField == 'Design Section') {

                $(parent_stepper.steps()[index].element[0]).css("background-color", "transparent").css("border", "none");
                error_PROJECT_MAIN_SECTION_Design_Stepper = false
            } else if (parent_stepper.selectedStep.options.conditionalField == 'Technical Section') {
                $(parent_stepper.steps()[index].element[0]).css("background-color", "transparent").css("border", "none");
                error_PROJECT_MAIN_SECTION_Technical_Stepper = false
            } else if (parent_stepper.selectedStep.options.conditionalField == 'Supervision Section') {
                $(parent_stepper.steps()[index].element[0]).css("background-color", "transparent").css("border", "none");
                error_PROJECT_MAIN_SECTION_Supervision_Stepper = false
            }

        }
    }



    //stepper.find('.k-step-done').css("background-color", "lawngreen");
    // stepper.find('.k-step-done').css("background-color", "greenyellow");
    // $("#" + $stepperId).unbind($steps);



}



var validateForm = function ($form) {
    var valid = true;
    $('#' + $form + " input[required],#" + $form + " textarea[required],#" + $form + " select[required]").each(function () {
        if ($(this).hasClass('select2')) {
            $($(this).data('select2').$container).removeClass("invalid");
        } else { $(this).removeClass('invalid'); }

        $(this).attr('title', '');
        if (!$(this).val()) {
            if ($(this).hasClass('select2')) {
                $($(this).data('select2').$container).addClass("invalid");
            }
            else {
                $(this).addClass('invalid');
            }
            $(this).attr('title', 'This field is required');
            valid = false;
        }

        //if ($(this).attr("type") == "email" && !$(this).val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
        //    $(this).addClass('invalid');
        //    $(this).attr('title', 'Enter valid email');
        //    valid = false;
        //}
    });

    return valid;
}
var customValidateForm = function ($form) {
    var valid = true;
    $('#' + $form + " input[required],#" + $form + " textarea[required],#" + $form + " select[required]").each(function () {

        //alert($(this).attr('name'));
        //$(this).next("span").remove();
        //if ($(this).hasClass('k-dropdown')) {
        var thisFieldIsRequired = _currentLanguage == 'en-US' ? 'This field is required' : 'هذه الخانة مطلوبة';
        if ($(this).parent().hasClass('k-dropdown')) {
            if ($(this).val() == '-1') {
                $(this).addClass('invalid');
                $(this).attr('title', thisFieldIsRequired);
                $(this).removeClass("invalid");
                $(this).next("span").remove();
                $(this).after("<span style='color:red;'>" + thisFieldIsRequired + "</span>");
                valid = false;
            } else {
                $(this).removeClass("invalid");
                $(this).next("span").remove();
            }
        }
        else if ($(this).attr('data-role') == 'datepicker') {

            if ($(this).val() == 'year-month-day') {
                $(this).addClass('invalid');
                $(this).attr('title', thisFieldIsRequired);
                $(this).removeClass("invalid");
                $(this).next("div").remove();
                $(this).after("<div class='row col-md-12'><span style='color:red;'>" + thisFieldIsRequired + "</span></div>");
                valid = false;
            } else if ($(this).attr('data-role') == 'datepicker') {

                if ($(this).val() == 'day/month/year') {
                    $(this).addClass('invalid');
                    $(this).attr('title', thisFieldIsRequired);
                    $(this).removeClass("invalid");
                    $(this).next("div").remove();
                    $(this).after("<div class='row col-md-12'><span style='color:red;'>" + thisFieldIsRequired + "</span></div>");
                    valid = false;
                } else {
                    $(this).removeClass("invalid");
                    $(this).next("div").remove();
                }
            }
            else {
                $(this).removeClass("invalid");
                $(this).next("div").remove();
            }
        }
        else if ($(this).attr('data-role') == 'timepicker') {
            if ($(this).val() == 'hours:minutes AM/PM') {
                $(this).addClass('invalid');
                $(this).attr('title', thisFieldIsRequired);
                $(this).removeClass("invalid");
                $(this).next("div").remove();
                $(this).after("<div class='row col-md-12'><span style='color:red;'>" + thisFieldIsRequired + "</span></div>");
                valid = false;
            } else {
                $(this).removeClass("invalid");
                $(this).next("div").remove();
            }
        }
        else {
            if (!$(this).val()) {
                $(this).addClass('invalid');
                $(this).removeClass("invalid");
                $(this).next("span").remove();
                $(this).attr('title', thisFieldIsRequired);
                $(this).after("<span style='color:red;'>" + thisFieldIsRequired + "</span>");
                valid = false;
            } else {
                $(this).removeClass("invalid");
                $(this).next("span").remove();
            }
        }
        //    else if ($(this).hasClass('select2')) {
        //if ($(this).val() == "00000000-0000-0000-0000-000000000000") {
        //    $(this).addClass("invalid");
        //    valid = false;
        //} else {

        //    $(this).removeClass("invalid");
        //    $(this).next("span").remove();
        //}
        //}

    });
    //var container = $("#" + $form);
    //kendo.init(container);
    //container.kendoValidator({
    //    rules: {
    //        validmask: function (input) {
    //            console.log(input);
    //            if (input.is("[data-validmask-msg]") && input.val() != "" || input.is("[data-validmask-msg]") && input.val() != "-1") {
    //                var maskedtextbox = input.data("kendoMaskedTextBox");                    
    //                return maskedtextbox.value().indexOf(maskedtextbox.options.promptChar) === -1;
    //            }

    //            return true;
    //        }
    //    }
    //});
    //var validator = $("#" + $form).data("kendoValidator");
    //if (validator.validate()) {
    //    valid = true;
    //}
    //else {
    //    valid = false;
    //}

    return valid;
}



var bindCombo = function (data, $combo) {
    var $list = "";
    $combo.empty();
    $combo.append($('<option />'));
    $.map(data, function (item) {
        $combo.append($('<option />').val(item.id).text(item.name));
        $list += ";" + item.name + ":" + item.name;
    });
    return $list;
}

var bindComboForDefault = function (data, $combo, defaultoption) {
    var $list = "";
    $combo.empty();
    var defaultoption = '<option value="00000000-0000-0000-0000-000000000000" selected>' + defaultoption + '</option>'
    $combo.append($(defaultoption));
    // $combo.append($('<option />'));
    $.map(data, function (item) {
        $combo.append($('<option />').val(item.id).text(item.name));
        $list += ";" + item.name + ":" + item.name;
    });
    return $list;
}

var bindComboForInt = function (data, $combo, defaultoption) {
    var $list = "";
    $combo.empty();
    var defaultoption = '<option value="0" selected>' + defaultoption + '</option>'
    $combo.append($(defaultoption));
    // $combo.append($('<option />'));
    $.map(data, function (item) {
        $combo.append($('<option />').val(item.id).text(item.name));
        $list += ";" + item.name + ":" + item.name;
    });
    return $list;
}




function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[1]);
        vars[hash[1]] = hash[1];
    }
    return vars;
}

//function validateEmail(email) {
//    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//    return re.test(String(email).toLowerCase());
//}
function validateEmail(str) {

    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test($(str).val()) && $(str).val() != '') {
        $(str).addClass('invalid');
        //alert("Please enter a valid email address");
        swal.fire({
            text: 'Oops..! Please enter a valid email address...!',

            //text: "You want to checkout...!",
            icon: 'error',

            confirmButtonColor: '#5cb85c',
            cancelButtonColor: '#d9534f',
            buttons: {
                confirm: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "btn btn-warning",
                    closeModal: true
                }
            }
        });


    } else {
        $(str).removeClass('invalid');
    }
}
//----------------------------  AVOID NEGATVIE NUMBERS --------------------------------
/*
 ******************** USE THIS FUNCTION ON onfocusout AND onkeydown**********************/


function fnAvoidNegavtiveNumber(Inputvalue) { //Inputvalue is input field value .
    var num = Inputvalue.value.match(/^\d+$/);
    if (num === null) {
        Inputvalue.value = "";
        false
    }

}
function swal(messageResponse) {

    var messageResponseParse = JSON.parse(messageResponse);
    if (messageResponseParse.type == undefined) {
        messageResponseParse = JSON.parse(messageResponseParse);
    } if (messageResponseParse.type == undefined) {
        messageResponseParse = JSON.parse(messageResponseParse);
    }

    Swal.fire({
        icon: messageResponseParse.type,//'info',
        title: messageResponseParse.message,//'... Job title is required',
        showConfirmButton: false,
        timer: 2000

    });
    return messageResponseParse.type;
}
function swalMessage(type, message, delayTime) {


    Swal.fire({
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: delayTime

    });
}

function buttonAddPleaseWait(buttonId) {
    var btn = document.getElementById(buttonId);
    var pleaseWait = _currentLanguage == 'en-US' ? 'Please wait...' : '...الرجاء الانتظار';
    btn.disabled = true;
    btn.innerHTML = '<i class = "fa fa-spinner fa-spin"></i> ' + pleaseWait + '';
}
function buttonRemovePleaseWait(buttonId, buttonText, buttonIcon) {
    var btn = document.getElementById(buttonId);
    btn.disabled = false;
    var icon = "fa fa-" + buttonIcon;
    btn.innerHTML = '<i class = "' + icon + '"></i> ' + buttonText + '';
}
var controlIdGlobal = '';
var dropDownOnChangeGlobal = '';
function loadKendoDropdownList(controlId, columns, tableName, conditions = null, selectedValue, onChangeFunction = null) {
    //alert(selectedValue);
    //controlIdGlobal = controlId;
    dropDownOnChangeGlobal = onChangeFunction; //'moduleDropdownListOnChange';
    ajaxRequest({ commandName: 'Common_DropdownList', values: { Columns: columns, TableName: tableName, Conditions: conditions, SelectedValue: selectedValue }, controlId: controlId, CallBack: loadjQueryDropdownListCallBack });
}

var loadjQueryDropdownListCallBack = function (loadjQueryDropdownListResponse, controlId) {

    var select = 'Select';
    //console.log('loadjQueryDropdownList - Response : ' + JSON.stringify(loadjQueryDropdownListResponse));
    //console.log('loadjQueryDropdownList - ControlId : '+controlId);
    var selectText = '-- ' + select + ' --'
    var optionList = [];
    optionList.push({ text: selectText, value: '-1' });
    var selectedIndex = -1;
    for (var i = 0; i < JSON.parse(loadjQueryDropdownListResponse.Value).length; i++) {
        var option = { text: JSON.parse(loadjQueryDropdownListResponse.Value)[i].text, value: JSON.parse(loadjQueryDropdownListResponse.Value)[i].value };
        if (JSON.parse(loadjQueryDropdownListResponse.Value)[i].isSelected == '1' && selectedIndex == -1) {
            selectedIndex = i;
        }
        optionList.push(option);

    }
    if (selectedIndex < 0) {
        selectedIndex = 0;
    }
    var combobox = $("#" + controlId).data("kendoDropDownList");
    if (combobox != undefined) {

        combobox.destroy();
    }
    $("#" + controlId).kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        dataSource: optionList,
        index: selectedIndex,
        //change: onChange
    });

    //if (dropDownOnChangeGlobal != null) {
    //    var sapProject = $("#" + controlId).data("kendoDropDownList").bind("change", dropDownOnChangeGlobal);
    //}


}

function loadKendoDropdownByTypeName(controlId, typeName, selectText = null) {

    ajaxRequest({ commandName: 'Setup_Type_DropdownByTypeName', values: { TypeName: typeName, Language: _currentLanguage }, controlId, CallBack: loadjQueryDropdownListCallBack });
}

//function bindkendoMultiSelect(controlId, data, selectText = null) {
//    var inputData = data.Value;
//    var inputDataParse = JSON.parse(inputData);    
//    //var $list = "";
//    //$controlId.empty();
//    //var defaultoption = '<option value="0" selected>' + selectText + '</option>'
//    //$.map(inputDataParse, function (item) {
//    //    $controlId.append($('<option />').val(item.value).text(item.text));
//    //    $list += ";" + item.text + ":" + item.text;
//    //});

//    var optionList = [];
//    optionList.push({ '<option value="0" selected> + selectText + </option>'});
//    for (var i = 0; i < inputDataParse.length; i++) {
//        var option = { text: inputDataParse[i].text, value: inputDataParse.value };        
//        optionList.push($('<option />').val(inputDataParse[i].value).text(inputDataParse[i].text));

//    }

//    $("#"+controlId).kendoMultiSelect({
//        animation: {
//            open: {
//                effects: "zoom:in",
//                duration: 300
//            }
//        },
//        dataSource: optionList
//        //{
//        //    data: ["Short item", "An item with really, really long text"]
//        //}
//    });
//    //return $list;
//}

function loadDepartmentTreeDropdownList() {
    //ajaxRequest({ commandName: 'HR_Department_Dropdown_GetAll', values: { Language: 'English', }, CallBack: loadTreeDropdownListCallBack });
    ajaxRequest({ commandName: 'HR_Department_Dropdown_GetAll', values: { Language: _currentLanguage, }, CallBack: loadTreeDropdownList });
}
function loadTreeDropdownList(d) {

    var _data = treeFomatter(JSON.parse(d.Value), 0);
    $("#DepartmentId").kendoDropDownTree({
        tagMode: 'single',
        height: 'auto',
        dataSource: _data
    });
}
function loadDepartmentTreeDropdownListWithCheckbox() {
    //ajaxRequest({ commandName: 'HR_Department_Dropdown_GetAll', values: { Language: 'English', }, CallBack: loadTreeDropdownListCallBack });
    ajaxRequest({ commandName: 'HR_Department_Dropdown_GetAll', values: { Language: _currentLanguage, }, CallBack: loadTreeDropdownListWithCheckBox });
}
function loadTreeDropdownListWithCheckBox(d) {

    var _data = treeFomatter(JSON.parse(d.Value), 0);
    $("#DepartmentId").kendoDropDownTree({
        checkboxes: true,
        //checkAll: true,
        autoClose: false,
        tagMode: 'single',
        height: 'auto',
        dataSource: _data
    });
}

//function loadDepartmentTreeDropdownListWithRoleBaseAndCheckbox() {

//    ajaxRequest({
//        commandName: 'HR_Department_GetAll_New_By_ID',
//        values: {
//            LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
//            LoggedInUserDepartementId = JSON.parse(localStorage.getItem('User')).departmentId,
//            LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId,
//            Language: _currentLanguage,
//        }, CallBack: loadTreeDropdownListWithRoleBaseAndCheckBox
//    });
//    //ajaxRequest({
//    //    commandName: 'HR_Department_GetAll_New_By_ID',

//    //    values:
//    //    {
//    //        LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
//    //        LoggedInUserDepartementId = JSON.parse(localStorage.getItem('User')).departmentId,
//    //        LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId,
//    //        Language: _currentLanguage


//    //    }, CallBack: loadTreeDropdownListWithRoleBaseAndCheckBox
//    //});
//}

//function loadTreeDropdownListWithRoleBaseAndCheckBox(d) {

//    var _data = treeFomatter(JSON.parse(d.Value), 0);
//    $("#DepartmentId").kendoDropDownTree({
//        checkboxes: true,
//        //checkAll: true,
//        autoClose: false,
//        tagMode: 'single',
//        height: 'auto',
//        dataSource: _data
//    });
//}



function loadDepartmentTreeDropdownListWithRoleBaseAndCheckbox() {

    ajaxRequest({
        commandName: 'HR_Department_GetAll_New_By_ID',
        values: {
            LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
            LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId,
            LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Language: _currentLanguage,
        }, CallBack: loadTreeDropdownListWithRoleBaseAndCheckBox
    });

}

function loadTreeDropdownListWithRoleBaseAndCheckBox(d) {

    var _data = treeFomatterRoleBase(JSON.parse(d.Value), 0);
    $("#DepartmentId").kendoDropDownTree({
        checkboxes: true,
        //checkAll: true,
        autoClose: false,
        // tagMode: 'single',
        height: 'auto',
        dataSource: _data
    });


}

var treeFomatterRoleBase = function (arr, parent) {


    var out = [];
    for (var i in arr) {

        if (arr[i].parentId == parent) {

            var items = treeFomatter(arr, arr[i].value);
            if (items.length) {
                arr[i].items = items;
            }
            out.push(arr[i]);
            return out;
        } else {

            var items = treeFomatter(arr, arr[i].value);
            if (items.length) {
                arr[i].items = items;
            }
            out.push(arr[i]);


        }
    }
    return out;
}

var treeFomatter = function (arr, parent) {

    var out = [];
    for (var i in arr) {
        if (arr[i].parentId == parent) {
            var items = treeFomatter(arr, arr[i].value);
            if (items.length) {
                arr[i].items = items;
            }
            out.push(arr[i]);
        }
    }
    return out;
}

//----------------------------  AVOID NEGATVIE NUMBERS END --------------------------------

// Add TinyMCE
//function addTinyMCE() {
//    // Initialize
//    tinymce.init({
//        selector: '.editor',
//        themes: 'advanced',
//        height: 300,
//        menubar: true, width: "100%",
//        plugins: [
//            'advlist autolink lists link image charmap print preview anchor',
//            'searchreplace visualblocks code fullscreen',
//            'insertdatetime media table paste code help wordcount'
//        ],
//        toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
//    });


//}
//$(document).ready(function () {
//    setTimeout(function () {
//        addTinyMCE();

//    }, 500);
//    setTimeout(function () {
//        $('.tox-tinymce-aux').css('display', 'none');
//    }, 1000);


//});
function setResponseToFormInputs(response) {

    $.each(JSON.parse(response.Value), function (key, value) {
        //console.log('key : ' + key + ' value : ' + value);
        $('#' + capitalizeFirstLetter(key)).val(value);
    });


}
function capitalizeFirstLetter(string) {

    return string.charAt(0).toUpperCase() + string.slice(1);
}

function validateFileType(inputId, fileExtension) {

    //var fileExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
    //if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
    //alert($('#' + inputId).val().split('.').pop().toLowerCase());
    if ($.inArray($('#' + inputId).val().split('.').pop().toLowerCase(), fileExtension) == -1) {




        //  swalMessage('info', 'Allowed format(s) are (' + fileExtension.join(', ') + ')', 2000);
        swalMessage('info', lblAllowedFormatsArePngJpgOnly, 2000);
        $('#' + inputId).val('');
    }
}
function encrypt(message, key) {
    var cipherText = CryptoJS.AES.encrypt(message, key);
    return cipherText.toString();
}
function decrypt(cipherText, key) {
    var bytes = CryptoJS.AES.decrypt(cipherText.toString(), key);
    var plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText;
}

function renderKendoDatePicker(controlId, format = 'yyyy-MM-dd') {//'yyyy-MM-dd') {
    var kendoDatePicker = $("#" + controlId).data("kendoDatePicker");
    if (kendoDatePicker != undefined) {
        kendoDatePicker.destroy();
    }
    $("#" + controlId).kendoDatePicker({
        format: format,
        // specifies that DateInput is used for masking the input element
        dateInput: true
    });
}
function renderKendoDatePickerWithNewFormat(controlId, format = 'dd/MM/yyyy') {//'yyyy-MM-dd') {
    var kendoDatePicker = $("#" + controlId).data("kendoDatePicker");
    if (kendoDatePicker != undefined) {
        kendoDatePicker.destroy();
    }
    $("#" + controlId).kendoDatePicker({
        format: format,
        // specifies that DateInput is used for masking the input element
        dateInput: true
    });
} function renderKendoDateAndTimePickerWithNewFormat(controlId) {
    var kendoDatePicker = $("#" + controlId).data("kendoDatePicker");
    if (kendoDatePicker != undefined) {
        kendoDatePicker.destroy();
    }
    $("#" + controlId).kendoDateTimePicker({
        // format: 'dd/MM/yyyy hh:mm tt',

        value: new Date(),
        dateInput: true
    });
    //    $("#" + controlId).kendoDatePicker({
    //        format: format,
    //        // specifies that DateInput is used for masking the input element
    //        dateInput: true
    //    });
}
function renderKendoTimePicker(controlId, timeFormate = 'HH:mm', startTime = '08:00 AM', endTime = '11:30 PM') {

    var kendoTimePicker = $("#" + controlId).data("kendoTimePicker");
    if (kendoTimePicker != undefined) {
        kendoTimePicker.destroy();
    }
    $("#" + controlId).kendoTimePicker({
        timeFormat: timeFormate,
        min: startTime,
        max: endTime,
        dateInput: true,
        animation: {
            close: {
                effects: "fadeOut zoom:out",
                duration: 300
            },
            open: {
                effects: "fadeIn zoom:in",
                duration: 300
            }
        }
    });
    //var kendoTimePicker1 = $("#" + controlId).data("kendoTimePicker");
    //kendoTimePicker1.mou
}


var convertTime12to24 = function (time12h) {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
}
var convertHHMMToSeconds = function (time24hr) {

    //var hms = "11:00:00";
    var hms = time24hr;//'02:04:33';   // your input string
    var a = hms.split(':'); // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    //This code is commented beacuse the time which we received is only in Hours and Minutes like 11:00
    // var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60;

    return seconds;
}
function firstDateShouldBeGreaterThanSecondDate(firstDate, secondDate, firstDateLabel = null, secondDateLabel = null) {
    if (firstDate > secondDate) {
        swalMessage('info', lblExpiryDateCannotBeLessThanIssue, 2000);
        //$("#EndDate").data("kendoDatePicker").value('');
        return false;
    }
    return true;
}
function only0To9WithDecimalAllowed(evt) {

    var charCode = (evt.which) ? evt.which : event.keyCode;

    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;

    return true;

}
function only1To9Allowed(evt) {

    var charCode = (evt.which) ? evt.which : event.keyCode;

    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57)) {
        return false;
    }
    else if (charCode == 48 || charCode == 46) {
        return false;
    }
    else if (charCode > 48 && charCode <= 57) {

        return true
    }
    else {

        false;
    }
}
function only0To9Allowed(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    //debugger;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57)) {
        return false;
    }
    //else if (charCode == 48 || charCode == 46) {
    else if (charCode == 46) {
        return false;
    }
    else if (charCode >= 48 && charCode <= 57) {

        return true
    }
    else {

        false;
    }
}
function isValidEmail(inputValue) {

    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i

    if (!pattern.test(inputValue)) {
        return false;
    }
    else {
        return true;
    }
}
//---- Check Validation between Issue and Expiry Dates .....

function fnCheckDateValidation(dateOne, dateTwo,) {

    var expiryDate = dateOne.value;
    var releaseDate = dateTwo.val();
    if (releaseDate > expiryDate == true) {
        swalMessage('info', lblExpiryDateCannotBeLessThanIssue + '', 3500);
    }
}


//---- REMOVE --Select-- in arabic format Dropdowns  only....
function fnRemoveSelectInArabic(sessionDDL) {

    sessionDDL[0].name == '-- Select --' ? sessionDDL[0].name = '-- اختر --' : sessionDDL[0].name = '-- Select --';
    return sessionDDL
}
function validatePersonalDocument(inputId) {
    var fileExtension = ['jpeg', 'jpg', 'pdf'];

    if ($.inArray($('#' + inputId).val().split('.').pop().toLowerCase(), fileExtension) == -1) {

        //   swalMessage('info', 'Allowed format(s) are (' + fileExtension.join(', ') + ')', 2000);
        swalMessage('info', lblAllowedFormatsArePngJpgPdf, 2000);
        $('#' + inputId).val('');
    }

}
var bindKendoDropdownList = function (responseJSON, controlId, dataTextFieldName = null, dataValueFieldName = null, defaultOption = null, selectedValue = null) {


    //var selectText = _currentLanguage == 'en-US' ? '-- ' + defaultOption + ' --' : '--- منتخب ---';

    var optionList = [];
    //optionList.push({ text: selectText, value: '00000000-0000-0000-0000-000000000000' });
    var selectedIndex = -1;
    for (var i = 0; i < responseJSON.length; i++) {

        var option = dataValueFieldName == null ? { text: responseJSON[i].text, value: responseJSON[i].value } : { text: responseJSON[i].name, value: responseJSON[i].id };
        //if (JSON.parse(responseJSON.Value)[i].isSelected == '1' && selectedIndex == -1) {
        if (dataValueFieldName == null) {
            if (responseJSON[i].value == selectedValue) {
                selectedIndex = i + 1;
            }
        }
        else {
            if (responseJSON[i].id == selectedValue) {
                selectedIndex = i + 1;

            }
        }
        optionList.push(option);

    }
    if (selectedIndex < 0) {
        selectedIndex = 0;
    }
    var combobox = $("#" + controlId).data("kendoDropDownList");
    if (combobox != undefined) {

        combobox.destroy();
    }
    $("#" + controlId).kendoDropDownList({
        dataTextField: "text",
        dataValueField: 'value',
        filter: "contains",
        dataSource: optionList,
        index: selectedIndex,
        autoBind: true,
        //popup: {
        //    appendTo: $("#" + controlId)
        //}
    });
}

//------------------ accept decimal,float values  ..... In HTML pass like this in input field onkeypress="return validate_DecimalFloat_Number(this, event);"

function validate_DecimalFloat_Number(txt, evt) {

    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 46) {
        //Check if the text already contains the . character
        if (txt.value.indexOf('.') === -1) {
            return true;
        } else {
            return false;
        }
    } else {
        if (charCode > 31 &&
            (charCode < 48 || charCode > 57))
            return false;
    }
    return true;
}
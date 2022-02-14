

var KendoGlobalAjax = function (options) {
    $('#loading').show().fadeIn(500);

    $.ajax({
        type: 'POST',
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
                options.CallBack(data);
                $('#loading').fadeOut(500);
                $('#loading').hide();
            }
        }
    });
    //   $('#loading').hide();
}
var KendoGlobalAjaxAsync = function (options) {

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


var BindEditAblekendoGrid = function ($gridid, $pageSize, $colModel, $data) {

    $("#" + $gridid).kendoGrid({
        toolbar: ["excel", "pdf"],
        excel: {
            fileName: "Export To Exceel.xlsx"
        },
        pdf: {
            fileName: "Export To pdf.pdf"
        },
        dataSource: {
            data: $data,
            pageSize: $pageSize
        },

        // mobile: "phone",
        height: 550,
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
var BindkendoGrid = function ($gridid, $pageSize, $colModel, $data) {

    $("#" + $gridid).kendoGrid({
        toolbar: ["excel", "search"],
        pdf: {
            allPages: true,
            paperSize: "A4",
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

var BindkendoGridForImages = function ($gridid, $pageSize, $colModel, $data) {

    $("#" + $gridid).kendoGrid({
        //toolbar: ["excel", "pdf", "search"],
        pdf: {
            allPages: true,
            paperSize: "A4",
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

var BindkendoGridPrint = function ($gridid, $pageSize, $colModel, $data) {

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

var BindkendoGrid2 = function ($gridid, $pageSize, $colModel, $data) {

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


var BindHeiraricalkendoGrid = function ($gridid, $pageSize, $colModel, $data) {

    $("#" + $gridid).kendoGrid({
        dataSource: {
            data: $data,
            pageSize: $pageSize
        },
        toolbar: ["search"],
        height: 550,
        scrollable: true,
        sortable: true,
        //filterable: true,
        //selectable: true,
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
var customvalidateForm = function ($form) {
   
    var valid = true;
    $('#' + $form + " input[required],#" + $form + " textarea[required],#" + $form + " select[required]").each(function () {
        if ($(this).hasClass('select2')) {
            if ($(this).val() == "00000000-0000-0000-0000-000000000000") {
                $(this).addClass("invalid");
                valid = false;
            } else {

                $(this).removeClass("invalid");
            }
        } else


            //  $(this).attr('title', '');
            if (!$(this).val()) {
                $(this).addClass('invalid');
                $(this).attr('title', 'This field is required');
                valid = false;
            } else {
                $(this).removeClass("invalid");
            }


    });

    return valid;
}



var BindCombo = function (data, $combo) {
    var $list = "";
    $combo.empty();
    $combo.append($('<option />'));
    $.map(data, function (item) {
        $combo.append($('<option />').val(item.id).text(item.name));
        $list += ";" + item.name + ":" + item.name;
    });
    return $list;
}

var BindComboForDefault = function (data, $combo, defaultoption) {
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

var BindComboForDefaultForJqueryMultiSelectDropDown = function (data, $combo, defaultoption) {
    
    var $list = "";
    $combo.empty();
    var defaultoption = '<option value="00000000-0000-0000-0000-000000000000">' + defaultoption + '</option>'
    $combo.append($(defaultoption));
    // $combo.append($('<option />'));
    $.map(data, function (item) {
        $combo.append($(' <option selected/>').val(item.id).text(item.name));
        $list += ";" + item.name + ":" + item.name;
    });
    return $list;
}
var BindkendoMultiSelect = function (data, $combo, defaultoption) {

    var $list = "";
    $combo.empty();
    
    var defaultoption = '<option value="00000000-0000-0000-0000-000000000000" selected>' + defaultoption + '</option>'
    // $combo.append($(defaultoption));
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

//----------------------------  AVOID NEGATVIE NUMBERS END --------------------------------

// Add TinyMCE
function addTinyMCE() {
    // Initialize
   
    tinymce.init({
        selector: '.editor',
        themes: 'advanced',
        height: 300,
        menubar: true, width: "100%",
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
        ],
        toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
    });


}
$(document).ready(function () {
    setTimeout(function () {
    
        addTinyMCE();

    }, 500);
    setTimeout(function () {
        $('.tox-tinymce-aux').css('display', 'none');
    }, 1000);


});


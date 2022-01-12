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
var GridFilterList = function (data) {
    var $list = "";
    $.map(data, function (item) {
        $list += ";" + item.name + ":" + item.name;
    });
    return $list;
}
var BindGurrido = function ($grid, $pager, $colNames, $colModel, $data) {
    $grid.jqGrid({
        data: $data,
        datatype: "local",
        contentType: "application/json; charset-utf-8",
        colNames: $colNames,
        colModel: $colModel,
        rownumbers: true,
        pager: $pager,
        rowNum: 15,
        rownumWidth: 50,
        rowList: [20, 30, 40, 50],
        height: '100%',
        viewrecords: true,
        loadonce: true,
        emptyrecords: 'No records are available to display',
        forceFit: true,
        autowidth: true,
        shrinkToFit: true,
        multiselect: false,
        //direction: 'rtl',
        loadComplete: function (_data) {
            $("tr.jqgrow:odd").addClass('myAltRowClassOdd');
            $("tr.jqgrow:even").addClass('myAltRowClassEven');
            // alert(JSON.stringify(_data));
        },
    });
    $grid.jqGrid('setGridParam', { data: $data });
    $grid.trigger('reloadGrid');
    $grid.jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
    $grid.jqGrid('setLabel', 'rn', 'SNo');
}

var GlobalAjax = function (options) {
    //alert(options.commandName);
    $.ajax({
        type: 'POST',
        url: '/services/Xtreme/process',
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        },
        data: JSON.stringify({ type: options.commandName, value: options.values }),
        contentType: "application/json; charset=utf-8",
        xhrFields: { withCredentials: true },
        statusCode: {
            401: function () {
            }
        },
        success: function (data) {
            if (options.CallBack !== '') { options.CallBack(data); }
        }
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

 
var GetXtremeToken = function (options) {
    $.ajax({
        type: 'POST',
        url: '/services/Xtreme/gettoken',
        data: JSON.stringify({ type: options.commandName, value: options.values }),
        contentType: "application/json; charset=utf-8",
        xhrFields: { withCredentials: true },
        success: function (data) {
            var _response = JSON.parse(data.Value);
            alert(_response.status);
            if (_response.status === true) { sessionStorage.setItem("token", _response.token); }
            else { alert("Invalid user");}
        },
        error: function () {
            alert('Something went wrong while generating token');
        }
    });
}


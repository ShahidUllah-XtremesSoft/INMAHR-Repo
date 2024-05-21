

var _id = (new URL(location.href)).searchParams.get('id');

$(function () {


    fnLoadDetailByID_();

});



function fnLoadDetailByID_() {
    ajaxRequest({
        commandName: 'Project_Task_Log_by_TaskId'
        , values: {
            Id: _id == null ? 0 : _id,
            Language: _currentLanguage
        }, CallBack: fnLoadNoteDetailByID
    });
}

//#Load  Details by ID From the Database#
function fnLoadNoteDetailByID(d) {

    var attachment = '';
    if (JSON.parse(d.Value).length > 0) {
        $('.HistoryTab').show();
        $('#append_HistoryLog').html('');
        for (var i = 0; i < JSON.parse(d.Value).length; i++) {
            var clientRowStyle = '';


            var currentFileName = JSON.parse(d.Value)[i].currentFileName;

            if (currentFileName == null) {
                attachment = "<img class='' src='../../Content/Images/user.jpg' style='width:100%;cursor:pointer;border-radius:30px;'/>";
            } else {
                attachment = `<a  target='_blank' href='/UploadFile/` + currentFileName + `'> <img class='' src='/UploadFile/` + currentFileName + `'        style='width:100%;cursor:pointer;border-radius:30px;'/> </a>`;
            }
            //------------------ Attachment in Item List Work End

            var status = JSON.parse(d.Value)[i].logStatus

            if (status.match(/Complete.*/)) {
                status = '';
                status = `<span style='color:green;'><b>` + JSON.parse(d.Value)[i].logStatus + `</b></span>`
              //  clientRowStyle = `border:green 2px solid`;
            } else if (status.match(/Stuck.*/)) {
                status = '';
                status = `<span style='color:red;'><b>` + JSON.parse(d.Value)[i].logStatus + `</b></span>`
                clientRowStyle = `border:red 2px solid`;
            }

            $('#append_HistoryLog').append(`
                                                                            <tr style="`+ clientRowStyle + `">
                                                                            <td  class="Attachment_" style="width: 5%;">` + attachment + `</td>
                                                                            <td >` + JSON.parse(d.Value)[i].username + `</br> <span style="color:darkgrey;">` + JSON.parse(d.Value)[i].timeDuration + ` </span></td>
                                                                            <td>` + JSON.parse(d.Value)[i].task + ` </td>
                                                                            <td>` + JSON.parse(d.Value)[i].description + ` </td>
                                                                            <td>` + status + ` </td>
                                                                            <td>` + JSON.parse(d.Value)[i].commentDate + ` </td>
                                                                            </tr>`);


        }

    } else {

        $('.HistoryTab').hide();
    }
}


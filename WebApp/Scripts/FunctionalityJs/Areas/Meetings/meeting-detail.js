var meeting_Id = (new URL(location.href)).searchParams.get('id');

$(function () {
    $('#Language').val(_currentLanguage);
    $('#LoggedInUserId').val(JSON.parse(localStorage.getItem('User')).id);

    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    $('#Meeting_Id').val(meeting_Id);

    loadProfile();

});
//|Load Employee Profile Starts
function loadProfile() {
    ajaxRequest({
        commandName: 'Meeting_Details_By_Id',
        values: {
            Id: meeting_Id,
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            Language: $('#Language').val()
        }, CallBack: loadProfileCallBack
    });
}
function loadProfileCallBack(response) {
    var responseDetails = JSON.parse(response.Value);
    localStorage.setItem('meetingDetails', response.Value);

    //------ Meeting Info
    $(".meeting-days").text(responseDetails.dayName)
    //$(".meeting-hours").text(responseDetails.meetingHour)
    //$(".meeting-minutes").text(responseDetails.meetingMinutes)

    $(".meeting-hours").text(responseDetails.subtracted_Hour)
    $(".meeting-minutes").text(responseDetails.subtracted_Min)

    $(".meeting-date").text(responseDetails.meetingDate)
    $(".meeting-start-timing").text(responseDetails.startedTimeFormated)
    $(".meeting-end-timing").text(responseDetails.endedTimeFormated)
    $(".meeting-status").text(responseDetails.meetingStatus)

    //------ Client Info
    $(".ClientName").text(responseDetails.clientName)
    $(".PhoneNumber1").text(responseDetails.phoneNumber1)
    $(".PhoneNumber2").text(responseDetails.phoneNumber2)
    $(".Email1").text(responseDetails.email1)
    $(".Email2").text(responseDetails.email2)
    $(".Nationality").text(responseDetails.nationalityName)
    $(".ClientCity").text(responseDetails.cityName)
    $(".ClientLocation").text(responseDetails.location)
    $(".ClientCreatedDate").text(responseDetails.clientCreatedDate)

    //------ Employee Info
    $(".EmpName").text(responseDetails.employeeName)
    $(".EmpPhoneNumber").text(responseDetails.empPhoneNumber)
    //$(".EmpEmail").text(responseDetails.empEmail)
    $(".EmpNationality").text(responseDetails.empnationalityName)

    $('#txt-body').html(responseDetails.descriptionEng);


    if (JSON.parse(response.Value).clientCurrentFileName != null) {
        var clientprofileImage = '/UploadFile/' + JSON.parse(response.Value).clientCurrentFileName;
        $('#ClientProfileImage').attr('src', clientprofileImage);


    }

    if (JSON.parse(response.Value).empCurrentFileName != null) {
        var empprofileImage = '/UploadFile/' + JSON.parse(response.Value).empCurrentFileName;
        $('#EmpProfileImage').attr('src', empprofileImage);
    }


    if (responseDetails.currentFileName != null) {

        var fileExtension = "";
        //--------------------------- ATTACHMENT FIX ICON WORK HERE ----------------------------------------
        if (responseDetails.filePath.split('.')[1] == "docx" || responseDetails.filePath.split('.')[1] == "doc" || responseDetails.filePath.split('.')[1] == "docs") {
            fileExtension = "/Content/Images/docx.png";
        } else if (responseDetails.filePath.split('.')[1] == "pdf" || responseDetails.filePath.split('.')[1] == "PDF") {


            fileExtension = "/Content/Images/pdf.png";

        } else if (responseDetails.filePath.split('.')[1] == "xls" || responseDetails.filePath.split('.')[1] == "xlsx") {
            fileExtension = "/Content/Images/xls.png";
            /*fileExtension = "icofont icofont icofont-file-excel f-28 text-muted";*/
        }
        else if (responseDetails.filePath.split('.')[1] == "jpg" || responseDetails.filePath.split('.')[1] == "JPG" || responseDetails.filePath.split('.')[1] == "jpeg" || responseDetails.filePath.split('.')[1] == "JPEG" || responseDetails.filePath.split('.')[1] == "png" || responseDetails.filePath.split('.')[1] == "PNG") {
            //   fileExtension = "/Content/Images/ImageIcon.png";
            fileExtension = '/UploadFile/' + responseDetails.currentFileName;
            //fileExtension = "ti-gallery f-28 text-muted";
        } else {
            fileExtension = "/Content/Images/attachment.png";
        }


        //--------------------------- ATTACHMENT FIX ICON WORK END ----------------------------------------



        $('.attachmentRow').show();
        var attachments = '/UploadFile/' + responseDetails.currentFileName;
        $('#letter-attachment').attr('src', fileExtension).attr('alt', responseDetails.orignalFileName);
        $('#attachment-open').attr('href', attachments);
    }
}




//--------------------------- MEETING START WORK  ----------------------------------------
function fn_StartMeeting(e) {
    var meetingDetails = localStorage.getItem('meetingDetails');

    //console.log(JSON.parse(meetingDetails))


    $('#load-modal').click();
    $('.projectNo').text(JSON.parse(meetingDetails).projectNumber);
    $('.projectName').text(JSON.parse(meetingDetails).projectName);


    if ($('#hours').text() == 0 && $('#minutes').text() == 0) {
        $('#start').attr('disabled', true)
    } else {

        $('#start').attr('disabled', false)
    }


}

//--------------------------- MEETING START WORK END  ----------------------------------------
//---------------------------       By /\/\ati      ----------------------------------------
var meetingHours = 0, meetingMinutes = 0, meetingSeconds = 0, countDownTarget = 0, x = 0;

$('#btn-multiple-meeting-save').click(function () {

    if (customValidateForm('frmAddUpdate_Multiple_Meeting')) {

        buttonAddPleaseWait('btn-multiple-meeting-save');

        $("#frmAddUpdate_Multiple_Meeting").ajaxForm();
        var options = {
            success: function (response, statusText, jqXHR) {
                buttonRemovePleaseWait('btn-multiple-meeting-save', save, 'save');

                swal(response);
                var messageResponseParse = JSON.parse(response);
                if (messageResponseParse.type == undefined) {
                    messageResponseParse = JSON.parse(messageResponseParse);
                } if (messageResponseParse.type == undefined) {
                    messageResponseParse = JSON.parse(messageResponseParse);
                }
                //  $('#EmployeeId').val(messageResponseParse.insertedId);

                setTimeout(function () {
                    location.reload();
                }, 1500)
                // window.location.href = '/Project/Issue/List';

            },
            error: function (xhr, status, error) {
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                buttonRemovePleaseWait('btn-multiple-meeting-save', save, 'save');
                alert(errmsg);
            },
            complete: function () {
                buttonRemovePleaseWait('btn-multiple-meeting-save', save, 'save');
            }
        };
        $("#frmAddUpdate_Multiple_Meeting").ajaxSubmit(options);
    }
    else {
        buttonRemovePleaseWait('btn-multiple-meeting-save', save, 'save');
        return false;
    }
});


$("#start").click(function () {

    meetingHours = parseFloat($('#hours').text());
    meetingMinutes = parseFloat($('#minutes').text());
    meetingSeconds = parseFloat($('#secondss').text());


    if (meetingMinutes == 0 && meetingHours == 0 && meetingSeconds == 0) {
        $('#start').val("Save").text(save);
        $('#EndedTime').val(fnReturnDateTime());
        $('#btn-multiple-meeting-save').click();
        Swal.fire({
            //title: 'Are you sure?',
            text: lblMeetingTimeCompleted,
            icon: 'info',
            confirmButtonColor: 'btn btn-success',
        }).then((result) => {

            $('#btn-modal-close').click();

        })

    } else {


        if ($('#start').val() == "Start") {
            $('#start').val("End").text(lblMeetingEnd);
            $('#StartedTime').val(fnReturnDateTime());

        } else if ($('#start').val() == "End") {
            $('#start').val("Save").text(save);

            $('#EndedTime').val(fnReturnDateTime());


        } else if ($('#start').val() == "Save") {
            $('#btn-multiple-meeting-save').click();

        }

        /*
        var customDbDate = JSON.parse(localStorage.getItem('meetingDetails')).meetingStartDateTime  
        var countDownDate = new Date(customDbDate).getTime();
    
         
        var dateforSubtraction = JSON.parse(localStorage.getItem('meetingDetails')).meetingEndDateTime
        var endDate = new Date(dateforSubtraction).getTime();
        let diffTime = Math.abs(countDownDate - endDate); 
        */

        if (meetingHours > 0 && meetingMinutes <= 0) {

            var newHour = meetingHours - 1;
            document.getElementById("hours").innerHTML = '0' + newHour;

            document.getElementById("minutes").innerHTML = 60;
            document.getElementById("secondss").innerHTML = 60;

            meetingMinutes = 60;

        }
        countDownTarget = new Date().getTime() + meetingMinutes * 60 * 1000;



        showClock(countDownTarget);

        // Update the count down every 1 second
        x = setInterval(function () {
             
            if ($('#start').val() != "Save") {
                if (parseFloat($('#hours').text()) == 0 && parseFloat($('#minutes').text()) == 0 && parseFloat($('#secondss').text()) == 0) {
                    $('#start').val("Save").text(save);
                    $('#EndedTime').val(fnReturnDateTime());
                    Swal.fire({
                        text: lblMeetingTimeCompleted,
                        icon: 'info',
                        confirmButtonColor: 'btn btn-success',
                    }).then((result) => {

                        //  $('#btn-multiple-meeting-save').click();
                        //  $('#btn-modal-close').click();
                    });
                    clearInterval(x);
                }



                showClock(countDownTarget);
            } else if (countDownTarget - new Date().getTime() < 0) {

                if (meetingHours > 0) {
                    var newHour = meetingHours - 1;
                    document.getElementById("hours").innerHTML = '0' + newHour;
                    document.getElementById("minutes").innerHTML = 60;
                    document.getElementById("secondss").innerHTML = 60;

                    meetingMinutes = 60;
                    countDownTarget = new Date().getTime() + meetingMinutes * 60 * 1000;
                    showClock(countDownTarget);
                } else {
                    clearInterval(x);

                }
            }
            else {
                clearInterval(x);

            }


        }, 1000);
    }
});
function showClock(target) {


    const distance = target - new Date().getTime();
    //  const hour = distance < 0 ? 0 : Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = distance < 0 ? 0 : Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = distance < 0 ? 0 : Math.floor((distance % (1000 * 60)) / 1000);

    //    // Output the results
    //  document.getElementById("hours").innerHTML = hour;
    document.getElementById("minutes").innerHTML = mins;
    document.getElementById("secondss").innerHTML = secs;



    /*
  if (parseFloat($('#hours').text()) == 0 && parseFloat($('#minutes').text()) == 0 && parseFloat($('#secondss').text()) == 0) {
    alert('');
    $('#start').val("Save").text(save);
    $('#EndedTime').val(fnReturnDateTime());
  
    Swal.fire({
        //title: 'Are you sure?',
        text: lblMeetingTimeCompleted,
        icon: 'info',
        confirmButtonColor: 'btn btn-success',
    }).then((result) => {

        $('#btn-multiple-meeting-save').click();
       $('#btn-modal-close').click();
    });

}
*/
}
$("#btn-modal-close").click(function () {
    alert('If you leave before saving, your changes will be lost. ');
    //$('#modal-meeting-start-end').hide();
    location.reload();
});


function fnReturnDateTime() {

    var today = new Date();
    var cHour = today.getHours();
    var cMin = today.getMinutes();
    var cSec = today.getSeconds();
    //alert(cHour + ":" + cMin + ":" + cSec);
    return cHour + ":" + cMin + ":" + cSec;
}






function fnCheckTab(selectedTab) {

    if (selectedTab == "MeetingsInformation") {

        loadClientMeetingInformationKendoGrid();
    }

}
function loadClientMeetingInformationKendoGrid() {
    ajaxRequest({
        commandName: 'Meeting_Multiple_Get_By_Id',
        values: {
            Meeting_Id: meeting_Id,
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Language: _currentLanguage
        }, CallBack: loadClientMeetingInformationKendoGridCallBack
    });
}
var loadClientMeetingInformationKendoGridCallBack = function (inputDataJSON) {

    loadClientMeetingInformationKendoGridResponse(JSON.parse(inputDataJSON.Value));
}


var loadClientMeetingInformationKendoGridResponse = function (inputDataJSON) {

    var gridColumns = [

        { field: "meetingMultiple_Id", title: "meetingMultiple_Id", hidden: true },
        { field: "meetingId", title: "meetingId", hidden: true },
        { field: "projectId", title: "projectId", hidden: true },
        { title: "#", template: "<b>#= ++record #</b>", width: 5, },

        {
            field: "projectNumber", hidden: false, title: lblProjectNo, width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= meetingDetailsById(this)  title=''>#=projectNumber#</a> ",
        },
        {
            field: "projectName", hidden: true, title: lblProject, width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= meetingDetailsById(this)  title=''>#=projectName#</a> ",
        },

        //  { field: "employeeName", title: employeeName, width: 80, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },

        { field: "meetingDate", title: lblMeetingDate, width: 30, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }, template: "<span class='badge badge-danger'>#:meetingDate#</span>" },
        //  { field: "dayName", title: lblDay, width: 30, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }, template: "<span class='badge badge-info'>#:dayName#</span>" },
        { field: "startedTimeFormated", title: lblStartTime, width: 30, filterable: false, template: "<span class='badge badge-success'>#:startedTimeFormated#</span>" },
        { field: "endedTimeFormated", title: lblEndTime, width: 30, filterable: false, template: "<span class='badge badge-danger'>#:endedTimeFormated#</span>" },
        { field: "totaltime", title: ".totaltime", width: 30, filterable: false, template: "<span class='badge badge-danger'>#:totaltime#</span>" },
        //   { field: "status", title: lblStatus, width: 30, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }, template: "<span class='badge badge-info'>#:status#</span>" },
        { field: "remarks", title: lblRemarks, width: 30, filterable: false, template: "<span class='badge badge-info'>#:remarks#</span>" },

    ];
    bindKendoGrid('grid-multiple-meeting-information', 50, gridColumns, inputDataJSON, true, 400);

};
function meetingDetailsById(e) {
    var row = $(e).closest("tr");
    var grid = $("#grid-multiple-meeting-information").data("kendoGrid");
    var dataItem = grid.dataItem(row);

    window.location.href = '/Project/Project/Details?id=' + dataItem.projectId + '';
}
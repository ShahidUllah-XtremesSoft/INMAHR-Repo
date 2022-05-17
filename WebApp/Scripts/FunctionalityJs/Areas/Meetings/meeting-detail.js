var personalClient_Id = (new URL(location.href)).searchParams.get('id');

$(function () {
    $('#Language').val(_currentLanguage);
    $('#LoggedInUserId').val(JSON.parse(localStorage.getItem('User')).id);


    loadProfile();

});
//|Load Employee Profile Starts
function loadProfile() {
    ajaxRequest({
        commandName: 'Meeting_Details_By_Id',
        values: {
            Id: personalClient_Id,
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
    $(".meeting-hours").text(responseDetails.meetingHour)
    $(".meeting-minutes").text(responseDetails.meetingMinutes)
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



function fnCheckTab(selectedTab) {

    if (selectedTab == "ClientDocumentInformation") {

        loadPersonalDocumentsKendoGrid();
    }

}

//--------------------------- MEETING START WORK  ----------------------------------------
function fn_StartMeeting(e) {
    var meetingDetails = localStorage.getItem('meetingDetails');

    console.log(JSON.parse(meetingDetails))
    $('#load-modal').click();
    $('.projectNo').text(JSON.parse(meetingDetails).projectNumber);
    $('.projectName').text(JSON.parse(meetingDetails).projectName);
}

//--------------------------- MEETING START WORK END  ----------------------------------------
//---------------------------       By /\/\ati      ----------------------------------------
var meetingHours = 0, meetingMinutes = 0, meetingSeconds = 0, countDownTarget=0,x=0;

$("#stop").click(function () {
    clearInterval(x);
});

$("#start").click(function () {

    meetingHours = parseFloat($('#hours').text());
    meetingMinutes = parseFloat($('#minutes').text());
    meetingSeconds = parseFloat($('#secondss').text());
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
        showClock(countDownTarget);
        if (countDownTarget - new Date().getTime() < 0) {
             
            if (meetingHours > 0  ) {
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
    }, 1000);

});
function showClock(target) {
     

    const distance = target - new Date().getTime();
    //  const hour = distance < 0 ? 0 : Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = distance < 0 ? 0 : Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = distance < 0 ? 0 : Math.floor((distance % (1000 * 60)) / 1000);

    // Output the results
    //  document.getElementById("hours").innerHTML = hour;
    document.getElementById("minutes").innerHTML = mins;
    document.getElementById("secondss").innerHTML = secs;
}
$("#btn-modal-close").click(function () {
    alert('If you leave before saving, your changes will be lost. ');
    //$('#modal-meeting-start-end').hide();
});
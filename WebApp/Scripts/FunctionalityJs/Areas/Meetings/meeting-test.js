var baseUrl = $('meta[name="baseurl"]').attr('content');

var basepath = baseUrl;

var assetsPath = baseUrl + 'assets/';

var globalImgPath = baseUrl + 'assets/plugins/images/';

var globalPluginsPath = baseUrl + 'plugins/bower_components/';

var customPluginsPath = baseUrl + 'assets/js/pages/';

var globalCssPath = baseUrl + 'assets/css/';

var token = $('meta[name="_token"]').attr('content');


/*
* Stop watch count down
* events: start, stop, clear
* */
$("#start").click(function () {

    var project_id = $('#selectProject').val();
    $('#meeting-msg-contnr').html('');

    if (project_id != "") {
        $('#stop').attr('disabled', false);
        var h1 = document.getElementsByTagName('h1')[0],
            start = document.getElementById('start'),
            stop = document.getElementById('stop'),
            clear2 = document.getElementById('clear2'),

            seconds = 0,
            minutes = 0,
            hours = 0,
            t;

        $(this).attr('disabled', true);
        var dt = new Date();
        var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();


        $("#startedOn").text(time);


        function add() {
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
                if (minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
            }

            h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

            timer();
        }
        function timer() {
            t = setTimeout(add, 1000);
        }
        timer();


        /* Start button */
        start.onclick = timer;

        /* Stop button */
        stop.onclick = function () {
            clearTimeout(t);
        }

        /* Clear button */
        clear2.onclick = function () {
            h1.textContent = "00:00:00";
            seconds = 0;
            minutes = 0;
            hours = 0;
            $('#meetingMinutes').val('');
            $('#multi_file_upload').val('');
            $('#totalAttachments').val('');
            $('#start').prop("disabled", false);
            //$('#stop').prop("disabled", false); 
        }


    } else {

        $('#meeting-msg-contnr').html('<div class="alert alert-danger"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>Error! </strong> Please select the project first.</div>');
    }
});


/*
* Stop trigger
* */


$("body").on('click', '#stop', function () {
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

    var endTime = $("#endedOn").text(time);

    var startTime = $("#startedOn").text();
    var endedOn = $("#endedOn").text();
    var id = $("#incrementalId").val();
    var minutes = $("#meetingMinutes").val();

    $(this).attr('disabled', true);

    saveMeetings(startTime, endedOn, minutes);
    // saveMeetings(startTime,endedOn,id,);

});


//loading modals

$('body').on('click', '.minutes', function () {

    var projectNum = $("#project").text();
    var meetingId = $(this).data('id');

    $("#townPlanCommentTab").hide();

    var data = {
        '_token': token,
        'meetingId': meetingId,
        'projectId': projectNum
    };

    //updating modal header
    $(".panelHead").text('Last Visits For Project: #' + projectNum);


    $.ajax({
        url: basepath + "get-last-visits",
        type: "post",
        dataType: "json",
        data: data,
        beforeSend: function () {
            // $('#loading-image').show();
            //$('.modal-body').css("opacity", "0.4");
        },
        complete: function () {
            // $('#loading-image').hide();
            // $('.modal-body').css("opacity", "1");
        },
        success: function (data) {

            //filling divs for attachments
            $("#lastMeetingVisits").html(data.html);

            console.log(data);
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });

});


//trigger to enlarge preview of image attachment
$('body').on('click', '.sendViewTrigger', function () {
    var img = $(this).html();
    $(".seePreview").html(img);
});



//function to get data for meeting
function getMeetingData(projectNum) {
    var data = { "project_num": projectNum, "_token": token };
    $.ajax({
        url: basepath + "get-meeting-data",
        type: "Post",
        dataType: "json",
        data: data,
        success: function (data) {
            $("#project").text(data.project_num);//project number
            $("#name").text(data.name);//client_name
            $("#total_meeting_visit").text(data.visittotal);//client_name
            $("#total_meeting_minutes").text(data.mintotal);//client_name
            // $("#incrementalId").val(data.id);//incremental id
            $("#meetingDataList").html(data.meetings);//list of meetings
            // alert(data.meetings);
            // console.log(data);
            // $("#waqas").html(data);
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}

//asving the meeting with all details
function saveMeetings(startTime, endedOn, minutes) {
    var totalAttachments = $("#totalAttachments").val();//totalAttachements
    var imgNames = [];
    var project = $("#project").text();//project number
    var name = $("#name").text();//client_name

    for ($i = 1; $i <= totalAttachments; $i++) {
        imgNames[$i] = $("#img" + $i).data('imgname');
    }

    $("#project").text();//project number
    $("#name").text();//client_name
    $("#incrementalId").data();//incremental idb


    var meetingData = {
        "attachments": imgNames,
        "projectId": project,
        "name": name,
        "startedOn": startTime,
        "endedOn": endedOn,
        "minutes": minutes,
        "_token": token
    };
    // console.log(meetingData);
    $.ajax({
        url: basepath + "save-meeting-data",
        type: "Post",
        dataType: "json",
        data: meetingData,
        success: function (data) {
            //alert(data.html);
            $("#newMeeting").html(data.html);
            $("#newMeeting").css("background-color", '#ccc');
            // $("#waqas").html(data);
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}


/*
* Action Scripts
* */


// Variable to store your files
var files;
var token = $('meta[name="_token"]').attr('content');
// Add events
$('input[type=file]').on('change', prepareUpload);


// Grab the files and set them to our variable
function prepareUpload(event) {
    files = event.target.files;
    uploadFiles(event);
}

function uploadFiles(event) {
    event.stopPropagation(); // Stop stuff happening
    event.preventDefault(); // Totally stop stuff happening

    var project_id = $('#selectProject').val();
    $('#meeting-msg-contnr').html('');

    // START A LOADING SPINNER HERE
    if (project_id != "") {
        // Create a formdata object and add the files
        var data = new FormData();
        $.each(files, function (key, value) {
            data.append(key, value);

        });
        var projectNum = $("#selectProject").val();
        data.append('_token', token);
        data.append('projectNum', projectNum);
        $.ajax({
            url: basepath + 'upload_meeting_files',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            success: function (data, textStatus, jqXHR) {

                $("#totalAttachments").val(data.count);
                $("#imgPreviews").html(data.html);//throughing preview

                if (typeof data.error === 'undefined') {
                    // Success so call function to process the form
                }
                else {
                    // Handle errors here
                    console.log('ERRORS: ' + data.error);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // Handle errors here
                console.log('ERRORS: ' + textStatus);
                // STOP LOADING SPINNER
            }
        });
    } else {
        $('#multi_file_upload').val('');
        $('#meeting-msg-contnr').html('<div class="alert alert-danger"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>Error! </strong> Please select the project first.</div>');
    }

}

//click trigger
$('#selectProject').change(function () {
    var projectNum = $(this).val();
    getMeetingData(projectNum);
});

//enter key trigger
//search trigger by enter key
$.fn.enterKey = function (fnc) {
    return this.each(function () {
        $(this).keypress(function (ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') {
                fnc.call(this, ev);
            }
        })
    })
}

//projectNumber search by enter key
$("#selectProject").enterKey(function () {
    var projectNo = $(this).val();
    getMeetingData(projectNo);
});


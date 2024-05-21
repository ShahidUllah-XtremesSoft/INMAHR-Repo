var loggedInUser = {};
$(function () {
    $('#Language').val(_currentLanguage);

    loggedInUser = JSON.parse(localStorage.getItem('User'));
    $('#employeeName').text(loggedInUser.employeeNameEng)

    fnPickers();
});



$('#btn-search-record').click(function () {


    fn_LoadAllFunctions();
});



$('#Project_No').on("keypress", function (event) {

    if (event.key === "Enter") {
        event.preventDefault();
        fn_LoadAllFunctions();
    }
});

$('#Project_No').on("click", function (event) {
    $('#Project_No').select();

});


function fn_LoadAllFunctions() {
    fn_Load_Grid_With_Tasks();
    fn_Load_Summary_Projects_Grid();
    fn_Load_Project_Document_expiry();
    fn_Load_Total_Projects_Grid();


    $('#Project_No').select();
    $('.showDiv').show();
}


//-------------   by |\/|ati

function fnPickers() {
    // Days Picker
    $("#NewOldProjectsPicker").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "-", value: "" },
            { text: "New", value: "New" },
            { text: "Old", value: "Old" },

        ]
    });
    // Days Picker
    $("#dayPicker").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "-", value: "" },
            { text: "Sunday", value: "Sunday" },
            { text: "Monday", value: "Monday" },
            { text: "Tuesday", value: "Tuesday" },
            { text: "Wednesday", value: "Wednesday" },
            { text: "Thursday", value: "Thursday" },
            { text: "Friday", value: "Friday" },
            { text: "Saturday", value: "Saturday" }
        ]
    });

    // Week Picker
    $("#weekPicker").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "-", value: "" },
            { text: "1st week", value: "1" },
            { text: "2nd week", value: "2" },
            { text: "3rd week", value: "3" },
            { text: "4th week", value: "4" }
            // Add more options as needed
        ]
    });

    // Month Picker
    $("#monthPicker").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "-", value: "" },
            { text: "January", value: "1" },
            { text: "February", value: "2" },
            { text: "March", value: "3" },
            { text: "April", value: "4" },
            { text: "May", value: "5" },
            { text: "June", value: "6" },
            { text: "July", value: "7" },
            { text: "August", value: "8" },
            { text: "September", value: "9" },
            { text: "October", value: "10" },
            { text: "November", value: "11" },
            { text: "December", value: "12" }
        ]
    });

    // Year Picker
    $("#yearPicker").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: (function () {
            var currentYear = 2023// new Date().getFullYear();

            var years = [];
           
            for (var i = currentYear; i <= 2050; i++) {
                years.push({ text: i.toString(), value: i });
            }
            return years;
        })()
    });
}
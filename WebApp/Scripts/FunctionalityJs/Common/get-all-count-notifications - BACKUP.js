var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
var allNotificationCount = 0;



$(function () {
    fnLoadAllCountNotification();

});


function fnLoadAllCountNotification() {

    //values - are key value pair json object
    ajaxRequest({
        //  commandName: 'HR_Employee_PersonalDocument_GetNearToExpire',
        commandName: 'Get_All_Count_Notifications',
        values:
        {
            Id: $('#Id').val(),
            LoggedInEmployeeId: loggedInUserDetail.employeeId,
            LoggedInUserDepartmentId: loggedInUserDetail.departmentId,
            LoggedInUserId: loggedInUserDetail.id,
            LoggedInUserRoleId: loggedInUserDetail.roleId,
            Language: _currentLanguage,
        }, CallBack: fnLoadAllCountNotificationCallBack
    });
}
var internalLetterInbox = 0, employeesOfficialLetter = 0, employeesRequestAnnualLeave = 0, employeesRequestPermissionLeave = 0, employeesRequestLeaveCancellation = 0;
var fnLoadAllCountNotificationCallBack = function (inputDataJSONs) {


    if (JSON.parse(inputDataJSONs.Value).length > 0) {
        var countData = JSON.parse(inputDataJSONs.Value);


        internalLetterInbox = countData[0].internalLetterInbox;
        employeesOfficialLetter = countData[0].employeesOfficialLetter;
        employeesRequestAnnualLeave = countData[0].employeesRequestAnnualLeave;
        employeesRequestPermissionLeave = countData[0].EmployeesRequestPermissionLeave;
        employeesRequestLeaveCancellation = countData[0].employeesRequestLeaveCancellation;

        localStorage.setItem('MenusCount', inputDataJSONs.Value);

        setTimeout(function () {


            if (internalLetterInbox > 0) {
                //------------------------   INTERNAL LETTER GROUP MENU-----------------------------------
                $('.nav-item .Received').parent().parent().find('span').parent().find('span.menuGroupCountBadge').show();
                $('.nav-item .Received').parent().parent().find('span').parent().find('span.menuGroupCountBadge').text(internalLetterInbox);
                //------------------------   INTERNAL LETTER SUB MENU-----------------------------------
                $('.nav-item .Received >a >span').show();
                $('.nav-item .Received >a >span').text(internalLetterInbox);

            } else {
                //------------------------   INTERNAL LETTER GROUP MENU-----------------------------------
                $('.nav-item .Received').parent().parent().find('span').parent().find('span.menuGroupCountBadge').hide();
                $('.nav-item .Received').parent().parent().find('span').parent().find('span.menuGroupCountBadge').text(0);
                //------------------------   INTERNAL LETTER SUB MENU-----------------------------------
                $('.nav-item .Received >a >span').text(0);
                $('.nav-item .Received >a >span').hide();

                //------------------------   INTERNAL LETTER  END -----------------------------------
            }
            /* THIS CODE IS WORKING BUT JUST REPEATITION ISSUE WILL SEE LATER .
            //------------------------   EMPLOYEES REQUEST  START -----------------------------------
            if (employeesOfficialLetter > 0) {

                var checkMenuName = $('.nav-item .Official.Letter ').parent().parent().attr('data-id');
                //    if ($('.nav-item .Official.Letter ').parent().parent().attr('data-id')=="")

                // $("ul").find("li[data-id='Received Letters']").text(employeesOfficialLetter) 
                //------------------------   INTERNAL LETTER GROUP MENU-----------------------------------



                $("ul").find("li[data-id='Official Letter']").parent().parent().find('span').parent().find('span.menuGroupCountBadge').text('*');
                $("ul").find("li[data-id='Official Letter']").parent().parent().find('span').parent().find('span.menuGroupCountBadge').show();

                //$('.nav-item .Official.Letter ').parent().parent().find('span').parent().find('span.menuGroupCountBadge').show();
                //$('.nav-item .Official.Letter ').parent().parent().find('span').parent().find('span.menuGroupCountBadge').text(employeesOfficialLetter);
                //------------------------   INTERNAL LETTER SUB MENU-----------------------------------

                $("ul").find("li[data-id='Official Letter']").find('span').show();
                $("ul").find("li[data-id='Official Letter']").find('span').text(employeesOfficialLetter)

                //$('.nav-item .Official  >a >span').show();
                //$('.nav-item .Official  >a >span').text(employeesOfficialLetter);

            } else {
                //------------------------   INTERNAL LETTER GROUP MENU-----------------------------------
                $("ul").find("li[data-id='Official Letter']").parent().parent().find('span').parent().find('span.menuGroupCountBadge').text(0);
                $("ul").find("li[data-id='Official Letter']").parent().parent().find('span').parent().find('span.menuGroupCountBadge').hide();


                //  $('.nav-item .Official ').parent().parent().find('span').parent().find('span.menuGroupCountBadge').hide();
                //  $('.nav-item .Official ').parent().parent().find('span').parent().find('span.menuGroupCountBadge').text(0);
                //------------------------   INTERNAL LETTER SUB MENU-----------------------------------
                $("ul").find("li[data-id='Official Letter']").find('span').hide();
                $("ul").find("li[data-id='Official Letter']").find('span').text(0);
                //$('.nav-item .Official  >a >span').text(0);
                //$('.nav-item .Official  >a >span').hide();

            }


            if (employeesRequestAnnualLeave > 0) {

                //  var checkMenuName = $('.nav-item .Annual.Leave ').parent().parent().attr('data-id');



                //------------------------   INTERNAL LETTER GROUP MENU-----------------------------------

                $("ul").find("li[data-id='Annual Leave']").parent().parent().find('span').parent().find('span.menuGroupCountBadge').text('*');
                // $("ul").find("li[data-id='Annual Leave']").parent().parent().find('span').parent().find('span.menuGroupCountBadge').show();

                //------------------------   INTERNAL LETTER SUB MENU-----------------------------------

                $("ul").find("li[data-id='Annual Leave']").find('span').show();
                $("ul").find("li[data-id='Annual Leave']").find('span').text(employeesRequestAnnualLeave)

                //$('.nav-item .Official  >a >span').show();
                //$('.nav-item .Official  >a >span').text(employeesRequestAnnualLeave);

            } else {
                //------------------------   INTERNAL LETTER GROUP MENU-----------------------------------
                $("ul").find("li[data-id='Annual Leave']").parent().parent().find('span').parent().find('span.menuGroupCountBadge').text(0);
                $("ul").find("li[data-id='Annual Leave']").parent().parent().find('span').parent().find('span.menuGroupCountBadge').hide();


                //  $('.nav-item .Official ').parent().parent().find('span').parent().find('span.menuGroupCountBadge').hide();
                //  $('.nav-item .Official ').parent().parent().find('span').parent().find('span.menuGroupCountBadge').text(0);
                //------------------------   INTERNAL LETTER SUB MENU-----------------------------------
                $("ul").find("li[data-id='Annual Leave']").find('span').hide();
                $("ul").find("li[data-id='Annual Leave']").find('span').text(0);
                //$('.nav-item .Official  >a >span').text(0);
                //$('.nav-item .Official  >a >span').hide();

                //------------------------   EMPLOYEES REQUEST  END -----------------------------------
            }

            */




             

        }, 50);

    }



}

var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
var allNotificationCount = 0;



$(function () {


    fnLoadAllCountNotification();

    setInterval(function () {

        fnLoadAllCountNotification();
    }, 120000); //120 seconds



});

var ajaxRequest_OnlyForNotifications = function (options) {

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
                options.CallBack(data, options.controlId);
            }
        },

    });
}

function fnLoadAllCountNotification() {
     
    //values - are key value pair json object
    ajaxRequest_OnlyForNotifications({
        commandName: 'Get_All_Count_Notifications',
        values:
        {
            Id: $('#Id').val(),
            LoggedInEmployeeId: loggedInUserDetail.employeeId,
            LoggedInUserDepartmentId: loggedInUserDetail.departmentId,
            LoggedInUserId: loggedInUserDetail.id,
            LoggedInUserRoleId: loggedInUserDetail.roleId,
            MainApplicationModule_Id: localStorage.MainApplicationModule_Id != undefined ? localStorage.MainApplicationModule_Id : 1,
            Language: _currentLanguage,
        }, CallBack: fnLoadAllCountNotificationCallBack
    });

}
var fnLoadAllCountNotificationCallBack = function (inputDataJSONs) {


    if (JSON.parse(inputDataJSONs.Value).length > 0) {
        var countData = JSON.parse(inputDataJSONs.Value);



        localStorage.setItem('MenusCount', inputDataJSONs.Value);

        setTimeout(function () {


            var countData = JSON.parse(inputDataJSONs.Value);
            var menusName = JSON.parse(localStorage.getItem('Menus'));


            //  var keys = Object.keys(countData[0]);
            var keysValues = Object.values(countData[0]);




            for (var x = 0; x < keysValues.length; x++) {
                for (var i = 0; i < menusName.length; i++) {


                    var checkMenuId = parseInt(keysValues[x].split(',')[1]);
                    var checkMenuCount = parseInt(keysValues[x].split(',')[0]);

                    if (menusName[i].menuId == checkMenuId) {

                        if (checkMenuCount > 0) {
                            //---------- SHOW MENU GROUP ......
                            $("#" + checkMenuId).parent().parent().parent().parent().find('span.menuGroupCountBadge').text('*')
                            $("#" + checkMenuId).parent().parent().parent().parent().find('span.menuGroupCountBadge').show();


                            //---------- SHOW SINGLE MENU ......
                            $("#" + checkMenuId).show();
                            $("#" + checkMenuId).text(checkMenuCount);
                        } else {


                            //---------- HIDE MENU GROUP ......
                            // $("#" + checkMenuId).parent().parent().parent().parent().find('span.menuGroupCountBadge').hide();
                            // $("#" + checkMenuId).parent().parent().parent().parent().find('span.menuGroupCountBadge').text('')
                            //---------- HIDE SINGLE MENU ......
                            $("#" + checkMenuId).hide();
                            $("#" + checkMenuId).text(0);
                        }

                    }

                }


            }



        }, 50);

    }



}

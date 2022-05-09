$(document).ready(function () {


    $("#Language").val(_currentLanguage);

});



//function loadClientDDL(ddlName) {

//    ajaxRequest({ commandName: 'DDL_ProjectCategoryType_In_Setup_TypeDetail_Get', values: { Language: _currentLanguage }, CallBack: loadClientDDLCallBack });
//}

//var loadClientDDLCallBack = function (response, ddlName) {

//    $("#" + ddlName).kendoDropDownList({
//        dataTextField: "name",
//        dataValueField: "id",
//        filter: "contains",
//        value: -1,
//        //    dataSource: _currentLanguage == 'en-US' ? JSON.parse(localStorage.getItem('CityListEng')) : fnRemoveSelectInArabic(JSON.parse(localStorage.getItem('CityListArb'))),
//        dataSource: JSON.parse(response.Value),
//        //change: function (e) {
//        //    var selected_Id = this.value();
//        //    $('#').val(selected_Id);

//        //},
//    });
//}

//function loadProjectCategoryTypeDDL(ddlName) {


//    ajaxRequest({ commandName: 'DDL_ProjectCategoryType_In_Setup_TypeDetail_Get', values: { Language: _currentLanguage }, CallBack: loadloadProjectCategoryTypeDDLCallBack, ddlName });
    
//}
//var loadloadProjectCategoryTypeDDLCallBack = function (response, ddlName) {
     
//    var checkName = sessionStorage.setItem(ddlName, ddlName);
//    $("#" + sessionStorage.getItem(ddlName)).kendoDropDownList({
//        dataTextField: "name",
//        dataValueField: "id",
//        filter: "contains",
//        value: -1,
//        //    dataSource: _currentLanguage == 'en-US' ? JSON.parse(localStorage.getItem('CityListEng')) : fnRemoveSelectInArabic(JSON.parse(localStorage.getItem('CityListArb'))),
//        dataSource: JSON.parse(response.Value),
//    });
//    window.sessionStorage.removeItem(ddlName);

//}
 
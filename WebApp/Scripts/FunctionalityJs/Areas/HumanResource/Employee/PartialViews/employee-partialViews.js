var departmentDefaultId = 0;

$(function () {
    $('#Language').val(_currentLanguage);

    //renderKendoDatePicker('ReleaseDate', 'dd-MM-yyyy');
    //renderKendoDatePicker('ExpiryDate', 'dd-MM-yyyy');
    //renderKendoDatePicker('VisaReleaseDate', 'dd-MM-yyyy');
    //renderKendoDatePicker('VisaExpiryDate', 'dd-MM-yyyy');
    //renderKendoDatePicker('MunicipalityCardReleaseDate', 'dd-MM-yyyy');
    //renderKendoDatePicker('MunicipalityCardExpirtDate', 'dd-MM-yyyy');

    //loadDepartmentTreeDropdownList();
    //Load DDLS from Local Storage
    //LoadDDLSFromLocalStorage('ProfessionId', window.localStorage.getItem('ProfessionList'));
    //LoadDDLSFromLocalStorage('NationalityId', window.localStorage.getItem('NationalityList'));
    //LoadDDLSFromLocalStorage('VisaSponsorshipId', window.localStorage.getItem('SponsorshipList'));
    //LoadDDLSFromLocalStorage('ContractTypeId', window.localStorage.getItem('ContractTypeList'));
    ////LoadDDLSFromLocalStorage('ContractTypeId', window.localStorage.getItem('UserManagementRoleList'));
    //LoadDDLSFromLocalStorage('EmiratesStateId', window.localStorage.getItem('EmiratesStatesList'));


    //$("#ProfessionId").kendoDropDownList({
    //    dataTextField: "name",
    //    dataValueField: "id",
    //    filter: "contains",
    //    dataSource: JSON.parse(localStorage.getItem('ProfessionList')),
    //});
    //$("#NationalityId").kendoDropDownList({
    //    dataTextField: "name",
    //    dataValueField: "id",
    //    filter: "contains",
    //    dataSource: JSON.parse(localStorage.getItem('NationalityList')),
    //});
    //$("#VisaSponsorshipId").kendoDropDownList({
    //    dataTextField: "name",
    //    dataValueField: "id",
    //    filter: "contains",
    //    index: -1,
    //    dataSource: JSON.parse(localStorage.getItem('SponsorshipList')),
    //});
    //$("#ContractTypeId").kendoDropDownList({
    //    dataTextField: "name",
    //    dataValueField: "id",
    //    filter: "contains",
    //    dataSource: JSON.parse(localStorage.getItem('ContractTypeList')),
    //});

    //$("#EmiratesStateId").kendoDropDownList({
    //    dataTextField: "name",
    //    dataValueField: "id",
    //    filter: "contains",

    //    dataSource: JSON.parse(localStorage.getItem('EmiratesStatesList')),
    //});



    //Comment the request for better performance

    //loadDepartmentTreeDropdownList();
    //loadProfessionDropdownList(isBindChangeEvent = true);
    ////loadDepartmentDropdownList(isBindChangeEvent = true);
    //loadNationalityDropdownList(isBindChangeEvent = true);
    //loadSponsorShipDropdownList(isBindChangeEvent = true);
    ////loadContractTypeDropdownList(isBindChangeEvent = true);
    //loadRoleDropdownList(isBindChangeEvent = true);
    //loadEmiratesStatesDropdownList(false);
    lodEmployeeById();
    /*
      var combobox = $("#" + controlId).data("kendoDropDownList");
    if (combobox != undefined) {
        debugger;
        combobox.destroy();
    }
     */



});

function LoadDDLSFromLocalStorage(ControlID, dSource) {

    //$("#" + ControlID).kendoDropDownList({
    //    dataSource: ["Apples", "Oranges"]
    //});
    //var dataSource = new kendo.data.DataSource({
    //    data: ["Bananas", "Cherries"]
    //});
    //var dropdownlist = $("#" + ControlID).data("kendoDropDownList");
    //dropdownlist.setDataSource(dataSource);

    var ItemList = [];
    ItemList.push({ text: '-- Select --', value: '-1' });

    for (var i = 0; i < JSON.parse(dSource).length; i++) {
        var option = { text: JSON.parse(dSource)[i].name, value: JSON.parse(dSource)[i].id };
        ItemList.push(option);
    }

    var combobox = $("#" + ControlID).data("kendoDropDownList");
    if (combobox != undefined) {
        combobox.destroy();
    }
    $("#" + ControlID).kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        dataSource: ItemList,
        //index: selectedIndex,
        //change: onChange
    });
    //var dropdownlist = $("#ContractTypeId").data("kendoDropDownList");
    //dropdownlist.select(2005);
}


function lodEmployeeById() {
    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {
        $('#EmployeeId').val(id);
        $('#PersonalDocumentEmployeeId').val(id);
        $('#EducationalDocumentEmployeeId').val(id);
        ajaxRequest({ commandName: 'HR_Employee_GetById', values: { Language: _currentLanguage, id: id }, CallBack: loadClientDataByID });
    }
}
function loadClientDataByID(d) {

    setResponseToFormInputs(d);
    var profession = $("#ProfessionId").data("kendoDropDownList");
    profession.value(JSON.parse(d.Value).professionId);

    var Nationality = $("#NationalityId").data("kendoDropDownList");
    Nationality.value(JSON.parse(d.Value).nationalityId);

    var visaSponsorshiop = $("#VisaSponsorshipId").data("kendoDropDownList");
    visaSponsorshiop.value(JSON.parse(d.Value).visaSponsorshipId);

    var contractType = $("#ContractTypeId").data("kendoDropDownList");
    contractType.value(JSON.parse(d.Value).contractTypeId);

    var emilatesState = $("#EmiratesStateId").data("kendoDropDownList");
    emilatesState.value(JSON.parse(d.Value).emiratesStateId);

    console.log(JSON.parse(d.Value));
    departmentDefaultId = JSON.parse(d.Value).departmentId;
    //ajaxRequest({ commandName: 'HR_Department_Dropdown_GetAll', values: { Language: 'English', }, CallBack: loadTreeDropdownListCallBack });
    ajaxRequest({ commandName: 'HR_Department_Dropdown_GetAll', values: { Language: _currentLanguage, }, CallBack: loadTreeDropdownListEdit });


    //setTimeout(function () {
    //    var dropdowntree = $("#DepartmentId").data("kendoDropDownTree");
    //    dropdowntree.value(JSON.parse(d.Value).departmentId);
    //}, 1000);



    // $("#NationalityId").kendoDropDownList({
    //     dataTextField: "text",
    //     dataValueField: "value",
    //     filter: "contains",
    //     dataSource: JSON.parse(JSON.parse(localStorage.getItem('nationalityDDL'))),
    //     //  index: localStorage.getItem('nationalityDDL'),
    //     //change: onChange
    // });




    //$professionId = JSON.parse(d.Value).professionId;
    //$departmentId = JSON.parse(d.Value).departmentId;
    //$visaSposershipId = JSON.parse(d.Value).visaSponsorshipId;
    //$contractTypeId = JSON.parse(d.Value).contractTypeId;
    //$nationalityId = JSON.parse(d.Value).nationalityId;
    //$roleId = JSON.parse(d.Value).roleId;
    //$('#Id').val(JSON.parse(d.Value).id);
    //$('#Name').val(JSON.parse(d.Value).name);
    //$('#PhoneNumber').val(JSON.parse(d.Value).phoneNumber);
    //$('#Email').val(JSON.parse(d.Value).email);
    //$('#JoinDate').val(formatDate(JSON.parse(d.Value).joinDate));
    //$('#Salary').val(JSON.parse(d.Value).salary);
    //$('#SocialStatus').val(JSON.parse(d.Value).socialStatus);
    //$('#EIDNumber').val(JSON.parse(d.Value).eidNumber);
    //$('#PassportNumber').val(JSON.parse(d.Value).passportNumber);
    //$('#ReleaseDate').val(formatDate(JSON.parse(d.Value).releaseDate));
    //$('#ExpiryDate').val(formatDate(JSON.parse(d.Value).expiryDate));
    //$('#VisaExpiryDate').val(formatDate(JSON.parse(d.Value).visaExpiryDate));
    //$('#OtherStatus').val(JSON.parse(d.Value).otherStatus);
    //$('#EmiratesOfResidencyEng').val(JSON.parse(d.Value).emiratesOfResidencyEng);
    //$('#EmiratesOfResidencyArb').val(JSON.parse(d.Value).emiratesOfResidencyArb);
    //$('#MunicipalityCardNumber').val(JSON.parse(d.Value).municipalityCardNumber);
    //$('#MunicipalityCardReleaseDate').val(formatDate(JSON.parse(d.Value).municipalityCardReleaseDate));
    //$('#MunicipalityCardExpirtDate').val(formatDate(JSON.parse(d.Value).municipalityCardExpirtDate));


    //loadDepartmentDropdownList(isBindChangeEvent = false);
    //loadNationalityDropdownList(isBindChangeEvent = false);
    //loadSponsorShipDropdownList(isBindChangeEvent = false);
    //loadContractTypeDropdownList(isBindChangeEvent = false);
    //loadRoleDropdownList(isBindChangeEvent = false)
}
function loadTreeDropdownListEdit(d) {    
    var _data = treeFomatter(JSON.parse(d.Value), 0);
    $("#DepartmentId").kendoDropDownTree({
        tagMode: 'single',
        height: 'auto',
        dataSource: _data
    });
    var department = $("#DepartmentId").data("kendoDropDownTree");
    department.value(departmentDefaultId);
}
function loadNationalityDropdownList(isBindChangeEvent = true) {


    if ($('#Language').val() == 'en-US') {
        loadKendoDropdownList('NationalityId', 'Id [Value], NameEng [Text]', 'HR_Nationality', 'NameEng IS NOT NULL', 0, 'menuDropdownListOnChange');
    }
    else {
        loadKendoDropdownList('NationalityId', 'Id [Value], NameArb [Text]', 'HR_Nationality', 'NameArb IS NOT NULL', null, 'menuDropdownListOnChange');
    }
    setTimeout(function () {
        if (isBindChangeEvent) {
            // $("#NationalityId").data("kendoDropDownList").bind("change", roleDropdownListOnChange);
        }
    }, 1500);



}
function loadEmiratesStatesDropdownList(isBindChangeEvent = true) {
    if ($('#Language').val() == 'en-US') {
        loadKendoDropdownList('EmiratesStateId', 'Id [Value], NameEng [Text]', 'HR_EmiratesStates', 'NameEng IS NOT NULL', 0, 'menuDropdownListOnChange');
    }
    else {
        loadKendoDropdownList('EmiratesStateId', 'Id [Value], NameArb [Text]', 'HR_EmiratesStates', 'NameArb IS NOT NULL', null, 'menuDropdownListOnChange');
    }
    setTimeout(function () {
        if (isBindChangeEvent) {
            // $("#NationalityId").data("kendoDropDownList").bind("change", roleDropdownListOnChange);
        }
    }, 1500);
}
function loadSponsorShipDropdownList(isBindChangeEvent = true) {
    if ($('#Language').val() == 'en-US') {
        loadKendoDropdownList('VisaSponsorshipId', 'Id [Value], NameEng [Text]', 'HR_VisaSponsorship', 'NameEng IS NOT NULL', 0, 'menuDropdownListOnChange');
    }
    else {
        loadKendoDropdownList('VisaSponsorshipId', 'Id [Value], NameArb [Text]', 'HR_VisaSponsorship', 'NameArb IS NOT NULL', null, 'menuDropdownListOnChange');
    }
    setTimeout(function () {
        if (isBindChangeEvent) {
            //  $("#VisaSposershipId").data("kendoDropDownList").bind("change", roleDropdownListOnChange);
        }
    }, 1500);
}


function loadContractTypeDropdownList(isBindChangeEvent = true) {
    if ($('#Language').val() == 'en-US') {
        loadKendoDropdownList('ContractTypeId', 'Id [Value], NameEng [Text]', 'HR_ContractType', 'NameEng IS NOT NULL', 0, 'menuDropdownListOnChange');
    }
    else {
        loadKendoDropdownList('ContractTypeId', 'Id [Value], NameArb [Text]', 'HR_ContractType', 'NameArb IS NOT NULL', 0, 'menuDropdownListOnChange');
    }
    setTimeout(function () {
        if (isBindChangeEvent) {
            // $("#ContractTypeId").data("kendoDropDownList").bind("change", roleDropdownListOnChange);
        }
    }, 1500);
}





function loadRoleDropdownList(isBindChangeEvent = true) {
    if ($('#Language').val() == 'en-US') {
        loadKendoDropdownList('RoleId', 'Id [Value], NameEng [Text]', 'UserManagement_Role', 'NameEng IS NOT NULL', 0, 'menuDropdownListOnChange');
    }
    else {
        loadKendoDropdownList('RoleId', 'Id [Value], NameArb [Text]', 'UserManagement_Role', 'NameArb IS NOT NULL', 0, 'menuDropdownListOnChange');
    }
    setTimeout(function () {
        if (isBindChangeEvent) {
            // $("#RoleId").data("kendoDropDownList").bind("change", roleDropdownListOnChange);
        }
    }, 1500);
}
function loadProfessionDropdownList(isBindChangeEvent = true) {
    if ($('#Language').val() == 'en-US') {
        loadKendoDropdownList('ProfessionId', 'Id [Value], NameEng [Text]', 'HR_Profession', 'NameEng IS NOT NULL', 0, 'menuDropdownListOnChange');
    }
    else {
        loadKendoDropdownList('ProfessionId', 'Id [Value], NameArb [Text]', 'HR_Profession', 'NameArb IS NOT NULL', null, 'menuDropdownListOnChange');
    }
    setTimeout(function () {
        if (isBindChangeEvent) {
            // $("#ProfessionId").data("kendoDropDownList").bind("change", roleDropdownListOnChange);
        }
    }, 1500);
}
//1.   Создавать модели могут все.Изменять поля в объекте Модель может только
//администратор. 
function GetRole() {
    var role = XrmServiceToolkit.Soap.GetCurrentUserRoles();
    console.log(role);
    return role;
}

function OnLoad() {

    var type = Xrm.Page.ui.getFormType();
    if (type== FormType.Create) {
        var role = GetRole();
        role.forEach(function (item) {
            if (item != 'System Administrator') {
                var mainTabID = "{2c93f6f9-522b-42dd-94b3-c31b0d22ae85}";
                var mainTab = Xrm.Page.ui.tabs.get(mainTabID);
                DisableControlsFromTab(mainTab);
            }
            else {
                console.log("You are System Administrator");
            }
        });
    }
}

function DisableControlsFromTab(tab) {
    tab.sections.forEach(function (section) {
        section.controls.forEach(function (control) {
            if (control.getControlType() != "subgrid" && control.getControlType() != "iframe" && control.getControlType() != "webresource" &&
                control.getControlType() != "notes") {
                control.setDisabled(true);
            }
        });
    });

}
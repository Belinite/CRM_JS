var FormType = {
    Undefined: 0,
    Create: 1,
    Update: 2,
    ReadOnly: 3,
    Disabled: 4,
    BulkEdit: 6
}

function DisableTab() {
    var mainTabID = "{53b40798-e561-40d3-81b5-a6017e41ace2}";
    var mainTab = Xrm.Page.ui.tabs.get(mainTabID);
    var tabId = "CreditTab";
    var tab = Xrm.Page.ui.tabs.get(tabId);
    DisableControlsFromTab(tab);
    DisableControlsFromTab(mainTab);


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


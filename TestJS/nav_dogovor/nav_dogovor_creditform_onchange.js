//3.  После выбора кредитной программы на объекте договор, становятся доступными для
//редактирования поля, связанные с расчетом кредита.
var CreditProgram = new function () {
    var pthis = this;
    var onChange = function () {
        var creditidAttribute = Xrm.Page.getAttribute("nav_creditid");
        creditidAttribute.addOnChange(function () {
            if (creditidAttribute != null) {
                var creditidValue = creditidAttribute.getValue();
                if (creditidValue != null) {
                    var creditperiodControl = Xrm.Page.getControl("nav_creditperiod");
                    if (creditperiodControl != null) {
                        creditperiodControl.setDisabled(false);
                    }
                    else {
                        alert("Error. nav_creditperiod doesn't exist");
                    }
                    var creditsummaControl = Xrm.Page.getControl("nav_creditsumma");
                    if (creditsummaControl != null) {
                        creditsummaControl.setDisabled(false);
                    }
                    else {
                        alert("Error. nav_creditsumma doesn't exist");
                    }
                    var factsummaControl = Xrm.Page.getControl("nav_factsumma");
                    if (factsummaControl != null) {
                        factsummaControl.setDisabled(false);
                    }
                    else {

                        alert("Error. nav_factsumma doesn't exist");
                    }
                    var firstsummaControl = Xrm.Page.getControl("nav_firstsumma");
                    if (firstsummaControl != null) {
                        firstsummaControl.setDisabled(false);
                    }
                    else {
                        alert("Error. nav_firstsumma doesn't exist");
                    }
                }
                else {
                    alert("Error. nav_creditid is empty");
                }
            }
            else {
                alert("Error. nav_creditid doesn't exist");
            }
        });
    };
    pthis.OnChange = onChange;

    return pthis;
}();



//2.  После выбора кредитной программы, проверять ее срок действия, если срок истек 
//показывать пользователю сообщение, поле кредитная программа должно очищаться. 
var CheckDate = new function () {
    var pthis = this;
    var onChange = function () {
        var creditidAttr = Xrm.Page.getAttribute("nav_creditid");
        creditidAttr.addOnChange(function () {
            if (creditidAttr != null) {
                var id;
                id = creditidAttr.getValue()[0].id;

                id = id.replace("{", "");
                id = id.replace("}", "");
            }
            var currentdate = new Date();
            var datetime = currentdate.getFullYear() + "/" + currentdate.getMonth()
                + "/" + currentdate.getDay();

            var fetchXml =
                '<fetch top="50">' +
                    '<entity name="nav_credit">' +
                        '<attribute name="nav_dateend"/>' +
                        '<filter>' +
                            '<condition attribute="nav_creditid" operator="eq" value="' + id + '" />' +
                            '<condition attribute="nav_dateend" operator="on-or-after" value="' + datetime + '"/>' +
                        '</filter>' +
                    '</entity>' +
                '</fetch>';
            var x = XrmServiceToolkit.Soap.Fetch(fetchXml);

            if (x.length != 0) {
                alert("Credit term is completed");
                creditidAttr.setValue("");
            }
            else {
                console.log("Credit term is not completed");
            }
        });
    };
    pthis.OnChange = onChange;

    return pthis;
}();
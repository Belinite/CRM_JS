//5.  При создании счета: при выборе объекта договор, если в договоре нет кредитной
//программы, то в поле[Cумма] подставлять сумму с объекта договора.

var CheckDogovorOnChange = new function () {
    var pthis = this;
    var onChange = function () {
        var dogovorAttribute = Xrm.Page.getAttribute("nav_dogovorid");
        dogovorAttribute.addOnChange(function () {
            var type = Xrm.Page.ui.getFormType();
            if (type == FormType.Create) {

                var id;
                if (dogovorAttribute != null) {
                    id = dogovorAttribute.getValue()[0].id;

                    id = id.replace("{", "");
                    id = id.replace("}", "");
                }
                Xrm.WebApi.retrieveRecord("nav_dogovor", id, "?$select=nav_creditid,nav_summa").then(
                    function success(result) {
                        if (result.nav_creditid == null) {
                            var summAttribute = Xrm.Page.getAttribute("nav_summa");
                            summAttribute.setValue(result.nav_summa);
                        }
                        else {
                            console.log("Credit program exists");
                        }
                    },
                    function (error) {
                        alert(error.message);
                    }
                );

            }
            else {
                console.log('It is not a creation');
            }
        });
    };
    pthis.OnChange = onChange;

    return pthis;
}();
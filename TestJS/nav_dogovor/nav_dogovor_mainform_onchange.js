//6.  В поле номер договора, по завершении ввода, оставлять только цифры и тире. 
var RemoveLetters = new function () {
        var pthis = this;
    var onChange = function () {
        var nameAttribute = Xrm.Page.getAttribute("nav_name");
        nameAttribute.addOnChange(function () {
            if (nameAttribute != null) {
                var nameValue = nameAttribute.getValue();
                if (nameValue != null) {
                    var newName = nameValue.replace(/[^-0-9]/gim, '');
                    nameAttribute.setValue(newName);
                }
                else {
                    alert("Error. nav_name is empty")
                }
            }
            else {
                alert("Error. nav_name doesn't exist");
            }
        });
    };
    pthis.OnChange = onChange;
    return pthis;
}();

   

//3.  При выборе модели, в объекте договор, стоимость должна подставляться
//автоматически. 
var Model = new function () {
    var pthis = this;
    var onChange = function () {
        var modelidAttr = Xrm.Page.getAttribute("nav_modelid");
        modelidAttr.addOnChange(function () {
            var id;
            if (modelidAttr != null) {
                id = modelidAttr.getValue()[0].id;

                id = id.replace("{", "");
                id = id.replace("}", "");
            }
            Xrm.WebApi.retrieveRecord("nav_model", id, "?$select=nav_summa").then(
                function success(result) {
                    console.log(result.nav_summa);
                    var summAttribute = Xrm.Page.getAttribute("nav_summa");
                    summAttribute.setValue(result.nav_summa);
                },
                function (error) {
                    alert(error.message);
                }
            );
        });
    };
    pthis.OnChange = onChange;

    return pthis;
}();


//2.  После выбора контакта и модели на объекте договор, становится доступной вкладка
//кредитная программа

var ShowTabOnChange = new function () {
    var pthis = this;
    var onChange = function () {
        var contactAttribute = Xrm.Page.getAttribute("nav_contact");
        contactAttribute.addOnChange(function () {
            var modelAttribute = Xrm.Page.getAttribute("nav_modelid");
            if (contactAttribute != null && modelAttribute != null) {
                var contactValue = contactAttribute.getValue();
                var modelValue = modelAttribute.getValue();
                if (contactValue != null && modelValue != null) {
                    var tabControl = Xrm.Page.ui.tabs.get("Credit");
                    if (tabControl != null) {
                        tabControl.setVisible(true);
                    }
                    else {
                        ("Error. tabControl doesn't exist")
                    }
                }
                else {
                    alert("Error. nav_contact or nav_modelid doesn't have value");
                }
            }
            else {
                alert("Error. nav_contact or nav_modelid doesn't exist");
            }
        });
    };
    pthis.OnChange = onChange;

    return pthis;
}();

var CheckMaxCreditSum = new function () {
    var pthis = this;
    var onChange = function () {
        var contactAttribute = Xrm.Page.getAttribute("nav_contact");
        contactAttribute.addOnChange(function () {
            var type = Xrm.Page.ui.getFormType();
            if (type == FormType.Create) {
                var summaAttribute = Xrm.Page.getAttribute("nav_summa");
                if (contactAttribute != null && summaAttribute != null) {
                    var summaValue = summaAttribute.getValue();
                    var id;
                    if (contactAttribute != null) {
                        id = contactAttribute.getValue()[0].id;

                        id = id.replace("{", "");
                        id = id.replace("}", "");
                    }
                    Xrm.WebApi.retrieveRecord("contact", id, "?$select=nav_maxcreditsize").then(
                        function success(result) {
                            if (result.nav_maxcreditsize != null) {
                                //var maxCreditAttribute = Xrm.Page.getAttribute("nav_maxcreditsize");
                                //var creditValue = maxCreditAttribute.getValue();
                                if (result.nav_maxcreditsize < summaValue) {
                                    alert("Max credit size less than a summ");
                                }
                                else {
                                    console.log("Макс Кредит" + creditValue + "Сумма" + summaValue);
                                }
                            }
                            else {
                                console.log("Max credit size is empty");
                            }
                        },
                        function (error) {
                            alert(error.message);
                        }
                    );
                }
            }
            else {
                console.log('It is not a creation');
            }
        });
    };
pthis.OnChange = onChange;

return pthis;
}();
 

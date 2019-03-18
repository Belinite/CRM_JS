//Сумма кредита = ([Кредитная Программа].[Ставка в месяц] * [Договор].[Срок кредита]  *([Модель].[Стоимость] – [Договор].[Первонач взнос]))/100
function DisplayButton() {
    var type = Xrm.Page.ui.getFormType();
    if (type == FormType.Create) {
            return false;
        }
        else {
            return true;
        }
}
function CalculateCredit() {

    var creditidAttr = Xrm.Page.getAttribute("nav_creditid");
    if (creditidAttr != null) {
        var id = creditidAttr.getValue()[0].id;

        id = id.replace("{", "");
        id = id.replace("}", "");
    }
    var creditAttribute = Xrm.Page.getAttribute("nav_creditsumma");
    Xrm.WebApi.retrieveRecord("nav_credit", id, "?$select=nav_percent").then(
        function success(result) {
            console.log(result.nav_percent);
            var percent = result.nav_percent;
            creditAttribute.setValue((period * percent * (summa - firstSumma)) / 100);
        },
        function (error) {
            alert(error.message);
        }
    );
    var periodAttribute = Xrm.Page.getAttribute("nav_creditperiod");
    if (periodAttribute != null) {
        var periodValue = periodAttribute.getValue();
        if (periodValue != null) {
            var period = periodValue;
        }
        else {
            alert("Doesn't have a value");
        }
    }
    else {
        alert("Credit period...")
    }
    var summaAttribute = Xrm.Page.getAttribute("nav_summa");
    if (summaAttribute != null) {
        var summaValue = summaAttribute.getValue();
        if (summaValue != null) {
            var summa = summaValue;
        }
        else {
            alert("Doesn't have a value");
        }
    }
    else {
        alert("FirstSumma...")
    }
    var firstAttribute = Xrm.Page.getAttribute("nav_firstsumma");
    if (firstAttribute != null) {
        var firstValue = firstAttribute.getValue();
        if (firstValue != null) {
            var firstSumma = firstValue;
        }
        else {
            alert("Doesn't have a value");
        }
    }
    else {
        alert("FirstSumma...")
    }
    console.log("period" + period);
    console.log("percent" + percent);
    console.log("summa" + summa);
    console.log("first" + firstSumma);
}
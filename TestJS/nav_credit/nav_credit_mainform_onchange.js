//5.  В кредитной программе проверять, чтобы дата окончания была больше даты начала,
//    не менее, чем на год. 
var DateCredit = new function () {
    var pthis = this;
    var onChange = function () {
        var endDateAttr = Xrm.Page.getAttribute("nav_dateend");
        var startDateAttr = Xrm.Page.getAttribute("nav_datestart");
        endDateAttr.addOnChange(function () {
            if (endDateAttr != null) {
                var endDate = endDateAttr.getValue();
            }
            else {
                alert("Error. nav_dateend doesn't exist");
            }

            if (startDateAttr != null) {
                var startDate = startDateAttr.getValue();
            }
            else {
                alert("Error. nav_datestart doesn't exist");
            }
            if (startDate != null && endDate != null) {
                var difference = endDate.getTime() - startDate.getTime();
                var days = Math.floor(difference / (1000 * 60 * 60 * 24));
                if (days < 365) {
                    endDateAttr.setValue("");
                    startDateAttr.setValue("");
                    alert("Error. The term is less than a year");
                }
                else {
                    console.log("Success");
                }
            }
        });
    };
    pthis.OnChange = onChange;

    return pthis;
}();


    

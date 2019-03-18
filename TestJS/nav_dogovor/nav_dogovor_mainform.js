function OnLoad() {
    CreditProgram.OnChange();
    RemoveLetters.OnChange();
    Model.OnChange();
    CheckDate.OnChange();
    ShowTabOnChange.OnChange();
    CheckMaxCreditSum.OnChange();
    

////1.  При создании договора, сразу после открытия карточки доступны для редактирования
////только номер, контакт и модель.Вкладка с данными по кредиту невидна
//    var type = Xrm.Page.ui.getFormType();
//    if (type != null) {
//        if (type == 1) {
//            var dateControl = Xrm.Page.getControl("nav_date");
//            if (dateControl != null) {
//                dateControl.setDisabled(true);
//            }
//            else {
//                alert("Error. nav_date doesn't exist");
//            }
//            var factControl = Xrm.Page.getControl("nav_fact");
//            if (factControl != null) {
//                factControl.setDisabled(true);
//            }
//            else {
//                alert("Error. nav_fact doesn't exist");
//            }
//            var summaControl = Xrm.Page.getControl("nav_summa");
//            if (summaControl != null) {
//                summaControl.setDisabled(true);
//            }
//            else {
//                alert("Error. nav_summa doesn't exist");
//            }
//            var creditperiodControl = Xrm.Page.getControl("nav_creditperiod");
//            if (creditperiodControl != null) {
//                creditperiodControl.setDisabled(true);
//            }
//            else {
//                alert("Error. nav_creditperiod doesn't exist");
//            }
//            var creditsummaControl = Xrm.Page.getControl("nav_creditsumma");
//            if (creditsummaControl != null) {
//                creditsummaControl.setDisabled(true);
//            }
//            else {
//                alert("Error. nav_creditsumma doesn't exist");
//            }
//            var firstsummaControl = Xrm.Page.getControl("nav_firstsumma");
//            if (firstsummaControl != null) {
//                firstsummaControl.setDisabled(true);
//            }
//            else {
//                alert("Error. nav_firstsumma doesn't exist");
//            }
//            var tabControl = Xrm.Page.ui.tabs.get("Credit");
//            console.log(tabControl);
//            if (tabControl != null) {
//                tabControl.setVisible(false);
//            }
//            else {
//                alert("Error. Credit doesn't exist");
//            }

//        }
//        else {
//            console.log("Договор не создается");
//        }
//    }
//    pthis.OnLoad = onLoad;

//    return pthis;
}





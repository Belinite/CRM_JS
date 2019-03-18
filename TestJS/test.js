function OnLoad() {
    alert("hello world");


    //Xrm.Page
    var nameArr = Xrm.Page.getAttribute("nav_name");

    if (nameArr != null) {

        var name = nameArr.getValue();

        console.log("old name is " + name);


        nameArr.setValue("new name");
    }
    else {
        console.log("error");
    }

    var volumeAttr = Xrm.Page.getAttribute("nav_volume");

    if (volumeAttr != null) {
        volumeAttr.addOnChange(function () {
            console.log("the field is changed. New value is " + volumeAttr.getValue());
        });
    }

    var nameControl = Xrm.Page.getControl("nav_name");
    if (nameControl != null) {
        var isnameVisible = nameControl.getVisible();
        console.log("control visibility state is " + isnameVisible);
        nameControl.setVisible(false);
    }
}


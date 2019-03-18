function GetData() { 
    var brandAttribute = window.parent.Xrm.Page.getAttribute("nav_name");
    if (brandAttribute != null) {
        var brand = brandAttribute.getValue();
    }
    var fetchXML =
        '<fetch top="50" >' +
            '<entity name="nav_model" >' +
                ' <attribute name="nav_name" />' +
                '<filter>' +
                    '<condition attribute="nav_brendidname" operator="eq" value="' + brand + '" />' +
                '</filter>' +
                '<link-entity name="nav_nav_credit_nav_model" from="nav_modelid" to="nav_modelid" link-type="inner" intersect="true" >' +
                    ' <link-entity name="nav_credit" from="nav_creditid" to="nav_creditid" link-type="inner" >' +
                        ' <attribute name="nav_name" />' +
                    '</link-entity>' +
                '</link-entity>' +
                '<link-entity name="nav_brend" from="nav_brendid" to="nav_brendid" link-type="inner" >' +
                    '<attribute name="nav_name" />' +
                '</link-entity>' +
            ' </entity>' +
        '</fetch>';
    var fetchData = XrmServiceToolkit.Soap.Fetch(fetchXML);
    var Data = [];
    console.log(fetchData.Count);
    console.log(fetchData.Length);
    console.log(fetchData);
    let count = 0;
    for (var item in fetchData) {
        count = count + 1;
        console.log(count);
    }
    for (var i = 0; i < count; i++) {

        Data.push({
            "Credit": fetchData[i].attributes["nav_credit2.nav_name"].value,
            "Brand": fetchData[i].attributes["nav_brend3.nav_name"].value,
            "Name": fetchData[i].attributes.nav_name.value,
        })
    }

    $("#jsGrid").jsGrid({
        width: "100%",
        height: "400px",

        data: Data,

        fields: [
            { name: "Credit", type: "text", width: 50 },
            { name: "Brand", type: "text", width: 50 },
            { name: "Name", type: "text", width: 50 }
        ]
    });
}

//отдельный метод LoadData для фетча
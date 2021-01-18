
let btn = document.getElementById("myForm");

btn.addEventListener('submit', function (event) {
    event.preventDefault();
    let area = document.getElementById("inputArea").value;
    let roomsNr = document.getElementById("inputRooms").value;
    let zipCode = document.getElementById("inputZip").value;
    document.getElementById("target").innerHTML = "loading...";

    let propertyType;
    let el = document.getElementsByName("gridRadios");
    for (let i = 0; i < el.length; i++) {
        if (el[i].checked) {
            propertyType = el[i].value
        }
    }


    let garden = document.getElementById("garden").checked;
    let kitchen = document.getElementById("kitchen").checked;
    let furnished = document.getElementById("furnished").checked;
    let terrace = document.getElementById("terrace").checked;
    let facades = document.getElementById("inputFacades").value;

    if (propertyType == undefined) {

        document.getElementById("errormsg").innerHTML = "please fill in all mandatory fields marked with an asterisk (*)";
        document.getElementById("target").innerHTML = '';
    } else {
        document.getElementById("errormsg").innerHTML = '';
    }

    // data to be sent to the POST request
    let _data = {};
    if (facades == "") {
        _data = {
            "area": parseInt(area),
            "property-type": propertyType,
            "rooms-number": parseInt(roomsNr),
            "zip-code": parseInt(zipCode),
            "garden": garden,
            "equipped-kitchen": kitchen,
            "furnished": furnished,
            "terrace": terrace
        }
    } else {
        _data = {
            "area": parseInt(area),
            "property-type": propertyType,
            "rooms-number": parseInt(roomsNr),
            "zip-code": parseInt(zipCode),
            "garden": garden,
            "equipped-kitchen": kitchen,
            "furnished": furnished,
            "terrace": terrace,
            "facades-number": parseInt(facades)
        }
    }

    const formatter = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = 'https://propertyprediction.herokuapp.com/predict';

    fetch(proxyurl + url, {
        method: "POST",
        body: JSON.stringify(_data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
        
    })
        .then(response => response.json())
        .then(json =>  document.getElementById("target").innerHTML = formatter.format(json["Predicted price"]));
});

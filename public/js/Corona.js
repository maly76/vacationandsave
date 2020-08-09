const fetch = require('node-fetch');

function loadcoronainfos(file, _country, table) {
    const infos = file.Countries.find(element => element.Country === _country);
    var today = new Date();
    var row = table.insertRow(1);
    var date = row.insertCell(0);
    var country = row.insertCell(1);
    var neuefaelle = row.insertCell(2);
    var gesamtefaelle = row.insertCell(3);
    var todesfaelle = row.insertCell(4);
    date.innerHTML = today.getDate() +"-"+ (today.getMonth()+1) + "-" + today.getFullYear()
    country.innerHTML = infos.Country;
    neuefaelle.innerHTML = infos.NewConfirmed;
    gesamtefaelle.innerHTML = infos.TotalConfirmed;
    todesfaelle.innerHTML = infos.TotalDeaths;
}

exports.sendCoronaAPI = function sendCoronaAPI(country, table) {
    fetch("https://api.covid19api.com/summary").then(function (response) {
        return response.json();
    }).then(function (obj) {
        loadcoronainfos(obj, country, table);
    }).catch(function (error) {
        console.log("Etwas ist schiefgelaufen bei Corona cases");
    });
}
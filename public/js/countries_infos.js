var currencyexchangerate = require('./Currency');
const fetch = require('node-fetch');

let countries = ["undefined"];
let currencies = ["undefined"];
const capitals = ["undefined"];
const languages = ["undefined"];
loadcountries();
function loadcountries() {
    fetch("https://restcountries.eu/rest/v2/all?fields=name;capital;languages;currencies").then(function (response) {
        return response.json();
    }).then(function (obj) {
        obj.map(function getinfos(ele) {
            countries.push(ele.name);
            currencies.push(ele.currencies[0].code);
        });
    });
}

function setinfos(country, capital, language, currency, table) {
    var row = table.insertRow(1);
    row.insertCell(0).innerHTML = country;
    row.insertCell(1).innerHTML = capital;
    row.insertCell(2).innerHTML = language;
    row.insertCell(3).innerHTML = currency;
    currencyexchangerate.findeWaehrungswert(currency, function (value) {
        row.insertCell(4).innerHTML = value;
    });
}

exports.setcountriesinfos = function setcountriesinfos(country, table) {
    fetch("https://restcountries.eu/rest/v2/all?fields=name;capital;languages;currencies").then(function (response) {
        return response.json();
    }).then(function (obj) {
        obj.map(function getinfos(ele) {
            capitals.push(ele.capital);
            languages.push(ele.languages[0].name);
        });
        const index = countries.indexOf(country);
        setinfos(countries[index], capitals[index], languages[index], currencies[index], table);
    });
}

exports.countries = function()
{
    loadcountries();
    return countries;
}

exports.currencies = function() {
    loadcountries();
    return currencies;
}
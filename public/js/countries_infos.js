function getcountriesinfos(country) {
    fetch("https://restcountries.eu/rest/v2/all?fields=name;capital;languages;currencies").then(function (response) {
        return response.json();
    }).then(function (obj) {
        const capitals = ["undefined"];
        const languages = ["undefined"];
        obj.map(function getinfos(ele) {
            capitals.push(ele.capital);
            languages.push(ele.languages[0].name);
        });
        const index = countries.indexOf(country);
        setinfos(countries[index], capitals[index], languages[index], currencies[index]);
    });
}

function setinfos(country, capital, language, currency) {
    const table = document.getElementById("countryinfos_table");
    const row = table.insertRow(1);
    row.insertCell(0).innerHTML = country;
    row.insertCell(1).innerHTML = capital;
    row.insertCell(2).innerHTML = language;
    row.insertCell(3).innerHTML = currency;
    findeWaehrungswert(currency, function (value) {
        row.insertCell(4).innerHTML = value;
    });
}
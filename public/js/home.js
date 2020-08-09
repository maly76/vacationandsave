function cleartable(table) {
    const count = table.rows.length-1;
    for (let i = count; i >= 1; i--)
        table.deleteRow(i);
}

function sendAPIs(country, city) {
    getcountriesinfos(country);
    if (city !== "")
        sendWeatherAPI(city);
    sendCoronaAPI(country);
}

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
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

function animatetitle() {
    var ueberschrift = document.getElementById("titel").innerText.split("");
    document.getElementById("titel").innerHTML = "";
    let colors = ["red", "blue", "brown"]
    let char = 0;
    let timer = setInterval(ontick, 150);

    //Beim Laden der Seite wird die Überschrift langsam Buchstabe für Buchstabe angezeigt
    function ontick()
    {
        //jede 150ms wird ein weiterer Buchstabe von der Überschrift angezeigt
        document.getElementById("titel").innerHTML += ueberschrift[char];
        //dabei wird auch die Farbe geändert
        document.getElementById("titel").style.color = colors[char];
        char++
        //wenn die Überschrift komplett da ist
        if (char === ueberschrift.length)
        {
            complete();
        }
    }
    function complete()
    {
        char = 0;
        ueberschrift = document.getElementById("titel").textContent.split("");
        clearInterval(timer);
        timer = setInterval(changecolor, 250);
    }

    //die Farbe der Überschrift jede 250ms ändern
    function changecolor()
    {
        document.getElementById("titel").style.color = colors[char%3];
        if (char === 10)
            char = 0
        char++;
    }
}
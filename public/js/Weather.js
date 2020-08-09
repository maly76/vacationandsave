function sendWeatherAPI(city) {
    fetch("http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=7e6d51ff596c8140a694ab4176efd5f0&units=metric").then(function (response) {
        return response.json();
    }).then(function (weather) {
        setzeInfosWeatherTable(weather);
    }).catch(function (error) {
        console.log("Etwas ist schiefgelaufen bei openweather");
    });
}

function setzeInfosWeatherTable(weather) {
    var table = document.getElementById("weather_table");
    var results = ["undefined"];
    weather.list.map(function getinfos(ele) {
        if (results[results.length - 1].split('_')[0] !== ele.dt_txt.split(' ')[0])
            results.push(ele.dt_txt.split(' ')[0] + "_" + weather.city.country + "_" + weather.city.name + "_" +
                ele.main.temp + "_" + ele.main.temp_max + "_" + ele.main.temp_min);
    });
    for (let i = results.length-1; i >= 1; i--)
    {
        var row = table.insertRow(1);
        var date = row.insertCell(0);
        var country = row.insertCell(1);
        var city = row.insertCell(2);
        var temp = row.insertCell(3);
        var max_temp = row.insertCell(4);
        var min_temp = row.insertCell(5);
        date.innerHTML = results[i].split('_')[0];
        country.innerHTML = results[i].split('_')[1];
        city.innerHTML = results[i].split('_')[2];
        temp.innerHTML = results[i].split('_')[3];
        max_temp.innerHTML = results[i].split('_')[4];
        min_temp.innerHTML = results[i].split('_')[5];
    }
}
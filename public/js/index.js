let countries = ["undefined"];
let currencies = ["undefined"];
let capitalofcountry;
const buttonhome = document.getElementById("btnsubmit_home");
const buttoncorona = document.getElementById("btnsubmit_corona");
const buttonweather = document.getElementById("btnsubmit_weather");
const buttonclearcorona = document.getElementById("cleartablecorona");
const buttonclearweather = document.getElementById("cleartableweather");

buttonhome.addEventListener("click", function () {
    const country = document.getElementById("countryinputhome");
    const city = document.getElementById("cityinputhome");
    sendAPIs(country.value, city.value);
    country.value = "";
    city.value = "";
});

buttoncorona.addEventListener("click", function () {
    const country = document.getElementById("countryinput");
    sendCoronaAPI(country.value);
    country.value = "";
});

buttonweather.addEventListener("click", function () {
    const city = document.getElementById("cityinput");
    sendWeatherAPI(city.value);
    city.value = "";
});

buttonclearcorona.addEventListener("click", function () {
    const table = document.getElementById("corona_table");
    cleartable(table);
});

buttonclearweather.addEventListener("click", function () {
    const table = document.getElementById("weather_table");
    cleartable(table);
});

loadcountries();
autocomplete(document.getElementById("countryinputhome"), countries);
autocomplete(document.getElementById("countryinput"), countries);

function cleartable(table) {
    const count = table.rows.length-1;
    for (let i = count; i >= 1; i--)
        table.deleteRow(i);
}

function sendAPIs(country, city) {
    getcountriesinfos(country);
    sendWeatherAPI(city);
    sendCoronaAPI(country);
}

function sendCoronaAPI(country) {
    if (countries.includes(country)) {
        fetch("https://api.covid19api.com/summary").then(function (response) {
            return response.json();
        }).then(function (obj) {
            loadcoronainfos(obj, country);
        }).catch(function (error) {
            console.log("Etwas ist schiefgelaufen bei Corona cases");
        });
    }
    else
        console.log("please check your input for country");
}

function sendWeatherAPI(city) {
    fetch("http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=7e6d51ff596c8140a694ab4176efd5f0&units=metric").then(function (response) {
        return response.json();
    }).then(function (weather) {
        setzeInfosWeatherTable(weather);
    }).catch(function (error) {
        console.log("Etwas ist schiefgelaufen bei openweather");
    });
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

function findeWaehrungswert(symbol, callback) {
    fetch("http://data.fixer.io/api/latest?access_key=231cf8ce5bb1ceeb65b72c883c99df95&format=1&symbols="+symbol+"").then(function (response) {
        return response.json();
    }).then(function (obj) {
        let value = JSON.stringify(obj.rates).split(':')[1].replace('}', '')
        callback(value);
    }).catch(function (error) {
        console.log("Etwas ist schiefgelaufen bei Währungsfinder");
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

function loadcoronainfos(file, c) {
    const infos = file.Countries.find(element => element.Country === c);
    var today = new Date();
    var table = document.getElementById("corona_table");
    var row = table.insertRow(1);
    var date = row.insertCell(0);
    var country = row.insertCell(1);
    var neuefaelle = row.insertCell(2);
    var gesamtefaelle = row.insertCell(3);
    var todesfaelle = row.insertCell(4);
    date.innerHTML = today.getDate() +"-"+ (today.getMonth()+1) + "-" + today.getFullYear();
    country.innerHTML = infos.Country;
    neuefaelle.innerHTML = infos.NewConfirmed;
    gesamtefaelle.innerHTML = infos.TotalConfirmed;
    todesfaelle.innerHTML = infos.TotalDeaths;
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
    document.getElementById('cityinput').value = ""
}

function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.style.width = document.querySelector('label').clientWidth+'px';
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode === 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode === 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode === 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt !== x[i] && elmnt !== inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}


let countries = ["undefined"];
let currencies = ["undefined"];
const buttonhome = document.getElementById("btnsubmit_home");
const buttoncorona = document.getElementById("btnsubmit_corona");
const buttonweather = document.getElementById("btnsubmit_weather");
const buttonclearcorona = document.getElementById("cleartablecorona");
const buttonclearweather = document.getElementById("cleartableweather");
const buttonclearhome = document.getElementById("cleartablehome");

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
    const table = document.getElementById("weather_table");
    cleartable(table);
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

buttonclearhome.addEventListener("click", function () {
    const  table = document.getElementById("countryinfos_table");
    cleartable(table);
})

loadcountries();
autocomplete(document.getElementById("countryinputhome"), countries);
autocomplete(document.getElementById("countryinput"), countries);












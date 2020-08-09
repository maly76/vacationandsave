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
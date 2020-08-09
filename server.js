const express = require('express');
const app = express();
const PORT = process.env.PORT || 1212;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html')
    //res.render('test.jade');
});
app.use(express.static(__dirname + '/public'));

app.listen(PORT, function () {
    console.log("app running at localhost:1212");
});


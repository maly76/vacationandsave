const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html')
    //res.render('test.jade');
});
app.use(express.static(__dirname + '/public'));

app.listen(1212);


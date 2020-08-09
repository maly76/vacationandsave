const express = require('express');
const app = express();
const PORT = process.env.PORT || 1212;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html')
});
app.use(express.static(__dirname + '/public'));

app.listen(PORT, function () {
    console.log("|-------------------------------------------------------|\n" +
                "|                                                       |\n" +
                "|             app running at localhost:1212             |\n" +
                "|                                                       |\n" +
                "|-------------------------------------------------------|\n");
});


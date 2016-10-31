var express = require('express'),
    app = express()
    aprori = require('./aprori');


app.use('/vendor', express.static(__dirname + "/bower_components/"))
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


app.post('/aprori', jsonParser, function(req, res){
    let op = aprori(req.body);
    res.send(op);
})

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.listen("7777", (function(){
        console.log("listning on port 7777")
    })
);
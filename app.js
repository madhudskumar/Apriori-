var express = require('express'),
    app = express();

app.use('/vendor', express.static(__dirname + "/bower_components/"))




app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.listen("7777", (function(){
        console.log("listning on port 7777")
    })
);
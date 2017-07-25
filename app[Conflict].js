var express = require('express');
var app = express();
var port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/public'));    // serving static assets
app.get('*',function(req,resp){
    res.sendfile('./public/index.html');   // load single file Angular manages everything else
}); 

app.listen(port,function(){
    console.log("listening on "+port);
})
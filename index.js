
var express = require('express');
var wagner = require('wagner-core');
var port = process.env.PORT || 8080;

require('./models')(wagner);

var app = express();

app.use('/api/', require('./api')(wagner));
app.use(express.static(__dirname + '/public'));
// app.get('/', function(req, res) {
//   res.sendfile('public/index.html');
// });

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

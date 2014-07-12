var express    = require('express'); 		
var app        = express(); 			

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080; 		// set our port
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'


var router = express.Router(); 				// get an instance of the express Router


//show the index.html on root
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});



//register the routers
app.use('/', router);

app.listen(port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + port )
});
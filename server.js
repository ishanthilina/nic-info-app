var express    = require('express'); 	
var processor=require('./processor');

var app        = express(); 			

var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080; 		// set our port
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'


var router = express.Router(); 				// get an instance of the express Router



router.get('/info', function(req, res) {	

	//get the id number
	var nicNum=req.param('id');

	processor.process(nicNum,res);
	
});

//show the index.html on root
router.get('/', function(req,res){
	res.sendfile(__dirname + '/public/home.html');
}); 

//register the router 
app.use('/', router);

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users

app.listen(port, function () {
	console.log( "Listening on " + server_ip_address + ", server_port " + port )
});
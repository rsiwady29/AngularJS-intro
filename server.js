var express = require('express');
var gzippo = require('gzippo');
var morgan  = require('morgan');
var Parse = require('parse').Parse;
var cors = require('cors');

var app     = express();
var port    = process.env.PORT || 8000;

// Initialize parse ... 
Parse.initialize("LaZ6g9kQElmFZOfo2CWGXIPklxogANBQms6dF8dr", "86RETGK6LJPG9QiKgDcatwLNgZRH7GaHMDj0OeNc");

// Local environment
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Cors
app.use(cors());

//body parser
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
})); 

// Serving files!
app.use(morgan({ format: 'dev', immediate: true }));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

// API
app.post('/crearPost', function(req, res) {
	var title = req.body.Titulo;
	var content = req.body.Contenido;

	var Post = Parse.Object.extend("Post");
	var post = new Post();
	 
	post.set("Title", title);
	post.set("Content", content);
	 
	post.save(null, {
	  success: function(post) {
	  	res.end(JSON.stringify(post));
	  },
	  error: function(post, error) {
	  	var err = new Error();
    	err.status = 450;
       	res.send(error.message);
	  }
	});
});

app.get('/obtenerPosts',function(req,res){
	var Post = Parse.Object.extend("Post");
	var post = new Parse.Query(Post);

	console.log(post);

	post.find({
	    success: function (results) {
	        res.end(JSON.stringify(results));
	    },
	    error: function (error) {
	    	var err = new Error();
	    	err.status = 450;
	       	res.send(error.message);
	    }
	});
});

app.get('/obtenerPost/:id', function(req, res){
	var id = req.params.id;

	var Post = Parse.Object.extend("Post");
	var query = new Parse.Query(Post);

	query.get(id, {
	  success: function(post) {
	  	res.end(JSON.stringify(post));
	  },
	  error: function(post, error) {
	  	var err = new Error();
	    err.status = 450;
	    res.send(error.message);
	  }
	});	
});

app.delete('/eliminarPost/:id', function(req, res){
	var id = req.params.id;

	var Post = Parse.Object.extend("Post");
	var query = new Parse.Query(Post);

	query.get(id, {
	  success: function(post) {
	  	post.destroy({
		  success: function(post) {
		    res.end(JSON.stringify(post));
		  },
		  error: function(post, error) {
			var err = new Error();
	    	err.status = 450;
	       	res.send(error.message);
		  }
		});
	  },
	  error: function(post, error) {
	  	var err = new Error();
	    err.status = 450;
	    res.send(error.message);
	  }
	});
});

app.put('/actualizarPost/:id', function(req, res){
	var id = req.params.id;
	var newTitle = req.body.Title || '';
	var newContent = req.body.Content || '';

	var Post = Parse.Object.extend("Post");
	var query = new Parse.Query(Post);

	query.get(id, {
	  success: function(post) {
	  	post.set("Title", newTitle);
		post.set("Content", newContent);
		post.save();

		res.end(JSON.stringify(post));
	  },
	  error: function(post, error) {
	  	var err = new Error();
	    err.status = 450;
	    res.send(error.message);
	  }
	});

});

app.get('/wow', function(req,res,next){
	var err = new Error('nooooo');
	    	err.status = 450;
	       	next('err');
//	res.end(JSON.stringify( {Nombre: 'HILO'} ));
});

app.post('/test',function(req,res){
	console.log(req.body);
	//res.end(JSON.stringify(req.body.Hola));
});

app.listen(port);
console.log('Server running on port: ' + port);
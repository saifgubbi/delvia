var express = require('express'),
app = express(),
engines = require('consolidate'),
MongoClient = require('mongodb').MongoClient,
assert = require('assert'),
bodyparser=require('body-parser'),
path=require('path'),
url="mongodb://delvia:delvia13.229.175.200:27017/delvia";

MongoClient.connect('mongodb://delvia:delvia@13.229.175.200:27017/delvia', function(err, conn) {
    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");
    let db=conn.db('delvia');
	app.get('/', function(req,res){
		//var query={username:req.query.admin};
		
		 db.collection('events').find().limit(300).toArray(function(err, docs) {
            console.log(docs);
            res.json(docs) ;
        });
		// dbo.collection("events").find(query).toArray(function(err,result){
			// if(err) throw err;
			// if(result.length>0)
			// {
				// res.json(result.recordset);
			// }
			// else
			// {
				// res.json({Error:"No Data Found"});
			// }
			// db.close();
		// });
	});
	
	app.use(bodyparser.json());

	app.post('/',function(req,res){
		console.log(req.body);
		db.collection("events").insertOne(req.body,function(err,result){
			if(err)
			{
				res.json({status:"fail"});
				throw err;
			}
			res.json({status:"success"});
			db.close();
		});	
	});
		
	app.use(function(req, res){
        res.sendStatus(404);
    });
 
    var server = app.listen(3040, function() { 
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });
});
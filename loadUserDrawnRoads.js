let http = require("http");

http.createServer(function(req, res)
    {
        res.setHeader('Content-Type', 'application/json');
        console.log("DOING STUFF...");

        let MongoClient = require('mongodb').MongoClient;
        let url = "mongodb://localhost:27017/";

        MongoClient.connect(url, { useNewUrlParser: true}, function(err, db) {
            if (err) throw err;

            let dbo = db.db("DrivableDB");
            dbo.collection("routes").find({}).toArray(function(err, result) {
                if (err) throw err;

                res.end(JSON.stringify(result));
                db.close();
            });
        });

        console.log("STUFF DONE.");
    }
).listen(8000);

console.log("Server started successfully.");

let express = require("express");
let bodyParser = require('body-parser');
let server = new express();

server.use(bodyParser.json());

server.post("/saveData", function(req, res)
{
    console.log("CONTROL REACHES EXPRESS");
    let receivedData = req.body;
    console.log(req.body);

    let MongoClient = require('mongodb').MongoClient;
    let url = "mongodb://localhost:27017/";

    MongoClient.connect(url, { useNewUrlParser: true}, function(err, db) {
        if (err) throw err;

        let dbo = db.db("DrivableDB");
            console.log(receivedData);

            dbo.collection("routes").insertOne(receivedData, function(err, result) {
            if (err) throw err;
            console.log("Road saved to database.");
            });

        db.close();
    });
    console.log("STUFF DONE.");

    res.send("ADDED");
});

server.listen(8001);



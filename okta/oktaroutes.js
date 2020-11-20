var express = require("express");
var request = require("request");
var https = require('https');
const oktapost = express();
var config = require('../config/config.json');
const fs = require('fs')
const IncomingForm = require('formidable').IncomingForm;
var bodyParser = require('body-parser')
var filename = ""


// parse application/x-www-form-urlencoded
oktapost.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
oktapost.use(bodyParser.json());


oktapost.post("/createBookmarkApp",function (req, res) {
    console.log(req.body);
    var url=config.url;
    var apikey=config.token;
    const okta = require('@okta/okta-sdk-nodejs');
        const client = new okta.Client({
            orgUrl: url,
            token: apikey
        });
    name = req.body['name'],
    label = req.body['label'],
    signOnMode = req.body['signOnMode'],
    app = req.body['settings']['app']
    const newApp = {
        name: name,
        label: label,
        signOnMode: signOnMode,
        settings: {
            app: app
        }   
    }
    console.log(newApp);
    client.createApplication(newApp)
    .then(application => res.send(true))
        .catch(err =>{
		console.log(err);
        res.send(false)}
    );
});


module.exports = oktapost;
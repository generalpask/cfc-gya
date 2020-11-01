const Server = function Server(environment) {

    // Load modules
    const path = require('path');
    const fs = require('fs');
    const express = require('express');
    const morgan = require("morgan");
    const errorhandler = require("errorhandler");
    const csv = require('csvtojson');

    // Use express and express router
    const app = express();
    const router = express.Router();

    // Middleware setup
    app.use('/', router);
    app.use(morgan('common', {
        stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
    }));

    // Dev middleware
    if (environment == 'development') {
        app.use(errorhandler());
        // Enable cors
        app.use(function(req, res, next) {
            res.header("access-control-allow-origin", "*");
            res.header("access-control-allow-headers", "origin, x-requested-with, content-type, accept");
            next();
        });
    }


    // Routes
    app.get('/', (req, res) => {
        res.redirect('http://localhost:3702'); // Redirect to frontend (ONLY LOCAL)
    });
    
    // Formats
    app.get('/formats', (req, res) => {
        csv().fromFile('./formats-modified.csv').then((jsonobj) => {
            res.json(jsonobj);
        })
    })

    // Start server
    var port = process.env.PORT || 3701;
    var server = app.listen(port, () => {
        if (environment == 'production') {
            console.log('\x1b[34m'+'\nSTARTING SERVER FOR PRODUCTION'+'\x1b[0m');
            console.log('cfc-gya listening on port ' + port);
        }
    });
    return server;
}

module.exports = Server;

const Server = function Server(environment) {

	// Load modules
    const path = require('path');
    const fs = require('fs');
    const express = require('express');
    const bodyParser = require('body-parser');
    const morgan = require("morgan");
    const errorhandler = require("errorhandler");

    // Use express and express router
    const app = express();
    const router = express.Router();

        // Middleware setup
    app.use('/', router);
    app.use(express.static(__dirname + '/public/'));
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json());
    app.use(morgan('common', {
        stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
    }));

    // Dev middleware
    if (environment == 'development') {
        app.use(errorhandler());
    }

    // Routes
    app.get('/', (req, res) => {
    	res.redirect('http://localhost:3702');
    });

    app.get('/test', (req, res) => {
    	res.status(200).send("Server says hello from the /test route!");
    });

    // Start server
    var port = 3701;
    var server = app.listen(port, () => {
        if (environment == 'production') {
            console.log('\x1b[34m'+'\nSTARTING SERVER FOR PRODUCTION'+'\x1b[0m');
            console.log('cfc-gya listening on port ' + port);
        }
        else {
            console.log('port ' + port);
        }
    });
    return server;
}

module.exports = Server;
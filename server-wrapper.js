const server = require('./server');
const path = require('path');
const fs = require('fs');
const environment = process.env.NODE_ENV || 'development';

// Shutdown function
const Shutdown = function Shutdown() {
    if (objServer) {
    	process.stdout.write('\x1b[33m'+'Closing server... ');
    	objServer.close();
    	process.stdout.write('\x1b[32m'+'Done!\n'+'\x1b[0m');
    }

    console.log('Shutdown complete');
    process.exit();
}

// Start the server + error wrapper
var objServer;
try {
	// Start the server
    objServer = server(environment);
}
catch (err) {
    process.stdout.write('\x1b[31m'+'\nAn error was caught by the wrapper:\n'+'\x1b[0m');
    console.log(err);
	console.log('\x1b[35m'+'\nServer has crashed, shutting down safely...');
    Shutdown();
}

// Shutdown on Ctrl+C
process.on('SIGINT', function() {
	console.log('\x1b[34m'+'\nSIGINT received, shutting down...');
	Shutdown();
});

exports.Shutdown = Shutdown;

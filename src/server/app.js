/**
 * Main file for 'Currently Viewing App' project
 */

'use strict';

var staticServer = require('./staticServer.js');
var connections = require('./connections.js');

function parseCommandLine() {
  var commandLineArgs = require('command-line-args');
  var optionDefinitions = [
    {name: 'port', alias: 'p', type: Number, multiple: false, defaultValue: 3000},
    {name: 'help', alias: 'h', type: Boolean},
    {name: 'dir', alias: 'd', type: String, defaultValue: 'src/client'}
  ];

  var options = commandLineArgs(optionDefinitions);
  if (options.help) {
    console.log("Run 'npm install; node src/server/app.js [-p port] [-d dir]'. Then open your browser on port " + options.port);
    console.log("\t Options");
    console.log("\t '-p, --port PORT' to run this on a different port ");
    console.log("\t '-d, --dir PATH_TO_CLIENT_DIR if the client directory is not in src/client ");
    process.exit(1);
  }
  return options;
}

function main() {
  var options = parseCommandLine();

  // Start the static server
  staticServer.startServer(options.port, options.dir);

  // start socketIo connections counter
  connections(staticServer.http);
}

main();




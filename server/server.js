'use strict';

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/environment.js');
const morgan = require('morgan');
const compression = require('compression');

// Get our API routes
const api = require('./routes/api');

const app = express();

const uri = process.env.MONGODB_URI || 'mongodb://localhost/ng2Tesla';
mongoose.Promise = require('bluebird');
mongoose.connect(uri);
mongoose.connection.on('error', function(err) {
  console.error(`MongoDB connection error  + ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});

// // Point static path to dist
app.set('appPath', path.join(config.root, 'dist'));
app.use(express.static(app.get('appPath')));

// Use morgan logger
app.use(morgan('dev'));

// Use compression middleware for improved performance
app.use(compression());

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Set our api routes
app.use('/api', api);

// // Catch all other routes and return the index file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });
app.route('/*')
  .get((req, res) => {
    res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
  });

const port = process.env.PORT || '4200';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`server running on localhost: ${port}`));

'use strict';

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/environment.js');

// Get our API routes
const api = require('./routes/api');

const app = express();

const uri = process.env.MONGODB_URI || 'mongodb://localhost/ng2Tesla';
mongoose.Promise = require('bluebird');
mongoose.connect(uri);

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// // Point static path to dist
// app.use(express.static(path.join(__dirname, 'dist')));

app.set('appPath', path.join(config.root, 'dist'));
app.use(express.static(app.get('appPath')));

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

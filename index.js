#!/usr/bin/env

const express = require('express');
const path = require('path');
const proxy = require('express-http-proxy');

const restServer = require('./server');

const restServerPort = 3001; // @todo move to nconf
const staticServerPort = 8080; // @todo move to nconf

const staticServer = express();

restServer.listen(restServerPort, () => console.log(`Rest server listening on port ${restServerPort}!`));

staticServer.use(express.static(path.join(__dirname, 'build')));
staticServer.use('/report', express.static(path.join(__dirname, 'reports')));

staticServer.use('/api', proxy(`http://localhost:${restServerPort}`)); // @todo proxy with api prefix

staticServer.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'build', 'index.html')));

staticServer.listen(staticServerPort, () => console.log(`Static server listening on port ${staticServerPort}!`));

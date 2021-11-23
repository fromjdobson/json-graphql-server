#!/usr/bin/env node
require('reify');
const path = require('path');
const express = require('express');
const cors = require('cors');
const ARGS = require('./getArgs');
const openBrowser = require('./browser-opener');
const {
    STARTING,
    DATAFROM,
    STARTED,
    BROWSEROPEN,
    REJECTION,
} = require('./console-messages');

STARTING();
const JsonGraphqlServer = require('../lib/json-graphql-server.node.min');
const DATAFILE = process.argv[2] || './example/data.js';
const HOST = ARGS.host || ARGS.h || process.env.NODE_HOST || 'localhost';
const PORT = ARGS.port || ARGS.p || process.env.NODE_PORT || 3000;
const URL = `http://${HOST}:${PORT}/`;

const dataPath = path.join(process.cwd(), DATAFILE);
const data = require(dataPath);
const app = express();
DATAFROM(dataPath);

app.use(cors());
app.use('/', JsonGraphqlServer.default(data));
app.listen(PORT, HOST);
STARTED(URL);

openBrowser(URL) && BROWSEROPEN(URL);

process.on('unhandledRejection', REJECTION);

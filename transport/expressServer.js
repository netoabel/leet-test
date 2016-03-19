"use strict";
var express = require('express');
var bodyParser = require('body-parser');

class ExpressServer {
  constructor() {
    this._createServer();
    this._setupMiddlewares();
  }

  start(port) {
    this._server.listen(port, function () {
      console.log("Server listening at port ", port);
    });
  }

  addRoute(method, route, callback) {
    this._server[method](route, callback);
  }

  _createServer() {
    this._server = express();
  }

  _setupMiddlewares() {
    this._server.use(bodyParser.urlencoded({extended: true}));
    this._server.use(bodyParser.json());
  }
}

module.exports = ExpressServer;
"use strict";

class TimeLineRouter {
  constructor(server, controller) {
    this._server = server;
    this._controller = controller;
  }

  setupRoutes() {
    this._server.addRoute('get', '/timeline/:username', this._controller.listAll.bind(this._controller));
    this._server.addRoute('get', '/timeline/:username/fotos', this._controller.listPhotos.bind(this._controller));
    this._server.addRoute('get', '/timeline/:username/videos', this._controller.listVideos.bind(this._controller));
  }
}

module.exports = TimeLineRouter;
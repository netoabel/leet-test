"use strict";

class TimeLineRouter {
  constructor() {
  }

  setupRoutes(server, controller) {
    server.addRoute('get', '/timeline/:username', controller.listAll.bind(controller));
    server.addRoute('get', '/timeline/:username/fotos', controller.listPhotos.bind(controller));
    server.addRoute('get', '/timeline/:username/videos', controller.listVideos.bind(controller));
  }
}

module.exports = TimeLineRouter;
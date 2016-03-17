"use strict";
class InstagramRouter {
  constructor() {
  }

  setupRoutes(server, controller) {
    server.addRoute('get', '/timeline/:username', controller.listAll);
    server.addRoute('get', '/timeline/:username/fotos', controller.listPhotos);
    server.addRoute('get', '/timeline/:username/videos', controller.listVideos);
  }
}

module.exports = InstagramRouter;
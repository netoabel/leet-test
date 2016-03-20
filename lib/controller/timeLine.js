"use strict";
class TimeLineController {
  constructor(timeLine) {
    this._timeLine = timeLine;
  }

  listAll(req, res) {
    var username = req.params.username;
    this._timeLine.getAllUserPosts(username).then(function (result) {
      res.json(result);
    });
  }

  listPhotos(req, res) {
    var username = req.params.username;
    this._timeLine.getUserPostsByType(username, 'image').then(function (result) {
      res.json(result);
    });
  }

  listVideos(req, res) {
    var username = req.params.username;
    this._timeLine.getUserPostsByType(username, 'video').then(function (result) {
      res.json(result);
    });
  }
}

module.exports = TimeLineController;
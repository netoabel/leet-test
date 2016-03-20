"use strict";
class TimeLineController {
  constructor(timeLine) {
    this._timeLine = timeLine;
  }

  listAll(req, res) {
    var username = req.params.username;
    this._timeLine.listAllUserMedia(username).then(function (result) {
      res.json(result);
    });
  }

  listPhotos(req, res) {
    var username = req.params.username;
    this._timeLine.listUserMediaByType(username, 'image').then(function (result) {
      res.json(result);
    });
  }

  listVideos(req, res) {
    var username = req.params.username;
    this._timeLine.listUserMediaByType(username, 'video').then(function (result) {
      res.json(result);
    });
  }
}

module.exports = TimeLineController;
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
    res.json([
      {image_url: 'placeholder', thumb_url: 'placeholder', file_size: 0},
      {image_url: 'placeholder', thumb_url: 'placeholder', file_size: 0}
    ]);
  }

  listVideos(req, res) {
    res.json([
      {thumb_url: 'placeholder', video_url: 'placeholder', file_size: 0},
      {thumb_url: 'placeholder', video_url: 'placeholder', file_size: 0}
    ]);
  }
}

module.exports = TimeLineController;
"use strict";
class InstagramController {
  constructor() {
  }

  listAll(req, res) {
    res.json([
      {image_url: 'placeholder', thumb_url: 'placeholder', video_url: 'placeholder', file_size: 0},
      {image_url: 'placeholder', thumb_url: 'placeholder', video_url: 'placeholder', file_size: 0}
    ]);
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

module.exports = InstagramController;
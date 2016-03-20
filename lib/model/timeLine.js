"use strict";
var Promise = require("bluebird");
var remoteFileSize = require("remote-file-size");

class TimeLine {
  constructor(instagramAPI) {
    this._instagramAPI = instagramAPI;
  }

  listAllUserMedia(username) {
    var self = this;
    return new Promise(function (resolve, reject) {
      self._instagramAPI.getPostsByUsername(username).then(function (publications) {
        self._addExtraProperties(publications).then(function (result) {
          resolve(result);
        });
      });
    });
  }

  listUserMediaByType(username, type) {
    var self = this;
    return new Promise(function (resolve, reject) {
      self.listAllUserMedia(username).then(function (publications) {
        var result = publications.filter(function (publication) {
          return publication.type === type;
        });
        resolve(result);
      });
    });
  }

  _addExtraProperties(publications) {
    var self = this;
    return new Promise(function (resolve, reject) {
      var activeAsyncCalls = publications.length;
      publications.forEach(function (publication) {
        publication.image_url = publication.images.standard_resolution.url;
        publication.thumb_url = publication.images.low_resolution.url;
        var sizeReference = publication.image_url;
        if (publication.type === 'video') {
          publication.video_url = publication.videos.standard_resolution.url;
          sizeReference = publication.video_url;
        }

        self._getFileSize(sizeReference, function (err, fileSize) {
          activeAsyncCalls--;
          publication.file_size = fileSize;
          if (activeAsyncCalls <= 0) {
            resolve(publications);
          }
        });
      });
    });
  }

  _getFileSize(url, callback) { //TODO: USE PROMISE HERE
    remoteFileSize(url, function (err, size) {
      if (err) {
        callback(err);
      } else {
        callback(null, Math.round(size / 1024));
      }
    });
  }
}

module.exports = TimeLine;
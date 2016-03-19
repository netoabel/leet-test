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
      self._instagramAPI.listMediaByUsername(username).then(function (publications) {
        self._addExtraProperties(publications).then(function (result) {
          resolve(result);
        });
      });
    });
  }

  _addExtraProperties(publications) {
    return new Promise(function (resolve, reject) {
      var activeAsyncCalls = publications.length;
      publications.forEach(function (publication) {
        //TODO: video_url and VIDEO SIZE
        publication.image_url = publication.images.standard_resolution.url;
        publication.thumb_url = publication.images.low_resolution.url;
        remoteFileSize(publication.image_url, function (err, size) {
          if (err) {
            reject(err);
          } else {
            activeAsyncCalls--;
            publication.file_size = Math.round(size / 1024);
            if(activeAsyncCalls <= 0){
              resolve(publications);
            }
          }
        });
      });
    });
  }
}

module.exports = TimeLine;
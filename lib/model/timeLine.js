"use strict";
var remoteFileSize = require("remote-file-size");
var Promise = require("bluebird");

class TimeLine {
  constructor(instagramAPI) {
    this._instagramAPI = instagramAPI;
  }

  getUserPosts(username, type) {
    var self = this;
    return new Promise(function (resolve) {
      self._instagramAPI.getPostsByUsername(username).then(function (posts) {
        if (type !== undefined) {
          posts = self._filter(posts, type);
        }
        self._addExtraProperties(posts).then(function (posts) {
          resolve(posts);
        });
      });
    });
  }

  _addExtraProperties(posts) {
    var self = this;
    var resultingPosts = [];
    return new Promise(function (resolve) {
      if (posts !== undefined && posts.length > 0) {
        resultingPosts = self._addURLProperties(posts);
        self._addFileSizes(resultingPosts).then(function (resultingPosts) {
          resolve(resultingPosts);
        });
      } else {
        resolve([]);
      }
    });
  }

  _filter(posts, type) {
    return posts.filter(function (post) {
      return post.type === type;
    });
  }

  _addURLProperties(posts) {
    posts.forEach(function (post) {
      post.image_url = post.images.standard_resolution.url;
      post.thumb_url = post.images.low_resolution.url;
      if (post.type === 'video') {
        post.video_url = post.videos.standard_resolution.url;
      }
    });
    return posts;
  }

  _addFileSizes(posts) {
    var self = this;
    var activePromises = [];
    return new Promise(function (resolve) {
      posts.forEach(function (post) {
        var fileURL = self._getFileURL(post);
        var fileSizePromise = self._getFileSize(fileURL).then(function (fileSize) {
          post.file_size = fileSize;
        });
        activePromises.push(fileSizePromise);
      });
      Promise.all(activePromises).then(function () {
        resolve(posts);
      });
    });
  }

  _getFileURL(post) {
    var fileURL;
    if (post.type === 'image') {
      fileURL = post.images.standard_resolution.url;
    } else if (post.type === 'video') {
      fileURL = post.videos.standard_resolution.url;
    }
    return fileURL;
  }

  _getFileSize(url) {
    return new Promise(function (resolve, reject) {
      remoteFileSize(url, function (err, size) {
        if (err) {
          reject(err);
        } else {
          resolve(Math.round(size / 1024));
        }
      });
    });
  }
}

module.exports = TimeLine;
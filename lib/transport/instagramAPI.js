"use strict";
var Promise = require("bluebird");

class InstagramAPI {
  constructor(instagramModule) {
    var instagramAccessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    if(!instagramAccessToken){
      throw(new Error('Missing INSTAGRAM_ACCESS_TOKEN environment variable!'));
    }

    this._instagram = instagramModule.instagram();
    this._instagram.use({
      access_token: instagramAccessToken
    });
  }

  getPostsByUsername(username) {
    var self = this;
    return new Promise(function (resolve) {
      self.getUserId(username)
        .then(self.getPostsByUserId.bind(self))
        .then(function (result) {
          resolve(result);
        });
    });
  }

  getPostsByUserId(userId) {
    var posts = [];
    var self = this;
    return new Promise(function (resolve) {
      var joinAllPagesPosts = function (err, pagePosts, pagination) {
        if (err) {
          resolve([]);
        }
        posts = posts.concat(pagePosts);
        if (pagination && pagination.next) {
          pagination.next(joinAllPagesPosts);
        } else {
          resolve(posts);
        }
      };
      self._instagram.user_media_recent(userId, joinAllPagesPosts);
    });
  }

  getUserId(username) {
    var self = this;
    return new Promise(function (resolve, reject) {
      self._instagram.user_search(username, function (err, users) {
        if (err) {
          reject(err);
        } else {
          var userId;
          if (users && users.length > 0) {
            userId = users[0].id;
          }
          resolve(userId);
        }
      });
    });
  }
}

module.exports = InstagramAPI;
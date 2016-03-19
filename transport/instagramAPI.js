"use strict";
var Promise = require("bluebird");
var instagramNode = require('instagram-node');
var instagramAccessToken = process.env.INSTAGRAM_ACCESS_TOKEN; //TODO: Add some validation here

//TODO: Refactor this class
class InstagramAPI {
  constructor() {
    this._instagram = instagramNode.instagram();
    this._instagram.use({
      access_token: instagramAccessToken
    });
  }

  listMediaByUsername(username) { //TODO: "User not found error"
    var self = this;
    return new Promise(function (resolve, reject) {
      self._getUserId(username)
        .then(self._listMediaByUserId.bind(self))
        .then(function (result) {
          resolve(result);
        });
    });
  }

  _listMediaByUserId(userId) {
    var result = [];
    var self = this;
    return new Promise(function (resolve, reject) {
      var paginate = function (err, medias, pagination) { //TODO: Check if this is working
        if (err) {
          reject(err);
        }
        result = result.concat(medias);
        if (pagination.next) {
          pagination.next(paginate);
        } else {
          resolve(result);
        }
      };
      self._instagram.user_media_recent(userId, paginate);
    });
  }

  _getUserId(username) {
    var self = this;
    return new Promise(function (resolve, reject) {
      self._instagram.user_search(username, function (err, users) {
        if (err) {
          reject(err);
        } else if (users && users.length > 0) {
          resolve(users[0].id);
        }
      });
    });
  }
}

module.exports = InstagramAPI;
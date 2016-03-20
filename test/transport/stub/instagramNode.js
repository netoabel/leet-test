'use strict';
var fs = require('fs');
var path = require('path');
class InstagramNodeStub {
  constructor() {
    this._pages = 1;
    this._currentPage = 1;
  }

  instagram() {
    var self = this;
    return {
      use: function () {
      },

      set_number_of_pages: function (pages) {
        self._pages = pages;
      },

      user_media_recent: function (userId, callback) { //Todo: Review this
        if (userId === "1") {
          fs.readFile(path.join(__dirname, '../../posts.json'), 'utf8', function (err, data) {
            if (err) throw err;
            var result = JSON.parse(data);
            var pagination = {};
            if (self._currentPage < self._pages) {
              pagination.next = function (cb) {
                self._currentPage++;
                self.instagram().user_media_recent(userId, cb);
              };
            }
            callback(null, result, pagination);
          });
        } else {
          callback({status_code: 404});
        }
      },

      user_search: function (username, callback) {
        var result = [];
        if (username === "leet-tech") {
          result.push({"id": "1"});
        }
        callback(null, result);
      }
    };
  }
}

module.exports = InstagramNodeStub;
"use strict";
var fs = require('fs');
var path = require('path');
var Promise = require("bluebird");

class InstagramAPIStub {
  constructor() {
  }

  getPostsByUsername(username) {
    return new Promise(function (resolve) {
      if(username === 'leettech'){
        fs.readFile(path.join(__dirname, '../../posts.json'), 'utf8', function (err, data) {
          if (err) throw err;
          resolve(JSON.parse(data));
        });
      }else{
        resolve([]);
      }
    });
  }
}

module.exports = InstagramAPIStub;
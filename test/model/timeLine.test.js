'use strict';
var expect = require('chai').expect,
  InstagramAPIStub = require('../../test/model/stub/instagramAPI'),
  TimeLine = require('../../lib/model/timeLine');

process.env.INSTAGRAM_ACCESS_TOKEN = 'MY_TOKEN';

describe('TimeLine', function () {
  var timeLine, instagramAPI;

  beforeEach(function () {
    instagramAPI = new InstagramAPIStub();
    timeLine = new TimeLine(instagramAPI);
    timeLine._getFileSize = function () {
      return new Promise(function (resolve) {
        resolve(100);
      });
    }
  });

  describe('#getAllUserPosts()', function () {

    describe('Given "leettech"', function () {
      it('returns an array', function (done) {
        timeLine.getAllUserPosts('leettech').then(function (result) {
          expect(result).to.be.an('array');
          done();
        });
      });

      it('has string image_url in all returned items', function (done) {
        timeLine.getAllUserPosts('leettech').then(function (result) {
          result.forEach(function (item) {
            expect(item).to.have.property('image_url');
            expect(item.image_url).to.be.a('string');
          });
          done();
        });
      });

      it('has image_url equal to images.standard_resolution.url in all returned items', function (done) {
        timeLine.getAllUserPosts('leettech').then(function (result) {
          result.forEach(function (item) {
            expect(item.image_url).to.be.equal(item.images.standard_resolution.url);
          });
          done();
        });
      });

      it('has string thumb_url in all returned items', function (done) {
        timeLine.getAllUserPosts('leettech').then(function (result) {
          result.forEach(function (item) {
            expect(item).to.have.property('thumb_url');
            expect(item.thumb_url).to.be.a('string');
          });
          done();
        });
      });

      it('has thumb_url equal to images.low_resolution.url in all returned items', function (done) {
        timeLine.getAllUserPosts('leettech').then(function (result) {
          result.forEach(function (item) {
            expect(item.thumb_url).to.be.equal(item.images.low_resolution.url);
          });
          done();
        });
      });

      it('has integer file_size in all returned items', function (done) {
        timeLine.getAllUserPosts('leettech').then(function (result) {
          result.forEach(function (item) {
            expect(item).to.have.property('file_size');
            expect(item.file_size).to.be.a('number');
          });
          done();
        });
      });

      it('has string video_url in all returned video items', function (done) {
        timeLine.getAllUserPosts('leettech').then(function (result) {
          result.forEach(function (item) {
            if (item.type === 'video') {
              expect(item).to.have.property('video_url');
              expect(item.video_url).to.be.a('string');
            }
          });
          done();
        });
      });

      it('has video_url equal to videos.standard_resolution.url in all returned video items', function (done) {
        timeLine.getAllUserPosts('leettech').then(function (result) {
          result.forEach(function (item) {
            if (item.type === 'video') {
              expect(item.video_url).to.be.equal(item.videos.standard_resolution.url);
            }
          });
          done();
        });
      });

    });

    describe('Given "asdasd" (invalid username)', function () {
      it('returns an empty array', function (done) {
        timeLine.getAllUserPosts('asdasd').then(function (result) {
          expect(result).to.be.an('array');
          expect(result).to.be.empty;
          done();
        });
      });
    });

  });

  describe('#getUserPostsByType()', function () {

    describe('Given ["leettech", "image"]', function () {
      it('returns an array', function (done) {
        timeLine.getUserPostsByType('leettech', 'image').then(function (result) {
          expect(result).to.be.an('array');
          done();
        });
      });

      it('has only image posts in the returned array', function (done) {
        timeLine.getUserPostsByType('leettech', 'image').then(function (result) {
          result.forEach(function (item) {
            expect(item.type).to.be.equal('image');
          });
          done();
        });
      });
    });

    describe('Given ["leettech", "video"]', function () {
      it('returns an array', function (done) {
        timeLine.getUserPostsByType('leettech', 'video').then(function (result) {
          expect(result).to.be.an('array');
          done();
        });
      });

      it('has only video posts in the returned array', function (done) {
        timeLine.getUserPostsByType('leettech', 'video').then(function (result) {
          result.forEach(function (item) {
            expect(item.type).to.be.equal('video');
          });
          done();
        });
      });
    });

    describe('Given ["leettech", "asdasd"]', function () {
      it('returns an empty array', function (done) {
        timeLine.getUserPostsByType('leettech', 'asdasd').then(function (result) {
          expect(result).to.be.an('array');
          expect(result).to.be.empty;
          done();
        });
      });
    });

  });
});
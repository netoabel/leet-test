'use strict';
var expect = require('chai').expect,
  InstagramNodeStub = require('./stub/instagramNode'),
  InstagramAPI = require('../../lib/transport/instagramAPI');

process.env.INSTAGRAM_ACCESS_TOKEN = 'MY_TOKEN';

describe('InstagramAPI', function () {
  var instagramModule, instagramAPI;

  beforeEach(function () {
    instagramModule = new InstagramNodeStub();
    instagramAPI = new InstagramAPI(instagramModule);
  });

  describe('#getUserId()', function () {

    describe('Given "leettech"', function () {
      it('returns a string', function (done) {
        instagramAPI.getUserId('leettech').then(function (result) {
          expect(result).to.be.a('string');
          done();
        });
      });
    });

    describe('Given "asdasd" (invalid username)', function () {
      it('returns undefined', function (done) {
        instagramAPI.getUserId('asdasd').then(function (result) {
          expect(result).to.be.undefined;
          done();
        });
      });
    });

  });

  describe('#getPostsByUserId()', function () {

    describe('Given 1 (valid user id) with 1 page', function () {
      it('returns an array', function (done) {
        instagramModule.instagram().set_number_of_pages(1);
        instagramAPI.getPostsByUserId(1).then(function (result) {
          expect(result).to.be.an('array');
          done();
        });
      });

      it('returns at most 20 entries', function (done) {
        instagramModule.instagram().set_number_of_pages(1);
        instagramAPI.getPostsByUserId(1).then(function (result) {
          expect(result).to.have.length.at.most(20);
          done();
        });
      });
    });

    describe('Given 1 (valid user id) with 2 pages', function () {
      it('returns an array', function (done) {
        instagramModule.instagram().set_number_of_pages(2);
        instagramAPI.getPostsByUserId("1").then(function (result) {
          expect(result).to.be.an('array');
          done();
        });
      });

      it('returns more than 20 entries', function (done) {
        instagramModule.instagram().set_number_of_pages(2);
        instagramAPI.getPostsByUserId("1").then(function (result) {
          expect(result).to.have.length.above(20);
          done();
        });
      });

      it('returns at most 40 entries', function (done) {
        instagramModule.instagram().set_number_of_pages(2);
        instagramAPI.getPostsByUserId("1").then(function (result) {
          expect(result).to.have.length.at.most(40);
          done();
        });
      });
    });

    describe('Given 1 (valid user id) with 3 pages', function () {
      it('returns an array', function (done) {
        instagramModule.instagram().set_number_of_pages(3);
        instagramAPI.getPostsByUserId("1").then(function (result) {
          expect(result).to.be.an('array');
          done();
        });
      });

      it('returns more than 40 entries', function (done) {
        instagramModule.instagram().set_number_of_pages(3);
        instagramAPI.getPostsByUserId("1").then(function (result) {
          expect(result).to.have.length.above(40);
          done();
        });
      });

      it('returns at most 60 entries', function (done) {
        instagramModule.instagram().set_number_of_pages(3);
        instagramAPI.getPostsByUserId("1").then(function (result) {
          expect(result).to.have.length.at.most(60);
          done();
        });
      });
    });

    describe('Given "asdasd (invalid user id)"', function () {
      it('returns an empty array', function (done) {
        instagramAPI.getPostsByUserId('asdasd').then(function (result) {
          expect(result).to.be.an('array');
          expect(result).to.be.empty;
          done();
        });
      });
    });

  });

  describe('#getPostsByUsername()', function () {

    describe('Given "leettech"', function () {
      it('returns an array', function (done) {
        instagramAPI.getPostsByUsername('leettech').then(function (result) {
          expect(result).to.be.an('array');
          done();
        });
      });
    });

    describe('Given "asdasd" (invalid username)', function () {
      it('returns an empty array', function (done) {
        instagramAPI.getPostsByUsername('asdasd').then(function (result) {
          expect(result).to.be.an('array');
          expect(result).to.be.empty;
          done();
        });
      });
    });

    describe('Given "leettech with 3 pages', function () {
      it('returns an array', function (done) {
        instagramModule.instagram().set_number_of_pages(3);
        instagramAPI.getPostsByUsername("leettech").then(function (result) {
          expect(result).to.be.an('array');
          done();
        });
      });

      it('returns more than 40 entries', function (done) {
        instagramModule.instagram().set_number_of_pages(3);
        instagramAPI.getPostsByUsername("leettech").then(function (result) {
          expect(result).to.have.length.above(40);
          done();
        });
      });

      it('returns at most 60 entries', function (done) {
        instagramModule.instagram().set_number_of_pages(3);
        instagramAPI.getPostsByUsername("leettech").then(function (result) {
          expect(result).to.have.length.at.most(60);
          done();
        });
      });
    });

  });
});
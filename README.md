# Leet test
This is a test project developed for Leet's selective process. The application consists in a RESTful API that gets publications data from Instagram profiles and return them in JSON format after some data processing.

The following versions were used:
  - Node.js v5.3.0;
  - Mocha v2.4.5.

## The API
There are three endpoints:
```http
  - GET /timeline/{profilename}             // Returns all the publications made by {profilename}
  - GET /timeline/{profilename}/fotos       // Returns all the images publications made by {profilename}
  - GET /timeline/{profilename}/videos      // Returns all the videos publications made by {profilename}
```
## How to run it
You must set a value for `INSTAGRAM_ACCESS_TOKEN` environment variable before running the application. It can be done as follows:
```sh
$ npm install
$ INSTAGRAM_ACCESS_TOKEN=YOUR_ACCESS_TOKEN node lib/app.js
```
Read more about instagram authentication [here](https://www.instagram.com/developer/authentication/).

## How to run the tests
Just run:
```sh
$ mocha ./test --recursive
```

Good luck for me! :D
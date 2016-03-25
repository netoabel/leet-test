# Leet test
This is a test project developed for Leet's selective process. The application consists in a RESTful API that reads publications data from the timeline of an Instagram user and returns it in JSON format after some data processing.

The following versions were used:

  - Node.js v5.3.0;
  - Mocha v2.4.5.

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


> P.S.: Due to an Instagram limitation, applications in Sandbox Mode can retrieve at most 20 posts a time (with no pagination data). Thus this project won't run properly in this mode. To get the full timeline of an user, you will need an access token generated from a valid Instagram client that isn't in Sandbox Mode. For the sake of this test, I created a stub to simulate the Instagram API behavior and wrote tests to validate the application behavior.

Good luck for me! :D
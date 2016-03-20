var instagramNode = require('instagram-node');
var ExpressServer = require('./transport/expressServer');
var InstagramAPI = require('./transport/instagramAPI');
var TimeLineController = require('./controller/timeLine');
var TimeLineRouter = require('./router/timeLine');
var TimeLine = require('./model/timeLine');

var server = new ExpressServer();
var instagramAPI = new InstagramAPI(instagramNode);
var timeLine = new TimeLine(instagramAPI);
var timeLineController = new TimeLineController(timeLine);
var timeLineRouter = new TimeLineRouter(server, timeLineController);

timeLineRouter.setupRoutes();
server.start(3000);
var ExpressServer = require('./transport/expressServer');
var InstagramAPI = require('./transport/instagramAPI');
var TimeLineController = require('./controller/timeLine');
var TimeLineRouter = require('./router/timeLine');
var TimeLine = require('./model/timeLine');

var server = new ExpressServer();
var instagramAPI = new InstagramAPI(server);
var timeLine = new TimeLine(instagramAPI);
var timeLineController = new TimeLineController(timeLine);
var timeLineRouter = new TimeLineRouter();

timeLineRouter.setupRoutes(server, timeLineController);
server.start(3000);
var ExpressServer = require('./transport/expressServer');
var TimeLineController = require('./controller/timeLine');
var TimeLineRouter = require('./router/timeLine');

var server = new ExpressServer();
var timeLineController = new TimeLineController();
var timeLineRouter = new TimeLineRouter();

timeLineRouter.setupRoutes(server, timeLineController);
server.start(3000);
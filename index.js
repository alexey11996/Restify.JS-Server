const restify = require("restify");
const mongoose = require("mongoose");
const config = require("./config");
const corsMiddleware = require("restify-cors-middleware");

const cors = corsMiddleware({
  origins: ["*"],
  allowHeaders: ["*"],
  exposeHeaders: ["*"]
});

const server = restify.createServer();

server.pre(cors.preflight);
server.use(cors.actual);

server.use(restify.plugins.bodyParser());

server.listen(config.PORT, () => {
  mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });
});

mongoose.set("useFindAndModify", false);
const db = mongoose.connection;

db.on("error", err => console.log(err));

db.once("open", () => {
  require("./routes/cv")(server);
  console.log(`server started on port ${config.PORT}`);
});

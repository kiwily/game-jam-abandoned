import express from "express";
import http from "http";
import { Server } from "socket.io";

// get __dirname
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 8080;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ENVIRONEMENT
let HOST = null;
const USER_POOL = [];

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
    if (HOST === null) {
      res.redirect('/host');
    } else {
      res.redirect('/client');
    }
});

app.get('/host/', function (req, res) {
    res.sendFile('host.html', {root: __dirname});
});

app.get('/client/', function (req, res) {
    res.sendFile('client.html', {root: __dirname});
});

app.get('/message/', function (req, res) {
    res.sendFile('message.html', {root: __dirname});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  if (HOST === null) {
    HOST = socket.id;
    console.log("Set Host to", socket.id);
  };

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    socket.broadcast.emit("chat message", msg)
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

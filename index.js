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

app.use((req, res, next) => {
  req.isHost = false;
  if (HOST === null) {
    req.isHost = true;
  };
  next();
})
app.get('/', function (req, res) {
  console.log("hasRoot: ", req.hasRoot)
    if (req.isHost) {
      res.redirect("/host");
    } else {
      res.redirect("/client");
    };
});

app.get('/host', function (req, res) {
  if (req.isHost) {
    res.sendFile("host.html", {root: __dirname});
  } else {
    res.redirect("/client");
  };
});

app.get('/client', function (req, res) {
  if (req.isHost) {
    res.redirect("/host");
  } else {
    res.sendFile("client.html", {root: __dirname});
  };
});

// app.get('/message', function (req, res) {
//     res.sendFile('message.html', {root: __dirname});
// });

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
    if (HOST === socket.id) {
      HOST = null;
      socket.broadcast.emit("no-host")
    };
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

// import express from 'express';
// import http from 'http';
// import socketIO from 'socket.io';
// import "server";
// import "io";

import express from "express";
import http from "http";
// import cors from "cors";

// get __dirname
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
    // res.setHeader('Content-Type', 'application/javascript');
    res.sendFile('index.html', {root: __dirname});
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
  res.render('error');
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// const server = http.Server(app);
//
// server.listen(8080, () => {
//     console.log("server running on port 8080")
// });

// const io = socketIO(server, {
//     handlePreflightRequest: (req, res) => {
//         const headers = {
//             "Access-Control-Allow-Origin": req.headers.origin
//         }
//         res.writeHead(200, headers);
//         res.end();
//     },
//     cors: {
//         origin: "*"
//     }
// });

// io.on('connection', function (socket) {
//   socket.emit('greeting-from-server', {
//       greeting: 'Hello Client'
//   });
//   socket.on('greeting-from-client', function (message) {
//     console.log(message);
//   });
// });

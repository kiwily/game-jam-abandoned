import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import "server";
import "io";

const app = express();

app.use(express.static('./'))
app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile('index.html', { root:  "./"});
});

const server = http.Server(app);
server.listen(8080, () => {
    console.log("server running on port 8080")
});

const io = socketIO(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Origin": req.headers.origin
        }
        res.writeHead(200, headers);
        res.end();
    },
    cors: {
        origin: "*"
    }
});

io.on('connection', function (socket) {
  socket.emit('greeting-from-server', {
      greeting: 'Hello Client'
  });
  socket.on('greeting-from-client', function (message) {
    console.log(message);
  });
});




const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');
const server = require("http").createServer(app);
const io = require('socket.io')(server);
app.use('/', express.static(path.join(__dirname, 'target')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/target/index.html'));
});
io.on('connection', function (socket) {
    socket.on("loadDataServer", () => {
        socket.emit('loadDataClient', JSON.stringify({test: 'test'}));
    });
});
server.listen(80, () => {
    console.log('Server listen 80 port');
});

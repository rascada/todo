import Io = require('socket.io-client');

export class SocketService {
    io = Io('http://localhost:7000');
}
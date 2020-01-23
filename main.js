// Require the serialport node module
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');
var PORT = 3000

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/1.mp3', function(req, res) {
    res.sendFile(path.join(__dirname + '/1.mp3'));
});
app.get('/text3.mp3', function(req, res) {
    res.sendFile(path.join(__dirname + '/text3.mp3'));
});
app.get('/EVA_PROJECTOR.mp4', function(req, res) {
    res.sendFile(path.join(__dirname + '/EVA_PROJECTOR.mp4'));
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('/eventFromFront', function(data){
        console.log('message: ' + data);
});

let eva = (answer) => {
    console.log(answer)
    if (answer == 'A person'){
        io.emit('/arduino/trigger', 1);
    }else if(answer == 'Bye person'){
        io.emit('/arduino/bye', 1);
    }else if( answer == 'Stand in the lightbeam'){
        io.emit('/arduino/please',1);
    }
}
let port = new SerialPort("COM5", {
    baudRate: 9600
});// Read the port data
const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
port.on("open", function () {
    console.log('open');
});
let bitsArray = [];
parser.on('data', function(data){
bitsArray.push(data);
eva(data);
})
    //receiving events
    
    //now emit event on connection, but move to serialport input
    //sending a trigger based on SerialPort input
});

http.listen(PORT, function(){
   console.log('listening on *:3000');
}); 
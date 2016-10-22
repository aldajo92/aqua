var com = require("serialport");
var PORT = "/dev/ttyACM0"
var EEm = require('events').EventEmitter;

var emitter = new EEm();

var serialPort = new com.SerialPort(PORT, {
    baudrate: 9600,
    parser: com.parsers.readline('\r\n')
});

serialPort.on('open',function() {
	console.log('Port open');
	emitter.on('fan', function(){
		serialPort.write('m'+'\n');
	});
});

serialPort.on('data', function(data) {
	console.log(data);
});

function open(){
	emitter.emit('fan');
}

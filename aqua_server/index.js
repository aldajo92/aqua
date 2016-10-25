'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

var com = require("serialport")
var EEm = require('events').EventEmitter
var emitter = new EEm()

const PORT = "/dev/ttyACM0"

var serialPort = new com(PORT, {
    baudrate: 9600,
    parser: com.parsers.readline('\r\n')
})

serialPort.on('open',function() {
	console.log('Port open')
	emitter.on('open', function(){
		serialPort.write('ON'+'\n')
	})
	emitter.on('close', function(){
		serialPort.write('OFF'+'\n')
	})
})

serialPort.on('data', function(data) {
	console.log(data);
});

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/hola/:name', (req, res) => {
	res.send({message: `${req.params.name}`})
	var response = req.params.name
	switch(response.toString()){
		case "open":
			openShower()
		break;
		case "close":
			closeShower()
		break;
	}
})

app.listen(3000, () => {
	console.log('API Working')
})

function openShower(){
	console.log("opening")
	emitter.emit('open');
}

function closeShower(){
	console.log("closing")
	emitter.emit('close');
}

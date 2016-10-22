'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

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
}

function closeShower(){
	console.log("closing")
}

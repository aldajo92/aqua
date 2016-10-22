'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/hola/:name', (req, res) => {
	res.send({message: `hola ${req.params.name}`})
})

app.listen(3000, () => {
	console.log('API Working')
})

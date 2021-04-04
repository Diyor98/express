const path = require('path')
const express = require('express')
const app = express()
const helmet = require('helmet')

app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

function validator(req, res, next) {
	res.locals.msg = 'Hi there'
	next()
}

app.use(validator)

app.get('/', (req, res, next) => {
	res.render('index', {
		msg1: 'message 1',
	})
})

// app.use(express.static('public'))

app.listen(3000)

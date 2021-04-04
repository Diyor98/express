const path = require('path')
const express = require('express')
const app = express()
const helmet = require('helmet')

app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

function validator(req, res, next) {
	res.locals.msg = 'Hi there'
	next()
}

app.use(validator)

app.use('/', (req, res, next) => {
	res.render('index', {
		msg1: 'message 1',
		countries: [
			{
				name: 'Russia',
				capital: 'Moscow',
				western: false,
			},
			{
				name: 'England',
				capital: 'London',
				western: true,
			},
		],
	})
})

// app.use(express.static('public'))

app.listen(3000)

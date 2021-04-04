const path = require('path')

const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')

const helmet = require('helmet')

app.use(helmet())

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use((req, res, next) => {
	if (req.query.msg === 'fail') {
		res.locals.msg = 'Sorry. This username and combination does not exist'
	} else {
		res.locals.msg = ''
	}
	next()
})

app.get('/', (req, res) => {
	res.send('Sanity check')
})

app.get('/login', (req, res, next) => {
	console.log(req.query)
	res.render('login')
})

app.post('/process_login', (req, res, next) => {
	const password = req.body.password
	const username = req.body.username

	if (password === 'x') {
		res.cookie('username', username)
		res.redirect('/welcome')
	} else {
		res.redirect('/login?msg=fail&test=hello')
	}
	// res.json(req.body)
})

app.get('/welcome', (req, res, next) => {
	res.render('welcome', {
		username: req.cookies.username,
	})
})

app.param('storyId', (req, res, next, storyId) => {
	console.log(storyId)
	next()
})

app.get('/story/:storyId', (req, res, next) => {
	res.send(`<h1>Story ${req.params.storyId} </h1>`)
})

app.get('/story/:storyId/:link', (req, res, next) => {
	res.send(`<h1>Story ${req.params.storyId} -- ${req.params.link}`)
})

app.get('/statement', (req, res, next) => {
	// res.download(path.join(__dirname, 'userStatements/BankStatementChequing.png'))
	// res.attachment(
	// 	path.join(__dirname, 'userStatements/BankStatementChequing.png')
	// )
	res.sendFile(path.join(__dirname, 'userStatements/BankStatementChequing.png'))
})

app.get('/logout', (req, res, next) => {
	res.clearCookie('username')
	res.redirect('/login')
})

app.listen(3000, () => {
	console.log('The server is running on port 3000')
})

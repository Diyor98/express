const path = require('path')
const express = require('express')
const app = express()

const helmet = require('helmet')

app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')

app.get('/tasks', (req, res, next) => {
	res.locals.msg = 'You new task'
	next()
})

app.use('/users', userRouter)
app.use('/tasks', taskRouter)

module.exports = app

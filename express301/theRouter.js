const express = require('express')
let router = express.Router()

router.get('/', (req, res, next) => {
	res.json({
		msg: 'Router works',
	})
})

router.get('/hello', (req, res, next) => {
	res.json({
		msg: 'Hello',
	})
})

module.exports = router

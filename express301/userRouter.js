const express = require('express')
const router = express.Router()

router.get('/register', (req, res, next) => {
	res.json({
		msg: 'Registered',
	})
})

module.exports = router

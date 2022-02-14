const req = require('express/lib/request')
const jwt = require('jsonwebtoken')

module.exports = function auth(req, res, next) {
	const authHeader = req.headers.authorization
	if (authHeader === undefined) return res.status(400).send({ "msg": "access denied" })
	// console.log(authHeader) // Bearer eyJhbGchM2M...
	const token = authHeader.split(" ")[1]
	if (!token) return res.status(400).send({ "msg": "access denied" })
	try {
		const verified = jwt.verify(token, process.env.JWT_SERVER_SECRET)
		req.user = verified
		next()
	} catch (error) {
		res.status(400).send({ "msg": "invalid token" })
	}
}
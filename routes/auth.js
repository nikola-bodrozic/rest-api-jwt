const router = require("express").Router()
const User = require("../model/User")
const Joi = require('@hapi/joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const schema = Joi
  .object({
    name: Joi.string().min(5).required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(5).required()
  })
  .options({
    abortEarly: false
  })

// match URL http://localhost:4001/api/user/register
router.post("/register", async (req, res) => {
  // validate data sent in HTTP body
  const validation = schema.validate(req.body);
  if (validation.error) return res.status(400).send({ "msg": validation.error.message })

  // if email exists
  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) return res.status(400).send({ "msg": `email ${req.body.email} already exists` })

  // salt and hash
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = await new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })

  try {
    const savedUser = await user.save()
    savedUser.password = undefined
    res.send(savedUser)
  } catch (err) {
    res.status(400).send(err)
  }

})

// match URL http://localhost:4001/api/user/login
router.post("/login", async (req, res) => {
  // TODO login validation

  // check credentials
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send({ "msg": "bad credentials" })
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send({ "msg": "bad credentials" })

  // put token in header
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SERVER_SECRET)
  res.header('Authorization', `Bearer ${token}`).send({ "msg": "token is in header" })
})

module.exports = router

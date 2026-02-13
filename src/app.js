const express = require('express')
const cooikeParser = require('cookie-parser')
const authRouter = require('./routes/auth.routes')

const app = express()


app.use(express.json())
app.use(cooikeParser())
app.use('/api/auth', authRouter)


module.exports = app
const express = require('express')
const cooikeParser = require('cookie-parser')

/**
 * Routes
 */
const authRouter = require('./routes/auth.routes')
const accountRouter = require('./routes/account.routes')

const app = express()
app.use(express.json())
app.use(cooikeParser())


/**
 * use routers
 */
app.use('/api/auth', authRouter)
app.use('/api/accounts', accountRouter)


module.exports = app
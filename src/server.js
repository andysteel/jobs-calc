const express = require('express')
const routes = require('./routes')
const server = express()

server.set('view engine', 'ejs')
server.use(express.static('public'))
server.use(routes)
const port = 3333

server.listen(port, console.log(`Server is Up and running on port ${port} ...`))

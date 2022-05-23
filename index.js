const socketCallbacks = require('./socketCallback.js')

const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
server.listen(5000)

app.get('/', function (req, res) {
    res.send('PSV Catering Backends')
})

io.on('connection', () => {});

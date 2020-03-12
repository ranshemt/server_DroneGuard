const fs = require('fs');
const {server} = require('./config')
const io_stream = require('socket.io').listen(server)
const ss = require('socket.io-stream')

io_stream.of('/user').on('connection', socket => {
    console.log('stream socket connection')
    ss(socket).on('stream', stream => {
        fs.createReadStream('/video/video-stream.h264').pipe(stream)
        //stream.pipe(fs.createWriteStream('/video/video-stream.h264'))
    })
})
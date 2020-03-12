const fs = require('fs');
const {server} = require('./config')
const io_stream = require('socket.io').listen(server)
const ss = require('socket.io-stream')

io_stream.of('/user').on('connection', socket => {
    console.log('stream socket connection')
    ss(socket).on('stream', stream => {
        console.log('readStream will be crated')
        fs.createReadStream('/video/video-stream.h264').pipe(stream)
        console.log('readStream created')
        //stream.pipe(fs.createWriteStream('/video/video-stream.h264'))
    })
})
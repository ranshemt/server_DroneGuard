const fs = require('fs');
const {server} = require('./config')
const io_stream = require('socket.io').listen(server)
const ss = require('socket.io-stream')

io_stream.of('/user').on('connection', socket => {
    console.log('stream socket connection')
    ss(socket).on('stream', stream => {
        try {
            const readStream = fs.createReadStream(`${__dirname}/video/video-stream.h264`)
            readStream.pipe(stream)
        } catch (error) {
            console.log(`error creating read stream: ${error.hasOwnProperty('message') ? error.message : error}`)  
        }
        //fs.createReadStream('/video/video-stream.h264').pipe(stream)
        //stream.pipe(fs.createWriteStream('/video/video-stream.h264'))
    })
})
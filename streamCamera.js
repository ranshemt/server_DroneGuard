const fs = require('fs')
const { StreamCamera, Codec } = require("pi-camera-connect");

const streamFunction = async () => {
  const streamCamera = new StreamCamera({
    codec: Codec.H264
  });
  
  const videoStream = streamCamera.createStream();
  const writeStream = fs.createWriteStream("/video/video-stream.h264");
  
  
  videoStream.pipe(writeStream);

  await streamCamera.startCapture();
 
    // We can also listen to data events as they arrive
    videoStream.on("data", data => console.log("New data", data));
    videoStream.on("end", data => console.log("Video stream has ended"));
 
    // Wait for 5 seconds
    await new Promise(resolve => setTimeout(() => resolve(), 5000));
 
    await streamCamera.stopCapture();
}

streamFunction();

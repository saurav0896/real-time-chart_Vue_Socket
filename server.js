const express = require("express");
const app = express();
// const cors = require('cors');
const port = 4000;

    
const server = app.listen(`${port}`, function() {
  console.log(`Server started on port ${port}`);
});

const io = require("socket.io")(server, {
    cors: {
      origin: '*',
    }
  });

function getRandomValue(){
    return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
}
function getCurrentTime(){
    let date = new Date().getTime();
    return date
}
io.on("connection", socket => {
    console.log("Socket Connected....");
    setInterval(() => {
        socket.emit("line1", getRandomValue(), getCurrentTime())
        socket.emit("line2", getRandomValue())
    }, 2000)
});
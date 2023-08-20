const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const allRoutes = require('./routes/index.js');
const cookieParser = require('cookie-parser');

require('dotenv').config();
/*
  use the same app object from express to handle both regular HTTP requests 
  and WebSocket connections by integrating socket.io directly with the app object.
  By doing this, we are using the same app object to handle both regular 
  HTTP requests and WebSocket connections via socket.io, 
  making our code more concise and efficient. 
*/

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('Welcome to the Sone Study App API!');
});

// Routes
app.use('/api', allRoutes); 
/* Whenever we want to access the backend through
   the frontend use this endpoint format: 
   "/api/<model>/<typeofReuqest, ex: getallTasks>"
*/

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

  const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: ["https://sone-study-app-d94f4d443349.herokuapp.com/"],
  },
});

io.on('connection',(socket)=>{
  socket.on("joined room",(roomCode)=>{
    socket.join(roomCode)
    console.log("User Joined Room: " + roomCode);
  })
  socket.on("new message",(newMessageRecieved)=>{
    socket.to(newMessageRecieved.room._id).emit("message received", newMessageRecieved);
  })
})
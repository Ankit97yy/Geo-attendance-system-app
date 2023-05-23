const express = require("express");
const app = require("express")();
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");
const authRoutes = require("./routes/authRoutes.js");
const empRoutes = require("./routes/empRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const branchRoutes = require("./routes/branchRoutes");
const multer = require("multer");
const { verifyToken } = require("./middleware/verifyToken.js");
const upload = multer({
  dest: "/home/ankit/codes/geo_attendance_system_app/server",
});

app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use(express.static(path.join(__dirname, "uploads")));
app.use(verifyToken);
app.use("/employee", empRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/leave", leaveRoutes);
app.use("/branch", branchRoutes);

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("connected socket", socket.id);
  socket.on("test",(data)=>{
    console.log(data,"passed")
    io.volatile.emit("NOTIFY","notify")
  })
  socket.on("APPLY_LEAVE",(data)=>{
    console.log(data,"leave")
    io.volatile.emit("REFRESH_LEAVE","test")

  })
  socket.on("MARK_ATTENDANCE",(data)=>{
    console.log(data,"attendance")
    io.volatile.emit("ATTENDANCE_RECIEVED","test")

  })
});

app.get("/lol", (req, res) => {
  res.send("hello");
});

httpServer.listen(3001, () => console.log("connceted"));

const express = require("express");
const cors = require("cors");
const path = require('path');
const authRoutes = require("./routes/authRoutes.js");
const empRoutes = require("./routes/empRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const branchRoutes = require("./routes/branchRoutes");
const multer = require("multer");
const { verifyToken } = require("./middleware/verifyToken.js");
const upload = multer({ dest: "/home/ankit/codes/geo_attendance_system_app/server" });

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use(express.static(path.join(__dirname,'uploads')));
app.use(verifyToken)
app.use("/employee", empRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/leave", leaveRoutes);
app.use("/branch", branchRoutes);



app.listen(3001, () => {
  console.log("3001 ot huni asu.....");
});

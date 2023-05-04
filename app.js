const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(cors());

// Route imports

const technology = require("./routes/technoRoute");
const user = require("./routes/userRoute");
const project = require("./routes/projectRoute");
const taskList = require("./routes/taskListRoute");

app.use("/api/v1", technology);
app.use("/api/v1", user);
app.use("/api/v1", project);
app.use("/api/v1", taskList);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;

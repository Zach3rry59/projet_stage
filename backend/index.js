const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config("/.env");
const app = express();
const port = 3002;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

const usersRoute = require("./routes/usersRoute.js");
app.use("/users", usersRoute);
const citiesRoute = require("./routes/cititesRoute.js");
app.use("/cities", citiesRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config("/.env");
const app = express();
const port = 3002;
const socket = require("./socket");
const axios = require("axios");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/search", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api-adresse.data.gouv.fr/search/?q=${req.query.q}&type=municipality`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const usersRoute = require("./routes/usersRoute.js");
app.use("/users", usersRoute);
const citiesRoute = require("./routes/cititesRoute.js");
app.use("/cities", citiesRoute);
const centersRoute = require("./routes/centersRoute.js");
app.use("/centers", centersRoute);
const roomsRoute = require("./routes/roomsRoute.js");
app.use("/rooms", roomsRoute);
const keysRoute = require("./routes/keysRoute.js");
app.use("/keys", keysRoute);
const employeesRoute = require("./routes/employeesRoute.js");

app.use("/employees", employeesRoute);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

socket.connect(server);

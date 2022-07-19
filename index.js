const express = require("express");
const cors = require("cors");

const app = express();

// CORS
// var corsOptions = {
//   origin: "http://localhost:8082"
// };

app.use(cors());


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Attendance App." });
});

// routing
const routes = require('./routes')
app.use(routes) 


// set port, listen for requests
const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
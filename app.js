const express = require("express");
const app = express();
const path = require("path");

const port = 8080;

// Set the view engine to EJS
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static("public"));

// Routes
const indexRoutes = require("./routes/index");

app.get("/", indexRoutes);

// Start the server
app.listen(port, function () {
	console.log(`Server is running at http://localhost:${port}`);
});

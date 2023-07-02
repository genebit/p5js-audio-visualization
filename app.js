const express = require("express");
const app = express();
const path = require("path");

// Get the port from the environment variable or use a default value
const port = process.env.PORT || 8080;

// Set the view engine to EJS
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static("public"));
app.use("/vendors", express.static("public/vendors"));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

// Routes
const indexRoutes = require("./routes/index");

app.get("/", indexRoutes);

// Start the server
app.listen(port, function () {
	console.log(`Server is running at http://localhost:${port}`);
});

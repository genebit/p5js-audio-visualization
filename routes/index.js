const express = require("express");
const router = express.Router();

// Route handler for the home page
router.get("/", function (req, res) {
	res.render("index");
});

module.exports = router;

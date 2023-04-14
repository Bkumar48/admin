const express = require("express");
const { createThread } = require("../Controllers/ThreadController");
const { authMiddleware } = require("../Middleware/authMiddleware");
const router = express.Router();
router.post("/createThread", authMiddleware, createThread);
module.exports = router;

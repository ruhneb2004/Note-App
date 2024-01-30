const express = require("express");

// !may throw an error if so change it into module exports
const router = express.Router();
const userRouter = require("./user");
const noteRouter = require("./notes");
router.use("/user", userRouter);
router.use("/notes", noteRouter);
module.exports = router;

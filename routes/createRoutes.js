const express = require("express");
const createController = require("../controller/createContoller");
const router = express.Router();

router.post("/addBooks", createController.addBooks);

router.post("/addImage", createController.addImage);

module.exports = router;

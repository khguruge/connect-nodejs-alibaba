var express = require("express");
var router = express.Router();
const fileController = require("./alibaba.controller");

router.post("/api/alibaba/file/upload", fileController.uploadAlibaba);
router.get("/api/alibaba/file/download/:filename", fileController.downloadAlibaba);

module.exports = router;

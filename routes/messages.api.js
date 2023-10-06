const express = require("express");
const meaasgeController = require("../controller/message.controller");
const router = express.Router();

router.post("/", meaasgeController.createMessage);
router.get("/:conversationId", meaasgeController.getMessages);
router.get("/last/:conversationId", meaasgeController.getLastMessages);

module.exports = router;

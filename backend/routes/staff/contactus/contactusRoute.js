const express = require("express");
const router = express.Router();
const contactUsController = require("../../../controller/contactusController");

router.post("/sendmessage", contactUsController.add_message);
router.get("/all", contactUsController.message_list);
router.put("/:id", contactUsController.archive);
router.put("/read/:id", contactUsController.read);
router.get("/nom", contactUsController.numberOfMessages);

module.exports = router;

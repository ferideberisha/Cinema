const express = require("express");
const router = express.Router();
const userController = require("../../controller/userController");

router.post("/register", userController.user_register);
router.post("/login", userController.user_login);
router.get("/all", userController.user_list);
router.get("/:id", userController.user_get);

router.delete("/:id", userController.user_delete);

router.put("/:id", userController.user_update);

module.exports = router;

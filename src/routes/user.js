const express = require("express");
const { register, login } = require("../controllers");
const router = express.Router();

const { validateRegister, validateLogin } = require("../common/validators");

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login )

module.exports = router ;

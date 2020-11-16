"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/point-controller");
const authService = require("../services/auth-service");

router.post("/", authService.authorize, controller.post);
router.get("/:id", authService.authorize, controller.getByUserId);

module.exports = router;

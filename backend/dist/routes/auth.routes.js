"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// @ts-ignore
router.post('/register', auth_controller_1.registerUser);
// @ts-ignore
router.post('/login', auth_controller_1.loginUser);
// @ts-ignore
router.get('/profile', auth_middleware_1.protect, auth_controller_1.getUserProfile);
// @ts-ignore
router.post('/forgot-password', auth_controller_1.forgotPassword);
// @ts-ignore
router.post('/reset-password', auth_controller_1.resetPassword);
exports.default = router;

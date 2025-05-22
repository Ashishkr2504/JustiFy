"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/blog.routes.ts
const express_1 = require("express");
const blog_controller_1 = require("../controllers/blog.controller");
const router = (0, express_1.Router)();
router.get('/latest', blog_controller_1.getLatestBlogs);
exports.default = router;

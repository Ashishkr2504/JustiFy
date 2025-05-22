"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const documentSearch_controller_1 = require("../controllers/documentSearch.controller");
const router = (0, express_1.Router)();
router.post('/search', documentSearch_controller_1.searchDocuments);
exports.default = router;

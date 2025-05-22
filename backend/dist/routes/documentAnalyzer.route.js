"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/documentAnalyzer.route.ts
const express_1 = __importDefault(require("express"));
const documentAnalyzer_controller_1 = require("../controllers/documentAnalyzer.controller");
const router = express_1.default.Router();
router.post('/analyze', documentAnalyzer_controller_1.analyzeDocument);
exports.default = router;

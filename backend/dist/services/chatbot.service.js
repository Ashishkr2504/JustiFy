"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChatQuery = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const handleChatQuery = (question, userId) => {
    return new Promise((resolve, reject) => {
        const pythonScript = path_1.default.join(__dirname, '../../ml_model/semantic_search.py');
        const cmd = `python "${pythonScript}" "${question}"`;
        (0, child_process_1.exec)(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error('Python error:', stderr);
                return reject('Error processing query.');
            }
            return resolve(stdout.trim());
        });
    });
};
exports.handleChatQuery = handleChatQuery;

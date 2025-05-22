"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTemplate = void 0;
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const html_pdf_1 = __importDefault(require("html-pdf"));
const generateTemplate = async (req, res) => {
    const { type, data } = req.body;
    const templatePath = path_1.default.join(__dirname, '../../templates', `${type}.ejs`);
    try {
        const html = await ejs_1.default.renderFile(templatePath, data);
        html_pdf_1.default.create(html).toBuffer((err, buffer) => {
            if (err)
                return res.status(500).json({ message: 'PDF generation failed' });
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=${type}.pdf`,
            });
            res.send(buffer);
        });
    }
    catch (err) {
        res.status(400).json({ message: 'Template rendering failed', error: err });
    }
};
exports.generateTemplate = generateTemplate;

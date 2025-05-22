"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactMessage = void 0;
const sendMail_1 = require("../utils/sendMail"); // ✅ correct import
const sendContactMessage = async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        await (0, sendMail_1.sendMail)({ name, email, subject: "Contact Form", message }); // ✅ pass subject
        res.status(200).json({ message: 'Your message has been sent successfully.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send message. Please try again later.' });
    }
};
exports.sendContactMessage = sendContactMessage;

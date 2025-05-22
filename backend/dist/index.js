"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const chatbot_routes_1 = __importDefault(require("./routes/chatbot.routes"));
const contact_routes_1 = __importDefault(require("./routes/contact.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const blog_routes_1 = __importDefault(require("./routes/blog.routes"));
const template_routes_1 = __importDefault(require("./routes/template.routes"));
const documentAnalyzer_route_1 = __importDefault(require("./routes/documentAnalyzer.route"));
const documentSearch_route_1 = __importDefault(require("./routes/documentSearch.route"));
const caseTracker_route_1 = __importDefault(require("./routes/caseTracker.route"));
const translate_route_1 = __importDefault(require("./routes/translate.route"));
// import locationRoutes from './routes/location.routes';
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/chatbot', chatbot_routes_1.default);
app.use('/api/contact', contact_routes_1.default);
app.use('/api/blogs', blog_routes_1.default);
app.use('/api/templates', template_routes_1.default);
app.use('/api/document', documentAnalyzer_route_1.default);
app.use('/api/document', documentSearch_route_1.default);
app.use("/api/casetracker", caseTracker_route_1.default);
app.use('/api/translate', translate_route_1.default);
// app.use('/api/location', locationRoutes);
// Error middleware
app.use(error_middleware_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Home page');
});
(0, db_1.connectDB)().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
});

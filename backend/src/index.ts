import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/auth.routes';
import chatbotRoutes from './routes/chatbot.routes';
import contactRoutes from './routes/contact.routes';
import { errorHandler } from './middlewares/error.middleware';
import blogRoutes from './routes/blog.routes';
import templateRoutes from './routes/template.routes';
import documentAnalyzerRoutes from './routes/documentAnalyzer.route';
import documentSearchRoutes from './routes/documentSearch.route';
import caseTrackerRoute from "./routes/caseTrackerRoute";


// import locationRoutes from './routes/location.routes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/document', documentAnalyzerRoutes);
app.use('/api/document', documentSearchRoutes);
app.use("/api/casetracker", caseTrackerRoute);

// app.use('/api/location', locationRoutes);

// Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Home page');  
})

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

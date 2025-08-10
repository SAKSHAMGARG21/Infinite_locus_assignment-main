// backend/index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';

dotenv.config({});
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN, // frontend origin
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(cors(
  {
    origin: process.env.CORS_ORIGIN, // frontend origin
    credentials: true
  }
));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes(io));

// Connect MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error(err));

export { io };

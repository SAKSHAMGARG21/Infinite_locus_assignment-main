import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin:process.env.CORS,
    methods: ["GET", "POST"]
  }
});

app.use(bodyParser.json());
app.use(cors({
  origin:process.env.CORS,
  credentials:true}
));

mongoose.connect(process.env.DATABASE_URL);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

global.io = io;

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

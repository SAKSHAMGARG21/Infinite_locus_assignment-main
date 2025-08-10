// src/socket.js
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BASE_URL); // same as backend origin

export default socket;

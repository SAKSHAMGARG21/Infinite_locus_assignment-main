import express from 'express';
import jwt from 'jsonwebtoken';
import Event from '../models/Event.js';

const router = express.Router();

const verify = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(403).json({ message: 'Invalid token' });
    }
};

const eventRoutes = (io) => {
    // Get all events
    router.get('/', async (req, res) => {
        const events = await Event.find();
        res.json(events);
    });

    // Create event (organizer only)
    router.post('/', verify, async (req, res) => {
    try {
      if (req.user.role !== 'organizer') return res.status(403).json({ message: 'Only organizers can create events' });
      const {
        title,
        description,
        location,
        date,
        time,
        registrationDeadline,
        maxCapacity
      } = req.body;
      console.log('Create event request body:', req.body);
      const event = await Event.create({
        title,
        description,
        location,
        date,
        time,
        registrationDeadline,
        maxCapacity,
        createdBy: req.user.id,
        registeredUsers: []
      });
      res.json(event);
    } catch (err) {
      console.error('Event creation error:', err);
      res.status(500).json({ message: 'Event creation failed' });
    }
    });

    // Get event by ID
    router.get('/:id', async (req, res) => {
        const event = await Event.findById(req.params.id);
        res.json(event);
    });

    // Register for event
    router.post('/:id/register', verify, async (req, res) => {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        if (event.registeredUsers.includes(req.user.id)) return res.status(400).json({ message: 'Already registered' });
        if (event.registeredUsers.length >= event.maxCapacity) return res.status(400).json({ message: 'Event is full' });

        event.registeredUsers.push(req.user.id);
        await event.save();
        io.emit('registrationUpdate', { title: event.title, count: event.registeredUsers.length });
        res.json({ message: 'Registered successfully' });
    });

    return router;
};

export default eventRoutes;
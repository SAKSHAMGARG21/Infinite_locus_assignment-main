import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

router.post('/signup', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        console.log(username);
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({
            username,
            password,
            role
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };
        jwt.sign(
            payload,
            'secret',
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

export default router;

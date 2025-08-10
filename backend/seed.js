// backend/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from './models/Event.js';
import User from './models/User.js';

dotenv.config();
(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({ role: 'organizer' }).then(user => user._id);
  if (!user) {
    console.error('No organizer found. Please create an organizer user first.');
    process.exit(1);
  }
  const sampleEvents = [
    {
      title: "React Workshop",
      location: "Tech Center, Gurugram",
      description: "Hands-on workshop covering basics of React.js.",
      date: new Date("2025-08-15T10:00:00.000Z"),
      createdBy: user._id,
      participants: []
    },
    {
      title: "Tech Talk: Future of AI",
      location: "Tech Hub, Bengaluru",
      description: "Join us for a deep dive into AI trends and forecasts.",
      date: new Date("2025-08-20T14:00:00.000Z"),
      createdBy: user._id,
      participants: []
    },
    {
      title: "Hackathon 2025",
      location: "Tech Park Auditorium,Bengaluru",
      description: "48-hour coding competition. Form a team and build something amazing!",
      date: new Date("2025-08-30T09:00:00.000Z"),
      createdBy: user._id,
      participants: []
    }
  ];
  const seedDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      await Event.deleteMany(); // Optional: clear existing events
      await Event.insertMany(sampleEvents);
      console.log("✅ Sample events inserted");
      process.exit();
    } catch (err) {
      console.error("❌ Seeding failed:", err);
      process.exit(1);
    }
  };

  seedDB();
})();

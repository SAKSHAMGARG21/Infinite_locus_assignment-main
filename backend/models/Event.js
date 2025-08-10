import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  date: Date,
  time: String,
  registrationDeadline: Date,
  maxCapacity: { type: Number, default: 1 },
  createdBy: String,
  registeredUsers: [String]
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
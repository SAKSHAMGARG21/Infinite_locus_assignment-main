import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [registrationDeadline, setRegistrationDeadline] = useState('');
  const [maxCapacity, setMaxCapacity] = useState(1);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const axios = (await import('../utils/axios.js')).default;
      await axios.post('/events', { title, description, location, date, time, registrationDeadline, maxCapacity }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Event creation failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl border-2 border-blue-200">
        <h2 className="text-3xl font-extrabold text-center text-pink-600 mb-6">Create New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900 placeholder-gray-500" />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900 placeholder-gray-500" />
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900 placeholder-gray-500" />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900" />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900" />
          <input type="datetime-local" placeholder="Registration Deadline" value={registrationDeadline} onChange={(e) => setRegistrationDeadline(e.target.value)} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900 placeholder-gray-500" />
          <input type="number" min="1" placeholder="Max Capacity" value={maxCapacity} onChange={(e) => setMaxCapacity(e.target.value)} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900 placeholder-gray-500" />
          <button type="submit" className="w-full bg-gradient-to-r from-pink-600 via-purple-600 to-blue-700 text-white font-bold py-3 rounded-lg shadow hover:scale-105 transition duration-200">Create Event</button>
          {error && <p className="text-red-600 text-center font-semibold mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;

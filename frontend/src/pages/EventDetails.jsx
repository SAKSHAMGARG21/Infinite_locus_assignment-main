import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const handleRegister = async () => {
    try {
      const axios = (await import("../utils/axios.js")).default;
      await axios.post(
        `/events/${id}/register`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setIsRegistered(true);
      setMessage("Successfully registered!");
    } catch (err) {
      setMessage(
        err.response?.data?.message || err.message || "Registration failed"
      );
    }
  };
  useEffect(() => {
    const fetchEvent = async () => {
      const axios = (await import("../utils/axios.js")).default;
      const res = await axios.get(`/events/${id}`);
      setEvent(res.data);
      setIsRegistered(res.data.registeredUsers.includes(user?._id));
    };
    fetchEvent();
  }, [id, user?._id, handleRegister]);


  if (!event) return <p className="p-4">Loading event details...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center py-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl border-2 border-purple-200">
        <h2 className="text-3xl font-extrabold text-pink-600 mb-2">
          {event.title}
        </h2>
        <p className="text-gray-600 mb-2 text-lg font-semibold">
          {new Date(event.date).toLocaleString()}
        </p>
        <p className="mb-2 text-gray-700">{event.description}</p>
        <p className="mb-2 font-medium text-blue-700">
          Location: {event.location}
        </p>
        <p className="mb-4 text-sm text-gray-500">
          Capacity: {event.registeredUsers.length} / {event.maxCapacity}
        </p>

        {user && user.role === "user" && !isRegistered && (
          <button
            onClick={handleRegister}
            className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-bold shadow hover:scale-105 transition duration-200"
          >
            Register
          </button>
        )}
        {user && user.role === "user" && isRegistered && (
          <p className="text-green-700 font-semibold">
            You are registered for this event.
          </p>
        )}
        {message && (
          <p className="mt-2 text-red-600 font-semibold">{message}</p>
        )}
      </div>
    </div>
  );
};

export default EventDetails;

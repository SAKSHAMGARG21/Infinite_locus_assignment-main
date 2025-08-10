import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import socket from "../socket.js";

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const axios = (await import("../utils/axios.js")).default;
      const res = await axios.get("/events");
      setEvents(res.data);
    };
    fetchEvents();
    socket.on("registrationUpdate", (data) => {
      // console.log("Live update:", data);
      fetchEvents();
    });
    // return () => socket.off("registrationUpdate");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-8">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-10 drop-shadow-lg">
        Upcoming Events
      </h1>
      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : null}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {events.map((event) => (
          <Link
            to={`/event/${event._id}`}
            key={event._id}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition duration-200 p-6 flex flex-col justify-between border-2 border-transparent hover:border-blue-400"
          >
            <h3 className="text-2xl font-bold text-purple-700 mb-2">
              {event.title}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              {new Date(event.date).toLocaleString()}
            </p>
            <p className="mb-2 text-gray-700">
              {event.description.slice(0, 100)}...
            </p>
            <p className="text-sm text-blue-600 font-semibold mb-2">
              Location: {event.location}
            </p>
            <div className="flex justify-between items-center mt-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                Capacity: {event.registeredUsers.length} / {event.maxCapacity}
              </span>
              <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-bold">
                Details
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

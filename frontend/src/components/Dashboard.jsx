import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import conf from "../conf/conf";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState({});
  const [eventDate, setEventDate] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      setUser(currentUser);
    }
    fetchEvents();

    socketRef.current = io(conf.skurl);

    socketRef.current.on("registrations", (data) => {
      setRegistrations((prev) => ({ ...prev, [data.eventId]: data.count }));
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${conf.bkurl}/events`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  const handleCreateEvent = async (event) => {
    event.preventDefault();
    const { name, description, location } = event.target.elements;
    try {
      await axios.post(
        `${conf.bkurl}/events`,
        {
          name: name.value,
          description: description.value,
          date: eventDate,
          location: location.value,
        },
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      fetchEvents();
    } catch (error) {
      console.error("Failed to create event", error);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      await axios.post(
        `${conf.bkurl}/events/${eventId}/register`,
        {},
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
    } catch (error) {
      console.error("Failed to register for event", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex flex-col items-center py-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">
          Dashboard
        </h2>
        {user && (
          <p className="mb-4 text-lg text-gray-700 text-center">
            Welcome, <span className="font-semibold">{user.username}</span>
          </p>
        )}
        {user && user.role === "ORGANIZER" && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-600 mb-4">
              Create Event
            </h3>
            <form onSubmit={handleCreateEvent} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Event Name"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400  text-black "
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400  text-black"
              />
              <input
                type="date"
                name="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400  text-black"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400  text-black"
              />
              <button
                type="submit"
                className="py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
              >
                Create
              </button>
            </form>
          </div>
        )}
        <h3 className="text-xl font-bold text-blue-600 mb-4">Events</h3>
        <ul className="space-y-4">
          {(Array.isArray(events) ? events : []).map((event) => (
            <li
              key={event._id}
              className="bg-blue-50 rounded-lg p-4 shadow flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div>
                <span className="font-semibold text-blue-800">
                  {event.name}
                </span>{" "}
                - {event.description} <br />
                <span className="text-sm text-gray-600">
                  {event.date} | {event.location}
                </span>
                <div className="text-sm text-gray-700 mt-1">
                  Registrations:{" "}
                  <span className="font-bold">
                    {registrations[event._id] || 0}
                  </span>
                </div>
              </div>
              {user && user.role === "USER" && (
                <button
                  onClick={() => handleRegister(event._id)}
                  className="mt-2 md:mt-0 py-2 px-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
                >
                  Register
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

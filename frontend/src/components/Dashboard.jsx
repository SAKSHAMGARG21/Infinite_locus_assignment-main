import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState({});
  const socketRef = useRef(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      setUser(currentUser);
    }
    fetchEvents();

    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("registrations", (data) => {
      setRegistrations((prev) => ({ ...prev, [data.eventId]: data.count }));
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/events", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  const handleCreateEvent = async (event) => {
    event.preventDefault();
    const { name, description, date, location } = event.target.elements;
    try {
      await axios.post(
        "/api/events",
        {
          name: name.value,
          description: description.value,
          date: date.value,
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
        `/api/events/${eventId}/register`,
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
    <div>
      <h2>Dashboard</h2>
      {user && <p>Welcome, {user.username}</p>}
      {user && user.role === "ORGANIZER" && (
        <div>
          <h3>Create Event</h3>
          <form onSubmit={handleCreateEvent}>
            <input type="text" name="name" placeholder="Event Name" />
            <input type="text" name="description" placeholder="Description" />
            <input type="date" name="date" />
            <input type="text" name="location" placeholder="Location" />
            <button type="submit">Create</button>
          </form>
        </div>
      )}
      <h3>Events</h3>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            {event.name} - {event.description} - {event.date} - {event.location}
            (Registrations: {registrations[event._id] || 0})
            {user && user.role === "USER" && (
              <button onClick={() => handleRegister(event._id)}>Register</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

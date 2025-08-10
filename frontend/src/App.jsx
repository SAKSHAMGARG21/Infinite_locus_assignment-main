import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";
import Navbar from "./components/Navbar";
import socket from "./socket.js";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [registrationUpdate, setRegistrationUpdate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");

  useEffect(() => {
    socket.on("registrationUpdate", async (data) => {
      console.log("Live update:", data);
      setRegistrationUpdate(data);
      setEventTitle(data.title);
      // Auto-hide notification after 3 seconds
      setTimeout(() => {
        setRegistrationUpdate(null);
        setEventTitle("");
      }, 3000);
    });
    return () => socket.off("registrationUpdate");
  }, []);

  return (
    <>
      <Navbar />
      {registrationUpdate && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
          Event registration updated!<br />
          <span className="font-bold">Event:</span> {eventTitle || registrationUpdate.eventId}<br />
          <span className="font-bold">Registered:</span> {registrationUpdate.count}
        </div>
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/event/create" element={<CreateEvent />} />
        <Route path="/event/:id" element={<EventDetails />} />
      </Routes>
    </>
  );
};

export default App;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import conf from "../conf/conf";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log(conf.bkurl);
      await axios.post(`${conf.bkurl}/auth/signup`, {
        username,
        password,
        role,
      });
      navigate("/login");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Signup</h2>
      <form
        onSubmit={handleSignup}
        className="flex flex-col gap-4 p-8 bg-white rounded-lg shadow-md w-full max-w-sm"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="USER">User</option>
          <option value="ORGANIZER">Organizer</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;

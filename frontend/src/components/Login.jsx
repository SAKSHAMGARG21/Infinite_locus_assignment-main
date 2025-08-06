import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import conf from "../conf/conf";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${conf.bkurl}/auth/signin`, {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Login</h2>
      <form
        onSubmit={handleLogin}
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
        <button
          type="submit"
          className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-gray-600">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;

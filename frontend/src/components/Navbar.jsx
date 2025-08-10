import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="w-full px-8 py-4 flex justify-between items-center bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 shadow-lg">
      <Link
        to="/dashboard"
        className="font-extrabold text-2xl text-white tracking-wide hover:text-yellow-300 transition duration-200"
      >
        <span className="inline-block align-middle mr-2">
          {/* Unique, attractive logo icon */}
          <svg
            width="36"
            height="36"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="url(#grad1)"
              stroke="#fff"
              strokeWidth="2"
            />
            <path
              d="M24 14L28.5 28H19.5L24 14Z"
              fill="#fff"
              stroke="#fff"
              strokeWidth="1.5"
            />
            <circle cx="24" cy="34" r="2.5" fill="#fff" />
            <defs>
              <linearGradient
                id="grad1"
                x1="0"
                y1="0"
                x2="48"
                y2="48"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ff6a00" />
                <stop offset="0.5" stopColor="#ee0979" />
                <stop offset="1" stopColor="#43cea2" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        EventDash
      </Link>
      <div className="flex gap-6 items-center">
        {user?.role === "organizer" && (
          <Link
            to="/event/create"
            className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold shadow hover:bg-yellow-300 transition duration-200"
          >
            + Create Event
          </Link>
        )}
        {user ? (
          <>
            <div className="flex items-center gap-3">
              <span className="bg-white text-blue-700 rounded-full px-3 py-1 font-bold shadow">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </span>
              <span className="hidden sm:inline text-white font-medium">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="ml-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition duration-200"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-neutral-200 transition duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-pink-600 px-4 py-2 rounded-lg font-semibold shadow hover:bg-neutral-200 transition duration-200"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { usePoints } from "../context/PointsContext";

const Navbar = () => {
  const { token } = useAuth();
  const { points } = usePoints();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!token) return null;

  return (
    <nav className="bg-white shadow fixed top-0 left-0 right-0 z-10 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">🎁 Rewards App</h1>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm font-medium text-gray-700 hover:text-indigo-600 focus:outline-none"
        >
          Points: {points !== null ? points : "—"} ⏷
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-20">
            <Link
              to="/rewards"
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Rewards
            </Link>
            <Link
              to="/redemptions"
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Redemptions
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

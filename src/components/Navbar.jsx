import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("spotifyUser");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("spotifyUser");
    setUser(null);
    setShowDropdown(false);
    navigate('/login'); // ⬅️ React Router navigate
  };

  const handleLogin = () => {
    navigate('/login'); // ⬅️ React Router navigate
  };

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img 
            onClick={() => navigate(-1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer hover:scale-105 transition"
            src={assets.arrow_left}
            alt="back"
          />
          <img 
            onClick={() => navigate(1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer hover:scale-105 transition"
            src={assets.arrow_right}
            alt="forward"
          />
        </div>

        <div className="flex items-center gap-4">
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer hover:scale-105 transition">
            Explore Premium
          </p>
          <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer hover:scale-105 transition">
            Install App
          </p>

          {user ? (
            <div className="relative">
              <div 
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-purple-500 text-black w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition font-bold"
              >
                {user.name[0].toUpperCase()}
              </div>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-[#282828] rounded-md shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-sm text-white font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm text-left text-white hover:bg-[#3e3e3e] transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-white text-black px-4 py-1 rounded-2xl text-[15px] cursor-pointer hover:scale-105 transition font-semibold"
            >
              Login
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer hover:scale-105 transition">All</p>
        <p className="bg-[#242424] px-4 py-1 rounded-2xl cursor-pointer hover:bg-[#333] transition">Music</p>
        <p className="bg-[#242424] px-4 py-1 rounded-2xl cursor-pointer hover:bg-[#333] transition">Podcasts</p>
      </div>
    </>
  );
};

export default Navbar;
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";

/**
 * Navbar SADECE UI-dir
 * activeTab və setActiveTab yuxarıdan (DisplayHome) gəlir
 * onInstallAppClick - Install App buttonuna klik funksiyası
 */
const Navbar = ({ activeTab, setActiveTab, onInstallAppClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // User-i localStorage-dan oxu
  useEffect(() => {
    const userData = localStorage.getItem("spotifyUser");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Logout
  const handleLogout = () => {
    // 1️⃣ localStorage sil
    localStorage.removeItem("spotifyUser");

    // 🔥 2️⃣ REACT STATE-i də sil (ƏSAS HİSSƏ)
    setUser(null);
    setShowDropdown(false);

    // 3️⃣ audio tam stop
    const audio = document.querySelector("audio");
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = "";
    }

    // 4️⃣ home-da qal
    navigate("/");
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="w-full flex justify-between items-center font-semibold">
        {/* BACK / FORWARD */}
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

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Explore Premium
          </p>

          {/* INSTALL APP BUTTON - DisplayInstallApp göstərir */}
          <button
            onClick={onInstallAppClick}
            className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer hover:scale-105 transition"
          >
            Install App
          </button>

          {/* USER */}
          {user ? (
            <div className="relative">
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-purple-500 text-black w-8 h-8 rounded-full flex items-center justify-center cursor-pointer font-bold"
              >
                {user.name[0].toUpperCase()}
              </div>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-[#282828] rounded-md shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-sm text-white font-semibold">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm text-left text-white hover:bg-[#3e3e3e]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-black px-4 py-1 rounded-2xl text-[15px] font-semibold"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* HOME FILTER TABS — yalnız HOME-da */}
      {location.pathname === "/" && (
        <div className="flex items-center gap-2 mt-4">
          {["all", "music", "podcasts"].map(tab => (
            <p
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-4 py-1 rounded-2xl cursor-pointer transition
                ${
                  activeTab === tab
                    ? "bg-white text-black"
                    : "bg-[#242424] hover:bg-[#333]"
                }
              `}
            >
              {tab === "all"
                ? "All"
                : tab === "music"
                ? "Music"
                : "Podcasts"}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar; 

import { assets } from "../assets/assets";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-[25%] h-full p-2 hidden lg:flex flex-col gap-2 text-white">

      {/* LOGO */}
      <div className="flex items-center gap-3 pl-6 py-4 cursor-pointer">
        <img className="w-8" src={assets.spotify_logo} alt="Logo" />
      </div>

      {/* HOME + SEARCH */}
      <div className="bg-[#121212] rounded flex flex-col gap-4 py-4">

        {/* HOME */}
       <div
  onClick={() => navigate("/")}
  className="
    flex items-center gap-3 pl-6 cursor-pointer
    text-gray-400
    hover:text-white
  "
>
  <img className="w-6" src={assets.home_icon} alt="Home" />
  <p className="font-bold">Home</p>
</div>

        {/* SEARCH */}
        <div    onClick={() => navigate("/search")} className="flex items-center gap-3 pl-6 cursor-pointer text-gray-400 hover:text-white">
          <img className="w-6" src={assets.search_icon} alt="Search" />
          <p className="font-bold">Search</p>
        </div>
      </div>

      {/* LIBRARY */}
      <div className="bg-[#121212] rounded flex-1">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon} alt="" />
            <p className="font-semibold">Your Library</p>
          </div>

          <div className="flex items-center gap-3">
            <img className="w-5" src={assets.plus_icon} alt="" />
            <img className="w-5" src={assets.arrow_icon} alt="" />
          </div>
        </div>

        {/* cards */}
        <div className="p-4 bg-[#242424] mb-4 m-2 rounded font-semibold">
          <h1>Create your first playlist</h1>
          <p className="font-light">It's easy we will help you</p>
          <button className="px-4 py-1.5 bg-white text-black rounded-full mt-4">
            Create Playlist
          </button>
        </div>

        <div className="p-4 bg-[#242424] m-2 rounded font-semibold">
          <h1>Let's find some podcasts to follow</h1>
          <p className="font-light">
            We'll keep you update on new episodes
          </p>
          <button className="px-4 py-1.5 bg-white text-black rounded-full mt-4">
            Browse podcasts
          </button>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;

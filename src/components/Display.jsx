import React, { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();

  const bgColor = location.state?.bgColor || "#121212";

    useEffect(() => {
    if (!displayRef.current) return;

    if (bgColor) {
      displayRef.current.style.background =
        `linear-gradient(180deg, ${bgColor}, #121212)`;
    } else {
      displayRef.current.style.background = "#121212";
    }
  }, [bgColor]);

    return (
    <div
      ref={displayRef}
      className="w-full m-2 px-6 pt-4 rounded text-white overflow-auto lg:w-[75%]"
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
};

export default Display;

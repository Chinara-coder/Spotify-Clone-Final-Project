import React from "react"
import { useNavigate } from "react-router-dom"

const AlbumItem = ({ image, name, desc }) => {

    const navigate = useNavigate()
  return (
    <div className="w-52 shrink-0 p-3 rounded cursor-pointer hover:bg-[#ffffff26] transition group">
      
      <div onClick={()=>navigate('/album/${id}')} className="relative">
        <img
          src={image}
          alt={name}
          className="w-full aspect-square object-cover rounded"
        />

        <button
          className="
            absolute bottom-3 right-3
            bg-green-500 w-12 h-12
            rounded-full flex items-center justify-center
            text-black text-xl
            opacity-0 translate-y-2
            group-hover:opacity-100
            group-hover:translate-y-0
            transition duration-300
          "
        >
          ▶
        </button>
      </div>

      <p className="font-bold mt-3 mb-1 truncate">
        {name}
      </p>

      <p className="text-slate-200 text-sm line-clamp-2">
        {desc}
      </p>
    </div>
  )
}

export default AlbumItem

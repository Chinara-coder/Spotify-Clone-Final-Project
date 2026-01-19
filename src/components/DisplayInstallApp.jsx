const DisplayInstallApp = () => {
  return (
    <div className="mt-6 flex justify-center">
      <div className="relative max-w-5xl w-full">
        {/* Spotify Screenshot */}
        <img
          src="images/spotify-preview.png"
          alt="Spotify Preview"
          className="w-full rounded-xl brightness-75"
        />

        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 rounded-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 rounded-xl"></div>

        {/* Install Button with Neon Effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <a
            href="https://www.spotify.com/download"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            {/* Outer Glow Layers */}
            <div className="absolute -inset-8 bg-[#1db954] rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition duration-500"></div>
            <div className="absolute -inset-4 bg-[#1ed760] rounded-full blur-2xl opacity-60 group-hover:opacity-90 transition duration-500"></div>
            
            {/* Button Container */}
            <div className="relative">
              {/* Neon Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1db954] via-white to-[#1ed760] rounded-full p-[3px] group-hover:p-[4px] transition-all duration-300">
                <div className="bg-black rounded-full h-full w-full"></div>
              </div>

              {/* Main Button Content */}
              <div className="relative flex items-center gap-4 px-10 py-5 rounded-full font-bold text-xl text-white group-hover:scale-105 transition-transform duration-300">
                {/* Animated Download Icon */}
                <svg 
                  className="w-7 h-7 group-hover:animate-bounce" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
                
                <span className="bg-gradient-to-r from-[#1db954] to-[#1ed760] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(29,185,84,0.8)]">
                  INSTALL SPOTIFY
                </span>

                {/* Sparkle Icon */}
                <svg 
                  className="w-5 h-5 text-[#1ed760] animate-pulse" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#1db954] rounded-tl-lg"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#1ed760] rounded-br-lg"></div>
          </a>
        </div>

        {/* Info Text */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-white text-sm font-semibold drop-shadow-lg">
            Free • No credit card required
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisplayInstallApp;

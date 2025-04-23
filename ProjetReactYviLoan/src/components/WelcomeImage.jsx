import React from "react";
import logo from "../assets/logo.png";
import background from "../assets/background.jpg";

export default function WelcomeImage() {
  return (
    <div
      className="flex items-center justify-center h-48 md:h-64 w-full"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded">
        <img src={logo} alt="Logo" className="h-8 md:h-12 object-contain" />
        <span className="text-xl md:text-3xl font-bold text-white">
          League of Legends&nbsp;Wiki
        </span>
      </div>
    </div>
  );
}

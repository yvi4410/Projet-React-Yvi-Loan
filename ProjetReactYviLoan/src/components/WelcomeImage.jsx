import React from "react";
import "../css/WelcomeImage.css";
import logo from "../assets/logo.png"; // Adjust the path if needed
import background from "../assets/background.jpg"; // Import the background image

const WelcomeImage = () => {
    return (
        <div className="welcome-image" style={{ backgroundImage: `url(${background})` }}>
            <div className="welcome-text">
                <img src={logo} alt="Logo" className="welcome-logo"/>
                League of Legends Wiki
            </div>
        </div>
    );
};

export default WelcomeImage;
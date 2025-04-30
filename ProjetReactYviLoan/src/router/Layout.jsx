import React from "react";
import Header from "../components/Header";
import WelcomeImage from "../components/WelcomeImage";
import DernierAjout from "../components/DernierAjout";
import ChampionList from "../components/ChampionList";
import Footer from "../components/Footer.jsx";

const Layout = () => {
    return (
        <>
            <Header />
            <WelcomeImage />
            <DernierAjout />
            <ChampionList />
            <Footer />
        </>
    );
};

export default Layout;
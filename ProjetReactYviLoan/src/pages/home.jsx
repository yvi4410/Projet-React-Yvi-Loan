import React from "react";
import WelcomeImage from "../components/WelcomeImage";
import DernierAjout from "../components/DernierAjout";
import ChampionPage from "../components/ChampionPage.jsx";

export default function Home() {
  return (
    <main className="container mx-auto px-4 space-y-12">
      <WelcomeImage />
      <DernierAjout />

    </main>
  );
}

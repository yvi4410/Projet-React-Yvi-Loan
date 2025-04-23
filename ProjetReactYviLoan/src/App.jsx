import React from "react";
import Header from "./components/Header";
import WelcomeImage from "./components/WelcomeImage";
import DernierAjout from "./components/DernierAjout";
import ChampionList from "./components/ChampionList";

function App() {
  return (
    <div>
      <Header />
      {/* bannière d’accueil */}
      <WelcomeImage />
      {/* dernier champion ajouté */}
      <DernierAjout />
      {/* grille complète des champions */}
      <ChampionList />
    </div>
  );
}

export default App;

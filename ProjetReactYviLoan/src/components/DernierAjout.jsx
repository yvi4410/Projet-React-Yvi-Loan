import React from "react";

export default function DernierAjout() {
  const champion = {
    name: "Naafiri",
    image:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Naafiri_0.jpg",
    loreTitle: "Qui est-elle ?",
    lore:
      "Naafiri est une Darkin revenue à la vie sous la forme d'une meute de chiens du désert. Son instinct primaire est de traquer et de tuer, ce qui la rend redoutable sur les terres de Runeterra.",
    spells: [
      {
        key: "P",
        name: "Appel de la meute",
        icon:
          "https://ddragon.leagueoflegends.com/cdn/14.7.1/img/passive/Naafiri_Passive.png",
        description:
          "Naafiri invoque ses chiens pour attaquer en meute, infligeant des dégâts supplémentaires."
      },
      {
        key: "Q",
        name: "Lames du chasseur",
        icon:
          "https://ddragon.leagueoflegends.com/cdn/14.7.1/img/spell/NaafiriQ.png",
        description:
          "Naafiri lance deux dagues en ligne droite, infligeant des dégâts et des saignements."
      },
      {
        key: "W",
        name: "Chasse bondissante",
        icon:
          "https://ddragon.leagueoflegends.com/cdn/14.7.1/img/spell/NaafiriW.png",
        description:
          "Naafiri bondit sur une cible et inflige de lourds dégâts à l'impact."
      },
      {
        key: "E",
        name: "Évasion",
        icon:
          "https://ddragon.leagueoflegends.com/cdn/14.7.1/img/spell/NaafiriE.png",
        description:
          "Naafiri se rue vers une direction, esquivant les projectiles et réinitialisant ses alliés."
      },
      {
        key: "R",
        name: "Appétit de sang",
        icon:
          "https://ddragon.leagueoflegends.com/cdn/14.7.1/img/spell/NaafiriR.png",
        description:
          "Naafiri se renforce, gagne en vitesse et contrôle la meute pour un assaut brutal."
      }
    ]
  };

  return (
    <section className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg max-w-screen-lg mx-auto">
        <h2 className="text-3xl font-bold mb-6">Dernier ajout (Champion)</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* splash */}
        <img
          src={champion.image}
          alt={champion.name}
          className="w-full md:w-1/2 h-60 md:h-72 object-cover rounded-xl"
        />

        {/* right column */}
        <div className="flex flex-col gap-6 justify-between">
          {/* lore */}
          <article>
            <h3 className="text-xl font-semibold mb-2">{champion.loreTitle}</h3>
            <p>{champion.lore}</p>
          </article>

          {/* spells */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Compétences</h4>
            <ul className="flex flex-wrap gap-4">
              {champion.spells.map((spell) => (
                <li key={spell.key} className="relative group">
                  <img
                    src={spell.icon}
                    alt={spell.name}
                    className="w-12 h-12 rounded-md cursor-pointer transition-transform hover:scale-110"
                  />
                  {/* tooltip */}
                  <span className="absolute top-full z-10 hidden max-w-xs bg-black/90 text-xs p-2 rounded group-hover:block">
                    {spell.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

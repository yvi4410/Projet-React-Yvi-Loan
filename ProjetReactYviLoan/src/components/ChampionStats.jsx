import React from "react";

const formatStatKey = (key) => {
    const map = {
        hp: "PV : ",
        hpperlevel: "PV / niveau : ",
        mp: "Mana : ",
        mpperlevel: "Mana / niveau :",
        movespeed: "Vitesse de déplacement : ",
        armor: "Armure : ",
        armorperlevel: "Armure / niveau : ",
        spellblock: "Résistance magique : ",
        spellblockperlevel: "RM / niveau : ",
        attackrange: "Portée : ",
        hpregen: "Régén PV : ",
        hpregenperlevel: "Régén PV / niveau : ",
        mpregen: "Régén Mana : ",
        mpregenperlevel: "Régén Mana / niveau : ",
        crit: "Critique : ",
        critperlevel: "Critique / niveau : ",
        attackdamage: "Dégâts d'attaque : ",
        attackdamageperlevel: "DA / niveau : ",
        attackspeedperlevel: "Vitesse d'attaque / niveau : ",
        attackspeed: "Vitesse d'attaque : ",
    };
    return map[key] || key;
};

const ChampionStats = ({ stats }) => {
    return (
        <div className>
            <h2 className="text-2xl font-bold text-yellow-300 mb-4">Statistiques</h2>
            <div className>
                {Object.entries(stats).map(([key, value]) => (
                    <div
                        key={key}
                        className="flex justify-between items-center px-4 py-2 bg-gray-800 rounded-md shadow-inner hover:bg-gray-700 transition"
                    >
                        <span className="capitalize font-medium">{formatStatKey(key)}</span>
                        <span className="font-mono text-right">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChampionStats;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChampionLore from "./ChampionLore";
import ChampionStats from "./ChampionStats";
import ChampionAbilities from "./ChampionAbilities";
import ChampionAbilityDetail from "./ChampionAbilityDetail";

const ChampionPage = () => {
    const { name } = useParams();
    const [champion, setChampion] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChampion = async () => {
            try {
                const response = await fetch(
                    `https://ddragon.leagueoflegends.com/cdn/14.8.1/data/fr_FR/champion/${name}.json`
                );
                const data = await response.json();
                const champData = data.data[name];
                setChampion(champData);
            } catch (err) {
                setError("Champion introuvable ou erreur de chargement.");
            }
        };

        fetchChampion();
    }, [name]);

    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;
    if (!champion) return <div className="text-center mt-4">Chargement...</div>;

    const splashUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`;
    const passive = {
        name: champion.passive.name,
        description: champion.passive.description,
        icon: `https://ddragon.leagueoflegends.com/cdn/14.8.1/img/passive/${champion.passive.image.full}`
    };

    return (
        <div className="p-4 max-w-screen-xl mx-auto">
            <img src={splashUrl} alt={champion.name} className="w-full rounded-2xl shadow mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <ChampionLore lore={champion.lore} />
                </div>
                <ChampionStats stats={champion.stats} />
            </div>
            <ChampionAbilities abilities={champion.spells} passive={passive} />
            <ChampionAbilityDetail ability={champion.spells[3]} /> {/* ulti (R) */}
        </div>
    );
};

export default ChampionPage;
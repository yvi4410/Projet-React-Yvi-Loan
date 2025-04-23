import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChampionLore from "./ChampionLore";
import ChampionStats from "./ChampionStats";
import ChampionAbilities from "./ChampionAbilities";
import ChampionAbilityDetail from "./ChampionAbilityDetail";
import ChampionFeature from "./ChampionFeature";
import './Champion.css';

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
        <div className="pt-4 bg-dark text-white">
            <ChampionFeature
                name={champion.name}
                lore={champion.lore}
                splashImage={splashUrl}
            />

            <div className="container my-5">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <ChampionStats stats={champion.stats} />
                    </div>

                    <div className="col-md-8 mb-4">
                        <ChampionAbilities abilities={champion.spells} passive={passive} />
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-12">
                        <ChampionAbilityDetail ability={champion.spells[3]} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChampionPage;
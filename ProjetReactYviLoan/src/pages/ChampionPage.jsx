import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChampionStats from "../components/ChampionStats";
import ChampionAbilities from "../components/ChampionAbilities";
import ChampionAbilityDetail from "../components/ChampionAbilityDetail";
import ChampionFeature from "../components/ChampionFeature";
import '../css/Champion.css';
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
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
        <div className="champion-page d-flex flex-column min-vh-100 w-100 m-0 p-0 bg-dark text-white">
            <Header />
            <ChampionFeature
                name={champion.name}
                lore={champion.lore}
                splashImage={splashUrl}
            />
            <div className="container-fluid my-5 px-5">
                <div className="row mb-4">
                    <div className="col-12">
                        <ChampionStats stats={champion.stats} />
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-12">
                        <ChampionAbilities champion={champion} />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <ChampionAbilityDetail ability={champion.spells[3]} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ChampionPage;
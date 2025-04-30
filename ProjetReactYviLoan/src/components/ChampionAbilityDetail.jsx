// src/components/ChampionAbilityDetail.jsx
import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import "../css/DernierAjout.css";
import AbilityFeature from "./AbilityFeature";

const ChampionAbilityDetail = ({ ability, championId, version }) => {
    if (!ability) return null;

    // URL de l'illustration du champion (loading screen)
    const champIllustration = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/loading/${championId}_0.jpg`;
    // URL de l'icône de la compétence
    const folder = ability.type === "passive" ? "passive" : "spell";
    const iconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/${folder}/${ability.image.full}`;

    return (
        <AbilityFeature
            name={ability.name}
            description={ability.description.replace(/<[^>]+>/g, "")}
            imageUrl={iconUrl}
        />
    );
};

ChampionAbilityDetail.propTypes = {
    ability: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.shape({ full: PropTypes.string.isRequired }).isRequired,
        type: PropTypes.oneOf(["spell", "passive"]).isRequired,
        video: PropTypes.string,
    }).isRequired,
    championId: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
};

export default ChampionAbilityDetail;
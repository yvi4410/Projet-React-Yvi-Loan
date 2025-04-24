// src/components/ChampionAbilities.jsx
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import "../css/DernierAjout.css";

/* ───────────────────────── Helpers ───────────────────────── */
const formatAbility = (ability, version) => ({
    name: ability.name,
    description: ability.description.replace(/<[^>]+>/g, ""),
    icon: `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${ability.image.full}`,
});

const formatPassive = (passive, version) => ({
    name: passive.name,
    description: passive.description.replace(/<[^>]+>/g, ""),
    icon: `https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${passive.image.full}`,
});

/* ─────────────────────── Item Display ─────────────────────── */
const AbilityItem = ({ ability }) => (
    <div className="d-flex ezy__featured25-item position-relative p-3 p-md-4 mb-3 mb-lg-4">
        <div className="ezy__featured25-icon mb-4 me-4">
            <img
                src={ability.icon}
                alt={ability.name}
                className="w-12 h-12 rounded-md"
                style={{ width: 48, height: 48 }}
            />
        </div>
        <div>
            <h4 className="ezy__featured25-title fs-4 mb-3">{ability.name}</h4>
            <p className="ezy__featured25-content mb-0">{ability.description}</p>
        </div>
    </div>
);

AbilityItem.propTypes = {
    ability: PropTypes.shape({
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
};

/* ─────────────────────── Main Component ─────────────────────── */
const ChampionAbilities = ({ champion }) => {
    const [abilities, setAbilities] = useState([]);
    const [version, setVersion] = useState("14.8.1");

    useEffect(() => {
        const fetchVersion = async () => {
            const [latest] = await fetch("https://ddragon.leagueoflegends.com/api/versions.json").then(res => res.json());
            setVersion(latest);
        };

        fetchVersion();
    }, []);

    useEffect(() => {
        if (!champion || !version) return;

        const formattedAbilities = [
            formatPassive(champion.passive, version),
            ...champion.spells.map(spell => formatAbility(spell, version)),
        ];

        setAbilities(formattedAbilities);
    }, [champion, version]);

    return (
        <section className="ezy__featured25 dark-gray">
            <Container>
                <Row className="mb-5 text-center justify-content-center">
                    <Col lg={7}>
                        <h2 className="ezy__featured25-heading mb-4">Compétences du champion</h2>
                    </Col>
                </Row>
                <Row className="position-relative">
                    <Col lg={10}>
                        {abilities.map((ability, index) => (
                            <AbilityItem key={index} ability={ability} />
                        ))}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

ChampionAbilities.propTypes = {
    champion: PropTypes.shape({
        passive: PropTypes.object.isRequired,
        spells: PropTypes.array.isRequired,
    }).isRequired,
};

export default ChampionAbilities;
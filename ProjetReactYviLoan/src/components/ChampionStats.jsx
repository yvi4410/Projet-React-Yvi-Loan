import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const formatStatKey = (key) => {
    const map = {
        hp: "❤️ PV",
        hpperlevel: "❤️⬆️ PV / niveau",
        mp: "🔷 Mana",
        mpperlevel: "🔷⬆️ Mana / niveau",
        movespeed: "👟 Vitesse",
        armor: "🛡️ Armure",
        armorperlevel: "🛡️⬆️ Armure / niveau",
        spellblock: "🧠 RM",
        spellblockperlevel: "🧠⬆️ RM / niveau",
        attackrange: "🏹 Portée",
        hpregen: "➕❤️ Régén PV",
        hpregenperlevel: "➕⬆️❤️ Régén PV / niv",
        mpregen: "➕🔷 Régén Mana",
        mpregenperlevel: "➕⬆️🔷 Régén Mana / niv",
        crit: "💥 Critique",
        critperlevel: "💥⬆️ Crit / niv",
        attackdamage: "🗡️ Dégâts",
        attackdamageperlevel: "🗡️⬆️ Dégâts / niv",
        attackspeed: "⚔️ Vitesse d'attaque",
        attackspeedperlevel: "⚔️⬆️ Vit. d'attaque / niv",
    };
    return map[key] || key;
};

const ChampionStats = ({ stats }) => {
    const statEntries = Object.entries(stats);
    const half = Math.ceil(statEntries.length / 2);
    const firstColumn = statEntries.slice(0, half);
    const secondColumn = statEntries.slice(half);

    return (
        <section className="ezy__featured25 dark-gray">
            <Container>
                <Row className="mb-4 text-center justify-content-center">
                    <Col lg={8}>
                        <h2 className="ezy__featured25-heading mb-4">Statistiques</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        {firstColumn.map(([key, value]) => (
                            <div
                                key={key}
                                className="d-flex justify-between align-items-center px-3 py-2 bg-secondary rounded mb-2 shadow-sm text-white"
                            >
                                <span className="fw-bold">{formatStatKey(key)}</span>
                                <span className="ms-auto">{value}</span>
                            </div>
                        ))}
                    </Col>
                    <Col md={6}>
                        {secondColumn.map(([key, value]) => (
                            <div
                                key={key}
                                className="d-flex justify-between align-items-center px-3 py-2 bg-secondary rounded mb-2 shadow-sm text-white"
                            >
                                <span className="fw-bold">{formatStatKey(key)}</span>
                                <span className="ms-auto">{value}</span>
                            </div>
                        ))}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ChampionStats;
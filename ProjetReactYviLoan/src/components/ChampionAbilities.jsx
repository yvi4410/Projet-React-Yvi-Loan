// src/components/ChampionAbilities.jsx
import React from "react";
import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import "../css/DernierAjout.css";

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

const ChampionAbilities = ({ abilities }) => (
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

ChampionAbilities.propTypes = {
    abilities: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ChampionAbilities;
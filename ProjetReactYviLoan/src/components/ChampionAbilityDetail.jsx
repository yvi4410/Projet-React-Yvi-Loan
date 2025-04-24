import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../css/DernierAjout.css";

const ChampionAbilityDetail = ({ ability }) => {
    return (
        <section className="ezy__featured25 dark-gray py-5">
            <Container>
                <Row className="justify-content-center text-center mb-4">
                    <Col lg={8}>
                        <h2 className="ezy__featured25-heading mb-3">{ability.name}</h2>
                        <p className="ezy__featured25-sub-heading">Détail de la compétence</p>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col lg={10}>
                        <Card className="ezy__featured25-card">
                            <Card.Body className="p-4">
                                <Row className="align-items-center">
                                    {ability.icon && (
                                        <Col xs={12} md={2} className="mb-3 mb-md-0 text-center">
                                            <img
                                                src={ability.icon}
                                                alt={ability.name}
                                                className="rounded shadow"
                                                style={{ width: 64, height: 64 }}
                                            />
                                        </Col>
                                    )}

                                    <Col xs={12} md={10}>
                                        <h4 className="mb-3 fs-4">{ability.name}</h4>
                                        <p className="mb-3 text-white-50">{ability.description}</p>

                                        {ability.video && (
                                            <video
                                                controls
                                                className="w-100 rounded shadow mt-3"
                                                style={{ maxWidth: "640px" }}
                                            >
                                                <source src={ability.video} type="video/mp4" />
                                                Votre navigateur ne supporte pas la lecture de vidéos.
                                            </video>
                                        )}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

ChampionAbilityDetail.propTypes = {
    ability: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        video: PropTypes.string,
        icon: PropTypes.string,
    }).isRequired,
};

export default ChampionAbilityDetail;

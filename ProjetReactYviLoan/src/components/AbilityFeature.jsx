// src/components/AbilityFeature.jsx
import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import "../css/DernierAjout.css";

const AbilityFeature = ({ name, description, imageUrl }) => {
    return (
        <section className="ezy__featured25 dark-gray py-5 mt-5">
            <Container fluid className="px-0">
                <Row className="justify-content-center align-items-center">
                    <Col lg={10}>
                        <Row>
                            {/* Icon de l'ability */}
                            <Col md={6} className="mb-4 mb-md-0 text-center">
                                <div
                                    className="rounded-4 shadow-lg mx-auto"
                                    style={{
                                        backgroundImage: `url(${imageUrl})`,
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        width: "100%",
                                        minHeight: "400px",
                                    }}
                                />
                            </Col>

                            {/* Nom et description */}
                            <Col md={6}>
                                <div className="bg-black bg-opacity-75 text-white p-5 p-lg-6 rounded-4 shadow-lg h-100 d-flex flex-column justify-content-center">
                                    <h1 className="fs-2 fw-bold mb-4 text-center">{name}</h1>
                                    <p
                                        className="mb-0 fs-5"
                                        style={{ whiteSpace: "pre-line", lineHeight: 1.6 }}
                                    >
                                        {description}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

AbilityFeature.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
};

export default AbilityFeature;
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../css/ChampionList.css";
import "../css/Error404.css";
import logo from "../assets/logo.png";

const Error404 = () => {
    const navigate = useNavigate();

    return (
        <section className="ezy__portfolio5 dark-gray error-404">
            <div
                className="error-404-banner mb-5"
                style={{
                    backgroundImage: `url(${logo})`,
                }}
            />
            <Container>
                <Row className="justify-content-center text-center">
                    <Col lg={8}>
                        <p className="ezy__portfolio5-sub-heading mb-2">Oups !</p>
                        <h2 className="ezy__portfolio5-heading mb-4">Erreur 404 - Page introuvable</h2>
                        <p className="error-404-text mb-4">
                            Cette page n’existe pas ou a été déplacée.
                        </p>
                        <div className="d-flex justify-content-center gap-3">
                            <Button variant="primary" onClick={() => navigate("/")}>
                                Accueil
                            </Button>
                            <Button
                                variant="outline-light"
                                className="ezy__portfolio5-btn-filter"
                                onClick={() => window.location.reload()}
                            >
                                Réessayer
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Error404;
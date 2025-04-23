import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./404.css";
import logo from "../assets/logo.png";

const HttpCodes12_zEX0iejo = () => {
    const navigate = useNavigate();

    const handleReturnHome = () => {
        navigate("/");
    };

    const handleTryAgain = () => {
        window.location.reload();
    };

    return (
        <section className="ezy__httpcodes12_zEX0iejo">
            <div
                className="ezy__httpcodes12_zEX0iejo-banner"
                style={{
                    backgroundImage: `url(${logo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "300px",
                    width: "100%",
                    opacity: 1,
                }}
            />
            <Container>
                <Row className="justify-content-end">
                    <Col
                        xs={12}
                        md={8}
                        lg={6}
                        className="d-flex flex-column align-items-center align-items-lg-start"
                    >
                        <h1 className="ezy__httpcodes12_zEX0iejo-heading mb-3">Oh no! Error 404</h1>
                        <p className="ezy__httpcodes12_zEX0iejo-sub-heading mb-4">
                            Something went wrong, this page is broken.
                        </p>
                        <div className="d-flex">
                            <Button variant="primary" onClick={handleReturnHome}>
                                Return to homepage
                            </Button>
                            <Button
                                variant=""
                                className="ezy__httpcodes12_zEX0iejo-btn ms-2"
                                onClick={handleTryAgain}
                            >
                                Try Again
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default HttpCodes12_zEX0iejo;
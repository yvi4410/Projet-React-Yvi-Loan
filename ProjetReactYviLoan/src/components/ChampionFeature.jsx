// src/components/ChampionFeature.jsx
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "../css/DernierAjout.css";

const ChampionFeature = ({ name, lore, splashImage }) => {
    return (
        <section className="ezy__featured25 dark-gray py-5 mt-5">
            <Container fluid className="px-0">
                <Row className="justify-content-center align-items-center">
                    <Col lg={10}>
                        <Row>
                            {/* Image splash - enlarged */}
                            <Col md={6} className="mb-4 mb-md-0">
                                <div
                                    className="rounded-4 shadow-lg w-100"
                                    style={{
                                        backgroundImage: `url(${splashImage})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        minHeight: "600px",
                                    }}
                                />
                            </Col>

                            {/* Texte du champion - larger font */}
                            <Col md={6}>
                                <div className="bg-black bg-opacity-75 text-white p-5 p-lg-6 rounded-4 shadow-lg h-100 d-flex flex-column justify-content-center">
                                    <h1 className="fs-1 fw-bold mb-4 display-4 text-center">{name}</h1>
                                    <p className="mb-0 fs-5" style={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                                        {lore}
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

ChampionFeature.propTypes = {
    name: PropTypes.string.isRequired,
    lore: PropTypes.string.isRequired,
    splashImage: PropTypes.string.isRequired,
};

export default ChampionFeature;

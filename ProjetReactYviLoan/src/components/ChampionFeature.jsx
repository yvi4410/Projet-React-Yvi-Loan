// src/components/ChampionFeature.jsx
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "../css/DernierAjout.css";

const ChampionFeature = ({ name, lore, splashImage }) => {
    return (
        <section className="ezy__featured25 dark-gray py-5 mt-5">
            <Container>
                <Row className="justify-content-center align-items-center">
                    <Col lg={10}>
                        <Row>
                            {/* Image splash */}
                            <Col md={6} className="mb-4 mb-md-0">
                                <div
                                    className="rounded-4 shadow-lg w-100 h-100"
                                    style={{
                                        backgroundImage: `url(${splashImage})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        minHeight: "400px",
                                    }}
                                />
                            </Col>

                            {/* Texte du champion */}
                            <Col md={6}>
                                <div className="bg-black bg-opacity-75 text-white p-4 p-lg-5 rounded-4 shadow-lg">
                                    <h2 className="fs-3 fw-bold mb-3">{name}</h2>
                                    <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>{lore}</p>
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
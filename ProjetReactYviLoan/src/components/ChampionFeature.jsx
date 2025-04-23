import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faCannabis } from "@fortawesome/free-solid-svg-icons";

const ChampionFeature = ({ name, lore, splashImage }) => {
    return (
        <section className="ezy__featured7_dSPA6fSp position-relative">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <Row>
                            <Col md={6} className="py-md-5">
                                <div
                                    className="ezy__featured7_dSPA6fSp-bg-holder h-100"
                                    style={{
                                        backgroundImage: `url(${splashImage})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        borderRadius: "16px",
                                        minHeight: "400px",
                                    }}
                                />
                            </Col>
                            <Col md={6} className="pb-4 py-md-5 position-relative">
                                <div className="ezy__featured7_dSPA6fSp-shape" />
                                <div className="p-4 p-lg-5 mb-4 bg-dark bg-opacity-75 rounded-4 shadow-lg text-white">
                                    <h4 className="ezy__featured7_dSPA6fSp-title fs-3 fw-bold mb-3">
                                        {name}
                                    </h4>
                                    <p className="ezy__featured7_dSPA6fSp-content mb-0" style={{ whiteSpace: 'pre-line' }}>
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

export default ChampionFeature;
import { Container, Row, Col, Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faTwitter,
    faPinterestP,
    faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../assets/logo.png"; // ajuste le chemin si besoin
import "../css/Footer.css";

const navigations = [
    { value: "Privacy Policy", href: "#!" },
    { value: "Security", href: "#!" },
    { value: "Terms & Condition", href: "#!" },
];

const socialIcons = [
    { icon: faFacebookF, href: "#!" },
    { icon: faTwitter, href: "#!" },
    { icon: faPinterestP, href: "#!" },
    { icon: faLinkedinIn, href: "#!" },
];

const NavigationItem = ({ item }) => (
    <Nav.Item>
        <Nav.Link href={item.href}>{item.value}</Nav.Link>
    </Nav.Item>
);

NavigationItem.propTypes = {
    item: PropTypes.object.isRequired,
};

const SocialItem = ({ social }) => (
    <li>
        <a
            href={social.href}
            className="border d-flex justify-content-center align-items-center rounded-circle"
        >
            <FontAwesomeIcon icon={social.icon} />
        </a>
    </li>
);

SocialItem.propTypes = {
    social: PropTypes.object.isRequired,
};

const Footer = () => {
    return (
        <section className="ezy__footer4_7ChE1Dy4">
            <Container>
                <Row className="d-flex justify-content-between align-items-center text-center text-lg-start">
                    <Col xs={12} className="text-center">
                        <img src={logo} alt="Logo" height="200" className="mb-3" />
                        <Nav className="ezy__footer4_7ChE1Dy4-nav justify-content-center my-4 my-lg-5">
                            {navigations.map((item, i) => (
                                <NavigationItem item={item} key={i} />
                            ))}
                        </Nav>
                    </Col>
                    <Col md={6}>
                        <p className="mb-0 mt-1">
                            Copyright &copy; Easy Frontend, All rights reserved
                        </p>
                    </Col>
                    <Col
                        md={6}
                        className="d-flex justify-content-center justify-content-lg-end text-center text-lg-end mt-1"
                    >
                        <Nav className="ezy__footer4_7ChE1Dy4-social">
                            {socialIcons.map((social, i) => (
                                <SocialItem social={social} key={i} />
                            ))}
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Footer;
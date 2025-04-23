import React, { useState, useEffect } from "react";
import {
    Button,
    Collapse,
    Container,
    Form,
    InputGroup,
    Nav,
    Navbar,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import "../css/Header.css";
import logo from "../assets/logo@.png";
import { Link, useNavigate } from "react-router-dom";

// Définition des routes de navigation
const routes = [
    { name: "Champions", href: "#" },
    { name: "Items", href: "#" },
];

// Composant pour générer les liens de navigation
const NavMenu = ({ routes, children }) => (
    <Nav className="ms-auto mb-2 mb-lg-0 mt-4 mt-lg-0">
        {children}
        {routes.map((route, i) => (
            <Nav.Item key={i}>
                <Nav.Link as={Link} to={route.href}>
                    {route.name}
                </Nav.Link>
            </Nav.Item>
        ))}
    </Nav>
);

const NavMenu2 = ({ toggleSearch }) => (
    <Nav className="flex-row ms-auto mb-2 mb-lg-0">
        <Nav.Item className="nav-item me-2">
            <Button variant="light" className="px-3">
                <FontAwesomeIcon icon={faBookOpen} />
            </Button>
        </Nav.Item>
        <Nav.Item className="nav-item">
            <Button variant="light" className="px-3" onClick={toggleSearch}>
                <FontAwesomeIcon icon={faSearch} />
            </Button>
        </Nav.Item>
    </Nav>
);

NavMenu2.propTypes = {
    toggleSearch: PropTypes.func.isRequired,
};

NavMenu.propTypes = {
    routes: PropTypes.array.isRequired,
    children: PropTypes.node,
};

// Composant de recherche
const SearchForm = () => {
    const [query, setQuery] = useState("");
    const [champions, setChampions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://ddragon.leagueoflegends.com/cdn/14.8.1/data/en_US/champion.json")
            .then((res) => res.json())
            .then((data) => setChampions(Object.values(data.data)))
            .catch((err) => console.error("Erreur de chargement des champions", err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const champ = champions.find((c) =>
            c.name.toLowerCase() === query.toLowerCase()
        );
        if (champ) {
            navigate(`/champion/${champ.id}`);
        } else {
            alert("Champion non trouvé !");
        }
    };

    return (
        <Form className="mt-4" onSubmit={handleSubmit}>
            <InputGroup>
                <Form.Control
                    type="search"
                    placeholder="Tape un nom de champion..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button variant="" className="ezy__nav5-btn px-3" type="submit">
                    Search
                </Button>
            </InputGroup>
        </Form>
    );
};

// Composant principal Header
const Header = () => {
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const toggleSearch = () => setIsOpenSearch(!isOpenSearch);

    return (
        <div className="ezy__nav5 dark-gray header-fixed">
            <Navbar expand="lg" className="flex-column py-3">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <img src={logo} alt="Logo" style={{ height: "80px" }} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="ezy__nav5-navbar-nav">
                        <span>
                            <span />
                        </span>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="ezy__nav5-navbar-nav">
                        <NavMenu routes={routes} />
                        <NavMenu2 toggleSearch={toggleSearch} />
                    </Navbar.Collapse>
                </Container>
                <Container fluid>
                    <Collapse in={isOpenSearch} className="w-100">
                        <div>
                            <SearchForm />
                        </div>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
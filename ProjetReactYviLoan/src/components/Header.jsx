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

const SearchForm = () => {
    const [query, setQuery] = useState("");
    const [champions, setChampions] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://ddragon.leagueoflegends.com/cdn/14.8.1/data/en_US/champion.json")
            .then((res) => res.json())
            .then((data) => setChampions(Object.values(data.data)))
            .catch((err) => console.error("Erreur de chargement des champions", err));
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length === 0) {
            setSuggestions([]);
            return;
        }

        const filtered = champions.filter((c) =>
            c.name.toLowerCase().startsWith(value.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 5)); // Limite à 5 suggestions
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const champ = champions.find(
            (c) => c.name.toLowerCase() === query.toLowerCase()
        );
        if (champ) {
            navigate(`/champion/${champ.id}`);
            setQuery("");
            setSuggestions([]);
        } else {
            alert("Champion non trouvé !");
        }
    };

    const handleSelect = (name, id) => {
        setQuery(name);
        setSuggestions([]);
        navigate(`/champion/${id}`);
    };

    return (
        <Form className="mt-4 position-relative" onSubmit={handleSubmit}>
            <InputGroup>
                <Form.Control
                    type="search"
                    placeholder="Tape un nom de champion..."
                    value={query}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <Button variant="" className="ezy__nav5-btn px-3" type="submit">
                    Search
                </Button>
            </InputGroup>
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((champ) => (
                        <li
                            key={champ.id}
                            onClick={() => handleSelect(champ.name, champ.id)}
                        >
                            {champ.name}
                        </li>
                    ))}
                </ul>
            )}
        </Form>
    );
};

const Header = () => {
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const toggleSearch = () => setIsOpenSearch(!isOpenSearch);

    return (
        <div className="ezy__nav5 dark-gray header-fixed">
            <Navbar expand="lg" className="flex-column py-3">
                <Container fluid>
                    {/* Logo cliquable */}
                    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
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
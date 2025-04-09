import React, { useState } from "react";
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
import logo from "../assets/logo@.png"; // Import your logo image

// Define your navigation routes – the name is the text and href is where it should link.
const routes = [
    { name: "Champions", href: "#" },
    { name: "Items", href: "#" },
];

// This component generates the navigation links based on the routes array.
const NavMenu = ({ routes, children }) => (
    <Nav className="mx-auto mb-2 mb-lg-0 mt-4 mt-lg-0">
        {children}
        {routes.map((route, i) => (
            <Nav.Item key={i}>
                <Nav.Link href={route.href}>{route.name}</Nav.Link>
            </Nav.Item>
        ))}
    </Nav>
);

NavMenu.propTypes = {
    routes: PropTypes.array.isRequired,
    children: PropTypes.node,
};

// This component shows additional nav buttons (shopping cart and search).
const NavMenu2 = ({ toggleSearch }) => (
    <Nav className="flex-row mb-2 mb-lg-0">
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

// This component renders the search form.
const SearchForm = () => (
    <Form className="mt-4">
        <InputGroup>
            <Form.Control type="search" placeholder="City, Address, Zip" />
            <Button variant="" className="ezy__nav5-btn px-3" type="submit">
                Search
            </Button>
        </InputGroup>
    </Form>
);

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
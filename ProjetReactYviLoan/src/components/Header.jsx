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
import logo from "../assets/logo@.png";

/* ─────────── Navigation routes ─────────── */
const routes = [
  { name: "Champions", href: "#champion-list" }, // ↓ ancre vers la liste
  { name: "Items", href: "#" },
];

/* ─────────── Sub-components ─────────── */
const NavMenu = ({ routes }) => (
  <Nav className="mb-2 mb-lg-0">
    {routes.map((route, i) => (
      <Nav.Item key={i} className="mx-lg-2">
        <Nav.Link href={route.href}>{route.name}</Nav.Link>
      </Nav.Item>
    ))}
  </Nav>
);
NavMenu.propTypes = { routes: PropTypes.array.isRequired };

const NavMenu2 = ({ toggleSearch }) => (
  <Nav className="flex-row mb-2 mb-lg-0">
    <Nav.Item className="me-2">
      <Button variant="light" className="px-3">
        <FontAwesomeIcon icon={faBookOpen} />
      </Button>
    </Nav.Item>
    <Nav.Item>
      <Button variant="light" className="px-3" onClick={toggleSearch}>
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </Nav.Item>
  </Nav>
);
NavMenu2.propTypes = { toggleSearch: PropTypes.func.isRequired };

const SearchForm = () => (
  <Form className="mt-4">
    <InputGroup>
      <Form.Control type="search" placeholder="Search champions…" />
      <Button variant="" className="ezy__nav5-btn px-3" type="submit">
        Search
      </Button>
    </InputGroup>
  </Form>
);

/* ─────────── Header component ─────────── */
const Header = () => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const toggleSearch = () => setIsOpenSearch(!isOpenSearch);

  return (
    <div className="ezy__nav5 dark-gray header-fixed">
      <Navbar expand="lg" className="py-3">
        <Container fluid>
          {/* brand */}
          <Navbar.Brand href="#">
            <img src={logo} alt="Logo" style={{ height: "80px" }} />
          </Navbar.Brand>

          {/* burger */}
          <Navbar.Toggle aria-controls="ezy__nav5-navbar-nav">
            <span>
              <span />
            </span>
          </Navbar.Toggle>

          {/* right-aligned navigation */}
          <Navbar.Collapse
            id="ezy__nav5-navbar-nav"
            className="justify-content-end"
          >
            <div className="d-flex align-items-lg-center ms-auto">
              <NavMenu routes={routes} />
              <NavMenu2 toggleSearch={toggleSearch} />
            </div>
          </Navbar.Collapse>
        </Container>

        {/* collapsible search row */}
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

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
import { useNavigate } from "react-router-dom";
import "../css/Header.css";
import logo from "../assets/logo@.png";

/* ─────────── Navigation routes ─────────── */
const routes = [
  { name: "Champions", href: "#champion-list" },
  { name: "Items", href: "#" },
];

/* ─────────── Sub-components ─────────── */
const NavMenu = ({ routes }) => (
    <Nav className="mb-2 mb-lg-0">
      {routes.map((route, i) => (
          <Nav.Item key={i} className="mx-lg-2">
            <Button
                variant="outline-light"
                className="ms-3"
                onClick={() => (window.location.href = route.href)}
            >
              {route.name}
            </Button>
          </Nav.Item>
      ))}
    </Nav>
);
NavMenu.propTypes = { routes: PropTypes.array.isRequired };

const NavMenu2 = ({ mapLang, setMapLang, toggleSearch }) => (
    <Nav className="flex-row mb-2 mb-lg-0 align-items-center">
      {/* Language selection with same form-control styling */}
      <Nav.Item>
        <Form.Control
            as="select"
            value={mapLang}
            onChange={(e) => setMapLang(e.target.value)}
            className="ms-3"
            style={{ width: 'auto' }}
        >
          <option value="fr_FR">Français</option>
          <option value="en_US">English</option>
          <option value="de_DE">Deutsch</option>
          <option value="es_ES">Español</option>
          <option value="ja_JP">日本語</option>
          <option value="zh_CN">中文</option>
        </Form.Control>
      </Nav.Item>
      <Nav.Item className="ms-2">
        {/* Redirection vers la carte League of Legends selon la langue */}
        <Button
            variant="light"
            className="px-3"
            onClick={() => (window.location.href = `https://map.leagueoflegends.com/${mapLang}`)}
        >
          <FontAwesomeIcon icon={faBookOpen} />
        </Button>
      </Nav.Item>
      <Nav.Item>
        <Button variant="light" className="px-3 ms-2" onClick={toggleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </Nav.Item>
    </Nav>
);
NavMenu2.propTypes = {
  mapLang: PropTypes.string.isRequired,
  setMapLang: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
};

/* ─────────── Search form with suggestions ─────────── */
const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [champions, setChampions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
        "https://ddragon.leagueoflegends.com/cdn/14.8.1/data/en_US/champion.json"
    )
        .then((res) => res.json())
        .then((data) => setChampions(Object.values(data.data)))
        .catch((err) => console.error("Erreur chargement champions", err));
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
    setSuggestions(filtered.slice(0, 5));
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
                      className="suggestion-item"
                  >
                    {champ.name}
                  </li>
              ))}
            </ul>
        )}
      </Form>
  );
};

/* ─────────── Header component ─────────── */
const Header = () => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [mapLang, setMapLang] = useState('fr_FR');
  const toggleSearch = () => setIsOpenSearch(!isOpenSearch);
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
      <div className="ezy__nav5 dark-gray header-fixed">
        <Navbar expand="lg" className="py-3">
          <Container fluid>
            <Navbar.Brand href="#">
              <img src={logo} alt="Logo" style={{ height: "80px" }} />
            </Navbar.Brand>
            <Button variant="outline-light" className="ms-3" onClick={goHome}>
              Accueil
            </Button>

            <Navbar.Toggle aria-controls="ezy__nav5-navbar-nav">
              <span><span /></span>
            </Navbar.Toggle>

            <Navbar.Collapse id="ezy__nav5-navbar-nav" className="justify-content-end">
              <div className="d-flex align-items-lg-center ms-auto">
                <NavMenu routes={routes} />
                <NavMenu2 mapLang={mapLang} setMapLang={setMapLang} toggleSearch={toggleSearch} />
              </div>
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

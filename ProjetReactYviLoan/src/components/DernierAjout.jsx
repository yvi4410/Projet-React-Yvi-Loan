// src/components/DernierAjout.jsx
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import "../css/DernierAjout.css";                // paste the <style> of the template here

/* ══════════ Spell sub-component (template’s FeatureItem, tweaked) ══════════ */
const SpellItem = ({ spell }) => (
  <div className="d-flex ezy__featured25-item position-relative p-3 p-md-4 mb-3 mb-lg-4">
    <div className="ezy__featured25-icon mb-4 me-4">
      <img
        src={spell.icon}
        alt={spell.name}
        title=""
        className="w-12 h-12 rounded-md"
        style={{ width: 48, height: 48 }}
      />
    </div>
    <div>
      <h4 className="ezy__featured25-title fs-4 mb-3">{spell.name}</h4>
      <p className="ezy__featured25-content mb-0">{spell.shortDesc}</p>
    </div>

    {/* FULL description on hover (bootstrap tooltip-like) */}
    <div
      className="position-absolute bg-dark text-white p-2 rounded"
      style={{ left: 0, top: "100%", zIndex: 50, display: "none" }}
    >
      {spell.description}
    </div>
  </div>
);

SpellItem.propTypes = {
  spell: PropTypes.object.isRequired,
};

/* ════════════════════════ Main Component ═══════════════════════ */
const DernierAjout = () => {
  const [champ, setChamp] = useState(null);
  const [version, setVersion] = useState("");

  useEffect(() => {
    async function fetchLatest() {
      try {
        const versions = await fetch(
          "https://ddragon.leagueoflegends.com/api/versions.json"
        ).then((r) => r.json());
        const latest = versions[0];
        setVersion(latest);

        const list = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${latest}/data/fr_FR/champion.json`
        ).then((r) => r.json());
        const recentName = Object.values(list.data).sort(
          (a, b) => +b.key - +a.key
        )[0].id;

        const details = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${latest}/data/fr_FR/champion/${recentName}.json`
        ).then((r) => r.json());

        setChamp(details.data[recentName]);
      } catch (e) {
        console.error("Erreur :", e);
      }
    }
    fetchLatest();
  }, []);

  if (!champ) return null; // or a loader

  /* build data for view */
  const splash = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`;
  const spells = [
    {
      name: `Passif : ${champ.passive.name}`,
      shortDesc: champ.passive.name,
      description: champ.passive.description,
      icon: `https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${champ.passive.image.full}`,
    },
    ...champ.spells.map((s) => ({
      name: s.name,
      shortDesc: s.name,
      description: s.description,
      icon: `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${s.image.full}`,
    })),
  ];

  return (
    <section className="ezy__featured25 dark-gray">
      <Container>
        {/* Heading / sub-heading */}
        <Row className="mb-5 text-center justify-content-center">
          <Col lg={7}>
            <h2 className="ezy__featured25-heading mb-4">
              Dernier ajout (Champion)
            </h2>
            <p className="ezy__featured25-sub-heading mb-4">
              {champ.title}
            </p>
          </Col>
        </Row>

        {/* Content */}
        <Row className="position-relative">
          {/* right column : splash image inside a card, a bit like the template */}
          <Col lg={4} className="mb-4 mb-lg-0 order-lg-2">
            <div className="h-100">
              <div
                className="ezy__featured25-bg-holder"
                style={{ backgroundImage: `url(${splash})` }}
              />
              <Card className="ezy__featured25-card">
                <Card.Body className="p-0">
                  <div className="ezy__featured25-card-content px-3 py-4 px-lg-4 py-lg-5">
                    <h4 className="mb-4">Qui est-il ?</h4>
                    <p className="mb-0">{champ.lore}</p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>

          {/* left column : spell list */}
          <Col lg={6}>
            {spells.map((sp, i) => (
              <SpellItem spell={sp} key={i} />
            ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DernierAjout;

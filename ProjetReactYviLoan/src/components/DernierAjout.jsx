// src/components/DernierAjout.jsx
import React, { useEffect, useState, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import "../css/DernierAjout.css";

/* ══════════ Réglage : cadence de rafraîchissement (ms) ══════════ */
const POLL_INTERVAL = 60 * 60 * 1000; // 1 h

/* ══════════ Item compétence ══════════ */
const SpellItem = ({ spell }) => (
    <div className="d-flex ezy__featured25-item position-relative p-3 p-md-4 mb-3 mb-lg-4">
      <div className="ezy__featured25-icon mb-4 me-4">
        <img
            src={spell.icon}
            alt={spell.name}
            className="w-12 h-12 rounded-md"
            style={{ width: 48, height: 48 }}
        />
      </div>
      <div>
        <h4 className="ezy__featured25-title fs-4 mb-3">{spell.name}</h4>
        <p className="ezy__featured25-content mb-0">{spell.shortDesc}</p>
      </div>
    </div>
);
SpellItem.propTypes = { spell: PropTypes.object.isRequired };

/* ══════════ Composant principal ══════════ */
const DernierAjout = () => {
  const [champ, setChamp]   = useState(null);
  const [version, setVer]   = useState("");
  const timerRef            = useRef(null);

  // ─── Récupération du champion le plus récent ───
  const fetchLatestChampion = async () => {
    try {
      const [latestPatch] = await fetch(
          "https://ddragon.leagueoflegends.com/api/versions.json"
      ).then(r => r.json());
      setVer(latestPatch);

      console.log("DernierAjout: latest patch ➜", latestPatch);

      const list = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${latestPatch}/data/fr_FR/champion.json`
      ).then(r => r.json());

      const champs = Object.values(list.data);
      if (!champs.length) return;

      // le champion avec l’id numérique le plus haut est (quasi-)toujours le dernier sorti
      const newest = champs.reduce((acc, cur) =>
          +cur.key > +acc.key ? cur : acc
      );
      const details = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${latestPatch}/data/fr_FR/champion/${newest.id}.json`
      ).then(r => r.json());

      setChamp(details.data[newest.id]);
    } catch (err) {
      console.error("DernierAjout: fetch error ➜", err);
    }
  };

  // ─── Premier chargement + polling ───
  useEffect(() => {
    fetchLatestChampion();                        // 1) initial
    timerRef.current = setInterval(              // 2) rafraîchissement
        fetchLatestChampion,
        POLL_INTERVAL
    );
    return () => clearInterval(timerRef.current);
  }, []);

  if (!champ) return null; // ⏳ loader customisable

  /* Build view data */
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
          <Row className="mb-5 text-center justify-content-center">
            <Col lg={7}>
              <h2 className="ezy__featured25-heading mb-4">
                Dernier ajout&nbsp;: {champ.name}
              </h2>
              <p className="ezy__featured25-sub-heading mb-4">{champ.title}</p>
            </Col>
          </Row>

          <Row className="position-relative">
            {/* Splash à droite */}
            <Col lg={4} className="mb-4 mb-lg-0 order-lg-2">
              <div className="h-100">
                <div
                    className="ezy__featured25-bg-holder"
                    style={{ backgroundImage: `url(${splash})` }}
                />
              </div>
            </Col>

            {/* Compétences à gauche */}
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

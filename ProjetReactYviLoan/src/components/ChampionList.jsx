import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/ChampionList.css";

const ChampionList = () => {
  const [version, setVersion] = useState("");
  const [champions, setChampions] = useState([]);

  /* ─── Récupération des données Data Dragon ─── */
  useEffect(() => {
    (async () => {
      try {
        const [latest] = await fetch(
            "https://ddragon.leagueoflegends.com/api/versions.json"
        ).then((r) => r.json());

        setVersion(latest);

        const data = await fetch(
            `https://ddragon.leagueoflegends.com/cdn/${latest}/data/fr_FR/champion.json`
        ).then((r) => r.json());

        const champs = Object.values(data.data).sort((a, b) =>
            a.name.localeCompare(b.name, "fr")
        );
        setChampions(champs);
      } catch (e) {
        console.error("Champion fetch error:", e);
      }
    })();
  }, []);

  if (!champions.length) return null;

  return (
      /* id utilisé par le lien #champion-list dans le header */
      <section id="champion-list" className="ezy__portfolio5 dark-gray">
        <Container>
          <Row className="justify-content-center mb-4 mb-md-5">
            <Col lg={6} className="text-center">
              <p className="ezy__portfolio5-sub-heading mb-2">
                CHOISISSEZ VOTRE CHAMPION
              </p>
              <h2 className="ezy__portfolio5-heading mb-4">Liste des Champions</h2>
            </Col>
          </Row>

          <Row className="justify-content-center">
            {champions.map((champ) => (
                <Col xs={6} sm={4} md={3} lg={2} key={champ.id}>
                  <Link
                      to={`/champion/${champ.id}`}
                      className="text-decoration-none"
                  >
                    <div className="ezy__portfolio5-item position-relative mt-4">
                      <img
                          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`}
                          alt={champ.name}
                          className="champ-thumb d-block mx-auto"
                      />
                      <div className="ezy__portfolio5-content text-center p-2">
                        <h6 className="mb-0">{champ.name}</h6>
                      </div>
                    </div>
                  </Link>
                </Col>
            ))}
          </Row>
        </Container>
      </section>
  );
};

export default ChampionList;
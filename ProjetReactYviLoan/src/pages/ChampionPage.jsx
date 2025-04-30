import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, InputGroup, Button, Card, Spinner, FormCheck } from "react-bootstrap";
import ChampionStats from "../components/ChampionStats";
import ChampionAbilities from "../components/ChampionAbilities";
import ChampionAbilityDetail from "../components/ChampionAbilityDetail";
import ChampionFeature from "../components/ChampionFeature";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

const OPENAI_KEY = process.env.caca;

const ChampionPage = () => {
    const { name } = useParams();
    const [champion, setChampion] = useState(null);
    const [error, setError] = useState(null);

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [readAloud, setReadAloud] = useState(true); // ⬅︎ nouvel état


    useEffect(() => {
        const fetchChampion = async () => {
            try {
                const response = await fetch(
                    `https://ddragon.leagueoflegends.com/cdn/14.8.1/data/fr_FR/champion/${name}.json`
                );
                const data = await response.json();
                const champData = data.data[name];
                setChampion(champData);
                setQuestion("");
            } catch (err) {
                setError("Champion introuvable ou erreur de chargement.");
            }
        };

        fetchChampion();
    }, [name]);

    useEffect(() => {
        if (!loading && answer && readAloud && typeof window !== "undefined" && window.speechSynthesis) {
            // Annule toute lecture en cours avant d'en démarrer une nouvelle
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(answer);
            utter.lang = "fr-FR";
            utter.rate = 1;
            utter.pitch = 1;
            window.speechSynthesis.speak(utter);
        }
    }, [answer, loading, readAloud]);


    const askLoreBot = async (evt) => {
        evt.preventDefault();
        if (!question.trim()) return;
        if (!champion) return;

        const userPrompt = question.toLowerCase().includes(champion.name.toLowerCase())
            ? question
            : `${champion.name} : ${question}`;

        setLoading(true);
        setAnswer("");

        try {
            const res = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${OPENAI_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content:
                                "Tu es un expert du lore de League of Legends. Tu ne parles QUE du lore et des liens entre les personnages, toujours avec une touche d'humour. Interdiction absolue d'évoquer d'autres sujets !",
                        },
                        {
                            role: "system",
                            content: `Le champion concerné est ${champion.name}. Voici son lore : ${champion.lore}`,
                        },
                        { role: "user", content: userPrompt },
                    ],
                    temperature: 0.8,
                    max_tokens: 350,
                }),
            });
            const data = await res.json();
            const msg = data?.choices?.[0]?.message?.content;
            setAnswer(msg || "Aucune réponse disponible :(");
        } catch (e) {
            console.error("Erreur OpenAI :", e);
            setAnswer("Oups ! Une erreur est survenue, réessaye plus tard.");
        } finally {
            setLoading(false);
        }
    };

    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;
    if (!champion) return <div className="text-center mt-4">Chargement...</div>;

    const splashUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`;
    const version = "14.8.1";

    return (
        <section className="ezy__portfolio5 dark-gray champion-page w-full">
            <div className="champion-page d-flex flex-column min-vh-100 w-full m-0 p-0 text-white">
                <Header />

                {/* Zone Q/R OpenAI */}
                <Container className="mt-5 px-4 px-md-5">
                    <Card className="bg-dark bg-opacity-75 text-white p-4 border-0 shadow-lg">
                        <Form onSubmit={askLoreBot}>
                            <Form.Label className="fw-bold mb-2">
                                Pose-moi une question sur le lore de League&nbsp;of&nbsp;Legends&nbsp;!
                            </Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder={`Ex. : Quelle est la relation entre ${champion.name} et un autre personnage ?`}
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                />
                                <Button type="submit" variant="primary">
                                    Interroger
                                </Button>
                            </InputGroup>
                        </Form>

                        {/* Toggle pour activer/désactiver la lecture vocale */}
                        <FormCheck
                            type="switch"
                            id="read-aloud-toggle"
                            label="Lire la réponse à voix haute"
                            className="mt-3"
                            checked={readAloud}
                            onChange={() => setReadAloud(!readAloud)}
                        />

                        <div className="mt-4">
                            {loading && (
                                <div className="d-flex align-items-center gap-2">
                                    <Spinner animation="border" size="sm" />
                                    <span>Consultation de l'oracle de Runeterra…</span>
                                </div>
                            )}
                            {!loading && answer && (
                                <p className="mb-0" style={{ whiteSpace: "pre-line" }}>
                                    {answer}
                                </p>
                            )}
                        </div>
                    </Card>
                </Container>

                {/* Présentation du champion */}
                <ChampionFeature name={champion.name} lore={champion.lore} splashImage={splashUrl} />

                <div className="container-fluid my-5 px-5 w-full">
                    <div className="row mb-4">
                        <div className="col-12">
                            <ChampionAbilities champion={champion} />
                        </div>
                        <div className="row mb-4">
                            <div className="col-12">
                                <ChampionStats stats={champion.stats} />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-12">
                            <ChampionAbilityDetail ability={champion.spells[3]} championId={champion.id} version={version} />
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </section>
    );
};

export default ChampionPage;

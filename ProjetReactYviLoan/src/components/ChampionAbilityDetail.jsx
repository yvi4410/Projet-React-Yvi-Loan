import React from 'react';

const ChampionAbilityDetail = ({ ability }) => (
    <section className="my-6">
        <h2 className="text-2xl font-bold mb-4">{ability.name}</h2>
        <p className="mb-4 text-gray-700">{ability.description}</p>
        {ability.video && (
            <video controls className="w-full max-w-xl mx-auto rounded shadow">
                <source src={ability.video} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
        )}
    </section>
);

export default ChampionAbilityDetail;
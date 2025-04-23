import React from 'react';

const ChampionAbilities = ({ abilities }) => (
    <section className="my-6">
        <h2 className="text-2xl font-bold mb-4">Compétences</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {abilities.map((ability, index) => (
                <div key={index} className="text-center">
                    <img src={ability.icon} alt={ability.name} className="w-16 h-16 mx-auto" />
                    <p className="mt-2 text-sm">{ability.name}</p>
                </div>
            ))}
        </div>
    </section>
);

export default ChampionAbilities;
import React from 'react';

const ChampionLore = ({ lore }) => (
    <section className="my-6">
        <h2 className="text-2xl font-bold mb-2">Histoire</h2>
        <p className="text-gray-700">{lore}</p>
    </section>
);

export default ChampionLore;
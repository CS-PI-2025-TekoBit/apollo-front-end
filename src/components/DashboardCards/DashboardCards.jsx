import React from "react";
import cardsData from "../../data/cardsData";
import "./DashboardCards.css";

const DashboardCards = () => {
    return (
        <div className="cards">
            {cardsData.map((card) => (
                <div key={card.id} className={`card ${card.color}`}>
                    <p className="titulo">{card.title}</p>
                    <h3>{card.value}</h3>
                    <p className="unidades">{card.unit}</p>
                </div>
            ))}
        </div>
    );
};

export default DashboardCards;

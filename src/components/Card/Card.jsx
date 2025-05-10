import React from 'react';
import '/.Card.css';

const Card = () => {
    <>
        <div className="card">
            <div className="img-card-container">
                <img src="" alt="" className="img-card" />
            </div>
            <div className="texto-card">
                <h1 className="titulo-card">Carro tal</h1>
                <p className="valor-card"><span>Preço:</span>R$119.000,00</p>
                <p className="marca-card"><span>Marca:</span>Chevrolet</p>
                <p className="tracao-card"><span>Tração:</span>Tração nas 4 rodas</p>
                <p className="ano-card"><span>Ano:</span>2022</p>
                <p className="km-card"><span>KM:</span>35.000 km</p>
            </div>

            <button className="botao-ver-detalhes">Ver Detalhes</button>
        </div>
    </>
}
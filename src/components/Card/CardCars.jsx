import React from 'react';
import './CardCars.css';
export default function Card(
    {
        name = "",
        imgs = "",
        model = "" 
    }
) {
   return (
    <>
        <div className="card-cars">
            <div className="img-card-container">
                <img src={imgs} alt="" className="img-card" />
            </div>
            <div className="txt-card-cars">
                   <h1 className="titulo-card-cars">{name}</h1>
                   <p className="valor-card-cars"><span>Preço:</span>R$119.000,00</p>
                   <p className="marca-card-cars"><span>Marca:</span>{model}</p>
                   <p className="tracao-card-cars"><span>Tração:</span>Tração nas 4 rodas</p>
                   <p className="ano-card-cars"><span>Ano:</span>2022</p>
                   <p className="km-card-cars"><span>KM:</span>35.000 km</p>
            </div>

               <button className="botao-card-cars">Ver Detalhes</button>
        </div>
    </>
   )
}
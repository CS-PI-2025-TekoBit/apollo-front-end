import React from 'react';
import './CardCars.css';
export default function Card(
    {
        name = "",
        imgs = "",
        mark = "",
        price = "",
        traction = "",
        year = "",
        kilometers = ""
    }
) {
   return (
    <>
        <div className="card-cars">
                <img src={imgs} alt="" className="img-card" />
            
            <div className="txt-card-cars">
                   <h1 className="titulo-card-cars">{mark} {name}</h1>
                   <p className="valor-card-cars"><span>Preço: </span>{price}</p>
                   <p className="marca-card-cars"><span>Marca: </span>{mark}</p>
                   <p className="tracao-card-cars"><span>Tração: </span>{traction}</p>
                   <p className="ano-card-cars"><span>Ano: </span>{year}</p>
                   <p className="km-card-cars"><span>KM: </span>{kilometers}</p>
                
                <button className="botao-card-cars">Ver Detalhes</button>
            </div>

        </div>
    </>
   )
}
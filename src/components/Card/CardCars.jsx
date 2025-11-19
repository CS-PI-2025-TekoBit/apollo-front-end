import React from 'react';
import './CardCars.css';
import { NavLink } from 'react-router';
import Slider from 'react-slick';
import { Heart } from "@phosphor-icons/react"; 
import { useFavorites } from "../../hooks/useFavorites"; 
import { toast } from "react-toastify";

export default function Card(
    {
        id = "",
        name = "",
        imgs = "",
        mark = "",
        price = "",
        transmission = "",
        year = "",
        kilometers = "",
        disableSlideImgs = false,
    }
) {

    const { isFavorite, toggleFavorite } = useFavorites();

    const handleFavorite = (e) => {
        e.preventDefault(); 
        
        const alreadyFavorite = isFavorite(id);

        toggleFavorite({
            id_car: id,
            model: name,
            brand: mark,
            images: imgs,
            vehiclePrice: price,
            transmission,
            year,
            mileage: kilometers
        });

        if (alreadyFavorite) {
            toast.info("Removido dos favoritos.");
        } else {
            toast.success("Adicionado aos favoritos!");
        }
    };

    const settings = {
        infinite: true,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <NavLink to={`/carros/${id}`} className="card-cars">

            <button className="favorite-btn" onClick={handleFavorite}>
                <Heart
                    size={22}
                    weight={isFavorite(id) ? "fill" : "regular"}
                    color={isFavorite(id) ? "#f32727ff" : "#555"}
                />
            </button>

            {!disableSlideImgs ? (
                <Slider {...settings}>
                    {imgs.map((img, index) => (
                        <div key={index}>
                            <img
                                src={`${img?.img_url}`}
                                alt={`Slide ${index + 1}`}
                                className="card-img"
                            />
                        </div>
                    ))}
                </Slider>
            ) : (
                <img
                    src={`${imgs[0]?.img_url}`}
                    alt="First Slide"
                    className="card-img"
                />
            )}

            <div className="txt-card-cars">
                <h1 className="titulo-card-cars">{mark} {name.split(" ")[0]}</h1>
                <p className="marca-card-cars"><span>Marca: </span>{mark}</p>
                <p className="tracao-card-cars"><span>Transmissão: </span>{transmission}</p>
                <p className="ano-card-cars"><span>Ano: </span>{year}</p>
                <p className="km-card-cars"><span>KM: </span>{kilometers}</p>
                <p className="valor-card-cars">
                    {price?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </p>
                <div className="btn-detalhes">
                    <button to={`/carros/${id}`} className="botao-card-cars">Ver Detalhes</button>
                </div>
            </div>
        </NavLink>
    );
}

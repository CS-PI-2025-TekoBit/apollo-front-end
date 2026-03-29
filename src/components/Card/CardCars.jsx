import React from 'react';
import './CardCars.css';
import { NavLink } from 'react-router';
import Slider from 'react-slick';

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
    const getImageSrc = (img) => {
        if (!img) return '';
        if (typeof img === 'string') return img;
        return img.imgUrl || img.img_url || '';
    };

    const formatPrice = (value) => {
        const numericValue = Number(value);
        if (Number.isNaN(numericValue)) return 'R$ 0,00';
        return numericValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
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
        <>
            <NavLink to={`/carros/${id}`} className="card-cars">
                {!disableSlideImgs ? (
                    <Slider {...settings}>
                        {imgs.map((img, index) => (
                            <div key={index}>
                                <img
                                    src={getImageSrc(img)}
                                    alt={`Slide ${index + 1}`}
                                    className="card-img"
                                />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <img
                        src={getImageSrc(imgs?.[0])}
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
                        {formatPrice(price)}</p>
                    <div className="btn-detalhes">
                        <button to={`/carros/${id}`} className="botao-card-cars">Ver Detalhes</button>
                    </div>
                </div>
            </NavLink>
        </>
    )
}
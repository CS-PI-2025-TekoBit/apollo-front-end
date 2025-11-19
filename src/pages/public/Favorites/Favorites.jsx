import React from "react";
import "./Favorites.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Card from "../../../components/Card/CardCars";
import { useFavorites } from "../../../hooks/useFavorites";

export default function Favorites() {
    const { favorites } = useFavorites();
    const ViewportHeight = window.innerHeight;

    return (
        <>
            <Header />

            <div className={ViewportHeight > 800 ? "favorites-content" : "favorites-content-mobile"}>
                <h1 className="favorites-title">Meus Favoritos</h1>

                {favorites.length === 0 ? (
                    <p className="no-favorites-message">Você ainda não adicionou nenhum carro aos favoritos.</p>
                ) : (
                    <div className="favorites-grid">
                        {favorites.map((car) => (
                            <Card
                                key={car.id_car}
                                id={car.id_car}
                                name={car.model}
                                mark={car.brand}
                                imgs={car.images}
                                price={car.vehiclePrice}
                                transmission={car.transmission}
                                year={car.year}
                                kilometers={car.mileage}
                                disableSlideImgs={true}
                            />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}

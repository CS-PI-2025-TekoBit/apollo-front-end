import React from 'react'
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import Maps from '../../../components/Maps/Maps'
import './Home.css'
import { useAllCars } from '../../../hooks/useAllCar'
import { useFilters } from '../../../hooks/useFilters'
import { useAuth } from '../../../hooks/useAuth';
import GenericInput from '../../../components/GenericInput/GenericInput';
import { useState, useEffect } from 'react';



export default function Home() {
    const { cars } = useAllCars()
    const { filtros } = useFilters()
    const { user } = useAuth()

    const [minYear, setMinYear] = useState('');
    const [maxYear, setMaxYear] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minKm, setMinKm] = useState('');
    const [maxKm, setMaxKm] = useState('');

    function aplicarFiltros() {
        const yearMin = Number(minYear);
        const yearMax = Number(maxYear);

        const priceMin = Number(minPrice);
        const priceMax = Number(maxPrice);

        const kmMin = Number(minKm);
        const kmMax = Number(maxKm);

        const filtrosFinal = {
            year: {
            min: yearMin >= 0 ? yearMin : null,
            max: yearMax >= yearMin && yearMax >= 0 ? yearMax : null,
        },
        price: {
            min: priceMin >= 0 ? priceMin : null,
            max: priceMax >= priceMin && priceMax >= 0 ? priceMax : null,
        },
        km: {
            min: kmMin >= 0 ? kmMin : null,
            max: kmMax >= kmMin && kmMax >= 0 ? kmMax : null,
        },
        };
        console.log(filtrosFinal);
    };

    useEffect(() => {
        aplicarFiltros();
    }, [minYear, maxYear, minPrice, maxPrice, minKm, maxKm]);

    return (
        <>
            <Header />
            <main>
                <div className="container-stock ">
                    <div className={`left-side-stock`} >
                        <h1 className={`title-filters`}>
                            Filtros
                        </h1>
                        <div className="filters">
                            <div>
                                <GenericInput
                                    label="Ano"
                                    type="number"
                                    value={minYear}
                                    onChange={(e) => setMinYear(e.target.value)}
                                    placeholder="De..."
                                />

                                <GenericInput
                                    type="number"
                                    value={maxYear}
                                    onChange={(e) => setMaxYear(e.target.value)}
                                    placeholder="Até..."
                                />
                            </div>

                            <div>
                                <GenericInput
                                    label="Preço"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    placeholder="De..."
                                    mask={true}
                                />

                                <GenericInput
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    placeholder="Até..."
                                    mask={true}
                                />
                            </div>

                            <div>
                                <GenericInput
                                    label="Kilometragem"
                                    type="number"
                                    value={minKm}
                                    onChange={(e) => setMinKm(e.target.value)}
                                    placeholder="De..."
                                />

                                <GenericInput
                                    type="number"
                                    value={maxKm}
                                    onChange={(e) => setMaxKm(e.target.value)}
                                    placeholder="Até..."
                                />
                            </div>
                        </div>

                    </div>
                    <div className="right-side-stock">
                        {user && (
                            <div className="container-user">
                                <h1>Olá, {user.id}</h1>
                                <h1>Seja bem-vindo(a)!</h1>
                                <h1>Você está logado como {user.role}</h1>
                            </div>
                        )}
                        <h1> Carros aqui</h1>
                    </div>
                </div>
            </main>
            <Maps />
            <Footer />
        </>
    )
}

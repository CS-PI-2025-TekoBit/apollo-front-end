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
        const filtrosFinal = {
            year: {
                min: minYear,
                max: maxYear > minYear ? maxYear : null,
            },
            price: {
                min: minPrice,
                max: maxPrice > minPrice ? maxPrice : null,
            },
            km: {
                min: minKm,
                max: maxKm > minKm ? maxKm : null,
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
                            <div className="filters">
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

                                <button onClick={aplicarFiltros}>Aplicar Filtros</button>

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
                        </h1>
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

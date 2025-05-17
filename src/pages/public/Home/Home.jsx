import React from 'react'
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import Maps from '../../../components/Maps/Maps'
import './Home.css'
import { useAllCars } from '../../../hooks/useAllCar'
import { useFilters } from '../../../hooks/useFilters'
import { useAuth } from '../../../hooks/useAuth';
import GenericInput from '../../../components/GenericInput/GenericInput';
import { useState } from 'react';



export default function Home() {
    const { cars } = useAllCars()
    const { filtros } = useFilters()
    const { user } = useAuth()

    const [price, setPrice] = useState('');

    return (
        <>
            <Header />
            {console.log("carros", cars)}
            <main>
                <div className="container-stock ">
                    <div className={`left-side-stock`} >
                        <h1 className={`title-filters`}>
                            Filtros
                            <div className="filters">
                                <GenericInput
                                    label="Preço"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Digite o valor"
                                    mask={true}
                                />

                                <GenericInput
                                    label="Preço 2"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Digite o valor"
                                    mask={false}
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

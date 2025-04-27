import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Maps from '../../components/Maps/Maps'
import './Home.css'
import { useAllCars } from '../../hooks/useAllCar'
import { useFilters } from '../../hooks/useFilters'

export default function Home() {
    const { cars } = useAllCars()
    const { filtros } = useFilters()

    return (
        <>
            <Header />
            <main>
                <div className="container-stock ">
                    <div className={`left-side-stock`} >
                        <h1 className={`title-filters`}>
                            Filtros
                            <div className="filters">
                                <h1>FILTROS AQUI</h1>
                            </div>
                        </h1>
                    </div>
                    <div className="right-side-stock">
                        <h1> Carros aqui</h1>
                    </div>
                </div>
            </main>
            <Maps />
            <Footer />
        </>
    )
}

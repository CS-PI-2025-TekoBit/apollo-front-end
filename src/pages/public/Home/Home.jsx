import React from 'react'
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import Maps from '../../../components/Maps/Maps'
import './Home.css'
import { useAllCars } from '../../../hooks/useAllCar'
import { useFilters } from '../../../hooks/useFilters'
import { useAuth } from '../../../hooks/useAuth';
import Card from '../../../components/Card/CardCars'
import { data } from 'react-router'

export default function Home() {
    const { cars } = useAllCars()
    const { filtros } = useFilters()
    const { user } = useAuth()
    

    return (
        <>
        {console.log(cars)}
            <Header />
            {console.log("carros", cars)}
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
                      {cars?.map((car)=>(
                        <Card 
                            name={car.model}
                            imgs={car.imgs}
                            mark={car.mark}
                            price={car.price}
                            traction={car.traction}
                            year={car.year}
                            kilometers={car.kilometers}
                        />
                      ))}
                    </div>
                </div>
            </main>
            <Maps />
            <Footer />
        </>
    )
}

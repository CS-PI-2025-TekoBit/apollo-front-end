import React from 'react'
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import Maps from '../../../components/Maps/Maps'
import './Home.css'
import { useAllCars } from '../../../hooks/useAllCar'
import { useFilters } from '../../../hooks/useFilters'
import { useAuth } from '../../../hooks/useAuth';
import Card from '../../../components/Card/CardCars'

export default function Home() {
    const { cars } = useAllCars()
    const { filtros } = useFilters()
    const { user } = useAuth()
    const mobilete  =
    {
        "data": [
            {
                "id_car": "1",
                "model": "Mercedes-Benz A 200",
                "mark": "Mercedes-Benz",
                "year": 2020,
                "kilometers": 20000,
                "condition": "Novo",
                "transmission": "Automático",
                "color": "Preto",
                "price": 150000,
                "description": "Mercedes-Benz A 200 2020, 20.000 km, Novo, Automático, Preto, R$ 150.000",
                "motors": "2.0 Turbo",
                "bodywork": "Hatch",
                "fuel": "Gasolina",
                "traction": "Dianteira",
                "final_plate": "ABC1D23",
                "trade": "Não",
                "blindage": "Não",
                "imgs": "https://res.cloudinary.com/dmlfcxheq/image/upload/v1739130007/pumbya2zy2chfeds7l7h.jpg"
                
            },
            {
                "id_car": "2",
                "model": "Mercedes-Benz A 200",
                "mark": "Mercedes-Benz",
                "year": 2020,
                "kilometers": 20000,
                "condition": "Novo",
                "transmission": "Automático",
                "color": "Preto",
                "price": 150000,
                "description": "Mercedes-Benz A 200 2020, 20.000 km, Novo, Automático, Preto, R$ 150.000",
                "motors": "2.0 Turbo",
                "bodywork": "Hatch",
                "fuel": "Gasolina",
                "traction": "Dianteira",
                "final_plate": "ABC1D23",
                "trade": "Não",
                "blindage": "Não",
                "imgs": "https: //res.cloudinary.com/dmlfcxheq/image/upload/v1739129797/ikjjdlcasl9vwna65wzl.jpg",
                
            }
        ]
    }

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
                        {user && (
                            <div className="container-user">
                                <h1>Olá, {user.id}</h1>
                                <h1>Seja bem-vindo(a)!</h1>
                                <h1>Você está logado como {user.role}</h1>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Maps />
            <Footer />
        </>
    )
}

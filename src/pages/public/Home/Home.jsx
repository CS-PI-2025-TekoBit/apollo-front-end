import React from 'react'
import { useState } from 'react';
import GenericCheckbox from '../../../components/CheckBox/GenericCheckbox'
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import Maps from '../../../components/Maps/Maps'
import './Home.css'
import { useAllCars } from '../../../hooks/useAllCar'
import { useFilters } from '../../../hooks/useFilters'
import { useAuth } from '../../../hooks/useAuth';

export default function Home() {
    const { cars } = useAllCars()
    const { filtros, isLoading } = useFilters()
    const { user } = useAuth()
    const [checkboxStates, setCheckboxStates] = useState({
        "Câmbio": [],
        "Direção": [],
        "Combustível": [],
        "Carroceria": []
    });

    const handleCheckboxChange = (label, optionId) => {
        setCheckboxStates((prev) => {
            const currentSelections = prev[label] || [];
            let newSelections;
            if (currentSelections.includes(optionId)) {
                newSelections = currentSelections.filter((id) => id !== optionId);
            } else {
                newSelections = [...currentSelections, optionId];
            }
            const updatedStates = {
                ...prev,
                [label]: newSelections
            };
            // console.log('Checkbox States:', updatedStates);
            return updatedStates;
        });
    };

    return (
        <>
            {isLoading === true ?
                <>
                    <p>Carregando</p>
                </> :
                <>
                    <Header />
                    <main>
                        <div className="container-stock ">
                            <div className={`left-side-stock`} >
                                <h1 className={`title-filters`}>
                                    Filtros
                                    <div className="filters">
                                        <h1>FILTROS AQUI</h1>
                                        <GenericCheckbox
                                            options={filtros?.transmission}
                                            label={"Câmbio"}
                                            onChange={handleCheckboxChange}
                                            checkedValues={checkboxStates["Câmbio"]}
                                        />
                                        <GenericCheckbox
                                            options={filtros?.direction}
                                            label={"Direção"}
                                            onChange={handleCheckboxChange}
                                            checkedValues={checkboxStates["Direção"]}
                                        />
                                        <GenericCheckbox
                                            options={filtros?.fuel}
                                            label={"Combustível"}
                                            onChange={handleCheckboxChange}
                                            checkedValues={checkboxStates["Combustível"]}
                                        />
                                        <GenericCheckbox
                                            options={filtros?.bodywork}
                                            label={"Carroceria"}
                                            onChange={handleCheckboxChange}
                                            checkedValues={checkboxStates["Carroceria"]}
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
            }
        </>
    )
}

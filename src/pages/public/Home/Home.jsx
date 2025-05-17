import React, { useState } from 'react'
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import Maps from '../../../components/Maps/Maps'
import './Home.css'
import { useAllCars } from '../../../hooks/useAllCar'
import { useFilters } from '../../../hooks/useFilters'
import { useAuth } from '../../../hooks/useAuth';
import GenericSelect from '../../../components/GenericSelect/GenericSelect'

export default function Home() {
    const { cars } = useAllCars()
    const { filtros } = useFilters()
    const { user } = useAuth()

    const [selectedMark, setSelectedMark] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedMotor, setSelectedMotors] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    
    const filteredModels = filtros?.models.filter(model => model.mark === selectedMark);

    const handleMarkChange = (e) => {
        setSelectedMark(e.target.value);
        setSelectedModel(''); 
    };

    const handleModelChange = (e) => {
        setSelectedModel(e.target.value);
    };

    const handleMotorChange = (e) => {
        setSelectedMotors(e.target.value);
    };

    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
    };

    return (
        <>
            <Header />
            <main>
                <div className="container-stock ">
                    <div className={`left-side-stock`} >
                        <h1 className="title-filters">
                            Filtros
                            <div className="filters">
                                {/* Aqui você insere o select */}
                                <GenericSelect
                                    label="Selecione a Marca"
                                    placeholder="Selecione uma marca"
                                    options={filtros?.marks}
                                    value={selectedMark}
                                    onChange={handleMarkChange}
                                />

                                <GenericSelect
                                    label="Selecione o Modelo"
                                    placeholder="Selecione um modelo"
                                    options={filteredModels}
                                    value={selectedModel}
                                    onChange={handleModelChange}
                                    disabled={!selectedMark} // Desabilita se não houver marca selecionada
                                />

                                <GenericSelect
                                    label="Selecione o Motor"
                                    placeholder="Selecione um motor"
                                    options={filtros?.motors}
                                    value={selectedMotor}
                                    onChange={handleMotorChange}
                                />

                                <GenericSelect
                                    label="Selecione a Cor"
                                    placeholder="Selecione uma cor"
                                    options={filtros?.colors}
                                    value={selectedColor}
                                    onChange={handleColorChange}
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
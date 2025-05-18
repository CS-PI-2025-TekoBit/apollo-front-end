import React, { useState } from 'react'
import GenericChoice from '../../../components/Choice/GenericChoice'
import GenericCheckbox from '../../../components/CheckBox/GenericCheckbox'
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
    const { filtros, isLoading } = useFilters()
    const { user } = useAuth()
    const [acceptsTrade, setAcceptsTrade] = useState(null);
    const [hasArmor, setHasArmor] = useState(null);
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
                                <GenericChoice
                                    label="Aceita troca ?"
                                    onChange={setAcceptsTrade}
                                    value={acceptsTrade}
                                />
                                            <GenericSelect
                                    label="Selecione a Cor"
                                    placeholder="Selecione uma cor"
                                    options={filtros?.colors}
                                    value={selectedColor}
                                    onChange={handleColorChange}
                                />
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
                             <GenericChoice
                                    label="Blindagem ?"
                                    onChange={setHasArmor}
                                    value={hasArmor}
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
import React, { useEffect, useState } from 'react'
import GenericChoice from '../../../components/Choice/GenericChoice'
import GenericCheckbox from '../../../components/CheckBox/GenericCheckbox'
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import Maps from '../../../components/Maps/Maps'
import BotaoWhatsApp from '../../../components/BotaoWhatsApp/BotaoWhatsApp'
import './Home.css'
import filter_active from '../../../assets/filter_1.svg';
import filter_deactivate from '../../../assets/filter_2.svg';
import { useAllCars } from '../../../hooks/useAllCar'
import { useFilters } from '../../../hooks/useFilters'
import { useAuth } from '../../../hooks/useAuth';
import Card from '../../../components/Card/CardCars'
import GenericInput from '../../../components/GenericInput/GenericInput';
import GenericSelect from '../../../components/GenericSelect/GenericSelect'
import { useNavigate } from 'react-router'

export default function Home() {
    const { cars } = useAllCars()
    const { filtros, isLoading } = useFilters()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [filterActive, setFilterActive] = useState(false);
    const [acceptsTrade, setAcceptsTrade] = useState(null);
    const [hasArmor, setHasArmor] = useState(null);
    const [checkboxStates, setCheckboxStates] = useState({
        "Câmbio": [],
        "Direção": [],
        "Combustível": [],
        "Carroceria": [],
        "Carros": [] //novos e usados
    });

    const novoUsado = [{
        "id": "1",
        "name": "Novos"
    },
    {
        "id": "2",
        "name": "Usados"
    }]

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
            console.log('Checkbox States:', updatedStates);
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

    };

    useEffect(() => {
        aplicarFiltros();
    }, [minYear, maxYear, minPrice, maxPrice, minKm, maxKm]);

    useEffect(() => {
        if (user?.role === "ROLE_ADMIN") {
            navigate('/admin/colors')
        }
    }, [user])

    return (
        <>
            {isLoading === true ?
                <>
                    <p>Carregando</p>
                </> :
                <>
                    {user?.role === 'ROLE_ADMIN' && navigate('/admin')}
                    <Header />
                    <main>
                        <div className="container-stock " >
                            <div className="filter-opening-mobile">
                                <button className='filter-button' onClick={() => setFilterActive(!filterActive)}>
                                    {filterActive ?
                                        <>
                                            <img src={filter_deactivate} alt="" className='filter-icon' />
                                            <span>
                                                Desativar os filtros
                                            </span>
                                        </>
                                        : <>
                                            <img src={filter_active} alt="" className='filter-icon' />
                                            <span>
                                                Ativar Filtros
                                            </span>
                                        </>
                                    }
                                </button>
                            </div>
                            <div className={`left-side-stock  ${!filterActive ? 'deactivate-filter' : ''}`} >
                                <h1 className={`title-filters`}>
                                    Filtros
                                </h1>
                                <div className="filters">
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

                                    <h6 className='generic-label-checkbox'>Carros</h6>
                                    <div className='container-checkbox'>
                                        {novoUsado.map((option) => (
                                            <label
                                                key={option.id}
                                                className="container-checkbox"
                                            >
                                                <span className="checkbox-name">{option.name}</span>
                                                <input
                                                    type="checkbox"
                                                    name={`condition-${option.id}`}
                                                    id={`condition-${option.id}`}
                                                    value={option.value}
                                                    checked={checkboxStates["Carros"]?.includes(option.id) || false}
                                                    onChange={() => handleCheckboxChange("Carros", option.id)}
                                                    className="checkbox"
                                                />
                                                <span className="checkmark"></span>
                                            </label>
                                        ))}
                                    </div>

                                    <div className='container-inputs'>
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
                                    <div className='container-inputs'>
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
                                    <div className='container-inputs'>
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

                            </div>
                            <div className="right-side-stock">
                                {cars?.map((car) => (
                                    <Card
                                        key={car.id_car}
                                        id={car.id_car}
                                        name={car.model}
                                        imgs={car.images}
                                        mark={car.brand}
                                        price={car.vehiclePrice}
                                        traction={car.traction}
                                        year={car.year}
                                        kilometers={car.mileage}
                                        disableSlideImgs={true}
                                    />
                                ))}
                            </div>
                        </div>
                    </main>
                    <Maps />
                    <Footer />
                    <BotaoWhatsApp />
                </>
            }
        </>
    )
}
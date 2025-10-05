import { useEffect, useState } from 'react'
import GenericChoice from '../../../components/Choice/GenericChoice'
import GenericCheckbox from '../../../components/CheckBox/GenericCheckbox'
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import Maps from '../../../components/Maps/Maps'
import BotaoWhatsApp from '../../../components/BotaoWhatsApp/BotaoWhatsApp'
import './Home.css'
import filter_active from '../../../assets/filter_1.svg'
import filter_deactivate from '../../../assets/filter_2.svg'
import { useFilters } from '../../../hooks/useFilters'
import Card from '../../../components/Card/CardCars'
import GenericInput from '../../../components/GenericInput/GenericInput'
import GenericSelect from '../../../components/GenericSelect/GenericSelect'
import notFound from '../../../assets/not_found.png'
import { useSalesCarFilter } from '../../../hooks/useSalesCarFilter'

export default function Home() {
    const [filterParams, setFilterParams] = useState({})
    const { cars } = useSalesCarFilter(filterParams)
    const { filtros, isLoading } = useFilters()

    const [filterActive, setFilterActive] = useState(false)
    const [acceptsTrade, setAcceptsTrade] = useState(null)
    const [hasArmor, setHasArmor] = useState(null)
    const [checkboxStates, setCheckboxStates] = useState({
        "Câmbio": [],
        "Direção": [],
        "Combustível": [],
        "Carroceria": [],
        "Carros": []
    })
    const novoUsado = [
        { "id": "1", "name": "NOVO" },
        { "id": "2", "name": "USADO" }
    ]
    const [minYear, setMinYear] = useState('')
    const [maxYear, setMaxYear] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [minKm, setMinKm] = useState('')
    const [maxKm, setMaxKm] = useState('')

    const [selectedMark, setSelectedMark] = useState('')
    const [selectedModel, setSelectedModel] = useState('')
    const [selectedMotor, setSelectedMotors] = useState('')
    const [selectedColor, setSelectedColor] = useState('')

    // PAGINAÇÃO
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const handleCheckboxChange = (label, optionId) => {
        setCheckboxStates((prev) => {
            const currentSelections = prev[label] || []
            const newSelections = currentSelections.includes(optionId)
                ? currentSelections.filter((id) => id !== optionId)
                : [...currentSelections, optionId]
            return { ...prev, [label]: newSelections }
        })
    }

    const filteredModels = filtros?.models.filter(model => model.mark === selectedMark)

    const handleMarkChange = (e) => {
        setSelectedMark(e.target.value)
        setSelectedModel('')
    }

    const handleModelChange = (e) => {
        setSelectedModel(e.target.value)
    }

    const handleMotorChange = (e) => {
        setSelectedMotors(e.target.value)
    }

    const handleColorChange = (e) => {
        setSelectedColor(e.target.value)
    }

    const normalizeKey = (key) => key
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()

    const getBackendParamName = (key) => {
        const mapping = {
            "Câmbio": "transmission",
            "Direção": "direction",
            "Combustível": "fuel",
            "Carroceria": "bodywork"
        }
        return mapping[key] || normalizeKey(key)
    }

    const montarParametros = () => {
        const params = {}

        if (minYear) params.yearMin = parseInt(minYear)
        if (maxYear) params.yearMax = parseInt(maxYear)
        if (minPrice) params.priceMin = parseFloat(minPrice)
        if (maxPrice) params.priceMax = parseFloat(maxPrice)
        if (minKm) params.mileageMin = parseInt(minKm)
        if (maxKm) params.mileageMax = parseInt(maxKm)

        if (selectedMark) params.brand = selectedMark
        if (selectedModel) params.model = selectedModel
        if (selectedMotor) params.motor = selectedMotor
        if (selectedColor) params.color = selectedColor

        params.carType = "VENDA"

        Object.keys(checkboxStates).forEach((key) => {
            if (checkboxStates[key].length > 0) {
                if (key === "Carros") params.vehicleCondition = checkboxStates[key]
                else params[getBackendParamName(key)] = checkboxStates[key]
            }
        })

        if (acceptsTrade !== null) params.acceptsTrade = acceptsTrade
        if (hasArmor !== null) params.hasArmor = hasArmor

        return params
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = montarParametros()
            setFilterParams(params)
        }, 50)
        return () => clearTimeout(timeout)
    }, [minYear, maxYear, minPrice, maxPrice, minKm, maxKm, selectedMark, selectedModel, selectedMotor, selectedColor, checkboxStates, acceptsTrade, hasArmor])

    useEffect(() => {
        setCurrentPage(1)
    }, [filterParams])

    // PAGINAÇÃO - calcula carros da página atual
    const indexOfLastCar = currentPage * itemsPerPage
    const indexOfFirstCar = indexOfLastCar - itemsPerPage
    const currentCars = cars?.slice(indexOfFirstCar, indexOfLastCar)
    const totalPages = Math.ceil((cars?.length || 0) / itemsPerPage)

    // Função para gerar array de páginas com "..."
    const getPageNumbers = () => {
        const pageNumbers = []
        const maxVisiblePages = 5 // pode ajustar para mais páginas visíveis
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) pageNumbers.push(i)
        } else {
            if (currentPage <= 3) {
                pageNumbers.push(1, 2, 3, 4, '...', totalPages)
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
            } else {
                pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
            }
        }
        return pageNumbers
    }

    return (
        <>
            {isLoading ? (
                <p>Carregando</p>
            ) : (
                <>
                    <Header />
                    <main>
                        <h3 className='header-title'>Carros para venda</h3>
                        <div className="container-stock">
                            <div className="filter-opening-mobile">
                                <button className='filter-button' onClick={() => setFilterActive(!filterActive)}>
                                    {filterActive ? (
                                        <>
                                            <img src={filter_deactivate} alt="" className='filter-icon' />
                                            <span>Desativar os filtros</span>
                                        </>
                                    ) : (
                                        <>
                                            <img src={filter_active} alt="" className='filter-icon' />
                                            <span>Ativar Filtros</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* FILTROS */}
                            <div className={`left-side-stock ${!filterActive ? 'deactivate-filter' : ''}`}>
                                <h1 className="title-filters">Filtros</h1>
                                <div className="filters">
                                    {/* Mesmos filtros do seu código */}
                                    <GenericSelect label="Selecione a Marca" placeholder="Selecione uma marca" options={filtros?.marks} value={selectedMark} onChange={handleMarkChange} />
                                    <GenericSelect label="Selecione o Modelo" placeholder="Selecione um modelo" options={filteredModels} value={selectedModel} onChange={handleModelChange} disabled={!selectedMark} />
                                    <GenericSelect label="Selecione o Motor" placeholder="Selecione um motor" options={filtros?.motors} value={selectedMotor} onChange={handleMotorChange} />
                                    <GenericChoice label="Aceita troca ?" onChange={setAcceptsTrade} value={acceptsTrade} />
                                    <h6 className='generic-label-checkbox'>Carros</h6>
                                    <div className='container-checkbox'>
                                        {novoUsado.map((option) => (
                                            <label key={option.id} className="container-checkbox">
                                                <span className="checkbox-name">{option.name}</span>
                                                <input type="checkbox" checked={checkboxStates["Carros"]?.includes(option.name) || false} onChange={() => handleCheckboxChange("Carros", option.name)} className="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        ))}
                                    </div>
                                    <div className='container-inputs'>
                                        <GenericInput label="Ano" type="number" value={minYear} onChange={(e) => setMinYear(e.target.value)} placeholder="De..." />
                                        <GenericInput type="number" value={maxYear} onChange={(e) => setMaxYear(e.target.value)} placeholder="Até..." />
                                    </div>
                                    <div className='container-inputs'>
                                        <GenericInput label="Preço" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="De..." mask={true} />
                                        <GenericInput value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Até..." mask={true} />
                                    </div>
                                    <div className='container-inputs'>
                                        <GenericInput label="Kilometragem" type="number" value={minKm} onChange={(e) => setMinKm(e.target.value)} placeholder="De..." />
                                        <GenericInput type="number" value={maxKm} onChange={(e) => setMaxKm(e.target.value)} placeholder="Até..." />
                                    </div>
                                    <GenericSelect label="Selecione a Cor" placeholder="Selecione uma cor" options={filtros?.colors} value={selectedColor} onChange={handleColorChange} />
                                    <GenericCheckbox options={filtros?.transmission} label="Câmbio" onChange={handleCheckboxChange} checkedValues={checkboxStates["Câmbio"]} />
                                    <GenericCheckbox options={filtros?.direction} label="Direção" onChange={handleCheckboxChange} checkedValues={checkboxStates["Direção"]} />
                                    <GenericCheckbox options={filtros?.fuel} label="Combustível" onChange={handleCheckboxChange} checkedValues={checkboxStates["Combustível"]} />
                                    <GenericCheckbox options={filtros?.bodywork} label="Carroceria" onChange={handleCheckboxChange} checkedValues={checkboxStates["Carroceria"]} />
                                    <GenericChoice label="Blindagem ?" onChange={setHasArmor} value={hasArmor} />
                                </div>
                            </div>

                            {/* LISTA DE CARROS */}
                            <div className="right-side-stock">
                                {currentCars?.length > 0 ? (
                                    currentCars.map((car) => (
                                        <Card
                                            key={car.id_car}
                                            id={car.id_car}
                                            name={car.model}
                                            imgs={car.images}
                                            mark={car.brand}
                                            price={car.vehiclePrice}
                                            transmission={car.transmission}
                                            year={car.year}
                                            kilometers={car.mileage}
                                            disableSlideImgs={true}
                                        />
                                    ))
                                ) : (
                                    <div className="not-found-container">
                                        <img src={notFound} alt="" className='not-found-image' />
                                        <h1 className='not-found-text'>Nenhum carro encontrado</h1>
                                        <p className="not-found-description">
                                            Não encontramos nenhum carro com base nos filtros selecionados, tente novamente com outros filtros ou sem filtros.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* PAGINAÇÃO */}
                        {cars?.length > 0 && (
                            <div className="pagination-container" style={{ textAlign: 'center', marginTop: '20px' }}>
                                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>{'<'}</button>
                                {getPageNumbers().map((num, index) =>
                                    num === '...' ? (
                                        <span key={index} style={{ margin: '0 5px' }}>...</span>
                                    ) : (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentPage(num)}
                                            style={{
                                                margin: '0 5px',
                                                fontWeight: '900',
                                                color: currentPage === num ? '#ffffff' : '#002411',
                                                backgroundColor: currentPage === num ? '#002411' : 'transparent',
                                                padding: '8px 14px',
                                                borderRadius: '4px',
                                                fontSize: '1.3rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {num}
                                        </button>

                                    )
                                )}
                                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>{'>'}</button>
                            </div>
                        )}

                    </main>
                    <Maps />
                    <Footer />
                    <BotaoWhatsApp />
                </>
            )}
        </>
    )
}

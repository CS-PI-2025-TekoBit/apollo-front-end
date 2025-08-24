import { ArrowLeft } from 'lucide-react';
import { Button } from 'primereact/button';
import { useRef, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { TrashIcon } from '@phosphor-icons/react';
import { X } from 'lucide-react';
import { Check } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import GenericSelect from '../../../components/GenericSelect/GenericSelect';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from "primereact/inputtextarea";
import OptionalSelector from '../../../components/OptionalCars/OptionCars';
import { useColors } from '../../../hooks/useColors';
import { useFuel } from '../../../hooks/useFuel';
import Api from '../../../api/api';

function CarRegister() {
    const navigate = useNavigate();
    const { colors, isLoading } = useColors();
    const { fuel } = useFuel();
    const fileUploadRef = useRef(null);
    const toast = useRef(null);
    const queryClient = useQueryClient();

    const [totalSize, setTotalSize] = useState(0);
    const [inputKey, setInputKey] = useState(0);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        car_images: [],
        brand: null,
        brand_code: null,
        model: null,
        year: null,
        carType: null,
        condition: '',
        licensePlateEnd: null,
        color: '',
        blind: '',
        vehiclePrice: '',
        mileage: '',
        transmission: null,
        direction: null,
        fuel: null,
        bodywork: null,
        vehicleStatus: null,
        acceptsExchange: null,
        description: '',
        optionalFeatures: []
    });

    const [fipeData, setFipeData] = useState({
        brands: [],
        models: [],
        years: [],
        loadingBrands: false,
        loadingModels: false,
        loadingYears: false,
        loadingPrice: false
    });

    const POPULAR_BRANDS = [
        'Volkswagen', 'GM - Chevrolet', 'Fiat', 'Ford', 'Toyota', 'Honda', 'Hyundai',
        'Renault', 'Nissan', 'Peugeot', 'Citroën', 'Jeep', 'BMW', 'Mercedes-Benz',
        'Audi', 'Mitsubishi', 'Suzuki', 'Kia', 'Volvo', 'Land Rover'
    ];

    const OPTIONS = {
        carTypes: [
            { name: 'Utilitário' },
            { name: 'Sedan' },
            { name: 'SUV' },
            { name: 'Hatchback' },
            { name: 'Coupe' }
        ],
        transmissions: [
            { name: 'Automático' },
            { name: 'Manual' },
            { name: 'CVT' },
            { name: 'Semi-automático' }
        ],
        directions: [
            { name: 'Hidráulica' },
            { name: 'Elétrica' },
            { name: 'Mecânica' },
            { name: 'Eletro-hidráulica' }
        ],
        fuels: [
            { name: 'Gasolina' },
            { name: 'Álcool' },
            { name: 'Flex' },
            { name: 'Diesel' },
            { name: 'Híbrido' },
            { name: 'Elétrico' }
        ],
        bodyworks: [
            { name: 'Sedan' },
            { name: 'Hatchback' },
            { name: 'SUV' },
            { name: 'Pickup' },
            { name: 'Conversível' }
        ],
        vehicleStatuses: [
            { name: 'VENDIDO' },
            { name: 'DISPONIVEL' },
            { name: 'ALUGADO' }
        ]
    };

    // ================== FUNÇÕES DA API FIPE ==================

    const fetchFipeBrands = async () => {
        setFipeData(prev => ({ ...prev, loadingBrands: true }));
        try {
            const response = await fetch('https://parallelum.com.br/fipe/api/v2/cars/brands');
            const brands = await response.json();
            setFipeData(prev => ({ ...prev, brands: brands, loadingBrands: false }));
        } catch (error) {
            console.error('Erro ao buscar marcas:', error);
            setFipeData(prev => ({ ...prev, loadingBrands: false }));
            showToast('error', 'Erro', 'Erro ao carregar marcas da FIPE');
        }
    };

    const fetchFipeModels = async (brandCode) => {
        if (!brandCode) return;

        setFipeData(prev => ({ ...prev, loadingModels: true, models: [], years: [] }));
        setFormData(prev => ({ ...prev, model: null, year: null, vehiclePrice: '' }));

        try {
            const response = await fetch(`https://parallelum.com.br/fipe/api/v2/cars/brands/${brandCode}/models`);
            const models = await response.json();

            setFipeData(prev => ({
                ...prev,
                models: models.map(model => ({ name: model.name, code: model.code })),
                loadingModels: false
            }));
        } catch (error) {
            console.error('Erro ao buscar modelos:', error);
            setFipeData(prev => ({ ...prev, loadingModels: false }));
            showToast('error', 'Erro', 'Erro ao carregar modelos');
        }
    };

    const fetchFipeYears = async (brandCode, modelCode) => {
        if (!brandCode || !modelCode) return;

        setFipeData(prev => ({ ...prev, loadingYears: true, years: [] }));
        setFormData(prev => ({ ...prev, year: null, vehiclePrice: '' }));

        try {
            const response = await fetch(`https://parallelum.com.br/fipe/api/v2/cars/brands/${brandCode}/models/${modelCode}/years`);
            const years = await response.json();

            setFipeData(prev => ({
                ...prev,
                years: years.map(year => ({ name: year.name, code: year.code })),
                loadingYears: false
            }));
        } catch (error) {
            console.error('Erro ao buscar anos:', error);
            setFipeData(prev => ({ ...prev, loadingYears: false }));
            showToast('error', 'Erro', 'Erro ao carregar anos');
        }
    };

    const fetchFipePrice = async (brandCode, modelCode, yearCode) => {
        if (!brandCode || !modelCode || !yearCode) return;

        setFipeData(prev => ({ ...prev, loadingPrice: true }));

        try {
            const response = await fetch(`https://parallelum.com.br/fipe/api/v2/cars/brands/${brandCode}/models/${modelCode}/years/${yearCode}`);
            const priceData = await response.json();

            if (priceData.price) {
                const priceNumber = parseFloat(priceData.price.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));
                setFormData(prev => ({ ...prev, vehiclePrice: priceNumber }));
                showToast('info', 'Preço FIPE', `Valor sugerido: ${priceData.price}`);
            }
        } catch (error) {
            console.error('Erro ao buscar preço:', error);
            showToast('error', 'Erro', 'Erro ao buscar preço FIPE');
        } finally {
            setFipeData(prev => ({ ...prev, loadingPrice: false }));
        }
    };

    // ================== HANDLERS ==================

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };

    const handleBrandChange = (selectedBrandValue) => {
        const selectedBrand = fipeData.brands.find(brand => brand.name === selectedBrandValue.target.value);
        setFormData(prev => ({
            ...prev,
            brand: selectedBrand.name,
            brand_code: selectedBrand.code,
            model: null,
            year: null,
            vehiclePrice: ''
        }));

        if (selectedBrand?.code) {
            fetchFipeModels(selectedBrand.code);
        } else {
            setFipeData(prev => ({ ...prev, models: [], years: [] }));
        }
    };

    const handleModelChange = (selectedModelValue) => {

        const selectedModel = fipeData.models.find(model => model.name === selectedModelValue.target.value);

        setFormData(prev => ({
            ...prev,
            model: selectedModel.name,
            year: null,
            vehiclePrice: ''
        }));

        if (formData.brand_code && selectedModel?.code) {
            fetchFipeYears(formData.brand_code, selectedModel.code);
        } else {
            setFipeData(prev => ({ ...prev, years: [] }));
        }
    };

    const handleYearChange = (selectedYearValue) => {
        const selectedYear = fipeData.years.find(year => year.name === selectedYearValue.target.value);
        let combustivel;
        if (selectedYear.name.includes('Gasolina') || selectedYear.name.includes('Diesel') || selectedYear.name.includes('Híbrido')) {
            combustivel = selectedYear.name.split(' ')[1];
        }
        setFormData(prev => ({
            ...prev,
            year: selectedYear.name,
            fuel: combustivel
        }));

    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRadioChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.files);
        setFormData(prev => ({ ...prev, car_images: files }));
    };

    const handleClearFields = () => {
        setInputKey(prevKey => prevKey + 1);
        setFormData({
            car_images: [],
            brand: null,
            model: null,
            year: null,
            carType: null,
            condition: '',
            licensePlateEnd: null,
            color: '',
            blind: '',
            vehiclePrice: '',
            mileage: '',
            transmission: null,
            direction: null,
            fuel: null,
            bodywork: null,
            vehicleStatus: null,
            acceptsExchange: null,
            description: '',
            optionalFeatures: []
        });
        setFipeData(prev => ({ ...prev, models: [], years: [] }));
        setTotalSize(0);
        setErrors({});
    };

    // ================== VALIDAÇÃO E SALVAMENTO ==================

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = {
            car_images: 'Campo imagem é obrigatório',
            brand: 'Campo marca é obrigatório',
            model: 'Campo modelo é obrigatório',
            carType: 'Campo tipo de carro é obrigatório',
            condition: 'Campo condição é obrigatório',
            color: 'Campo cor é obrigatório',
            blind: 'Campo blindagem é obrigatório',
            vehiclePrice: 'Campo preço é obrigatório',
            mileage: 'Campo quilometragem é obrigatório',
            year: 'Campo ano é obrigatório',
            transmission: 'Campo câmbio é obrigatório',
            direction: 'Campo direção é obrigatório',
            fuel: 'Campo combustível é obrigatório',
            bodywork: 'Campo carroceria é obrigatório',
            vehicleStatus: 'Campo status é obrigatório'
        };

        Object.keys(requiredFields).forEach(field => {
            if (field === 'car_images' && (!formData[field] || formData[field].length === 0)) {
                newErrors[field] = requiredFields[field];
            } else if (field !== 'car_images' && !formData[field]) {
                console.log("erro", field)
                newErrors[field] = requiredFields[field];
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateAndSave = async () => {
        console.log('Form Data:', formData);
        if (!validateForm()) {
            showToast('error', 'Erro', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const yearFormate = formData.year ? formData.year.split(' ')[0] : '';

        const formDataToSend = new FormData();

        if (formData.car_images && formData.car_images.length > 0) {
            formData.car_images.forEach((image, index) => {
                formDataToSend.append(`car_images`, image);
            });
        }
        const dataToSend = {
            brand: formData.brand,
            model: formData.model,
            carType: formData.carType,
            condition: formData.condition,
            licensePlateEnd: formData.licensePlateEnd,
            color: formData.color,
            blind: formData.blind,
            vehiclePrice: formData.vehiclePrice,
            mileage: formData.mileage,
            year: yearFormate, // Ano formatado
            transmission: formData.transmission,
            direction: formData.direction,
            fuel: formData.fuel,
            bodywork: formData.bodywork,
            vehicleStatus: formData.vehicleStatus,
            acceptsExchange: formData.acceptsExchange,
            description: formData.description,
            optionalFeatures: JSON.stringify(formData.optionalFeatures)
        };
        Object.keys(dataToSend).forEach(key => {
            if (dataToSend[key] !== null && dataToSend[key] !== undefined && dataToSend[key] !== '') {
                formDataToSend.append(key, dataToSend[key]);
            }
        });
        try {
            const result = await Api.post('cars', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (result.status === 200 || result.status === 201) {
                showToast('success', 'Sucesso', 'Registro salvo com sucesso!');
                queryClient.invalidateQueries(['cars']);
                navigate(-1);
            } else {
                showToast('error', 'Erro', 'Erro ao salvar registro. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao salvar:', error);
            showToast('error', 'Erro', 'Erro ao salvar registro. Tente novamente.');
        }
    };

    // ================== FILE UPLOAD HANDLERS ==================

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        Object.keys(e.files).forEach((key) => {
            _totalSize += e.files[key].size || 0;
        });
        setTotalSize(_totalSize);
        handleImageUpload(e);
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        const updatedImages = formData.car_images.filter(img => img !== file);
        setFormData(prev => ({ ...prev, car_images: updatedImages }));
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
        setFormData(prev => ({ ...prev, car_images: [] }));
    };

    // ================== TEMPLATES ==================

    const headerTemplate = (options) => {
        const { className } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef?.current?.formatSize(totalSize) || '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 1rem', marginTop: '1rem' }}>
                <div style={{ color: '#f59e0b', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <i className="pi pi-exclamation-triangle"></i>
                    <span>Lembre-se o máximo de imagens é 8</span>
                </div>
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }} />
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => (
        <div className="flex align-items-center" style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
            <div className="flex align-items-center justify-content-center" style={{ width: '50%' }}>
                <img alt={file.name} role="presentation" src={file.objectURL} width={100} height={60} style={{ objectFit: 'cover', borderRadius: '4px' }} />
                <span className="flex flex-column text-left ml-3">
                    {file.name}
                    <small>{new Date().toLocaleDateString()}</small>
                </span>
            </div>
            <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
            <Button
                type="button"
                icon="pi pi-times"
                className="p-button-outlined p-button-rounded p-button-danger ml-auto"
                onClick={() => onTemplateRemove(file, props.onRemove)}
                style={{ backgroundColor: '#ef4444', borderColor: '#ef4444', color: 'white' }}
            />
        </div>
    );

    const emptyTemplate = () => (
        <div className="flex align-items-center flex-column" style={{ padding: '3rem' }}>
            <div style={{ fontSize: '4em', color: '#6b7280', marginBottom: '1rem' }}>
                <i className="pi pi-cloud-upload"></i>
            </div>
            <span style={{ fontSize: '1.2em', color: '#6b7280', marginBottom: '0.5rem' }}>
                Arraste e solte as imagens aqui
            </span>
            <span style={{ fontSize: '1em', color: '#9ca3af' }}>OU</span>
            <Button
                label="Clique para buscar a imagem"
                className="p-button-outlined mt-3"
                style={{ borderColor: '#6b7280', color: '#6b7280' }}
                onClick={() => console.log(fileUploadRef?.current)}
            />
        </div>
    );

    // ================== USEEFFECT ==================

    useEffect(() => {
        fetchFipeBrands();
    }, []);

    // ================== RENDER ==================

    return (
        <main style={{ position: 'relative', padding: '20px', zIndex: 2000 }}>
            <Toast ref={toast} />

            {/* Header */}
            <section className="header-cad w-full">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <button
                        className="back-button"
                        onClick={() => window.history.back()}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        <ArrowLeft size={20} color='black' />
                        <span>Voltar Para listagem</span>
                    </button>
                </div>
            </section>

            {/* Conteúdo */}
            <section className="content-cad">
                <form>
                    {/* Upload de Imagens */}
                    <div style={{ marginBottom: '2rem' }}>
                        <FileUpload
                            ref={fileUploadRef}
                            name="car_images[]"
                            multiple
                            accept="image/*"
                            customUpload
                            onSelect={onTemplateSelect}
                            onError={onTemplateClear}
                            onClear={onTemplateClear}
                            headerTemplate={headerTemplate}
                            itemTemplate={itemTemplate}
                            emptyTemplate={emptyTemplate}
                            chooseOptions={{
                                icon: 'pi pi-fw pi-car_images',
                                iconOnly: true,
                                className: 'custom-choose-btn p-button-rounded p-button-outlined',
                                style: { display: 'none' }
                            }}
                            style={{ border: '2px dashed #d1d5db', borderRadius: '8px' }}
                        />
                        {errors.car_images && <small className="p-error">{errors.car_images}</small>}
                    </div>

                    {/* Preview das Imagens */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '18px', fontWeight: 'bold' }}>Listagem das Imagens</h3>
                        {formData.car_images.length > 0 ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
                                {formData.car_images.map((file, index) => (
                                    <div key={index} style={{ position: 'relative' }}>
                                        <img
                                            src={file.objectURL || URL.createObjectURL(file)}
                                            alt={`Preview ${index}`}
                                            style={{
                                                width: '100%',
                                                height: '80px',
                                                objectFit: 'cover',
                                                borderRadius: '4px',
                                                border: '2px solid #e5e7eb'
                                            }}
                                        />
                                        <Button
                                            icon="pi pi-times"
                                            className="p-button-rounded p-button-danger p-button-sm"
                                            style={{
                                                position: 'absolute',
                                                top: '-8px',
                                                right: '-8px',
                                                width: '24px',
                                                height: '24px',
                                                backgroundColor: '#ef4444'
                                            }}
                                            onClick={() => {
                                                const updatedImages = formData.car_images.filter((_, i) => i !== index);
                                                setFormData(prev => ({ ...prev, car_images: updatedImages }));
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ color: '#6b7280' }}>Nenhuma imagem selecionada</p>
                        )}
                    </div>

                    {/* Formulário de dados */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>

                        {/* Marca */}
                        <div className="field">
                            <label>Marca <span style={{ color: 'red' }}>*</span></label>
                            <GenericSelect
                                options={fipeData.brands}
                                value={formData.brand}
                                onChange={handleBrandChange}
                                placeholder={fipeData.loadingBrands ? "Carregando marcas..." : "Selecione uma marca"}
                                disabled={fipeData.loadingBrands}
                                styleContainer={{ width: '100%', marginTop: '0px', gap: '0.1rem' }}
                                styleSelect={{ width: '100%', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.38)', padding: '0.75rem' }}
                                styleLabel={{ marginBottom: '0px' }}
                            />
                            {fipeData.loadingBrands && <i className="pi pi-spin pi-spinner" style={{ marginLeft: '10px' }}></i>}
                            {errors.brand && <small className="p-error">{errors.brand}</small>}
                        </div>

                        {/* Modelo */}
                        <div className="field">
                            <label>Modelo <span style={{ color: 'red' }}>*</span></label>
                            <GenericSelect
                                options={fipeData.models}
                                value={formData.model}
                                onChange={handleModelChange}
                                placeholder={fipeData.loadingModels ? "Carregando modelos..." : formData.brand ? "Selecione um modelo" : "Primeiro selecione uma marca"}
                                disabled={fipeData.loadingModels || !formData.brand}
                                styleContainer={{ width: '100%', marginTop: '0px', gap: '0.1rem' }}
                                styleSelect={{ width: '100%', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.38)', padding: '0.75rem' }}
                                styleLabel={{ marginBottom: '0px' }}
                            />
                            {fipeData.loadingModels && <i className="pi pi-spin pi-spinner" style={{ marginLeft: '10px' }}></i>}
                            {errors.model && <small className="p-error">{errors.model}</small>}
                        </div>

                        {/* Ano */}
                        <div className="field">
                            <label>Ano <span style={{ color: 'red' }}>*</span></label>
                            <GenericSelect
                                options={fipeData.years}
                                value={formData.year}
                                onChange={handleYearChange}
                                placeholder={fipeData.loadingYears ? "Carregando anos..." : formData.model ? "Selecione o ano" : "Primeiro selecione o modelo"}
                                disabled={fipeData.loadingYears || !formData.model}
                                styleContainer={{ width: '100%', marginTop: '0px', gap: '0.1rem' }}
                                styleSelect={{ width: '100%', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.38)', padding: '0.75rem' }}
                                styleLabel={{ marginBottom: '0px' }}
                            />
                            {fipeData.loadingYears && <i className="pi pi-spin pi-spinner" style={{ marginLeft: '10px' }}></i>}
                            {errors.year && <small className="p-error">{errors.year}</small>}
                        </div>

                        {/* Tipo de Carro */}
                        <div className="field">
                            <label>Tipo de Carro <span style={{ color: 'red' }}>*</span></label>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                <div className="flex align-items-center">
                                    <RadioButton
                                        inputId="carro-venda"
                                        name="carType"
                                        value="Venda"
                                        onChange={(e) => handleRadioChange('carType', e.value)}
                                        checked={formData.carType === 'Venda'}
                                    />
                                    <label htmlFor="carro-venda" className="ml-2">Venda</label>
                                </div>
                                <div className="flex align-items-center">
                                    <RadioButton
                                        inputId="carro-aluguel"
                                        name="carType"
                                        value="Aluguel"
                                        onChange={(e) => handleRadioChange('carType', e.value)}
                                        checked={formData.carType === 'Aluguel'}
                                    />
                                    <label htmlFor="carro-aluguel" className="ml-2">Aluguel</label>
                                </div>
                            </div>
                            {errors.carType && <small className="p-error">{errors.carType}</small>}
                        </div>

                        {/* Condição */}
                        <div className="field">
                            <label>Condição <span style={{ color: 'red' }}>*</span></label>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                <div className="flex align-items-center">
                                    <RadioButton
                                        inputId="condicao-novo"
                                        name="condition"
                                        value="Novo"
                                        onChange={(e) => handleRadioChange('condition', e.value)}
                                        checked={formData.condition === 'Novo'}
                                    />
                                    <label htmlFor="condicao-novo" className="ml-2">Novo</label>
                                </div>
                                <div className="flex align-items-center">
                                    <RadioButton
                                        inputId="condicao-usado"
                                        name="condition"
                                        value="Usado"
                                        onChange={(e) => handleRadioChange('condition', e.value)}
                                        checked={formData.condition === 'Usado'}
                                    />
                                    <label htmlFor="condicao-usado" className="ml-2">Usado</label>
                                </div>
                            </div>
                            {errors.condition && <small className="p-error">{errors.condition}</small>}
                        </div>

                        {/* Categoria - Avaliar se vai colocar mesmo */}
                        {/* <div className="field" style={{ gridColumn: '1 / -1' }}>
                            <label>Categoria <span style={{ color: 'red' }}>*</span></label>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                                {OPTIONS.carTypes.map((type) => (
                                    <div key={type.name} className="flex align-items-center" style={{ marginRight: '1rem' }}>
                                        <RadioButton
                                            inputId={`categoria-${type.name}`}
                                            name="carType"
                                            value={type.name}
                                            onChange={(e) => handleRadioChange('carType', e.value)}
                                            checked={formData.carType === type.name}
                                        />
                                        <label htmlFor={`categoria-${type.name}`} className="ml-2">{type.name}</label>
                                    </div>
                                ))}
                            </div>
                            {errors.carType && <small className="p-error">{errors.carType}</small>}
                        </div> */}

                        {/* Aceita Troca */}
                        <div className="field">
                            <label>Aceita Troca <span style={{ color: 'red' }}>*</span></label>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                <div className="flex align-items-center">
                                    <RadioButton
                                        inputId="aceita-sim"
                                        name="acceptsExchange"
                                        value="Sim"
                                        onChange={(e) => handleRadioChange('acceptsExchange', e.value)}
                                        checked={formData.acceptsExchange === 'Sim'}
                                    />
                                    <label htmlFor="aceita-sim" className="ml-2">Sim</label>
                                </div>
                                <div className="flex align-items-center">
                                    <RadioButton
                                        inputId="aceita-nao"
                                        name="acceptsExchange"
                                        value="Não"
                                        onChange={(e) => handleRadioChange('acceptsExchange', e.value)}
                                        checked={formData.acceptsExchange === 'Não'}
                                    />
                                    <label htmlFor="aceita-nao" className="ml-2">Não</label>
                                </div>
                            </div>
                            {errors.acceptsExchange && <small className="p-error">{errors.acceptsExchange}</small>}
                        </div>

                        {/* Cor */}
                        <div className="field">
                            <label>Cor <span style={{ color: 'red' }}>*</span></label>
                            <GenericSelect
                                options={colors}
                                value={formData.color}
                                onChange={(e) => handleSelectChange('color', e.target.value)}
                                placeholder={"Selecione uma cor"}
                                styleContainer={{ width: '100%', marginTop: '0px', gap: '0.1rem' }}
                                styleSelect={{ width: '100%', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.38)', padding: '0.75rem' }}
                                styleLabel={{ marginBottom: '0px' }}
                            />
                            {errors.color && <small className="p-error">{errors.color}</small>}
                        </div>

                        {/* Blindagem */}
                        <div className="field">
                            <label>Blindagem <span style={{ color: 'red' }}>*</span></label>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                <div className="flex align-items-center">
                                    <RadioButton
                                        inputId="blind-sim"
                                        name="blind"
                                        value="Sim"
                                        onChange={(e) => handleRadioChange('blind', e.value)}
                                        checked={formData.blind === 'Sim'}
                                    />
                                    <label htmlFor="blind-sim" className="ml-2">Sim</label>
                                </div>
                                <div className="flex align-items-center">
                                    <RadioButton
                                        inputId="blind-nao"
                                        name="blind"
                                        value="Não"
                                        onChange={(e) => handleRadioChange('blind', e.value)}
                                        checked={formData.blind === 'Não'}
                                    />
                                    <label htmlFor="blind-nao" className="ml-2">Não</label>
                                </div>
                            </div>
                            {errors.blind && <small className="p-error">{errors.blind}</small>}
                        </div>

                        {/* Preço do veículo */}
                        <div className="field">
                            <label>Preço do veículo <span style={{ color: 'red' }}>*</span></label>
                            <div style={{ position: 'relative' }}>
                                <InputNumber
                                    value={formData.vehiclePrice}
                                    onValueChange={(e) => handleSelectChange('vehiclePrice', e.value)}
                                    mode="currency"
                                    currency="BRL"
                                    locale="pt-BR"
                                    placeholder="Ex: R$ 152.000,00"
                                    className="w-full"

                                />
                                {fipeData.loadingPrice && (
                                    <i className="pi pi-spin pi-spinner" style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)'
                                    }}></i>
                                )}
                            </div>
                            {errors.vehiclePrice && <small className="p-error">{errors.vehiclePrice}</small>}
                        </div>

                        {/* Quilometragem */}
                        <div className="field">
                            <label>Quilometragem <span style={{ color: 'red' }}>*</span></label>
                            <InputText
                                name="mileage"
                                value={formData.mileage}
                                onChange={handleInputChange}
                                placeholder="Ex: 15.000"
                                className="w-full"
                                style={{ padding: '0.75rem' }}
                            />
                            {errors.mileage && <small className="p-error">{errors.mileage}</small>}
                        </div>

                        {/* Câmbio */}
                        <div className="field">
                            <label>Câmbio <span style={{ color: 'red' }}>*</span></label>
                            <GenericSelect
                                options={OPTIONS.transmissions}
                                value={formData.transmission}
                                onChange={(value) => handleSelectChange('transmission', value.target.value)}
                                placeholder="Ex: Automático"
                                styleContainer={{ width: '100%', marginTop: '0px', gap: '0.1rem' }}
                                styleSelect={{ width: '100%', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.38)', padding: '0.75rem' }}
                                styleLabel={{ marginBottom: '0px' }}
                            />
                            {errors.transmission && <small className="p-error">{errors.transmission}</small>}
                        </div>

                        {/* Direção */}
                        <div className="field">
                            <label>Direção <span style={{ color: 'red' }}>*</span></label>
                            <GenericSelect
                                options={OPTIONS.directions}
                                value={formData.direction}
                                onChange={(value) => handleSelectChange('direction', value.target.value)}
                                placeholder="Ex: Hidráulica"
                                styleContainer={{ width: '100%', marginTop: '0px', gap: '0.1rem' }}
                                styleSelect={{ width: '100%', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.38)', padding: '0.75rem' }}
                                styleLabel={{ marginBottom: '0px' }}
                            />
                            {errors.direction && <small className="p-error">{errors.direction}</small>}
                        </div>

                        {/* Combustível */}
                        <div className="field">
                            <label>Combustível <span style={{ color: 'red' }}>*</span></label>
                            <GenericSelect
                                options={fuel}
                                value={formData.fuel}
                                onChange={(value) => handleSelectChange('fuel', value.target.value)}
                                placeholder="Ex: Flex"
                                styleContainer={{ width: '100%', marginTop: '0px', gap: '0.1rem' }}
                                styleSelect={{ width: '100%', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.38)', padding: '0.75rem' }}
                                styleLabel={{ marginBottom: '0px' }}
                            />
                            {errors.fuel && <small className="p-error">{errors.fuel}</small>}
                        </div>

                        {/* Carroceria */}
                        <div className="field">
                            <label>Carroceria <span style={{ color: 'red' }}>*</span></label>
                            <GenericSelect
                                options={OPTIONS.bodyworks}
                                value={formData.bodywork}
                                onChange={(value) => handleSelectChange('bodywork', value.target.value)}
                                placeholder="Ex: Sedan"
                                styleContainer={{ width: '100%', marginTop: '0px', gap: '0.1rem' }}
                                styleSelect={{ width: '100%', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.38)', padding: '0.75rem' }}
                                styleLabel={{ marginBottom: '0px' }}
                            />
                            {errors.bodywork && <small className="p-error">{errors.bodywork}</small>}
                        </div>

                        {/* Status do veículo */}
                        <div className="field">
                            <label>Status do veículo <span style={{ color: 'red' }}>*</span></label>
                            <GenericSelect
                                options={OPTIONS.vehicleStatuses}
                                value={formData.vehicleStatus}
                                onChange={(value) => handleSelectChange('vehicleStatus', value.target.value)}
                                placeholder="Ex: Disponível"
                                styleContainer={{ width: '100%', marginTop: '0px', gap: '0.1rem' }}
                                styleSelect={{ width: '100%', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.38)', padding: '0.75rem' }}
                                styleLabel={{ marginBottom: '0px' }}
                            />
                            {errors.vehicleStatus && <small className="p-error">{errors.vehicleStatus}</small>}
                        </div>
                        <div className="field">
                            <label>Final de placa <span style={{ color: 'red' }}>*</span></label>
                            <InputNumber
                                placeholder='Ex: 1'
                                label='Final de placa'
                                maxLength={1}
                                min={0}
                                max={9}
                                value={formData.licensePlateEnd}
                                onValueChange={(e) => setFormData({ ...formData, licensePlateEnd: e.value || null })}
                                style={{ width: '100%' }}
                            />
                        </div>

                        <div className="field" style={{ gridColumn: '1 / -1' }}>
                            <label htmlFor="description" style={{ marginBottom: '1rem', display: 'block', fontWeight: 'bold' }}>Descrição</label>
                            <InputTextarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={5} cols={30} style={{ width: '100%' }} />
                        </div>
                        <div className="field" style={{ gridColumn: '1 / -1' }}>
                            <OptionalSelector
                                selectedOptionals={formData.optionalFeatures || []}
                                setSelectedOptionals={(value) => {
                                    setFormData(prev => ({ ...prev, optionalFeatures: value }));
                                }}
                            />
                        </div>
                    </div>
                </form>

                {/* Ações do formulário */}
                <div className="form-action" style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <p style={{ marginBottom: '1rem' }}>Os campos marcados com <span style={{ color: 'red' }}>*</span> são obrigatórios</p>
                    <div className="btn" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Button className='btn-generic btn-clean' onClick={handleClearFields}>
                            <TrashIcon size={20} weight='fill' color='white' />
                            Limpar Campos
                        </Button>
                        <NavLink to={() => navigate(-1)} className='btn-generic btn-cancel'>
                            <X size={20} weight='fill' color='white' />
                            Cancelar
                        </NavLink>
                        <Button className='btn-generic btn-save' onClick={validateAndSave}>
                            <Check size={20} weight='fill' color='white' />
                            Salvar
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default CarRegister;
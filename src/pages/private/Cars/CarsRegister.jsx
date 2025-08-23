import { ArrowLeft } from 'lucide-react';
import { Button } from 'primereact/button';
import React, { useRef, useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { TrashIcon } from '@phosphor-icons/react';
import { X } from 'lucide-react';
import { Check } from 'lucide-react';
import Api from '../../../api/api';
import { useQueryClient } from '@tanstack/react-query';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';
import GenericSelect from '../../../components/GenericSelect/GenericSelect';
import { InputNumber } from 'primereact/inputnumber';

function CarRegister() {
    const location = useLocation();
    const navigate = useNavigate();
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        images: [],
        brand: null,
        tipo_carro: null,
        model: null,
        carType: null,
        condition: '',
        motor: null,
        color: '',
        blind: '',
        vehiclePrice: '',
        mileage: '',
        year: null,
        transmission: null,
        direction: null,
        fuel: null,
        bodywork: null,
        vehicleStatus: null,
        acceptsExchange: null
    });

    // Estado para dados da FIPE
    const [fipeData, setFipeData] = useState({
        brands: [],
        models: [],
        years: [],
        loadingBrands: false,
        loadingModels: false,
        loadingYears: false,
        loadingPrice: false
    });

    const [inputKey, setInputKey] = useState(0);
    const [errors, setErrors] = useState({});
    const toast = React.useRef(null);

    // Buscar marcas da FIPE
    const fetchFipeBrands = async () => {
        setFipeData(prev => ({ ...prev, loadingBrands: true }));
        try {
            const response = await fetch('https://parallelum.com.br/fipe/api/v2/cars/brands');
            const brands = await response.json();
            setFipeData(prev => ({
                ...prev,
                brands: brands.map(brand => ({ name: brand.name, code: brand.code })),
                loadingBrands: false
            }));
        } catch (error) {
            console.error('Erro ao buscar marcas:', error);
            setFipeData(prev => ({ ...prev, loadingBrands: false }));
            toast.current.show({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao carregar marcas da FIPE'
            });
        }
    };

    // Buscar modelos baseado na marca
    const fetchFipeModels = async (brandCode) => {
        if (!brandCode) return;

        setFipeData(prev => ({ ...prev, loadingModels: true, models: [], years: [] }));
        setFormData(prev => ({ ...prev, model: null, year: null }));

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
            toast.current.show({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao carregar modelos'
            });
        }
    };

    // Buscar anos baseado no modelo
    const fetchFipeYears = async (brandCode, modelCode) => {
        if (!brandCode || !modelCode) return;

        setFipeData(prev => ({ ...prev, loadingYears: true, years: [] }));
        setFormData(prev => ({ ...prev, year: null }));

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
            toast.current.show({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao carregar anos'
            });
        }
    };

    // Buscar preço FIPE
    const fetchFipePrice = async (brandCode, modelCode, yearCode) => {
        if (!brandCode || !modelCode || !yearCode) return;

        setFipeData(prev => ({ ...prev, loadingPrice: true }));

        try {
            const response = await fetch(`https://parallelum.com.br/fipe/api/v2/cars/brands/${brandCode}/models/${modelCode}/years/${yearCode}`);
            const priceData = await response.json();

            if (priceData.price) {
                // Converter preço para número
                const priceNumber = parseFloat(priceData.price.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));
                setFormData(prev => ({
                    ...prev,
                    vehiclePrice: priceNumber
                }));

                toast.current.show({
                    severity: 'info',
                    summary: 'Preço FIPE',
                    detail: `Valor sugerido: ${priceData.price}`
                });
            }

        } catch (error) {
            console.error('Erro ao buscar preço:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao buscar preço FIPE'
            });
        } finally {
            setFipeData(prev => ({ ...prev, loadingPrice: false }));
        }
    };

    // Carregar marcas ao montar o componente
    useEffect(() => {
        fetchFipeBrands();
    }, []);

    // Handler para mudança de marca
    const handleBrandChange = (brand) => {
        console.log("marca", brand);
        setFormData(prev => ({ ...prev, brand, model: null, year: null, vehiclePrice: '' }));
        if (brand?.code) {
            fetchFipeModels(brand.code);
        }
    };

    // Handler para mudança de modelo
    const handleModelChange = (model) => {
        setFormData(prev => ({ ...prev, model, year: null, vehiclePrice: '' }));
        if (formData.brand?.code && model?.code) {
            fetchFipeYears(formData.brand.code, model.code);
        }
    };

    // Handler para mudança de ano
    const handleYearChange = (year) => {
        setFormData(prev => ({ ...prev, year, vehiclePrice: '' }));
        if (formData.brand?.code && formData.model?.code && year?.code) {
            fetchFipePrice(formData.brand.code, formData.model.code, year.code);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRadioChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.files);
        setFormData({ ...formData, images: files });
    };

    const handleClearFields = () => {
        setInputKey(prevKey => prevKey + 1);
        setFormData({
            images: [],
            brand: null,
            tipo_carro: null,
            model: null,
            carType: null,
            condition: '',
            motor: null,
            color: '',
            blind: '',
            vehiclePrice: '',
            mileage: '',
            year: null,
            transmission: null,
            direction: null,
            fuel: null,
            bodywork: null,
            vehicleStatus: null,
            acceptsExchange: null
        });
        setFipeData(prev => ({ ...prev, models: [], years: [] }));
        setTotalSize(0);
    };

    const validateForm = () => {
        let erros = {};
        if (!formData.images || formData.images.length === 0) erros.images = 'Campo imagem é obrigatório';
        if (!formData.brand) erros.brand = 'Campo marca é obrigatório';
        if (!formData.model) erros.model = 'Campo modelo é obrigatório';
        if (!formData.carType) erros.carType = 'Campo tipo de carro é obrigatório';
        if (!formData.condition) erros.condition = 'Campo condição é obrigatório';
        if (!formData.motor) erros.motor = 'Campo motor é obrigatório';
        if (!formData.color) erros.color = 'Campo cor é obrigatório';
        if (!formData.blind) erros.blind = 'Campo blindagem é obrigatório';
        if (!formData.vehiclePrice) erros.vehiclePrice = 'Campo preço é obrigatório';
        if (!formData.mileage) erros.mileage = 'Campo quilometragem é obrigatório';
        if (!formData.year) erros.year = 'Campo ano é obrigatório';
        if (!formData.transmission) erros.transmission = 'Campo câmbio é obrigatório';
        if (!formData.direction) erros.direction = 'Campo direção é obrigatório';
        if (!formData.fuel) erros.fuel = 'Campo combustível é obrigatório';
        if (!formData.bodywork) erros.bodywork = 'Campo carroceria é obrigatório';
        if (!formData.vehicleStatus) erros.vehicleStatus = 'Campo status é obrigatório';

        if (Object.keys(erros).length > 0) {
            setErrors(erros);
            return false;
        }
        return true;
    };

    const validateAndSave = async () => {
        if (validateForm()) {
            const formDataToSend = new FormData();
            formData.images.forEach((image, index) => {
                formDataToSend.append(`images[${index}]`, image);
            });
            formDataToSend.append('brand', formData.brand?.name);
            formDataToSend.append('model', formData.model?.name);
            formDataToSend.append('carType', formData.carType);
            formDataToSend.append('condition', formData.condition);
            formDataToSend.append('motor', formData.motor?.name);
            formDataToSend.append('color', formData.color);
            formDataToSend.append('blind', formData.blind);
            formDataToSend.append('vehiclePrice', formData.vehiclePrice);
            formDataToSend.append('mileage', formData.mileage);
            formDataToSend.append('year', formData.year?.name);
            formDataToSend.append('transmission', formData.transmission?.name);
            formDataToSend.append('direction', formData.direction?.name);
            formDataToSend.append('fuel', formData.fuel?.name);
            formDataToSend.append('bodywork', formData.bodywork?.name);
            formDataToSend.append('vehicleStatus', formData.vehicleStatus?.name);

            try {
                const result = await Api.post('cars', formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                if (result.status === 200 || result.status === 201) {
                    toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Registro salvo com sucesso!' });
                    queryClient.invalidateQueries(['cars']);
                    navigate(-1);
                } else {
                    toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar registro. Tente novamente.' });
                }
            } catch (error) {
                toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar registro. Tente novamente.' });
            }
        }
    };

    // Options data (mantidos os originais para outros campos)
    const motors = [
        { name: 'EC3 Bi-Turbo' },
        { name: 'V6 3.0' },
        { name: '1.4 TSI' },
        { name: '2.0 TFSI' },
        { name: '1.0 Turbo' }
    ];

    const carTypes = [
        { name: 'Utilitário' },
        { name: 'Sedan' },
        { name: 'SUV' },
        { name: 'Hatchback' },
        { name: 'Coupe' }
    ];

    const transmissions = [
        { name: 'Automático' },
        { name: 'Manual' },
        { name: 'CVT' },
        { name: 'Semi-automático' }
    ];

    const directions = [
        { name: 'Hidráulica' },
        { name: 'Elétrica' },
        { name: 'Mecânica' },
        { name: 'Eletro-hidráulica' }
    ];

    const fuels = [
        { name: 'Gasolina' },
        { name: 'Álcool' },
        { name: 'Flex' },
        { name: 'Diesel' },
        { name: 'Híbrido' },
        { name: 'Elétrico' }
    ];

    const bodyworks = [
        { name: 'Sedan' },
        { name: 'Hatchback' },
        { name: 'SUV' },
        { name: 'Pickup' },
        { name: 'Conversível' }
    ];

    const vehicleStatuses = [
        { name: 'Vendido' },
        { name: 'Disponível' },
        { name: 'Reservado' }
    ];

    // FileUpload handlers
    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
        handleImageUpload(e);
    };

    const onTemplateUpload = (e) => {
        let _totalSize = 0;
        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });
        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Sucesso', detail: 'Arquivo enviado' });
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        const updatedImages = formData.images.filter(img => img !== file);
        setFormData({ ...formData, images: updatedImages });
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
        setFormData({ ...formData, images: [] });
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 1rem', marginTop: '1rem' }}>
                <div style={{ color: '#f59e0b', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <i className="pi pi-exclamation-triangle"></i>
                    <span>Lembre-se o máximo de imagens é 8</span>
                </div>
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
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
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column" style={{ padding: '3rem' }}>
                <div style={{ fontSize: '4em', color: '#6b7280', marginBottom: '1rem' }}>
                    <i className="pi pi-cloud-upload"></i>
                </div>
                <span style={{ fontSize: '1.2em', color: '#6b7280', marginBottom: '0.5rem' }}>
                    Arraste e solte as imagens aqui
                </span>
                <span style={{ fontSize: '1em', color: '#9ca3af' }}>
                    OU
                </span>
                <Button
                    label="Clique para buscar a imagem"
                    className="p-button-outlined mt-3"
                    style={{ borderColor: '#6b7280', color: '#6b7280' }}
                    onClick={() => fileUploadRef.current.choose()}
                />
            </div>
        );
    };

    const chooseOptions = {
        icon: 'pi pi-fw pi-images',
        iconOnly: true,
        className: 'custom-choose-btn p-button-rounded p-button-outlined',
        style: { display: 'none' }
    };

    return (
        <main style={{ position: 'relative', padding: '20px', zIndex: 2000 }}>
            <Toast ref={toast} />

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

            <section className="content-cad">
                <form>
                    {/* Upload de Imagens */}
                    <div style={{ marginBottom: '2rem' }}>
                        <FileUpload
                            ref={fileUploadRef}
                            name="images[]"
                            multiple
                            accept="image/*"
                            customUpload
                            onSelect={onTemplateSelect}
                            onError={onTemplateClear}
                            onClear={onTemplateClear}
                            headerTemplate={headerTemplate}
                            itemTemplate={itemTemplate}
                            emptyTemplate={emptyTemplate}
                            chooseOptions={chooseOptions}
                            style={{ border: '2px dashed #d1d5db', borderRadius: '8px' }}
                        />
                        {errors.images && <small className="p-error">{errors.images}</small>}
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '18px', fontWeight: 'bold' }}>Listagem das Imagens</h3>
                        {formData.images.length > 0 ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
                                {formData.images.map((file, index) => (
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
                                                const updatedImages = formData.images.filter((_, i) => i !== index);
                                                setFormData({ ...formData, images: updatedImages });
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
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>

                        {/* Marca - Integrada com FIPE */}
                        <div className="field">
                            <label>Marca <span style={{ color: 'red' }}>*</span></label>
                            <GenericSelect
                                options={fipeData.brands}
                                value={formData.brand}
                                onChange={(e) => { handleBrandChange(e.value); console.log("marca", e) }}
                                placeholder={fipeData.loadingBrands ? "Carregando marcas..." : "Selecione uma marca"}
                                disabled={fipeData.loadingBrands}
                                styleContainer={{ width: '100%', marginTop: '0px', gap: '0.1rem' }}
                                styleSelect={{ width: '100%', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.38)', padding: '0.75rem' }}
                                styleLabel={{ marginBottom: '0px' }}
                            />
                            {fipeData.loadingBrands && <i className="pi pi-spin pi-spinner" style={{ marginLeft: '10px' }}></i>}
                            {errors.brand && <small className="p-error">{errors.brand}</small>}
                        </div>

                        {/* Modelo - Integrado com FIPE */}
                        <div className="field">
                            <label>Modelo <span style={{ color: 'red' }}>*</span></label>
                            <GenericSelect
                                options={fipeData.models}
                                value={formData.model}
                                onChange={(e) => handleModelChange(e.value)}
                                placeholder={fipeData.loadingModels ? "Carregando modelos..." : formData.brand ? "Selecione um modelo" : "Primeiro selecione uma marca"}
                                disabled={fipeData.loadingModels || !formData.brand}
                                styleContainer={{ width: '100%', marginTop: '0px', gap: '0.1rem' }}
                                styleSelect={{ width: '100%', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.38)', padding: '0.75rem' }}
                                styleLabel={{ marginBottom: '0px' }}
                            />
                            {fipeData.loadingModels && <i className="pi pi-spin pi-spinner" style={{ marginLeft: '10px' }}></i>}
                            {errors.model && <small className="p-error">{errors.model}</small>}
                        </div>

                        {/* Ano - Integrado com FIPE */}
                        <div className="field">
                            <label>Ano <span style={{ color: 'red' }}>*</span></label>
                            <GenericSelect
                                options={fipeData.years}
                                value={formData.year}
                                onChange={(e) => handleYearChange(e.value)}
                                placeholder={fipeData.loadingYears ? "Carregando anos..." : formData.model ? "Selecione o ano" : "Primeiro selecione o modelo"}
                                disabled={fipeData.loadingYears || !formData.model}
                                styleContainer={{ width: '100%', marginTop: '0px', gap: '0.1rem' }}
                                styleSelect={{ width: '100%', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.38)', padding: '0.75rem' }}
                                styleLabel={{ marginBottom: '0px' }}
                            />
                            {fipeData.loadingYears && <i className="pi pi-spin pi-spinner" style={{ marginLeft: '10px' }}></i>}
                            {errors.year && <small className="p-error">{errors.year}</small>}
                        </div>

                        {/* Tipo de carro */}
                        <div className="field">
                            <label>Tipo de Carro <span style={{ color: 'red' }}>*</span></label>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                <div className="flex align-items-center">
                                    <RadioButton
                                        inputId="carro-venda"
                                        name="tipo_carro"
                                        value="Venda"
                                        onChange={(e) => handleRadioChange('tipo_carro', e.value)}
                                        checked={formData.tipo_carro === 'Venda'}
                                    />
                                    <label htmlFor="carro-venda" className="ml-2">Venda</label>
                                </div>
                                <div className="flex align-items-center">
                                    <RadioButton
                                        inputId="carro-aluguel"
                                        name="tipo_carro"
                                        value="Aluguel"
                                        onChange={(e) => handleRadioChange('tipo_carro', e.value)}
                                        checked={formData.tipo_carro === 'Aluguel'}
                                    />
                                    <label htmlFor="carro-aluguel" className="ml-2">Aluguel</label>
                                </div>
                            </div>
                            {errors.tipo_carro && <small className="p-error">{errors.tipo_carro}</small>}
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

                        {/* Motor */}
                        <div className="field">
                            <label>Motor <span style={{ color: 'red' }}>*</span></label>
                            <GenericSelect
                                options={motors}
                                value={formData.motor}
                                onChange={(e) => setFormData({ ...formData, motor: e.value })}
                                placeholder="Ex: EC3 Bi-Turbo"
                                styleContainer={{ width: '100%', marginTop: '0px', gap: '0.1rem' }}
                                styleSelect={{ width: '100%', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.38)', padding: '0.75rem' }}
                                styleLabel={{ marginBottom: '0px' }}
                            />
                            {errors.motor && <small className="p-error">{errors.motor}</small>}
                        </div>

                        {/* Tipo de carro - Radio buttons em linha completa */}
                        <div className="field" style={{ gridColumn: '1 / -1' }}>
                            <label>Tipo de carro <span style={{ color: 'red' }}>*</span></label>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                                {carTypes.map((type) => (
                                    <div key={type.name} className="flex align-items-center" style={{ marginRight: '1rem' }}>
                                        <RadioButton
                                            inputId={`tipo-${type.name}`}
                                            name="carType"
                                            value={type.name}
                                            onChange={(e) => handleRadioChange('carType', e.value)}
                                            checked={formData.carType === type.name}
                                        />
                                        <label htmlFor={`tipo-${type.name}`} className="ml-2">{type.name}</label>
                                    </div>
                                ))}
                            </div>
                            {errors.carType && <small className="p-error">{errors.carType}</small>}
                        </div>

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
                            <InputText
                                name="color"
                                value={formData.color}
                                onChange={handleInputChange}
                                placeholder="Ex: Azul meia noite"
                                className="w-full"
                                style={{ padding: '0.75rem' }}
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

                        {/* Preço do veículo - Com integração FIPE */}
                        <div className="field">
                            <label>Preço do veículo <span style={{ color: 'red' }}>*</span></label>
                            <div style={{ position: 'relative' }}>
                                <InputNumber
                                    value={formData.vehiclePrice}
                                    onValueChange={(e) => setFormData(prev => ({ ...prev, vehiclePrice: e.value }))}
                                    mode="currency"
                                    currency="BRL"
                                    locale="pt-BR"
                                    placeholder="Ex: R$ 152.000,00"
                                    className="w-full"
                                    style={{ padding: '0.75rem' }}
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
                                options={transmissions}
                                value={formData.transmission}
                                onChange={(e) => setFormData({ ...formData, transmission: e.value })}
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
                                options={directions}
                                value={formData.direction}
                                onChange={(e) => setFormData({ ...formData, direction: e.value })}
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
                                options={fuels}
                                value={formData.fuel}
                                onChange={(e) => setFormData({ ...formData, fuel: e.value })}
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
                                options={bodyworks}
                                value={formData.bodywork}
                                onChange={(e) => setFormData({ ...formData, bodywork: e.value })}
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
                                options={vehicleStatuses}
                                value={formData.vehicleStatus}
                                onChange={(e) => setFormData({ ...formData, vehicleStatus: e.value })}
                                placeholder="Ex: Disponível"
                                styleContainer={{ width: '100%', marginTop: '0px', gap: '0.1rem' }}
                                styleSelect={{ width: '100%', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.38)', padding: '0.75rem' }}
                                styleLabel={{ marginBottom: '0px' }}
                            />
                            {errors.vehicleStatus && <small className="p-error">{errors.vehicleStatus}</small>}
                        </div>
                    </div>
                </form>

                <div className="form-action" style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <p style={{ marginBottom: '1rem' }}>Os campos marcados com <span style={{ color: 'red' }}>*</span> são obrigatórios</p>
                    <div className="btn" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Button className='btn-generic btn-clean' onClick={() => handleClearFields()}>
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
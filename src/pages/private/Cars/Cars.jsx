import { useState } from 'react';
import { CurrencyDollarSimple } from '@phosphor-icons/react';
import { Search } from 'lucide-react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { classNames } from 'primereact/utils';
import { Car } from 'lucide-react';
import { DataView } from 'primereact/dataview';
import { formatDateTime } from '../../../utils/formatDate';
import { Panel } from 'primereact/panel';
import SearchableSelect from '../../../components/SearchableSelect/SearchbleSelect';


import GenericLoader from '../../../components/GenericLoader/GenericLoader';
import './Cars.css';
import Api from '../../../api/api';
import { toast } from 'react-toastify';
import LoadingCar from '../../../components/LoadingCar/LoadingCar';
import { useColors } from '../../../hooks/useColors';
import { useBodyWork } from '../../../hooks/useBodyWork';
import { useFuel } from '../../../hooks/useFuel';
import { useTransmission } from '../../../hooks/useTransmission';
import { useAllCarsFiltered } from '../../../hooks/useAllCarsFiltered';
import { RadioButton } from 'primereact/radiobutton';
import ModalOperacao from './ModalOperacao';

function Cars() {
    const [layout, setLayout] = useState('list');
    const [loading, setLoading] = useState(false);
    const [filterParams, setFilterParams] = useState({});
    const [applyingFilters, setApplyingFilters] = useState(false);
    const { cars, isLoading } = useAllCarsFiltered(filterParams);
    const queryClient = useQueryClient();
    const { colors } = useColors();
    const { bodyWork } = useBodyWork();
    const { fuel } = useFuel();
    const { transmission } = useTransmission();
    const [modalVisible, setModalVisible] = useState(false);
    const [tipoOperacao, setTipoOperacao] = useState(0);
    const [idCar, setIdCar] = useState(null);
    const [operacaoParaEditar, setOperacaoParaEditar] = useState(null);

    const getMainImageUrl = (car) => {
        const firstImage = car?.images?.[0];
        if (!firstImage) return '';
        if (typeof firstImage === 'string') return firstImage;
        return firstImage.imgUrl || firstImage.img_url || '';
    };

    const getVehiclePrice = (price) => {
        const numericPrice = Number(price);
        if (Number.isNaN(numericPrice)) return 'R$ 0,00';
        return numericPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    };

    const [filters, setFilters] = useState({
        bodyWork: null,
        color: null,
        fuel: null,
        steering: null,
        transmission: null,
        minYear: null,
        maxYear: null,
        minPrice: null,
        maxPrice: null,
        carType: null
    });

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };
    const normalizeKey = (key) => {
        return key
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    };

    const getBackendParamName = (key) => {
        const mapping = {
            "bodyWork": "bodywork",
            "steering": "direction",
            "fuel": "fuel",
            "transmission": "transmission",
            "color": "color",
            "carType": "carType"
        };
        return mapping[key] || normalizeKey(key);
    };

    const montarParametros = () => {
        const params = {};

        if (filters.minYear) params.yearMin = parseInt(filters.minYear);
        if (filters.maxYear) params.yearMax = parseInt(filters.maxYear);

        if (filters.minPrice) params.priceMin = parseFloat(filters.minPrice);
        if (filters.maxPrice) params.priceMax = parseFloat(filters.maxPrice);

        Object.keys(filters).forEach((key) => {
            if (filters[key] !== null && !['minYear', 'maxYear', 'minPrice', 'maxPrice'].includes(key)) {
                const backendParamName = getBackendParamName(key);
                params[backendParamName] = filters[key];
            }
        });

        return params;
    };

    const aplicarFiltros = () => {
        const params = montarParametros();
        setFilterParams(params);
        setApplyingFilters(Object.keys(params).length > 0);
    };

    // Função para limpar os filtros
    const limparFiltros = () => {
        setFilters({
            bodyWork: null,
            color: null,
            fuel: null,
            steering: null,
            transmission: null,
            minYear: null,
            maxYear: null,
            minPrice: null,
            maxPrice: null
        });
        setFilterParams({});
        setApplyingFilters(false);
    };

    const listItem = (car, index) => {
        const handleDelete = (e) => {
            e.preventDefault();
            e.stopPropagation();
            Swal.fire({
                title: 'Deletar carro',
                text: 'Você tem certeza que deseja deletar este carro?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Deletar',
                confirmButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                buttons: true,
                dangerMode: true,
            }).then(async (willDelete) => {
                if (willDelete.isConfirmed) {
                    try {
                        setLoading(true);
                        const result = await Api.delete(`/cars/${car.idCar}`);
                        if (result.status === 204) {
                            queryClient.invalidateQueries({ queryKey: ['all_cars'] });
                            toast.success('Carro deletado com sucesso!');
                        } else {
                            toast.error('Erro ao deletar carro.');
                        }
                    } catch (error) {
                        toast.error('Erro ao deletar carro.');
                    } finally {
                        setLoading(false);
                    }
                }
            });
        };

        const abreModalOperacao = (carType, idCar, operacao = null) => {
            setTipoOperacao(carType === 'VENDA' ? 0 : 1);
            setIdCar(idCar);
            setOperacaoParaEditar(operacao);
            setModalVisible(true);
        }
        const carOperation = car.carOperation;
        let background;
        if (carOperation) {
            if (carOperation.tipoOperacao === 0)
                background = '#bbf7d0';
            else
                background = '#fde68a';
        } else {
            background = index % 2 === 0 ? '#f3f4f6' : '#ffffff';
        }
        return (
            <div className={`col-12  hover:bg-cyan-700 ${background}`} key={car.idCar || car.id} style={{ textDecoration: 'none', color: 'inherit', backgroundColor: background }} to={`/admin/cars/edit/${car.idCar}`}>
                <div className={classNames('flex flex-column justify-center xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <NavLink to={`/admin/cars/edit/${car.idCar}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1 }} className="flex flex-row align-items-start gap-3">
                        <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={getMainImageUrl(car)} alt={`${car?.brand || ''} ${car?.model || ''}`.trim()} />
                        <div className="flex flex-column sm:flex-row justify-content-start align-items-center flex-1 gap-4">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-1" style={{ width: '50%' }}>
                                <div className="text-2xl font-bold text-900">{car.brand + ' ' + car.model}</div>
                                <div className="text-500">Ano: {car.year} Km: {car.mileage}</div>
                                <div className="text-500">Preço:  {getVehiclePrice(car?.vehiclePrice)}</div>
                                <div className="text-500">Cor:  {car.color}</div>
                            </div>
                            <div className="flex flex-column align-items-center sm:align-items-start gap-1">
                                <div className="text-2xl font-bold text-900">Informações do cadastro</div>
                                <div className="text-500">Data de cadastro: {formatDateTime(car.dtCreate || car.dt_create)}</div>
                                <div className="text-500">Usuário de cadastro: {car.userName || ''}</div>
                                <div className="text-500">Tipo de carro:  {car.carType || ''}</div>
                            </div>
                        </div>
                    </NavLink>
                    <div className="flex-column align-items-center sm:align-items-end gap-3 h-full ">
                        <div className="flex sm:flex-row align-items-center justify-content-center  gap-3 sm:gap-2">
                            <NavLink to={`/admin/cars/edit/${car.idCar}`}>
                                <Button icon="pi pi-pencil" rounded severity="warning" aria-label="Edit" className='flex align-items-center justify-content-center'></Button>
                            </NavLink>
                            <Button icon="pi pi-trash" rounded severity="danger" className='flex align-items-center justify-content-center' onClick={(e) => handleDelete(e)}></Button>
                            {carOperation ? (
                                <Button
                                    icon="pi pi-pencil"
                                    onClick={() => abreModalOperacao(car.carType, car.idCar, carOperation)}
                                    rounded
                                    severity="info"
                                    tooltip="Editar operação"
                                    tooltipOptions={{ position: 'top' }}
                                />
                            ) : (
                                <Button
                                    icon={<CurrencyDollarSimple size={20} />}
                                    onClick={() => abreModalOperacao(car.carType, car.idCar)}
                                    rounded
                                    severity="success"
                                    tooltip="Cadastrar operação"
                                    tooltipOptions={{ position: 'top' }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div >
        );
    };

    const gridItem = (car) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={car.idCar || car.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            {/* <span className="font-semibold">{car.category}</span> */}
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={getMainImageUrl(car)} alt={`${car?.brand || ''} ${car?.model || ''}`.trim()} />
                        <div className="text-2xl font-bold">{`${car?.brand || ''} ${car?.model || ''}`.trim()}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">{getVehiclePrice(car?.vehiclePrice)}</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" ></Button>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" ></Button>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" ></Button>

                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (car, layout, index) => {
        if (!car) {
            return;
        }

        if (layout === 'list') return listItem(car, index);
        else if (layout === 'grid') return gridItem(car);
    };

    const listTemplate = (cars, layout) => {
        return <div className="grid grid-nogutter w-full h-2xl">{cars.map((car, index) => itemTemplate(car, layout, index))}</div>;
    };




    return (
        isLoading ? (
            <GenericLoader />
        ) : (
            <main style={{ position: 'relative', padding: '20px', zIndex: 2000 }}>
                <section className="header-list w-full">
                    <h3 className="text-header">001 - Listagem de carros cadastrados</h3>
                    <br />
                </section>
                <section className="title-page">
                    <div style={{ padding: '20px' }}> <h1 className='title'> Listagem de carros</h1></div>
                </section>
                <section className="content-list">
                    <div className="search-and-include">
                        <div className="search">
                            <InputText type="text" placeholder="Pesquisar" style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
                            <Button icon={<Search size={22} color='white' />} iconPos='left' className="button-search" />
                        </div>
                        <div className="include">
                            <NavLink to="/admin/cars/register">
                                <Button
                                    label="Cadastrar Carro"
                                    icon={<Car size={30} weight='fill' />}
                                    className="button-include"
                                    onClick={() => console.log('Cadastrar Carro')}
                                />
                            </NavLink>
                        </div>
                    </div>
                    {colors && colors.length > 0 && bodyWork && bodyWork.length > 0 && fuel && fuel.length > 0 && transmission && transmission.length > 0 && (
                        <div className="filters-cars">
                            <Panel
                                header={`Filtrar veículos ${applyingFilters ? '(Filtros ativos)' : ''}`}
                                className={`mt-3 filter-panel ${applyingFilters ? 'active-filters' : ''}`}
                                style={{ padding: '12px' }}>
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-6 lg:col-3 mb-2">
                                        <label htmlFor="bodyWork" className="block text-sm font-medium mb-1">Carroceria</label>
                                        <SearchableSelect
                                            id="bodyWork"
                                            options={bodyWork}
                                            value={filters.bodyWork}
                                            onChange={(value) => handleFilterChange('bodyWork', value.target.value)}
                                            placeholder="Selecione a carroceria"
                                        />
                                    </div>

                                    <div className="col-12 md:col-6 lg:col-3 mb-2">
                                        <label htmlFor="color" className="block text-sm font-medium mb-1">Cor</label>
                                        <SearchableSelect
                                            id="color"
                                            options={colors}
                                            value={filters.color}
                                            onChange={(value) => handleFilterChange('color', value.target.value)}
                                            placeholder="Selecione a cor"
                                        />
                                    </div>

                                    <div className="col-12 md:col-6 lg:col-3 mb-2">
                                        <label htmlFor="fuel" className="block text-sm font-medium mb-1">Combustível</label>
                                        <SearchableSelect
                                            id="fuel"
                                            options={fuel}
                                            value={filters.fuel}
                                            onChange={(value) => handleFilterChange('fuel', value.target.value)}
                                            placeholder="Selecione o combustível"
                                        />
                                    </div>

                                    {/* <div className="col-12 md:col-6 lg:col-3 mb-2">
                                        <label htmlFor="steering" className="block text-sm font-medium mb-1">Direção</label>
                                        <SearchableSelect
                                            id="steering"
                                            options={steering}
                                            value={filters.steering}
                                            onChange={(value) => handleFilterChange('steering', value.target.value)}
                                            placeholder="Selecione a direção"
                                        />
                                    </div> */}

                                    <div className="col-12 md:col-6 lg:col-3 mb-2">
                                        <label htmlFor="transmission" className="block text-sm font-medium mb-1">Transmissão</label>
                                        <SearchableSelect
                                            id="transmission"
                                            options={transmission}
                                            value={filters.transmission}
                                            onChange={(value) => handleFilterChange('transmission', value.target.value)}
                                            placeholder="Selecione a transmissão"
                                        />
                                    </div>

                                    <div className="col-12 md:col-6 lg:col-3 mb-2">
                                        <label className="block text-sm font-medium mb-1">Ano</label>
                                        <div className="flex align-items-center gap-2">
                                            <InputNumber
                                                id="minYear"
                                                placeholder="De"
                                                value={filters.minYear}
                                                onChange={(e) => handleFilterChange('minYear', e.value)}
                                                showButtons={false}
                                                useGrouping={false}
                                            />
                                            <span>-</span>
                                            <InputNumber
                                                id="maxYear"
                                                placeholder="Até"
                                                value={filters.maxYear}
                                                onChange={(e) => handleFilterChange('maxYear', e.value)}
                                                min={1900}
                                                max={2099}
                                                showButtons={false}
                                                useGrouping={false}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12 md:col-6 lg:col-3 mb-2">
                                        <label className="block text-sm font-medium mb-1">Tipo de Carro</label>
                                        <div className='radios-group' style={{ display: 'flex', gap: '1rem' }}>
                                            <div className="flex align-items-center">
                                                <RadioButton
                                                    inputId="carro-venda"
                                                    name="carType"
                                                    value="VENDA"
                                                    onChange={(e) => handleFilterChange('carType', e.value)}
                                                    checked={filters.carType === 'VENDA'}
                                                />
                                                <label htmlFor="carro-venda" className="ml-2">Venda</label>
                                            </div>
                                            <div className="flex align-items-center">
                                                <RadioButton
                                                    inputId="carro-aluguel"
                                                    name="carType"
                                                    variant='outlined'
                                                    value="ALUGUEL"
                                                    onChange={(e) => handleFilterChange('carType', e.value)}
                                                    checked={filters.carType === 'ALUGUEL'}
                                                />
                                                <label htmlFor="carro-aluguel" className="ml-2">Aluguel</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 md:col-6 lg:col-3 mb-2">
                                        <label className="block text-sm font-medium mb-1">Preço</label>
                                        <div className="flex align-items-center gap-2">
                                            <InputNumber
                                                id="minPrice"
                                                placeholder="De"
                                                value={filters.minPrice}
                                                onChange={(e) => handleFilterChange('minPrice', e.value)}
                                                mode="currency"
                                                currency="BRL"
                                                locale="pt-BR"
                                                minFractionDigits={0}
                                            />
                                            <span>-</span>
                                            <InputNumber
                                                id="maxPrice"
                                                placeholder="Até"
                                                value={filters.maxPrice}
                                                onChange={(e) => handleFilterChange('maxPrice', e.value)}
                                                mode="currency"
                                                currency="BRL"
                                                locale="pt-BR"
                                                minFractionDigits={0}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12 flex justify-content-end">
                                        <Button
                                            label="Limpar filtros"
                                            icon="pi pi-trash"
                                            style={{ padding: '12px' }}
                                            className="p-button-outlined p-button-danger mr-2"
                                            onClick={limparFiltros}
                                        />
                                        <Button
                                            label="Aplicar filtros"
                                            icon="pi pi-filter"
                                            className="p-button-success"
                                            style={{ padding: '12px' }}
                                            onClick={aplicarFiltros}
                                        />
                                    </div>
                                </div>
                                <div className="legenda" style={{ marginTop: '50px' }}>
                                    <span><strong>Legenda:</strong></span>
                                    <span className='legenda-venda'>Carro Vendido</span>
                                    <span className='legenda-aluguel'>Carro Alugado</span>
                                </div>
                            </Panel>


                        </div>
                    )}


                    <div className="card espacing-table" style={{ width: '100%' }}>
                        {cars && cars.length === 0 ? (
                            <div className="no-data">Nenhum carro encontrado</div>
                        ) : (
                            <DataView
                                value={cars}
                                listTemplate={listTemplate}
                                layout={layout}
                                paginator
                                rows={5}
                                rowsPerPageOptions={[10, 20, 30]}
                                paginatorPosition="top"
                                paginatorClassName='paginator-mod'

                                paginatorTemplate={{
                                    layout: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown ',
                                    RowsPerPageDropdown: (options) => (
                                        <div className="flex align-items-center" style={{ width: "45%" }}>
                                            <span className="mr-2" style={{ fontWeight: 'bold' }}>Itens por página:</span>
                                            {options.element}
                                        </div>
                                    )
                                }}
                            />
                        )}
                    </div>
                </section>
                <LoadingCar visible={loading} text="Deletando carro..." />
                <ModalOperacao
                    visible={modalVisible}
                    tipoOperacao={tipoOperacao}
                    onHide={() => {
                        setModalVisible(false);
                        setOperacaoParaEditar(null);
                    }}
                    onConfirm={() => { }}
                    id_car={idCar}
                    operacaoInicial={operacaoParaEditar}
                />
            </main>
        )
    );
}

export default Cars;


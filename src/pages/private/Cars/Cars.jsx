import { useState } from 'react';
import { CurrencyDollarSimple } from '@phosphor-icons/react';
import { Search } from 'lucide-react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { NavLink, useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { classNames } from 'primereact/utils';
import { Tag } from 'primereact/tag';
import { Car } from 'lucide-react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';


import GenericLoader from '../../../components/GenericLoader/GenericLoader';
import './Cars.css';
import { useAllCars } from '../../../hooks/useAllCar';

function Cars() {
    const [layout, setLayout] = useState('list');
    const { cars, isLoading } = useAllCars();
    console.log('craros', cars)
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const getSeverity = (car) => {
        switch (car.vehicleCondition) {
            case 'NOVO':
                return 'success';

            case 'USADO':
                return 'warning';

            case 'seminovo':
                return 'danger';

            default:
                return null;
        }
    };

    const listItem = (car, index) => {
        return (
            <NavLink className="col-12  hover:bg-cyan-700" key={car.id} style={{ textDecoration: 'none', color: 'inherit' }} to={`/carros/${car.id}`}>
                <div className={classNames('flex flex-column justify-center xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`${car.images[0].img_url}`} alt={car.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center  flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-1">
                            <div className="text-2xl font-bold text-900">{car.brand + ' ' + car.model}</div>
                            <div className="text-500">Ano: {car.year} Km: {car.mileage}</div>
                            <div className="text-500">Preço:  {car?.vehiclePrice?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</div>
                            <div className="text-500">Cor:  {car.color}</div>
                        </div>
                        {/* <div className="flex-column align-items-center sm:align-items-end gap-3 h-full "> */}
                        <div className="flex sm:flex-row align-items-center justify-content-center  gap-3 sm:gap-2">
                            <Button icon="pi pi-pencil" rounded outlined severity="warning" aria-label="Edit" ></Button>
                            <Button icon="pi pi-trash" rounded outlined severity="danger" ></Button>
                            <Button icon={<CurrencyDollarSimple size={20} />} rounded outlined severity="success" ></Button>
                            <Button icon="pi pi-shopping-cart" rounded outlined severity="info" ></Button>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </NavLink>
        );
    };

    const gridItem = (car) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={car.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            {/* <span className="font-semibold">{car.category}</span> */}
                        </div>
                        <Tag value={car.vehicleCondition} severity={getSeverity(car)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`${car.imgs[0]}`} alt={car.name} />
                        <div className="text-2xl font-bold">{car.name}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${car.price}</span>
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

                    <div className="card espacing-table" style={{ width: '100%' }}>
                        {cars && cars.length === 0 ? (
                            <div className="no-data">Nenhum carro encontrado</div>
                        ) : (
                            <DataView value={cars} listTemplate={listTemplate} layout={layout} />

                        )}
                    </div>
                </section>
            </main>
        )
    );
}

export default Cars;


import { useState } from 'react';
import { CurrencyDollarSimple } from '@phosphor-icons/react';
import { Search } from 'lucide-react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { classNames } from 'primereact/utils';
import { Car } from 'lucide-react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { formatDateTime } from '../../../utils/formatDate';


import GenericLoader from '../../../components/GenericLoader/GenericLoader';
import './Cars.css';
import { useAllCars } from '../../../hooks/useAllCar';
import Api from '../../../api/api';
import { toast } from 'react-toastify';
import LoadingCar from '../../../components/LoadingCar/LoadingCar';

function Cars() {
    const [layout, setLayout] = useState('list');
    const [loading, setLoading] = useState(false);
    const { cars, isLoading } = useAllCars();
    console.log(cars);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

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
                        const result = await Api.delete(`/cars/${car.id_car}`);
                        if (result.status === 204) {
                            queryClient.invalidateQueries({ queryKey: ['cars'] });
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
        return (
            <div className="col-12  hover:bg-cyan-700" key={car.id} style={{ textDecoration: 'none', color: 'inherit' }} to={`/admin/cars/edit/${car.id_car}`}>
                <div className={classNames('flex flex-column justify-center xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <NavLink to={`/admin/cars/edit/${car.id_car}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1 }} className="flex flex-row align-items-start gap-3">
                        <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`${car.images[0].img_url}`} alt={car.name} />
                        <div className="flex flex-column sm:flex-row justify-content-start align-items-center flex-1 gap-4">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-1" style={{ width: '50%' }}>
                                <div className="text-2xl font-bold text-900">{car.brand + ' ' + car.model}</div>
                                <div className="text-500">Ano: {car.year} Km: {car.mileage}</div>
                                <div className="text-500">Preço:  {car?.vehiclePrice?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</div>
                                <div className="text-500">Cor:  {car.color}</div>
                            </div>
                            <div className="flex flex-column align-items-center sm:align-items-start gap-1">
                                <div className="text-2xl font-bold text-900">Informações do cadastro</div>
                                <div className="text-500">Data de cadastro: {formatDateTime(car.dt_create)}</div>
                                <div className="text-500">Usuário de cadastro: {car.username || ''}</div>
                                <div className="text-500">Tipo de carro:  {car.carType || ''}</div>
                            </div>
                        </div>
                    </NavLink>
                    <div className="flex-column align-items-center sm:align-items-end gap-3 h-full ">
                        <div className="flex sm:flex-row align-items-center justify-content-center  gap-3 sm:gap-2">
                            <Button icon="pi pi-pencil" rounded severity="warning" aria-label="Edit" className='flex align-items-center justify-content-center'></Button>
                            <Button icon="pi pi-trash" rounded severity="danger" className='flex align-items-center justify-content-center' onClick={(e) => handleDelete(e)}></Button>
                            <Button icon={<CurrencyDollarSimple size={20} />} rounded severity="success" ></Button>
                            <Button icon="pi pi-shopping-cart" rounded severity="info" ></Button>
                        </div>
                    </div>
                </div>
            </div >
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
                <LoadingCar visible={loading} text="Deletando carro..." />
            </main>
        )
    );
}

export default Cars;


import { Palette } from '@phosphor-icons/react';
import { Search } from 'lucide-react';
import { Button } from 'primereact/button';
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import GenericLoader from '../../../components/GenericLoader/GenericLoader';
import { useColors } from '../../../hooks/useColors';
import { Edit } from 'lucide-react';
import { Delete } from 'lucide-react';
import { XCircle } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router';
import GenericRegister from '../../../components/GenericRegister/GenericRegister';
import Api from '../../../api/api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useQueryClient } from '@tanstack/react-query';
import { useFuel } from '../../../hooks/useFuel';

function Fuel() {
    const { fuel, isLoading } = useFuel();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const dtCadBodyTemplate = (rowData) => {
        return (
            rowData.dt_create ? new Date(rowData.dt_create).toLocaleDateString('pt-BR') : 'N/A'
        );
    }

    const rowClassName = (data, index) => {
        return index % 2 === 0 ? 'even-row' : 'odd-row';
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="btn-action">
                <Button
                    icon={<Edit size={20} weight='fill' color='white' />}
                    className="btn-edit"
                    label='Editar'
                    onClick={() =>
                        navigate('/admin/fuel/register', {
                            state: {
                                id: rowData.id_fuel,
                                pageName: `023 - Edição de Combustível`,
                                pageTitle: 'Editar Combustível',
                                labelNameForm: 'Nome do Combustível',
                                routeEdit: '/fuel/edit',
                                initialData: {
                                    name: rowData.name,
                                    status: rowData.status,
                                }
                            },
                        })
                    }
                />
                <Button
                    icon={<XCircle size={20} weight='fill' color='white' />}
                    className="btn-delete"
                    label='Excluir'
                    onClick={() => {
                        Swal.fire({
                            title: 'Excluir Combustível',
                            text: `Tem certeza que deseja excluir o Combustível ${rowData.name}?`,
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sim, excluir!',
                            reverseButtons: true,
                            focusCancel: true,
                            focusConfirm: false,
                            customClass: {
                                popup: 'sweet-alert-zindex'
                            },
                            cancelButtonText: 'Cancelar'
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                toast.success(`Combustível ${rowData.name} excluída com sucesso!`);
                                return
                            }
                        })
                    }
                    }
                />
            </div>
        );
    }


    return (
        isLoading ? (
            <GenericLoader />
        ) : (
            <main style={{ position: 'relative', padding: '20px', zIndex: 20000 }} className='w-full'>
                <section className="header-list w-full">
                        <h3 className="text-header">004 - Listagem de Combustível</h3>
                    <br />
                </section>
                <section className="title-page">
                        <div style={{ padding: '20px' }}> <h1 className='title'> Listagem de Combustível</h1></div>
                </section>
                <section className="content-list">
                    <div className="search-and-include">
                        <div className="search">
                            <input type="text" placeholder="Pesquisar" />
                            <Button icon={<Search size={20} color='white' />} iconPos='left' className="button-search" />
                        </div>
                        <div className="include">
                            <NavLink to="/admin/fuel/register">
                                <Button
                                        label="Cadastrar Combustível"
                                    icon={<Palette size={30} weight='fill' />}
                                    className="button-include"
                                        onClick={() => console.log('Cadastrar Combustível')}
                                />
                            </NavLink>
                        </div>
                    </div>
                    <div className="card espacing-table">
                            <DataTable value={fuel} tableStyle={{ minWidth: '108rem', zIndex: 1000, position: 'relative' }} rowClassName={rowClassName} paginator rows={20} responsiveLayout="scroll" showGridlines>
                            <Column field="id_fuel" header="Código" headerClassName='header-table' headerStyle={{ borderTopLeftRadius: '5px' }} align={'center'} bodyClassName="body-table"></Column>
                            <Column header="Nome do Combustível" field='name' headerClassName='header-table' align={'center'} bodyClassName="body-table"></Column>
                            <Column field="dt_created" header="Data de Cadastro" body={dtCadBodyTemplate} headerClassName='header-table' align={'center'} bodyClassName="body-table"></Column>
                            <Column header="Ações" body={actionBodyTemplate} headerClassName='header-table' headerStyle={{ borderTopRightRadius: '5px' }} align={'center'} bodyClassName="body-table"></Column>
                        </DataTable>
                    </div>
                </section>
            </main >
        )
    );
}

export default Fuel;


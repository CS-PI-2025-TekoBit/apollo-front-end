import { GasPump, Palette } from '@phosphor-icons/react';
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
import { InputText } from 'primereact/inputtext';

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
                    icon="pi pi-pencil" rounded text severity="warning" aria-label="Edit"
                    onClick={() =>
                        navigate('/admin/fuel/register', {
                            state: {
                                id: rowData.id_fuel,
                                pageName: `023 - Edição de Combustível`,
                                pageTitle: 'Editar Combustível',
                                labelNameForm: 'Nome do Combustível',
                                routeEdit: '/fuels/edit',
                                initialData: {
                                    name: rowData.name,
                                    status: rowData.status,
                                }
                            },
                        })
                    }
                />
                <Button
                    icon='pi pi-trash'
                    rounded text severity="danger" aria-label="Cancel"
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
                                try {
                                    // QUANDO USAR BACKEND ------------------------------------------------
                                    const response = await Api.delete(`/fuels/delete/${rowData.id_fuel}`);
                                    if (response.status === 200) {
                                        await queryClient.invalidateQueries(['fuel']);
                                        toast.success(`Combustível ${rowData.name} excluído com sucesso!`);
                                        return
                                    } else {
                                        toast.error(`Erro ao excluir combustível. Tente novamente. ${response.error}`);
                                        return
                                    }
                                } catch (error) {
                                    toast.error(`Erro ao excluir combustível. Tente novamente. ${error.message}`);
                                    return
                                }
                            }
                        })
                    }
                    }
                />
            </div>
        );
    }
    const statusBodyTemplate = (rowData) => {
        return rowData.status === 'active' ? "Ativo" : "Inativo";
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
                            <InputText type="text" placeholder="Pesquisar" style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
                            <Button icon={<Search size={22} color='white' />} iconPos='left' className="button-search" />
                        </div>
                        <div className="include">
                            <NavLink to="/admin/fuel/register">
                                <Button
                                    label="Cadastrar Combustível"
                                    icon={<GasPump size={30} weight='fill' />}
                                    className="button-include"
                                    onClick={() => console.log('Cadastrar Combustível')}
                                />
                            </NavLink>
                        </div>
                    </div>
                    <div className="card espacing-table" style={{ width: '100%' }}>
                        {fuel && fuel.length === 0 ? <p>Nenhum combustível encontrado.</p> : (
                            <DataTable value={fuel} size='large' tableStyle={{ width: '100%' }} rowClassName={rowClassName} paginator rows={20} responsiveLayout="scroll" showGridlines stripedRows >
                                <Column field="id_fuel" headerClassName='header-table' sortable header="Código" headerStyle={{ borderTopLeftRadius: '5px' }} align={'center'} ></Column>
                                <Column header="Nome do Combustível" headerClassName='header-table' sortable field='name' align={'center'} ></Column>
                                <Column field="dt_created" headerClassName='header-table' header="Data de Cadastro" body={dtCadBodyTemplate} align={'center'} ></Column>
                                <Column field="status" headerClassName='header-table' header="Status" body={statusBodyTemplate} align={'center'} ></Column>
                                <Column header="Ações" headerClassName='header-table' body={actionBodyTemplate} headerStyle={{ borderTopRightRadius: '5px' }} align={'center'} ></Column>
                            </DataTable>
                        )}
                    </div>
                </section>
            </main >
        )
    );
}

export default Fuel;


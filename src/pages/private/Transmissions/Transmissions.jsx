import { Gear, Palette } from '@phosphor-icons/react';
import { Search } from 'lucide-react';
import { Button } from 'primereact/button';
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import GenericLoader from '../../../components/GenericLoader/GenericLoader';
import { Edit } from 'lucide-react';
import { XCircle } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useQueryClient } from '@tanstack/react-query';
import { useTransmission } from '../../../hooks/useTransmission';
import Api from '../../../api/api';
import { InputText } from 'primereact/inputtext';

function Transmission() {
    const { transmission, isLoading } = useTransmission();
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
                        navigate('/admin/Transmission/register', {
                            state: {
                                id: rowData.id_transmission,
                                pageName: `023 - Edição de Transmissão`,
                                pageTitle: 'Editar Transmissão',
                                labelNameForm: 'Nome da Transmissão',
                                routeEdit: '/transmissions/edit',
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
                            title: 'Excluir Transmissão',
                            text: `Tem certeza que deseja excluir a Transmissão ${rowData.name}?`,
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
                                    const response = await Api.delete(`/transmissions/delete/${rowData.id_transmission}`);
                                    if (response.status === 200) {
                                        await queryClient.invalidateQueries(['transmissions']);
                                        toast.success(`Transmissão ${rowData.name} excluída com sucesso!`);
                                        return
                                    } else {
                                        toast.error(`Erro ao excluir transmissão. Tente novamente. ${response.error}`);
                                        return
                                    }
                                } catch (error) {
                                    toast.error(`Erro ao excluir transmissão. Tente novamente. ${error.message}`);
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
                    <h3 className="text-header">004 - Listagem de Transmissão</h3>
                    <br />
                </section>
                <section className="title-page">
                    <div style={{ padding: '20px' }}> <h1 className='title'> Listagem de Transmissão</h1></div>
                </section>
                <section className="content-list">
                    <div className="search-and-include">
                        <div className="search">
                            <InputText type="text" placeholder="Pesquisar" style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
                            <Button icon={<Search size={22} color='white' />} iconPos='left' className="button-search" />
                        </div>
                        <div className="include">
                            <NavLink to="/admin/transmission/register">
                                <Button
                                    label="Cadastrar Transmissão"
                                    icon={<Gear size={30} weight='fill' />}
                                    className="button-include"
                                    onClick={() => console.log('Cadastrar Transmissão')}
                                />
                            </NavLink>
                        </div>
                    </div>
                    <div className="card espacing-table" style={{ width: '100%' }}>
                        <DataTable value={transmission} tableStyle={{ width: '100%' }} rowClassName={rowClassName} paginator rows={20} responsiveLayout="scroll" showGridlines>
                            <Column field="id_transmission" header="Código" headerClassName='header-table' headerStyle={{ borderTopLeftRadius: '5px' }} align={'center'} ></Column>
                            <Column header="Nome da Transmissão" field='name' headerClassName='header-table' align={'center'} ></Column>
                            <Column field="dt_created" header="Data de Cadastro" body={dtCadBodyTemplate} headerClassName='header-table' align={'center'} ></Column>
                            <Column field="status" header="Status" body={statusBodyTemplate} headerClassName='header-table' align={'center'} ></Column>

                            <Column header="Ações" body={actionBodyTemplate} headerClassName='header-table' headerStyle={{ borderTopRightRadius: '5px' }} align={'center'} ></Column>
                        </DataTable>
                    </div>
                </section>
            </main >
        )
    );
}

export default Transmission;


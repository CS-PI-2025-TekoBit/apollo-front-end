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

function Colors() {
    const { colors, isLoading } = useColors();
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
                        navigate('/admin/colors/register', {
                            state: {
                                id: rowData.id_color,
                                pageName: `021 - Edição de cor`,
                                pageTitle: 'Editar Cor',
                                labelNameForm: 'Nome da Cor',
                                routeEdit: '/colors/edit',
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
                            title: 'Excluir cor',
                            text: `Tem certeza que deseja excluir a cor ${rowData.name}?`,
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
                                    const response = await Api.delete(`/colors/delete/${rowData.id_color}`);
                                    if (response.status === 200) {
                                        await queryClient.invalidateQueries(['colors']);
                                        toast.success(`Cor ${rowData.name} excluída com sucesso!`);
                                        return
                                    } else {
                                        toast.error(`Erro ao excluir cor. Tente novamente. ${response.error}`);
                                        return
                                    }
                                } catch (error) {
                                    toast.error(`Erro ao excluir cor. Tente novamente. ${error.message}`);
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


    return (
        isLoading ? (
            <GenericLoader />
        ) : (
            <main style={{ position: 'relative', padding: '20px', zIndex: 20000 }} className='w-full'>
                <section className="header-list w-full">
                    <h3 className="text-header">002 - Listagem de Cores</h3>
                    <br />
                </section>
                <section className="title-page">
                    <div style={{ padding: '20px' }}> <h1 className='title'> Listagem de Cores</h1></div>
                </section>
                <section className="content-list">
                    <div className="search-and-include">
                        <div className="search">
                            <input type="text" placeholder="Pesquisar" />
                            <Button icon={<Search size={20} color='white' />} iconPos='left' className="button-search" />
                        </div>
                        <div className="include">
                            <NavLink to="/admin/colors/register">
                                <Button
                                    label="Cadastrar Cor"
                                    icon={<Palette size={30} weight='fill' />}
                                    className="button-include"
                                    onClick={() => console.log('Cadastrar Cor')}
                                />
                            </NavLink>
                        </div>
                    </div>

                    <div className="card espacing-table">
                        {colors && colors.length === 0 ? (
                            <div className="no-data">Nenhuma cor encontrada</div>
                        ) : (
                            <DataTable value={colors} tableStyle={{ minWidth: '108rem', zIndex: 1000, position: 'relative' }} rowClassName={rowClassName} paginator rows={20} responsiveLayout="scroll" showGridlines>
                                <Column field="id_color" header="Código" headerClassName='header-table' headerStyle={{ borderTopLeftRadius: '5px' }} align={'center'} bodyClassName="body-table"></Column>
                                <Column header="Nome da Cor" field='name' headerClassName='header-table' align={'center'} bodyClassName="body-table"></Column>
                                <Column field="dt_created" header="Data de Cadastro" body={dtCadBodyTemplate} headerClassName='header-table' align={'center'} bodyClassName="body-table"></Column>
                                <Column header="Ações" body={actionBodyTemplate} headerClassName='header-table' headerStyle={{ borderTopRightRadius: '5px' }} align={'center'} bodyClassName="body-table"></Column>
                            </DataTable>
                        )}
                    </div>
                </section>
            </main>
        )
    );
}

export default Colors;


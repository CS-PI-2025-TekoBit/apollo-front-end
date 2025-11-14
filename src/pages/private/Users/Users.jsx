import { Gear } from '@phosphor-icons/react';
import { Search } from 'lucide-react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { toast } from 'react-toastify';

import GenericLoader from '../../../components/GenericLoader/GenericLoader';
import { useUsers } from '../../../hooks/useUsers';

function Users() {
    const { users, isLoading } = useUsers();
    const navigate = useNavigate();

    const handleDelete = (user) => {
        Swal.fire({
            title: 'Excluir usuário',
            text: `Tem certeza que deseja excluir o usuário ${user.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Excluir',
            confirmButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                toast.success(`Usuário ${user.name} excluído com sucesso!`);
            }
        });
    };

    // 🔥 BOTÃO DE EDITAR CORRIGIDO
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="btn-action">
                <Button
                    icon="pi pi-pencil"
                    rounded
                    text
                    severity="warning"
                    aria-label="Edit"
                    onClick={() =>
                        navigate('/admin/users/register', {
                            state: {
                                mode: "edit",
                                user: {
                                    id: rowData.id,
                                    name: rowData.name,
                                    email: rowData.email,
                                    role: rowData.role === "ROLE_ADMIN" ? "admin" : "cliente",
                                    phone: rowData.phone || "",
                                    cep: rowData.cep || "",
                                    logradouro: rowData.logradouro || "",
                                    numero: rowData.numero || "",
                                    bairro: rowData.bairro || "",
                                    estado: rowData.estado || "",
                                    cidade: rowData.cidade || "",
                                }
                            }
                        })
                    }
                />

                <Button
                    icon="pi pi-trash"
                    rounded
                    text
                    severity="danger"
                    aria-label="Delete"
                    onClick={() => {
                        Swal.fire({
                            title: 'Excluir usuário',
                            text: `Tem certeza que deseja excluir o usuário ${rowData.name}?`,
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sim, excluir!',
                            reverseButtons: true,
                            focusCancel: true,
                            customClass: {
                                popup: 'sweet-alert-zindex',
                            },
                            cancelButtonText: 'Cancelar',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                toast.success(`Usuário ${rowData.name} excluído com sucesso!`);
                            }
                        });
                    }}
                />
            </div>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return rowData.role === "ROLE_ADMIN" ? "Administrador" : "Usuário";
    };

    return isLoading ? (
        <GenericLoader />
    ) : (
        <main style={{ position: "relative", padding: "20px", zIndex: 2000 }}>
            <section className="header-list w-full">
                <h3 className="text-header">003 - Listagem de Usuários</h3>
                <br />
            </section>

            <section className="title-page">
                <div style={{ padding: "20px" }}>
                    <h1 className="title">Listagem de Usuários</h1>
                </div>
            </section>

            <section className="content-list">
                <div className="search-and-include">
                    <div className="search">
                        <InputText
                            type="text"
                            placeholder="Pesquisar"
                            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                        />
                        <Button
                            icon={<Search size={22} color="white" />}
                            iconPos="left"
                            className="button-search"
                        />
                    </div>

                    <div className="include">
                        {/* 🔥 NAVEGAÇÃO DO CADASTRO DE USUÁRIO CORRIGIDA */}
                        <NavLink
                            to="/admin/users/register"
                            state={{ mode: "create" }}
                        >
                            <Button
                                label="Cadastrar Usuário"
                                icon={<Gear size={30} weight="fill" />}
                                className="button-include"
                            />
                        </NavLink>
                    </div>
                </div>

                <div className="card espacing-table" style={{ width: "100%" }}>
                    {users && users.length === 0 ? (
                        <div className="no-data">Nenhum usuário encontrado</div>
                    ) : (
                        <DataTable
                            value={users}
                            paginator
                            rows={20}
                            responsiveLayout="scroll"
                            showGridlines
                            stripedRows
                            tableStyle={{ width: '100%' }}
                            rowClassName={(data, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}
                        >
                            <Column field="id" header="Código" headerClassName="header-table" headerStyle={{ borderTopLeftRadius: '5px' }} align="center" />
                            <Column field="name" header="Nome" headerClassName="header-table" align="center" />
                            <Column field="email" header="E-mail" headerClassName="header-table" align="center" />
                            <Column field="role" header="Perfil" body={statusBodyTemplate} headerClassName="header-table" align="center" />
                            <Column field="dt_create" header="Data de Cadastro" body={(rowData) => new Date(rowData.dt_create).toLocaleDateString("pt-BR")} headerClassName="header-table" align="center" />
                            <Column header="Ações" body={actionBodyTemplate} headerClassName="header-table" headerStyle={{ borderTopRightRadius: '5px' }} align="center" />
                        </DataTable>
                    )}
                </div>
            </section>
        </main>
    );
}

export default Users;

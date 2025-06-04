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
                                    id: rowData.id_colors,
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
                                    toast.success(`Cor ${rowData.name} excluída com sucesso!`);
                                    return
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
    const rowClassName = (data, index) => {
        return index % 2 === 0 ? 'even-row' : 'odd-row';
    };

    return (
        <></>
    );
}

export default Colors;


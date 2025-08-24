import React from 'react';
import GenericRegister from '../../../components/GenericRegister/GenericRegister';
import { toast } from 'react-toastify';
import Api from '../../../api/api';
import { useQueryClient } from '@tanstack/react-query';

function TransmissionRegister() {
    const queryClient = useQueryClient();

    const onSalvar = async (formData) => {
        // QUANDO USAR BACKEND ------------------------------------------------
        const result = await Api.post('/transmissions/create', formData);
        if (result.status === 201) {
            toast.success('Transmissão cadastrada com sucesso!');
            await queryClient.invalidateQueries(['transmissions']);
            window.history.back();
            return
        } else {
            toast.error(`Erro ao cadastrar a transmissão. Tente novamente. ${result.error}`);
            return
        }
    };

    return (
        <GenericRegister labelNameForm='Nome da Transmissão' onSalvar={onSalvar} pageName='013 - Cadastro de Transmissão' pageTitle='Cadastro de Transmissão' backRouter='/admin/transmission' name='Transmissão' />
    );
}

export default TransmissionRegister;
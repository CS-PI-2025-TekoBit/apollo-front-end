import React from 'react';
import GenericRegister from '../../../components/GenericRegister/GenericRegister';
import { toast } from 'react-toastify';
import Api from '../../../api/api';
import { useQueryClient } from '@tanstack/react-query';

function ColorsRegister() {
    const queryClient = useQueryClient();

    const onSalvar = async (formData) => {
     
        // QUANDO USAR BACKEND ------------------------------------------------
        const result = await Api.post('/colors/create', formData);
        console.log(result);
        if (result.status === 201) {
            toast.success('Cor cadastrada com sucesso!');
            await queryClient.invalidateQueries(['motors']);
            window.history.back();
            return
        } else {
            toast.error(`Erro ao cadastrar a cor. Tente novamente. ${result.error}`);
            return
        }
    };

    return (
        <GenericRegister labelNameForm='Nome da Cor' onSalvar={onSalvar} pageName='011 - Cadastro de Cor' pageTitle='Cadastro de cor' backRouter='/admin/colors' name='Cor' />
    );
}

export default ColorsRegister;
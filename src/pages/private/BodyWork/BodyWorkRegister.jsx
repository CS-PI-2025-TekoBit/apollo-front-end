import React from 'react';
import GenericRegister from '../../../components/GenericRegister/GenericRegister';
import { toast } from 'react-toastify';
import Api from '../../../api/api';
import { useQueryClient } from '@tanstack/react-query';

function BodyWorkRegister() {
    const queryClient = useQueryClient();

    const onSalvar = async (formData) => {
        toast.success('Carroceria cadastrada com sucesso!');
        // QUANDO USAR BACKEND ------------------------------------------------
        // const result = await Api.post('/bodywork/create', formData);
        // if (result.status === 201) {
        //     toast.success('Carroceria cadastrada com sucesso!');
        //     await queryClient.invalidateQueries(['bodywork']);
        //     window.history.back();
        //     return
        // } else {
        //     toast.error(`Erro ao cadastrar a carroceria. Tente novamente. ${result.error}`);
        //     return
        // }
        window.history.back();
    };

    return (
        <GenericRegister labelNameForm='Nome da Carroceria' onSalvar={onSalvar} pageName='014 - Cadastro de Carroceria' pageTitle='Cadastro de Carroceria' backRouter='/admin/bodywork' name='Carroceria' />
    );
}

export default BodyWorkRegister;
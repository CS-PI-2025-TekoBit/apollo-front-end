import React from 'react';
import GenericRegister from '../../../components/GenericRegister/GenericRegister';
import { toast } from 'react-toastify';
import Api from '../../../api/api';
import { useQueryClient } from '@tanstack/react-query';

function FuelRegister() {
    const queryClient = useQueryClient();

    const onSalvar = async (formData) => {
        toast.success('Combustível cadastrado com sucesso!');
        // QUANDO USAR BACKEND ------------------------------------------------
        // const result = await Api.post('/fuel/create', formData);
        // if (result.status === 201) {
        //     toast.success('Fuel cadastrado com sucesso!');
        //     await queryClient.invalidateQueries(['fuels']);
        //     window.history.back();
        //     return
        // } else {
        //     toast.error(`Erro ao cadastrar o combustível. Tente novamente. ${result.error}`);
        //     return
        // }
        window.history.back();
    };

    return (
        <GenericRegister labelNameForm='Nome do Combustível' onSalvar={onSalvar} pageName='013 - Cadastro de Combustível' pageTitle='Cadastro de combustível' backRouter='/admin/fuel' name='Combustivel' />
    );
}

export default FuelRegister;
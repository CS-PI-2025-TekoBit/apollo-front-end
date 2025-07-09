import React from 'react';
import GenericRegister from '../../../components/GenericRegister/GenericRegister';
import { toast } from 'react-toastify';
import Api from '../../../api/api';
import { useQueryClient } from '@tanstack/react-query';

function SteerinRegister() {
    const queryClient = useQueryClient();

    const onSalvar = async (formData) => {
        toast.success('Direção cadastrada com sucesso!');
        // QUANDO USAR BACKEND ------------------------------------------------
        // const result = await Api.post('/colors/create', formData);
        // if (result.status === 201) {
        //     toast.success('Cor cadastrada com sucesso!');
        //     await queryClient.invalidateQueries(['motors']);
        //     window.history.back();
        //     return
        // } else {
        //     toast.error(`Erro ao cadastrar a cor. Tente novamente. ${result.error}`);
        //     return
        // }
        window.history.back();
    };

    return (
        <GenericRegister labelNameForm='Nome da Direção' onSalvar={onSalvar} pageName='016 - Cadastro de direção' pageTitle='Cadastro de direção' backRouter='/admin/steering' name='Steering'/>
    );
}

export default SteerinRegister;
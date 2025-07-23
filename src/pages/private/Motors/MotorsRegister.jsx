import React from 'react'
import GenericRegister from '../../../components/GenericRegister/GenericRegister'
import { toast } from 'react-toastify';
import Api from '../../../api/api';
import { useQueryClient } from '@tanstack/react-query';

function MotorsRegister() {
    const queryClient = useQueryClient();
    const onSalvar = async (formData) => {
        const result = await Api.post('/motors/create', formData);
        console.log(result);
        if (result.status === 201) {
            toast.success('Motor cadastrado com sucesso!');
            await queryClient.invalidateQueries(['motors']);
            window.history.back();
            return
        } else {
            toast.error(`Erro ao cadastrar motor. Tente novamente. ${result}`);
            return
        }
        window.history.back();
    }
    return (
        <GenericRegister labelNameForm='Nome do Motor' onSalvar={onSalvar} pageName='012 - Cadastro de Motor' pageTitle='Cadastro de motor' backRouter='/admin/motors' name='Motor' />
    )
}

export default MotorsRegister
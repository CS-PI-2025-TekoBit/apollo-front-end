import React from 'react'
import GenericRegister from '../../../components/GenericRegister/GenericRegister'
import { toast } from 'react-toastify';

function MotorsRegister() {
    const onSalvar = (formData) => {
        toast.success('Motor salvo com sucesso!');
        // const result = Api.post('/motors/create', formData);
        // if (result.status === 200) {
        //     toast.success('Motor cadastrado com sucesso!');
        //     window.history.back();
        //     return
        // } else {
        //     toast.error(`Erro ao cadastrar motor. Tente novamente. ${result.error}`);
        //     return
        // }
        window.history.back();
    }
    return (
        <GenericRegister labelNameForm='Nome do Motor' onSalvar={onSalvar} pageName='012 - Cadastro de Motor' pageTitle='Cadastro de motor' />
    )
}

export default MotorsRegister
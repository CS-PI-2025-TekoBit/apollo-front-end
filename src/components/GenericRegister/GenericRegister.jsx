import { ArrowLeft } from 'lucide-react'
import { Button } from 'primereact/button';
import React, { use, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router';
import GenericInput from '../GenericInput/GenericInput'
import { RadioButton } from 'primereact/radiobutton';
import { TrashIcon } from '@phosphor-icons/react';
import { X } from 'lucide-react';
import { Check } from 'lucide-react';
import './GenericRegister.css';
import { toast } from 'react-toastify';
import Api from '../../api/api';
import { useQueryClient } from '@tanstack/react-query';

function GenericRegister({
    pageName = '001 - Cadastro Genérico',
    pageTitle = 'Cadastro Genérico',
    labelNameForm = 'Nome',
    backRouter = '/admin/',
    name = 'Nome',
    onSalvar = () => console.log('Salvar'),
    onEdit = () => console.log('Editar'),
}) {
    const location = useLocation();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {
        pageName: statePageName,
        pageTitle: statePageTitle,
        labelNameForm: stateLabelNameForm,
        initialData: stateInitialData,
        id: stateId,
        routeEdit: stateRouteEdit,
    } = location.state || {};

    const [formData, setFormData] = useState({
        name: stateInitialData?.name || '',
        status: stateInitialData?.status || 'active',
    });
    const [inputKey, setInputKey] = useState(0);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (errors) {
            setErrors({})
        }
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    const handleClearFields = () => {
        setInputKey(prevKey => prevKey + 1);
        if (stateId) {
            setFormData({
                name: stateInitialData?.name || '',
                status: stateInitialData?.status || 'active',
            });
            return
        }
        setFormData({
            name: '',
            status: 'active',
        });
    }
    const validateForm = () => {
        let erros = {}
        if (formData.name === '') {
            erros.name = 'Campo nome é obrigatório'
        }
        if (formData.status === '') {
            erros.status = 'Campo status é obrigatório'
        }
        if (Object.keys(erros).length > 0) {
            setErrors(erros)
            return false
        }
        return true
    }
    const validateAndSave = async () => {
        if (validateForm()) {
            if (stateId) {
                // toast.success(`${name} atualizado com sucesso!`); //MUDAR AQUI DEPOIS PARA DEIXAR A FRASE GENERICA
                // window.history.back();
                // return
                const result = await Api.put(`${stateRouteEdit}/${stateId}`, formData);
                if (result.status === 200) {
                    toast.success(`${name} atualizado com sucesso!`);
                    await queryClient.invalidateQueries(['motors']);
                    navigate(`${backRouter}`);
                    return
                } else {
                    toast.error(`Erro ao atualizar ${name}. Tente novamente. ${result.error}`);
                    return
                }
            }
            else {
                onSalvar(formData);
            }
        } else {
            return
        }
    }
    return (
        <main style={{ position: 'relative', padding: '20px', zIndex: 20000 }} className='w-full'>
            <section className="header-cad w-full">
                <h3 className="text-header">{statePageName || pageName}</h3>
                <br />
            </section>
            <section className="title-page">
                <div style={{ padding: '20px' }}> <h1 className='title'>{statePageTitle || pageTitle}</h1></div>
            </section>
            <section className="content-cad">
                <div className="back-list">
                    <button className="back-button" onClick={() => window.history.back()}>
                        <ArrowLeft size={20} color='black' />
                        <p>
                            Voltar para listagem
                        </p>
                    </button>
                </div>
                <form className="generic-form">
                    <div>
                        <GenericInput label={labelNameForm} type="text" id="name" name="name" value={formData.name} onChange={(e) => handleInputChange(e)} required={true} className={`generic-form-input ${errors.name ? 'border-red' : ''}`} classNameContainer='w-generic' key={inputKey} />
                        {errors.name && <span className='error' style={{ margin: 0 }}>{errors.name}</span>}
                    </div>
                    <section className="radios">
                        <p className='label-radio'>Status  <span className='required'>*</span></p>
                        <div className="radio-buttons">
                            <RadioButton
                                inputId="statusActive"
                                name="status"
                                value="active"
                                onChange={(e) => handleInputChange(e)}
                                checked={formData.status === 'active'}
                            />
                            <label htmlFor="statusActive">Ativo</label>
                            <RadioButton
                                inputId="statusDeactivated"
                                name="status"
                                value="deactive"
                                onChange={(e) => handleInputChange(e)}
                                checked={formData.status === 'deactive'}
                            />
                            <label htmlFor="statusDeactivated">Desativado</label>
                        </div>
                        {errors.status && <span className='error-message'>{errors.status}</span>}
                    </section>
                </form>
                <div className="form-action">
                    <p>Os campos marcados com <span className='required'>*</span> são obrigatórios</p>
                    <div className="btn">
                        <Button className='btn-generic btn-clean' onClick={() => handleClearFields()}>
                            <TrashIcon size={20} weight='fill' color='white' />
                            Limpar Campos
                        </Button>
                        <NavLink to={backRouter} className='btn-generic btn-cancel'>
                            <X size={20} weight='fill' color='white' />
                            Cancelar
                        </NavLink>
                        <Button className='btn-generic btn-save' onClick={validateAndSave}>
                            <Check size={20} weight='fill' color='white' />
                            Salvar
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default GenericRegister
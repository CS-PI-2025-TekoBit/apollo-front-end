import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { User, Key } from '@phosphor-icons/react';
import { toast } from 'react-toastify';
import { VERSION_APP } from '../../../utils/constants';
import './Register.css';

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        user: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [sending, setSending] = useState(false);

    const onChange = (field, e) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const validate = () => {
        let errs = {};

        if (!form.name.trim()) {
            errs.name = "Campo nome é obrigatório";
        }

        if (!form.phone.trim()) {
            errs.phone = "Campo telefone é obrigatório";
        } else {
            const phoneFormat = /^\(\d{2}\)\s\d{1}\s\d{4}-\d{4}$/;
            if (!phoneFormat.test(form.phone)) {
                errs.phone = "Telefone deve estar no formato (xx) x xxxx-xxxx";
            }
        }

        if (!form.email.trim()) {
            errs.email = "Campo email é obrigatório";
        } else if (!form.email.includes('@')) {
            errs.email = "Inclua um @ no email";
        } else {
            const [local, domain] = form.email.split('@');
            if (!domain) {
                errs.email = "Insira um domínio após o @";
            } else if (!domain.includes('.')) {
                errs.email = "Domínio inválido. Ex: exemplo@dominio.com";
            }
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        if (!validate()) {
            setSending(false);
            return;
        }

        toast.success("Cadastro válido! (simulado)");
        setSending(false);
    };

    const formatPhone = (value) => {
        const onlyNumbers = value.replace(/\D/g, '');
        const match = onlyNumbers.match(/^(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})$/);

        if (!match) return '';

        let formatted = '';
        if (match[1]) formatted += `(${match[1]}`;
        if (match[1] && match[1].length === 2) formatted += ') ';
        if (match[2]) formatted += `${match[2]} `;
        if (match[3]) formatted += `${match[3]}`;
        if (match[4]) formatted += `-${match[4]}`;

        return formatted.trim();
    };

    const handlePhoneChange = (e) => {
        const input = e.target.value;
        const numbers = input.replace(/\D/g, '');

        if (numbers.length <= 11) {
            const formatted = formatPhone(input);
            setForm((prev) => ({ ...prev, phone: formatted }));
        }
    };

    return (
        <main className="login">
            <div className="container-login">
                <div className="login-left register-left"></div>
                <div className="login-right register-right">
                    <h1>Cadastro</h1>
                    <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className="input-form">
                            <label htmlFor="name">Nome Completo</label>
                            <span className="icon"><User size={24} color="black" /></span>
                            <input
                                type="text"
                                id="name"
                                placeholder="Seu nome completo"
                                value={form.name}
                                onChange={(e) => onChange('name', e)}
                                className={`${errors.name ? 'error-input' : ''}`}
                            />
                        </div>
                        {errors.name && <span className="error">{errors.name}</span>}

                        <div className="input-form">
                            <label htmlFor="phone">Telefone</label>
                            <span className="icon"><User size={24} color="black" /></span>
                            <input
                                type="text"
                                id="phone"
                                placeholder="(99) 9 9999-9999"
                                value={form.phone}
                                onChange={handlePhoneChange}
                                className={`${errors.phone ? 'error-input' : ''}`}
                            />
                        </div>
                        {errors.phone && <span className="error">{errors.phone}</span>}

                        <div className="input-form">
                            <label htmlFor="user">Usuário</label>
                            <span className="icon"><User size={24} color="black" /></span>
                            <input
                                type="text"
                                id="user"
                                placeholder="Nome de usuário"
                                value={form.user}
                                onChange={(e) => onChange('user', e)}
                            />
                        </div>

                        <div className="input-form">
                            <label htmlFor="email">Email</label>
                            <span className="icon"><User size={24} color="black" /></span>
                            <input
                                type="text"
                                id="email"
                                placeholder="email@exemplo.com"
                                value={form.email}
                                onChange={(e) => onChange('email', e)}
                                className={`${errors.email ? 'error-input' : ''}`}
                            />
                        </div>
                        {errors.email && <span className="error">{errors.email}</span>}

                        <div className="input-form">
                            <label htmlFor="password">Senha</label>
                            <span className="icon"><Key size={24} color="black" /></span>
                            <input
                                type="password"
                                id="password"
                                placeholder="Digite sua senha"
                                value={form.password}
                                onChange={(e) => onChange('password', e)}
                            />
                        </div>

                        <div className="input-form">
                            <label htmlFor="confirmPassword">Confirmar Senha</label>
                            <span className="icon"><Key size={24} color="black" /></span>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirme sua senha"
                                value={form.confirmPassword}
                                onChange={(e) => onChange('confirmPassword', e)}
                            />
                        </div>

                        <button type="submit" className="btn-enter" disabled={sending}>
                            <span>Cadastrar</span>
                        </button>

                        <p className="text-register">
                            Já tem conta? <Link to="/">Voltar para login</Link>
                        </p>
                    </form>
                    <span className="version">Versão {VERSION_APP}</span>
                </div>
            </div>
        </main>
    );
}

export default Register;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { User, Key } from '@phosphor-icons/react';
import { toast } from 'react-toastify';
import { VERSION_APP } from '../../../utils/constants';
import './Register.css';
import { useEffect } from 'react';

function Register() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

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
            errs.name = "Nome é obrigatório";
        }

        if (!form.phone.trim()) {
            errs.phone = "Telefone é obrigatório";
        } else {
            const phoneFormat = /^\(\d{2}\)\s\d{1}\s\d{4}-\d{4}$/;
            if (!phoneFormat.test(form.phone)) {
                errs.phone = "Telefone deve estar no formato (xx) x xxxx-xxxx";
            }
        }

        if (!form.user.trim()) {
            errs.user = "Usuário é obrigatório";
        } else if (form.user.length < 4) {
            errs.user = "Usuário deve ter no mínimo 4 caracteres";
        } else if (form.user.length > 15) {
            errs.user = "Usuário deve ter no máximo 15 caracteres";
        } else if (!/^[a-zA-Z0-9]*$/.test(form.user)) {
            errs.user = "Usuário deve conter apenas letras e números";
        }

        if (!form.email.trim()) {
            errs.email = "Email é obrigatório";
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

        if (!form.password.trim()) {
            errs.password = "Senha é obrigatório";
        } else {
            if (form.password.length < 8 || form.password.length > 20) {
                errs.password = "A senha deve ter entre 8 e 20 caracteres";
            } else if (!/[0-9]/.test(form.password)) {
                errs.password = "A senha deve conter ao menos 1 número";
            } else if (!/[!@#$%^&*(),.?":{}|<>_\-+=~`]/.test(form.password)) {
                errs.password = "A senha deve conter ao menos 1 caractere especial";
            } else if (!/[A-Z]/.test(form.password)) {
                errs.password = "A senha deve conter ao menos 1 letra maiúscula";
            }
        }

        if (!form.confirmPassword.trim()) {
            errs.confirmPassword = "Confirmar senha é obrigatório";
        } else if (form.confirmPassword !== form.password) {
            errs.confirmPassword = "As senhas não coincidem";
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

        toast.success("Cadastro Realizado!");
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

    useEffect(() => {
        const user = form.user;
        let msg = '';

        if (user.length > 0 && user.length < 4) {
            msg = 'Usuário deve ter no mínimo 4 caracteres';
        } else if (user.length > 15) {
            msg = 'Usuário deve ter no máximo 15 caracteres';
        } else if (user && !/^[a-zA-Z0-9]*$/.test(user)) {
            msg = 'Usuário deve conter apenas letras e números';
        }

        setErrors((prev) => ({ ...prev, user: msg }));
    }, [form.user]);

    return (
        <main className="login">
            <div className="container-login">
                <div className="login-left register-left"></div>
                <div className="login-right register-right">
                    <h1>Cadastro</h1>
                    <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className="input-form register-input-form">
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
                        {errors.name && <span className="register-error">{errors.name}</span>}

                        <div className="input-form register-input-form">
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
                        {errors.phone && <span className="register-error">{errors.phone}</span>}

                        <div className="input-form register-input-form">
                            <label htmlFor="user">Usuário</label>
                            <span className="icon"><User size={24} color="black" /></span>
                            <input
                                type="text"
                                id="user"
                                placeholder="Nome de usuário"
                                value={form.user}
                                onChange={(e) => onChange('user', e)}
                                className={`${errors.user ? 'error-input' : ''}`}
                            />
                        </div>
                        {errors.user && <span className="register-error">{errors.user}</span>}

                        <div className="input-form register-input-form">
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
                        {errors.email && <span className="register-error">{errors.email}</span>}

                        <div className="input-form register-input-form">
                            <label htmlFor="password">Senha</label>
                            <span className="icon"><Key size={24} color="black" /></span>
                            <input
                                type="password"
                                id="password"
                                placeholder="Digite sua senha"
                                value={form.password}
                                onChange={(e) => onChange('password', e)}
                                className={`${errors.password ? 'error-input' : ''}`}
                            />
                        </div>
                        {errors.password && <span className="register-error">{errors.password}</span>}

                        <div className="input-form register-input-form">
                            <label htmlFor="confirmPassword">Confirmar Senha</label>
                            <span className="icon"><Key size={24} color="black" /></span>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirme sua senha"
                                value={form.confirmPassword}
                                onChange={(e) => onChange('confirmPassword', e)}
                                className={`${errors.confirmPassword ? 'error-input' : ''}`}
                            />
                        </div>
                        {errors.confirmPassword && <span className="register-error">{errors.confirmPassword}</span>}

                        <div class="register-btn">
                            <button type="button" className="btn-enter" onClick={handleBack} disabled={sending}>
                                <span>voltar</span>
                            </button>

                            <button type="submit" className="btn-enter" disabled={sending}>
                                <span>Cadastrar</span>
                            </button>
                        </div>

                    </form>
                    <span className="version">Versão {VERSION_APP}</span>
                </div>
            </div>
        </main>
    );
}

export default Register;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { User, Key } from '@phosphor-icons/react';
import { toast } from 'react-toastify';
import { VERSION_APP } from '../../../utils/constants';

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [sending, setSending] = useState(false);

    const onChange = (field, e) => {
        setForm({ ...form, [field]: e.target.value });
    };

    return (
        <main className="login">
            <div className="container-login">
                <div className="login-left"></div>
                <div className="login-right">
                    <h1>Cadastro</h1>
                    <form style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className="input-form">
                            <label htmlFor="name">Nome completo</label>
                            <span className="icon"><User size={24} color="black" /></span>
                            <input
                                type="text"
                                id="name"
                                placeholder="Seu nome"
                                value={form.name}
                                onChange={(e) => onChange('name', e)}
                            />
                        </div>

                        <div className="input-form">
                            <label htmlFor="email">Email</label>
                            <span className="icon"><User size={24} color="black" /></span>
                            <input
                                type="email"
                                id="email"
                                placeholder="email@exemplo.com"
                                value={form.email}
                                onChange={(e) => onChange('email', e)}
                            />
                        </div>

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

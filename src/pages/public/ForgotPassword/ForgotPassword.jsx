import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import './ForgotPassword.css';
import { At } from '@phosphor-icons/react';
import logo from '../../../assets/imgs/logomarca.png'

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [erro, setErro] = useState('');
    const [enviando, setEnviando] = useState(false);
    const navigate = useNavigate();

    const validarEmail = (valor) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(valor);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);

        if (email.trim() === '') {
            setErro('Campo email é obrigatório');
            setEnviando(false);
            return;
        }

        if (!validarEmail(email)) {
            setErro('Email incorreto!');
            setEnviando(false);
            return;
        }

        setErro('');
    };

    return (
        <main className="forgot-background">
            <div className="forgot-modal">
                <img src={logo} alt="Apollo" className="forgot-logo" />

                <h1>Esqueci Minha Senha</h1>
                <p>informe seu email para receber a definição de senha</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-form">
                        <label htmlFor="email">Email</label>
                        <span className="icon"><At size={22} color='black' /></span>
                        <input
                            type="text"
                            id="email"
                            placeholder="Digite seu email"
                            className={`${erro ? 'error-input' : ''}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {erro && <span className="error">{erro}</span>}

                    <div className="actions-forgot">
                        <Link to="/" className="btn-backs">Voltar</Link>
                        <button type="submit" className="btn-confirm" disabled={enviando}>
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default ForgotPassword;

import { useState } from "react";
import Header from "../../../components/Header/Header";
import { Key, User } from '@phosphor-icons/react';
import './Editar.css';


export default function Editar(){

    const [form, setForm] = useState({
        nome: '',
        email: '',
        genero: '',
        nascimento: '',
        senha: '',
        confirmarSenha: '',
        cep: '',
        estado: '',
        cidade: '',
        telefone: ''
    });

    const [errors, setErrors] = useState({});
    const [sending, setSending] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    const [deleteError, setDeleteError] = useState("");

    const onChange = (field, e) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const validate = () => {
        let errs = {};

        if (!form.nome.trim()) errs.nome = "Nome é obrigatório";

        if (!form.email.trim()) {
            errs.email = "Email é obrigatório";
        } else if (!form.email.includes('@')) {
            errs.email = "Inclua um @ no email";
        }

        if (!form.genero.trim()) errs.genero = "Gênero é obrigatório";
        if (!form.nascimento.trim()) errs.nascimento = "Data de nascimento é obrigatória";

        if (!form.senha.trim()) {
            errs.senha = "Senha é obrigatória";
        } else {
            if (form.senha.length < 8 || form.senha.length > 20) {
                errs.senha = "A senha deve ter entre 8 e 20 caracteres";
            } else if (!/[0-9]/.test(form.senha)) {
                errs.senha = "A senha deve conter ao menos 1 número";
            } else if (!/[!@#$%^&*(),.?":{}|<>_\-+=~`]/.test(form.senha)) {
                errs.senha = "A senha deve conter ao menos 1 caractere especial";
            } else if (!/[A-Z]/.test(form.senha)) {
                errs.senha = "A senha deve conter ao menos 1 letra maiúscula";
            }
        }

        if (!form.confirmarSenha.trim()) {
            errs.confirmarSenha = "Confirmar senha é obrigatório";
        } else if (form.confirmarSenha !== form.senha) {
            errs.confirmarSenha = "As senhas não coincidem";
        }

        if (!form.cep.trim()) errs.cep = "CEP é obrigatório";
        if (!form.estado.trim()) errs.estado = "Estado é obrigatório";
        if (!form.cidade.trim()) errs.cidade = "Cidade é obrigatória";

        if (!form.telefone.trim()) {
            errs.telefone = "Telefone é obrigatório";
        } else {
            const phoneFormat = /^\(\d{2}\)\s\d{1}\s\d{4}-\d{4}$/;
            if (!phoneFormat.test(form.telefone)) {
                errs.telefone = "Telefone deve estar no formato (xx) x xxxx-xxxx";
            }
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);

        if (!validate()) {
            setSending(false);
            return;
        }

        try {
            // salva aqui no back??
            console.log("Dados atualizados com sucesso!");
        } catch (error) {
            console.log("Erro ao atualizar. Tente novamente.");
        } finally {
            setSending(false);
        }
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
            setForm((prev) => ({ ...prev, telefone: formatted }));
        }
    };

    const formatEstado = (value) => {
        return value
            .replace(/[^a-zA-Z]/g, '')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleEstadoChange = (e) => {
        const formatted = formatEstado(e.target.value);
        setForm((prev) => ({ ...prev, estado: formatted }));
    };

    const formatCep = (value) => {
        const onlyNumbers = value.replace(/\D/g, '').slice(0, 8);
        return onlyNumbers.replace(/^(\d{5})(\d{0,3})$/, '$1-$2');
    };

    const handleCepChange = (e) => {
        const formatted = formatCep(e.target.value);
        setForm((prev) => ({ ...prev, cep: formatted }));
    };

    const handleDeleteAccount = () => {
        if (confirmPassword !== form.senha) {
            setDeleteError("Senha incorreta, tente novamente.");
            return;
        }

        // chamar do back depois
        console.log("Conta deletada com sucesso!");
        setDeleteError("");
        setShowDeleteModal(false);
    };

    return (
        <>
            <Header />
            <div className="editar-container">
                <form className="cards-wrapper" onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="titulo">
                            <h2>Dados da minha conta</h2>
                            <p>Campos com asterisco (*) são obrigatórios</p>
                        </div>

                        <div className="input-form">
                            <label htmlFor="nome">Nome Completo*</label>
                            <span className="icon"><User size={24} color='black' /></span>
                            <input
                                type="text"
                                id="nome"
                                placeholder="Nome Completo"
                                value={form.nome}
                                onChange={(e) => onChange('nome', e)}
                                className={errors.nome ? 'error-input' : ''}
                            />
                        </div>
                        {errors.nome && <span className="register-error">{errors.nome}</span>}

                        <div className="input-form">
                            <label htmlFor="email">Email*</label>
                            <span className="icon"><User size={24} color='black' /></span>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) => onChange('email', e)}
                                className={errors.email ? 'error-input' : ''}
                            />
                        </div>
                        {errors.email && <span className="register-error">{errors.email}</span>}

                        <div className="input-form">
                            <label htmlFor="genero">Gênero*</label>
                            <span className="icon"><User size={24} color='black' /></span>
                            <input
                                type="text"
                                id="genero"
                                placeholder="Gênero"
                                value={form.genero}
                                onChange={(e) => onChange('genero', e)}
                                className={errors.genero ? 'error-input' : ''}
                            />
                        </div>
                        {errors.genero && <span className="register-error">{errors.genero}</span>}

                        <div className="input-form">
                            <label htmlFor="nascimento">Data de Nascimento*</label>
                            <span className="icon"><User size={24} color='black' /></span>
                            <input
                                type="date"
                                id="nascimento"
                                value={form.nascimento}
                                onChange={(e) => onChange('nascimento', e)}
                                className={errors.nascimento ? 'error-input' : ''}
                            />
                        </div>
                        {errors.nascimento && <span className="register-error">{errors.nascimento}</span>}

                        <div className="input-form">
                            <label htmlFor="senha">Senha*</label>
                            <span className="icon"><Key size={24} color='black' /></span>
                            <input
                                type="password"
                                id="senha"
                                placeholder="Senha"
                                value={form.senha}
                                onChange={(e) => onChange('senha', e)}
                                className={errors.senha ? 'error-input' : ''}
                            />
                        </div>
                        {errors.senha && <span className="register-error">{errors.senha}</span>}

                        <div className="input-form">
                            <label htmlFor="confirmarSenha">Confirmar Senha*</label>
                            <span className="icon"><Key size={24} color='black' /></span>
                            <input
                                type="password"
                                id="confirmarSenha"
                                placeholder="Confirmar Senha"
                                value={form.confirmarSenha}
                                onChange={(e) => onChange('confirmarSenha', e)}
                                className={errors.confirmarSenha ? 'error-input' : ''}
                            />
                        </div>
                        {errors.confirmarSenha && <span className="register-error">{errors.confirmarSenha}</span>}
                    </div>

                    <div className="card">
                        <div className="titulo">
                            <h2>Meu endereço e contato</h2>
                            <p>Campos com asterisco (*) são obrigatórios</p>
                        </div>

                        <div className="input-form">
                            <label htmlFor="cep">CEP*</label>
                            <span className="icon"><User size={24} color='black' /></span>
                            <input
                                type="text"
                                id="cep"
                                placeholder="CEP"
                                value={form.cep}
                                onChange={handleCepChange}
                                className={errors.cep ? 'error-input' : ''}
                            />
                        </div>
                        {errors.cep && <span className="register-error">{errors.cep}</span>}

                        <div className="row-exclusiva">
                            <div className="field-wrapper">
                                <div className="input-form">
                                    <label htmlFor="estado">Estado*</label>
                                    <span className="icon"><User size={24} color="black" /></span>
                                    <input
                                        type="text"
                                        id="estado"
                                        placeholder="Estado"
                                        value={form.estado}
                                        onChange={handleEstadoChange}
                                        className={errors.estado ? 'error-input' : ''}
                                    />
                                </div>
                                {errors.estado && <span className="register-error">{errors.estado}</span>}
                            </div>

                            <div className="field-wrapper">
                                <div className="input-form">
                                    <label htmlFor="cidade">Cidade*</label>
                                    <span className="icon"><User size={24} color="black" /></span>
                                    <input
                                        type="text"
                                        id="cidade"
                                        placeholder="Cidade"
                                        value={form.cidade}
                                        onChange={(e) => onChange('cidade', e)}
                                        className={errors.cidade ? 'error-input' : ''}
                                    />
                                </div>
                                {errors.cidade && <span className="register-error">{errors.cidade}</span>}
                            </div>
                        </div>

                        <div className="input-form">
                            <label htmlFor="telefone">Telefone*</label>
                            <span className="icon"><User size={24} color='black' /></span>
                            <input
                                type="tel"
                                id="telefone"
                                placeholder="(99) 9 9999-9999"
                                value={form.telefone}
                                onChange={handlePhoneChange}
                                className={errors.telefone ? 'error-input' : ''}
                            />
                        </div>
                        {errors.telefone && <span className="register-error">{errors.telefone}</span>}
                    </div>

                    <div className="actions">
                        <button type="submit" className="btn salvar" disabled={sending}>Salvar</button>
                        <button
                            type="button"
                            className="btn deletar"
                            onClick={() => setShowDeleteModal(true)}
                        >
                            Deletar conta
                        </button>
                    </div>

                    {showDeleteModal && (
                        <div
                            className="modal-overlay"
                            onClick={() => setShowDeleteModal(false)}
                        >
                            <div
                                className="modal-card"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="modal-warning">⚠</div>
                                <p>Para confirmar, digite sua senha abaixo:</p>
                                <input
                                    type="password"
                                    placeholder="Digite sua senha"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="input-delete"
                                />
                                {deleteError && <p className="delete-error">{deleteError}</p>}

                                <div className="modal-actions">
                                    <button
                                        className={`btn deletar full-width ${!confirmPassword || confirmPassword !== form.senha ? "disabled" : ""
                                            }`}
                                        onClick={handleDeleteAccount}
                                        disabled={!confirmPassword || confirmPassword !== form.senha}
                                    >
                                        Deletar Conta
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </form>
            </div>
        </>
    )
}
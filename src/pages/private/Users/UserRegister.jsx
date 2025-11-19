import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import "./UserRegister.css";

export default function UserRegister() {

    const location = useLocation();
    const mode = location.state?.mode || "create";
    const userToEdit = location.state?.user || null;

    const [form, setForm] = useState({
        role: "admin",
        email: "",
        name: "",
        phone: "",
        cep: "",
        logradouro: "",
        numero: "",
        bairro: "",
        estado: "",
        cidade: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (mode === "edit" && userToEdit) {
            setForm(userToEdit);
        }
    }, [mode, userToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === "phone") {
            newValue = value
                .replace(/\D/g, "")
                .replace(/^(\d{2})(\d)/, "($1) $2")
                .replace(/(\d{5})(\d)/, "$1-$2")
                .slice(0, 15);
        }

        if (name === "cep") {
            newValue = value
                .replace(/\D/g, "")
                .replace(/^(\d{5})(\d)/, "$1-$2")
                .slice(0, 9);
        }

        if (name === "estado") {
            newValue = value
                .replace(/[^A-Za-z]/g, "")
                .toUpperCase()
                .slice(0, 2);
        }

        setForm({ ...form, [name]: newValue });
    };

    const validate = () => {
        const newErrors = {};
        if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email inválido.";
        if (!form.name.trim()) newErrors.name = "Nome é obrigatório.";
        if (form.phone.length < 14) newErrors.phone = "Telefone incompleto.";
        if (form.cep.length < 9) newErrors.cep = "CEP incompleto.";
        if (!form.logradouro) newErrors.logradouro = "Logradouro é obrigatório.";
        if (!form.numero) newErrors.numero = "Número é obrigatório.";
        if (!form.bairro) newErrors.bairro = "Bairro é obrigatório.";
        if (!form.estado) newErrors.estado = "Estado é obrigatório.";
        if (!form.cidade) newErrors.cidade = "Cidade é obrigatória.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            if (mode === "edit") alert("Usuário atualizado com sucesso!");
            else alert("Usuário cadastrado com sucesso!");
        }
    };

    return (
        <div className="page-wrapper">
            <div className="user-register-container">

                <h1 className="user-register-title">
                    {mode === "edit" ? "Edição de Usuário" : "Cadastro de Usuário"}
                </h1>

                <form className="user-register-form" onSubmit={handleSubmit}>

                    <div className="user-register-section">
                        <h3 className="user-register-subtitle">Função no Sistema:</h3>

                        <div className="user-register-checkbox-group">
                            <label>
                                <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={form.role === "admin"}
                                    onChange={handleChange}
                                />
                                Admin
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="role"
                                    value="cliente"
                                    checked={form.role === "cliente"}
                                    onChange={handleChange}
                                />
                                Cliente
                            </label>
                        </div>
                    </div>

                    <div className="user-register-section user-data-section">
                        <h3 className="user-register-subtitle">Dados do Usuário:</h3>

                        <label>Email <span className="required">*</span>:</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email..."
                            value={form.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="user-register-error">{errors.email}</p>}

                        <label>Nome <span className="required">*</span>:</label>
                        <input
                            name="name"
                            type="text"
                            placeholder="Nome..."
                            value={form.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="user-register-error">{errors.name}</p>}

                        <label>Telefone <span className="required">*</span>:</label>
                        <input
                            name="phone"
                            type="text"
                            placeholder="Telefone..."
                            value={form.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <p className="user-register-error">{errors.phone}</p>}
                    </div>

                    <div className="user-register-section user-address-section">
                        <h3 className="user-register-subtitle">Endereço:</h3>

                        <div className="user-register-row">
                            <div className="user-register-group">
                                <label>CEP <span className="required">*</span>:</label>
                                <input
                                    name="cep"
                                    type="text"
                                    placeholder="CEP..."
                                    value={form.cep}
                                    onChange={handleChange}
                                />
                                {errors.cep && <p className="user-register-error">{errors.cep}</p>}
                            </div>

                            <div className="user-register-group">
                                <label>Logradouro <span className="required">*</span>:</label>
                                <input
                                    name="logradouro"
                                    type="text"
                                    placeholder="Logradouro..."
                                    value={form.logradouro}
                                    onChange={handleChange}
                                />
                                {errors.logradouro && <p className="user-register-error">{errors.logradouro}</p>}
                            </div>
                        </div>

                        <div className="user-register-row">
                            <div className="user-register-group">
                                <label>Número <span className="required">*</span>:</label>
                                <input
                                    name="numero"
                                    type="text"
                                    placeholder="Número..."
                                    value={form.numero}
                                    onChange={handleChange}
                                />
                                {errors.numero && <p className="user-register-error">{errors.numero}</p>}
                            </div>

                            <div className="user-register-group">
                                <label>Bairro <span className="required">*</span>:</label>
                                <input
                                    name="bairro"
                                    type="text"
                                    placeholder="Bairro..."
                                    value={form.bairro}
                                    onChange={handleChange}
                                />
                                {errors.bairro && <p className="user-register-error">{errors.bairro}</p>}
                            </div>
                        </div>

                        <div className="user-register-row">
                            <div className="user-register-group">
                                <label>Estado <span className="required">*</span>:</label>
                                <input
                                    name="estado"
                                    type="text"
                                    placeholder="Estado..."
                                    value={form.estado}
                                    onChange={handleChange}
                                />
                                {errors.estado && <p className="user-register-error">{errors.estado}</p>}
                            </div>

                            <div className="user-register-group">
                                <label>Cidade <span className="required">*</span>:</label>
                                <input
                                    name="cidade"
                                    type="text"
                                    placeholder="Cidade..."
                                    value={form.cidade}
                                    onChange={handleChange}
                                />
                                {errors.cidade && <p className="user-register-error">{errors.cidade}</p>}
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="user-register-button">
                        ✔ SALVAR
                    </button>
                </form>

            </div>
        </div>
    );
}

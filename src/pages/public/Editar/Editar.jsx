import { useState } from "react";
import Header from "../../../components/Header/Header";
import { Key, User } from '@phosphor-icons/react';
import './Editar.css';


export default function Editar(){

    return (
        <>
            < Header />
            <div className="editar-container">
                <div className="cards-wrapper">
                    <div className="card">
                        <h2>Dados da minha conta</h2>
                        <p>Campos com asterisco (*) são obrigatórios</p>

                        <div className="input-form">
                            <label htmlFor="nome">Nome Completo*</label>
                            <span className="icon"><User size={24} color='black' /></span>
                            <input type="text" id="nome" placeholder="Nome Completo" />
                        </div>

                        <div className="input-form">
                            <label htmlFor="email">Email*</label>
                            <span className="icon"><User size={24} color='black' /></span>
                            <input type="email" id="email" placeholder="Email" />
                        </div>

                        <div className="input-form">
                            <label htmlFor="genero">Gênero*</label>
                            <span className="icon"><User size={24} color='black' /></span>
                            <input type="text" id="genero" placeholder="Gênero" />
                        </div>

                        <div className="input-form">
                            <label htmlFor="nascimento">Data de Nascimento*</label>
                            <span className="icon"><User size={24} color='black' /></span>
                            <input type="date" id="nascimento" />
                        </div>

                        <div className="input-form">
                            <label htmlFor="senha">Senha*</label>
                            <span className="icon"><User size={24} color='black' /></span>
                            <input type="password" id="senha" placeholder="Senha" />
                        </div>

                        <div className="input-form">
                            <label htmlFor="confirmarSenha">Confirmar Senha*</label>
                            <span className="icon"><User size={24} color='black' /></span>
                            <input type="password" id="confirmarSenha" placeholder="Confirmar Senha" />
                        </div>
                    </div>

                    <div className="card">
                        <h2>Meu endereço e contato</h2>
                        <p>Campos com asterisco (*) são obrigatórios</p>

                        <div className="input-form">
                            <label htmlFor="cep">Cep*</label>
                            <span className="icon"><User size={24} color='black' /></span>
                            <input type="text" id="cep" placeholder="CEP" />
                        </div>

                        <div className="row">
                            <div className="input-form">
                                <label htmlFor="estado">Estado*</label>
                                <span className="icon"><User size={24} color='black' /></span>
                                <input type="text" id="estado" placeholder="Estado" />
                            </div>

                            <div className="input-form">
                                <label htmlFor="cidade">Cidade*</label>
                                <span className="icon"><User size={24} color='black' /></span>
                                <input type="text" id="cidade" placeholder="Cidade" />
                            </div>
                        </div>

                        <div className="input-form">
                            <label htmlFor="telefone">Telefone*</label>
                            <span className="icon"><User size={24} color='black' /></span>
                            <input type="tel" id="telefone" placeholder="Telefone" />
                        </div>
                    </div>
                </div>

                <div className="actions">
                    <button className="btn salvar">Salvar alterações</button>
                    <button className="btn deletar">Deletar conta</button>
                </div>
            </div>
        </>
    )
}
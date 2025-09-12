import React from 'react';
import './Dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard">
            <div className="header">
                <div>
                    <h2>Bem-vindo, <br />Ariel</h2>
                    <p className="subtitulo">Estatística gerais</p>
                </div>
                <div className="data-hora">
                    <p>28/02/2025</p>
                    <p>09:00:15</p>
                </div>
            </div>

            <div className="cards">
                <div className="card verde">
                    <p className="titulo">Total de Carros vendidos Hoje</p>
                    <h3>3</h3>
                    <p className="unidades">unidades</p>
                </div>

                <div className="card roxo">
                    <p className="titulo">Total de Carros vendidos este mês</p>
                    <h3>19</h3>
                    <p className="unidades">unidades</p>
                </div>

                <div className="card amarelo">
                    <p className="titulo">Quantidade de carros em estoque</p>
                    <h3>25</h3>
                    <p className="unidades">unidades</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

import React from 'react';
import './Dashboard.css';
import { useAuth } from '../../../hooks/useAuth'
import SalesComparison from '../../../components/SalesComparison/SalesComparison'; // ajuste o caminho se necessário

function Dashboard() {
    const atual = new Date();
    const dataAtual = atual.toLocaleDateString("pt-BR");
    const horaAtual = atual.toLocaleTimeString("pt-BR");
    const { user } = useAuth();
    return (
        <div className="dashboard">
            {/* Header */}
            <div className="header">
                <h2>Bem-vindo, <br />{user.name}</h2>
            </div>
            
            <div className="secao">
                <div>
                    <p className="subtitulo">Estatística gerais</p>
                </div>
                <div className="data-hora">
                    <p>{dataAtual}</p>
                    <p>{horaAtual}</p>
                </div>
            </div>

            {/* Cards */}
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

            {/* Gráfico */}
            <div className="grafico">
                <p>Vendas deste Mês</p>
                <div><SalesComparison /></div>
            </div>

        </div>
    );
}

export default Dashboard;

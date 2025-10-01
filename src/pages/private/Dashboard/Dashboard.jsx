import React from 'react';
import './Dashboard.css';
import { useAuth } from '../../../hooks/useAuth'
import SalesComparison from '../../../components/SalesComparison/SalesComparison'; 
import HistoryTable from '../../../components/HistoryTable/HistoryTable';
import DashboardCards from '../../../components/DashboardCards/DashboardCards';

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
            
            <div className="estatistica">
                <div>
                    <p className="subtitulo">Estatística gerais</p>
                </div>
                <div className="data-hora">
                    <p>{dataAtual}</p>
                    <p>{horaAtual}</p>
                </div>
            </div>

            {/* Cards */}
            <DashboardCards />

            {/* Gráfico */}
            <div className="secao">
                <p>Vendas deste Mês</p>
                <div><SalesComparison /></div>
            </div>

            {/* Historico Recente */}
            <div className="secao">
                <p>Histórico Recente</p>
                <div><HistoryTable /></div>
            </div>


        </div>
    );
}

export default Dashboard;

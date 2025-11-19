import React from 'react';
import './Dashboard.css';
import { useAuth } from '../../../hooks/useAuth'
import SalesComparison from '../../../components/SalesComparison/SalesComparison';
import HistoryTable from '../../../components/HistoryTable/HistoryTable';
import DashboardCards from '../../../components/DashboardCards/DashboardCards';
import historyData from '../../../data/historyData';
import metricsData from '../../../data/metricsData';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

function Dashboard() {
    const atual = new Date();
    const dataAtual = atual.toLocaleDateString("pt-BR");
    const horaAtual = atual.toLocaleTimeString("pt-BR");
    const { user } = useAuth();

    const exportCSV = () => {
        const headers = ['Cod histórico', 'Data e hora', 'Mensagem'];
        const csvContent = [
            headers.join(','),
            ...historyData.map(row =>
                `${row.id},"${row.date}","${row.message}"`
            )
        ].join('\n');

        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `historico_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        const hoje = new Date().toLocaleDateString('pt-BR');
        const hora = new Date().toLocaleTimeString('pt-BR');

        const primaryColor = [44, 62, 80];
        const accentColor = [52, 152, 219];
        const successColor = [46, 204, 113];

        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, 210, 35, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.setFont(undefined, 'bold');
        doc.text('Relatório de Dashboard', 15, 15);

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text(`Gerado em: ${hoje} às ${hora}`, 15, 23);
        doc.text(`Usuário: ${user.name}`, 15, 28);

        doc.setDrawColor(...accentColor);
        doc.setLineWidth(1);
        doc.line(15, 38, 195, 38);

        let yPos = 48;
        doc.setTextColor(...primaryColor);
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Métricas Gerais', 15, yPos);

        yPos += 8;
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');

        const metrics = [
            { label: 'Carros vendidos hoje', value: `${metricsData.vendas.hoje} unidades`, color: [30, 130, 76] },
            { label: 'Carros vendidos este mês', value: `${metricsData.vendas.mes} unidades`, color: [123, 31, 162] },
            { label: 'Carros em estoque', value: `${metricsData.vendas.estoque} unidades`, color: [184, 184, 46] }
        ];

        metrics.forEach((metric, index) => {
            const xPos = 15 + (index * 63);

            doc.setFillColor(...metric.color);
            doc.roundedRect(xPos, yPos, 60, 22, 2, 2, 'F');

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            doc.text(metric.label, xPos + 3, yPos + 5);
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text(metric.value, xPos + 3, yPos + 12);
            doc.setFont(undefined, 'normal');
            doc.setFontSize(10);
        });

        yPos += 30;

        doc.setTextColor(...primaryColor);
        doc.setFillColor(240, 240, 240);
        doc.roundedRect(15, yPos, 180, 20, 2, 2, 'F');

        doc.setFontSize(9);
        doc.text(`Período: ${metricsData.periodo.inicio} a ${metricsData.periodo.fim}`, 20, yPos + 7);
        doc.text(`Meta mensal: ${metricsData.vendas.metaMensal} veículos`, 20, yPos + 13);
        doc.text(`Atingimento: ${metricsData.vendas.atingimentoMeta}%`, 100, yPos + 7);
        doc.text(`Crescimento: ${metricsData.vendas.percentualMes}%`, 100, yPos + 13);

        yPos += 30;

        doc.setTextColor(...primaryColor);
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Histórico Recente de Atividades', 15, yPos);

        yPos += 5;

        const tableData = metricsData.historico.slice(0, 15).map(item => [
            item.id,
            item.date,
            item.message
        ]);

        autoTable(doc, {
            startY: yPos,
            head: [['Cód.', 'Data e Hora', 'Mensagem']],
            body: tableData,
            theme: 'grid',
            headStyles: {
                fillColor: primaryColor,
                textColor: [255, 255, 255],
                fontSize: 9,
                fontStyle: 'bold',
                halign: 'center'
            },
            bodyStyles: {
                fontSize: 8,
                textColor: [50, 50, 50]
            },
            columnStyles: {
                0: { cellWidth: 20, halign: 'center' },
                1: { cellWidth: 35, halign: 'center' },
                2: { cellWidth: 125, halign: 'left' }
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245]
            },
            margin: { left: 15, right: 15 }
        });

        doc.addPage();
        yPos = 20;

        doc.setTextColor(...primaryColor);
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Veículos Mais Consultados', 15, yPos);

        yPos += 5;

        const vehicleData = metricsData.veiculosMaisConsultados.map((veiculo, index) => [
            `${index + 1}º`,
            veiculo.modelo,
            `${veiculo.consultas} consultas`
        ]);

        autoTable(doc, {
            startY: yPos,
            head: [['Ranking', 'Modelo do Veículo', 'Total de Consultas']],
            body: vehicleData,
            theme: 'grid',
            headStyles: {
                fillColor: successColor,
                textColor: [255, 255, 255],
                fontSize: 10,
                fontStyle: 'bold',
                halign: 'center'
            },
            bodyStyles: {
                fontSize: 9,
                textColor: [50, 50, 50]
            },
            columnStyles: {
                0: { cellWidth: 25, halign: 'center', fontStyle: 'bold' },
                1: { cellWidth: 100, halign: 'left' },
                2: { cellWidth: 55, halign: 'center' }
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245]
            },
            margin: { left: 15, right: 15 }
        });

        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(
                `Página ${i} de ${pageCount} | Sistema Apollo - Gestão de Veículos`,
                105,
                290,
                { align: 'center' }
            );
        }

        doc.save(`relatorio-dashboard-${new Date().toISOString().split('T')[0]}.pdf`);
    };

    const exportExcel = () => {
        alert('Funcionalidade de exportação para Excel será implementada. Requer biblioteca como xlsx.');
        console.log('Exportando Excel...', historyData);
    };
    return (
        <div className="dashboard" style={{ zIndex: 30000, position: 'relative' }}>
            {/* Header */}
            <div className="header">
                <div className="header-welcome">
                    <h2>Bem-vindo, {user.name}</h2>
                    <p className="subtitulo">Estatísticas gerais</p>
                </div>
                <div className="data-hora">
                    <p className="data">{dataAtual}</p>
                    <p className="hora">{horaAtual}</p>
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
                <div className="secao-header">
                    <p>Histórico Recente</p>
                    <div className="export-buttons">
                        <button className="btn-export btn-csv" onClick={exportCSV}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Exportar CSV
                        </button>
                        <button className="btn-export btn-pdf" onClick={exportPDF}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Exportar PDF
                        </button>
                        <button className="btn-export btn-excel" onClick={exportExcel}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Exportar Excel
                        </button>
                    </div>
                </div>
                <div><HistoryTable /></div>
            </div>


        </div>
    );
}

export default Dashboard;

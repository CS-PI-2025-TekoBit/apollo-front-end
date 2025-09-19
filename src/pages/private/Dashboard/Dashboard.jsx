// import React from 'react';
// import './Dashboard.css';
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
// } from "recharts";

// function Dashboard() {
//     const data = [
//         { name: "A", vendas: 5000, estoque: 3000, recebidos: 1000 },
//         { name: "B", vendas: 6000, estoque: 2000, recebidos: 3000 },
//         { name: "C", vendas: 4000, estoque: 2500, recebidos: 3500 },
//         { name: "D", vendas: 3000, estoque: 4000, recebidos: 2000 },
//         { name: "E", vendas: 2000, estoque: 4500, recebidos: 4000 },
//         { name: "F", vendas: 1500, estoque: 6000, recebidos: 3500 },
//         { name: "G", vendas: 2500, estoque: 5000, recebidos: 2000 },
//         { name: "H", vendas: 1800, estoque: 6500, recebidos: 3000 },
//     ];

//     return (
//         <div className="dashboard">
//             {/* Header */}
//             <div className="header">
//                 <div>
//                     <h2>Bem-vindo, <br />Ariel</h2>
//                     <p className="subtitulo">Estatística gerais</p>
//                 </div>
//                 <div className="data-hora">
//                     <p>28/02/2025</p>
//                     <p>09:00:15</p>
//                 </div>
//             </div>

//             {/* Cards */}
//             <div className="cards">
//                 <div className="card verde">
//                     <p className="titulo">Total de Carros vendidos Hoje</p>
//                     <h3>3</h3>
//                     <p className="unidades">unidades</p>
//                 </div>

//                 <div className="card roxo">
//                     <p className="titulo">Total de Carros vendidos este mês</p>
//                     <h3>19</h3>
//                     <p className="unidades">unidades</p>
//                 </div>

//                 <div className="card amarelo">
//                     <p className="titulo">Quantidade de carros em estoque</p>
//                     <h3>25</h3>
//                     <p className="unidades">unidades</p>
//                 </div>
//             </div>

//             {/* Gráfico */}
//             <div className="grafico-section">
//                 <h3>Vendas deste Mês</h3>
//                 <div className="grafico-container">
//                     <ResponsiveContainer width="100%" height={300}>
//                         <LineChart data={data}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="name" />
//                             <YAxis />
//                             <Tooltip />
//                             <Legend />
//                             <Line type="monotone" dataKey="vendas" stroke="#f9a825" strokeWidth={3} />
//                             <Line type="monotone" dataKey="estoque" stroke="#29b6f6" strokeWidth={3} />
//                             <Line type="monotone" dataKey="recebidos" stroke="#43a047" strokeWidth={3} />
//                         </LineChart>
//                     </ResponsiveContainer>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Dashboard;

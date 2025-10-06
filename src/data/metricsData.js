
const metricsData = {
    periodo: {
        inicio: "01/10/2025",
        fim: "05/10/2025"
    },
    vendas: {
        hoje: 3,
        mes: 19,
        estoque: 25,
        percentualMes: 15.2, 
        metaMensal: 25,
        atingimentoMeta: 76
    },
    historico: [
        {
            id: "0001",
            date: "05/10/2025 14:32",
            message: "Cliente João Silva perguntou se o Fiat Uno 2020 está disponível",
            tipo: "consulta"
        },
        {
            id: "0002",
            date: "05/10/2025 13:15",
            message: "Volkswagen Gol 2019 mudou o status de 'à venda' para 'vendido'",
            tipo: "venda"
        },
        {
            id: "0003",
            date: "05/10/2025 11:45",
            message: "Cliente Maria Santos agendou test-drive do Honda Civic 2021",
            tipo: "agendamento"
        },
        {
            id: "0004",
            date: "05/10/2025 10:20",
            message: "Novo veículo cadastrado: Chevrolet Onix 2022",
            tipo: "cadastro"
        },
        {
            id: "0005",
            date: "04/10/2025 16:55",
            message: "Cliente Pedro Oliveira finalizou compra do Ford Ka 2020",
            tipo: "venda"
        },
        {
            id: "0006",
            date: "04/10/2025 15:30",
            message: "Hyundai HB20 2021 teve o preço atualizado de R$ 55.000 para R$ 52.000",
            tipo: "atualizacao"
        },
        {
            id: "0007",
            date: "04/10/2025 14:10",
            message: "Cliente Ana Costa perguntou sobre financiamento do Toyota Corolla 2022",
            tipo: "consulta"
        },
        {
            id: "0008",
            date: "04/10/2025 11:25",
            message: "Renault Sandero 2020 mudou o status de 'à venda' para 'reservado'",
            tipo: "reserva"
        },
        {
            id: "0009",
            date: "03/10/2025 17:40",
            message: "Cliente Carlos Mendes realizou test-drive do Jeep Compass 2023",
            tipo: "test-drive"
        },
        {
            id: "0010",
            date: "03/10/2025 16:15",
            message: "Nissan Versa 2021 teve fotos atualizadas no sistema",
            tipo: "atualizacao"
        },
        {
            id: "0011",
            date: "03/10/2025 14:50",
            message: "Cliente Fernanda Lima perguntou se o Chevrolet Tracker 2022 está disponível",
            tipo: "consulta"
        },
        {
            id: "0012",
            date: "03/10/2025 13:20",
            message: "Fiat Argo 2021 mudou o status de 'reservado' para 'vendido'",
            tipo: "venda"
        },
        {
            id: "0013",
            date: "02/10/2025 18:05",
            message: "Cliente Ricardo Santos cancelou reserva do Volkswagen Polo 2020",
            tipo: "cancelamento"
        },
        {
            id: "0014",
            date: "02/10/2025 15:45",
            message: "Novo veículo cadastrado: Peugeot 208 2023",
            tipo: "cadastro"
        },
        {
            id: "0015",
            date: "02/10/2025 14:30",
            message: "Cliente Juliana Rocha agendou visita para ver o Honda HR-V 2022",
            tipo: "agendamento"
        },
        {
            id: "0016",
            date: "01/10/2025 17:20",
            message: "Mitsubishi L200 2021 teve a quilometragem atualizada para 35.500 km",
            tipo: "atualizacao"
        },
        {
            id: "0017",
            date: "01/10/2025 16:00",
            message: "Cliente Bruno Alves perguntou sobre trocas do Volkswagen T-Cross 2022",
            tipo: "consulta"
        },
        {
            id: "0018",
            date: "01/10/2025 14:15",
            message: "Ford EcoSport 2020 mudou o status de 'à venda' para 'vendido'",
            tipo: "venda"
        },
        {
            id: "0019",
            date: "01/10/2025 11:50",
            message: "Cliente Patrícia Sousa solicitou proposta para o Chevrolet S10 2021",
            tipo: "proposta"
        },
        {
            id: "0020",
            date: "01/10/2025 10:30",
            message: "Novo veículo cadastrado: Toyota Hilux 2023",
            tipo: "cadastro"
        }
    ],
    veiculosMaisConsultados: [
        { modelo: "Honda Civic 2021", consultas: 45 },
        { modelo: "Toyota Corolla 2022", consultas: 38 },
        { modelo: "Volkswagen Gol 2019", consultas: 32 },
        { modelo: "Fiat Uno 2020", consultas: 28 },
        { modelo: "Chevrolet Onix 2022", consultas: 25 }
    ]
};

export default metricsData;

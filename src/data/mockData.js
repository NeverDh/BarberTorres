// Dados mockados para o app Barber Torres

export const usuarios = [
  {
    id: 1,
    nome: 'João Cliente',
    email: 'joao@cliente.com',
    senha: '123456',
    tipo: 'cliente',
    telefone: '(11) 99999-9999',
    fidelidade: 3, // quantos cortes já fez
    pontuacao: -50 // pontos negativos por faltas
  },
  {
    id: 2,
    nome: 'Pedro Barbeiro',
    email: 'pedro@barbeiro.com',
    senha: '123456',
    tipo: 'profissional',
    telefone: '(11) 88888-8888',
    especialidades: ['Corte masculino', 'Barba', 'Bigode']
  }
];

export const servicos = [
  {
    id: 1,
    nome: 'Corte Masculino',
    preco: 30.00,
    duracao: 30,
    descricao: 'Corte tradicional masculino'
  },
  {
    id: 2,
    nome: 'Barba',
    preco: 20.00,
    duracao: 20,
    descricao: 'Aparar e modelar barba'
  },
  {
    id: 3,
    nome: 'Corte + Barba',
    preco: 45.00,
    duracao: 45,
    descricao: 'Combo completo'
  },
  {
    id: 4,
    nome: 'Bigode',
    preco: 15.00,
    duracao: 15,
    descricao: 'Aparar bigode'
  }
];

export const planos = [
  {
    id: 1,
    nome: 'Plano Mensal',
    preco: 80.00,
    duracao: 30,
    servicos: 3,
    descricao: '3 cortes por mês',
    profissionalId: 2
  },
  {
    id: 2,
    nome: 'Plano Trimestral',
    preco: 200.00,
    duracao: 90,
    servicos: 10,
    descricao: '10 cortes em 3 meses',
    profissionalId: 2
  }
];

export const horariosDisponiveis = [
  {
    id: 1,
    profissionalId: 2,
    data: '2024-01-15',
    horarios: ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00']
  },
  {
    id: 2,
    profissionalId: 2,
    data: '2024-01-16',
    horarios: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
  }
];

export const agendamentos = [
  {
    id: 1,
    clienteId: 1,
    profissionalId: 2,
    servicoId: 1,
    data: '2024-01-15',
    horario: '10:00',
    status: 'confirmado', // confirmado, cancelado, concluido, faltou
    preco: 30.00,
    observacoes: ''
  }
];

export const planosCliente = [
  {
    id: 1,
    clienteId: 1,
    planoId: 1,
    dataCompra: '2024-01-01',
    dataVencimento: '2024-01-31',
    servicosRestantes: 2,
    ativo: true
  }
];
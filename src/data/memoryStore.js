// Store em memória para dados dinâmicos
let memoryStore = {
  agendamentos: [
    {
      id: 1,
      clienteId: 1,
      profissionalId: 2,
      servicoId: 1,
      data: '2024-01-15',
      horario: '10:00',
      status: 'confirmado',
      preco: 30.00,
      observacoes: ''
    }
  ],
  planos: [
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
  ],
  horariosOcupados: [
    { data: '2024-01-15', horario: '10:00', profissionalId: 2 }
  ]
};

export const getAgendamentos = () => memoryStore.agendamentos;
export const getPlanos = () => memoryStore.planos;
export const getHorariosOcupados = () => memoryStore.horariosOcupados;

export const addAgendamento = (agendamento) => {
  const novoId = Math.max(...memoryStore.agendamentos.map(a => a.id), 0) + 1;
  const novoAgendamento = { ...agendamento, id: novoId };
  memoryStore.agendamentos.push(novoAgendamento);
  
  // Marcar horário como ocupado
  memoryStore.horariosOcupados.push({
    data: agendamento.data,
    horario: agendamento.horario,
    profissionalId: agendamento.profissionalId
  });
  
  return novoAgendamento;
};

export const addPlano = (plano) => {
  const novoId = Math.max(...memoryStore.planos.map(p => p.id), 0) + 1;
  const novoPlano = { ...plano, id: novoId };
  memoryStore.planos.push(novoPlano);
  return novoPlano;
};

export const isHorarioDisponivel = (data, horario, profissionalId) => {
  return !memoryStore.horariosOcupados.some(h => 
    h.data === data && h.horario === horario && h.profissionalId === profissionalId
  );
};
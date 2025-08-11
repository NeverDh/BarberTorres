// Utilitários para sistema de fidelidade e pontuação

export const calcularDesconto = (fidelidade) => {
  // A cada 5 cortes, o 6º é metade do preço
  if ((fidelidade + 1) % 6 === 0) {
    return 0.5; // 50% de desconto
  }
  return 0;
};

export const calcularPrecoComDesconto = (preco, fidelidade) => {
  const desconto = calcularDesconto(fidelidade);
  return preco * (1 - desconto);
};

export const calcularPontuacao = (agendamentos) => {
  let pontos = 0;
  
  agendamentos.forEach(agendamento => {
    if (agendamento.status === 'faltou') {
      pontos -= 50; // Penalidade por falta
    } else if (agendamento.status === 'concluido') {
      pontos += 10; // Pontos por comparecimento
    }
  });
  
  return pontos;
};

export const getStatusFidelidade = (fidelidade) => {
  const proximoDesconto = 6 - ((fidelidade + 1) % 6);
  
  if (proximoDesconto === 6) {
    return {
      mensagem: 'Próximo corte com 50% de desconto!',
      progresso: 1,
      cor: '#27ae60'
    };
  }
  
  return {
    mensagem: `Faltam ${proximoDesconto} cortes para desconto`,
    progresso: ((fidelidade + 1) % 6) / 6,
    cor: '#3498db'
  };
};
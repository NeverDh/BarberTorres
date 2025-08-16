import { useState, useEffect } from 'react';
import { firestoreService } from '../services/firestoreService';

export const useFirestore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeOperation = async (operation) => {
    setLoading(true);
    setError(null);
    try {
      const result = await operation();
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  return {
    loading,
    error,
    executeOperation,
    // Operações específicas
    criarAgendamento: (data) => executeOperation(() => firestoreService.criarAgendamento(data)),
    buscarAgendamentos: (userId, tipo) => executeOperation(() => firestoreService.buscarAgendamentos(userId, tipo)),
    atualizarAgendamento: (id, updates) => executeOperation(() => firestoreService.atualizarAgendamento(id, updates)),
    criarPlano: (data) => executeOperation(() => firestoreService.criarPlano(data)),
    buscarPlanos: (profissionalId) => executeOperation(() => firestoreService.buscarPlanos(profissionalId)),
    salvarHorarios: (profissionalId, horarios) => executeOperation(() => firestoreService.salvarHorarios(profissionalId, horarios)),
    buscarProfissionais: () => executeOperation(() => firestoreService.buscarProfissionais())
  };
};
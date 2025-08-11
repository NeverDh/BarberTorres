import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { agendamentos, servicos, horariosDisponiveis } from '../../data/mockData';
import { calcularPrecoComDesconto } from '../../utils/fidelidade';

export default function AgendamentosScreen() {
  const { usuario, logout } = useAuth();
  const [selectedServico, setSelectedServico] = useState(null);
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [selectedData, setSelectedData] = useState('2024-01-15');

  const agendamentosUsuario = agendamentos.filter(a => a.clienteId === usuario.id);
  const horariosData = horariosDisponiveis.find(h => h.data === selectedData);

  const confirmarAgendamento = () => {
    if (!selectedServico || !selectedHorario) {
      Alert.alert('Erro', 'Selecione um serviço e horário');
      return;
    }

    const servico = servicos.find(s => s.id === selectedServico);
    const precoFinal = calcularPrecoComDesconto(servico.preco, usuario.fidelidade);
    const desconto = servico.preco - precoFinal;

    let mensagem = `Serviço: ${servico.nome}\nData: ${selectedData}\nHorário: ${selectedHorario}\nPreço: R$ ${precoFinal.toFixed(2)}`;
    
    if (desconto > 0) {
      mensagem += `\n\n🎉 Desconto de fidelidade: R$ ${desconto.toFixed(2)}`;
    }

    Alert.alert('Agendamento Confirmado!', mensagem);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Agendamentos</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={24} color="#2c3e50" />
        </TouchableOpacity>
      </View>

      {/* Agendamentos Existentes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximos Agendamentos</Text>
        {agendamentosUsuario.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum agendamento encontrado</Text>
        ) : (
          agendamentosUsuario.map(agendamento => (
            <View key={agendamento.id} style={styles.agendamentoCard}>
              <View style={styles.agendamentoHeader}>
                <Text style={styles.agendamentoServico}>
                  {servicos.find(s => s.id === agendamento.servicoId)?.nome}
                </Text>
                <Text style={[
                  styles.status,
                  agendamento.status === 'confirmado' ? styles.confirmado : 
                  agendamento.status === 'faltou' ? styles.faltou : styles.concluido
                ]}>
                  {agendamento.status.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.agendamentoInfo}>
                📅 {agendamento.data} às {agendamento.horario}
              </Text>
              <Text style={styles.agendamentoPreco}>
                💰 R$ {agendamento.preco.toFixed(2)}
              </Text>
            </View>
          ))
        )}
      </View>

      {/* Novo Agendamento */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Novo Agendamento</Text>
        
        <Text style={styles.subTitle}>Escolha o Serviço:</Text>
        {servicos.map(servico => {
          const precoFinal = calcularPrecoComDesconto(servico.preco, usuario.fidelidade);
          const temDesconto = precoFinal < servico.preco;
          
          return (
            <TouchableOpacity
              key={servico.id}
              style={[
                styles.servicoCard,
                selectedServico === servico.id && styles.selectedCard
              ]}
              onPress={() => setSelectedServico(servico.id)}
            >
              <View style={styles.servicoInfo}>
                <Text style={styles.servicoNome}>{servico.nome}</Text>
                <Text style={styles.servicoDescricao}>{servico.descricao}</Text>
                <Text style={styles.servicoDuracao}>{servico.duracao} min</Text>
              </View>
              <View style={styles.precoContainer}>
                {temDesconto && (
                  <Text style={styles.precoOriginal}>R$ {servico.preco.toFixed(2)}</Text>
                )}
                <Text style={[styles.servicoPreco, temDesconto && styles.precoDesconto]}>
                  R$ {precoFinal.toFixed(2)}
                </Text>
                {temDesconto && (
                  <Text style={styles.descontoLabel}>50% OFF</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        <Text style={styles.subTitle}>Horários Disponíveis ({selectedData}):</Text>
        <View style={styles.horariosGrid}>
          {horariosData?.horarios.map(horario => (
            <TouchableOpacity
              key={horario}
              style={[
                styles.horarioButton,
                selectedHorario === horario && styles.selectedHorario
              ]}
              onPress={() => setSelectedHorario(horario)}
            >
              <Text style={[
                styles.horarioText,
                selectedHorario === horario && styles.selectedHorarioText
              ]}>
                {horario}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.confirmarButton}
          onPress={confirmarAgendamento}
        >
          <Text style={styles.confirmarButtonText}>Confirmar Agendamento</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  logoutButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#ecf0f1',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 10,
    marginTop: 15,
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    padding: 20,
  },
  agendamentoCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  agendamentoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  agendamentoServico: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  confirmado: {
    backgroundColor: '#d5f4e6',
    color: '#27ae60',
  },
  faltou: {
    backgroundColor: '#ffebee',
    color: '#e74c3c',
  },
  concluido: {
    backgroundColor: '#e3f2fd',
    color: '#2196f3',
  },
  agendamentoInfo: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  agendamentoPreco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  servicoCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#3498db',
  },
  servicoInfo: {
    flex: 1,
  },
  servicoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  servicoDescricao: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 2,
  },
  servicoDuracao: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 2,
  },
  precoContainer: {
    alignItems: 'flex-end',
  },
  servicoPreco: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  precoOriginal: {
    fontSize: 14,
    color: '#95a5a6',
    textDecorationLine: 'line-through',
  },
  precoDesconto: {
    color: '#e74c3c',
  },
  descontoLabel: {
    fontSize: 12,
    color: '#e74c3c',
    fontWeight: 'bold',
    backgroundColor: '#ffebee',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
  },
  horariosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  horarioButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: '30%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedHorario: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  horarioText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  selectedHorarioText: {
    color: 'white',
  },
  confirmarButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmarButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
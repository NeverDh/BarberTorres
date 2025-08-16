import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { servicos } from '../../data/mockData';
import { getAgendamentos, getPlanos } from '../../data/memoryStore';

export default function HomeProfissionalScreen({ navigation }) {
  const { usuario, logout } = useAuth();
  
  const agendamentos = getAgendamentos();
  const planos = getPlanos();
  
  const agendamentosHoje = agendamentos.filter(a => 
    a.profissionalId === usuario.id && a.data === '2024-01-15'
  );

  const totalReceita = agendamentos
    .filter(a => a.profissionalId === usuario.id && a.status === 'concluido')
    .reduce((total, a) => total + a.preco, 0);

  const planosAtivos = planos.filter(p => p.profissionalId === usuario.id);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcome}>Olá, {usuario.nome}!</Text>
            <Text style={styles.subtitle}>Painel do Profissional</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Ionicons name="log-out-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Cards de Estatísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{agendamentosHoje.length}</Text>
          <Text style={styles.statLabel}>Agendamentos Hoje</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>R$ {totalReceita.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Receita Total</Text>
        </View>
      </View>

      {/* Agendamentos de Hoje */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Agendamentos de Hoje</Text>
        {agendamentosHoje.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum agendamento para hoje</Text>
        ) : (
          agendamentosHoje.map(agendamento => (
            <View key={agendamento.id} style={styles.agendamentoCard}>
              <View style={styles.agendamentoHeader}>
                <Text style={styles.agendamentoHorario}>{agendamento.horario}</Text>
                <Text style={[
                  styles.status,
                  agendamento.status === 'confirmado' ? styles.confirmado : styles.concluido
                ]}>
                  {agendamento.status.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.agendamentoServico}>
                {servicos.find(s => s.id === agendamento.servicoId)?.nome}
              </Text>
              <Text style={styles.agendamentoPreco}>
                R$ {agendamento.preco.toFixed(2)}
              </Text>
            </View>
          ))
        )}
      </View>

      {/* Meus Planos */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Meus Planos</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('CriarPlano')}
          >
            <Text style={styles.addButtonText}>+ Criar</Text>
          </TouchableOpacity>
        </View>
        
        {planosAtivos.map(plano => (
          <View key={plano.id} style={styles.planoCard}>
            <Text style={styles.planoNome}>{plano.nome}</Text>
            <Text style={styles.planoDescricao}>{plano.descricao}</Text>
            <Text style={styles.planoPreco}>R$ {plano.preco.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      {/* Ações Rápidas */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Horarios')}
        >
          <Text style={styles.actionButtonText}>📅 Gerenciar Horários</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.actionButtonSecondary]}
          onPress={() => navigation.navigate('CriarPlano')}
        >
          <Text style={styles.actionButtonText}>💼 Criar Plano</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#e67e22',
    padding: 20,
    paddingTop: 40,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
    textAlign: 'center',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  addButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  agendamentoCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  agendamentoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  agendamentoHorario: {
    fontSize: 18,
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
  concluido: {
    backgroundColor: '#e3f2fd',
    color: '#2196f3',
  },
  agendamentoServico: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 5,
  },
  agendamentoPreco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  planoCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#e67e22',
  },
  planoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  planoDescricao: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 2,
  },
  planoPreco: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e67e22',
    marginTop: 5,
  },
  actionsContainer: {
    padding: 20,
    gap: 15,
  },
  actionButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonSecondary: {
    backgroundColor: '#9b59b6',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
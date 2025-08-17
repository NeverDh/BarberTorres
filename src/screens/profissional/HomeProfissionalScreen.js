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
import { useTheme } from '../../context/ThemeContext';
import { ThemeSelector } from '../../components/ThemeSelector';
import { servicos } from '../../data/mockData';
import { getAgendamentos, getPlanos } from '../../data/memoryStore';

export default function HomeProfissionalScreen({ navigation }) {
  const { usuario, logout } = useAuth();
  const { theme } = useTheme();
  
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
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
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

      {/* Seletor de Tema */}
      <View style={styles.themeContainer}>
        <ThemeSelector />
      </View>

      {/* Cards de Estatísticas */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.statNumber, { color: theme.colors.text }]}>{agendamentosHoje.length}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Agendamentos Hoje</Text>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.statNumber, { color: theme.colors.text }]}>R$ {totalReceita.toFixed(2)}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Receita Total</Text>
        </View>
      </View>

      {/* Agendamentos de Hoje */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Agendamentos de Hoje</Text>
        {agendamentosHoje.length === 0 ? (
          <Text style={[styles.emptyText, { color: theme.colors.textSecondary, backgroundColor: theme.colors.surface }]}>Nenhum agendamento para hoje</Text>
        ) : (
          agendamentosHoje.map(agendamento => (
            <View key={agendamento.id} style={[styles.agendamentoCard, { backgroundColor: theme.colors.surface }]}>
              <View style={styles.agendamentoHeader}>
                <Text style={[styles.agendamentoHorario, { color: theme.colors.text }]}>{agendamento.horario}</Text>
                <Text style={[
                  styles.status,
                  agendamento.status === 'confirmado' ? styles.confirmado : styles.concluido
                ]}>
                  {agendamento.status.toUpperCase()}
                </Text>
              </View>
              <Text style={[styles.agendamentoServico, { color: theme.colors.text }]}>
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
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Meus Planos</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('CriarPlano')}
          >
            <Text style={styles.addButtonText}>+ Criar</Text>
          </TouchableOpacity>
        </View>
        
        {planosAtivos.map(plano => (
          <View key={plano.id} style={[styles.planoCard, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.planoNome, { color: theme.colors.text }]}>{plano.nome}</Text>
            <Text style={[styles.planoDescricao, { color: theme.colors.textSecondary }]}>{plano.descricao}</Text>
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
  },
  themeContainer: {
    marginHorizontal: 20,
    marginTop: 10,
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
  },
  statLabel: {
    fontSize: 14,
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
    textAlign: 'center',
    padding: 20,
    borderRadius: 8,
  },
  agendamentoCard: {
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
    marginBottom: 5,
  },
  agendamentoPreco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  planoCard: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#e67e22',
  },
  planoNome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  planoDescricao: {
    fontSize: 14,
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
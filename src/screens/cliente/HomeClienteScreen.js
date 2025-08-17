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
import { getPlanos } from '../../data/memoryStore';
import { getStatusFidelidade } from '../../utils/fidelidade';

export default function HomeClienteScreen({ navigation }) {
  const { usuario, logout } = useAuth();
  const { theme } = useTheme();
  const statusFidelidade = getStatusFidelidade(usuario.fidelidade);
  const planos = getPlanos();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcome}>Olá, {usuario.nome}!</Text>
            <Text style={styles.subtitle}>Bem-vindo ao Barber Torres</Text>
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

      {/* Card de Fidelidade */}
      <View style={[styles.fidelidadeCard, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.fidelidadeTitle, { color: theme.colors.text }]}>Programa de Fidelidade</Text>
        <Text style={[styles.fidelidadeText, { color: theme.colors.textSecondary }]}>{statusFidelidade.mensagem}</Text>
        <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
          <View 
            style={[
              styles.progress, 
              { 
                width: `${statusFidelidade.progresso * 100}%`,
                backgroundColor: statusFidelidade.cor 
              }
            ]} 
          />
        </View>
        <Text style={[styles.cortesRealizados, { color: theme.colors.textSecondary }]}>
          Cortes realizados: {usuario.fidelidade}
        </Text>
      </View>

      {/* Pontuação */}
      {usuario.pontuacao !== 0 && (
        <View style={[
          styles.pontuacaoCard,
          { backgroundColor: theme.colors.surface },
          usuario.pontuacao < 0 ? styles.pontuacaoNegativa : styles.pontuacaoPositiva
        ]}>
          <Text style={[styles.pontuacaoTitle, { color: theme.colors.text }]}>
            {usuario.pontuacao < 0 ? 'Penalidades' : 'Pontos'}
          </Text>
          <Text style={[styles.pontuacaoValor, { color: theme.colors.text }]}>
            {usuario.pontuacao > 0 ? '+' : ''}{usuario.pontuacao} pontos
          </Text>
          {usuario.pontuacao < 0 && (
            <Text style={[styles.pontuacaoDescricao, { color: theme.colors.textSecondary }]}>
              Será descontado no próximo pagamento
            </Text>
          )}
        </View>
      )}

      {/* Serviços */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Nossos Serviços</Text>
        {servicos.map(servico => (
          <View key={servico.id} style={[styles.servicoCard, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.servicoInfo}>
              <Text style={[styles.servicoNome, { color: theme.colors.text }]}>{servico.nome}</Text>
              <Text style={[styles.servicoDescricao, { color: theme.colors.textSecondary }]}>{servico.descricao}</Text>
              <Text style={[styles.servicoDuracao, { color: theme.colors.textSecondary }]}>{servico.duracao} minutos</Text>
            </View>
            <Text style={styles.servicoPreco}>R$ {servico.preco.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      {/* Planos */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Planos Disponíveis</Text>
        {planos.map(plano => (
          <TouchableOpacity 
            key={plano.id} 
            style={[styles.planoCard, { backgroundColor: theme.colors.surface }]}
          >
            <Text style={[styles.planoNome, { color: theme.colors.text }]}>{plano.nome}</Text>
            <Text style={[styles.planoDescricao, { color: theme.colors.textSecondary }]}>{plano.descricao}</Text>
            <Text style={styles.planoPreco}>R$ {plano.preco.toFixed(2)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.agendarButton}
        onPress={() => navigation.navigate('Agendamentos')}
      >
        <Text style={styles.agendarButtonText}>Ver Agendamentos</Text>
      </TouchableOpacity>
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
    backgroundColor: '#3498db',
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
  fidelidadeCard: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fidelidadeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fidelidadeText: {
    fontSize: 14,
    marginBottom: 15,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  progress: {
    height: '100%',
    borderRadius: 4,
  },
  cortesRealizados: {
    fontSize: 12,
  },
  pontuacaoCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
  },
  pontuacaoNegativa: {
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  pontuacaoPositiva: {
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
  },
  pontuacaoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pontuacaoValor: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  pontuacaoDescricao: {
    fontSize: 12,
    marginTop: 5,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  servicoCard: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicoInfo: {
    flex: 1,
  },
  servicoNome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  servicoDescricao: {
    fontSize: 14,
    marginTop: 2,
  },
  servicoDuracao: {
    fontSize: 12,
    marginTop: 2,
  },
  servicoPreco: {
    fontSize: 18,
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
  agendarButton: {
    backgroundColor: '#27ae60',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  agendarButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
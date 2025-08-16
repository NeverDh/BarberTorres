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
import { getPlanos } from '../../data/memoryStore';
import { getStatusFidelidade } from '../../utils/fidelidade';

export default function HomeClienteScreen({ navigation }) {
  const { usuario, logout } = useAuth();
  const statusFidelidade = getStatusFidelidade(usuario.fidelidade);
  const planos = getPlanos();

  return (
    <ScrollView style={styles.container}>
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

      {/* Card de Fidelidade */}
      <View style={styles.fidelidadeCard}>
        <Text style={styles.fidelidadeTitle}>Programa de Fidelidade</Text>
        <Text style={styles.fidelidadeText}>{statusFidelidade.mensagem}</Text>
        <View style={styles.progressBar}>
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
        <Text style={styles.cortesRealizados}>
          Cortes realizados: {usuario.fidelidade}
        </Text>
      </View>

      {/* Pontuação */}
      {usuario.pontuacao !== 0 && (
        <View style={[
          styles.pontuacaoCard,
          usuario.pontuacao < 0 ? styles.pontuacaoNegativa : styles.pontuacaoPositiva
        ]}>
          <Text style={styles.pontuacaoTitle}>
            {usuario.pontuacao < 0 ? 'Penalidades' : 'Pontos'}
          </Text>
          <Text style={styles.pontuacaoValor}>
            {usuario.pontuacao > 0 ? '+' : ''}{usuario.pontuacao} pontos
          </Text>
          {usuario.pontuacao < 0 && (
            <Text style={styles.pontuacaoDescricao}>
              Será descontado no próximo pagamento
            </Text>
          )}
        </View>
      )}

      {/* Serviços */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nossos Serviços</Text>
        {servicos.map(servico => (
          <View key={servico.id} style={styles.servicoCard}>
            <View style={styles.servicoInfo}>
              <Text style={styles.servicoNome}>{servico.nome}</Text>
              <Text style={styles.servicoDescricao}>{servico.descricao}</Text>
              <Text style={styles.servicoDuracao}>{servico.duracao} minutos</Text>
            </View>
            <Text style={styles.servicoPreco}>R$ {servico.preco.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      {/* Planos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Planos Disponíveis</Text>
        {planos.map(plano => (
          <TouchableOpacity 
            key={plano.id} 
            style={styles.planoCard}
          >
            <Text style={styles.planoNome}>{plano.nome}</Text>
            <Text style={styles.planoDescricao}>{plano.descricao}</Text>
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
    backgroundColor: '#f8f9fa',
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
    backgroundColor: 'white',
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
    color: '#2c3e50',
    marginBottom: 10,
  },
  fidelidadeText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 4,
    marginBottom: 10,
  },
  progress: {
    height: '100%',
    borderRadius: 4,
  },
  cortesRealizados: {
    fontSize: 12,
    color: '#95a5a6',
  },
  pontuacaoCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
  },
  pontuacaoNegativa: {
    backgroundColor: '#ffebee',
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  pontuacaoPositiva: {
    backgroundColor: '#e8f5e8',
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
  },
  pontuacaoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  pontuacaoValor: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  pontuacaoDescricao: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  servicoCard: {
    backgroundColor: 'white',
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
  servicoPreco: {
    fontSize: 18,
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
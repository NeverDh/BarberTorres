import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

export default function CriarPlanoScreen({ navigation }) {
  const { usuario, logout } = useAuth();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [duracao, setDuracao] = useState('');
  const [servicos, setServicos] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState('mensal');

  const tiposPlano = [
    { id: 'mensal', nome: 'Mensal', duracao: 30 },
    { id: 'trimestral', nome: 'Trimestral', duracao: 90 },
    { id: 'semestral', nome: 'Semestral', duracao: 180 },
    { id: 'anual', nome: 'Anual', duracao: 365 }
  ];

  const preencherTemplate = (tipo) => {
    const templates = {
      mensal: {
        nome: 'Plano Mensal Premium',
        descricao: '3 cortes + 2 barbas por mês',
        preco: '80.00',
        servicos: '5'
      },
      trimestral: {
        nome: 'Plano Trimestral',
        descricao: '10 cortes + 6 barbas em 3 meses',
        preco: '200.00',
        servicos: '16'
      },
      semestral: {
        nome: 'Plano Semestral',
        descricao: '20 cortes + 12 barbas em 6 meses',
        preco: '350.00',
        servicos: '32'
      },
      anual: {
        nome: 'Plano Anual VIP',
        descricao: '40 cortes + 24 barbas por ano',
        preco: '600.00',
        servicos: '64'
      }
    };

    const template = templates[tipo];
    setNome(template.nome);
    setDescricao(template.descricao);
    setPreco(template.preco);
    setServicos(template.servicos);
    setDuracao(tiposPlano.find(t => t.id === tipo).duracao.toString());
  };

  const criarPlano = () => {
    if (!nome || !descricao || !preco || !duracao || !servicos) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const novoPlano = {
      nome,
      descricao,
      preco: parseFloat(preco),
      duracao: parseInt(duracao),
      servicos: parseInt(servicos),
      profissionalId: usuario.id
    };

    Alert.alert(
      'Plano Criado!',
      `${novoPlano.nome} foi criado com sucesso!\n\nPreço: R$ ${novoPlano.preco.toFixed(2)}\nServiços: ${novoPlano.servicos}\nDuração: ${novoPlano.duracao} dias`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Criar Novo Plano</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={24} color="#2c3e50" />
        </TouchableOpacity>
      </View>

      {/* Templates Rápidos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Templates Rápidos:</Text>
        <View style={styles.templatesContainer}>
          {tiposPlano.map(tipo => (
            <TouchableOpacity
              key={tipo.id}
              style={[
                styles.templateButton,
                tipoSelecionado === tipo.id && styles.templateButtonSelected
              ]}
              onPress={() => {
                setTipoSelecionado(tipo.id);
                preencherTemplate(tipo.id);
              }}
            >
              <Text style={[
                styles.templateButtonText,
                tipoSelecionado === tipo.id && styles.templateButtonTextSelected
              ]}>
                {tipo.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Formulário */}
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome do Plano *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Plano Mensal Premium"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descrição *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descreva o que está incluído no plano"
            value={descricao}
            onChangeText={setDescricao}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Preço (R$) *</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              value={preco}
              onChangeText={setPreco}
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Duração (dias) *</Text>
            <TextInput
              style={styles.input}
              placeholder="30"
              value={duracao}
              onChangeText={setDuracao}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Quantidade de Serviços *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 5"
            value={servicos}
            onChangeText={setServicos}
            keyboardType="numeric"
          />
          <Text style={styles.hint}>
            Número total de serviços incluídos no plano
          </Text>
        </View>

        {/* Preview do Plano */}
        {nome && preco && (
          <View style={styles.preview}>
            <Text style={styles.previewTitle}>Preview do Plano:</Text>
            <View style={styles.previewCard}>
              <Text style={styles.previewNome}>{nome}</Text>
              <Text style={styles.previewDescricao}>{descricao}</Text>
              <Text style={styles.previewPreco}>R$ {preco}</Text>
              <Text style={styles.previewDetalhes}>
                {servicos} serviços • {duracao} dias
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.createButton} onPress={criarPlano}>
          <Text style={styles.createButtonText}>Criar Plano</Text>
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
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  templatesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  templateButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  templateButtonSelected: {
    backgroundColor: '#e67e22',
    borderColor: '#e67e22',
  },
  templateButtonText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  templateButtonTextSelected: {
    color: 'white',
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 15,
  },
  halfWidth: {
    flex: 1,
  },
  hint: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
  preview: {
    marginTop: 20,
    marginBottom: 20,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  previewCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#e67e22',
  },
  previewNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  previewDescricao: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 2,
  },
  previewPreco: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e67e22',
    marginTop: 5,
  },
  previewDetalhes: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 5,
  },
  createButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
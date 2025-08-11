import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const result = await login(email, senha);
    
    if (!result.success) {
      Alert.alert('Erro', result.error);
    }
  };

  const preencherCredenciais = (tipo) => {
    if (tipo === 'cliente') {
      setEmail('joao@cliente.com');
      setSenha('123456');
    } else {
      setEmail('pedro@barbeiro.com');
      setSenha('123456');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Barber Torres</Text>
      <Text style={styles.subtitle}>Faça seu login</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>Contas de demonstração:</Text>
          
          <TouchableOpacity 
            style={styles.demoButton}
            onPress={() => preencherCredenciais('cliente')}
          >
            <Text style={styles.demoButtonText}>Login como Cliente</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.demoButton, styles.demoButtonProfissional]}
            onPress={() => preencherCredenciais('profissional')}
          >
            <Text style={styles.demoButtonText}>Login como Profissional</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: 40,
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  demoSection: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20,
  },
  demoTitle: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 15,
  },
  demoButton: {
    backgroundColor: '#95a5a6',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  demoButtonProfissional: {
    backgroundColor: '#e67e22',
  },
  demoButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
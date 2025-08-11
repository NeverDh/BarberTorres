import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  Modal,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { horariosDisponiveis } from '../../data/mockData';

export default function HorariosScreen() {
  const { usuario, logout } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState('2024-01-15');
  const [novoHorario, setNovoHorario] = useState('');

  const horariosData = horariosDisponiveis.filter(h => h.profissionalId === usuario.id);
  const horariosHoje = horariosData.find(h => h.data === selectedData);

  const adicionarHorario = () => {
    if (!novoHorario) {
      Alert.alert('Erro', 'Digite um horário válido');
      return;
    }

    Alert.alert(
      'Horário Adicionado!',
      `Horário ${novoHorario} adicionado para ${selectedData}`,
      [{ text: 'OK', onPress: () => {
        setModalVisible(false);
        setNovoHorario('');
      }}]
    );
  };

  const removerHorario = (horario) => {
    Alert.alert(
      'Remover Horário',
      `Deseja remover o horário ${horario}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', style: 'destructive', onPress: () => {
          Alert.alert('Sucesso', 'Horário removido com sucesso!');
        }}
      ]
    );
  };

  const proximasDatas = [
    '2024-01-15',
    '2024-01-16',
    '2024-01-17',
    '2024-01-18',
    '2024-01-19'
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gerenciar Horários</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={24} color="#2c3e50" />
        </TouchableOpacity>
      </View>

      {/* Seletor de Data */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Selecione a Data:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.datasContainer}>
            {proximasDatas.map(data => (
              <TouchableOpacity
                key={data}
                style={[
                  styles.dataButton,
                  selectedData === data && styles.dataButtonSelected
                ]}
                onPress={() => setSelectedData(data)}
              >
                <Text style={[
                  styles.dataButtonText,
                  selectedData === data && styles.dataButtonTextSelected
                ]}>
                  {data.split('-').reverse().join('/')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Horários Disponíveis */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Horários - {selectedData.split('-').reverse().join('/')}
          </Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Adicionar</Text>
          </TouchableOpacity>
        </View>

        {!horariosHoje || horariosHoje.horarios.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhum horário disponível</Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.emptyButtonText}>Adicionar Primeiro Horário</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.horariosGrid}>
            {horariosHoje.horarios.map(horario => (
              <TouchableOpacity
                key={horario}
                style={styles.horarioCard}
                onLongPress={() => removerHorario(horario)}
              >
                <Text style={styles.horarioText}>{horario}</Text>
                <Text style={styles.horarioStatus}>Disponível</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Instruções */}
      <View style={styles.instructionsCard}>
        <Text style={styles.instructionsTitle}>💡 Dicas:</Text>
        <Text style={styles.instructionsText}>
          • Toque em "Adicionar" para criar novos horários{'\n'}
          • Mantenha pressionado um horário para removê-lo{'\n'}
          • Os clientes verão apenas os horários disponíveis
        </Text>
      </View>

      {/* Modal para Adicionar Horário */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Horário</Text>
            
            <Text style={styles.modalLabel}>
              Data: {selectedData.split('-').reverse().join('/')}
            </Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="Ex: 14:30"
              value={novoHorario}
              onChangeText={setNovoHorario}
              keyboardType="numeric"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalButtonCancel}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonCancelText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalButtonConfirm}
                onPress={adicionarHorario}
              >
                <Text style={styles.modalButtonConfirmText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
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
  datasContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  dataButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dataButtonSelected: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  dataButtonText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  dataButtonTextSelected: {
    color: 'white',
  },
  emptyState: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  emptyButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  emptyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  horariosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  horarioCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  horarioText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  horarioStatus: {
    fontSize: 12,
    color: '#27ae60',
    marginTop: 5,
  },
  instructionsCard: {
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  modalButtonCancel: {
    flex: 1,
    backgroundColor: '#95a5a6',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  modalButtonCancelText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalButtonConfirm: {
    flex: 1,
    backgroundColor: '#27ae60',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  modalButtonConfirmText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
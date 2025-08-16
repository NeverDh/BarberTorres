import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { firestore } from '../config/firebase';

export const firestoreService = {
  // Agendamentos
  async criarAgendamento(agendamentoData) {
    try {
      const docRef = await addDoc(collection(firestore, 'agendamentos'), {
        ...agendamentoData,
        createdAt: serverTimestamp(),
        status: 'agendado'
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async buscarAgendamentos(userId, tipo) {
    try {
      const field = tipo === 'cliente' ? 'clienteId' : 'profissionalId';
      const q = query(
        collection(firestore, 'agendamentos'),
        where(field, '==', userId),
        orderBy('dataHora', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const agendamentos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return { success: true, data: agendamentos };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async atualizarAgendamento(id, updates) {
    try {
      await updateDoc(doc(firestore, 'agendamentos', id), {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Planos de Fidelidade
  async criarPlano(planoData) {
    try {
      const docRef = await addDoc(collection(firestore, 'planos'), {
        ...planoData,
        createdAt: serverTimestamp(),
        ativo: true
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async buscarPlanos(profissionalId) {
    try {
      const q = query(
        collection(firestore, 'planos'),
        where('profissionalId', '==', profissionalId),
        where('ativo', '==', true)
      );
      const querySnapshot = await getDocs(q);
      const planos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return { success: true, data: planos };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Horários
  async salvarHorarios(profissionalId, horarios) {
    try {
      await updateDoc(doc(firestore, 'users', profissionalId), {
        horarios,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Buscar profissionais
  async buscarProfissionais() {
    try {
      const q = query(
        collection(firestore, 'users'),
        where('tipo', '==', 'profissional')
      );
      const querySnapshot = await getDocs(q);
      const profissionais = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return { success: true, data: profissionais };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};
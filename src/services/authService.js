import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, firestore } from '../config/firebase';

export const authService = {
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userData = await this.getUserData(userCredential.user.uid);
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: this.getErrorMessage(error.code) };
    }
  },

  async register(email, password, userData) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const result = await this.createUserDocument(userCredential.user.uid, userData);
      console.log('Usuário registrado com sucesso:', result); 
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return { success: false, error: this.getErrorMessage(error.code) };
    }
  },

  async logout() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getUserData(uid) {
    const docRef = doc(firestore, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { uid, ...docSnap.data() } : null;
  },

  async createUserDocument(uid, userData) {
    const docRef = doc(firestore, 'users', uid);
    await setDoc(docRef, {
      ...userData,
      createdAt: serverTimestamp(),
    });
  },

  getErrorMessage(errorCode) {
    const messages = {
      'auth/user-not-found': 'Usuário não encontrado',
      'auth/wrong-password': 'Senha incorreta',
      'auth/email-already-in-use': 'Email já está em uso',
      'auth/weak-password': 'Senha muito fraca',
      'auth/invalid-email': 'Email inválido',
    };
    return messages[errorCode] || 'Erro desconhecido';
  }
};
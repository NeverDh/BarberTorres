import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD-VQJQHvWmeCx6eOuVfMB88UOOSBndiYw",
  authDomain: "naregua-3d41e.firebaseapp.com",
  projectId: "naregua-3d41e",
  storageBucket: "naregua-3d41e.firebasestorage.app",
  messagingSenderId: "624250634772",
  appId: "1:624250634772:android:1d26e93701426ab9d6dd01"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

async function testFirebase() {
  try {
    console.log('Testando conexão com Firebase...');
    
    // Teste de criação de usuário
    const email = 'teste@exemplo.com';
    const password = '123456';
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('Usuário criado com sucesso:', userCredential.user.uid);
    
    // Teste de criação de documento
    await setDoc(doc(firestore, 'users', userCredential.user.uid), {
      nome: 'Usuário Teste',
      email: email,
      telefone: '11999999999',
      tipo: 'cliente',
      createdAt: new Date()
    });
    
    console.log('Documento criado com sucesso no Firestore');
    
  } catch (error) {
    console.error('Erro:', error.code, error.message);
  }
}

testFirebase();
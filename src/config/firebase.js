import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD-VQJQHvWmeCx6eOuVfMB88UOOSBndiYw",
  authDomain: "naregua-3d41e.firebaseapp.com",
  projectId: "naregua-3d41e",
  storageBucket: "naregua-3d41e.firebasestorage.app",
  messagingSenderId: "624250634772",
  appId: "1:624250634772:android:1d26e93701426ab9d6dd01"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
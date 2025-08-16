const admin = require('firebase-admin');

// Inicializar Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Você precisa baixar este arquivo do Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Dados de exemplo para cada collection
const sampleData = {
  users: {
    uid: 'sample_user_123',
    name: 'João Silva',
    email: 'joao@email.com',
    type: 'professional',
    phone: '+5511999999999',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    loyalty: 0,
    points: 100,
    specialties: ['corte', 'barba'],
    schedule: {
      monday: { start: '09:00', end: '18:00', active: true },
      tuesday: { start: '09:00', end: '18:00', active: true },
      wednesday: { start: '09:00', end: '18:00', active: true },
      thursday: { start: '09:00', end: '18:00', active: true },
      friday: { start: '09:00', end: '18:00', active: true },
      saturday: { start: '09:00', end: '16:00', active: true },
      sunday: { start: '09:00', end: '16:00', active: false }
    }
  },
  
  services: {
    name: 'Corte Masculino',
    price: 25.00,
    duration: 30,
    description: 'Corte de cabelo masculino tradicional',
    professionalId: 'sample_user_123',
    active: true,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  },
  
  plans: {
    professionalId: 'sample_user_123',
    name: 'Plano Mensal',
    description: 'Plano com 4 cortes por mês',
    price: 80.00,
    serviceQuantity: 4,
    validityDays: 30,
    includedServices: ['corte'],
    active: true,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  }
};

async function setupCollections() {
  try {
    console.log('Iniciando configuração das collections...');
    
    // Criar collections com documentos de exemplo
    for (const [collectionName, data] of Object.entries(sampleData)) {
      await db.collection(collectionName).add(data);
      console.log(`✓ Collection '${collectionName}' criada com sucesso`);
    }
    
    // Criar collections vazias para as demais
    const emptyCollections = ['appointments', 'clientPlans', 'reviews', 'notifications'];
    
    for (const collectionName of emptyCollections) {
      // Criar um documento temporário e depois deletar para inicializar a collection
      const docRef = await db.collection(collectionName).add({ temp: true });
      await docRef.delete();
      console.log(`✓ Collection '${collectionName}' inicializada`);
    }
    
    console.log('\n🎉 Todas as collections foram configuradas com sucesso!');
    process.exit(0);
    
  } catch (error) {
    console.error('Erro ao configurar collections:', error);
    process.exit(1);
  }
}

setupCollections();
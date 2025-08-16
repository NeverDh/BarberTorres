# Setup Firestore Collections

## Pré-requisitos

1. **Baixar chave de serviço do Firebase:**
   - Acesse o [Firebase Console](https://console.firebase.google.com)
   - Vá em Project Settings > Service Accounts
   - Clique em "Generate new private key"
   - Salve o arquivo como `serviceAccountKey.json` nesta pasta

2. **Instalar Node.js** (se não tiver instalado)

## Como executar

1. Instalar dependências:
```bash
npm install
```

2. Executar o setup:
```bash
npm run setup
```

## O que o script faz

- Cria todas as collections definidas no firestore-collections.json
- Adiciona documentos de exemplo para `users`, `services` e `plans`
- Inicializa collections vazias para `appointments`, `clientPlans`, `reviews` e `notifications`

## Estrutura criada

✓ users - Perfis de usuários (clientes e profissionais)
✓ appointments - Agendamentos
✓ services - Serviços oferecidos
✓ plans - Planos de fidelidade
✓ clientPlans - Planos adquiridos por clientes
✓ reviews - Avaliações
✓ notifications - Notificações
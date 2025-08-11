# Barber Torres

App de barbearia desenvolvido com React Native e Expo 52, com suporte para web.

## 🚀 Funcionalidades

### Para Clientes:
- ✅ Login independente
- ✅ Sistema de fidelidade (6º corte com 50% desconto)
- ✅ Sistema de pontuação (penalidades por faltas)
- ✅ Visualização de serviços e preços
- ✅ Agendamento de horários
- ✅ Visualização de planos disponíveis

### Para Profissionais:
- ✅ Login independente
- ✅ Painel com estatísticas
- ✅ Gerenciamento de horários disponíveis
- ✅ Criação de planos personalizados (mensal, trimestral, etc.)
- ✅ Visualização de agendamentos

### Sistemas Implementados:
- 🎯 **Fidelidade**: A cada 5 cortes, o 6º é metade do preço
- ⚡ **Pontuação**: -50 pontos por falta, +10 por comparecimento
- 💰 **Planos**: Mensais, trimestrais, semestrais e anuais
- 📅 **Agendamentos**: Sistema completo de reservas

## 🛠️ Como executar

1. Instale as dependências:
```bash
npm install
```

2. Execute no modo web:
```bash
npm run web
```

3. Para mobile:
```bash
npm start
```

## 👥 Contas de Demonstração

### Cliente:
- **Email**: joao@cliente.com
- **Senha**: 123456
- **Fidelidade**: 3 cortes realizados
- **Pontuação**: -50 pontos (penalidade por falta)

### Profissional:
- **Email**: pedro@barbeiro.com
- **Senha**: 123456
- **Especialidades**: Corte masculino, Barba, Bigode

## 📱 Estrutura do App

```
src/
├── screens/
│   ├── cliente/          # Telas do cliente
│   └── profissional/     # Telas do profissional
├── context/              # Contexto de autenticação
├── data/                 # Dados mockados
└── utils/                # Utilitários (fidelidade, pontuação)
```

## 🔮 Próximos Passos

- [ ] Integração com Firebase
- [ ] Sistema de pagamento para planos
- [ ] Notificações push
- [ ] Chat entre cliente e profissional
- [ ] Sistema de avaliações
- [ ] Relatórios financeiros para profissionais

## 🎨 Design

O app utiliza uma paleta de cores diferenciada:
- **Cliente**: Azul (#3498db)
- **Profissional**: Laranja (#e67e22)
- **Sucesso**: Verde (#27ae60)
- **Erro**: Vermelho (#e74c3c)
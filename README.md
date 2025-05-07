# 📚 CCR Time Tracker - Sistema de Monitoramento Ferroviário 🚂

Este projeto foi desenvolvido no contexto da disciplina _Front-End Design Engineering_, pertencente ao curso de Tecnologia em Análise e Desenvolvimento de Sistemas da **FIAP** (Faculdade de Informática e Administração Paulista). O principal objetivo foi aplicar conceitos práticos de desenvolvimento front-end com Next.js para criar uma solução moderna para o Centro de Controle Operacional (CCO) da CCR (Companhia de concessão de infraestrutura para mobilidade).

---

&nbsp;

## 🧩 Sobre o Negócio

A CCO (Centro de Controle Operacional) é um importante órgão dentro do sistema ferroviário metropolitano de São Paulo. Esse centro tem como objetivo:

- Coordenar a operação diária do sistema ferroviário
- Gerenciar a infraestrutura ferroviária
- Supervisionar a segurança operacional
- Estabelecer parâmetros de desempenho e indicadores de qualidade

## 💡 Oportunidade Identificada

No Centro de Controle Operacional (CCO) da CCR, a operação diária do monitoramento do tempo médio de percurso (TMP) entre as estações ferroviárias é uma tarefa crucial, especialmente durante os horários de pico. Atualmente, esse cálculo é realizado de forma manual, o que pode levar a ineficiências e possíveis erros.

Nossa solução visa automatizar esse processo, permitindo:

- Monitoramento em tempo real do tempo médio de percurso
- Visualização de métricas importantes
- Alertas de situações críticas
- Interface amigável e responsiva

---

&nbsp;

## 🧩 Tecnologias Utilizadas

🌐 **FRONTEND**

- **NEXTJS** — Framework React para SSR e geração estática
  - TypeScript — Tipagem estática para JavaScript
  - React Hooks — Gerenciamento de estado e ciclo de vida
  - Tailwind CSS — Framework CSS utilitário
  - Next Image — Otimização de imagens
  - Fetch API — Comunicação com backend

🛠️ **Ferramentas de Desenvolvimento**

- **VS Code** — Ambiente de desenvolvimento
- **Git/GitHub** — Controle de versão e hospedagem do projeto

---

&nbsp;

## 📱 Funcionalidades Principais

- **Autenticação de usuários** — Sistema seguro de login
- **Dashboard de monitoramento** — Visualização de métricas importantes
- **Seleção de linhas e estações** — Filtragem de dados por linha e estação
- **Alertas em tempo real** — Notificações de problemas operacionais
- **Métricas de desempenho** — Dados sobre tempos médios de percurso

---

&nbsp;

## 🧪 Estrutura do Projeto

- `/src/app` — Páginas da aplicação
- `/src/components` — Componentes reutilizáveis
- `/src/types` — Interfaces TypeScript
- `/public` — Ativos estáticos

---

&nbsp;

## ⚠️ Importante

#### Credenciais de login

```
Email: rm559336@fiap.com.br
Senha: 12345678
```

#### Vídeo de demonstração

```
https://youtu.be/JUZi-lIVmG8
```

#### Projeto em produção

```
https://ccr-time-tracker-next.vercel.app
```

#### Repositório GitHub

```
https://github.com/FIAP-1TDSPS-2024/ccr-time-tracker-next
```

### Repositório com Deploy na Vercel

```
https://github.com/wendellnd/ccr-time-tracker-next
```

- Obs: Na conta Hobby da Vercel só podemos fazer deploy em repositórios na conta do usuário. Fizemos um fork do repositório na conta do @wendellnd para configurar o deploy.

---

&nbsp;

## 🚀 Inicializando o Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/FIAP-1TDSPS-2024/ccr-time-tracker-next.git
   cd ccr-time-tracker-next
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie o arquivo .env com a variável de ambiente:

   ```bash
    NEXT_PUBLIC_API_URL=https://damp-gorge-72949-b2a133597f1e.herokuapp.com
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Acesse [http://localhost:3000](http://localhost:3000) com seu navegador para ver o resultado.

---

## 🧑‍💻 Desenvolvedores

- Daniel Santana Corrêa Batista (RM: 559622)
- Jonas de Jesus Campos de Oliveira (RM: 561144)
- Wendell Nascimento Dourado (RM: 559336)

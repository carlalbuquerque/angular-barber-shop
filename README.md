# 📌 Projeto Frontend - Angular 19

## 🚀 Sobre o Projeto
Este é o frontend do sistema [Nome do Projeto], desenvolvido em Angular 19 para fornecer uma interface intuitiva e responsiva para os usuários.

## 🛠 Tecnologias Utilizadas
- **Angular 19**
- **TypeScript**
- **Angular Material** (ou outra biblioteca de UI, se aplicável)
- **RxJS**
- **PostgreSQL** (conectado via API backend)

## 📂 Estrutura do Projeto
```
📂 src/
 ┣ 📂 app/
 ┃ ┣ 📂 clients/        # Módulo de clientes
 ┃ ┃ ┣ 📂 components/   # Componentes relacionados aos clientes
 ┃ ┃ ┃ ┣ 📂 edit-clients/   # Componente para edição de clientes
 ┃ ┃ ┃ ┣ 📂 list-clients/   # Componente para listagem de clientes
 ┃ ┃ ┃ ┗ 📂 new-clients/    # Componente para adicionar novos clientes
 ┃ ┣ 📂 commons/        # Componentes reutilizáveis em todo o projeto
 ┃ ┃ ┣ 📂 components/
 ┃ ┃ ┃ ┣ 📂 card-header/    # Componente de cabeçalho de cartões
 ┃ ┃ ┃ ┣ 📂 menu-bar/       # Barra de menu global
 ┃ ┃ ┃ ┗ 📂 yes-no-question/ # Componente para perguntas de sim/não
 ┃ ┣ 📂 schedules/      # Módulo de agendamentos
 ┃ ┃ ┣ 📂 schedule-month/   # Componente para exibição mensal dos agendamentos
 ┃ ┃ ┣ 📂 components/       # Componentes específicos de agendamentos
 ┃ ┃ ┗ 📂 schedule-calendar/ # Calendário de agendamentos
 ┃ ┣ 📂 services/       # Serviços responsáveis por comunicação com APIs e lógica de negócio
 ┃ ┃ ┗ 📂 api-clients/  # Serviços de API para comunicação com backend
 ┃ ┃ ┃ ┣ 📂 schedule/   # Serviço de API para agendamentos
 ┃ ┃ ┃ ┗ 📂 clients/    # Serviço de API para clientes
 ┃ ┣ 📜 app.module.ts   # Módulo principal do Angular que declara os componentes e módulos utilizados
 ┃ ┣ 📜 app.component.ts # Componente raiz do Angular que serve como ponto de entrada da aplicação
 ┗ 📜 main.ts           # Arquivo de inicialização da aplicação Angular
 ┣ 📂 environments/     # Configuração de ambientes (desenvolvimento e produção)
```

## ⚙️ Como Rodar o Projeto
### Pré-requisitos
Antes de começar, certifique-se de ter instalado:
- Node.js (versão recomendada: 18+)
- Angular CLI (caso não tenha, instale com `npm install -g @angular/cli`)

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd nome-do-projeto
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   ng serve
   ```
5. Acesse no navegador: `http://localhost:4200`

## 📡 Conectando com a API
Certifique-se de que a API em **Spring Boot** está rodando para que o frontend possa consumir os dados corretamente. O endereço da API pode ser configurado no arquivo:
```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'  // Altere conforme necessário
};
```

## 🚀 Funcionalidades Principais
- [x] Autenticação de usuários
- [x] CRUD de [dados principais]
- [x] Integração com a API backend
- [x] Design responsivo e acessível


---
📝 **Licença:** Este projeto está sob a licença [MIT](LICENSE).




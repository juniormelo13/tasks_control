<p align="center">
  <img src="https://raw.githubusercontent.com/juniormelo13/tasks_control/main/src/assets/images/logo.png" alt="TasksControl Logo" height="60" />
</p>

<h1 align="center">TasksControl</h1>

<p align="center">Gerenciador de tarefas com agendamento e acompanhamento em tempo real.</p><br>

<p align="center">
    <img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white" height="30" alt="HTML5"/>
    <img src="https://img.shields.io/badge/CSS-663399.svg?style=for-the-badge&logo=CSS&logoColor=white" height="30" alt="CSS3"/>
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black" height="30" alt="JavaScript"/>
</p><br>

<p align="center">
  <img src="https://img.shields.io/github/actions/workflow/status/juniormelo13/tasks_control/deploy.yml?branch=main&style=for-the-badge" height="22" alt="Status do Build"/>
  <img src="https://img.shields.io/github/last-commit/juniormelo13/tasks_control?style=for-the-badge" height="22" alt="Último Commit"/>
  <a href="./LICENSE">
    <img src="https://img.shields.io/github/license/juniormelo13/tasks_control?style=for-the-badge" height="22" alt="Licença"/>
  </a>
</p>

## 📷 Demonstração

<p align="center">
  <a href="https://juniormelo13.github.io/tasks_control/">
    <strong>🚀 Clique aqui para acessar a aplicação 🚀</strong>
  </a>
</p>

<p align="center">
  <img src="URL_DO_GIF_DESKTOP" alt="Demonstração Desktop">
  <img src="URL_DO_GIF_MOBILE" alt="Demonstração Mobile" width="200">
</p>

## 📌 Descrição

TasksControl é uma aplicação web que proporciona uma **experiência fluida, intuitiva e responsiva**, permitindo ao usuário não apenas criar, editar e remover tarefas, mas também **gerenciar prazos, filtrar informações com precisão e personalizar a interface** conforme sua preferência.<br> Todas as tarefas e configurações são salvas automaticamente no **Local Storage**, garantindo a persistência dos dados mesmo após recarregar ou fechar a página. Tarefas expiradas são **destacadas visualmente**, alertando sobre prazos não cumpridos.

## 🔧 Funcionalidades

✅ Criar novas tarefas<br>
✅ Editar, concluir ou excluir tarefas individualmente<br>
✅ Agendar data e hora<br>
✅ Acompanhamento em tempo real do prazo restante<br>
✅ Sinalização automática de tarefas expiradas<br>
✅ Criar anotações personalizadas em cada tarefa<br>
✅ Remover todas as tarefas com um clique<br>
✅ Restaurar aplicação para o estado original (“padrão de fábrica”)<br>
✅ Adicionar nome e foto de perfil do usuário<br>
✅ Alternar entre tema claro e tema escuro<br>
✅ Filtrar tarefas por status (Pendentes, agendadas, expiradas e concluídas)<br>
✅ Filtrar tarefas pelo conteúdo, via campo de pesquisa<br>
✅ Interface 100% responsiva, adaptada para desktop e mobile<br>
✅ Armazenamento local de dados (Local Storage)

## 🛠️ Tecnologias e Ferramentas

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white" alt="HTML5" height="25"/>&nbsp;
  <img src="https://img.shields.io/badge/CSS-663399.svg?style=for-the-badge&logo=CSS&logoColor=white" alt="CSS3" height="25"/>&nbsp;
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black" alt="Javascript" height="25"/>&nbsp;
  <img src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black" alt="Webpack" height="25"/>&nbsp;
  <img src="https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=black" alt="Babel" height="25"/>&nbsp;
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm" height="25"/>&nbsp;
  <img src="https://img.shields.io/badge/Git-F05032.svg?style=for-the-badge&logo=Git&logoColor=white" alt="Git" height="25"/>&nbsp;
  <img src="https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=GitHub&logoColor=white" alt="Github" height="25"/>&nbsp;
  <img src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" alt="Visual Studio Code" height="25"/>
</p>

* **Linguagens Base:** HTML5, CSS3, JavaScript (ES6+ Modules)
* **Automação e Build:**
    * **Webpack 5:** Para bundling de módulos, otimização de assets e gerenciamento do build.
    * **Webpack Dev Server:** Para um ambiente de desenvolvimento rápido com Hot Module Replacement.
    * **Babel:** Para transpilação de código JavaScript moderno (ES6+), garantindo compatibilidade com navegadores mais antigos.
* **CI/CD (Integração e Deploy Contínuo):**
    * **GitHub Actions:** Para automação do processo de build e deploy no GitHub Pages.
* **Ferramentas de Desenvolvimento:**
    * **npm:** Para gerenciamento de pacotes e execução de scripts.
    * **Git & GitHub:** Para controle de versão e hospedagem do código.
    * **Visual Studio Code:** Como editor de código principal.

## ⚙️ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
* [Git](https://git-scm.com)
* [Node.js](https://nodejs.org/en/)
* Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

## 🚀 Rodando o Projeto Localmente

Siga os passos abaixo para rodar o projeto em seu ambiente de desenvolvimento:

```bash
# 1. Clone este repositório.
$ git clone https://github.com/juniormelo13/tasks_control.git

# 2. Acesse a pasta do projeto no terminal/cmd.
$ cd tasks_control

# 3. Instale as dependências.
$ npm install

# 4. Inicie o servidor de desenvolvimento (http://localhost:3000).
$ npm start

# Para gerar a versão de produção otimizada (pasta /dist).
$ npm run build
```

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.<br><br>
Saiba mais:

<a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue"/>
  </a>

## 👤 Autor

Desenvolvido por **Junior Melo.** <br><br>
Dúvidas, sugestões ou bugs? Entre em contato:

<a href="https://www.linkedin.com/in/juniormelo13/">
  <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" height="25"/>
</a>&nbsp;
<a href="https://www.instagram.com/jr.dev.oficial/">
  <img src="https://img.shields.io/badge/Instagram-FF0069.svg?style=for-the-badge&logo=Instagram&logoColor=white" height="25"/>
</a>&nbsp;
<a href="mailto:jr.dev.oficial@gmail.com">
  <img src="https://img.shields.io/badge/Gmail-EA4335.svg?style=for-the-badge&logo=Gmail&logoColor=white" height="25"/>
</a>

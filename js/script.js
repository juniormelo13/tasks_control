import initNewTaskInput from "./modules/new-task-input.js" // Importação da função principal do input de inserção de novas tarefas.
import initDropdownMenu from "./modules/dropdown-menu.js" // Importação da função principal do menu.
import initProfilePhoto from "./modules/profile-photo.js" // Importação da função principal da foto de perfil do usuário.
import initUsername from "./modules/username.js" // Importação da função principal do nome do usuário.
import initFilterTaskByInputSearch from "./modules/filter-task-by-input-search.js" // Importação da função principal do input de buscas de tarefas.
import initFilterTaskByStatus from "./modules/filter-task-by-status.js" // Importação da função principal dos botões de filtros das tarefas por status.
import initFilterInformation from "./modules/filter-information.js" // Importação da função principal do campo de informações dos filtros atuais.
import initChangeTheme from "./modules/change-theme.js" // Importação da função principal do tema da aplicação (Claro ou escuro).
import initRemoveAllTasks from "./modules/remove-all-tasks.js" // Importação da função principal do botão de remover todas as tarefas.
import initRemoveAllConfig from "./modules/remove-all-config.js" // Importação da função principal do botão de reiniciar toda a aplicação para configuração de fábrica.
import initAppRecover from "./modules/app-recover.js" // Importação da função principal para a recuperação das configurações e tarefas salvas no local storage.
import initRealTimeSchedulingStatus from "./modules/real-time-scheduling-status.js" // Importação da função principal para acompanhamento em tempo real das tarefas agendadas.

initNewTaskInput() // Iniciar o funcionamento do input de inserção de novas tarefas.
initDropdownMenu() // Iniciar o funcionamento do menu.
initProfilePhoto() // Iniciar o funcionamento da foto de perfil do usuário.
initUsername() // Iniciar o funcionamento do nome do usuário.
initFilterTaskByInputSearch() // Iniciar o funcionamento do input de buscas de tarefas.
initFilterTaskByStatus() // Iniciar o funcionamento dos botões de filtros das tarefas por status.
initFilterInformation() // Iniciar o funcionamento do campo de informações dos filtros atuais.
initChangeTheme() // Iniciar o funcionamento do tema da aplicação (Claro ou escuro).
initRemoveAllTasks() // Iniciar o funcionamento do botão de remover todas as tarefas.
initRemoveAllConfig() // Iniciar o funcionamento do botão de reiniciar toda a aplicação para configuração de fábrica.
initAppRecover() // Iniciar a recuperação das configurações e tarefas salvas no local storage.
initRealTimeSchedulingStatus() // Iniciar a função de acompanhamento em tempo real das tarefas agendadas.
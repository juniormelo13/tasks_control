// Funções e variáveis responsáveis pelo funcionamento do filtro de tarefas através dos status de cada tarefa.

// Importações.
import { tasksContainer } from "./new-task-input.js";
import { dbAllTasks } from "./save-actions-to-localstorage.js";
import { filterInformation, addFilter, removeFilter, checkTasksOnScreen } from "./filter-information.js";
import { cleanInputFilter } from "./filter-task-by-input-search.js";

const btnFilters = document.querySelectorAll("[data-btnFilter]") // Variável para guardar todos os botões para filtros.
export const allTasksFilterBtn = document.querySelector('[data-btnFilter="allTasksFilterBtn"]'); // Botão para mostrar todas as tarefas.
export const pendingTasksFilterBtn = document.querySelector('[data-btnFilter="pendingTasksFilterBtn"]'); // Botão para mostrar todas as tarefas pendentes.
export const scheduledTasksFilterBtn = document.querySelector('[data-btnFilter="scheduledTasksFilterBtn"]'); // Botão para mostrar todas as tarefas agendadas.
export const expiredTasksFilterBtn = document.querySelector('[data-btnFilter="expiredTasksFilterBtn"]'); // Botão para mostrar todas as tarefas expiradas.
export const completedTasksFilterBtn = document.querySelector('[data-btnFilter="completedTasksFilterBtn"]'); // Botão para mostrar todas as tarefas concluídas.
const amountAllTasks = document.querySelector("#amountAllTasks"); // Campo para informar a quantidade de tarefas criadas.
const amountPendingTasks = document.querySelector("#amountPendingTasks"); // Campo para informar a quantidade de tarefas pendentes.
const amountScheduledTasks = document.querySelector("#amountScheduledTasks"); // Campo para informar a quantidade de tarefas agendadas.
const amountExpiredTasks = document.querySelector("#amountExpiredTasks"); // Campo para informar a quantidade de tarefas expiradas.
const amountCompletedTasks = document.querySelector("#amountCompletedTasks"); // Campo para informar a quantidade de tarefas concluídas.

// Função responsável por calcular a quantidade de tarefas para cada status.
export function calculateNumberOfTasks() {
  const pendingTasks = dbAllTasks.filter((infoTaskSave) => !infoTaskSave.completedTask);
  const scheduledTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.scheduledTask);
  const expiredTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.expiredTask);
  const completedTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.completedTask);
  amountAllTasks.innerText = dbAllTasks.length;
  amountPendingTasks.innerText = pendingTasks.length;
  amountScheduledTasks.innerText = scheduledTasks.length;
  amountExpiredTasks.innerText = expiredTasks.length;
  amountCompletedTasks.innerText = completedTasks.length;
}

// Função responsável por filtrar as tarefas de acordo com seu status.
export function filterTaskByClass(taskClass) {
  for (let i = 0; i < dbAllTasks.length; i++) {
    const infoTaskSave = dbAllTasks[i];
    const taskField = tasksContainer.childNodes[i];
    if (taskClass == "pendingTask") {
      if (infoTaskSave.completedTask) {
        if (!taskField.classList.contains("hide")) {
          taskField.classList.add("hide");
        }
      } else {
        if (taskField.classList.contains("hide")) {
          taskField.classList.remove("hide");
        }
      }
    } else if (taskClass == "allTask") {
      if (taskField.classList.contains("hide")) {
        taskField.classList.remove("hide");
      }
    } else {
      if (!infoTaskSave.hasOwnProperty(taskClass)) {
        if (!taskField.classList.contains("hide")) {
          taskField.classList.add("hide");
        }
      } else {
        if (taskField.classList.contains("hide")) {
          taskField.classList.remove("hide");
        }
      }
    }
  }
  if (taskClass == "pendingTask") {
    filterInformation.innerText = "Pendentes";
    checkTasksOnScreen("pendingTasks");
  } else if (taskClass == "scheduledTask") {
    filterInformation.innerText = "Agendadas";
    checkTasksOnScreen("scheduledTasks");
  } else if (taskClass == "expiredTask") {
    filterInformation.innerText = "Expiradas";
    checkTasksOnScreen("expiredTasks");
  } else if (taskClass == "completedTask") {
    filterInformation.innerText = "Concluídas";
    checkTasksOnScreen("completedTasks");
  } else {
    checkTasksOnScreen("allTasks");
  }
}

// Função responsável por ativar o botão de filtro (adicionar a class "active") assim que for clicado.
export function activateFilterBtn(btnFilter) {
  btnFilters.forEach((btnFilter) => {
    if (btnFilter.classList.contains("active")) {
      btnFilter.classList.remove("active");
    }
  })
  btnFilter.classList.add("active");
}

// Função responsável por checar qual botão está ativo e atualizar a filtragem quando a tarefa mudar de status em tempo real.
export function checkActivatedClassBtnAndFilter() {
  if (scheduledTasksFilterBtn.classList.contains("active")) {
    filterTaskByClass("scheduledTask");
  } else if (pendingTasksFilterBtn.classList.contains("active")) {
    filterTaskByClass("pendingTask");
  } else if (expiredTasksFilterBtn.classList.contains("active")) {
    filterTaskByClass("expiredTask");
  } else if (completedTasksFilterBtn.classList.contains("active")) {
    filterTaskByClass("completedTask");
  }
}

// Função principal para funcionamento do sistema de filtros através dos status das tarefas.
export default function initFilterTaskByStatus() {

  // Torna ativo o botão que exibe todas as tarefas, logo ao iniciar a aplicação.
  allTasksFilterBtn.classList.add("active");

  // Adicionado o evento de clique em cada botão, com o objetivo de filtrar as tarefas de acordo com seus respectivos status.
  // Mostra todas as tarefas.
  allTasksFilterBtn.addEventListener("click", () => {
    cleanInputFilter();
    removeFilter();
    activateFilterBtn(allTasksFilterBtn);
    filterTaskByClass("allTask");
  });

  // Mostra apenas as tarefas pendentes.
  pendingTasksFilterBtn.addEventListener("click", () => {
    cleanInputFilter();
    addFilter();
    activateFilterBtn(pendingTasksFilterBtn);
    filterTaskByClass("pendingTask");
  });

  // Mostra apenas as tarefas agendadas.
  scheduledTasksFilterBtn.addEventListener("click", () => {
    cleanInputFilter();
    addFilter();
    activateFilterBtn(scheduledTasksFilterBtn);
    filterTaskByClass("scheduledTask");
  });

  // Mostra apenas as tarefas expiradas.
  expiredTasksFilterBtn.addEventListener("click", () => {
    cleanInputFilter();
    addFilter();
    activateFilterBtn(expiredTasksFilterBtn);
    filterTaskByClass("expiredTask");
  });

  // Mostra apenas as tarefas completas.
  completedTasksFilterBtn.addEventListener("click", () => {
    cleanInputFilter();
    addFilter();
    activateFilterBtn(completedTasksFilterBtn);
    filterTaskByClass("completedTask");
  });
  
}

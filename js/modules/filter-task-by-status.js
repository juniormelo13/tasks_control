import { tasksContainer } from "./new-task-input.js";
import { dbAllTasks } from "./save-actions-to-localstorage.js";
import { filterInformation, addFilter, removeFilter, checkTasksOnScreen } from "./filter-information.js";
import { cleanInputFilter } from "./filter-task-by-input-search.js";

const btnFilters = document.querySelectorAll("[data-btnFilter]") // Variável para guardar todos os botões para filtros.
export const allTasksFilterBtn = document.querySelector('[data-btnFilter="allTasksFilterBtn"]');
export const pendingTasksFilterBtn = document.querySelector('[data-btnFilter="pendingTasksFilterBtn"]');
export const scheduledTasksFilterBtn = document.querySelector('[data-btnFilter="scheduledTasksFilterBtn"]');
export const expiredTasksFilterBtn = document.querySelector('[data-btnFilter="expiredTasksFilterBtn"]');
export const completedTasksFilterBtn = document.querySelector('[data-btnFilter="completedTasksFilterBtn"]');
const amountAllTasks = document.querySelector("#amountAllTasks"); // Campo para informar a quantidade de tarefas criadas.
const amountPendingTasks = document.querySelector("#amountPendingTasks"); // Campo para informar a quantidade de tarefas pendentes.
const amountScheduledTasks = document.querySelector("#amountScheduledTasks"); // Campo para informar a quantidade de tarefas agendadas.
const amountExpiredTasks = document.querySelector("#amountExpiredTasks"); // Campo para informar a quantidade de tarefas expiradas.
const amountCompletedTasks = document.querySelector("#amountCompletedTasks"); // Campo para informar a quantidade de tarefas concluídas.

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

export function activateFilterBtn(btnFilter) {
  btnFilters.forEach((btnFilter) => {
    if (btnFilter.classList.contains("active")) {
      btnFilter.classList.remove("active");
    }
  })
  btnFilter.classList.add("active");
}

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

export default function initFilterTaskByStatus() {
  // Torna ativo o botão que exibe todas as tarefas, logo ao iniciar a aplicação.
  allTasksFilterBtn.classList.add("active");
  // Adiciona o evento de clique em cada botão, com o objetivo de filtrar as tarefas de acordo com seus respectivos status.
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

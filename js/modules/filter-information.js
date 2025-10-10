// Funções e variáveis auxiliares para o funcionamento do sistema de filtros de tarefas da aplicação.

// Importações.
import { cleanInputFilter } from "./filter-task-by-input-search.js";
import { allTasksFilterBtn, activateFilterBtn, filterTaskByClass } from "./filter-task-by-status.js";
import { dbAllTasks } from "./save-actions-to-localstorage.js";

export const filterInformationBox = document.querySelector("#filterInformationBox"); // Campo responsável por mostrar informações dos filtros atuais.
export const filterInformation = document.querySelector("#filterInformation"); // Texto que informa ao usuário o filtro atual.
const cleanFilterBtn = document.querySelector("#cleanFilterBtn"); // Botão do campo que mostra o filtro atual, responsável por limpar todos os filtros.
export const noTaskTextContainer = document.querySelector("#noTaskTextContainer"); // Texto que informa o usuário que não há tarefas na tela.
export let filtred = false; // Variável para guardar o status do filtro atual (A aplicação inicia com o filtro desativado).

// Função para esconder o texto que informa quando não há tarefas na tela.
export function noTaskTextVanish() {
  if (!noTaskTextContainer.classList.contains("hide")) {
    noTaskTextContainer.classList.add("hide");
  }
}

// Função para mostrar o texto que informa quando não há tarefas na tela.
export function noTaskTextAppear() {
  if (noTaskTextContainer.classList.contains("hide")) {
    noTaskTextContainer.classList.remove("hide");
  }
}

// Função responsável por checar a quantidade de tarefas na tela e mostrar/ocultar o texto que informa quando não há tarefas na tela.
export function checkTasksOnScreen(taskClass) {
  if (taskClass == "pendingtasks") {
    const pendingTasks = dbAllTasks.filter((infoTaskSave) => !infoTaskSave.completedTask);
    pendingTasks.length ? noTaskTextVanish() : noTaskTextAppear()
  } else if (taskClass == "scheduledTasks") {
    const scheduledTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.scheduledTask);
    scheduledTasks.length > 0 ? noTaskTextVanish() : noTaskTextAppear()
  } else if (taskClass == "expiredTasks") {
    const expiredTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.expiredTask);
    expiredTasks.length > 0 ? noTaskTextVanish() : noTaskTextAppear()
  } else if (taskClass == "completedTasks") {
    const completedTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.completedTask);
    completedTasks.length > 0 ? noTaskTextVanish() : noTaskTextAppear()
  } else {
    dbAllTasks.length > 0 ? noTaskTextVanish() : noTaskTextAppear()
  }
}

// Funçao responsável por adicionar o filtro e habilitar o campo de informações dos filtros atuais.
export function addFilter() {
  filterInformationBox.classList.remove("filterInfoVanish");
  filterInformationBox.classList.add("filterInfoAppear");
  filtred = true;
}

// Funçao responsável por remover o filtro e desabilitar o campo de informações dos filtros atuais.
export function removeFilter() {
  filterInformationBox.classList.remove("filterInfoAppear");
  filterInformationBox.classList.add("filterInfoVanish");
  filtred = false;
}

// Função principal para habilitar o funcionamento do campo de informações dos filtros.
export default function initFilterInformation() {
  
  noTaskTextAppear() // Mostra o texto que informa quando não há tarefas na tela logo ao iniciar a aplicação, caso não tenha tarefas no local storage.

  // Função responsável por remover o filtro logo após o clique do usuário no botão de remover filtros.
  cleanFilterBtn.addEventListener("click", () => {
    cleanInputFilter();
    removeFilter();
    activateFilterBtn(allTasksFilterBtn);
    filterTaskByClass("allTask");
  });

}

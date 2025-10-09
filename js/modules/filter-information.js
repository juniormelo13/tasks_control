import { cleanInputFilter } from "./filter-task-by-input-search.js";
import { allTasksFilterBtn, activateFilterBtn, filterTaskByClass } from "./filter-task-by-status.js";
import { dbAllTasks } from "./save-actions-to-localstorage.js";

export const filterInformationBox = document.querySelector("#filterInformationBox"); // Campo responsável por mostrar informações dos filtros atuais.
export const filterInformation = document.querySelector("#filterInformation"); // Texto que informa ao usuário o filtro atual.
const cleanFilterBtn = document.querySelector("#cleanFilterBtn"); // Botão do campo que mostra o filtro atual, responsável por limpar todos os filtros.
export const noTaskTextContainer = document.querySelector("#noTaskTextContainer"); // Texto que informa o usuário que não há tarefas na tela.
export let filtred = false; // Variável para guardar o status do filtro atual (A aplicação inicia com o filtro desativado).

export function noTaskTextVanish() {
  if (!noTaskTextContainer.classList.contains("hide")) {
    noTaskTextContainer.classList.add("hide");
  }
}

export function noTaskTextAppear() {
  if (noTaskTextContainer.classList.contains("hide")) {
    noTaskTextContainer.classList.remove("hide");
  }
}

noTaskTextAppear()

export function checkTasksOnScreen(taskClass) {
  if (taskClass == "pendingtasks") {
    const pendingTasks = dbAllTasks.filter((infoTaskSave) => !infoTaskSave.completedTask);
    if (pendingTasks.length > 0) {
      noTaskTextVanish()
    } else {
      noTaskTextAppear()
    }
  } else if (taskClass == "scheduledTasks") {
    const scheduledTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.scheduledTask);
    if (scheduledTasks.length > 0) {
      noTaskTextVanish()
    } else {
      noTaskTextAppear()
    }
  } else if (taskClass == "expiredTasks") {
    const expiredTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.expiredTask);
    if (expiredTasks.length > 0) {
      noTaskTextVanish()
    } else {
      noTaskTextAppear()
    }
  } else if (taskClass == "completedTasks") {
    const completedTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.completedTask);
    if (completedTasks.length > 0) {
      noTaskTextVanish()
    } else {
      noTaskTextAppear()
    }
  } else {
    if (dbAllTasks.length > 0) {
      noTaskTextVanish()
    } else {
      noTaskTextAppear()
    }
  }
}

export function addFilter() {
  filterInformationBox.classList.remove("filterInfoVanish");
  filterInformationBox.classList.add("filterInfoAppear");
  filtred = true;
}

export function removeFilter() {
  filterInformationBox.classList.remove("filterInfoAppear");
  filterInformationBox.classList.add("filterInfoVanish");
  filtred = false;
}

export default function initFilterInformation() {
  cleanFilterBtn.addEventListener("click", () => {
    cleanInputFilter();
    removeFilter();
    activateFilterBtn(allTasksFilterBtn);
    filterTaskByClass("allTask");
  });
}

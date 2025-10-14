// Funções e variáveis responsáveis pelo funcionamento do filtro de tarefas através do campo de buscas.

// Importações.
import { filterInformation, noTaskTextAppear, noTaskTextVanish, addFilter, removeFilter, filtred } from "./filter-information.js";
import { activateFilterBtn, allTasksFilterBtn, filterTaskByClass } from "./filter-task-by-status.js";
import { tasksContainer } from "./new-task-input.js";
import { clearEmptyInput, checkInputValue } from "./auxiliary-func-for-inputs.js";
import { dbAllTasks } from "./save-actions-to-localstorage.js";

export const searchTaskInput = document.querySelector("#searchTaskInput"); // Campo de busca.
export const cleanInputSearchBtn = document.querySelector("#cleanInputSearchBtn"); // Botão de limpar texto do campo de busca e remover filtro.

// Função para limpar texto do campo de buscas e esconder botão de limpar texto.
export function cleanInputFilter() {
  searchTaskInput.value = "";
  cleanInputSearchBtn.classList.add("hide");
}

// Função responsável por realizar a filtragem das tarefas.
export function filterTaskByInput() {
  let containsHide = [];
  for (let i = 0; i < dbAllTasks.length; i++) {
    const infoTaskSave = dbAllTasks[i];
    const taskField = tasksContainer.childNodes[i];
    if (!infoTaskSave.taskContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchTaskInput.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
      containsHide.push("true");
      if (!taskField.classList.contains("hide")) {
        taskField.classList.add("hide");
      }
    } else {
      containsHide.push("false");
      if (taskField.classList.contains("hide")) {
        taskField.classList.remove("hide");
      }
    }
  }
  if (!containsHide.includes("false")) {
    noTaskTextAppear()
  } else {
    noTaskTextVanish()
  }
}


// Função principal para funcionamento do sistema de filtros através do campo de buscas.
export default function initFilterTaskByInputSearch() {

  // Filtragem de tarefas através do campo de buscas.
  searchTaskInput.onkeyup = () => {
    if (checkInputValue(searchTaskInput, cleanInputSearchBtn)) {
      if (searchTaskInput.value.length >= 1) {
        filterInformation.innerText = searchTaskInput.value.trim();
      }
      if (!allTasksFilterBtn.classList.contains("active")) {
        activateFilterBtn(allTasksFilterBtn);
        filterTaskByClass("allTask");
      }
      addFilter();
      filterTaskByInput();
    } else {
      if (filtred) {
        removeFilter();
        filterTaskByClass("allTask");
      }
    }
  };

  // Função responsável por limpar input caso o usuário clique várias vezes na barra de espaço.
  searchTaskInput.onblur = () => {
    clearEmptyInput(searchTaskInput);
  };

  // Função responsável por remover texto e limpar filtro logo após o clique do usuário no botão.
  cleanInputSearchBtn.addEventListener("click", () => {
    searchTaskInput.focus();
    cleanInputFilter();
    removeFilter();
    activateFilterBtn(allTasksFilterBtn);
    filterTaskByClass("allTask");
  });

}

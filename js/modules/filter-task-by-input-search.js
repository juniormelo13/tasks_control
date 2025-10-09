import { filterInformation, noTaskTextAppear, noTaskTextVanish, addFilter, removeFilter, filtred } from "./filter-information.js";
import { activateFilterBtn, allTasksFilterBtn, filterTaskByClass } from "./filter-task-by-status.js";
import { tasksContainer } from "./new-task-input.js";
import { clearEmptyInput, checkInputValue } from "./auxiliary-func-for-inputs.js";
import { dbAllTasks } from "./save-actions-to-localstorage.js";

export const searchTaskInput = document.querySelector("#searchTaskInput");
export const cleanInputSearchBtn = document.querySelector("#cleanInputSearchBtn");

export function cleanInputFilter() {
  searchTaskInput.value = "";
  cleanInputSearchBtn.classList.add("hide");
}

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

export default function initFilterTaskByInputSearch() {

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

  searchTaskInput.onblur = () => {
    clearEmptyInput(searchTaskInput);
  };

  cleanInputSearchBtn.addEventListener("click", () => {
    searchTaskInput.focus();
    cleanInputFilter();
    removeFilter();
    activateFilterBtn(allTasksFilterBtn);
    filterTaskByClass("allTask");
  });

}

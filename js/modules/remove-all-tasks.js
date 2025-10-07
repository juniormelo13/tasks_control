import { dbAllTasks } from "./task-recover.js";
import { enableBtn, disableBtn } from "./auxiliary-func-for-btn.js";
import { tasksContainer } from "./new-task-input.js";
import { filtred, filterInformationBox, removeFilter, activateFilterBtn, cleanInputFilter, calculateNumberOfTasks, checkTasksOnScreen  } from "./auxiliary-func-for-filters.js";
import { menu } from "./dropdown-menu.js";
import { hideWindow, showConfirmField, confirmationWindow } from "./auxiliary-func-for-window.js";

// Botão para exclusão de todas as tarefas
const removeAllTaskBtn = document.querySelector("#removeAllTaskBtn");

export function checkRemoveAllTaskBtn() {
  if (dbAllTasks.length > 0) {
    if (removeAllTaskBtn.disabled) {
      enableBtn(removeAllTaskBtn);
    }
  } else {
    if (!removeAllTaskBtn.disabled) {
      disableBtn(removeAllTaskBtn);
    }
  }
}

export function removeAllTasks() {
  const taskFields = tasksContainer.childNodes;
  for (const taskField of taskFields) {
    taskField.classList.add("vanishTask");
  }
  dbAllTasks.splice(0, dbAllTasks.length);
  localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
  localStorage.removeItem("tasks");
  disableBtn(removeAllTaskBtn);
  setTimeout(() => {
    tasksContainer.innerHTML = "";
    if (filtred) {
      filterInformationBox.classList.remove("filterInformationOffBlur");
      removeFilter();
      cleanInputFilter();
      activateFilterBtn(allTasksFilterBtn);
    }
    calculateNumberOfTasks();
    checkTasksOnScreen(dbAllTasks);
  }, 200);
}

function confirmRemoveAllTasks() {
  hideWindow(confirmationWindow);
  setTimeout(() => {
    removeAllTasks();
    checkRemoveAllConfigBtn();
  }, 200);
}

export default function initRemoveAllTasks() {

  removeAllTaskBtn.addEventListener("click", () => {
    showConfirmField("Todas as tarefas serão excluídas. Deseja prosseguir?", confirmRemoveAllTasks);
    menu.classList.add("menuBlur");
  });

}
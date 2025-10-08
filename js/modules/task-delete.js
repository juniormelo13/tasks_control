// Configuração do botão de exclusão da tarefa
import { showConfirmField, confirmationWindow, hideWindow } from "./auxiliary-func-for-window.js";
import { transitionClickProtection } from "./auxiliary-func-for-handling-tasks.js";
import { saveDeleteTaskAction } from "./save-actions-to-localstorage.js";
import { calculateNumberOfTasks, checkTasksOnScreen, checkActivatedClassBtnAndFilter, filtred, dbAllTasks } from "./auxiliary-func-for-filters.js";
import { allTasksFilterBtn } from "./filter-task-by-status.js";
import { checkRemoveAllConfigBtn } from "./remove-all-config.js";
import { checkRemoveAllTaskBtn } from "./remove-all-tasks.js";
import { filterTaskByInput, searchTaskInput } from "./filter-task-by-input-search.js";

export const deleteClick = (taskField, taskFront, infoTaskSave) => {
  if (taskFront.classList.contains("scheduled") || infoTaskSave.savedNote) {
    if (taskFront.classList.contains("scheduled") && infoTaskSave.savedNote) {
      showConfirmField("Esta tarefa possui agendamento e anotações. Tem certeza de que deseja removê-la?", confirmDeleteAction);
    } else if (taskFront.classList.contains("scheduled")) {
      showConfirmField("Esta tarefa está agendada. Tem certeza de que deseja removê-la?", confirmDeleteAction);
    } else {
      showConfirmField("Esta tarefa possui anotações. Tem certeza de que deseja removê-la?", confirmDeleteAction);
    }
    function confirmDeleteAction() {
      hideWindow(confirmationWindow);
      setTimeout(() => {
        deleteTask(taskField, infoTaskSave);
      }, 200);
    }
  } else {
    deleteTask(taskField, infoTaskSave);
  }
};

function deleteTask(taskField, infoTaskSave) {
  taskField.classList.add("vanishTask");
  transitionClickProtection("add");
  saveDeleteTaskAction(infoTaskSave);
  setTimeout(() => {
    taskField.remove();
    calculateNumberOfTasks();
    if (allTasksFilterBtn.classList.contains("active")) {
      checkTasksOnScreen(dbAllTasks);
    } else {
      checkActivatedClassBtnAndFilter();
    }
    setTimeout(() => {
      transitionClickProtection("remove");
    }, 150);
    checkRemoveAllTaskBtn();
    checkRemoveAllConfigBtn();
    if (filtred && searchTaskInput.value != "") {
      filterTaskByInput();
    }
  }, 350);
}
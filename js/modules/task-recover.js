import { dbAllTasks } from "./save-actions-to-localstorage.js";
import { checkRemoveAllTaskBtn } from "./remove-all-tasks.js";
import { checkRemoveAllConfigBtn } from "./remove-all-config.js";
import { calculateNumberOfTasks } from "./filter-task-by-status.js";
import { checkTasksOnScreen } from "./filter-information.js";
import { tasksContainer } from "./new-task-input.js";
import { taskConstructor } from "./task-create.js";

// Função responsável por recuperar as tarefas do banco de dados
export function taskRecover() {
  const dbAllTasksRecover = JSON.parse(localStorage.getItem("tasks"));
  dbAllTasks.length = 0
  dbAllTasks.push(...dbAllTasksRecover)
  checkRemoveAllTaskBtn();
  checkRemoveAllConfigBtn();
  calculateNumberOfTasks();
  checkTasksOnScreen("allTasks");
  tasksContainer.innerHTML = "";
  for (let i = 0; i < dbAllTasks.length; i++) {
    // Recuperação dos dados de cada tarefa no array e renderização em tela
    const infoTaskSave = dbAllTasks[i];
    const taskField = document.createElement("div");
    const task = document.createElement("div");
    const taskFront = document.createElement("div");
    taskConstructor(taskField, task, taskFront, infoTaskSave);
    tasksContainer.appendChild(taskField);
  }
}
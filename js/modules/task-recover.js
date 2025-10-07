import { checkRemoveAllTaskBtn } from "./remove-all-tasks.js";
import { checkRemoveAllConfigBtn } from "./remove-all-config.js";
import { calculateNumberOfTasks, checkTasksOnScreen } from "./auxiliary-func-for-filters.js";
import { tasksContainer } from "./new-task-input.js";
import { taskConstructor } from "./task-create.js";

export let dbAllTasks = new Array; // Variável para guardar tarefas no banco de dados (Local Storage)

// Função responsável por recuperar as tarefas e outras informações do banco de dados
export default function taskRecover() {
  if (localStorage.getItem("tasks")) {
    dbAllTasks = JSON.parse(localStorage.getItem("tasks"));
  }
  checkRemoveAllTaskBtn();
  checkRemoveAllConfigBtn();
  calculateNumberOfTasks();
  checkTasksOnScreen(dbAllTasks);
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
// Funções e variáveis responsáveis pelo funcionamento do campo de inserção de tarefas.

// Importações.
import { checkInputValue, clearInput, validateInput, clearEmptyInput } from "./auxiliary-func-for-inputs.js";
import { filtred, checkTasksOnScreen } from "./filter-information.js";
import { cleanInputFilter } from "./filter-task-by-input-search.js";
import { filterTaskByClass, activateFilterBtn, calculateNumberOfTasks } from "./filter-task-by-status.js";
import { checkRemoveAllTaskBtn } from "./remove-all-tasks.js";
import { checkRemoveAllConfigBtn } from "./remove-all-config.js";
import { saveCreatedTask } from "./save-actions-to-localstorage.js";
import { taskConstructor } from "./task-create.js";

export const tasksContainer = document.querySelector("#tasksContainer"); // Campo onde as novas tarefas serão adicionadas.
export const newTaskInput = document.querySelector("#newTaskInput"); // Campo de texto para o usuário escrever o conteúdo das novas tarefas.
export const newTaskBtn = document.querySelector("#newTaskBtn"); // Botão para inserir as novas tarefas.
const cleanNewTaskInputBtn = document.querySelector("#cleanNewTaskInputBtn"); // Botão para limpar campo de texto do input de novas tarefas.

// Função responsável por preparar a nova tarefa e inserir na tela.
function prepareAndInsertTask() {
  const infoTaskSave = new Object();
  const taskField = document.createElement("div");
  const task = document.createElement("div");
  const taskFront = document.createElement("div");
  if (filtred) {
    cleanInputFilter();
    activateFilterBtn(pendingTasksFilterBtn);
    filterTaskByClass("pendingTask");
    insertTask(taskField, task, taskFront, infoTaskSave);
  } else {
    insertTask(taskField, task, taskFront, infoTaskSave);
  }
  calculateNumberOfTasks();
  checkTasksOnScreen("allTasks");
  checkRemoveAllTaskBtn();
  checkRemoveAllConfigBtn();
}

// Função responsável por inserir as tarefas na tela (renderização em tela).
function insertTask(taskField, task, taskFront, infoTaskSave) {
  saveCreatedTask(infoTaskSave);
  taskConstructor(taskField, task, taskFront, infoTaskSave);
  taskField.classList.add("appearTask");
  tasksContainer.insertBefore(taskField, tasksContainer.childNodes[0]);
  setTimeout(() => {
    taskField.classList.remove("appearTask");
  }, 200);
}

// Função principal responsável pelo funcionamento do campo de inserção de tarefas.
export default function initNewTaskInput() {

  newTaskInput.focus(); // Focar no campo de inserção de texto para novas tarefas ao iniciar a aplicação.
  newTaskInput.onkeyup = () => checkInputValue(newTaskInput, cleanNewTaskInputBtn); // Função responsável por checar se o botão de apagar texto do input deve está habilitado ou não.
  newTaskInput.onblur = () => clearEmptyInput(newTaskInput); // Função responsável por limpar input caso o usuário clique várias vezes na barra de espaço.
  cleanNewTaskInputBtn.onclick = () => clearInput(newTaskInput, cleanNewTaskInputBtn); // Função responsável por apagar texto do input ao clicar.
  
  // Inserir novas tarefas ao clicar no botão.
  newTaskBtn.addEventListener("click", () => {
    if (validateInput(newTaskInput)) {
      prepareAndInsertTask();
      newTaskInput.value = "";
      cleanNewTaskInputBtn.classList.add("hide");
    }
  });
  
  // Inserir novas tarefas ao pressionar a tecla "enter" do teclado.
  newTaskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      if (validateInput(newTaskInput)) {
        prepareAndInsertTask();
        newTaskInput.value = "";
        cleanNewTaskInputBtn.classList.add("hide");
      }
    }
  });

}
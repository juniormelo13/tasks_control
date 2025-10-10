// Funções auxiliares para as tarefas.

// Importações.
import { tasksContainer } from "./new-task-input.js";

// Função responsável por proteger a aplicação de cliques extras ao manipular tarefas, evitando erros na aplicação.
export function transitionClickProtection(option) {
  const taskFields = tasksContainer.childNodes;
  if (option == "add") {
    for (const taskField of taskFields) {
      const task = taskField.firstChild
      const taskFront = task.firstChild
      const btnField = taskFront.childNodes[1]
      taskFront.classList.remove("hover")
      btnField.classList.add("pointerEventsNone");
    }
  } else {
    for (const taskField of taskFields) {
      const task = taskField.firstChild
      const taskFront = task.firstChild
      const btnField = taskFront.childNodes[1]
      taskFront.classList.add("hover")
      btnField.classList.remove("pointerEventsNone");
    }
  }
}

// Função responsável por habilitar e desabilitar o clique nas tarefas durante animações. 
export function includePointerEventsNoneAllTasks(option) {
  const taskFields = tasksContainer.childNodes;
  if (option == "add") {
    for (const taskField of taskFields) {
      taskField.classList.add("pointerEventsNone");
    }
  } else {
    for (const taskField of taskFields) {
      taskField.classList.remove("pointerEventsNone");
    }
  }
}

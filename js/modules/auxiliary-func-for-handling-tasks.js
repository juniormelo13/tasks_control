import { tasksContainer } from "./new-task-input.js";

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

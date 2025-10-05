const tasksContainer = document.querySelector("#tasksContainer"); // Campo onde as novas tarefas serão adicionadas

function transitionClickProtection(option) {
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

function includePointerEventsNoneAllTasks(option) {
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

function highLight(taskField, notePadContainer, option) {
  const taskFields = tasksContainer.childNodes;
  if (option == "true") {
    for (const taskField of taskFields) {
      taskField.classList.add("pointerEventsNone");
      taskField.classList.add("lowOpacity");
    }
    taskField.classList.remove("pointerEventsNone");
    taskField.classList.remove("lowOpacity");
    notePadContainer.classList.add("active");
  } else {
    for (const taskField of taskFields) {
      if (taskField.classList.contains("lowOpacity")) {
        taskField.classList.remove("lowOpacity");
      }
      taskField.classList.add("normalOpacity");
    }
    taskField.classList.remove("normalOpacity");
    notePadContainer.classList.remove("active");
    setTimeout(() => {
      for (const taskField of taskFields) {
        taskField.classList.remove("pointerEventsNone");
        if (taskField.classList.contains("normalOpacity")) {
          taskField.classList.remove("normalOpacity");
        }
      }
    }, 200);
  }
}
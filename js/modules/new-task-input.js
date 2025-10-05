const newTaskInput = document.querySelector("#newTaskInput");
const newTaskBtn = document.querySelector("#newTaskBtn");
const cleanNewTaskInputBtn = document.querySelector("#cleanNewTaskInputBtn");

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
  checkTasksOnScreen(dbAllTasks);
  checkRemoveAllTaskBtn();
  checkRemoveAllConfigBtn();
}

function insertTask(taskField, task, taskFront, infoTaskSave) {
  saveCreatedTask(infoTaskSave);
  taskConstructor(taskField, task, taskFront, infoTaskSave);
  taskField.classList.add("appearTask");
  tasksContainer.insertBefore(taskField, tasksContainer.childNodes[0]);
  setTimeout(() => {
    taskField.classList.remove("appearTask");
  }, 200);
}

export default function initNewTaskInput() {

  newTaskInput.focus();
  
  newTaskInput.onkeyup = () => checkInputValue(newTaskInput, cleanNewTaskInputBtn);
  newTaskInput.onblur = () => clearEmptyInput(newTaskInput);
  cleanNewTaskInputBtn.onclick = () => clearInput(newTaskInput, cleanNewTaskInputBtn);
  
  newTaskBtn.addEventListener("click", () => {
    if (validateInput(newTaskInput)) {
      prepareAndInsertTask();
      newTaskInput.value = "";
      cleanNewTaskInputBtn.classList.add("hide");
    }
  });
  
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
const editField = document.querySelector("#editField"); // Janela para edição das tarefas
const editInput = document.querySelector("#editInput"); // Input de texto para edição das tarefas
const cleanEditInputBtn = document.querySelector("#cleanEditInputBtn");
const closeEditFieldBtn = document.querySelector("#closeEditFieldBtn");
const confirmEditBtn = document.querySelector("#confirmEditBtn"); // Botão de confirmação da edição
const cancelEditBtn = document.querySelector("#cancelEditBtn");

editInput.onkeyup = () => checkInputValue(editInput, cleanEditInputBtn);
editInput.onblur = () => clearEmptyInput(editInput);
cleanEditInputBtn.onclick = () => clearInput(editInput, cleanEditInputBtn);
closeEditFieldBtn.onclick = () => hideWindow(editField);
cancelEditBtn.onclick = () => hideWindow(editField);

function editClick(taskContent, infoTaskSave) {
  showWindow(editField);
  editInput.value = taskContent.innerText;
  cleanEditInputBtn.classList.remove("hide");
  confirmEditBtn.onclick = () => editTask(taskContent, infoTaskSave);
  editInput.onkeypress = (e) => {
    if (e.key === "Enter") {
      editTask(taskContent, infoTaskSave);
    }
  };
}

function editTask(taskContent, infoTaskSave) {
  if (validateInput(editInput)) {
    hideWindow(editField);
    infoTaskSave["taskContent"] = editInput.value;
    localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
    setTimeout(() => {
      taskContent.innerText = editInput.value;
      taskContent.classList.add("editAnimation");
      includePointerEventsNoneAllTasks("add");
    }, 200);
    setTimeout(() => {
      taskContent.classList.remove("editAnimation");
      includePointerEventsNoneAllTasks("remove");
    }, 500);
  }
}

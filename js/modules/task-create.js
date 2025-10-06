// ----- Funções auxiliares (Criação de tarefas) -----

function createTask(taskField, task, taskFront) {
  taskField.classList.add("taskField")
  task.classList.add("task");
  taskFront.classList.add("taskFront")
  taskFront.classList.add("hover");
  taskField.appendChild(task);
  task.appendChild(taskFront);
}

function insertTextContent(taskFront, taskContent, infoTaskSave) {
  taskContent.innerText = infoTaskSave["taskContent"];
  taskContent.classList.add("taskContent");
  taskFront.appendChild(taskContent);
}

function createBtnField(taskFront, btnField) {
  taskFront.appendChild(btnField);
  btnField.classList.add("btnField");
}

function createTaskInfo(taskField, taskFront, taskInfo, infoTextContent, schedulingRemoveBtn, completedTaskIcon, infoTaskSave, editBtn, scheduleBtn) {
  const schedulingRemoveBtnIcon = document.createElement("i");
  taskInfo.classList.add("taskInfo");
  taskInfo.classList.add("hide");
  infoTextContent.classList.add("infoTextContent");
  completedTaskIcon.classList.add("completedTaskIcon");
  completedTaskIcon.classList.add("fa-solid");
  completedTaskIcon.classList.add("fa-check");
  completedTaskIcon.classList.add("hide");
  taskFront.appendChild(taskInfo);
  taskInfo.appendChild(infoTextContent);
  taskInfo.appendChild(schedulingRemoveBtn);
  taskInfo.appendChild(completedTaskIcon);
  schedulingRemoveBtn.classList.add("schedulingRemoveBtn");
  schedulingRemoveBtn.appendChild(schedulingRemoveBtnIcon);
  schedulingRemoveBtnIcon.classList.add("fa-regular");
  schedulingRemoveBtnIcon.classList.add("fa-circle-xmark");
  schedulingRemoveBtn.addEventListener("click", () => schedulingRemoveClick(taskField, taskInfo, taskFront, scheduleBtn, editBtn, infoTextContent, infoTaskSave));
}

function createNotPadContainer(taskField, taskFront, task, notePadContainer, notesBtn, infoTaskSave, notePadInput, cleanNoteBtn) {
  const notePadTop = document.createElement("div");
  const notePadBtnField = document.createElement("div");
  const saveNoteBtn = document.createElement("button");
  const notePadTitle = document.createElement("p");
  const cleanNoteBtnIcon = document.createElement("i");
  const saveNoteBtnIcon = document.createElement("i");

  notePadContainer.classList.add("notePadContainer");
  notePadContainer.classList.add("taskBehind");
  notePadTop.classList.add("notePadTop");
  notePadTitle.classList.add("notePadTitle");
  notePadInput.classList.add("notePadInput");
  notePadInput.setAttribute("name", "notePadInput");
  notePadInput.setAttribute("placeholder", "O que deseja anotar?");
  notePadBtnField.classList.add("notePadBtnField");
  cleanNoteBtn.classList.add("cleanNoteBtn");
  cleanNoteBtn.classList.add("hide");
  cleanNoteBtn.setAttribute("title", "Limpar Anotações");
  cleanNoteBtnIcon.classList.add("fa-solid");
  cleanNoteBtnIcon.classList.add("fa-xmark");
  saveNoteBtn.classList.add("saveNoteBtn");
  saveNoteBtn.setAttribute("title", "Salvar");
  saveNoteBtnIcon.classList.add("fa-solid");
  saveNoteBtnIcon.classList.add("fa-angles-right");
  notePadInput.setAttribute("spellcheck", "false");
  task.appendChild(notePadContainer);
  notePadContainer.appendChild(notePadTop);
  notePadContainer.appendChild(notePadInput);
  notePadContainer.appendChild(notePadBtnField);
  notePadTop.appendChild(notePadTitle);
  notePadTitle.innerText = "Anotações";
  notePadTop.appendChild(saveNoteBtn);
  saveNoteBtn.appendChild(saveNoteBtnIcon);
  notePadBtnField.appendChild(cleanNoteBtn);
  cleanNoteBtn.appendChild(cleanNoteBtnIcon);
  saveNoteBtn.onclick = () => saveNoteClick(taskField, task, taskFront, notePadContainer, notePadInput, notesBtn, infoTaskSave);
  notePadInput.onkeyup = () => checkInputValue(notePadInput, cleanNoteBtn);
  cleanNoteBtn.onclick = () => clearInput(notePadInput, cleanNoteBtn);
}

function createCompleteTaskBtn(taskField, taskFront, taskContent, btnField, scheduleBtn, editBtn, checkBtn, checkIcon, taskInfo, infoTextContent, completedTaskIcon, schedulingRemoveBtn, infoTaskSave) {
  btnField.appendChild(checkBtn);
  checkBtn.classList.add("checkBtn");
  checkBtn.appendChild(checkIcon);
  checkIcon.classList.add("fa-solid");
  checkIcon.classList.add("fa-thumbs-up");
  checkBtn.setAttribute("title", "Concluir");
  checkBtn.addEventListener("click", () => completeTaskClick(taskField, taskFront, taskContent, scheduleBtn, editBtn, checkBtn, checkIcon, taskInfo, infoTextContent, completedTaskIcon, schedulingRemoveBtn, infoTaskSave));
}

function createEditTaskBtn(btnField, editBtn, taskContent, infoTaskSave) {
  const editIcon = document.createElement("i");
  btnField.appendChild(editBtn);
  editBtn.classList.add("editBtn");
  editBtn.appendChild(editIcon);
  editIcon.classList.add("fa-solid");
  editIcon.classList.add("fa-pen");
  editBtn.setAttribute("title", "Editar");
  editBtn.addEventListener("click", () => editClick(taskContent, infoTaskSave));
}

function createScheduleTaskBtn(taskFront, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, infoTaskSave, btnField) {
  const scheduleIcon = document.createElement("i");
  btnField.appendChild(scheduleBtn);
  scheduleBtn.classList.add("scheduleBtn");
  scheduleBtn.appendChild(scheduleIcon);
  scheduleIcon.classList.add("fa-solid");
  scheduleIcon.classList.add("fa-clock");
  scheduleBtn.setAttribute("title", "Definir prazo");
  scheduleBtn.addEventListener("click", () => scheduleClick(taskFront, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, infoTaskSave, btnField));
}

function createNotesBtn(taskField, task, taskFront, notePadInput, notePadContainer, cleanNoteBtn, notesBtn, infoTaskSave, btnField) {
  const notesBtnIcon = document.createElement("i");
  btnField.appendChild(notesBtn);
  notesBtn.classList.add("notesBtn");
  notesBtn.appendChild(notesBtnIcon);
  notesBtnIcon.classList.add("fa-solid");
  notesBtnIcon.classList.add("fa-file-lines");
  notesBtn.setAttribute("title", "Anotações");
  notesBtn.addEventListener("click", () => notesBtnClick(taskField, task, taskFront, notePadInput, notePadContainer, cleanNoteBtn, notesBtn, infoTaskSave));
}

function createRemoveTaskBtn(taskField, taskFront, infoTaskSave, btnField, removeBtn) {
  const removeIcon = document.createElement("i");
  btnField.appendChild(removeBtn);
  removeBtn.classList.add("removeBtn");
  removeBtn.appendChild(removeIcon);
  removeIcon.classList.add("fa-solid");
  removeIcon.classList.add("fa-trash");
  removeBtn.setAttribute("title", "Excluir tarefa");
  removeBtn.addEventListener("click", () => deleteClick(taskField, taskFront, infoTaskSave));
}

export function taskConstructor(taskField, task, taskFront, infoTaskSave) {
  // Componentes da tarefa
  const btnField = document.createElement("div");
  const taskInfo = document.createElement("div");
  const notePadContainer = document.createElement("div");
  const schedulingRemoveBtn = document.createElement("button");
  const cleanNoteBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const checkIcon = document.createElement("i");
  const editBtn = document.createElement("button");
  const scheduleBtn = document.createElement("button");
  const notesBtn = document.createElement("button");
  const removeBtn = document.createElement("button");
  const infoTextContent = document.createElement("p");
  const completedTaskIcon = document.createElement("i");
  const notePadInput = document.createElement("textarea");
  const taskContent = document.createElement("p");

  // Criação da tarefa
  createTask(taskField, task, taskFront);

  // Inserção do texto da tarefa
  insertTextContent(taskFront, taskContent, infoTaskSave);

  // Campo dos botões/ícones
  createBtnField(taskFront, btnField);

  // Criação do campo de informações da tarefa
  createTaskInfo(taskField, taskFront, taskInfo, infoTextContent, schedulingRemoveBtn, completedTaskIcon, infoTaskSave, editBtn, scheduleBtn);

  // Campo para anotações da tarefa
  createNotPadContainer(taskField, taskFront, task, notePadContainer, notesBtn, infoTaskSave, notePadInput, cleanNoteBtn);

  // Botão para conclusão da tarefa
  createCompleteTaskBtn(taskField, taskFront, taskContent, btnField, scheduleBtn, editBtn, checkBtn, checkIcon, taskInfo, infoTextContent, completedTaskIcon, schedulingRemoveBtn, infoTaskSave);

  //Botão para edição da tarefa
  createEditTaskBtn(btnField, editBtn, taskContent, infoTaskSave);

  // Botão para agendamento da tarefa
  createScheduleTaskBtn(taskFront, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, infoTaskSave, btnField);

  // Botão para adiconar anotações sobre a tarefa
  createNotesBtn(taskField, task, taskFront, notePadInput, notePadContainer, cleanNoteBtn, notesBtn, infoTaskSave, btnField);

  // Botão para exclusão da tarefa
  createRemoveTaskBtn(taskField, taskFront, infoTaskSave, btnField, removeBtn);

  // Recuperação das tarefas em tela, caso seja requisitado
  switch (infoTaskSave.completedTask) {
    case true:
      taskContent.classList.toggle("completed");
      taskFront.classList.toggle("completed");
      editBtn.classList.toggle("disabledBtn");
      scheduleBtn.classList.toggle("disabledBtn");
      checkIcon.classList.toggle("fa-thumbs-up");
      checkIcon.classList.toggle("fa-rotate");
      checkIcon.classList.toggle("fa-spin");
      checkBtn.setAttribute("title", "Restaurar");
      taskInfo.classList.add("completed");
      taskInfo.classList.remove("hide");
      infoTextContent.innerText = "Tarefa concluída";
      completedTaskIcon.classList.remove("hide");
      schedulingRemoveBtn.classList.add("hide");
      break;
  }

  switch (infoTaskSave.scheduledTask && infoTaskSave.scheduledTask[0]) {
    case true:
      taskInfo.classList.remove("hide");
      taskInfo.classList.add("scheduled");
      taskFront.classList.add("scheduled");
      schedulingRemoveBtn.setAttribute("title", "Remover prazo");
      scheduleBtn.classList.add("disabledBtn");
      infoTextContent.innerText = infoTaskSave.scheduledTask[3];
      break;
  }

  switch (infoTaskSave.savedNote && infoTaskSave.savedNote[0]) {
    case true:
      notePadInput.value = infoTaskSave.savedNote[1];
      notesBtn.classList.add("active");
      break;
  }

  switch (infoTaskSave.expireAlert) {
    case true:
      taskFront.classList.add("expireAlert");
      taskInfo.classList.add("expireAlert");
      break;
  }

  switch (infoTaskSave.expiredTask && infoTaskSave.expiredTask[0]) {
    case true:
      taskFront.classList.add("expiredTask");
      taskInfo.classList.add("expiredTask");
      taskInfo.classList.remove("hide");
      schedulingRemoveBtn.setAttribute("title", "Restaurar");
      editBtn.classList.add("disabledBtn");
      scheduleBtn.classList.add("disabledBtn");
      infoTextContent.innerText = infoTaskSave.expiredTask[3];
      break;
  }
}
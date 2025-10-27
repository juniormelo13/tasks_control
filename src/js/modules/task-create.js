// Funções responsáveis pela criação de tarefas e renderização em tela.

// Importações
import { completeTaskClick } from "./task-complete.js";
import { editClick } from "./task-edit.js";
import { scheduleClick } from "./task-schedule.js";
import { notesBtnClick, saveNoteClick } from "./task-notes-field.js";
import { checkInputValue, clearInput } from "./auxiliary-func-for-inputs.js";
import { schedulingRemoveClick } from "./task-schedule-remove.js";
import { deleteClick } from "./task-delete.js";

// Função responsável pela criação da tarefa e renderização em tela.
function createTask(taskField, task, taskFront) {
  taskField.classList.add("taskField") // Adiciona a classe para estilização do container da tarefa.
  task.classList.add("task"); // Adiciona a classe para estilização da tarefa.
  taskFront.classList.add("taskFront") // Adiciona a classe para estilização da frente da tarefa.
  taskFront.classList.add("hover"); // Adiciona a classe para ativar o hover da tarefa.
  taskField.appendChild(task); // Adiciona a tarefa como filho do container.
  task.appendChild(taskFront); // Adiciona a frente da tarefa como filho da tarefa.
}

// Função responsável pela criação do texto da tarefa e renderização em tela.
function insertTextContent(taskFront, taskContent, infoTaskSave) {
  taskContent.innerText = infoTaskSave["taskContent"]; // Coleta o texto da tarefa do objeto tarefa no array.
  taskContent.classList.add("taskContent"); // Adiciona a classe para estilização do conteúdo de texto da tarefa.
  taskFront.appendChild(taskContent); // Adiciona o conteúdo de texto da tarefa como filho da frente da tarefa.
}

// Função responsável pela criação do campo de botões da tarefa e renderização em tela.
function createBtnField(taskFront, btnField) {
  btnField.classList.add("btnField"); // Adiciona a classe para estilização do campo de botões da tarefa.
  taskFront.appendChild(btnField); // Adiciona o campo de botões da tarefa como filho da frente da tarefa.
}

// Função responsável pela criação do campo de informações da tarefa e renderização em tela.
function createTaskInfo(taskField, taskFront, taskInfo, infoTextContent, schedulingRemoveBtn, completedTaskIcon, infoTaskSave, editBtn, scheduleBtn) {
  const schedulingRemoveBtnIcon = document.createElement("span"); // Criação do elemento HTML para ícones.
  taskInfo.classList.add("taskInfo"); // Adiciona a classe para estilização do conteúdo do campo de informações da tarefa.
  taskInfo.classList.add("hide"); // Adiciona a classe para esconder o campo assim que a tarefa é criada.
  infoTextContent.classList.add("infoTextContent"); // Adiciona a classe para estilização do conteúdo de texto da informação da tarefa.
  completedTaskIcon.classList.add("completedTaskIcon"); // Adiciona a classe para estilização do ícone de tarefa concluída.
  completedTaskIcon.dataset.iconName = "check";; // Adiciona o atributo data para determinar o ícone de tarefa concluída.
  completedTaskIcon.classList.add("hide"); // Adiciona a classe para esconder o ícone.
  taskFront.appendChild(taskInfo); // Adiciona o campo de informações da tarefa como filho da frente da tarefa.
  taskInfo.appendChild(infoTextContent); // Adiciona o texto de informações da tarefa como filho do campo de informações da tarefa.
  taskInfo.appendChild(schedulingRemoveBtn); // Adiciona o botão de remoção do agendamento como filho do campo de informações da tarefa.
  taskInfo.appendChild(completedTaskIcon); // Adiciona o ícone de tarefa concluída como filho do campo de informações da tarefa.
  schedulingRemoveBtn.classList.add("schedulingRemoveBtn"); // Adiciona a classe para estilizar o botão de remoção do agendamento ou reset.
  schedulingRemoveBtn.appendChild(schedulingRemoveBtnIcon); // Adiciona o ícone ddo botão de remoção como filho do botão de remoção.
  schedulingRemoveBtnIcon.dataset.iconName = "circle-xmark";; // Adiciona o atributo para determinar o ícone do botão de remoção.
  schedulingRemoveBtn.addEventListener("click", () => schedulingRemoveClick(taskField, taskInfo, taskFront, scheduleBtn, editBtn, infoTextContent, infoTaskSave)); // Adiciona a função de remover agendamento ou resetar tarefa ao botão de remoção.
}

// Função responsável pela criação do campo de anotações da tarefa.
function createNotPadContainer(taskField, taskFront, task, notePadContainer, notesBtn, infoTaskSave, notePadInput, cleanNoteBtn) {
  const notePadTop = document.createElement("div");
  const notePadBtnField = document.createElement("div");
  const saveNoteBtn = document.createElement("button");
  const notePadTitle = document.createElement("p");
  const cleanNoteBtnIcon = document.createElement("span");
  const saveNoteBtnIcon = document.createElement("span");

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
  cleanNoteBtnIcon.dataset.iconName = "xmark";
  saveNoteBtn.classList.add("saveNoteBtn");
  saveNoteBtn.setAttribute("title", "Salvar");
  saveNoteBtnIcon.dataset.iconName = "angles-down";
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

// Função responsável por criar o botão de conclusão da tarefa.
function createCompleteTaskBtn(taskField, taskFront, taskContent, btnField, scheduleBtn, editBtn, checkBtn, checkIcon, recoverIcon, taskInfo, infoTextContent, completedTaskIcon, schedulingRemoveBtn, infoTaskSave) {
  btnField.appendChild(checkBtn);
  checkBtn.classList.add("checkBtn");
  checkBtn.appendChild(checkIcon);
  checkIcon.classList.add("active");
  checkBtn.appendChild(recoverIcon);
  checkIcon.dataset.iconName = "thumbs-up";
  recoverIcon.dataset.iconName = "rotate";
  checkBtn.setAttribute("title", "Concluir");
  checkBtn.addEventListener("click", () => completeTaskClick(taskField, taskFront, taskContent, scheduleBtn, editBtn, checkBtn, checkIcon, recoverIcon, taskInfo, infoTextContent, completedTaskIcon, schedulingRemoveBtn, infoTaskSave));
}

// Função responsável por criar o botão de edição da tarefa.
function createEditTaskBtn(btnField, editBtn, taskContent, infoTaskSave) {
  const editIcon = document.createElement("span");
  btnField.appendChild(editBtn);
  editBtn.classList.add("editBtn");
  editBtn.appendChild(editIcon);
  editIcon.dataset.iconName = "pen";
  editBtn.setAttribute("title", "Editar");
  editBtn.addEventListener("click", () => editClick(taskContent, infoTaskSave));
}

// Função responsável por criar o botão de agendamento da tarefa.
function createScheduleTaskBtn(taskFront, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, infoTaskSave, btnField) {
  const scheduleIcon = document.createElement("span");
  btnField.appendChild(scheduleBtn);
  scheduleBtn.classList.add("scheduleBtn");
  scheduleBtn.appendChild(scheduleIcon);
  scheduleIcon.dataset.iconName = "clock";
  scheduleBtn.setAttribute("title", "Definir prazo");
  scheduleBtn.addEventListener("click", () => scheduleClick(taskFront, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, infoTaskSave, btnField));
}

// Função responsável por criar o botão de anotações da tarefa.
function createNotesBtn(taskField, task, taskFront, notePadInput, notePadContainer, cleanNoteBtn, notesBtn, infoTaskSave, btnField) {
  const notesBtnIcon = document.createElement("span");
  btnField.appendChild(notesBtn);
  notesBtn.classList.add("notesBtn");
  notesBtn.appendChild(notesBtnIcon);
  notesBtnIcon.dataset.iconName = "file-lines";
  notesBtn.setAttribute("title", "Anotações");
  notesBtn.addEventListener("click", () => notesBtnClick(taskField, task, taskFront, notePadInput, notePadContainer, cleanNoteBtn, notesBtn, infoTaskSave));
}

// Função responsável por criar o botão de remoção da tarefa.
function createRemoveTaskBtn(taskField, taskFront, infoTaskSave, btnField, removeBtn) {
  const removeIcon = document.createElement("span");
  btnField.appendChild(removeBtn);
  removeBtn.classList.add("removeBtn");
  removeBtn.appendChild(removeIcon);
  removeIcon.dataset.iconName = "trash";
  removeBtn.setAttribute("title", "Excluir tarefa");
  removeBtn.addEventListener("click", () => deleteClick(taskField, taskFront, infoTaskSave));
}

// Função responsável por criar ou recuperar as tarefas.
export function taskConstructor(taskField, task, taskFront, infoTaskSave) {
  // Componentes da tarefa
  const btnField = document.createElement("div");
  const taskInfo = document.createElement("div");
  const notePadContainer = document.createElement("div");
  const schedulingRemoveBtn = document.createElement("button");
  const cleanNoteBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const checkIcon = document.createElement("span");
  const recoverIcon = document.createElement("span");
  const editBtn = document.createElement("button");
  const scheduleBtn = document.createElement("button");
  const notesBtn = document.createElement("button");
  const removeBtn = document.createElement("button");
  const infoTextContent = document.createElement("p");
  const completedTaskIcon = document.createElement("span");
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
  createCompleteTaskBtn(taskField, taskFront, taskContent, btnField, scheduleBtn, editBtn, checkBtn, checkIcon, recoverIcon, taskInfo, infoTextContent, completedTaskIcon, schedulingRemoveBtn, infoTaskSave);

  //Botão para edição da tarefa
  createEditTaskBtn(btnField, editBtn, taskContent, infoTaskSave);

  // Botão para agendamento da tarefa
  createScheduleTaskBtn(taskFront, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, infoTaskSave, btnField);

  // Botão para adicionar anotações sobre a tarefa
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
      checkIcon.classList.toggle("active");
      recoverIcon.classList.toggle("active");
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
// Funções auxiliares para os inputs.

// Importações.
import { newTaskInput, newTaskBtn } from "./new-task-input.js";
import { editInput, confirmEditBtn } from "./task-edit.js";
import { scheduleInputDate, scheduleInputTime, confirmScheduleBtn } from "./task-schedule.js";

// Função responsável por checar se o botão de apagar input deve está habilitado ou não.
export function checkInputValue(input, cleanBtn) {
  if (input.value.trim() != "") {
    cleanBtn.classList.remove("hide");
    return true;
  } else {
    cleanBtn.classList.add("hide");
    return false;
  }
}

// Função responsável por apagar texto do input.
export function clearInput(input, cleanBtn) {
  cleanBtn.classList.add("hide");
  input.value = "";
  input.focus();
}

// Função responsável por validar se input foi preenchido corretamente e inserir erro no mesmo, caso necessário.
export function validateInput(input) {
  if (input.value.trim() != "") {
    return true;
  } else {
    input.classList.add("inputError");
    input.value = "";
    input.blur();
    return false;
  }
}

// Função responsável por limpar input caso o usuário clique várias vezes na barra de espaço.
export function clearEmptyInput(input) {
  if (input.value.trim() == "") {
    input.value = "";
  }
}

// Configuração para remover erros dos inputs ao clicar na tela.
document.addEventListener("click", (e) => {
  if (newTaskInput.classList.contains("inputError") && !newTaskBtn.contains(e.target)) {
    newTaskInput.classList.remove("inputError");
  } else if (editInput.classList.contains("inputError") && !confirmEditBtn.contains(e.target)) {
    editInput.classList.remove("inputError");
  } else if (scheduleInputDate.classList.contains("inputError") && !confirmScheduleBtn.contains(e.target)) {
    scheduleInputDate.classList.remove("inputError");
  } else if (scheduleInputTime.classList.contains("inputError") && !confirmScheduleBtn.contains(e.target)) {
    scheduleInputTime.classList.remove("inputError");
  }
});
// Funções e variáveis responsáveis pelo agendamento de tarefas.

// Importações.
import { hideWindow, showWindow } from "./auxiliary-func-for-window.js";
import { saveScheduledTaskAction } from "./save-actions-to-localstorage.js";
import { calculateNumberOfTasks } from "./filter-task-by-status.js";

const scheduleField = document.querySelector("#scheduleField"); // Janela de agendamento de tarefas.
const scheduleFieldCloseBtn = document.querySelector("#scheduleFieldCloseBtn"); // Botão de fechar a janela de agendamento de tarefas.
const cancelScheduletBtn = document.querySelector("#cancelScheduletBtn"); // Botão de cancelar o agendamento de tarefas e fechar a janela.
export const scheduleInputDate = document.querySelector("#scheduleInputDate"); // Campo para inclusão da data de agendamento.
export const scheduleInputTime = document.querySelector("#scheduleInputTime"); // Campo para inclusão do horário de agendamento.
export const confirmScheduleBtn = document.querySelector("#confirmScheduleBtn"); // Botão para confirmação do agendamento.

scheduleFieldCloseBtn.onclick = () => hideWindow(scheduleField); // Função para fechar a janela de agendamento ao clicar no botão de fechar.
cancelScheduletBtn.onclick = () => hideWindow(scheduleField); // Função para fechar a janela de agendamento ao clicar no botão de cancelar.

// Função responsável por coletar dados da data atual e inserir nos inputs de data e hora da janela de agendamento.
export function scheduleClick(task, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, infoTaskSave, btnField) {

  const currentFullDate = new Date(); // Variável para guardar a data atual completa.
  const currentDateForInput = currentFullDate.toLocaleDateString("fr-CA"); // Data atual transformada para inserção no input date.
  const currentTimeForInput = currentFullDate.toLocaleString("pt-BR", {timeStyle: "short"}); // Hora atual transformada para inclusão no input time.
  showWindow(scheduleField); // Função para abrir a janela de agendamento de tarefas.
  scheduleInputDate.value = currentDateForInput; // Inclusão da data atual transformada no input date.
  scheduleInputDate.setAttribute("min", currentDateForInput); // Atribuindo a data mínima que aparece no input date, impedindo agendar para datas anteriores.
  scheduleInputTime.value = currentTimeForInput; // inclusão da hota atual transformada no input time.
  scheduleInputTime.focus(); // Adição do foco no input time ao abrir a janela de agendamento.

  // Ativa a função de confirmação do agendamento ao clicar no botão de confirmação.
  confirmScheduleBtn.onclick = () => confirmSchedule(task, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, infoTaskSave, btnField);

  // Ativa a função de confirmação do agendamento ao pressionar o botão "enter" no teclado.
  scheduleField.onkeypress = (e) => {
    if (e.key === "Enter") {
      confirmSchedule(task, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, infoTaskSave, btnField);
    }
  };
  
}

// Função responsável por confirmar o agendamento.
const confirmSchedule = (task, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, infoTaskSave, btnField) => {
  
  const currentFullDate = new Date(); // Variável para guardar a data atual completa.
  const currentDate = currentFullDate.toLocaleDateString("fr-CA"); // Data atual transformada para comparação com a data do input date e/ou validações.
  const currentTimeForValidate = currentFullDate.toLocaleString("pt-BR", {timeStyle: "short"}); // Hora atual transformada para comparação com a hora do input time e/ou validações.
  const scheduleInputDateValue = scheduleInputDate.value; // Variável para guardar a data escolhida pelo usuário no input date.
  const scheduleInputTimeValue = scheduleInputTime.value; // Variável para guardar a hora escolhida pelo usuário no input time.

  // Função para validação do input data e inserção de erro.
  function validateScheduleInputDate() {
    if (scheduleInputDateValue.trim() != "" && scheduleInputDateValue >= currentDate) {
      return true;
    } else {
      scheduleInputDate.classList.add("inputError");
      scheduleInputDate.blur();
      return false;
    }
  }

  // Função para validação do input time e inserção de erro.
  const validateScheduleInputTime = () => {
    if (scheduleInputTimeValue.trim() != "" && scheduleInputDateValue > currentDate) {
      return true;
    }
    if (scheduleInputDateValue === currentDate && scheduleInputTimeValue > currentTimeForValidate) {
      return true;
    }
    scheduleInputTime.classList.add("inputError");
    scheduleInputTime.blur();
    return false;
  };

  // Inclusão das informações de agendamento na tarefa, caso os inputs sejam validados.
  if (validateScheduleInputDate() && validateScheduleInputTime()) {
    
    const scheduledDate = new Date(scheduleInputDateValue + " " + scheduleInputTimeValue); // Recebimento dos valores colocados nos inputs e incluídos em uma nova data completa.
    const dateForInfoTextContent = scheduledDate.toLocaleString("pt-BR", { dateStyle: "short" }); // Nova data transformada no estilo de data "dia/mês/ano".
    const timeForInfoTextContent = scheduledDate.toLocaleString("pt-BR", { timeStyle: "short" }); // Nova data transformada no estilo de hora "--:--".
    const dayForInfoTextContent = scheduledDate.toLocaleString("pt-BR", { weekday: "short" }).charAt(0).toUpperCase() + scheduledDate.toLocaleString("pt-BR", { weekday: "short" }).substring(1).replace(/[.]/g, ","); // Nova data trasformada no estilo de dia da semana  "Dom,", "Seg,", "Ter,", "Qua,", "Qui,", "Sex," e "Sáb,".
    const difSeconds = (scheduledDate.getTime() - currentFullDate.getTime()) / 1000; // Diferença em segundos entre a data de agendamento e a data atual.
    const difMinutes = difSeconds / 60;
    const difDays = difMinutes / (60 * 24);
    const difGetDayNumber = scheduledDate.getDay() - currentFullDate.getDay();

    if (difDays >= 2) {
      infoTextContent.innerText = dayForInfoTextContent + " " + dateForInfoTextContent + ", " + timeForInfoTextContent;
    } else if (difDays > 1 && difDays < 2 && difGetDayNumber >= 2) {
      infoTextContent.innerText = dayForInfoTextContent + " " + dateForInfoTextContent + ", " + timeForInfoTextContent;
    } else if (difDays > 1 && difDays < 2 && difGetDayNumber == -5) {
      infoTextContent.innerText = dayForInfoTextContent + " " + dateForInfoTextContent + ", " + timeForInfoTextContent;
    } else {
      insertSchedulingInfo(infoTextContent, difDays, difMinutes, difGetDayNumber, scheduleInputTimeValue, scheduleInputDateValue, currentDate);
    }
    hideWindow(scheduleField);
    setTimeout(() => {
      scheduleBtn.classList.add("disabledBtn");
      task.classList.add("scheduled");
      taskInfo.classList.add("scheduled");
      schedulingRemoveBtn.setAttribute("title", "Remover prazo");
      taskInfo.classList.remove("hide");
      taskInfo.classList.add("appearTaskInfo");
      btnField.classList.add("pointerEventsNone");
      putExpireAlertClass(task, taskInfo, difMinutes, currentDate, difDays, difGetDayNumber, scheduleInputDateValue);
    }, 200);
    setTimeout(() => {
      taskInfo.classList.remove("appearTaskInfo");
      btnField.classList.remove("pointerEventsNone");
    }, 400);
    saveScheduledTaskAction(infoTaskSave, scheduleInputDateValue, scheduleInputTimeValue, infoTextContent, difMinutes, currentDate, difDays, difGetDayNumber);
    calculateNumberOfTasks();
  }

};

export function insertSchedulingInfo(infoTextContent, difDays, difMinutes, difGetDayNumber, scheduleInputTimeValue, scheduleInputDateValue, currentDate) {

  if ((difDays < 2 && difGetDayNumber == 1 && difMinutes > 60) || (difDays < 2 && difGetDayNumber == -6 && difMinutes > 60)) {
    infoTextContent.innerText = "Amanhã, " + scheduleInputTimeValue;
  } else if ((difDays < 2 && difGetDayNumber == 1 && difMinutes > 30 && difMinutes <= 60) || (difDays < 2 && difGetDayNumber == -6 && difMinutes > 30 && difMinutes <= 60)) {
    infoTextContent.innerText = "Amanhã, " + scheduleInputTimeValue + " - Faltam " + Math.ceil(difMinutes) + " min";
  } else if ((difDays < 2 && difGetDayNumber == 1 && difMinutes > 0 && difMinutes <= 30) || (difDays < 2 && difGetDayNumber == -6 && difMinutes > 0 && difMinutes <= 30)) {
    if (difMinutes <= 1) {
      infoTextContent.innerText = "Amanhã, " + scheduleInputTimeValue + " - Falta " + Math.ceil(difMinutes) + " min";
    } else {
      infoTextContent.innerText = "Amanhã, " + scheduleInputTimeValue + " - Faltam " + Math.ceil(difMinutes) + " min";
    }
  } else if (currentDate === scheduleInputDateValue && difMinutes > 60) {
    infoTextContent.innerText = "Hoje, " + scheduleInputTimeValue;
  } else if (difMinutes > 30 && difMinutes <= 60 && currentDate === scheduleInputDateValue) {
    infoTextContent.innerText = "Hoje, " + scheduleInputTimeValue + " - Faltam " + Math.ceil(difMinutes) + " min";
  } else if (difMinutes > 0 && difMinutes <= 30 && currentDate === scheduleInputDateValue) {
    if (difMinutes <= 1) {
      infoTextContent.innerText = "Hoje, " + scheduleInputTimeValue + " - Falta " + Math.ceil(difMinutes) + " min";
    } else {
      infoTextContent.innerText = "Hoje, " + scheduleInputTimeValue + " - Faltam " + Math.ceil(difMinutes) + " min";
    }
  }

}

export function putExpireAlertClass(task, taskInfo, difMinutes, currentDate, difDays, difGetDayNumber, scheduleInputDateValue) {
  
  if ((difMinutes > 0 && difMinutes <= 30 && currentDate === scheduleInputDateValue) || (difDays < 2 && difGetDayNumber == 1 && difMinutes > 0 && difMinutes <= 30) || (difDays < 2 && difGetDayNumber == -6 && difMinutes > 0 && difMinutes <= 30)) {
    task.classList.add("expireAlert");
    taskInfo.classList.add("expireAlert");
  }

}
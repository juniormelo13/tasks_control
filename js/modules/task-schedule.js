import { hideWindow, showWindow } from "./auxiliary-func-for-window.js";
import { saveScheduledTaskAction } from "./save-actions-to-localstorage.js";
import { calculateNumberOfTasks } from "./filter-task-by-status.js";

// Agendamento de tarefas
const scheduleField = document.querySelector("#scheduleField");
const scheduleFieldCloseBtn = document.querySelector("#scheduleFieldCloseBtn");
const cancelScheduletBtn = document.querySelector("#cancelScheduletBtn");
export const scheduleInputDate = document.querySelector("#scheduleInputDate");
export const scheduleInputTime = document.querySelector("#scheduleInputTime");
export const confirmScheduleBtn = document.querySelector("#confirmScheduleBtn");

scheduleFieldCloseBtn.onclick = () => hideWindow(scheduleField);
cancelScheduletBtn.onclick = () => hideWindow(scheduleField);

export function scheduleClick(task, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, infoTaskSave, btnField) {

  const currentFullDate = new Date();
  const optionsForTimeInput = {
    timeStyle: "short",
  };
  const currentDateForInput = currentFullDate.toLocaleDateString("fr-CA");
  const currentTimeForInput = currentFullDate.toLocaleString("pt-BR", optionsForTimeInput);
  showWindow(scheduleField);
  scheduleInputDate.value = currentDateForInput;
  scheduleInputDate.setAttribute("min", currentDateForInput);
  scheduleInputTime.value = currentTimeForInput;
  scheduleInputTime.focus();
  confirmScheduleBtn.onclick = () => confirmSchedule(task, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, infoTaskSave, btnField);
  scheduleField.onkeypress = (e) => {
    if (e.key === "Enter") {
      confirmSchedule(task, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, infoTaskSave, btnField);
    }
  };

}

// Configuração de botão de confirmação de agendamento
const confirmSchedule = (task, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, infoTaskSave, btnField) => {

  const currentFullDate = new Date();
  const scheduleInputDateValue = scheduleInputDate.value;
  const scheduleInputTimeValue = scheduleInputTime.value;
  const currentDate = currentFullDate.toLocaleDateString("fr-CA");
  const optionsForCurrentTime = {
    timeStyle: "short",
  };
  const currentTimeForValidate = currentFullDate.toLocaleString("pt-BR", optionsForCurrentTime);

  // Funções de validação dos input's de data e hora
  function validateScheduleInputDate() {
    if (scheduleInputDateValue.trim() != "" && scheduleInputDateValue >= currentDate) {
      return true;
    } else {
      scheduleInputDate.classList.add("inputError");
      scheduleInputDate.blur();
      return false;
    }
  }

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

  if (validateScheduleInputDate() && validateScheduleInputTime()) {
    // Recebimento dos valores colocados nos inputs
    const scheduledDate = new Date(scheduleInputDateValue + " " + scheduleInputTimeValue);
    const optionsSetDate = { dateStyle: "short" };
    const optionsSetTime = { timeStyle: "short" };
    const optionsSetDay = { weekday: "short" };
    const dateForInfoTextContent = scheduledDate.toLocaleString("pt-BR", optionsSetDate);
    const timeForInfoTextContent = scheduledDate.toLocaleString("pt-BR", optionsSetTime);
    const dayForInfoTextContent = scheduledDate.toLocaleString("pt-BR", optionsSetDay).charAt(0).toUpperCase() + scheduledDate.toLocaleString("pt-BR", optionsSetDay).substring(1).replace(/[.]/g, ",");

    // Inclusão dos dados no campo de informações sobre o agendamento
    const difSeconds = (scheduledDate.getTime() - currentFullDate.getTime()) / 1000;
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
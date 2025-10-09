import { dbAllTasks } from "./save-actions-to-localstorage.js";
import { calculateNumberOfTasks, checkActivatedClassBtnAndFilter } from "./filter-task-by-status.js";
import { tasksContainer } from "./new-task-input.js";
import { saveExpiredTaskAction, saveScheduledTaskAction } from "./save-actions-to-localstorage.js";
import { insertSchedulingInfo, putExpireAlertClass } from "./task-schedule.js";

export default function initRealTimeSchedulingStatus() {

  // Verificação do status do agendamento em tempo real
  setInterval(() => {
    const currentFullDate = new Date();
    const currentDate = currentFullDate.toLocaleDateString("fr-CA");
  
    for (let i = 0; i < dbAllTasks.length; i++) {
      const taskField = tasksContainer.childNodes[i];
      const infoTaskSave = dbAllTasks[i];
  
      if (infoTaskSave.scheduledTask || infoTaskSave.expiredTask) {
        const task = taskField.firstChild
        const taskFront = task.firstChild
        const taskInfo = taskFront.childNodes[2];
        const infoTextContent = taskInfo.firstChild;
        const schedulingRemoveBtn = taskInfo.childNodes[1];
        const scheduleInputDateValue = infoTaskSave.scheduledTask?.[1] ?? infoTaskSave.expiredTask[1];
        const scheduleInputTimeValue = infoTaskSave.scheduledTask?.[2] ?? infoTaskSave.expiredTask[2];
        const scheduledDate = new Date(scheduleInputDateValue + " " + scheduleInputTimeValue);
        const btnField = taskFront.childNodes[1];
        const editBtn = btnField.childNodes[1];
        const difSeconds = (scheduledDate.getTime() - currentFullDate.getTime()) / 1000;
        const difMinutes = difSeconds / 60;
        const difDays = difMinutes / (60 * 24);
        const difGetDayNumber = scheduledDate.getDay() - currentFullDate.getDay();
        const difSecondsCurrentToScheduled = (currentFullDate.getTime() - scheduledDate.getTime()) / 1000;
        const difMinutesCurrentToScheduled = difSecondsCurrentToScheduled / 60;
        const difDaysCurrentToScheduled = difMinutesCurrentToScheduled / (60 * 24);
        const difGetDayNumberCurrentToScheduled = currentFullDate.getDay() - scheduledDate.getDay();
  
        if (difSeconds <= 0) {
          saveExpiredTaskAction(infoTaskSave, scheduleInputDateValue, scheduleInputTimeValue, infoTextContent);
          calculateNumberOfTasks();
          checkActivatedClassBtnAndFilter();
          taskInfo.classList.remove("scheduled");
          taskInfo.classList.remove("expireAlert");
          taskInfo.classList.add("expiredTask");
          taskFront.classList.remove("scheduled");
          taskFront.classList.remove("expireAlert");
          taskFront.classList.add("expiredTask");
          schedulingRemoveBtn.setAttribute("title", "Restaurar");
          editBtn.classList.add("disabledBtn");
          if (currentDate === scheduleInputDateValue) {
            infoTextContent.innerText = "Expirou hoje, " + scheduleInputTimeValue;
          } else if (difDaysCurrentToScheduled < 2 && difGetDayNumber == 6) {
            infoTextContent.innerText = "Expirou ontem, " + scheduleInputTimeValue;
          } else if (difDaysCurrentToScheduled < 2 && difGetDayNumberCurrentToScheduled == 1) {
            infoTextContent.innerText = "Expirou ontem, " + scheduleInputTimeValue;
          } else {
            infoTextContent.innerText = "Expirou " + scheduledDate.toLocaleDateString("pt-BR") + ", " + scheduleInputTimeValue;
          }
        } else {
          insertSchedulingInfo(infoTextContent, difDays, difMinutes, difGetDayNumber, scheduleInputTimeValue, scheduleInputDateValue, currentDate);
        }
        if (!infoTaskSave.expiredTask) {
          saveScheduledTaskAction(infoTaskSave, scheduleInputDateValue, scheduleInputTimeValue, infoTextContent, difMinutes, currentDate, difDays, difGetDayNumber);
        }
        putExpireAlertClass(taskFront, taskInfo, difMinutes, currentDate, difDays, difGetDayNumber, scheduleInputDateValue);
      }
    }
  }, 1000);

}

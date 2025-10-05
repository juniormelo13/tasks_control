let dbAllTasks = []; // Variáveis para guardar tarefas no banco de dados (Local Storage)

function saveCreatedTask(infoTaskSave) {
  infoTaskSave["taskContent"] = newTaskInput.value;
  dbAllTasks.unshift(infoTaskSave);
  localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
}

function saveCompleteTaskAction(infoTaskSave) {
  if (infoTaskSave.deletedInfoTask) {
    delete infoTaskSave.deletedInfoTask;
  }
  clearSavedScheduledTaskInfo(infoTaskSave);
  if (!infoTaskSave.completedTask) {
    infoTaskSave.completedTask = true;
  } else {
    delete infoTaskSave.completedTask;
  }
  localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
}

function clearSavedScheduledTaskInfo(infoTaskSave) {
  if (infoTaskSave.scheduledTask) {
    delete infoTaskSave.scheduledTask;
  }
  if (infoTaskSave.expireAlert) {
    delete infoTaskSave.expireAlert;
  }
  if (infoTaskSave.expiredTask) {
    delete infoTaskSave.expiredTask;
  }
}

function saveScheduledTaskAction(infoTaskSave, scheduleInputDateValue, scheduleInputTimeValue, infoTextContent, difMinutes, currentDate, difDays, difGetDayNumber) {
  if (infoTaskSave.deletedInfoTask && !infoTaskSave.scheduledTask) {
    delete infoTaskSave.deletedInfoTask;
  }
  if (!infoTaskSave.deletedInfoTask) {
    infoTaskSave.scheduledTask = [true, scheduleInputDateValue, scheduleInputTimeValue, infoTextContent.innerText];
    if ((difMinutes > 0 && difMinutes <= 30 && currentDate === scheduleInputDateValue) || (difDays < 2 && difGetDayNumber == 1 && difMinutes > 0 && difMinutes <= 30) || (difDays < 2 && difGetDayNumber == -6 && difMinutes > 0 && difMinutes <= 30)) {
      infoTaskSave.expireAlert = true;
    }
  }
  localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
}

function saveExpiredTaskAction(infoTaskSave, scheduleInputDateValue, scheduleInputTimeValue, infoTextContent) {
  if (!infoTaskSave.deletedInfoTask) {
    delete infoTaskSave.scheduledTask;
    delete infoTaskSave.expireAlert;
    infoTaskSave.expiredTask = [true, scheduleInputDateValue, scheduleInputTimeValue, infoTextContent.innerText];
    localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
  }
}

function saveDeleteTaskAction(infoTaskSave) {
  infoTaskSave.deletedInfoTask = true;
  localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
  setTimeout(() => {
    const index = dbAllTasks.indexOf(infoTaskSave);
    dbAllTasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
    if (dbAllTasks.length < 1) {
      localStorage.removeItem("tasks");
    }
  }, 350);
}
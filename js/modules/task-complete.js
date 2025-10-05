function completeTaskBtnToggle(taskFront, taskContent, checkIcon, checkBtn, scheduleBtn, editBtn, completedTaskIcon, schedulingRemoveBtn) {
  checkIcon.classList.toggle("fa-thumbs-up");
  checkIcon.classList.toggle("fa-rotate");
  checkIcon.classList.toggle("fa-spin");
  if (!taskFront.classList.contains("expiredTask")) {
    editBtn.classList.toggle("disabledBtn");
  }
  if (!taskFront.classList.contains("scheduled") && !taskFront.classList.contains("expiredTask")) {
    scheduleBtn.classList.toggle("disabledBtn");
  }
  completedTaskIcon.classList.toggle("hide");
  schedulingRemoveBtn.classList.toggle("hide");
  taskContent.classList.toggle("completed");
  if (!taskFront.classList.contains("completed")) {
    checkBtn.setAttribute("title", "Restaurar");
  } else {
    checkBtn.setAttribute("title", "Concluir");
  }
}

function putCompletedTask(taskFront, taskInfo, infoTextContent) {
  taskFront.classList.add("completed");
  taskInfo.classList.add("completed");
  taskInfo.classList.remove("hide");
  infoTextContent.innerText = "Tarefa concluída";
}

const completeTaskClick = (taskField, taskFront, taskContent, scheduleBtn, editBtn, checkBtn, checkIcon, taskInfo, infoTextContent, completedTaskIcon, schedulingRemoveBtn, infoTaskSave) => {
  if (taskFront.classList.contains("scheduled")) {
    showConfirmField("Esta tarefa está agendada. Tem certeza de que deseja concluí-la?", confirmCompleteTask);
    function confirmCompleteTask() {
      hideWindow(confirmationWindow);
      setTimeout(() => {
        completeTask(taskField, taskFront, taskContent, checkBtn, checkIcon, editBtn, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, completedTaskIcon, infoTaskSave);
      }, 200);
    }
  } else {
    completeTask(taskField, taskFront, taskContent, checkBtn, checkIcon, editBtn, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, completedTaskIcon, infoTaskSave);
  }
};

function completeTask(taskField, taskFront, taskContent, checkBtn, checkIcon, editBtn, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, completedTaskIcon, infoTaskSave) {
  saveCompleteTaskAction(infoTaskSave);
  transitionClickProtection("add");
  taskField.classList.add("vanishTask");
  setTimeout(() => {
    completeTaskBtnToggle(taskFront, taskContent, checkIcon, checkBtn, scheduleBtn, editBtn, completedTaskIcon, schedulingRemoveBtn);
    if (taskFront.classList.contains("completed")) {
      clearTaskClass(infoTextContent, taskInfo, taskFront);
    } else if (taskFront.classList.contains("scheduled") || taskFront.classList.contains("expiredTask")) {
      clearTaskClass(infoTextContent, taskInfo, taskFront);
      putCompletedTask(taskFront, taskInfo, infoTextContent);
    } else {
      putCompletedTask(taskFront, taskInfo, infoTextContent);
    }
    taskField.classList.remove("vanishTask");
    taskField.classList.add("appearTask");
    calculateNumberOfTasks();
    if (!allTasksFilterBtn.classList.contains("active")) {
      checkActivatedClassBtnAndFilter();
    }
  }, 200);
  setTimeout(() => {
    taskField.classList.remove("appearTask");
    transitionClickProtection("remove");
  }, 400);
}
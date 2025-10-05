// Configuração do botão de remoção do agendamento
const schedulingRemoveClick = (taskField, taskInfo, taskFront, scheduleBtn, editBtn, infoTextContent, infoTaskSave) => {
  taskInfo.classList.add("vanishTaskInfo");
  // Salvar ação no Local Storage
  infoTaskSave.deletedInfoTask = true;
  clearSavedScheduledTaskInfo(infoTaskSave);
  localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
  setTimeout(() => {
    clearTaskClass(infoTextContent, taskInfo, taskFront);
    taskField.classList.add("pointerEventsNone");
    taskInfo.classList.remove("vanishTaskInfo");
    checkActivatedClassBtnAndFilter();
    calculateNumberOfTasks();
  }, 200);
  setTimeout(() => {
    taskField.classList.remove("pointerEventsNone");
    scheduleBtn.classList.remove("disabledBtn");
    editBtn.classList.remove("disabledBtn");
  }, 500);
};
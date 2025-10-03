export default function initFilterTaskByStatus() {
  const allTasksFilterBtn = document.querySelector("#allTasksFilterBtn");
  const pendingTasksFilterBtn = document.querySelector("#pendingTasksFilterBtn");
  const scheduledTasksFilterBtn = document.querySelector("#scheduledTasksFilterBtn");
  const expiredTasksFilterBtn = document.querySelector("#expiredTasksFilterBtn");
  const completedTasksFilterBtn = document.querySelector("#completedTasksFilterBtn");
  const filterContainer = document.querySelector("#filterContainer");
  const filters = filterContainer.children;

  allTasksFilterBtn.classList.add("active");

  function activateFilterBtn(filterBtn) {
    for (const filter of filters) {
      if (filter.classList.contains("active")) {
        filter.classList.remove("active");
      }
    }
    filterBtn.classList.add("active");
  }

  function filterTaskByClass(taskClass) {
    for (i = 0; i < dbAllTasks.length; i++) {
      const infoTaskSave = dbAllTasks[i];
      const taskField = tasksContainer.childNodes[i];
      if (taskClass == "pendingTask") {
        if (infoTaskSave.completedTask) {
          if (!taskField.classList.contains("hide")) {
            taskField.classList.add("hide");
          }
        } else {
          if (taskField.classList.contains("hide")) {
            taskField.classList.remove("hide");
          }
        }
      } else {
        if (!infoTaskSave.hasOwnProperty(taskClass)) {
          if (!taskField.classList.contains("hide")) {
            taskField.classList.add("hide");
          }
        } else {
          if (taskField.classList.contains("hide")) {
            taskField.classList.remove("hide");
          }
        }
      }
    }
    if (taskClass == "pendingTask") {
      filterInformation.innerText = "Pendentes";
      checkTasksOnScreen(pendingTasks);
    } else if (taskClass == "scheduledTask") {
      filterInformation.innerText = "Agendadas";
      checkTasksOnScreen(scheduledTasks);
    } else if (taskClass == "expiredTask") {
      filterInformation.innerText = "Expiradas";
      checkTasksOnScreen(expiredTasks);
    } else if (taskClass == "completedTask") {
      filterInformation.innerText = "Concluídas";
      checkTasksOnScreen(completedTasks);
    }
  }

  allTasksFilterBtn.addEventListener("click", () => {
    cleanInputFilter();
    removeFilter();
    activateFilterBtn(allTasksFilterBtn);
    taskRecover();
  });

  pendingTasksFilterBtn.addEventListener("click", () => {
    cleanInputFilter();
    addFilter();
    activateFilterBtn(pendingTasksFilterBtn);
    filterTaskByClass("pendingTask");
  });

  scheduledTasksFilterBtn.addEventListener("click", () => {
    cleanInputFilter();
    addFilter();
    activateFilterBtn(scheduledTasksFilterBtn);
    filterTaskByClass("scheduledTask");
  });

  expiredTasksFilterBtn.addEventListener("click", () => {
    cleanInputFilter();
    addFilter();
    activateFilterBtn(expiredTasksFilterBtn);
    filterTaskByClass("expiredTask");
  });

  completedTasksFilterBtn.addEventListener("click", () => {
    cleanInputFilter();
    addFilter();
    activateFilterBtn(completedTasksFilterBtn);
    filterTaskByClass("completedTask");
  });
}
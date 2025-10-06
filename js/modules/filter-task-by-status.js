const allTasksFilterBtn = document.querySelector("#allTasksFilterBtn");
const pendingTasksFilterBtn = document.querySelector("#pendingTasksFilterBtn");
const scheduledTasksFilterBtn = document.querySelector("#scheduledTasksFilterBtn");
const expiredTasksFilterBtn = document.querySelector("#expiredTasksFilterBtn");
const completedTasksFilterBtn = document.querySelector("#completedTasksFilterBtn");

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

export default function initFilterTaskByStatus() {
  // Torna ativo o botão que exibe todas as tarefas, logo ao iniciar a aplicação.
  allTasksFilterBtn.classList.add("active");
  // Adiciona o evento de clique em cada botão, com o objetivo de filtrar as tarefas de acordo com seus respectivos status.
  // Mostra todas as tarefas. 
  allTasksFilterBtn.addEventListener("click", () => {
    cleanInputFilter();
    removeFilter();
    activateFilterBtn(allTasksFilterBtn);
    taskRecover();
  });
  // Mostra apenas as tarefas pendentes. 
  pendingTasksFilterBtn.addEventListener("click", () => {
    cleanInputFilter();
    addFilter();
    activateFilterBtn(pendingTasksFilterBtn);
    filterTaskByClass("pendingTask");
  });
  // Mostra apenas as tarefas agendadas. 
  scheduledTasksFilterBtn.addEventListener("click", () => {
    cleanInputFilter();
    addFilter();
    activateFilterBtn(scheduledTasksFilterBtn);
    filterTaskByClass("scheduledTask");
  });
  // Mostra apenas as tarefas expiradas. 
  expiredTasksFilterBtn.addEventListener("click", () => {
    cleanInputFilter();
    addFilter();
    activateFilterBtn(expiredTasksFilterBtn);
    filterTaskByClass("expiredTask");
  });
  // Mostra apenas as tarefas completas. 
  completedTasksFilterBtn.addEventListener("click", () => {
    cleanInputFilter();
    addFilter();
    activateFilterBtn(completedTasksFilterBtn);
    filterTaskByClass("completedTask");
  });
}
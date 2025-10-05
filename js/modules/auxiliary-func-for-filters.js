const searchTaskInput = document.querySelector("#searchTaskInput");
const cleanInputSearchBtn = document.querySelector("#cleanInputSearchBtn");
const filterInformationBox = document.querySelector("#filterInformationBox");
const filterInformation = document.querySelector("#filterInformation");
const noTaskTextContainer = document.querySelector("#noTaskTextContainer"); // Campo com texto para informar o usuário se o campo de tarefas estiver vazio.

let filtred = false;

function cleanInputFilter() {
  searchTaskInput.value = "";
  cleanInputSearchBtn.classList.add("hide");
}

function addFilter() {
  filterInformationBox.classList.remove("filterInfoVanish");
  filterInformationBox.classList.add("filterInfoAppear");
  filtred = true;
}

function removeFilter() {
  filterInformationBox.classList.remove("filterInfoAppear");
  filterInformationBox.classList.add("filterInfoVanish");
  filtred = false;
}

function checkTasksOnScreen(taskClass) {
  if (taskClass.length > 0) {
    if (!noTaskTextContainer.classList.contains("hide")) {
      noTaskTextContainer.classList.add("hide");
    }
  } else {
    if (noTaskTextContainer.classList.contains("hide")) {
      noTaskTextContainer.classList.remove("hide");
    }
  }
}

const filterContainer = document.querySelector("#filterContainer");
const filters = filterContainer.children;

function activateFilterBtn(filterBtn) {
  for (const filter of filters) {
    if (filter.classList.contains("active")) {
      filter.classList.remove("active");
    }
  }
  filterBtn.classList.add("active");
}

function checkActivatedClassBtnAndFilter() {
  if (scheduledTasksFilterBtn.classList.contains("active")) {
    filterTaskByClass("scheduledTask");
  } else if (pendingTasksFilterBtn.classList.contains("active")) {
    filterTaskByClass("pendingTask");
  } else if (expiredTasksFilterBtn.classList.contains("active")) {
    filterTaskByClass("expiredTask");
  } else if (completedTasksFilterBtn.classList.contains("active")) {
    filterTaskByClass("completedTask");
  }
}

const amountAllTasks = document.querySelector("#amountAllTasks");
const amountPendingTasks = document.querySelector("#amountPendingTasks");
const amountScheduledTasks = document.querySelector("#amountScheduledTasks");
const amountExpiredTasks = document.querySelector("#amountExpiredTasks");
const amountCompletedTasks = document.querySelector("#amountCompletedTasks");

let pendingTasks = dbAllTasks.filter((infoTaskSave) => !infoTaskSave.completedTask);
let scheduledTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.scheduledTask);
let expiredTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.expiredTask);
let completedTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.completedTask);

function calculateNumberOfTasks() {
  pendingTasks = dbAllTasks.filter((infoTaskSave) => !infoTaskSave.completedTask);
  scheduledTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.scheduledTask);  
  expiredTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.expiredTask);
  completedTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.completedTask);
  amountAllTasks.innerText = dbAllTasks.length;
  amountPendingTasks.innerText = pendingTasks.length;
  amountScheduledTasks.innerText = scheduledTasks.length;
  amountExpiredTasks.innerText = expiredTasks.length;
  amountCompletedTasks.innerText = completedTasks.length;
}

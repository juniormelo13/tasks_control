import { dbAllTasks } from "./task-recover.js";
import { searchTaskInput, cleanInputSearchBtn } from "./filter-task-by-input-search.js";
import { filterTaskByClass, scheduledTasksFilterBtn, pendingTasksFilterBtn, expiredTasksFilterBtn, completedTasksFilterBtn } from "./filter-task-by-status.js";


export const filterInformationBox = document.querySelector("#filterInformationBox");
export const filterInformation = document.querySelector("#filterInformation");
export const noTaskTextContainer = document.querySelector("#noTaskTextContainer"); // Campo com texto para informar o usuário se o campo de tarefas estiver vazio.

export let filtred = false;

export function cleanInputFilter() {
  searchTaskInput.value = "";
  cleanInputSearchBtn.classList.add("hide");
}

export function addFilter() {
  filterInformationBox.classList.remove("filterInfoVanish");
  filterInformationBox.classList.add("filterInfoAppear");
  filtred = true;
}

export function removeFilter() {
  filterInformationBox.classList.remove("filterInfoAppear");
  filterInformationBox.classList.add("filterInfoVanish");
  filtred = false;
}

export function checkTasksOnScreen(taskClass) {
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

export function activateFilterBtn(filterBtn) {
  for (const filter of filters) {
    if (filter.classList.contains("active")) {
      filter.classList.remove("active");
    }
  }
  filterBtn.classList.add("active");
}

export function checkActivatedClassBtnAndFilter() {
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

export let pendingTasks = dbAllTasks.filter((infoTaskSave) => !infoTaskSave.completedTask);
export let scheduledTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.scheduledTask);
export let expiredTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.expiredTask);
export let completedTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.completedTask);

export function calculateNumberOfTasks() {
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

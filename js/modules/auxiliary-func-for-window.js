import { tasksContainer } from "./new-task-input.js";
import { menu, menuOpen } from "./dropdown-menu.js";
import { filterInformationBox, noTaskTextContainer, filtred } from "./auxiliary-func-for-filters.js";


const header = document.querySelector("#header"); // Cabeçalho da aplicação
const mainContainer = document.querySelector("#mainContainer"); // Container principal do projeto
export const confirmationWindow = document.querySelector("#confirmationWindow");
const confirmationWindowText = document.querySelector("#confirmationWindowText");
const btnYes = document.querySelector("#btnYes");
const btnNo = document.querySelector("#btnNo");

export function showWindow(window) {
  header.classList.add("pointerEventsNone");
  mainContainer.classList.add("pointerEventsNone");
  tasksContainer.classList.add("tasksContainerHide");
  if (!noTaskTextContainer.classList.contains("hide")) {
    noTaskTextContainer.classList.add("noTaskTextHide");
  }
  if (filtred) {
    filterInformationBox.classList.remove("filterInformationOffBlur");
    filterInformationBox.classList.add("filterInformationBlur");
  }
  if (menuOpen) {
    menu.classList.remove("menuOffBlur");
    menu.classList.add("menuBlur");
  }
  window.classList.remove("hide");
  window.classList.add("appearWindow");
}

export function hideWindow(window) {
  tasksContainer.classList.remove("tasksContainerHide");
  tasksContainer.classList.add("tasksContainerAppear");
  if (!noTaskTextContainer.classList.contains("hide")) {
    noTaskTextContainer.classList.remove("noTaskTextHide");
    noTaskTextContainer.classList.add("noTaskTextAppear");
  }
  window.classList.remove("appearWindow");
  window.classList.add("vanishWindow");
  if (filtred) {
    filterInformationBox.classList.remove("filterInformationBlur");
    filterInformationBox.classList.add("filterInformationOffBlur");
  }
  if (menuOpen) {
      menu.classList.remove("menuBlur");
      menu.classList.add("menuOffBlur");
  }
  setTimeout(() => {
    header.classList.remove("pointerEventsNone");
    mainContainer.classList.remove("pointerEventsNone");
    tasksContainer.classList.remove("tasksContainerAppear");
    if (!noTaskTextContainer.classList.contains("hide")) {
      noTaskTextContainer.classList.remove("noTaskTextAppear");
    }
    window.classList.remove("vanishWindow");
    window.classList.add("hide");
  }, 200);
}

export function showConfirmField(text, funct) {
  showWindow(confirmationWindow);
  confirmationWindowText.innerText = text;
  btnYes.focus();
  btnYes.onclick = () => funct();
  btnNo.onclick = () => hideWindow(confirmationWindow);
}

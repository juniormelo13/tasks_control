// Funções auxiliares para as janelas da aplicação.

// Importações.
import { tasksContainer } from "./new-task-input.js";
import { menu, menuOpen } from "./menu.js";
import { filterInformationBox, noTaskTextContainer, filtred } from "./filter-information.js";

export const header = document.querySelector("#header"); // Cabeçalho da aplicação.
const mainContainer = document.querySelector("#mainContainer"); // Container principal da aplicação.
export const confirmationWindow = document.querySelector("#confirmationWindow"); // Janela de confirmação para alguma ação.
const confirmationWindowText = document.querySelector("#confirmationWindowText"); // Texto da janela de confirmação.
const btnYes = document.querySelector("#btnYes"); // Botão de "Sim" da janela de confirmação.
const btnNo = document.querySelector("#btnNo"); // Botão de "Não" da janela de confirmação.

// Função responsável por abrir janelas.
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

// Função responsável por fechar janelas.
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

// Função responsável por abrir a janela de confirmação com todas as informações necessárias.
export function showConfirmField(text, func) {
  showWindow(confirmationWindow);
  confirmationWindowText.innerText = text;
  btnYes.focus();
  btnYes.onclick = () => func();
  btnNo.onclick = () => hideWindow(confirmationWindow);
}

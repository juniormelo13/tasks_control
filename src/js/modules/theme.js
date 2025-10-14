// Funções responsáveis pela troca de tema da aplicação

// Importações
import { scheduleInputDate, scheduleInputTime } from "./task-schedule.js";
import { removeAllConfigBtn, checkRemoveAllConfigBtn } from "./remove-all-config.js";
import { enableBtn } from "./auxiliary-func-for-btn.js";

const html = document.querySelector("html"); // Selecão do HTML
const themeCheckBox = document.querySelector("#themeCheckBox"); // Seleção do input checkbox, que muda o tema ao receber o clique do usuário.

// Função responsável por alterar o tema para escuro.
export function toDarkTheme() {
  html.classList.add("darkTheme");
  scheduleInputDate.classList.add("darkTheme");
  scheduleInputTime.classList.add("darkTheme");
  localStorage.setItem("theme", "darkTheme");
  themeCheckBox.checked = true;
  if (removeAllConfigBtn.disabled) {
    enableBtn(removeAllConfigBtn);
  }
}

// Função responsável por alterar o tema para claro.
export function toLightTheme() {
  html.classList.remove("darkTheme");
  scheduleInputDate.classList.remove("darkTheme");
  scheduleInputTime.classList.remove("darkTheme");
  localStorage.removeItem("theme");
  themeCheckBox.checked = false;
}

// Função principal responsável pela troca de temas pelo usuário.
export default function initChangeTheme() {
    
  themeCheckBox.addEventListener("change", () => {
    if (!html.classList.contains("darkTheme")) {
      toDarkTheme();
    } else {
      toLightTheme();
      checkRemoveAllConfigBtn();
    }
  });

}
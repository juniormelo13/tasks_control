// Configurações para funcionamento do botão de resetar todas as configurações (Padrão de fábrica).

// Importações
import { enableBtn, disableBtn } from "./auxiliary-func-for-btn.js";
import { hideWindow, showConfirmField, confirmationWindow } from "./auxiliary-func-for-window.js";
import { filtred, removeFilter } from "./filter-information.js";
import { activateFilterBtn } from "./filter-task-by-status.js";
import { cleanInputFilter } from "./filter-task-by-input-search.js";
import { removeAllTasks } from "./remove-all-tasks.js";
import { removeImg } from "./profile-photo.js";
import { nameInput, deleteNameDataBase, resetBtnNameInput } from "./username.js";
import { toLightTheme } from "./theme.js";
import { menu } from "./menu.js";

export const removeAllConfigBtn = document.querySelector("#removeAllConfigBtn"); // Botão para restaurar todas as configurações de fábrica.

disableBtn(removeAllConfigBtn); // Botão desabilitado assim que a aplicação é iniciada.

// Função responsável por checar quando o botão deve está habilitado ou não.
export function checkRemoveAllConfigBtn() {
  if (!localStorage.getItem("tasks") && !localStorage.getItem("infoAccountImg") && !localStorage.getItem("infoAccountName") && !localStorage.getItem("theme")) {
    if (!removeAllConfigBtn.disabled) {
      disableBtn(removeAllConfigBtn);
    }
  } else {
    if (removeAllConfigBtn.disabled) {
      enableBtn(removeAllConfigBtn);
    }
  }
}

// Função para fechar a janela de confirmação e concluir o reset.
function confirmRemoveAllConfig() {
  hideWindow(confirmationWindow);
  setTimeout(() => {
    removeAllConfig();
  }, 200);
}

// Função para resetar todas as configurações de fábrica.
function removeAllConfig() {
  if (localStorage.getItem("tasks")) {
    removeAllTasks();
  }
  if (localStorage.getItem("infoAccountImg")) {
    removeImg();
  }
  if (localStorage.getItem("infoAccountName")) {
    deleteNameDataBase();
  }
  if (localStorage.getItem("theme")) {
    toLightTheme();
  }
  if (nameIdentBox.classList.contains("editing")) {
    nameInput.value = "";
    resetBtnNameInput();
  }
  if (filtred) {
    removeFilter();
    cleanInputFilter();
    activateFilterBtn(allTasksFilterBtn);
  }
  disableBtn(removeAllConfigBtn);
}

// Função principal responsável pelo funcionamento do botão de resetar todas as configurações (Padrão de fábrica).
export default function initRemoveAllConfig() {
  
  // Função para abrir a janela de confirmação da ação e resetar todas as configurações de fábrica ao clicar no botão "Sim".
  removeAllConfigBtn.addEventListener("click", () => {
    showConfirmField("Todas as configurações e tarefas serão excluídas. Deseja prosseguir?", confirmRemoveAllConfig);
    menu.classList.add("menuBlur");
  });
  
}
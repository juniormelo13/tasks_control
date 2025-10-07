import { enableBtn, disableBtn } from "./auxiliary-func-for-btn.js";
import { hideWindow, showConfirmField, confirmationWindow } from "./auxiliary-func-for-window.js";
import { filtred, removeFilter, activateFilterBtn, cleanInputFilter } from "./auxiliary-func-for-filters.js";
import { removeAllTasks } from "./remove-all-tasks.js";
import { removeImg } from "./profile-photo.js";
import { nameInput, deleteNameDataBase, resetBtnNameInput } from "./username.js";
import { toLightTheme } from "./change-theme.js";
import { menu } from "./dropdown-menu.js";

// Botão para restaurar todas as configurações de fábrica
export const removeAllConfigBtn = document.querySelector("#removeAllConfigBtn");

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

function confirmRemoveAllConfig() {
  hideWindow(confirmationWindow);
  setTimeout(() => {
    removeAllConfig();
  }, 200);
}

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

export default function initRemoveAllConfig() {

  removeAllConfigBtn.addEventListener("click", () => {
    showConfirmField("Todas as configurações e tarefas serão excluídas. Deseja prosseguir?", confirmRemoveAllConfig);
    menu.classList.add("menuBlur");
  });
  
}
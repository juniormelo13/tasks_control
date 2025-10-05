// Botão para restaurar todas as configurações de fábrica
const removeAllConfigBtn = document.querySelector("#removeAllConfigBtn");

function checkRemoveAllConfigBtn() {
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
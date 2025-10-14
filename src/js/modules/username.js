// Funções e variáveis responsáveis pelo funcionamento do campo de nome do usuário.

// Importações
import { clearEmptyInput } from "./auxiliary-func-for-inputs.js";
import { removeAllConfigBtn, checkRemoveAllConfigBtn } from "./remove-all-config.js";
import { enableBtn } from "./auxiliary-func-for-btn.js";

// Nome do usuário
const nameIdentBox = document.querySelector("#nameIdentBox"); // Campo com o input e botões para adicionar ou excluir nome do usuário.
export const nameInput = document.querySelector("#nameInput"); // Input de texto para inclusão no nome do usuário.
const nameIdentIcon = document.querySelector("#nameIdentIcon"); // ícone para indicar que o campo é editável.
const saveNameButton = document.querySelector("#saveNameButton"); // Botão para salvar o nome do usuário.
const deleteNameButton = document.querySelector("#deleteNameButton"); // Botão para apagar o nome do usuário do input.
const recoverNameButton = document.querySelector("#recoverNameButton"); // Botão para recuperar o último nome do usuário.

// Função para resetar o campo completo, caso o usuário não salve o nome e feche o menu.
export function resetBtnNameInput() {
  saveNameButton.classList.add("hide");
  deleteNameButton.classList.add("hide");
  recoverNameButton.classList.add("hide");
  nameIdentBox.classList.remove("editing");
  nameIdentIcon.classList.remove("hide");
}

// Função para deletar o nome salvo no local storage e do input.
export function deleteNameDataBase() {
  localStorage.removeItem("infoAccountName");
  nameInput.value = "";
  checkRemoveAllConfigBtn()
}

// Função para salvar o nome no local storage.
function saveNameDataBase() {
  localStorage.setItem("infoAccountName", nameInput.value.trim());
  if (removeAllConfigBtn.disabled) {
    enableBtn(removeAllConfigBtn);
  }
}

// Função para salvar o nome ou remover nome (caso o input esteja em branco) ao clicar no botão de "salvar".
function saveOrDeleteName() {
  saveNameButton.classList.add("hide")
  nameIdentBox.classList.remove("editing");
  nameIdentIcon.classList.remove("hide");
  if(nameInput.value.trim() == "") {
    deleteNameDataBase()
    recoverNameButton.classList.add("hide");
  } else {
    saveNameDataBase()
    nameInput.value = localStorage.getItem("infoAccountName");
    deleteNameButton.classList.add("hide");
  }
}

// Função para checar se o campo está preenchido, habilitando ou não os botões de apagar nome do input e recueração do nome.
function checkNameValue() {
  if (nameInput.value.trim() != "") {
    deleteNameButton.classList.remove("hide")
    recoverNameButton.classList.add("hide");
  } else {
    deleteNameButton.classList.add("hide")
    if (localStorage.getItem("infoAccountName")) {
      recoverNameButton.classList.remove("hide")
    }
  }
}

// Função principal para o funcionamento do campo de nome do usuário.
export default function initUsername() {

  saveNameButton.addEventListener("click", () => {
    saveOrDeleteName()
  })

  deleteNameButton.addEventListener("click", () => {
    nameInput.value = "";
    checkNameValue()
    nameInput.focus()
  })

  recoverNameButton.addEventListener("click", () => {
    nameInput.value = localStorage.getItem("infoAccountName")
    checkNameValue()
    nameInput.focus()
  })

  nameInput.onfocus = () => {
    nameIdentIcon.classList.add("hide");
    nameInput.classList.add("active");
    nameIdentBox.classList.add("active");
    nameIdentBox.classList.add("editing");
    saveNameButton.classList.remove("hide");
    checkNameValue()
  };

  nameInput.onkeyup = () => {
    checkNameValue()
  }

  nameInput.onblur = () => {
    nameInput.classList.remove("active");
    nameIdentBox.classList.remove("active");
    if (!nameIdentBox.classList.contains("editing")) {
      nameIdentIcon.classList.remove("hide");
    }
    if (!localStorage.getItem("infoAccountName") && nameInput.value.trim() == "") {
      nameIdentBox.classList.remove("editing");
      nameIdentIcon.classList.remove("hide");
      saveNameButton.classList.add("hide");
    }
    clearEmptyInput(nameInput)
  };

  nameInput.onkeypress = (e) => {
    if (e.key === "Enter") {
      saveOrDeleteName()
      nameInput.blur()
    }
  };
  
}
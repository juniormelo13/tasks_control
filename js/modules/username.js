export default function initUsername() {
  // Nome do usuário
  const nameIdentBox = document.querySelector("#nameIdentBox");
  const nameInput = document.querySelector("#nameInput");
  const nameIdentIcon = document.querySelector("#nameIdentIcon");
  const saveNameButton = document.querySelector("#saveNameButton");
  const deleteNameButton = document.querySelector("#deleteNameButton");
  const recoverNameButton = document.querySelector("#recoverNameButton");

  function resetBtnNameInput() {
    saveNameButton.classList.add("hide");
    deleteNameButton.classList.add("hide");
    recoverNameButton.classList.add("hide");
    nameIdentBox.classList.remove("editing");
    nameIdentIcon.classList.remove("hide");
  }

  function deleteNameDataBase() {
    localStorage.removeItem("infoAccountName");
    nameInput.value = "";
    checkRemoveAllConfigBtn()
  }

  function saveNameDataBase() {
    localStorage.setItem("infoAccountName", nameInput.value.trim());
    if (removeAllConfigBtn.disabled) {
      enableBtn(removeAllConfigBtn);
    }
  }

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

  if (localStorage.getItem("infoAccountName")) {
    nameInput.value = localStorage.getItem("infoAccountName");
  }
}
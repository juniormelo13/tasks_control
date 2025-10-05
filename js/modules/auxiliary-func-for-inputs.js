function checkInputValue(input, cleanBtn) {
  if (input.value.trim() != "") {
    cleanBtn.classList.remove("hide");
    return true;
  } else {
    cleanBtn.classList.add("hide");
    return false;
  }
}

function clearInput(input, cleanBtn) {
  cleanBtn.classList.add("hide");
  input.value = "";
  input.focus();
}

function validateInput(input) {
  if (input.value.trim() != "") {
    return true;
  } else {
    input.classList.add("inputError");
    input.value = "";
    input.blur();
    return false;
  }
}

function clearEmptyInput(input) {
  if (input.value.trim() == "") {
    input.value = "";
  }
}
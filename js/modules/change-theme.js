// Configuração para alternar entre dark/white mode
const html = document.querySelector("html");
const themeCheckBox = document.querySelector("#themeCheckBox");

function toDarkTheme() {
  html.classList.add("darkTheme");
  scheduleInputDate.classList.add("darkTheme");
  scheduleInputTime.classList.add("darkTheme");
  localStorage.setItem("theme", "darkTheme");
  themeCheckBox.checked = true;
  if (removeAllConfigBtn.disabled) {
    enableBtn(removeAllConfigBtn);
  }
}

function toLightTheme() {
  html.classList.remove("darkTheme");
  scheduleInputDate.classList.remove("darkTheme");
  scheduleInputTime.classList.remove("darkTheme");
  localStorage.removeItem("theme");
  themeCheckBox.checked = false;
}

export default function initChangeTheme() {
  
  if (localStorage.getItem("theme")) {
    toDarkTheme();
  }
  
  themeCheckBox.addEventListener("change", () => {
    if (!html.classList.contains("darkTheme")) {
      toDarkTheme();
    } else {
      toLightTheme();
      checkRemoveAllConfigBtn();
    }
  });

}
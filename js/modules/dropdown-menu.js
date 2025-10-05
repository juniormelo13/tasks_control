//Configuração do botão de Menu
const menuBtn = document.querySelector("#menuButton");
const menu = document.querySelector("#menu");
const menuBtnIcon = document.querySelector("#menuButtonIcon");
const menuBtnIconMobile = document.querySelector("#menuButtonIconMobile");
let menuOpen = false;

function menuBtnToggle() {
  menuBtnIcon.classList.toggle("fa-angles-down");
  menuBtnIcon.classList.toggle("fa-xmark");
  menuBtnIconMobile.classList.toggle("fa-angles-left");
  menuBtnIconMobile.classList.toggle("fa-xmark");
  menuBtn.classList.toggle("active");
}

function menuShow() {
  menuOpen = !menuOpen;
  if (localStorage.getItem("infoAccountName")) {
    nameInput.value = localStorage.getItem("infoAccountName");
    resetBtnNameInput()
  } else {
    nameInput.value = ""
    resetBtnNameInput()
  }
  menu.classList.remove("pointerEventsNone");
  menu.classList.remove("hide");
  menu.classList.remove("menuVanish");
  menu.classList.add("menuAppear");
  menuBtnToggle();
  menuBtn.disabled = false;
}

function menuHide() {
  menuOpen = !menuOpen;
  menu.classList.add("pointerEventsNone");
  menu.classList.remove("menuAppear");
  menu.classList.add("menuVanish");
  menuBtn.disabled = true;
  menuBtnToggle();
  setTimeout(() => {
    menu.classList.add("hide");
    menuBtn.disabled = false;
  }, 200);
}

export function initDropdownMenu() {
  menuBtn.addEventListener("click", () => {
    if (!menuOpen) {
      menuShow();
    } else {
      menuHide();
    }
  });

  // Configuração para fechar o menu ao clicar em qualquer local da tela
  document.addEventListener("mousedown", (e) => {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target) && !menuBtnIcon.contains(e.target) && !confirmationWindow.contains(e.target) && menuOpen && !confirmationWindow.classList.contains("appearWindow")) {
      menuHide();
    } else if (confirmationWindow.classList.contains("appearWindow") && menuOpen && !menu.contains(e.target) && !menu.classList.contains("menuBlur")) {
      menuHide();
    }
  })
}


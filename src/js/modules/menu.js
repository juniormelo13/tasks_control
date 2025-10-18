// Funções e variáveis para o funcionamento do menu.

// Importações.
import { nameInput, resetBtnNameInput } from "./username.js";
import { confirmationWindow } from "./auxiliary-func-for-window.js";

const menuBtn = document.querySelector("#menuBtn"); // Botão para abrir e fechar o menu.
export const menu = document.querySelector("#menu"); // Menu.
const menuBtnOpenIcon = document.querySelector("#menuBtnOpenIcon"); // Ícone dentro do botão do menu.
const menuBtnCloseIcon = document.querySelector("#menuBtnCloseIcon"); // Ícone dentro do botão do menu.
export let menuOpen = false; // Variável para guardar o status do menu (aberto ou fechado), a aplicação inicia com o menu fechado.

// Função responsável por alternar características do botão ao abrir ou fechar menu. 
function menuBtnToggle() {
  menuBtnOpenIcon.classList.toggle("active");
  menuBtnCloseIcon.classList.toggle("active");
  menuBtn.classList.toggle("active");
}

// Função responsável por abrir o menu.
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

// Função responsável por fechar o menu.
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

// Função principal responsável pelo funcionamento do menu.
export default function initDropdownMenu() {

  // Abrir e fechar o menu ao clicar no botão.
  menuBtn.addEventListener("click", () => {
    if (!menuOpen) {
      menuShow();
    } else {
      menuHide();
    }
  });

  // Configuração para fechar o menu ao clicar em qualquer local da tela.
  document.addEventListener("mousedown", (e) => {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target) && !menuBtnOpenIcon.contains(e.target) && !confirmationWindow.contains(e.target) && menuOpen && !confirmationWindow.classList.contains("appearWindow")) {
      menuHide();
    } else if (confirmationWindow.classList.contains("appearWindow") && menuOpen && !menu.contains(e.target) && !menu.classList.contains("menuBlur")) {
      menuHide();
    }
  })
  
}


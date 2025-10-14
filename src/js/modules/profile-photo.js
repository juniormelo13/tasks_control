// Funções e variáveis responsáveis pelo funcionamento da inserção e remoção da foto de perfil do usuário.


// Importações das imagens.
import defaultAvatarSrc from "../../assets/images/profile-avatar.png";

// importações dos arquivos javascript (js).
import { menu } from "./menu.js";
import { hideWindow, showConfirmField, confirmationWindow } from "./auxiliary-func-for-window.js";
import { removeAllConfigBtn, checkRemoveAllConfigBtn } from "./remove-all-config.js";
import { enableBtn } from "./auxiliary-func-for-btn.js";

const inputFileImg = document.querySelector("#inputFileImg"); // Campo para carregar imagem ao clicar.
const uploadedImg = document.querySelector("#uploadedImg"); // Variável para guardar a imagem escolhida.
const inputFileImgLabel = document.querySelector("#inputFileImgLabel"); // Label que serve como extensão ao clique do input e para informações ao usuário ("remover foto", "alterar foto").
const inputFileBtnPlus = document.querySelector("#inputFileBtnPlus"); // Botão para adicionar imagem.
const inputFileBtnDel = document.querySelector("#inputFileBtnDel"); // Botão para remover imagem.
let dbInfoAccountImg = []; // Variável responsável por guardar a imagem no local storage.

// Função para alternar botões de adicionar e remover imagens.
function inputFileBtnToggle() {
  inputFileBtnPlus.classList.toggle("hide");
  inputFileBtnDel.classList.toggle("hide");
}

// Função responsável por inserir/alterar a imagem.
function loadImage(e) {
  const filePath = e.target;
  const file = filePath.files;
  const selectedFile = file[0];
  if (file.length > 0 && !selectedFile.type.includes("image")) {
    alert("Por favor selecione uma imagem válida.");
  } else if (file.length > 0) {
    const imgAccountSave = new Object();
    dbInfoAccountImg = [];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      uploadedImg.src = fileReader.result;
      imgAccountSave.img = fileReader.result;
      dbInfoAccountImg.push(imgAccountSave);
      localStorage.setItem("infoAccountImg", JSON.stringify(dbInfoAccountImg));
    };
    fileReader.readAsDataURL(selectedFile);
    inputFileImgLabel.setAttribute("title", "Alterar foto");
    inputFileBtnPlus.classList.add("hide");
    inputFileBtnDel.classList.remove("hide");
    if (removeAllConfigBtn.disabled) {
      enableBtn(removeAllConfigBtn);
    }
    inputFileImg.value = "";
  }
}

// Função responsável por mostrar uma janela de confirmação para o usuário remover ou não a imagem.
function confirmRemoveImg() {
  hideWindow(confirmationWindow);
  setTimeout(() => {
    removeImg();
    checkRemoveAllConfigBtn();
  }, 200);
}

// Função responsável por remover imagem.
export function removeImg() {
  localStorage.removeItem("infoAccountImg");
  uploadedImg.src = defaultAvatarSrc;
  inputFileBtnToggle();
  inputFileImg.setAttribute("title", "Adicionar foto");
}

// Função responsável por recuperar foto de perfil do local storage.
export function profilePhotoRecover() {
  dbInfoAccountImg = JSON.parse(localStorage.getItem("infoAccountImg"));
  uploadedImg.src = dbInfoAccountImg[0].img;
  inputFileImgLabel.setAttribute("title", "Alterar foto");
  inputFileBtnToggle();
}

// Função principal responsável pelo funcionamento da inserção e remoção da foto de perfil do usuário.
export default function initProfilePhoto() {

  // Adiciona o evento que ativa a função de inserir/alterar a foto de perfil ao carregar a imagem escolhida.
  inputFileImg.addEventListener("change", loadImage);
  
  // Remoção da foto de perfil ao clicar no botão.
  inputFileBtnDel.addEventListener("click", () => {
    showConfirmField("Tem certeza de que deseja remover a foto de perfil?", confirmRemoveImg);
    menu.classList.add("menuBlur");
  });
  
}


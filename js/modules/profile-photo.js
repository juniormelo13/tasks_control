import { menu } from "./dropdown-menu.js";
import { hideWindow, showConfirmField, confirmationWindow } from "./auxiliary-func-for-window.js";
import { removeAllConfigBtn, checkRemoveAllConfigBtn } from "./remove-all-config.js";
import { enableBtn } from "./auxiliary-func-for-btn.js";

// Configuração para guardar imagem do perfil do usuário no localStorage
const inputFileImg = document.querySelector("#inputFileImg");
const uploadedImg = document.querySelector("#uploadedImg");
const inputFileImgLabel = document.querySelector("#inputFileImgLabel");
const inputFileBtnPlus = document.querySelector("#inputFileBtnPlus");
const inputFileBtnDel = document.querySelector("#inputFileBtnDel");
let dbInfoAccountImg = [];

function inputFileBtnToggle() {
  inputFileBtnPlus.classList.toggle("hide");
  inputFileBtnDel.classList.toggle("hide");
}

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

export function removeImg() {
  localStorage.removeItem("infoAccountImg");
  uploadedImg.src = "./img/profile-avatar.png";
  inputFileBtnToggle();
  inputFileImg.setAttribute("title", "Adicionar foto");
}

function confirmRemoveImg() {
  hideWindow(confirmationWindow);
  setTimeout(() => {
    removeImg();
    checkRemoveAllConfigBtn();
  }, 200);
}

export function profilePhotoRecover() {
  dbInfoAccountImg = JSON.parse(localStorage.getItem("infoAccountImg"));
  uploadedImg.src = dbInfoAccountImg[0].img;
  inputFileImgLabel.setAttribute("title", "Alterar foto");
  inputFileBtnToggle();
}

export default function initProfilePhoto() {

  inputFileImg.addEventListener("change", loadImage);
  
  inputFileBtnDel.addEventListener("click", () => {
    showConfirmField("Tem certeza de que deseja remover a foto de perfil?", confirmRemoveImg);
    menu.classList.add("menuBlur");
  });
  
}


// Recuperação de todas as tarefas e informações do local storage.

// Importações.
import { nameInput } from "./username.js";
import { profilePhotoRecover } from "./profile-photo.js";
import { toDarkTheme } from "./theme.js";
import { taskRecover } from "./task-recover.js";

// Função principal responsável por recuperar todas as tarefas e informações do local storage.
export default function initAppRecover() {

  // Nome de usuário.
  if (localStorage.getItem("infoAccountName")) {
    nameInput.value = localStorage.getItem("infoAccountName");
  }

  // Foto de perfil do usuário.
  if (localStorage.getItem("infoAccountImg")) {
    profilePhotoRecover()
  }

  // Tema escuro.
  if (localStorage.getItem("theme")) {
    toDarkTheme();
  }
  
  // Tarefas.
  if (localStorage.getItem("tasks")) {
    taskRecover()
  }
  
}
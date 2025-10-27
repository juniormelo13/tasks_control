// Funções e variáveis responsáveis pelo funcionamento da edição de conteúdo das tarefas.

// importações
import { checkInputValue, clearEmptyInput, clearInput, validateInput } from "./auxiliary-func-for-inputs.js";
import { hideWindow, showWindow } from "./auxiliary-func-for-window.js";
import { dbAllTasks } from "./save-actions-to-localstorage.js";
import { includePointerEventsNoneAllTasks } from "./auxiliary-func-for-tasks.js";

export const editField = document.querySelector("#editField"); // Janela para edição das tarefas
export const editInput = document.querySelector("#editInput"); // Input de texto para edição das tarefas
const cleanEditInputBtn = document.querySelector("#cleanEditInputBtn"); // Botão para limpar input texto do campo de edição.
const closeEditFieldBtn = document.querySelector("#closeEditFieldBtn"); // Botão para fechar janela de edição.
export const confirmEditBtn = document.querySelector("#confirmEditBtn"); // Botão de confirmação da edição
const cancelEditBtn = document.querySelector("#cancelEditBtn"); // Botão para cancelar edição e fechar a janela.

editInput.onkeyup = () => checkInputValue(editInput, cleanEditInputBtn); // Checa se o botão de apagar input deve está habilitado ou não.
editInput.onblur = () => clearEmptyInput(editInput); // Limpa input caso o usuário clique várias vezes na barra de espaço.
cleanEditInputBtn.onclick = () => clearInput(editInput, cleanEditInputBtn); // Apaga o texto do input, caso o botão de limpar seja pressionado.
closeEditFieldBtn.onclick = () => hideWindow(editField); // Fecha a janela de edição ao clicar no botão de fechar.
cancelEditBtn.onclick = () => hideWindow(editField); // Fecha a janela de edição ao clicar no botão de cancelar.

// Função responsável por abrir a janela de edição, ao clicar no botão de confirmação a tarefa será editada.
export function editClick(taskContent, infoTaskSave) {
  showWindow(editField);
  editInput.value = taskContent.innerText;
  cleanEditInputBtn.classList.remove("hide");
  confirmEditBtn.onclick = () => editTask(taskContent, infoTaskSave);
  editInput.onkeypress = (e) => {
    if (e.key === "Enter") {
      editTask(taskContent, infoTaskSave);
    }
  };
}

// Função responsável por executar a edição da tarefa.
function editTask(taskContent, infoTaskSave) {
  if (validateInput(editInput)) {
    hideWindow(editField);
    infoTaskSave["taskContent"] = editInput.value;
    localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
    setTimeout(() => {
      taskContent.innerText = editInput.value;
      taskContent.classList.add("editAnimation");
      includePointerEventsNoneAllTasks("add");
    }, 200);
    setTimeout(() => {
      taskContent.classList.remove("editAnimation");
      includePointerEventsNoneAllTasks("remove");
    }, 500);
  }
}

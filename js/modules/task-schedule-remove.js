// Funções responsáveis pelo funcionamento do botão de remoção de agendamentos ou reset de tarefas, caso a mesma esteja expirada.

// importações
import { schedulingRemoveAction } from "./save-actions-to-localstorage.js";
import { calculateNumberOfTasks, checkActivatedClassBtnAndFilter } from "./filter-task-by-status.js";

// Função responsável por limpar todas as características de tarefas agendadas, expiradas ou concluídas.
export function clearTaskClass(infoTextContent, taskInfo, taskFront) {
  if (taskFront.classList.contains("scheduled") || taskFront.classList.contains("expiredTask")) {
    infoTextContent.innerText = ""; // Se a tarefa estiver agendada ou expira, o texto com as informações será apagado.
  }
  if (!taskInfo.classList.contains("hide")) {
    taskInfo.classList.add("hide"); // O campo onde ficam as informações do agendamento será removido.
  }
  if (taskInfo.classList.contains("scheduled")) {
    taskFront.classList.remove("scheduled"); // Remove as características de tarefa agendada da tarefa.
    taskInfo.classList.remove("scheduled"); // Remove as características de tarefa agendada do campo de informações.
  }
  if (taskFront.classList.contains("expireAlert")) {
    taskFront.classList.remove("expireAlert"); // Remove as características de tarefa com alerta da tarefa.
    taskInfo.classList.remove("expireAlert"); // Remove as características de tarefa com alerta do campo de informações.
  }
  if (taskFront.classList.contains("expiredTask")) {
    taskFront.classList.remove("expiredTask"); // Remove as características de tarefa expirada da tarefa.
    taskInfo.classList.remove("expiredTask"); // Remove as características de tarefa expirada do campo de informações.
  }
  if (taskFront.classList.contains("completed")) {
    taskFront.classList.remove("completed"); // Remove as características de tarefa concluída da tarefa.
    taskInfo.classList.remove("completed"); // Remove as características de tarefa concluída do campo de informações.
  }
}

// Função responsável pelo funcionamento do botão de remoção de agendamentos ou reset de tarefas.
export const schedulingRemoveClick = (taskField, taskInfo, taskFront, scheduleBtn, editBtn, infoTextContent, infoTaskSave) => {
  taskInfo.classList.add("vanishTaskInfo"); // inlusão da classe de animação, onde o campo de informações de agendamento será removido.
  schedulingRemoveAction(infoTaskSave) // Remover todos os valores de "tarefa agendada" ou "tarefa expirada" do objeto tarefa no array (Local storage).
  setTimeout(() => {
    clearTaskClass(infoTextContent, taskInfo, taskFront); // Limpa todas as características de tarefas agendadas, expiradas ou concluídas.
    taskField.classList.add("pointerEventsNone"); // Adiciona a classe para impedir o clique na tarefa durante a animação.
    taskInfo.classList.remove("vanishTaskInfo"); // Remove a classe de animação.
    checkActivatedClassBtnAndFilter(); // Checa qual botão do filtro está ativo e atualiza a filtragem quando a tarefa mudar de status.
    calculateNumberOfTasks(); // Calcula a quantidade de tarefas após a mudança de status.
  }, 200);
  setTimeout(() => {
    taskField.classList.remove("pointerEventsNone"); // Remove a classe e permite o clique novamente na tarefa.
    scheduleBtn.classList.remove("disabledBtn"); // Habilita o botão de agendamento de tarefas novamente.
    editBtn.classList.remove("disabledBtn"); // Habilita o botão de edição de tarefas novamente.
  }, 500);
};
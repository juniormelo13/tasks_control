// Funções responsáveis pelo funcionamento da ação de concluir tarefas.

// Importações
import { hideWindow, confirmationWindow, showConfirmField } from "./auxiliary-func-for-window.js";
import { saveCompleteTaskAction } from "./save-actions-to-localstorage.js";
import { transitionClickProtection } from "./auxiliary-func-for-tasks.js";
import { clearTaskClass } from "./task-schedule-remove.js";
import { calculateNumberOfTasks, checkActivatedClassBtnAndFilter } from "./filter-task-by-status.js";
import { allTasksFilterBtn } from "./filter-task-by-status.js";

// Função responsável por alternar os botões que devem ser habilitados ao concluir ou resetar uma tarefa.
function completeTaskBtnToggle(taskFront, taskContent, checkIcon, recoverIcon, checkBtn, scheduleBtn, editBtn, completedTaskIcon, schedulingRemoveBtn) {
  checkIcon.classList.toggle("active");
  recoverIcon.classList.toggle("active");
  if (!taskFront.classList.contains("expiredTask")) {
    editBtn.classList.toggle("disabledBtn");
  }
  if (!taskFront.classList.contains("scheduled") && !taskFront.classList.contains("expiredTask")) {
    scheduleBtn.classList.toggle("disabledBtn");
  }
  completedTaskIcon.classList.toggle("hide");
  schedulingRemoveBtn.classList.toggle("hide");
  taskContent.classList.toggle("completed");
  if (!taskFront.classList.contains("completed")) {
    checkBtn.setAttribute("title", "Restaurar");
  } else {
    checkBtn.setAttribute("title", "Concluir");
  }
}

// Função responsável por adicionar as características visuais de uma tarefa concluída.
function putCompletedTask(taskFront, taskInfo, infoTextContent) {
  taskFront.classList.add("completed");
  taskInfo.classList.add("completed");
  taskInfo.classList.remove("hide");
  infoTextContent.innerText = "Tarefa concluída";
}

// Função responsável por mostrar a janela de confirmação caso a tarefa esteja agendada e chamar a função principal para concluir a tarefa.
export const completeTaskClick = (taskField, taskFront, taskContent, scheduleBtn, editBtn, checkBtn, checkIcon, recoverIcon, taskInfo, infoTextContent, completedTaskIcon, schedulingRemoveBtn, infoTaskSave) => {
  if (taskFront.classList.contains("scheduled")) {
    showConfirmField("Esta tarefa está agendada. Tem certeza de que deseja concluí-la?", confirmCompleteTask); // Abre a janela de confirmação.
    function confirmCompleteTask() {
      hideWindow(confirmationWindow);  // Fecha a janela de confirmação.
      setTimeout(() => {
        completeTask(taskField, taskFront, taskContent, checkBtn, checkIcon, recoverIcon, editBtn, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, completedTaskIcon, infoTaskSave);
      }, 200); // Completa a tarefa.
    }
  } else {
    completeTask(taskField, taskFront, taskContent, checkBtn, checkIcon, recoverIcon, editBtn, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, completedTaskIcon, infoTaskSave);  // Completa a tarefa.
  }
};

// Função responsável por completar ou resetar a tarefa.
function completeTask(taskField, taskFront, taskContent, checkBtn, checkIcon, recoverIcon, editBtn, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, completedTaskIcon, infoTaskSave) {
  saveCompleteTaskAction(infoTaskSave); // Envia as informações de "tarefa concluída" ou "tarefa resetada" ao respectivo objeto da tarefa.
  transitionClickProtection("add"); // Adiciona proteção ao clique nos botões da tarefa durante a transição/animação do status.
  taskField.classList.add("vanishTask"); // Animação da tarefa sair da tela.
  setTimeout(() => {
    completeTaskBtnToggle(taskFront, taskContent, checkIcon, recoverIcon, checkBtn, scheduleBtn, editBtn, completedTaskIcon, schedulingRemoveBtn);
    if (taskFront.classList.contains("completed")) {
      clearTaskClass(infoTextContent, taskInfo, taskFront); // Limpa todas as características de tarefas agendadas, expiradas ou concluídas.
    } else if (taskFront.classList.contains("scheduled") || taskFront.classList.contains("expiredTask")) {
      clearTaskClass(infoTextContent, taskInfo, taskFront);
      putCompletedTask(taskFront, taskInfo, infoTextContent); // Adiciona as características visuais de uma tarefa concluída.
    } else {
      putCompletedTask(taskFront, taskInfo, infoTextContent);
    }
    taskField.classList.remove("vanishTask");
    taskField.classList.add("appearTask"); // Animação da tarefa aparecer da tela.
    calculateNumberOfTasks(); // Calcula a quantidade de tarefas após a mudança de status.
    if (!allTasksFilterBtn.classList.contains("active")) {
      checkActivatedClassBtnAndFilter(); // Checa qual botão está ativo e atualiza a filtragem quando a tarefa muda de status.
    }
  }, 200);
  setTimeout(() => {
    taskField.classList.remove("appearTask");
    transitionClickProtection("remove");
  }, 400);
}
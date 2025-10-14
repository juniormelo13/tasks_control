// Funções e Variáveis responsáveis pelo monitoramento em tempo real das tarefas agendadas e expiradas.

// importações
import { dbAllTasks } from "./save-actions-to-localstorage.js";
import { calculateNumberOfTasks, checkActivatedClassBtnAndFilter } from "./filter-task-by-status.js";
import { tasksContainer } from "./new-task-input.js";
import { saveExpiredTaskAction, saveScheduledTaskAction } from "./save-actions-to-localstorage.js";
import { insertSchedulingInfo, putExpireAlertClass } from "./task-schedule.js";

// Função principal responsável pelo monitoramento em tempo real das tarefas agendadas e expiradas.
export default function initRealTimeSchedulingStatus() {

  // Função dentro do "setInterval", para monitorar a cada 1 segundo e atualizar o status das tarefas agendadas ou expiradas.
  setInterval(() => {
    const currentFullDate = new Date(); // Variável para guardar a data atual completa.
    const currentDate = currentFullDate.toLocaleDateString("fr-CA"); // Variável para guardar a data atual transformada no formato "ano-mês-dia"
    
    // Loop para iterar sobre cada tarefa agendada e expirada da aplicação.
    for (let i = 0; i < dbAllTasks.length; i++) {
      const taskField = tasksContainer.childNodes[i]; // Variável para guardar e referenciar cada caixa de tarefa criada.
      const infoTaskSave = dbAllTasks[i]; // Variável para guardar e referenciar cada tarefa dentro do array de tarefas.
      
      // Condicional para coletar e inserir informações apenas das tarefas agendadas ou expiradas.
      if (infoTaskSave.scheduledTask || infoTaskSave.expiredTask) {
        const task = taskField.firstChild // Variável para guardar e referenciar cada tarefa agendada ou expirada.
        const taskFront = task.firstChild // Variável para guardar e referenciar a frente de cada tarefa agendada ou expirada.
        const taskInfo = taskFront.childNodes[2]; // Campo de informações de agendamento de cada tarefa.
        const infoTextContent = taskInfo.firstChild; // Texto com as informações do agendamento de cada tarefa.
        const schedulingRemoveBtn = taskInfo.childNodes[1]; // Botão de remover agendamento.
        const scheduleInputDateValue = infoTaskSave.scheduledTask?.[1] ?? infoTaskSave.expiredTask[1]; // Primeiro faz uma validação se a tarefa está agendada ou expirada, logo após pega a data salva na tarefa no array, no momento do agendamento.
        const scheduleInputTimeValue = infoTaskSave.scheduledTask?.[2] ?? infoTaskSave.expiredTask[2]; // Primeiro faz uma validação se a tarefa está agendada ou expirada, logo após pega a hora salva na tarefa no array, no momento do agendamento.
        const scheduledDate = new Date(scheduleInputDateValue + " " + scheduleInputTimeValue); // Cria uma nova data com as informações de agendamento coletadas da tarefa no array.
        const btnField = taskFront.childNodes[1]; // botões principais das tarefas.
        const editBtn = btnField.childNodes[1]; // Botão de edição das tarefas.
        const difSeconds = (scheduledDate.getTime() - currentFullDate.getTime()) / 1000; // Diferença em segundos entre a data de agendamento coletada e a data atual.
        const difMinutes = difSeconds / 60;  // Diferença em minutos entre a data de agendamento coletada e a data atual.
        const difDays = difMinutes / (60 * 24);  // Diferença em dias entre a data de agendamento coletada e a data atual.
        const difGetDayNumber = scheduledDate.getDay() - currentFullDate.getDay();  // Diferença entre os dias da semana da data de agendamento coletada e da data atual.
        const difSecondsCurrentToScheduled = (currentFullDate.getTime() - scheduledDate.getTime()) / 1000; // Diferença em segundos entre a data atual e a data de agendamento coletada (Uso para calcular o tempo que a tarefa está expirada).
        const difMinutesCurrentToScheduled = difSecondsCurrentToScheduled / 60; // Diferença em minutos entre a data atual e a data de agendamento coletada (Uso para calcular o tempo que a tarefa está expirada).
        const difDaysCurrentToScheduled = difMinutesCurrentToScheduled / (60 * 24); // Diferença em dias entre a data atual e a data de agendamento coletada (Uso para calcular o tempo que a tarefa está expirada).
        const difGetDayNumberCurrentToScheduled = currentFullDate.getDay() - scheduledDate.getDay(); // Diferença entre os dias da semana da data atual e da data de agendamento coletada (Uso para calcular o tempo que a tarefa está expirada).
        
        // Inserção das informações quando a tarefa expira.
        if (difSeconds <= 0) {
          saveExpiredTaskAction(infoTaskSave, scheduleInputDateValue, scheduleInputTimeValue, infoTextContent); // Salva a ação de tarefa expirada no local storage.
          calculateNumberOfTasks(); // Função para calcular o número de tarefas e atualizar a quantidade de tarefas expiradas.
          checkActivatedClassBtnAndFilter(); // Função que checa o filtro que está ativo e atualiza as tarefas renderizadas na tela logo após a mudança de status de uma tarefa para expirada.
          taskInfo.classList.remove("scheduled");
          taskInfo.classList.remove("expireAlert");
          taskInfo.classList.add("expiredTask");
          taskFront.classList.remove("scheduled");
          taskFront.classList.remove("expireAlert");
          taskFront.classList.add("expiredTask");
          schedulingRemoveBtn.setAttribute("title", "Restaurar");
          editBtn.classList.add("disabledBtn");

          // Inserção das informações na tarefa quando a mesma expira.
          if (currentDate === scheduleInputDateValue) {
            infoTextContent.innerText = "Expirou hoje, " + scheduleInputTimeValue;
          } else if (difDaysCurrentToScheduled < 2 && difGetDayNumber == 6) {
            infoTextContent.innerText = "Expirou ontem, " + scheduleInputTimeValue;
          } else if (difDaysCurrentToScheduled < 2 && difGetDayNumberCurrentToScheduled == 1) {
            infoTextContent.innerText = "Expirou ontem, " + scheduleInputTimeValue;
          } else {
            infoTextContent.innerText = "Expirou " + scheduledDate.toLocaleDateString("pt-BR") + ", " + scheduleInputTimeValue;
          }
        } else {
          // Caso a tarefa não esteja expirada, continua monitorando o status do agendamento.
          insertSchedulingInfo(infoTextContent, difDays, difMinutes, difGetDayNumber, scheduleInputTimeValue, scheduleInputDateValue, currentDate);
        }
        if (!infoTaskSave.expiredTask) {
          // Salvar a ação de agendamento no local storage.
          saveScheduledTaskAction(infoTaskSave, scheduleInputDateValue, scheduleInputTimeValue, infoTextContent, difMinutes, currentDate, difDays, difGetDayNumber);
        }
        // Inserção do alerta para tarefas perto de expirar.
        putExpireAlertClass(taskFront, taskInfo, difMinutes, currentDate, difDays, difGetDayNumber, scheduleInputDateValue);
      }
    }
  }, 1000);

}

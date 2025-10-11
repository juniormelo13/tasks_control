// Funções responsáveis por enviar as ações sobre cada tarefa (Objeto) para o array principal, para controle e envio ao local storage.

// importações
import { newTaskInput } from "./new-task-input.js";

export let dbAllTasks = new Array; // Array principal para guardar todos os objetos (tarefas criadas). Para controle e envio ao local storage.

// Função responsável pela criação do objeto da tarefa.
export function saveCreatedTask(infoTaskSave) {
  infoTaskSave["taskContent"] = newTaskInput.value; // Criação da chave e armazenamento do conteúdo de texto da nova tarefa.
  dbAllTasks.unshift(infoTaskSave); // Inclusão do objeto sempre no primeiro índice [0] do array.
  localStorage.setItem("tasks", JSON.stringify(dbAllTasks)); // Transforma o array em "string" (JSON) e envia para o local storage.
}

// Função responsável por limpar/resetar todas os valores de tarefa agendada, com alerta ou expirada do objeto tarefa. 
export function resetScheduledAndExpiredTaskInfo(infoTaskSave) {
  if (infoTaskSave.scheduledTask) {
    delete infoTaskSave.scheduledTask; // Se o objeto possui valor de "tarefa agendada", o valor será deletado.
  }
  if (infoTaskSave.expireAlert) {
    delete infoTaskSave.expireAlert; // Se o objeto possui valor de "tarefa expirada", o valor será deletado.
  }
  if (infoTaskSave.expiredTask) {
    delete infoTaskSave.expiredTask; // Se o objeto possui valor de "tarefa expirada", o valor será deletado.
  }
}

// Função responsável por enviar as informações de "tarefa concluída" ou "tarefa resetada" ao respectivo objeto da tarefa.
export function saveCompleteTaskAction(infoTaskSave) {
  if (infoTaskSave.deletedInfoTask) {
    delete infoTaskSave.deletedInfoTask; // Se o objeto possui valor de "informações de tarefas deletadas", esse valor será deletado. Utilizado para proteger a aplicação de bug, devido a verificação do status em tempo real.
  }
  resetScheduledAndExpiredTaskInfo(infoTaskSave); // Limpar/resetar todas os valores de tarefa agendada ou expirada.
  if (!infoTaskSave.completedTask) {
    infoTaskSave.completedTask = true; // Se o objeto não possui o valor de "tarefa concluída", o valor será incluído.
  } else {
    delete infoTaskSave.completedTask; // Se o objeto possui valor de "tarefa concluída", o valor será deletado.
  }
  localStorage.setItem("tasks", JSON.stringify(dbAllTasks)); // Transforma o array em "string" (JSON) e envia para o local storage.
}

// Função responsável por enviar as informações de "tarefa agendada" ao respectivo objeto da tarefa.
export function saveScheduledTaskAction(infoTaskSave, scheduleInputDateValue, scheduleInputTimeValue, infoTextContent, difMinutes, currentDate, difDays, difGetDayNumber) {
  if (infoTaskSave.deletedInfoTask && !infoTaskSave.scheduledTask) {
    delete infoTaskSave.deletedInfoTask; // Se o objeto não possui valor de "tarefa agendada" e possui valor de "informações de tarefas deletadas", esse valor será deletado. Utilizado para proteger a aplicação de bug, devido a verificação do status em tempo real.
  }
  if (!infoTaskSave.deletedInfoTask) {
    infoTaskSave.scheduledTask = [true, scheduleInputDateValue, scheduleInputTimeValue, infoTextContent.innerText];  // Se o objeto não possui valor de "informações de tarefas deletadas", inclua as informações de "tarefa agendada" no objeto.
    if ((difMinutes > 0 && difMinutes <= 30 && currentDate === scheduleInputDateValue) || (difDays < 2 && difGetDayNumber == 1 && difMinutes > 0 && difMinutes <= 30) || (difDays < 2 && difGetDayNumber == -6 && difMinutes > 0 && difMinutes <= 30)) {
      infoTaskSave.expireAlert = true; // Dependendo dos valores atuais de data e hora, inclua as informações de "tarefa com alerta" no objeto.
    }
  }
  localStorage.setItem("tasks", JSON.stringify(dbAllTasks)); // Transforma o array em "string" (JSON) e envia para o local storage.
}

// Função responsável por remover todos os valores de "tarefa agendada" ou "tarefa expirada" do objeto tarefa. 
export function schedulingRemoveAction(infoTaskSave) {
  infoTaskSave.deletedInfoTask = true; // inclui o valor de "informações de tarefas deletadas". Utilizado para proteger a aplicação de bug, devido a verificação do status em tempo real.
  resetScheduledAndExpiredTaskInfo(infoTaskSave); // Limpar/resetar todas os valores de tarefa agendada ou expirada.
  localStorage.setItem("tasks", JSON.stringify(dbAllTasks)); // Transforma o array em "string" (JSON) e envia para o local storage.
}

// Função responsável por salvar os valores de "tarefa expirada" ao respectivo objeto da tarefa.
export function saveExpiredTaskAction(infoTaskSave, scheduleInputDateValue, scheduleInputTimeValue, infoTextContent) {
  if (!infoTaskSave.deletedInfoTask) {
    delete infoTaskSave.scheduledTask; // Se o objeto não possui valor de "informações de tarefas deletadas", o valor de "tarefa agendada" será deletado.
    delete infoTaskSave.expireAlert; // Se o objeto não possui valor de "informações de tarefas deletadas", o valor de "tarefa com alerta" será deletado.
    infoTaskSave.expiredTask = [true, scheduleInputDateValue, scheduleInputTimeValue, infoTextContent.innerText];  // Se o objeto não possui valor de "informações de tarefas deletadas", o valor de "tarefa expirada" será incluído.
    localStorage.setItem("tasks", JSON.stringify(dbAllTasks)); // Transforma o array em "string" (JSON) e envia para o local storage.
  }
}

// Função responsável por salvar os valores de "tarefa excluída" ao respectivo objeto da tarefa.
export function saveDeleteTaskAction(infoTaskSave) {
  infoTaskSave.deletedInfoTask = true; // inclui o valor de "informações de tarefas deletadas". Utilizado para proteger a aplicação de bug, devido a verificação do status em tempo real.
  localStorage.setItem("tasks", JSON.stringify(dbAllTasks)); // Transforma o array em "string" (JSON) e envia para o local storage.
  setTimeout(() => {
    const index = dbAllTasks.indexOf(infoTaskSave); // Busca o objeto da tarefa dentro do array através do índice. 
    dbAllTasks.splice(index, 1); // Exclui o objeto do array.
    localStorage.setItem("tasks", JSON.stringify(dbAllTasks)); // Transforma o array em "string" (JSON) e envia para o local storage.
    if (dbAllTasks.length < 1) {
      localStorage.removeItem("tasks"); // Se for o último objeto do array, remove a chave "tarefas" do local storage.
    }
  }, 350);
}
// Campo de texto principal para informar as tarefas que serão adicionadas
const newTaskInput = document.querySelector("#newTaskInput");
newTaskInput.focus();

// Botão para limpar o campo de texto principal
const cleanInputBtn = document.querySelector("#cleanInputBtn");
cleanInputBtn.addEventListener("click", () => {
  newTaskInput.value = "";
  newTaskInput.focus();
});

// Campo onde as novas tarefas serão adicionadas
const tasksContainer = document.querySelector(".tasksContainer");

// Botão para adicionar a nova tarefa
const newTaskBtn = document.querySelector("#newTaskBtn");
newTaskBtn.addEventListener("click", () => {
  // Validação do input principal
  const validateField = () => newTaskInput.value.trim() != "";
  if (!validateField()) {
    // Caso o valor do input seja inválido: Será adicionado a class abaixo no input
    newTaskInput.classList.add("inputError");
    // Evento de foco, para tirar o "erro" do input
    newTaskInput.onfocus = () => {
      if (newTaskInput.classList.contains("inputError")) {
        newTaskInput.classList.remove("inputError");
      }
    };
  } else {
    // Caso o valor do input seja válido: Criação dos parágrafos e botões referentes a cada tarefa adicionada

    // Tarefa
    const taskField = document.createElement("div");
    tasksContainer.insertBefore(taskField, tasksContainer.childNodes[0]);
    taskField.classList.add("taskField");

    // Texto da tarefa
    const taskContent = document.createElement("p");
    taskField.appendChild(taskContent);
    taskContent.innerText = newTaskInput.value;

    // Campo dos botões/ícones
    const btnField = document.createElement("div");
    taskField.appendChild(btnField);
    btnField.classList.add("btnField");

    // Botão para conclusão a tarefa
    const checkBtn = document.createElement("button");
    btnField.appendChild(checkBtn);
    checkBtn.classList.add("checkBtn");
    const checkIcon = document.createElement("i");
    checkBtn.appendChild(checkIcon);
    checkIcon.classList.add("fa-solid");
    checkIcon.classList.add("fa-check");
    checkBtn.setAttribute("title", "Concluir");
    checkBtn.addEventListener("click", () =>
      completeClick(taskField, taskContent, scheduleBtn, editBtn)
    );

    // Botão para agendamento da tarefa
    const scheduleBtn = document.createElement("button");
    btnField.appendChild(scheduleBtn);
    scheduleBtn.classList.add("scheduleBtn");
    const scheduleIcon = document.createElement("i");
    scheduleBtn.appendChild(scheduleIcon);
    scheduleIcon.classList.add("fa-solid");
    scheduleIcon.classList.add("fa-calendar-days");
    scheduleBtn.setAttribute("title", "Agendar");
    scheduleBtn.addEventListener("click", () =>
      scheduleClick(taskField, scheduleBtn)
    );

    //Botão para edição da tarefa
    const editBtn = document.createElement("button");
    btnField.appendChild(editBtn);
    editBtn.classList.add("editBtn");
    const editIcon = document.createElement("i");
    editBtn.appendChild(editIcon);
    editIcon.classList.add("fa-solid");
    editIcon.classList.add("fa-file-pen");
    editBtn.setAttribute("title", "Editar");
    editBtn.addEventListener("click", () => editClick(taskContent));

    // Botão para exclusão da tarefa
    const removeBtn = document.createElement("button");
    btnField.appendChild(removeBtn);
    removeBtn.classList.add("removeBtn");
    const removeIcon = document.createElement("i");
    removeBtn.appendChild(removeIcon);
    removeIcon.classList.add("fa-solid");
    removeIcon.classList.add("fa-trash");
    removeBtn.setAttribute("title", "Excluir");
    removeBtn.addEventListener("click", () => deleteClick(taskField));

    newTaskInput.focus();
    newTaskInput.value = "";
  }
});

// Configuração do botão para conclusão da tarefa
const completeClick = (taskField, taskContent, scheduleBtn, editBtn) => {
  taskContent.classList.toggle("completed");
  taskField.classList.toggle("completed");
  if (!taskField.classList.contains('scheduled')) {
    scheduleBtn.classList.toggle('disabled')
  }
  editBtn.classList.toggle('disabled')
  if (taskField.classList.contains('completed')) {
    tasksContainer.insertBefore(taskField, tasksContainer.childNodes[length - 1])
  } else {
    tasksContainer.insertBefore(taskField, tasksContainer.childNodes[0])
  }
  newTaskInput.focus();
};

// Cabeçalho da aplicação
const header = document.querySelector("#header");

// Conteúdo principal da aplicação
const mainContainer = document.querySelector("#mainContainer");

// Janela para edição das tarefas
const editField = document.querySelector(".editField");

// Input de texto para edição das tarefas
const editInput = document.querySelector("#editInput");

// Função responsável pela abertura da janela de edição
const editClick = (taskContent) => {
  header.classList.add('hide')
  mainContainer.classList.add('hide')
  editField.classList.remove('hide')

  if (newTaskInput.classList.contains("inputError")) {
    newTaskInput.classList.remove("inputError");
  }

  // Evento de foco, para tirar o "erro" do input
  editInput.onfocus = () => {
    if (editInput.classList.contains("inputError")) {
      editInput.classList.remove("inputError");
    }
  };

  editInput.value = taskContent.innerText;
  editInput.select();

  taskContent.classList.add("task");
};

// Função responsável pelo fechamento da janela de edições
const closeEditField = () => {
  header.classList.remove('hide')
  mainContainer.classList.remove('hide')

  if (editInput.classList.contains("inputError")) {
    editInput.classList.remove("inputError");
  }

  document.querySelector(".task").classList.remove("task");

  editField.classList.add('hide')
};

// Adicionado a função de fechamento nos botões de fechar "X" e "Cancelar"
const closeEditFieldBtn = document.querySelector("#closeEditFieldBtn");
closeEditFieldBtn.addEventListener("click", closeEditField);

const cancelEditBtn = document.querySelector("#cancelEditBtn");
cancelEditBtn.addEventListener("click", closeEditField);

// Configuração do botão de limpar o input do campo de edição
const cleanEditInputBtn = document.querySelector("#cleanEditInputBtn");
cleanEditInputBtn.addEventListener("click", () => {
  editInput.value = "";
  editInput.focus();
});

// Configuração do botão de confirmação da edição
const confirmEditBtn = document.querySelector("#confirmEditBtn");
confirmEditBtn.addEventListener("click", () => {
  // Função para validar o input do campo de edição
  const validateEditField = () => editInput.value.trim() != "";
  if (!validateEditField()) {
    // Caso o valor do input seja inválido: Será adicionado a class abaixo no input
    editInput.classList.add("inputError");
  } else {
    // Caso o valor do input seja válido: Será realizado a edição da tarefa conforme config. abaixo
    editField.classList.add('hide')
    header.classList.remove('hide')
    mainContainer.classList.remove('hide')

    document.querySelector(".task").innerText = editInput.value;
    document.querySelector(".task").classList.remove("task");
    newTaskInput.focus();
  }
});

// Janela para agendamento de tarefas
const scheduleField = document.querySelector(".scheduleField");

// Botões para fechar o campo de agendamento - "x" e "Cancelar"
const scheduleFieldCloseBtn = document.querySelector("#scheduleFieldCloseBtn");
const cancelScheduletBtn = document.querySelector("#cancelScheduletBtn");

// Campo para colocar data e hora do agendamento
const scheduleInputDate = document.querySelector("#scheduleInputDate");
const scheduleInputTime = document.querySelector("#scheduleInputTime");

// Botão para confirmação do agendamento
const confirmScheduleBtn = document.querySelector("#confirmScheduleBtn");

// Função responsável pela abertura da janela de agendamento
const scheduleClick = (taskField, scheduleBtn) => {
  header.classList.add('hide')
  mainContainer.classList.add('hide')
  scheduleField.classList.remove('hide')

  const currentDate = new Date();
  
  const optionsForTimeInput = {
    timeStyle: "short",
  };
  
  const currentDateForInput = currentDate.toLocaleDateString("fr-CA");
  const currentTimeForInput = currentDate.toLocaleString("pt-BR", optionsForTimeInput);
  
  scheduleInputDate.value = currentDateForInput;
  scheduleInputDate.setAttribute("min", currentDateForInput);
  scheduleInputTime.value = currentTimeForInput;
  
  scheduleInputDate.onfocus = () => {
    if (scheduleInputDate.classList.contains("inputError")) {
      scheduleInputDate.classList.remove("inputError");
    }
  };
  
  scheduleInputTime.onfocus = () => {
    if (scheduleInputTime.classList.contains("inputError")) {
      scheduleInputTime.classList.remove("inputError");
    }
  }

  confirmScheduleBtn.onclick = () => confirmSchedule(taskField, scheduleBtn)
};

// Função responsável pelo fechamento da janela de agendamento
const closeScheduleField = () => {
  header.classList.remove('hide')
  mainContainer.classList.remove('hide')

  if (scheduleInputDate.classList.contains("inputError")) {
    scheduleInputDate.classList.remove("inputError");
  }

  if (scheduleInputTime.classList.contains("inputError")) {
    scheduleInputTime.classList.remove("inputError");
  }

  scheduleField.classList.add('hide')
  newTaskInput.focus()
};

// Colocando a função nos botões "x" e "Cancelar"
scheduleFieldCloseBtn.addEventListener("click", closeScheduleField);
cancelScheduletBtn.addEventListener("click", closeScheduleField);

// Configuração de botão de confirmação de agendamento
const confirmSchedule = (taskField, scheduleBtn) => {
  const currentDate = new Date()
  const scheduleInputDateValue = scheduleInputDate.value;
  const scheduleInputTimeValue = scheduleInputTime.value;
  const currentDateForValidate = currentDate.toLocaleDateString('fr-CA')
  const optionsForCurrentTime = {
    timeStyle: "short",
  };
  const currentTimeForValidate = currentDate.toLocaleString('pt-BR', optionsForCurrentTime)

  // Cálculo da semana atual
  var oneJan = new Date(currentDate.getFullYear(),0,1);
  var numberOfDays = Math.floor((currentDate - oneJan) / (24 * 60 * 60 * 1000));
  var currentWeek = Math.ceil(( currentDate.getDay() + 1 + numberOfDays) / 7);

  // Funções de validação dos input's de data e hora
  const validateScheduleInputDate = () => scheduleInputDateValue.trim() != "" && scheduleInputDateValue >= currentDateForValidate
  
  const validateScheduleInputTime = () => {
    if (scheduleInputTimeValue.trim() != "" && scheduleInputDateValue > currentDateForValidate) {
      return true
    }
    if (scheduleInputDateValue === currentDateForValidate && scheduleInputTimeValue > currentTimeForValidate) {
      return true
    }
    return false
  } 

  if (!validateScheduleInputDate() && !validateScheduleInputTime()) {
    scheduleInputTime.classList.add("inputError");
    scheduleInputDate.classList.add("inputError");
  } else if (!validateScheduleInputDate()) {
    scheduleInputDate.classList.add("inputError");
  } else if (!validateScheduleInputTime()) {
    scheduleInputTime.classList.add("inputError");
  } else {
    header.classList.remove('hide')
    mainContainer.classList.remove('hide')

    // Criação do campo de informações sobre o agendamento
    const schedulingInfo = document.createElement("div");
    const schedulingTextContent = document.createElement("p");
    const schedulingRemoveBtn = document.createElement("button");
    const schedulingRemoveBtnIcon = document.createElement("i");

    taskField.appendChild(schedulingInfo);
    schedulingInfo.classList.add("schedulingInfo");

    schedulingInfo.appendChild(schedulingTextContent);
    schedulingTextContent.classList.add("schedulingTextContent");

    schedulingInfo.appendChild(schedulingRemoveBtn);
    schedulingRemoveBtn.classList.add("schedulingRemoveBtn");
    schedulingRemoveBtn.setAttribute("title", "Cancelar agendamento");
    schedulingRemoveBtn.addEventListener("click", () => schedulingRemoveClick(schedulingInfo, taskField, scheduleBtn, appointmentDate, appointmentTime));

    schedulingRemoveBtn.appendChild(schedulingRemoveBtnIcon);
    schedulingRemoveBtnIcon.classList.add("fa-solid");
    schedulingRemoveBtnIcon.classList.add("fa-calendar-xmark");
    
    // Recebimento dos valores colocados nos inputs
    const setDateForScheduling = new Date(scheduleInputDateValue + " " + scheduleInputTimeValue);

    // Cálculo da semana em que a tarefa será agendada
    var oneJan = new Date(setDateForScheduling.getFullYear(),0,1);
    var numberOfDays = Math.floor((setDateForScheduling - oneJan) / (24 * 60 * 60 * 1000));
    var schedulingWeek = Math.ceil(( setDateForScheduling.getDay() + 1 + numberOfDays) / 7);
    
    const optionsSetDate = {
      dateStyle: "long"
    }
    const optionsSetTime = {
      timeStyle: "short"
    }
    const optionsSetDay = {
      weekday: "long"
    };
    
    const dateForSchedulingTextContent = setDateForScheduling.toLocaleString("pt-BR", optionsSetDate);
    const timeForSchedulingTextContent = setDateForScheduling.toLocaleString("pt-BR", optionsSetTime);
    const dayForSchedulingTextContent = setDateForScheduling.toLocaleString("pt-BR", optionsSetDay);
    
    // Inclusão dos dados no campo de informações sobre o agendamento
    if (dateForSchedulingTextContent === currentDate.toLocaleString("pt-BR", optionsSetDate)) {
      schedulingTextContent.innerText = "Tarefa agendada para hoje às " + timeForSchedulingTextContent
    } else if (schedulingWeek === currentWeek && setDateForScheduling.getDay() == 0 && currentDate.getDay() == 6) {
      schedulingTextContent.innerText = "Tarefa agendada para amanhã às " + timeForSchedulingTextContent
    } else if (schedulingWeek === currentWeek && setDateForScheduling.getDay() - currentDate.getDay() == 1) {
      schedulingTextContent.innerText = "Tarefa agendada para amanhã às " + timeForSchedulingTextContent
    } else {
      schedulingTextContent.innerText = "Tarefa agendada para " + dayForSchedulingTextContent + ', ' + dateForSchedulingTextContent + ' às ' + timeForSchedulingTextContent
    }

    const appointmentDate = document.createElement('span')
    appointmentDate.classList.add('appointmentDate')
    appointmentDate.classList.add('hide')
    appointmentDate.innerText = scheduleInputDateValue

    const appointmentTime = document.createElement('span')
    appointmentTime.classList.add('appointmentTime')
    appointmentTime.classList.add('hide')
    appointmentTime.innerText = scheduleInputTimeValue

    taskField.appendChild(appointmentDate)
    taskField.appendChild(appointmentTime)
    
    scheduleBtn.classList.add('disabled')
    taskField.classList.add("scheduled");
    scheduleField.classList.add('hide')
    newTaskInput.focus()
  }
};

// Verificação do status do agendamento em tempo real
setInterval(() => {
  const currentFullDate = new Date()

  const currentDate = currentFullDate.toLocaleDateString('fr-CA')
  const optionsForCurrentTime = {
    timeStyle: "short",
  };
  const currentTime = currentFullDate.toLocaleString('pt-BR', optionsForCurrentTime)

  var oneJan = new Date(currentFullDate.getFullYear(),0,1);
  var numberOfDays = Math.floor((currentFullDate - oneJan) / (24 * 60 * 60 * 1000));
  var currentWeek = Math.ceil(( currentFullDate.getDay() + 1 + numberOfDays) / 7);

  const tasks = tasksContainer.childNodes
  for (const task of tasks) {
    if (task.classList.contains('scheduled')) {
      const appointmentDate = task.childNodes[3].innerText
      const appointmentTime = task.childNodes[4].innerText
      const schedulingDate = new Date(appointmentDate + " " + appointmentTime);

      var oneJan = new Date(schedulingDate.getFullYear(),0,1);
      var numberOfDays = Math.floor((schedulingDate - oneJan) / (24 * 60 * 60 * 1000));
      var schedulingWeek = Math.ceil(( schedulingDate.getDay() + 1 + numberOfDays) / 7);
      
      const optionsForScheduleTime = {
        timeStyle: "short"
      }
      const schedulingTimeForText = schedulingDate.toLocaleString("pt-BR", optionsForScheduleTime);
      const schedulingInfo = task.childNodes[2]
      const schedulingTextContent = schedulingInfo.firstChild
      if (currentDate === appointmentDate) {
        schedulingTextContent.innerText = 'Tarefa agendada para hoje às ' + schedulingTimeForText
        console.log('hoje')
        console.log()
        console.log(schedulingTimeForText)
        console.log()
      } else if (currentWeek === schedulingWeek && schedulingDate.getDay() == 0 && currentFullDate.getDay() == 6) {
        schedulingTextContent.innerText = "Tarefa agendada para amanhã às " + schedulingTimeForText
        console.log('amanhã')
      } else if (currentWeek === schedulingWeek && schedulingDate.getDay() - currentFullDate.getDay() == 1) {
        schedulingTextContent.innerText = "Tarefa agendada para amanhã às " + schedulingTimeForText
        console.log('amanhã')
      }
      if (currentDate === appointmentDate && currentTime >= appointmentTime) {
        schedulingTextContent.innerText = 'Tarefa expirada'
        schedulingInfo.classList.add('expiredTask')
        task.classList.add('expiredTask')
        console.log('expirou')
      }
    }
  }
}, 1000);

// Configuração do botão de remoção do agendamento
const schedulingRemoveClick = (schedulingInfo, taskField, scheduleBtn, appointmentDate, appointmentTime) => {
  appointmentDate.remove()
  appointmentTime.remove()
  taskField.classList.remove('scheduled')
  if (taskField.classList.contains('expiredTask')) {
    taskField.classList.remove('expiredTask')
  }
  if (schedulingInfo.classList.contains('expiredTask')) {
    schedulingInfo.classList.remove('expiredTask')
  }
  scheduleBtn.classList.remove('disabled')
  schedulingInfo.remove();
  newTaskInput.focus()
};

// Configuração do botão de exclusão da tarefa
const confirmRemoveTaskField = document.querySelector('#confirmRemoveTaskField')
const btnYes = document.querySelector('#btnYes')
const btnNo = document.querySelector('#btnNo')

const deleteClick = (taskField) => {
  if (taskField.classList.contains('scheduled')) {    
    header.classList.add('hide')
    mainContainer.classList.add('hide')
    confirmRemoveTaskField.classList.remove('hide')

    btnYes.onclick = () => {
      header.classList.remove('hide')
      mainContainer.classList.remove('hide')
      confirmRemoveTaskField.classList.add('hide')

      taskField.remove();
      newTaskInput.focus();
    } 
    
    btnNo.onclick = () => {
      header.classList.remove('hide')
      mainContainer.classList.remove('hide')
      confirmRemoveTaskField.classList.add('hide')
    }
  } else {
    taskField.remove();
    newTaskInput.focus();
  }
};

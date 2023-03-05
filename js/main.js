// Input principal para descrição das tarefas
const newTaskInput = document.querySelector("#newTaskInput");
newTaskInput.focus();

// Botão para limpar o input principal
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
    tasksContainer.appendChild(taskField);
    taskField.classList.add("taskField");

    // Texto da tarefa
    const taskContent = document.createElement("p");
    taskField.appendChild(taskContent);
    taskContent.innerText = newTaskInput.value;

    // Campo dos botões/ícones
    const iconsField = document.createElement("div");
    taskField.appendChild(iconsField);
    iconsField.classList.add("iconsField");

    // Botão para conclusão a tarefa
    const checkBtn = document.createElement("button");
    iconsField.appendChild(checkBtn);
    checkBtn.classList.add("checkBtn");
    const checkIcon = document.createElement("i");
    checkBtn.appendChild(checkIcon);
    checkIcon.classList.add("fa-solid");
    checkIcon.classList.add("fa-check");
    checkBtn.setAttribute("title", "Concluir");
    checkBtn.addEventListener("click", () =>
      completeClick(taskField, taskContent)
    );

    // Botão para agendamento da tarefa
    const scheduleBtn = document.createElement("button");
    iconsField.appendChild(scheduleBtn);
    scheduleBtn.classList.add("scheduleBtn");
    const scheduleIcon = document.createElement("i");
    scheduleBtn.appendChild(scheduleIcon);
    scheduleIcon.classList.add("fa-solid");
    scheduleIcon.classList.add("fa-calendar-days");
    scheduleBtn.setAttribute("title", "Agendar");
    scheduleBtn.addEventListener("click", () =>
      scheduleClick(taskContent, taskField)
    );

    //Botão para edição da tarefa
    const editBtn = document.createElement("button");
    iconsField.appendChild(editBtn);
    editBtn.classList.add("editBtn");
    const editIcon = document.createElement("i");
    editBtn.appendChild(editIcon);
    editIcon.classList.add("fa-solid");
    editIcon.classList.add("fa-file-pen");
    editBtn.setAttribute("title", "Editar");
    editBtn.addEventListener("click", () => editClick(taskContent));

    // Botão para exclusão da tarefa
    const removeBtn = document.createElement("button");
    iconsField.appendChild(removeBtn);
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
const completeClick = (taskField, taskContent) => {
  taskContent.classList.toggle("completed");
  taskField.classList.toggle("completed");
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
  header.style.pointerEvents = "none";
  mainContainer.style.pointerEvents = "none";
  editField.style.display = "block";

  if (newTaskInput.classList.contains("inputError")) {
    newTaskInput.classList.remove("inputError");
  }

  editInput.value = taskContent.innerText;
  editInput.select();

  taskContent.classList.add("task");
};

// Função responsável pelo fechamento da janela de edições
const closeEditField = () => {
  header.style.pointerEvents = "auto";
  mainContainer.style.pointerEvents = "auto";

  if (editInput.classList.contains("inputError")) {
    editInput.classList.remove("inputError");
  }

  editField.style.display = "none";

  document.querySelector(".task").classList.remove("task");
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
    // Evento de foco, para tirar o "erro" do input
    editInput.onfocus = () => {
      if (editInput.classList.contains("inputError")) {
        editInput.classList.remove("inputError");
      }
    };
  } else {
    // Caso o valor do input seja válido: Será realizado a edição da tarefa conforme config. abaixo
    editField.style.display = "none";
    header.style.pointerEvents = "auto";
    mainContainer.style.pointerEvents = "auto";

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

// Botões para agendamento rápido de tarefas
const quickScheduleBtn30m = document.querySelector("#quickScheduleBtn30m");
const quickScheduleBtn1h = document.querySelector("#quickScheduleBtn1h");
const quickScheduleBtn2h = document.querySelector("#quickScheduleBtn2h");

// Campo para colocar data e hora do agendamento
const scheduleInput = document.querySelector("#scheduleInput");

// Botão para confirmação do agendamento
const confirmScheduleBtn = document.querySelector("#confirmScheduleBtn");

// Função responsável pela abertura da janela de agendamento
const scheduleClick = (taskContent, taskField) => {
  header.style.pointerEvents = "none";
  mainContainer.style.pointerEvents = "none";
  scheduleField.style.display = "block";

  const now = new Date();

  let date = now.getDate();
  if (date < 10) {
    date = "0" + date;
  }
  let month = now.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  const year = now.getFullYear();
  let hour = now.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }

  scheduleInput.value =
    year + "-" + month + "-" + date + "T" + hour + ":" + minute;

  taskField.classList.add('readyForScheduling')
};

// Função responsável pelo fechamento da janela de agendamento
const closeScheduleField = () => {
  header.style.pointerEvents = "auto";
  mainContainer.style.pointerEvents = "auto";

  if (scheduleInput.classList.contains("inputError")) {
    scheduleInput.classList.remove("inputError");
  }

  document.querySelector('.readyForScheduling').classList.remove('readyForScheduling')

  scheduleField.style.display = "none";
};

// Colocando a função nos botões "x" e "Cancelar"
scheduleFieldCloseBtn.addEventListener("click", closeScheduleField);
cancelScheduletBtn.addEventListener("click", closeScheduleField);

// Configuração de botão de confirmação de agendamento
confirmScheduleBtn.addEventListener("click", () => {
  // Função de validação do input de data e hora
  const validateScheduleInput = () => scheduleInput.value.trim() != "";
  if (!validateScheduleInput()) {
    // Configuração caso não seja válido
    scheduleInput.classList.add("inputError");
    // Remoção do "erro" no input
    scheduleInput.onfocus = () => {
      if (scheduleInput.classList.contains("inputError")) {
        scheduleInput.classList.remove("inputError");
      }
    };
  } else {
    // Configuração caso o valor do input seja válido
    header.style.pointerEvents = "auto";
    mainContainer.style.pointerEvents = "auto";

    const schedulingInfo = document.createElement('div')
    const schedulingTextContent = document.createElement('p')
    const schedulingRemoveBtn = document.createElement('button')
    const schedulingRemoveBtnIcon = document.createElement('i')

    document.querySelector('.readyForScheduling').appendChild(schedulingInfo)
    schedulingInfo.classList.add('schedulingInfo')

    schedulingInfo.appendChild(schedulingTextContent)
    schedulingTextContent.classList.add('schedulingTextContent')

    schedulingInfo.appendChild(schedulingRemoveBtn)
    schedulingRemoveBtn.classList.add('schedulingRemoveBtn')
    schedulingRemoveBtn.setAttribute('title', 'Cancelar agendamento')
    schedulingRemoveBtn.addEventListener('click', () => schedulingRemoveClick(schedulingInfo))

    schedulingRemoveBtn.appendChild(schedulingRemoveBtnIcon)
    schedulingRemoveBtnIcon.classList.add('fa-solid')
    schedulingRemoveBtnIcon.classList.add('fa-calendar-xmark')

    schedulingTextContent.innerText = 'Agendou'
    
    document.querySelector('.readyForScheduling').classList.remove('readyForScheduling')

    scheduleField.style.display = "none";
  }
});

const schedulingRemoveClick = (schedulingInfo) => {
  schedulingInfo.remove()
}

// Configuração do botão de exclusão da tarefa
const deleteClick = (taskField) => {
  taskField.remove();
  newTaskInput.focus();
};

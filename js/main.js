// Cabeçalho da aplicação
const header = document.querySelector("#header");

// Campo de texto principal para informar as tarefas que serão adicionadas
const newTaskInput = document.querySelector("#newTaskInput");

// Focar no input ao carregar página
newTaskInput.focus();

// Campo onde as novas tarefas serão adicionadas
const tasksContainer = document.querySelector("#tasksContainer");

// Botão para exclusão de todas as tarefas
const removeAllTaskBtn = document.querySelector("#removeAllTaskBtn");

// Botão para restaurar todas as configurações de fábrica
const removeAllConfigBtn = document.querySelector("#removeAllConfigBtn");

// Função para identificar se o campo de tarefas está vazio
const noTaskTextContainer = document.querySelector("#noTaskTextContainer");

// Container principal do projeto
const mainContainer = document.querySelector("#mainContainer");

// Janela para edição das tarefas
const editField = document.querySelector("#editField");

// Input de texto para edição das tarefas
const editInput = document.querySelector("#editInput");

// Configuração do botão de confirmação da edição
const confirmEditBtn = document.querySelector("#confirmEditBtn");

// Variáveis da janela de confirmação
const confirmationWindow = document.querySelector("#confirmationWindow");
const confirmationWindowText = document.querySelector("#confirmationWindowText");
const btnYes = document.querySelector("#btnYes");
const btnNo = document.querySelector("#btnNo");

// Variáveis para guardar tarefas no banco de dados (Local Storage)
let dbAllTasks = [];

// Variáveis dos filtros das tarefas
const filterContainer = document.querySelector("#filterContainer");
const allTasksFilterBtn = document.querySelector("#allTasksFilterBtn");
const pendingTasksFilterBtn = document.querySelector("#pendingTasksFilterBtn");
const scheduledTasksFilterBtn = document.querySelector("#scheduledTasksFilterBtn");
const expiredTasksFilterBtn = document.querySelector("#expiredTasksFilterBtn");
const completedTasksFilterBtn = document.querySelector("#completedTasksFilterBtn");
const amountAllTasks = document.querySelector("#amountAllTasks");
const amountPendingTasks = document.querySelector("#amountPendingTasks");
const amountScheduledTasks = document.querySelector("#amountScheduledTasks");
const amountExpiredTasks = document.querySelector("#amountExpiredTasks");
const amountCompletedTasks = document.querySelector("#amountCompletedTasks");
const filterInformationBox = document.querySelector("#filterInformationBox");
const filterInformation = document.querySelector("#filterInformation");
const cleanFilterBtn = document.querySelector("#cleanFilterBtn");
const searchTaskInput = document.querySelector("#searchTaskInput");
const cleanInputSearchBtn = document.querySelector("#cleanInputSearchBtn");
let filtred = false;
let containsHide = [];
const filters = filterContainer.children;
let pendingTasks = dbAllTasks.filter((infoTaskSave) => !infoTaskSave.completedTask);
let scheduledTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.scheduledTask);
let expiredTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.expiredTask);
let completedTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.completedTask);

// recuperação das tarefas e outras informações do banco de dados
taskRecover();

//Configuração do botão de Menu
const menuBtn = document.querySelector("#menuButton");
const menu = document.querySelector("#menu");
const menuBtnIcon = document.querySelector("#menuButtonIcon");
const menuBtnIconMobile = document.querySelector("#menuButtonIconMobile");
let menuOpen = false;

function menuBtnToggle() {
  menuBtnIcon.classList.toggle("fa-angles-down");
  menuBtnIcon.classList.toggle("fa-xmark");
  menuBtnIconMobile.classList.toggle("fa-angles-left");
  menuBtnIconMobile.classList.toggle("fa-xmark");
  menuBtn.classList.toggle("active");
}

function menuShow() {
  menuOpen = !menuOpen;
  menu.classList.remove("pointerEventsNone");
  menu.classList.remove("hide");
  menu.classList.remove("menuVanish");
  menu.classList.add("menuAppear");
  menuBtnToggle();
  menuBtn.disabled = false;
}

function menuHide() {
  menuOpen = !menuOpen;
  menu.classList.add("pointerEventsNone");
  menu.classList.remove("menuAppear");
  menu.classList.add("menuVanish");
  menuBtn.disabled = true;
  menuBtnToggle();
  setTimeout(() => {
    menu.classList.add("hide");
    menuBtn.disabled = false;
  }, 200);
}

menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    menuShow();
  } else {
    menuHide();
  }
});

// Configuração para fechar o menu ao clicar em qualquer local da tela

document.addEventListener("mousedown", (e) => {
  if (!menu.contains(e.target) && !menuBtn.contains(e.target) && !menuBtnIcon.contains(e.target) && !confirmationWindow.contains(e.target) && menuOpen && !confirmationWindow.classList.contains("appearWindow")) {
    menuHide();
  } else if (confirmationWindow.classList.contains("appearWindow") && menuOpen && !menu.contains(e.target) && !menu.classList.contains("menuBlur")) {
    menuHide();
  }
})

// Configuração para remover erros dos inputs

document.addEventListener("click", (e) => {
  if (newTaskInput.classList.contains("inputError") && !newTaskBtn.contains(e.target)) {
    newTaskInput.classList.remove("inputError");
  } else if (editInput.classList.contains("inputError") && !confirmEditBtn.contains(e.target)) {
    editInput.classList.remove("inputError");
  } else if (scheduleInputDate.classList.contains("inputError") && !confirmScheduleBtn.contains(e.target)) {
    scheduleInputDate.classList.remove("inputError");
  } else if (scheduleInputTime.classList.contains("inputError") && !confirmScheduleBtn.contains(e.target)) {
    scheduleInputTime.classList.remove("inputError");
  }
});

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

if (localStorage.getItem("infoAccountImg")) {
  dbInfoAccountImg = JSON.parse(localStorage.getItem("infoAccountImg"));
  uploadedImg.src = dbInfoAccountImg[0].img;
  inputFileImgLabel.setAttribute("title", "Alterar foto");
  inputFileBtnToggle();
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

inputFileImg.addEventListener("change", loadImage);
inputFileBtnDel.addEventListener("click", () => {
  showConfirmField("Tem certeza de que deseja remover a foto de perfil?", confirmRemoveImg);
  menu.classList.add("menuBlur");
});

function removeImg() {
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

// Nome do usuário
const nameInput = document.querySelector("#nameInput");
const nameIdentIcon = document.querySelector("#nameIdentIcon");
const saveNameButton = document.querySelector("#saveNameButton");
const deleteNameButton = document.querySelector("#deleteNameButton");
const nameIdentBox = document.querySelector("#nameIdentBox");

if (localStorage.getItem("infoAccountName")) {
  nameInput.value = localStorage.getItem("infoAccountName");
}

nameInput.onkeypress = (e) => {
  if (e.key === "Enter") {
    saveOrDeleteName()
    nameInput.blur()
  }
};

nameInput.onfocus = () => {
  nameIdentIcon.classList.add("hide");
  saveNameButton.classList.remove("hide");
  checkInputValue(nameInput, deleteNameButton)
  nameInput.classList.add("active");
  nameIdentBox.classList.add("active");
};

nameInput.onkeyup = () => {
  checkInputValue(nameInput, deleteNameButton)
}

nameInput.onblur = () => {
  nameIdentIcon.classList.remove("hide");
  nameInput.classList.remove("active");
  nameIdentBox.classList.remove("active");
  clearEmptyInput(nameInput)
};

saveNameButton.addEventListener("click", () => {
  saveOrDeleteName()
})

function saveOrDeleteName() {
  saveNameButton.classList.add("hide")
  if(nameInput.value.trim() == "") {
    deleteName()
    nameInput.value = "";
    saveNameButton.classList.add("hide")
  } else {
    saveName()
    deleteNameButton.classList.add("hide")
  }
}

deleteNameButton.addEventListener("click", () => {
  nameInput.value = "";
  deleteNameButton.classList.add("hide")
  nameInput.focus()
})

function deleteName() {
  localStorage.removeItem("infoAccountName");
  checkRemoveAllConfigBtn()
}

function saveName() {
  localStorage.setItem("infoAccountName", nameInput.value.trim());
  if (removeAllConfigBtn.disabled) {
    enableBtn(removeAllConfigBtn);
  }
}

// Configuração dos filtros das tarefas
allTasksFilterBtn.classList.add("active");

function cleanInputFilter() {
  searchTaskInput.value = "";
  cleanInputSearchBtn.classList.add("hide");
}

function removeFilter() {
  filterInformationBox.classList.remove("filterInfoAppear");
  filterInformationBox.classList.add("filterInfoVanish");
  filtred = false;
}

function addFilter() {
  filterInformationBox.classList.remove("filterInfoVanish");
  filterInformationBox.classList.add("filterInfoAppear");
  filtred = true;
}

function calculateNumberOfTasks() {
  pendingTasks = dbAllTasks.filter((infoTaskSave) => !infoTaskSave.completedTask);
  scheduledTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.scheduledTask);  
  expiredTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.expiredTask);
  completedTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.completedTask);
  amountAllTasks.innerText = dbAllTasks.length;
  amountPendingTasks.innerText = pendingTasks.length;
  amountScheduledTasks.innerText = scheduledTasks.length;
  amountExpiredTasks.innerText = expiredTasks.length;
  amountCompletedTasks.innerText = completedTasks.length;
}

function activateFilterBtn(filterBtn) {
  for (const filter of filters) {
    if (filter.classList.contains("active")) {
      filter.classList.remove("active");
    }
  }
  filterBtn.classList.add("active");
}

function checkTasksOnScreen(taskClass) {
  if (taskClass.length > 0) {
    if (!noTaskTextContainer.classList.contains("hide")) {
      noTaskTextContainer.classList.add("hide");
    }
  } else {
    if (noTaskTextContainer.classList.contains("hide")) {
      noTaskTextContainer.classList.remove("hide");
    }
  }
}

function filterTaskByClass(taskClass) {
  for (i = 0; i < dbAllTasks.length; i++) {
    const infoTaskSave = dbAllTasks[i];
    const taskField = tasksContainer.childNodes[i];
    if (taskClass == "pendingTask") {
      if (infoTaskSave.completedTask) {
        if (!taskField.classList.contains("hide")) {
          taskField.classList.add("hide");
        }
      } else {
        if (taskField.classList.contains("hide")) {
          taskField.classList.remove("hide");
        }
      }
    } else {
      if (!infoTaskSave.hasOwnProperty(taskClass)) {
        if (!taskField.classList.contains("hide")) {
          taskField.classList.add("hide");
        }
      } else {
        if (taskField.classList.contains("hide")) {
          taskField.classList.remove("hide");
        }
      }
    }
  }
  if (taskClass == "pendingTask") {
    filterInformation.innerText = "Pendentes";
    checkTasksOnScreen(pendingTasks);
  } else if (taskClass == "scheduledTask") {
    filterInformation.innerText = "Agendadas";
    checkTasksOnScreen(scheduledTasks);
  } else if (taskClass == "expiredTask") {
    filterInformation.innerText = "Expiradas";
    checkTasksOnScreen(expiredTasks);
  } else if (taskClass == "completedTask") {
    filterInformation.innerText = "Concluídas";
    checkTasksOnScreen(completedTasks);
  }
}

function checkActivatedClassBtnAndFilter() {
  if (scheduledTasksFilterBtn.classList.contains("active")) {
    filterTaskByClass("scheduledTask");
  } else if (pendingTasksFilterBtn.classList.contains("active")) {
    filterTaskByClass("pendingTask");
  } else if (expiredTasksFilterBtn.classList.contains("active")) {
    filterTaskByClass("expiredTask");
  } else if (completedTasksFilterBtn.classList.contains("active")) {
    filterTaskByClass("completedTask");
  }
}

function checkInputValue(input, Btn) {
  if (input.value.trim() != "") {
    Btn.classList.remove("hide");
    return true;
  } else {
    Btn.classList.add("hide");
    return false;
  }
}

function validateInput(input) {
  if (input.value.trim() != "") {
    return true;
  } else {
    input.classList.add("inputError");
    input.value = "";
    input.blur();
    return false;
  }
}

searchTaskInput.onkeyup = () => {
  if (checkInputValue(searchTaskInput, cleanInputSearchBtn)) {
    if (searchTaskInput.value.length >= 1) {
      filterInformation.innerText = searchTaskInput.value.trim();
    }
    if (!allTasksFilterBtn.classList.contains("active")) {
      activateFilterBtn(allTasksFilterBtn);
      taskRecover();
    }
    addFilter();
    filterTaskByInput();
  } else {
    if (filtred) {
      removeFilter();
      taskRecover();
    }
  }
};

function filterTaskByInput() {
  containsHide = [];
  for (let i = 0; i < dbAllTasks.length; i++) {
    const infoTaskSave = dbAllTasks[i];
    const taskField = tasksContainer.childNodes[i];
    if (!infoTaskSave.taskContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchTaskInput.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
      containsHide.push("true");
      if (!taskField.classList.contains("hide")) {
        taskField.classList.add("hide");
      }
    } else {
      containsHide.push("false");
      if (taskField.classList.contains("hide")) {
        taskField.classList.remove("hide");
      }
    }
  }
  if (!containsHide.includes("false")) {
    noTaskTextContainer.classList.remove("hide");
  } else {
    noTaskTextContainer.classList.add("hide");
  }
}

cleanInputSearchBtn.addEventListener("click", () => {
  searchTaskInput.focus();
  cleanInputFilter();
  removeFilter();
  activateFilterBtn(allTasksFilterBtn);
  taskRecover();
});

cleanFilterBtn.addEventListener("click", () => {
  cleanInputFilter();
  removeFilter();
  activateFilterBtn(allTasksFilterBtn);
  taskRecover();
});

allTasksFilterBtn.addEventListener("click", () => {
  cleanInputFilter();
  removeFilter();
  activateFilterBtn(allTasksFilterBtn);
  taskRecover();
});

pendingTasksFilterBtn.addEventListener("click", () => {
  cleanInputFilter();
  addFilter();
  activateFilterBtn(pendingTasksFilterBtn);
  filterTaskByClass("pendingTask");
});

scheduledTasksFilterBtn.addEventListener("click", () => {
  cleanInputFilter();
  addFilter();
  activateFilterBtn(scheduledTasksFilterBtn);
  filterTaskByClass("scheduledTask");
});

expiredTasksFilterBtn.addEventListener("click", () => {
  cleanInputFilter();
  addFilter();
  activateFilterBtn(expiredTasksFilterBtn);
  filterTaskByClass("expiredTask");
});

completedTasksFilterBtn.addEventListener("click", () => {
  cleanInputFilter();
  addFilter();
  activateFilterBtn(completedTasksFilterBtn);
  filterTaskByClass("completedTask");
});

// ----- Input principal -----
const newTaskBtn = document.querySelector("#newTaskBtn");
const cleanNewTaskInputBtn = document.querySelector("#cleanNewTaskInputBtn");

newTaskInput.onkeyup = () => checkInputValue(newTaskInput, cleanNewTaskInputBtn);
cleanNewTaskInputBtn.onclick = () => clearInput(newTaskInput, cleanNewTaskInputBtn);

function clearInput(input, cleanBtn) {
  cleanBtn.classList.add("hide");
  input.value = "";
  input.focus();
}

// Botão para adicionar a nova tarefa
newTaskBtn.addEventListener("click", () => {
  if (validateInput(newTaskInput)) {
    cleanNewTaskInputBtn.classList.add("hide");
    prepareAndInsertTask();
  }
});

newTaskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (validateInput(newTaskInput)) {
      prepareAndInsertTask();
    }
  }
});

function clearEmptyInput(input) {
  if (input.value.trim() == "") {
    input.value = "";
  }
}

newTaskInput.onblur = () => {
  clearEmptyInput(newTaskInput);
};

editInput.onblur = () => {
  clearEmptyInput(editInput);
};

searchTaskInput.onblur = () => {
  clearEmptyInput(searchTaskInput);
};

function prepareAndInsertTask() {
  const infoTaskSave = new Object();
  const taskField = document.createElement("div");
  const task = document.createElement("div");
  const taskFront = document.createElement("div");
  if (filtred) {
    cleanInputFilter();
    activateFilterBtn(pendingTasksFilterBtn);
    filterTaskByClass("pendingTask");
    insertTask(taskField, task, taskFront, infoTaskSave);
  } else {
    insertTask(taskField, task, taskFront, infoTaskSave);
  }
  calculateNumberOfTasks();
  checkTasksOnScreen(dbAllTasks);
  checkRemoveAllTaskBtn();
  checkRemoveAllConfigBtn();
}

function insertTask(taskField, task, taskFront, infoTaskSave) {
  saveCreatedTask(infoTaskSave);
  taskConstructor(taskField, task, taskFront, infoTaskSave);
  taskField.classList.add("appearTask");
  tasksContainer.insertBefore(taskField, tasksContainer.childNodes[0]);
  setTimeout(() => {
    taskField.classList.remove("appearTask");
  }, 200);
}

// Configuração do botão para conclusão da tarefa
const completeTaskClick = (taskField, taskFront, taskContent, scheduleBtn, editBtn, checkBtn, checkIcon, taskInfo, infoTextContent, completedTaskIcon, schedulingRemoveBtn, infoTaskSave) => {
  if (taskFront.classList.contains("scheduled")) {
    showConfirmField("Esta tarefa possui um agendamento, tem certeza que deseja concluí-la?", confirmCompleteTask);
    function confirmCompleteTask() {
      hideWindow(confirmationWindow);
      setTimeout(() => {
        completeTask(taskField, taskFront, taskContent, checkBtn, checkIcon, editBtn, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, completedTaskIcon, infoTaskSave);
      }, 200);
    }
  } else {
    completeTask(taskField, taskFront, taskContent, checkBtn, checkIcon, editBtn, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, completedTaskIcon, infoTaskSave);
  }
};

// Edição de tarefas
const cleanEditInputBtn = document.querySelector("#cleanEditInputBtn");
const closeEditFieldBtn = document.querySelector("#closeEditFieldBtn");
const cancelEditBtn = document.querySelector("#cancelEditBtn");

editInput.onkeyup = () => checkInputValue(editInput, cleanEditInputBtn);
cleanEditInputBtn.onclick = () => clearInput(editInput, cleanEditInputBtn);
closeEditFieldBtn.onclick = () => hideWindow(editField);
cancelEditBtn.onclick = () => hideWindow(editField);

function editClick(taskContent, infoTaskSave) {
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

// Agendamento de tarefas
const scheduleField = document.querySelector("#scheduleField");
const scheduleFieldCloseBtn = document.querySelector("#scheduleFieldCloseBtn");
const cancelScheduletBtn = document.querySelector("#cancelScheduletBtn");
const scheduleInputDate = document.querySelector("#scheduleInputDate");
const scheduleInputTime = document.querySelector("#scheduleInputTime");
const confirmScheduleBtn = document.querySelector("#confirmScheduleBtn");

function scheduleClick(task, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, infoTaskSave, btnField) {
  const currentFullDate = new Date();
  const optionsForTimeInput = {
    timeStyle: "short",
  };
  const currentDateForInput = currentFullDate.toLocaleDateString("fr-CA");
  const currentTimeForInput = currentFullDate.toLocaleString("pt-BR", optionsForTimeInput);
  showWindow(scheduleField);
  scheduleInputDate.value = currentDateForInput;
  scheduleInputDate.setAttribute("min", currentDateForInput);
  scheduleInputTime.value = currentTimeForInput;
  scheduleInputTime.focus();
  confirmScheduleBtn.onclick = () => confirmSchedule(task, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, infoTaskSave, btnField);
  scheduleField.onkeypress = (e) => {
    if (e.key === "Enter") {
      confirmSchedule(task, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, infoTaskSave, btnField);
    }
  };
}

scheduleFieldCloseBtn.onclick = () => hideWindow(scheduleField);
cancelScheduletBtn.onclick = () => hideWindow(scheduleField);

// Configuração de botão de confirmação de agendamento
const confirmSchedule = (task, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, infoTaskSave, btnField) => {
  const currentFullDate = new Date();
  const scheduleInputDateValue = scheduleInputDate.value;
  const scheduleInputTimeValue = scheduleInputTime.value;
  const currentDate = currentFullDate.toLocaleDateString("fr-CA");
  const optionsForCurrentTime = {
    timeStyle: "short",
  };
  const currentTimeForValidate = currentFullDate.toLocaleString("pt-BR", optionsForCurrentTime);

  // Funções de validação dos input's de data e hora
  function validateScheduleInputDate() {
    if (scheduleInputDateValue.trim() != "" && scheduleInputDateValue >= currentDate) {
      return true;
    } else {
      scheduleInputDate.classList.add("inputError");
      scheduleInputDate.blur();
      return false;
    }
  }

  const validateScheduleInputTime = () => {
    if (scheduleInputTimeValue.trim() != "" && scheduleInputDateValue > currentDate) {
      return true;
    }
    if (scheduleInputDateValue === currentDate && scheduleInputTimeValue > currentTimeForValidate) {
      return true;
    }
    scheduleInputTime.classList.add("inputError");
    scheduleInputTime.blur();
    return false;
  };

  if (validateScheduleInputDate() && validateScheduleInputTime()) {
    // Recebimento dos valores colocados nos inputs
    const scheduledDate = new Date(scheduleInputDateValue + " " + scheduleInputTimeValue);
    const optionsSetDate = { dateStyle: "short" };
    const optionsSetTime = { timeStyle: "short" };
    const optionsSetDay = { weekday: "short" };
    const dateForInfoTextContent = scheduledDate.toLocaleString("pt-BR", optionsSetDate);
    const timeForInfoTextContent = scheduledDate.toLocaleString("pt-BR", optionsSetTime);
    const dayForInfoTextContent = scheduledDate.toLocaleString("pt-BR", optionsSetDay).charAt(0).toUpperCase() + scheduledDate.toLocaleString("pt-BR", optionsSetDay).substring(1).replace(/[.]/g, ",");

    // Inclusão dos dados no campo de informações sobre o agendamento
    const difSeconds = (scheduledDate.getTime() - currentFullDate.getTime()) / 1000;
    const difMinutes = difSeconds / 60;
    const difDays = difMinutes / (60 * 24);
    const difGetDayNumber = scheduledDate.getDay() - currentFullDate.getDay();

    if (difDays >= 2) {
      infoTextContent.innerText = dayForInfoTextContent + " " + dateForInfoTextContent + ", " + timeForInfoTextContent;
    } else if (difDays > 1 && difDays < 2 && difGetDayNumber >= 2) {
      infoTextContent.innerText = dayForInfoTextContent + " " + dateForInfoTextContent + ", " + timeForInfoTextContent;
    } else if (difDays > 1 && difDays < 2 && difGetDayNumber == -5) {
      infoTextContent.innerText = dayForInfoTextContent + " " + dateForInfoTextContent + ", " + timeForInfoTextContent;
    } else {
      insertSchedulingInfo(infoTextContent, difDays, difMinutes, difGetDayNumber, scheduleInputTimeValue, scheduleInputDateValue, currentDate);
    }
    hideWindow(scheduleField);
    setTimeout(() => {
      scheduleBtn.classList.add("disabledBtn");
      task.classList.add("scheduled");
      taskInfo.classList.add("scheduled");
      schedulingRemoveBtn.setAttribute("title", "Cancelar agendamento");
      taskInfo.classList.remove("hide");
      taskInfo.classList.add("appearTaskInfo");
      btnField.classList.add("animeBtnMobile");
      btnField.classList.add("pointerEventsNone");
      putExpireAlertClass(task, taskInfo, difMinutes, currentDate, difDays, difGetDayNumber, scheduleInputDateValue);
    }, 200);
    setTimeout(() => {
      taskInfo.classList.remove("appearTaskInfo");
      btnField.classList.remove("pointerEventsNone");
    }, 400);
    saveScheduledTaskAction(infoTaskSave, scheduleInputDateValue, scheduleInputTimeValue, infoTextContent, difMinutes, currentDate, difDays, difGetDayNumber);
    calculateNumberOfTasks();
  }
};

function insertSchedulingInfo(infoTextContent, difDays, difMinutes, difGetDayNumber, scheduleInputTimeValue, scheduleInputDateValue, currentDate) {
  if ((difDays < 2 && difGetDayNumber == 1 && difMinutes > 60) || (difDays < 2 && difGetDayNumber == -6 && difMinutes > 60)) {
    infoTextContent.innerText = "Amanhã, " + scheduleInputTimeValue;
  } else if ((difDays < 2 && difGetDayNumber == 1 && difMinutes > 30 && difMinutes <= 60) || (difDays < 2 && difGetDayNumber == -6 && difMinutes > 30 && difMinutes <= 60)) {
    infoTextContent.innerText = "Amanhã, " + scheduleInputTimeValue + " - Faltam " + Math.ceil(difMinutes) + " min";
  } else if ((difDays < 2 && difGetDayNumber == 1 && difMinutes > 0 && difMinutes <= 30) || (difDays < 2 && difGetDayNumber == -6 && difMinutes > 0 && difMinutes <= 30)) {
    if (difMinutes <= 1) {
      infoTextContent.innerText = "Amanhã, " + scheduleInputTimeValue + " - Falta " + Math.ceil(difMinutes) + " min";
    } else {
      infoTextContent.innerText = "Amanhã, " + scheduleInputTimeValue + " - Faltam " + Math.ceil(difMinutes) + " min";
    }
  } else if (currentDate === scheduleInputDateValue && difMinutes > 60) {
    infoTextContent.innerText = "Hoje, " + scheduleInputTimeValue;
  } else if (difMinutes > 30 && difMinutes <= 60 && currentDate === scheduleInputDateValue) {
    infoTextContent.innerText = "Hoje, " + scheduleInputTimeValue + " - Faltam " + Math.ceil(difMinutes) + " min";
  } else if (difMinutes > 0 && difMinutes <= 30 && currentDate === scheduleInputDateValue) {
    if (difMinutes <= 1) {
      infoTextContent.innerText = "Hoje, " + scheduleInputTimeValue + " - Falta " + Math.ceil(difMinutes) + " min";
    } else {
      infoTextContent.innerText = "Hoje, " + scheduleInputTimeValue + " - Faltam " + Math.ceil(difMinutes) + " min";
    }
  }
}

function putExpireAlertClass(task, taskInfo, difMinutes, currentDate, difDays, difGetDayNumber, scheduleInputDateValue) {
  if ((difMinutes > 0 && difMinutes <= 30 && currentDate === scheduleInputDateValue) || (difDays < 2 && difGetDayNumber == 1 && difMinutes > 0 && difMinutes <= 30) || (difDays < 2 && difGetDayNumber == -6 && difMinutes > 0 && difMinutes <= 30)) {
    task.classList.add("expireAlert");
    taskInfo.classList.add("expireAlert");
  }
}

function saveScheduledTaskAction(infoTaskSave, scheduleInputDateValue, scheduleInputTimeValue, infoTextContent, difMinutes, currentDate, difDays, difGetDayNumber) {
  if (infoTaskSave.deletedInfoTask && !infoTaskSave.scheduledTask) {
    delete infoTaskSave.deletedInfoTask;
  }
  if (!infoTaskSave.deletedInfoTask) {
    infoTaskSave.scheduledTask = [true, scheduleInputDateValue, scheduleInputTimeValue, infoTextContent.innerText];
    if ((difMinutes > 0 && difMinutes <= 30 && currentDate === scheduleInputDateValue) || (difDays < 2 && difGetDayNumber == 1 && difMinutes > 0 && difMinutes <= 30) || (difDays < 2 && difGetDayNumber == -6 && difMinutes > 0 && difMinutes <= 30)) {
      infoTaskSave.expireAlert = true;
    }
  }
  localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
}

function saveExpiredTaskAction(infoTaskSave, scheduleInputDateValue, scheduleInputTimeValue, infoTextContent) {
  if (!infoTaskSave.deletedInfoTask) {
    delete infoTaskSave.scheduledTask;
    delete infoTaskSave.expireAlert;
    infoTaskSave.expiredTask = [true, scheduleInputDateValue, scheduleInputTimeValue, infoTextContent.innerText];
    localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
  }
}

// Configuração do botão de remoção do agendamento
const schedulingRemoveClick = (taskField, taskInfo, taskFront, scheduleBtn, editBtn, infoTextContent, infoTaskSave, btnField) => {
  taskInfo.classList.add("vanishTaskInfo");
  // Salvar ação no Local Storage
  infoTaskSave.deletedInfoTask = true;
  clearSavedScheduledTaskInfo(infoTaskSave);
  localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
  setTimeout(() => {
    clearTaskClass(infoTextContent, taskInfo, taskFront);
    btnField.classList.add("animeBtnMobile");
    taskField.classList.add("pointerEventsNone");
    taskInfo.classList.remove("vanishTaskInfo");
    checkActivatedClassBtnAndFilter();
    calculateNumberOfTasks();
  }, 200);
  setTimeout(() => {
    taskField.classList.remove("pointerEventsNone");
    scheduleBtn.classList.remove("disabledBtn");
    editBtn.classList.remove("disabledBtn");
    btnField.classList.remove("animeBtnMobile");
  }, 500);
};

// Configuração do botão de exclusão da tarefa
const deleteClick = (taskField, taskFront, infoTaskSave) => {
  if (taskFront.classList.contains("scheduled") || infoTaskSave.savedNote) {
    if (taskFront.classList.contains("scheduled") && infoTaskSave.savedNote) {
      showConfirmField("Esta tarefa contém agendamento e anotações, tem certeza de que deseja removê-la?", confirmDeleteAction);
    } else if (taskFront.classList.contains("scheduled")) {
      showConfirmField("Esta tarefa contém um agendamento, tem certeza de que deseja removê-la?", confirmDeleteAction);
    } else {
      showConfirmField("Esta tarefa contém anotações, tem certeza de que deseja removê-la?", confirmDeleteAction);
    }
    function confirmDeleteAction() {
      hideWindow(confirmationWindow);
      setTimeout(() => {
        deleteTask(taskField, infoTaskSave);
      }, 200);
    }
  } else {
    deleteTask(taskField, infoTaskSave);
  }
};

function deleteTask(taskField, infoTaskSave) {
  taskField.classList.add("vanishTask");
  transitionClickProtection("add");
  saveDeleteTaskAction(infoTaskSave);
  setTimeout(() => {
    taskField.remove();
    calculateNumberOfTasks();
    if (allTasksFilterBtn.classList.contains("active")) {
      checkTasksOnScreen(dbAllTasks);
    } else {
      checkActivatedClassBtnAndFilter();
    }
    setTimeout(() => {
      transitionClickProtection("remove");
    }, 150);
    checkRemoveAllTaskBtn();
    checkRemoveAllConfigBtn();
    if (filtred && searchTaskInput.value != "") {
      filterTaskByInput();
    }
  }, 350);
}

// Configuração do botão para exclusão de todas as tarefas

removeAllTaskBtn.addEventListener("click", () => {
  showConfirmField("Esta ação irá excluir todas as tarefas, tem certeza de que deseja removê-las?", confirmRemoveAllTasks);
  menu.classList.add("menuBlur");
});

function showWindow(window) {
  header.classList.add("pointerEventsNone");
  mainContainer.classList.add("pointerEventsNone");
  tasksContainer.classList.add("tasksContainerHide");
  if (!noTaskTextContainer.classList.contains("hide")) {
    noTaskTextContainer.classList.add("noTaskTextHide");
  }
  if (filtred) {
    filterInformationBox.classList.remove("filterInformationOffBlur");
    filterInformationBox.classList.add("filterInformationBlur");
  }
  if (menuOpen) {
    menu.classList.remove("menuOffBlur");
    menu.classList.add("menuBlur");
  }
  window.classList.remove("hide");
  window.classList.add("appearWindow");
}

function hideWindow(window) {
  tasksContainer.classList.remove("tasksContainerHide");
  tasksContainer.classList.add("tasksContainerAppear");
  if (!noTaskTextContainer.classList.contains("hide")) {
    noTaskTextContainer.classList.remove("noTaskTextHide");
    noTaskTextContainer.classList.add("noTaskTextAppear");
  }
  window.classList.remove("appearWindow");
  window.classList.add("vanishWindow");
  if (filtred) {
    filterInformationBox.classList.remove("filterInformationBlur");
    filterInformationBox.classList.add("filterInformationOffBlur");
  }
  if (menuOpen) {
      menu.classList.remove("menuBlur");
      menu.classList.add("menuOffBlur");
  }
  setTimeout(() => {
    header.classList.remove("pointerEventsNone");
    mainContainer.classList.remove("pointerEventsNone");
    tasksContainer.classList.remove("tasksContainerAppear");
    if (!noTaskTextContainer.classList.contains("hide")) {
      noTaskTextContainer.classList.remove("noTaskTextAppear");
    }
    window.classList.remove("vanishWindow");
    window.classList.add("hide");
  }, 200);
}

function showConfirmField(text, funct) {
  showWindow(confirmationWindow);
  confirmationWindowText.innerText = text;
  btnYes.focus();
  btnYes.onclick = () => funct();
  btnNo.onclick = () => hideWindow(confirmationWindow);
}

function removeAllTasks() {
  const taskFields = tasksContainer.childNodes;
  for (const taskField of taskFields) {
    taskField.classList.add("vanishTask");
  }
  dbAllTasks.splice(0, dbAllTasks.length);
  localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
  localStorage.removeItem("tasks");
  disableBtn(removeAllTaskBtn);
  setTimeout(() => {
    tasksContainer.innerHTML = "";
    if (filtred) {
      filterInformationBox.classList.remove("filterInformationOffBlur");
      filterInformationBox.classList.remove("filterInfoAppear");
      filterInformationBox.classList.add("filterInfoVanish");
      filtred = false;
    }
    if (!allTasksFilterBtn.classList.contains("active")) {
      activateFilterBtn(allTasksFilterBtn);
      taskRecover();
    }
    calculateNumberOfTasks();
    checkTasksOnScreen(dbAllTasks);
  }, 200);
}

function confirmRemoveAllTasks() {
  hideWindow(confirmationWindow);
  setTimeout(() => {
    removeAllTasks();
    checkRemoveAllConfigBtn();
  }, 200);
}

// Configuração do botão para restaurar todas as configurações de fábrica

removeAllConfigBtn.addEventListener("click", () => {
  showConfirmField("Esta ação irá excluir todas as configurações já realizadas e todas as tarefas, tem certeza?", confirmRemoveAllConfig);
  menu.classList.add("menuBlur");
});

function confirmRemoveAllConfig() {
  hideWindow(confirmationWindow);
  setTimeout(() => {
    removeAllConfig();
  }, 200);
}

function removeAllConfig() {
  if (localStorage.getItem("tasks")) {
    removeAllTasks();
  }
  if (localStorage.getItem("infoAccountImg")) {
    removeImg();
  }
  if (localStorage.getItem("infoAccountName")) {
    deleteName();
  }
  if (localStorage.getItem("theme")) {
    toLightTheme();
  }
  disableBtn(removeAllConfigBtn);
}

function disableBtn(btn) {
  btn.classList.remove("normalOpacity");
  btn.classList.add("lowOpacity");
  btn.classList.remove("hover");
  btn.disabled = true;
}

function enableBtn(btn) {
  btn.classList.remove("lowOpacity");
  btn.classList.add("normalOpacity");
  btn.classList.add("hover");
  btn.disabled = false;
}

function checkRemoveAllTaskBtn() {
  if (dbAllTasks.length > 0) {
    if (removeAllTaskBtn.disabled) {
      enableBtn(removeAllTaskBtn);
    }
  } else {
    if (!removeAllTaskBtn.disabled) {
      disableBtn(removeAllTaskBtn);
    }
  }
}

function checkRemoveAllConfigBtn() {
  if (!localStorage.getItem("tasks") && !localStorage.getItem("infoAccountImg") && !localStorage.getItem("infoAccountName") && !localStorage.getItem("theme")) {
    if (!removeAllConfigBtn.disabled) {
      disableBtn(removeAllConfigBtn);
    }
  } else {
    if (removeAllConfigBtn.disabled) {
      enableBtn(removeAllConfigBtn);
    }
  }
}

// Configuração do botão de anotações

let flippedTask = false

function notesBtnClick(taskField, task, taskFront, notePadInput, notePadContainer, cleanNoteBtn, notesBtn, infoTaskSave) {
  header.classList.add("pointerEventsNone");
  if(menuOpen) {
    menu.classList.add("pointerEventsNone");
  }
  if(filtred) {
    filterInformationBox.classList.add("pointerEventsNone");
  }
  if (infoTaskSave.savedNote) {
    notePadInput.value = infoTaskSave.savedNote[1];
    cleanNoteBtn.classList.remove("hide");
  } else {
    notePadInput.value == "";
    cleanNoteBtn.classList.add("hide");
  }
  highLight(taskField, notePadContainer, "true")
  taskFront.classList.add("pointerEventsNone")
  task.classList.add("flipAnimate")
  setTimeout(() => {
    flippedTask = true;
  }, 200);
  document.onmousedown = (e) => {
    if (flippedTask && !notePadContainer.contains(e.target)) {
      saveNoteClick(taskField, task, taskFront, notePadContainer, notePadInput, notesBtn, infoTaskSave);
    }
  };
  notePadInput.onblur = () => {
    clearEmptyInput(notePadInput);
  };
}

function saveNoteClick(taskField, task, taskFront, notePadContainer, notePadInput, notesBtn, infoTaskSave) {
  if (notePadInput.value.trim() != "") {
    infoTaskSave.savedNote = [true, notePadInput.value.trim()];
    localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
    notesBtn.classList.add("active");
  } else {
    if (infoTaskSave.savedNote) {
      delete infoTaskSave.savedNote;
    }
    localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
    notesBtn.classList.remove("active");
  }
  task.classList.remove("flipAnimate")
  highLight(taskField, notePadContainer, "false")
  taskFront.classList.remove("pointerEventsNone")
  flippedTask = false
  setTimeout(() => {
    header.classList.remove("pointerEventsNone");
    menu.classList.remove("pointerEventsNone");
    filterInformationBox.classList.remove("pointerEventsNone");
  }, 200);
}

// Configuração para alternar entre dark/white mode
const html = document.querySelector("html");
const themeCheckBox = document.querySelector("#themeCheckBox");

function toDarkTheme() {
  html.classList.add("darkTheme");
  scheduleInputDate.classList.add("darkTheme");
  scheduleInputTime.classList.add("darkTheme");
  localStorage.setItem("theme", "darkTheme");
  themeCheckBox.checked = true;
  if (removeAllConfigBtn.disabled) {
    enableBtn(removeAllConfigBtn);
  }
}

function toLightTheme() {
  html.classList.remove("darkTheme");
  scheduleInputDate.classList.remove("darkTheme");
  scheduleInputTime.classList.remove("darkTheme");
  localStorage.removeItem("theme");
  themeCheckBox.checked = false;
}

if (localStorage.getItem("theme")) {
  toDarkTheme();
}

themeCheckBox.addEventListener("change", () => {
  if (!html.classList.contains("darkTheme")) {
    toDarkTheme();
  } else {
    toLightTheme();
    checkRemoveAllConfigBtn();
  }
});

// ----- Funções auxiliares (Criação de tarefas) -----

function saveCreatedTask(infoTaskSave) {
  infoTaskSave["taskContent"] = newTaskInput.value;
  dbAllTasks.unshift(infoTaskSave);
  localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
}

function createTask(taskField, task, taskFront) {
  taskField.classList.add("taskField")
  task.classList.add("task");
  taskFront.classList.add("taskFront")
  taskFront.classList.add("hover");
  taskField.appendChild(task);
  task.appendChild(taskFront);
}

function insertTextContent(taskFront, taskContent, infoTaskSave) {
  taskContent.innerText = infoTaskSave["taskContent"];
  taskContent.classList.add("taskContent");
  taskFront.appendChild(taskContent);
  newTaskInput.value = "";
}

function createBtnField(taskFront, btnField) {
  taskFront.appendChild(btnField);
  btnField.classList.add("btnField");
}

function createTaskInfo(taskField, taskFront, taskInfo, infoTextContent, schedulingRemoveBtn, completedTaskIcon, btnField, infoTaskSave, editBtn, scheduleBtn) {
  const schedulingRemoveBtnIcon = document.createElement("i");
  taskInfo.classList.add("taskInfo");
  taskInfo.classList.add("hide");
  infoTextContent.classList.add("infoTextContent");
  completedTaskIcon.classList.add("completedTaskIcon");
  completedTaskIcon.classList.add("fa-solid");
  completedTaskIcon.classList.add("fa-check");
  completedTaskIcon.classList.add("hide");
  taskFront.appendChild(taskInfo);
  taskInfo.appendChild(infoTextContent);
  taskInfo.appendChild(schedulingRemoveBtn);
  taskInfo.appendChild(completedTaskIcon);
  schedulingRemoveBtn.classList.add("schedulingRemoveBtn");
  schedulingRemoveBtn.appendChild(schedulingRemoveBtnIcon);
  schedulingRemoveBtnIcon.classList.add("fa-regular");
  schedulingRemoveBtnIcon.classList.add("fa-circle-xmark");
  schedulingRemoveBtn.addEventListener("click", () => schedulingRemoveClick(taskField, taskInfo, taskFront, scheduleBtn, editBtn, infoTextContent, infoTaskSave, btnField));
}

function createNotPadContainer(taskField, taskFront, task, notePadContainer, notesBtn, infoTaskSave, notePadInput, cleanNoteBtn) {
  const notePadTop = document.createElement("div");
  const notePadBtnField = document.createElement("div");
  const saveNoteBtn = document.createElement("button");
  const notePadTitle = document.createElement("p");
  const cleanNoteBtnIcon = document.createElement("i");
  const saveNoteBtnIcon = document.createElement("i");

  notePadContainer.classList.add("notePadContainer");
  notePadContainer.classList.add("taskBehind");
  notePadTop.classList.add("notePadTop");
  notePadTitle.classList.add("notePadTitle");
  notePadInput.classList.add("notePadInput");
  notePadInput.setAttribute("name", "notePadInput");
  notePadInput.setAttribute("placeholder", "O que deseja anotar?");
  notePadBtnField.classList.add("notePadBtnField");
  cleanNoteBtn.classList.add("cleanNoteBtn");
  cleanNoteBtn.classList.add("hide");
  cleanNoteBtn.setAttribute("title", "Limpar Anotações");
  cleanNoteBtnIcon.classList.add("fa-solid");
  cleanNoteBtnIcon.classList.add("fa-xmark");
  saveNoteBtn.classList.add("saveNoteBtn");
  saveNoteBtn.setAttribute("title", "Salvar");
  saveNoteBtnIcon.classList.add("fa-solid");
  saveNoteBtnIcon.classList.add("fa-angles-right");
  notePadInput.setAttribute("spellcheck", "false");
  task.appendChild(notePadContainer);
  notePadContainer.appendChild(notePadTop);
  notePadContainer.appendChild(notePadInput);
  notePadContainer.appendChild(notePadBtnField);
  notePadTop.appendChild(notePadTitle);
  notePadTitle.innerText = "Anotações";
  notePadTop.appendChild(saveNoteBtn);
  saveNoteBtn.appendChild(saveNoteBtnIcon);
  notePadBtnField.appendChild(cleanNoteBtn);
  cleanNoteBtn.appendChild(cleanNoteBtnIcon);
  saveNoteBtn.onclick = () => saveNoteClick(taskField, task, taskFront, notePadContainer, notePadInput, notesBtn, infoTaskSave);
  notePadInput.onkeyup = () => checkInputValue(notePadInput, cleanNoteBtn);
  cleanNoteBtn.onclick = () => clearInput(notePadInput, cleanNoteBtn);
}

function createCompleteTaskBtn(taskField, taskFront, taskContent, btnField, scheduleBtn, editBtn, checkBtn, checkIcon, taskInfo, infoTextContent, completedTaskIcon, schedulingRemoveBtn, infoTaskSave) {
  btnField.appendChild(checkBtn);
  checkBtn.classList.add("checkBtn");
  checkBtn.appendChild(checkIcon);
  checkIcon.classList.add("fa-solid");
  checkIcon.classList.add("fa-thumbs-up");
  checkBtn.setAttribute("title", "Concluir");
  checkBtn.addEventListener("click", () => completeTaskClick(taskField, taskFront, taskContent, scheduleBtn, editBtn, checkBtn, checkIcon, taskInfo, infoTextContent, completedTaskIcon, schedulingRemoveBtn, infoTaskSave));
}

function createEditTaskBtn(btnField, editBtn, taskContent, infoTaskSave) {
  const editIcon = document.createElement("i");
  btnField.appendChild(editBtn);
  editBtn.classList.add("editBtn");
  editBtn.appendChild(editIcon);
  editIcon.classList.add("fa-solid");
  editIcon.classList.add("fa-pen");
  editBtn.setAttribute("title", "Editar");
  editBtn.addEventListener("click", () => editClick(taskContent, infoTaskSave));
}

function createScheduleTaskBtn(taskFront, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, infoTaskSave, btnField) {
  const scheduleIcon = document.createElement("i");
  btnField.appendChild(scheduleBtn);
  scheduleBtn.classList.add("scheduleBtn");
  scheduleBtn.appendChild(scheduleIcon);
  scheduleIcon.classList.add("fa-solid");
  scheduleIcon.classList.add("fa-clock");
  scheduleBtn.setAttribute("title", "Definir prazo");
  scheduleBtn.addEventListener("click", () => scheduleClick(taskFront, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, infoTaskSave, btnField));
}

function createNotesBtn(taskField, task, taskFront, notePadInput, notePadContainer, cleanNoteBtn, notesBtn, infoTaskSave, btnField) {
  const notesBtnIcon = document.createElement("i");
  btnField.appendChild(notesBtn);
  notesBtn.classList.add("notesBtn");
  notesBtn.appendChild(notesBtnIcon);
  notesBtnIcon.classList.add("fa-solid");
  notesBtnIcon.classList.add("fa-file-lines");
  notesBtn.setAttribute("title", "Anotações");
  notesBtn.addEventListener("click", () => notesBtnClick(taskField, task, taskFront, notePadInput, notePadContainer, cleanNoteBtn, notesBtn, infoTaskSave));
}

function createRemoveTaskBtn(taskField, taskFront, infoTaskSave, btnField, removeBtn) {
  const removeIcon = document.createElement("i");
  btnField.appendChild(removeBtn);
  removeBtn.classList.add("removeBtn");
  removeBtn.appendChild(removeIcon);
  removeIcon.classList.add("fa-solid");
  removeIcon.classList.add("fa-trash");
  removeBtn.setAttribute("title", "Excluir tarefa");
  removeBtn.addEventListener("click", () => deleteClick(taskField, taskFront, infoTaskSave));
}

function taskConstructor(taskField, task, taskFront, infoTaskSave) {
  // Componentes da tarefa
  const btnField = document.createElement("div");
  const taskInfo = document.createElement("div");
  const notePadContainer = document.createElement("div");
  const schedulingRemoveBtn = document.createElement("button");
  const cleanNoteBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const checkIcon = document.createElement("i");
  const editBtn = document.createElement("button");
  const scheduleBtn = document.createElement("button");
  const notesBtn = document.createElement("button");
  const removeBtn = document.createElement("button");
  const infoTextContent = document.createElement("p");
  const completedTaskIcon = document.createElement("i");
  const notePadInput = document.createElement("textarea");
  const taskContent = document.createElement("p");

  // Criação da tarefa
  createTask(taskField, task, taskFront);

  // Inserção do texto da tarefa
  insertTextContent(taskFront, taskContent, infoTaskSave);

  // Campo dos botões/ícones
  createBtnField(taskFront, btnField);

  // Criação do campo de informações da tarefa
  createTaskInfo(taskField, taskFront, taskInfo, infoTextContent, schedulingRemoveBtn, completedTaskIcon, btnField, infoTaskSave, editBtn, scheduleBtn);

  // Campo para anotações da tarefa
  createNotPadContainer(taskField, taskFront, task, notePadContainer, notesBtn, infoTaskSave, notePadInput, cleanNoteBtn);

  // Botão para conclusão da tarefa
  createCompleteTaskBtn(taskField, taskFront, taskContent, btnField, scheduleBtn, editBtn, checkBtn, checkIcon, taskInfo, infoTextContent, completedTaskIcon, schedulingRemoveBtn, infoTaskSave);

  //Botão para edição da tarefa
  createEditTaskBtn(btnField, editBtn, taskContent, infoTaskSave);

  // Botão para agendamento da tarefa
  createScheduleTaskBtn(taskFront, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, infoTaskSave, btnField);

  // Botão para adiconar anotações sobre a tarefa
  createNotesBtn(taskField, task, taskFront, notePadInput, notePadContainer, cleanNoteBtn, notesBtn, infoTaskSave, btnField);

  // Botão para exclusão da tarefa
  createRemoveTaskBtn(taskField, taskFront, infoTaskSave, btnField, removeBtn);

  // Recuperação das tarefas em tela, caso seja requisitado
  switch (infoTaskSave.completedTask) {
    case true:
      taskContent.classList.toggle("completed");
      taskFront.classList.toggle("completed");
      editBtn.classList.toggle("disabledBtn");
      scheduleBtn.classList.toggle("disabledBtn");
      checkIcon.classList.toggle("fa-thumbs-up");
      checkIcon.classList.toggle("fa-rotate");
      checkIcon.classList.toggle("fa-spin");
      checkBtn.setAttribute("title", "Restaurar");
      taskInfo.classList.add("completed");
      taskInfo.classList.remove("hide");
      infoTextContent.innerText = "Tarefa concluída";
      completedTaskIcon.classList.remove("hide");
      schedulingRemoveBtn.classList.add("hide");
      break;
  }

  switch (infoTaskSave.scheduledTask && infoTaskSave.scheduledTask[0]) {
    case true:
      taskInfo.classList.remove("hide");
      taskInfo.classList.add("scheduled");
      taskFront.classList.add("scheduled");
      schedulingRemoveBtn.setAttribute("title", "Cancelar agendamento");
      scheduleBtn.classList.add("disabledBtn");
      infoTextContent.innerText = infoTaskSave.scheduledTask[3];
      break;
  }

  switch (infoTaskSave.savedNote && infoTaskSave.savedNote[0]) {
    case true:
      notePadInput.value = infoTaskSave.savedNote[1];
      notesBtn.classList.add("active");
      break;
  }

  switch (infoTaskSave.expireAlert) {
    case true:
      taskFront.classList.add("expireAlert");
      taskInfo.classList.add("expireAlert");
      break;
  }

  switch (infoTaskSave.expiredTask && infoTaskSave.expiredTask[0]) {
    case true:
      taskFront.classList.add("expiredTask");
      taskInfo.classList.add("expiredTask");
      taskInfo.classList.remove("hide");
      schedulingRemoveBtn.setAttribute("title", "Restaurar");
      editBtn.classList.add("disabledBtn");
      scheduleBtn.classList.add("disabledBtn");
      infoTextContent.innerText = infoTaskSave.expiredTask[3];
      break;
  }
}

// ----- Funções auxiliares manipulação de tarefas -----

function clearTaskClass(infoTextContent, taskInfo, taskFront) {
  if (taskFront.classList.contains("scheduled") || taskFront.classList.contains("expiredTask")) {
    infoTextContent.innerText = "";
  }
  if (!taskInfo.classList.contains("hide")) {
    taskInfo.classList.add("hide");
  }
  if (taskInfo.classList.contains("scheduled")) {
    taskFront.classList.remove("scheduled");
    taskInfo.classList.remove("scheduled");
  }
  if (taskFront.classList.contains("expireAlert")) {
    taskFront.classList.remove("expireAlert");
    taskInfo.classList.remove("expireAlert");
  }
  if (taskFront.classList.contains("expiredTask")) {
    taskFront.classList.remove("expiredTask");
    taskInfo.classList.remove("expiredTask");
  }
  if (taskFront.classList.contains("completed")) {
    taskFront.classList.remove("completed");
    taskInfo.classList.remove("completed");
  }
}

function transitionClickProtection(option) {
  const taskFields = tasksContainer.childNodes;
  if (option == "add") {
    for (const taskField of taskFields) {
      const task = taskField.firstChild
      const taskFront = task.firstChild
      const btnField = taskFront.childNodes[1]
      taskFront.classList.remove("hover");
      btnField.classList.add("pointerEventsNone");
    }
  } else {
    for (const taskField of taskFields) {
      const task = taskField.firstChild
      const taskFront = task.firstChild
      const btnField = taskFront.childNodes[1]
      taskFront.classList.add("hover");
      btnField.classList.remove("pointerEventsNone");
    }
  }
}

function includePointerEventsNoneAllTasks(option) {
  const taskFields = tasksContainer.childNodes;
  if (option == "add") {
    for (const taskField of taskFields) {
      taskField.classList.add("pointerEventsNone");
    }
  } else {
    for (const taskField of taskFields) {
      taskField.classList.remove("pointerEventsNone");
    }
  }
}

function highLight(taskField, notePadContainer, option) {
  const taskFields = tasksContainer.childNodes;
  if (option == "true") {
    for (const taskField of taskFields) {
      taskField.classList.add("pointerEventsNone");
      taskField.classList.add("lowOpacity");
    }
    taskField.classList.remove("pointerEventsNone");
    taskField.classList.remove("lowOpacity");
    notePadContainer.classList.add("active");
  } else {
    for (const taskField of taskFields) {
      if (taskField.classList.contains("lowOpacity")) {
        taskField.classList.remove("lowOpacity");
      }
      taskField.classList.add("normalOpacity");
    }
    taskField.classList.remove("normalOpacity");
    notePadContainer.classList.remove("active");
    setTimeout(() => {
      for (const taskField of taskFields) {
        taskField.classList.remove("pointerEventsNone");
        if (taskField.classList.contains("normalOpacity")) {
          taskField.classList.remove("normalOpacity");
        }
      }
    }, 200);
  }
}

// ----- Funções auxiliares (Completar e restaurar tarefas) -----

function completeTaskBtnToggle(taskFront, taskContent, checkIcon, checkBtn, scheduleBtn, editBtn, completedTaskIcon, schedulingRemoveBtn) {
  checkIcon.classList.toggle("fa-thumbs-up");
  checkIcon.classList.toggle("fa-rotate");
  checkIcon.classList.toggle("fa-spin");
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

function clearSavedScheduledTaskInfo(infoTaskSave) {
  if (infoTaskSave.scheduledTask) {
    delete infoTaskSave.scheduledTask;
  }
  if (infoTaskSave.expireAlert) {
    delete infoTaskSave.expireAlert;
  }
  if (infoTaskSave.expiredTask) {
    delete infoTaskSave.expiredTask;
  }
}

function saveCompleteTaskAction(infoTaskSave) {
  if (infoTaskSave.deletedInfoTask) {
    delete infoTaskSave.deletedInfoTask;
  }
  clearSavedScheduledTaskInfo(infoTaskSave);
  if (!infoTaskSave.completedTask) {
    infoTaskSave.completedTask = true;
  } else {
    delete infoTaskSave.completedTask;
  }
  localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
}

function saveDeleteTaskAction(infoTaskSave) {
  infoTaskSave.deletedInfoTask = true;
  localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
  setTimeout(() => {
    const index = dbAllTasks.indexOf(infoTaskSave);
    dbAllTasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
    if (dbAllTasks.length < 1) {
      localStorage.removeItem("tasks");
    }
  }, 350);
}

function putCompletedTask(taskFront, taskInfo, infoTextContent) {
  taskFront.classList.add("completed");
  taskInfo.classList.add("completed");
  taskInfo.classList.remove("hide");
  infoTextContent.innerText = "Tarefa concluída";
}

function completeTask(taskField, taskFront, taskContent, checkBtn, checkIcon, editBtn, scheduleBtn, taskInfo, infoTextContent, schedulingRemoveBtn, completedTaskIcon, infoTaskSave) {
  saveCompleteTaskAction(infoTaskSave);
  transitionClickProtection("add");
  taskField.classList.add("vanishTask");
  setTimeout(() => {
    completeTaskBtnToggle(taskFront, taskContent, checkIcon, checkBtn, scheduleBtn, editBtn, completedTaskIcon, schedulingRemoveBtn);
    if (taskFront.classList.contains("completed")) {
      clearTaskClass(infoTextContent, taskInfo, taskFront);
    } else if (taskFront.classList.contains("scheduled") || taskFront.classList.contains("expiredTask")) {
      clearTaskClass(infoTextContent, taskInfo, taskFront);
      putCompletedTask(taskFront, taskInfo, infoTextContent);
    } else {
      putCompletedTask(taskFront, taskInfo, infoTextContent);
    }
    taskField.classList.remove("vanishTask");
    taskField.classList.add("appearTask");
    calculateNumberOfTasks();
    if (!allTasksFilterBtn.classList.contains("active")) {
      checkActivatedClassBtnAndFilter();
    }
  }, 200);
  setTimeout(() => {
    taskField.classList.remove("appearTask");
    transitionClickProtection("remove");
  }, 400);
}

// Função responsável por recuperar as tarefas e outras informações do banco de dados

function taskRecover() {
  if (localStorage.getItem("tasks")) {
    dbAllTasks = JSON.parse(localStorage.getItem("tasks"));
  }
  checkRemoveAllTaskBtn();
  checkRemoveAllConfigBtn();
  calculateNumberOfTasks();
  checkTasksOnScreen(dbAllTasks);
  tasksContainer.innerHTML = "";
  for (let i = 0; i < dbAllTasks.length; i++) {
    // Recuperação dos dados de cada tarefa no array e renderização em tela
    const infoTaskSave = dbAllTasks[i];
    const taskField = document.createElement("div");
    const task = document.createElement("div");
    const taskFront = document.createElement("div");
    taskConstructor(taskField, task, taskFront, infoTaskSave);
    tasksContainer.appendChild(taskField);
  }
}

// Verificação do status do agendamento em tempo real
setInterval(() => {
  const currentFullDate = new Date();
  const currentDate = currentFullDate.toLocaleDateString("fr-CA");

  for (let i = 0; i < dbAllTasks.length; i++) {
    const taskField = tasksContainer.childNodes[i];
    const infoTaskSave = dbAllTasks[i];

    if (infoTaskSave.scheduledTask || infoTaskSave.expiredTask) {
      const task = taskField.firstChild
      const taskFront = task.firstChild
      const taskInfo = taskFront.childNodes[2];
      const infoTextContent = taskInfo.firstChild;
      const schedulingRemoveBtn = taskInfo.childNodes[1];
      const scheduleInputDateValue = infoTaskSave.scheduledTask?.[1] ?? infoTaskSave.expiredTask[1];
      const scheduleInputTimeValue = infoTaskSave.scheduledTask?.[2] ?? infoTaskSave.expiredTask[2];
      const scheduledDate = new Date(scheduleInputDateValue + " " + scheduleInputTimeValue);
      const btnField = taskFront.childNodes[1];
      const editBtn = btnField.childNodes[1];
      const difSeconds = (scheduledDate.getTime() - currentFullDate.getTime()) / 1000;
      const difMinutes = difSeconds / 60;
      const difDays = difMinutes / (60 * 24);
      const difGetDayNumber = scheduledDate.getDay() - currentFullDate.getDay();
      const difSecondsCurrentToScheduled = (currentFullDate.getTime() - scheduledDate.getTime()) / 1000;
      const difMinutesCurrentToScheduled = difSecondsCurrentToScheduled / 60;
      const difDaysCurrentToScheduled = difMinutesCurrentToScheduled / (60 * 24);
      const difGetDayNumberCurrentToScheduled = currentFullDate.getDay() - scheduledDate.getDay();

      if (difSeconds <= 0) {
        saveExpiredTaskAction(infoTaskSave, scheduleInputDateValue, scheduleInputTimeValue, infoTextContent);
        calculateNumberOfTasks();
        checkActivatedClassBtnAndFilter();
        taskInfo.classList.remove("scheduled");
        taskInfo.classList.remove("expireAlert");
        taskInfo.classList.add("expiredTask");
        taskFront.classList.remove("scheduled");
        taskFront.classList.remove("expireAlert");
        taskFront.classList.add("expiredTask");
        schedulingRemoveBtn.setAttribute("title", "Restaurar");
        editBtn.classList.add("disabledBtn");
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
        insertSchedulingInfo(infoTextContent, difDays, difMinutes, difGetDayNumber, scheduleInputTimeValue, scheduleInputDateValue, currentDate);
      }
      if (!infoTaskSave.expiredTask) {
        saveScheduledTaskAction(infoTaskSave, scheduleInputDateValue, scheduleInputTimeValue, infoTextContent, difMinutes, currentDate, difDays, difGetDayNumber);
      }
      putExpireAlertClass(taskFront, taskInfo, difMinutes, currentDate, difDays, difGetDayNumber, scheduleInputDateValue);
    }
  }
}, 1000);

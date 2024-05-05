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
const confirmField = document.querySelector("#confirmField");
const confirmFieldText = document.querySelector("#confirmFieldText");
const btnYes = document.querySelector("#btnYes");
const btnNo = document.querySelector("#btnNo");

// Variáveis para guardar tarefas no banco de dados (Local Storage)
let dbAllTasks = [];

// Variáveis dos filtros das tarefas
const filterContainer = document.querySelector("#filterContainer");
const allTasksFilterBtn = document.querySelector("#allTasksFilterBtn");
const pendingTasksFilterBtn = document.querySelector("#pendingTasksFilterBtn");
const scheduledTasksFilterBtn = document.querySelector(
  "#scheduledTasksFilterBtn"
);
const expiredTasksFilterBtn = document.querySelector("#expiredTasksFilterBtn");
const completedTasksFilterBtn = document.querySelector(
  "#completedTasksFilterBtn"
);
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
let pendingTasks = dbAllTasks.filter(
  (infoTaskSave) => !infoTaskSave.completedTask
);
let scheduledTasks = dbAllTasks.filter(
  (infoTaskSave) => infoTaskSave.scheduledTask
);
let expiredTasks = dbAllTasks.filter(
  (infoTaskSave) => infoTaskSave.expiredTask
);
let completedTasks = dbAllTasks.filter(
  (infoTaskSave) => infoTaskSave.completedTask
);

// recuperação das tarefas e outras informações do banco de dados
taskRecover();

//Configuração do botão de Menu
const menuBtn = document.querySelector("#menuButton");
const menu = document.querySelector("#menu");
const menuBtnIcon = document.querySelector("#menuButtonIcon");
const menuBtnIconMobile = document.querySelector("#menuButtonIconMobile");
let menuOpen = false;

function menuIconToggle() {
  menuBtnIcon.classList.toggle("fa-angles-down");
  menuBtnIcon.classList.toggle("fa-xmark");
  menuBtnIconMobile.classList.toggle("fa-angles-left");
  menuBtnIconMobile.classList.toggle("fa-xmark");
  menuBtn.classList.toggle("active");
  menuBtn.disabled = true;
}

function menuShow() {
  menuOpen = !menuOpen;
  menu.classList.remove("pointerEventsNone");
  menu.classList.remove("hide");
  menu.classList.remove("menuVanish");
  menu.classList.add("menuAppear");
  menuIconToggle();
  menuBtn.disabled = false;
}

function menuHide() {
  menuOpen = !menuOpen;
  menu.classList.add("pointerEventsNone");
  menu.classList.remove("menuAppear");
  menu.classList.add("menuVanish");
  menuIconToggle();
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

document.addEventListener("click", (e) => {
  if (
    !menu.contains(e.target) &&
    !menuBtn.contains(e.target) &&
    !menuBtnIcon.contains(e.target) &&
    !confirmField.contains(e.target) &&
    menuOpen &&
    !confirmField.classList.contains("appearWindow")
  ) {
    menuHide();
  } else if (
    confirmField.classList.contains("appearWindow") &&
    menuOpen &&
    !menu.contains(e.target) &&
    !menu.classList.contains("menuBlur")
  ) {
    menuHide();
  }
  if (
    newTaskInput.classList.contains("inputError") &&
    !newTaskBtn.contains(e.target)
  ) {
    newTaskInput.classList.remove("inputError");
  } else if (
    editInput.classList.contains("inputError") &&
    !confirmEditBtn.contains(e.target)
  ) {
    editInput.classList.remove("inputError");
  } else if (
    scheduleInputDate.classList.contains("inputError") &&
    !confirmScheduleBtn.contains(e.target)
  ) {
    scheduleInputDate.classList.remove("inputError");
  } else if (
    scheduleInputTime.classList.contains("inputError") &&
    !confirmScheduleBtn.contains(e.target)
  ) {
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
    inputFileBtnToggle();
    if (removeAllConfigBtn.disabled) {
      enableBtn(removeAllConfigBtn);
    }
    inputFileImg.value = "";
  }
}

inputFileImg.addEventListener("change", loadImage);
inputFileBtnDel.addEventListener("click", () => {
  showConfirmField(
    "Tem certeza de que deseja remover a foto de perfil?",
    confirmRemoveImg
  );
  menu.classList.add("menuBlur");
});

function removeImg() {
  localStorage.removeItem("infoAccountImg");
  uploadedImg.src = "./img/profile-avatar.png";
  inputFileBtnToggle();
  inputFileImg.setAttribute("title", "Adicionar foto");
}

function confirmRemoveImg() {
  hideWindow(confirmField);
  setTimeout(() => {
    removeImg();
    checkRemoveAllConfigBtn();
  }, 200);
}

// Nome do usuário
const nameInput = document.querySelector("#nameInput");
const nameIdentIcon = document.querySelector("#nameIdentIcon");

if (localStorage.getItem("infoAccountName")) {
  nameInput.value = localStorage.getItem("infoAccountName");
}

nameInput.addEventListener("blur", saveName);
nameInput.onkeypress = (e) => {
  if (e.key === "Enter") {
    nameInput.blur();
  }
};

nameInput.onfocus = () => {
  nameIdentIcon.classList.add("active");
  nameInput.classList.add("active");
};

function deleteName() {
  nameInput.value = "Qual é o seu nome?";
  localStorage.removeItem("infoAccountName");
}

function saveName() {
  nameIdentIcon.classList.remove("active");
  nameInput.classList.remove("active");
  if (nameInput.value.trim() == "" || nameInput.value == "Qual é o seu nome?") {
    deleteName();
    checkRemoveAllConfigBtn();
  } else {
    nameInput.value = nameInput.value.trim();
    if (removeAllConfigBtn.disabled) {
      enableBtn(removeAllConfigBtn);
    }
    localStorage.setItem("infoAccountName", nameInput.value.trim());
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
  pendingTasks = dbAllTasks.filter(
    (infoTaskSave) => !infoTaskSave.completedTask
  );
  scheduledTasks = dbAllTasks.filter(
    (infoTaskSave) => infoTaskSave.scheduledTask
  );
  expiredTasks = dbAllTasks.filter((infoTaskSave) => infoTaskSave.expiredTask);
  completedTasks = dbAllTasks.filter(
    (infoTaskSave) => infoTaskSave.completedTask
  );
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
    const task = tasksContainer.childNodes[i];
    if (taskClass == "pendingTask") {
      if (infoTaskSave.completedTask) {
        if (!task.classList.contains("hide")) {
          task.classList.add("hide");
        }
      } else {
        if (task.classList.contains("hide")) {
          task.classList.remove("hide");
        }
      }
    } else {
      if (!infoTaskSave.hasOwnProperty(taskClass)) {
        if (!task.classList.contains("hide")) {
          task.classList.add("hide");
        }
      } else {
        if (task.classList.contains("hide")) {
          task.classList.remove("hide");
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

function checkInputValue(input, cleanBtn) {
  if (input.value.trim() != "") {
    if (cleanBtn.classList.contains("hide")) {
      cleanBtn.classList.remove("hide");
    }
    return true;
  } else {
    if (!cleanBtn.classList.contains("hide")) {
      cleanBtn.classList.add("hide");
    }
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
  checkInputValue(searchTaskInput, cleanInputSearchBtn);
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
    const task = tasksContainer.childNodes[i];
    if (
      !infoTaskSave.taskContent
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
          searchTaskInput.value
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        )
    ) {
      containsHide.push("true");
      if (!task.classList.contains("hide")) {
        task.classList.add("hide");
      }
    } else {
      containsHide.push("false");
      if (task.classList.contains("hide")) {
        task.classList.remove("hide");
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

newTaskInput.onkeyup = () =>
  checkInputValue(newTaskInput, cleanNewTaskInputBtn);
cleanNewTaskInputBtn.onclick = () =>
  clearInput(newTaskInput, cleanNewTaskInputBtn);

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

newTaskInput.onblur = () => {
  if (newTaskInput.value.trim() == "") {
    newTaskInput.value = "";
  }
};

editInput.onblur = () => {
  if (editInput.value.trim() == "") {
    editInput.value = "";
  }
};

function prepareAndInsertTask() {
  const infoTaskSave = new Object();
  const taskField = document.createElement("div");
  if (filtred) {
    cleanInputFilter();
    activateFilterBtn(pendingTasksFilterBtn);
    filterTaskByClass("pendingTask");
    insertTask(taskField, infoTaskSave);
  } else {
    insertTask(taskField, infoTaskSave);
  }
  calculateNumberOfTasks();
  checkTasksOnScreen(dbAllTasks);
  checkRemoveAllTaskBtn();
  checkRemoveAllConfigBtn();
}

function insertTask(taskField, infoTaskSave) {
  saveCreatedTask(infoTaskSave);
  taskConstructor(taskField, infoTaskSave);
  taskField.classList.add("appearTask");
  tasksContainer.insertBefore(taskField, tasksContainer.childNodes[0]);
  setTimeout(() => {
    taskField.classList.remove("appearTask");
  }, 200);
}

// Configuração do botão para conclusão da tarefa
const completeTaskClick = (
  taskField,
  taskContent,
  scheduleBtn,
  editBtn,
  checkBtn,
  checkIcon,
  taskInfo,
  infoTextContent,
  completedTaskIcon,
  schedulingRemoveBtn,
  infoTaskSave
) => {
  if (taskField.classList.contains("scheduled")) {
    showConfirmField(
      "Esta tarefa possui um agendamento, tem certeza que deseja concluí-la?",
      confirmCompleteTask
    );
    function confirmCompleteTask() {
      hideWindow(confirmField);
      setTimeout(() => {
        completeTask(
          taskField,
          taskContent,
          checkBtn,
          checkIcon,
          editBtn,
          scheduleBtn,
          taskInfo,
          infoTextContent,
          schedulingRemoveBtn,
          completedTaskIcon,
          infoTaskSave
        );
      }, 200);
    }
  } else {
    completeTask(
      taskField,
      taskContent,
      checkBtn,
      checkIcon,
      editBtn,
      scheduleBtn,
      taskInfo,
      infoTextContent,
      schedulingRemoveBtn,
      completedTaskIcon,
      infoTaskSave
    );
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
      taskContent.classList.add("contentAnimation");
      includePointerEventsNoneAllTasks("add");
    }, 200);
    setTimeout(() => {
      taskContent.classList.remove("contentAnimation");
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

function scheduleClick(
  taskField,
  scheduleBtn,
  taskInfo,
  infoTextContent,
  schedulingRemoveBtn,
  infoTaskSave,
  btnField
) {
  const currentFullDate = new Date();
  const optionsForTimeInput = {
    timeStyle: "short",
  };
  const currentDateForInput = currentFullDate.toLocaleDateString("fr-CA");
  const currentTimeForInput = currentFullDate.toLocaleString(
    "pt-BR",
    optionsForTimeInput
  );
  showWindow(scheduleField);
  scheduleInputDate.value = currentDateForInput;
  scheduleInputDate.setAttribute("min", currentDateForInput);
  scheduleInputTime.value = currentTimeForInput;
  scheduleInputTime.focus();
  confirmScheduleBtn.onclick = () =>
    confirmSchedule(
      taskField,
      scheduleBtn,
      taskInfo,
      infoTextContent,
      schedulingRemoveBtn,
      infoTaskSave,
      btnField
    );
  scheduleField.onkeypress = (e) => {
    if (e.key === "Enter") {
      confirmSchedule(
        taskField,
        scheduleBtn,
        taskInfo,
        infoTextContent,
        schedulingRemoveBtn,
        infoTaskSave,
        btnField
      );
    }
  };
}

scheduleFieldCloseBtn.onclick = () => hideWindow(scheduleField);
cancelScheduletBtn.onclick = () => hideWindow(scheduleField);

// Configuração de botão de confirmação de agendamento
const confirmSchedule = (
  taskField,
  scheduleBtn,
  taskInfo,
  infoTextContent,
  schedulingRemoveBtn,
  infoTaskSave,
  btnField
) => {
  const currentFullDate = new Date();
  const scheduleInputDateValue = scheduleInputDate.value;
  const scheduleInputTimeValue = scheduleInputTime.value;
  const currentDate = currentFullDate.toLocaleDateString("fr-CA");
  const optionsForCurrentTime = {
    timeStyle: "short",
  };
  const currentTimeForValidate = currentFullDate.toLocaleString(
    "pt-BR",
    optionsForCurrentTime
  );

  // Funções de validação dos input's de data e hora
  function validateScheduleInputDate() {
    if (
      scheduleInputDateValue.trim() != "" &&
      scheduleInputDateValue >= currentDate
    ) {
      return true;
    } else {
      scheduleInputDate.classList.add("inputError");
      scheduleInputDate.blur();
      return false;
    }
  }

  const validateScheduleInputTime = () => {
    if (
      scheduleInputTimeValue.trim() != "" &&
      scheduleInputDateValue > currentDate
    ) {
      return true;
    }
    if (
      scheduleInputDateValue === currentDate &&
      scheduleInputTimeValue > currentTimeForValidate
    ) {
      return true;
    }
    scheduleInputTime.classList.add("inputError");
    scheduleInputTime.blur();
    return false;
  };

  if (validateScheduleInputDate() && validateScheduleInputTime()) {
    // Recebimento dos valores colocados nos inputs
    const scheduledDate = new Date(
      scheduleInputDateValue + " " + scheduleInputTimeValue
    );
    const optionsSetDate = { dateStyle: "short" };
    const optionsSetTime = { timeStyle: "short" };
    const optionsSetDay = { weekday: "short" };
    const dateForInfoTextContent = scheduledDate.toLocaleString(
      "pt-BR",
      optionsSetDate
    );
    const timeForInfoTextContent = scheduledDate.toLocaleString(
      "pt-BR",
      optionsSetTime
    );
    const dayForInfoTextContent =
      scheduledDate
        .toLocaleString("pt-BR", optionsSetDay)
        .charAt(0)
        .toUpperCase() +
      scheduledDate
        .toLocaleString("pt-BR", optionsSetDay)
        .substring(1)
        .replace(/[.]/g, ",");
        
    // Inclusão dos dados no campo de informações sobre o agendamento
    const difSeconds =
      (scheduledDate.getTime() - currentFullDate.getTime()) / 1000;
    const difMinutes = difSeconds / 60;
    const difDays = difMinutes / (60 * 24);
    const difGetDayNumber = scheduledDate.getDay() - currentFullDate.getDay();

    if (difDays >= 2) {
      infoTextContent.innerText =
        "Prazo: " +
        dayForInfoTextContent +
        " " +
        dateForInfoTextContent +
        ", " +
        timeForInfoTextContent;
    } else if (difDays > 1 && difDays < 2 && difGetDayNumber >= 2) {
      infoTextContent.innerText =
        "Prazo: " +
        dayForInfoTextContent +
        " " +
        dateForInfoTextContent +
        ", " +
        timeForInfoTextContent;
    } else if (difDays > 1 && difDays < 2 && difGetDayNumber == -5) {
      infoTextContent.innerText =
        "Prazo: " +
        dayForInfoTextContent +
        " " +
        dateForInfoTextContent +
        ", " +
        timeForInfoTextContent;
    } else {
      insertSchedulingInfo(
        infoTextContent,
        difDays,
        difMinutes,
        difGetDayNumber,
        scheduleInputTimeValue,
        scheduleInputDateValue,
        currentDate
      );
    }
    hideWindow(scheduleField);
    setTimeout(() => {
      scheduleBtn.classList.add("disabledBtn");
      taskField.classList.add("scheduled");
      taskInfo.classList.add("scheduled");
      schedulingRemoveBtn.setAttribute("title", "Cancelar agendamento");
      taskInfo.classList.remove("hide");
      taskInfo.classList.add("appearTaskInfo");
      btnField.classList.add("animeBtnMobile");
      btnField.classList.add("pointerEventsNone");
      putExpireAlertClass(
        taskField,
        taskInfo,
        difMinutes,
        currentDate,
        difDays,
        difGetDayNumber,
        scheduleInputDateValue
      );
    }, 200);
    setTimeout(() => {
      taskInfo.classList.remove("appearTaskInfo");
      btnField.classList.remove("pointerEventsNone");
    }, 400);

    saveScheduledTaskAction(
      infoTaskSave,
      scheduleInputDateValue,
      scheduleInputTimeValue,
      infoTextContent,
      difMinutes,
      currentDate,
      difDays,
      difGetDayNumber
    );
    calculateNumberOfTasks();
  }
};

function insertSchedulingInfo(
  infoTextContent,
  difDays,
  difMinutes,
  difGetDayNumber,
  scheduleInputTimeValue,
  scheduleInputDateValue,
  currentDate
) {
  if (
    (difDays < 2 && difGetDayNumber == 1 && difMinutes > 60) ||
    (difDays < 2 && difGetDayNumber == -6 && difMinutes > 60)
  ) {
    infoTextContent.innerText = "Prazo: Amanhã, " + scheduleInputTimeValue;
  } else if (
    (difDays < 2 &&
      difGetDayNumber == 1 &&
      difMinutes > 30 &&
      difMinutes <= 60) ||
    (difDays < 2 &&
      difGetDayNumber == -6 &&
      difMinutes > 30 &&
      difMinutes <= 60)
  ) {
    infoTextContent.innerText =
      "Prazo: Amanhã, " +
      scheduleInputTimeValue +
      " - Faltam " +
      Math.ceil(difMinutes) +
      " min";
  } else if (
    (difDays < 2 &&
      difGetDayNumber == 1 &&
      difMinutes > 0 &&
      difMinutes <= 30) ||
    (difDays < 2 && difGetDayNumber == -6 && difMinutes > 0 && difMinutes <= 30)
  ) {
    if (difMinutes <= 1) {
      infoTextContent.innerText =
        "Prazo: Amanhã, " +
        scheduleInputTimeValue +
        " - Falta " +
        Math.ceil(difMinutes) +
        " min";
    } else {
      infoTextContent.innerText =
        "Prazo: Amanhã, " +
        scheduleInputTimeValue +
        " - Faltam " +
        Math.ceil(difMinutes) +
        " min";
    }
  } else if (currentDate === scheduleInputDateValue && difMinutes > 60) {
    infoTextContent.innerText = "Prazo: Hoje, " + scheduleInputTimeValue;
  } else if (
    difMinutes > 30 &&
    difMinutes <= 60 &&
    currentDate === scheduleInputDateValue
  ) {
    infoTextContent.innerText =
      "Prazo: Hoje, " +
      scheduleInputTimeValue +
      " - Faltam " +
      Math.ceil(difMinutes) +
      " min";
  } else if (
    difMinutes > 0 &&
    difMinutes <= 30 &&
    currentDate === scheduleInputDateValue
  ) {
    if (difMinutes <= 1) {
      infoTextContent.innerText =
        "Prazo: Hoje, " +
        scheduleInputTimeValue +
        " - Falta " +
        Math.ceil(difMinutes) +
        " min";
    } else {
      infoTextContent.innerText =
        "Prazo: Hoje, " +
        scheduleInputTimeValue +
        " - Faltam " +
        Math.ceil(difMinutes) +
        " min";
    }
  }
}

function putExpireAlertClass(
  taskField,
  taskInfo,
  difMinutes,
  currentDate,
  difDays,
  difGetDayNumber,
  scheduleInputDateValue
) {
  if (
    (difMinutes > 0 &&
      difMinutes <= 30 &&
      currentDate === scheduleInputDateValue) ||
    (difDays < 2 &&
      difGetDayNumber == 1 &&
      difMinutes > 0 &&
      difMinutes <= 30) ||
    (difDays < 2 && difGetDayNumber == -6 && difMinutes > 0 && difMinutes <= 30)
  ) {
    taskField.classList.add("expireAlert");
    taskInfo.classList.add("expireAlert");
  }
}

function saveScheduledTaskAction(
  infoTaskSave,
  scheduleInputDateValue,
  scheduleInputTimeValue,
  infoTextContent,
  difMinutes,
  currentDate,
  difDays,
  difGetDayNumber
) {
  if (infoTaskSave.deletedInfoTask && !infoTaskSave.scheduledTask) {
    delete infoTaskSave.deletedInfoTask;
  }
  if (!infoTaskSave.deletedInfoTask) {
    infoTaskSave.scheduledTask = [
      true,
      scheduleInputDateValue,
      scheduleInputTimeValue,
      infoTextContent.innerText,
    ];
    if (
      (difMinutes > 0 &&
        difMinutes <= 30 &&
        currentDate === scheduleInputDateValue) ||
      (difDays < 2 &&
        difGetDayNumber == 1 &&
        difMinutes > 0 &&
        difMinutes <= 30) ||
      (difDays < 2 &&
        difGetDayNumber == -6 &&
        difMinutes > 0 &&
        difMinutes <= 30)
    ) {
      infoTaskSave.expireAlert = true;
    }
  }
  localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
}

function saveExpiredTaskAction(
  infoTaskSave,
  scheduleInputDateValue,
  scheduleInputTimeValue,
  infoTextContent
) {
  if (!infoTaskSave.deletedInfoTask) {
    delete infoTaskSave.scheduledTask;
    delete infoTaskSave.expireAlert;
    infoTaskSave.expiredTask = [
      true,
      scheduleInputDateValue,
      scheduleInputTimeValue,
      infoTextContent.innerText,
    ];
    localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
  }
}

// Configuração do botão de remoção do agendamento
const schedulingRemoveClick = (
  taskInfo,
  taskField,
  scheduleBtn,
  editBtn,
  infoTextContent,
  infoTaskSave,
  btnField
) => {
  taskInfo.classList.add("vanishTaskInfo");

  // Salvar ação no Local Storage
  infoTaskSave.deletedInfoTask = true;
  if (infoTaskSave.expiredTask) {
    delete infoTaskSave.expiredTask;
  }
  if (infoTaskSave.expireAlert) {
    delete infoTaskSave.expireAlert;
  }
  if (infoTaskSave.scheduledTask) {
    delete infoTaskSave.scheduledTask;
  }
  localStorage.setItem("tasks", JSON.stringify(dbAllTasks));

  setTimeout(() => {
    infoTextContent.innerText = "";
    taskInfo.classList.remove("scheduled");
    if (taskField.classList.contains("scheduled")) {
      taskField.classList.remove("scheduled");
    }
    if (taskField.classList.contains("expiredTask")) {
      taskField.classList.remove("expiredTask");
    }
    if (taskInfo.classList.contains("expiredTask")) {
      taskInfo.classList.remove("expiredTask");
    }
    if (taskInfo.classList.contains("expireAlert")) {
      taskInfo.classList.remove("expireAlert");
    }
    if (taskField.classList.contains("expireAlert")) {
      taskField.classList.remove("expireAlert");
    }
    btnField.classList.add("animeBtnMobile");
    taskField.classList.add("pointerEventsNone");
    taskInfo.classList.add("hide");
    taskInfo.classList.remove("vanishTaskInfo");
    setTimeout(() => {
      scheduledTasks = dbAllTasks.filter(
        (infoTaskSave) => infoTaskSave.scheduledTask
      );
      expiredTasks = dbAllTasks.filter(
        (infoTaskSave) => infoTaskSave.expiredTask
      );
      if (scheduledTasksFilterBtn.classList.contains("active")) {
        filterTaskByClass("scheduledTask");
      } else if (expiredTasksFilterBtn.classList.contains("active")) {
        filterTaskByClass("expiredTask");
      }
      amountScheduledTasks.innerText = scheduledTasks.length;
      amountExpiredTasks.innerText = expiredTasks.length;
    }, 100);
  }, 200);
  setTimeout(() => {
    taskField.classList.remove("pointerEventsNone");
    scheduleBtn.classList.remove("disabledBtn");
    editBtn.classList.remove("disabledBtn");
    btnField.classList.remove("animeBtnMobile");
  }, 500);
};

// Configuração do botão de exclusão da tarefa
const deleteClick = (taskField, infoTaskSave, notesInfo) => {
  if (taskField.classList.contains("scheduled") || notesInfo.innerText != "") {
    header.classList.add("pointerEventsNone");
    tasksContainer.classList.add("tasksContainerHide");
    if (filtred) {
      filterInformationBox.classList.add("filterInformationBlur");
    }
    mainContainer.classList.add("pointerEventsNone");

    if (
      taskField.classList.contains("scheduled") &&
      notesInfo.innerText != ""
    ) {
      confirmFieldText.innerText =
        "Esta tarefa contém agendamento e anotações, tem certeza de que deseja removê-la?";
    } else if (taskField.classList.contains("scheduled")) {
      confirmFieldText.innerText =
        "Esta tarefa contém um agendamento, tem certeza de que deseja removê-la?";
    } else {
      confirmFieldText.innerText =
        "Esta tarefa contém anotações, tem certeza de que deseja removê-la?";
    }

    confirmField.classList.add("appearWindow");
    confirmField.classList.remove("hide");

    btnYes.onclick = confirmDeleteAction;
    btnYes.focus();

    function confirmDeleteAction() {
      confirmField.classList.remove("appearWindow");
      confirmField.classList.add("vanishWindow");
      tasksContainer.classList.add("tasksContainerAppear");
      if (filtred) {
        filterInformationBox.classList.remove("filterInformationBlur");
        filterInformationBox.classList.add("filterInformationOffBlur");
      }
      const tasks = tasksContainer.childNodes;
      for (const task of tasks) {
        task.classList.remove("hover");
        task.childNodes[1].classList.add("pointerEventsNone");
      }

      // Salvar ação no Local Storage
      infoTaskSave.deletedInfoTask = true;
      localStorage.setItem("tasks", JSON.stringify(dbAllTasks));

      setTimeout(() => {
        taskField.classList.add("vanishTask");
      }, 200);
      setTimeout(() => {
        const index = dbAllTasks.indexOf(infoTaskSave);
        dbAllTasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
        if (dbAllTasks.length < 1) {
          localStorage.removeItem("tasks");
        }
        taskField.remove();
        confirmField.classList.add("hide");
        header.classList.remove("pointerEventsNone");
        tasksContainer.classList.remove("tasksContainerHide");
        if (filtred) {
          filterInformationBox.classList.remove("filterInformationOffBlur");
        }
        mainContainer.classList.remove("pointerEventsNone");
        tasksContainer.classList.remove("tasksContainerAppear");
        confirmField.classList.remove("vanishWindow");
        pendingTasks = dbAllTasks.filter(
          (infoTaskSave) => !infoTaskSave.completedTask
        );
        scheduledTasks = dbAllTasks.filter(
          (infoTaskSave) => infoTaskSave.scheduledTask
        );
        if (scheduledTasksFilterBtn.classList.contains("active")) {
          filterTaskByClass("scheduledTask");
        } else if (pendingTasksFilterBtn.classList.contains("active")) {
          filterTaskByClass("pendingTask");
        }
        amountAllTasks.innerText = tasksContainer.childNodes.length;
        amountPendingTasks.innerText = pendingTasks.length;
        amountScheduledTasks.innerText = scheduledTasks.length;
        setTimeout(() => {
          for (const task of tasks) {
            task.classList.add("hover");
            task.childNodes[1].classList.remove("pointerEventsNone");
          }
        }, 150);
        if (tasksContainer.childNodes.length == 0) {
          noTaskTextContainer.classList.remove("hide");
          disableBtn(removeAllTaskBtn);
          checkRemoveAllConfigBtn();
        }
        if (filtred && searchTaskInput.value != "") {
          filterTaskByInput();
        }
      }, 550);
    }

    btnNo.onclick = () => {
      header.classList.remove("pointerEventsNone");
      tasksContainer.classList.remove("tasksContainerHide");
      if (filtred) {
        filterInformationBox.classList.remove("filterInformationBlur");
        filterInformationBox.classList.add("filterInformationOffBlur");
      }
      mainContainer.classList.remove("pointerEventsNone");
      tasksContainer.classList.add("tasksContainerAppear");
      confirmField.classList.remove("appearWindow");
      confirmField.classList.add("vanishWindow");

      setTimeout(() => {
        confirmField.classList.remove("vanishWindow");
        confirmField.classList.add("hide");
        tasksContainer.classList.remove("tasksContainerAppear");
        if (filtred) {
          filterInformationBox.classList.remove("filterInformationOffBlur");
        }
      }, 200);
    };
  } else {
    taskField.classList.add("vanishTask");
    const tasks = tasksContainer.childNodes;
    for (const task of tasks) {
      task.classList.remove("hover");
      task.childNodes[1].classList.add("pointerEventsNone");
    }

    // Salvar ação no Local Storage
    infoTaskSave.deletedInfoTask = true;
    localStorage.setItem("tasks", JSON.stringify(dbAllTasks));

    setTimeout(() => {
      const index = dbAllTasks.indexOf(infoTaskSave);
      dbAllTasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
      if (dbAllTasks.length < 1) {
        localStorage.removeItem("tasks");
      }
      taskField.remove();
      pendingTasks = dbAllTasks.filter(
        (infoTaskSave) => !infoTaskSave.completedTask
      );
      completedTasks = dbAllTasks.filter(
        (infoTaskSave) => infoTaskSave.completedTask
      );
      expiredTasks = dbAllTasks.filter(
        (infoTaskSave) => infoTaskSave.expiredTask
      );
      scheduledTasks = dbAllTasks.filter(
        (infoTaskSave) => infoTaskSave.scheduledTask
      );
      if (expiredTasksFilterBtn.classList.contains("active")) {
        filterTaskByClass("expiredTask");
        amountExpiredTasks.innerText = expiredTasks.length;
      } else if (completedTasksFilterBtn.classList.contains("active")) {
        filterTaskByClass("completedTask");
        amountCompletedTasks.innerText = completedTasks.length;
      } else if (pendingTasksFilterBtn.classList.contains("active")) {
        filterTaskByClass("pendingTask");
        amountExpiredTasks.innerText = expiredTasks.length;
        amountCompletedTasks.innerText = completedTasks.length;
      } else {
        amountExpiredTasks.innerText = expiredTasks.length;
        amountCompletedTasks.innerText = completedTasks.length;
      }
      amountAllTasks.innerText = tasksContainer.childNodes.length;
      amountPendingTasks.innerText = pendingTasks.length;
      setTimeout(() => {
        for (const task of tasks) {
          task.classList.add("hover");
          task.childNodes[1].classList.remove("pointerEventsNone");
        }
      }, 150);
      if (tasksContainer.childNodes.length == 0) {
        noTaskTextContainer.classList.remove("hide");
        disableBtn(removeAllTaskBtn);
        checkRemoveAllConfigBtn();
      }
      if (filtred && searchTaskInput.value != "") {
        filterTaskByInput();
      }
    }, 350);
  }
};

// Configuração do botão para exclusão de todas as tarefas

removeAllTaskBtn.addEventListener("click", () => {
  showConfirmField(
    "Esta ação irá excluir todas as tarefas, tem certeza de que deseja removê-las?",
    confirmRemoveAllTasks
  );
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
    filterInformationBox.classList.add("filterInformationBlur");
  }
  window.classList.remove("hide");
  window.classList.add("appearWindow");
}

function showConfirmField(text, funct) {
  showWindow(confirmField);
  confirmFieldText.innerText = text;
  btnYes.focus();
  btnYes.onclick = () => funct();
  btnNo.onclick = () => hideWindow(confirmField);
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
    if (menu.classList.contains("menuBlur")) {
      menu.classList.remove("menuBlur");
      menu.classList.add("menuOffBlur");
    }
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
    if (menuOpen) {
      menu.classList.remove("menuOffBlur");
    }
  }, 200);
}

function removeAllTasks() {
  const tasks = tasksContainer.childNodes;
  for (const task of tasks) {
    task.classList.add("vanishTask");
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
  hideWindow(confirmField);
  setTimeout(() => {
    removeAllTasks();
    checkRemoveAllConfigBtn();
  }, 200);
}

// Configuração do botão para restaurar todas as configurações de fábrica

removeAllConfigBtn.addEventListener("click", () => {
  showConfirmField(
    "Esta ação irá excluir todas as configurações já realizadas e todas as tarefas, tem certeza?",
    confirmRemoveAllConfig
  );
  menu.classList.add("menuBlur");
});

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

function confirmRemoveAllConfig() {
  hideWindow(confirmField);
  setTimeout(() => {
    removeAllConfig();
  }, 200);
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
  if (
    !localStorage.getItem("tasks") &&
    !localStorage.getItem("infoAccountImg") &&
    !localStorage.getItem("infoAccountName") &&
    !localStorage.getItem("theme")
  ) {
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

let notePadContainerShow = false;
let inputEquality = true;

function notesBtnClick(
  taskField,
  notePadInput,
  notePadContainer,
  cleanNoteBtn,
  notesInfo,
  notesBtn,
  notesBtnAlert,
  infoTaskSave,
  taskInfo
) {
  inputEquality = true;
  header.classList.add("pointerEventsNone");
  notePadContainer.classList.remove("hide");
  notePadContainer.classList.add("notePadContainerAppear");
  taskField.classList.remove("hover");
  taskField.classList.add("active");
  taskInfo.classList.add("active");
  const tasks = tasksContainer.childNodes;
  for (const task of tasks) {
    task.classList.add("pointerEventsNone");
    task.classList.add("lowOpacity");
  }
  taskField.classList.remove("lowOpacity");
  notePadInput.value = notesInfo.innerText;
  notesBtn.disabled = true;
  if (notesInfo.innerText == "") {
    cleanNoteBtn.classList.add("hide");
  } else {
    cleanNoteBtn.classList.remove("hide");
  }
  setTimeout(() => {
    notePadContainer.classList.remove("notePadContainerAppear");
    notePadContainer.classList.add("pointerEventsVisible");
    notesBtn.disabled = false;
  }, 200);
  setTimeout(() => {
    notePadContainerShow = !notePadContainerShow;
  }, 400);
  document.onclick = (e) => {
    if (
      notePadContainerShow &&
      !notePadContainer.contains(e.target) &&
      !notesBtn.contains(e.target)
    ) {
      saveNoteClick(
        notePadContainer,
        taskField,
        notePadInput,
        notesInfo,
        notesBtnAlert,
        infoTaskSave,
        taskInfo
      );
    }
  };
  notePadInput.onkeypress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  notePadInput.onkeyup = (e) => {
    if (e.key !== "Enter") {
      const validateField = () => notePadInput.value != "";
      if (!validateField()) {
        cleanNoteBtn.classList.add("hide");
        if (notesInfo.innerText == notePadInput.value.trim()) {
          inputEquality = true;
        } else {
          inputEquality = false;
        }
      } else {
        cleanNoteBtn.classList.remove("hide");
        if (notesInfo.innerText == notePadInput.value.trim()) {
          inputEquality = true;
        } else {
          inputEquality = false;
        }
      }
    } else {
      saveNoteClick(
        notePadContainer,
        taskField,
        notePadInput,
        notesInfo,
        notesBtnAlert,
        infoTaskSave,
        taskInfo
      );
    }
  };
}

function saveNoteClick(
  notePadContainer,
  taskField,
  notePadInput,
  notesInfo,
  notesBtnAlert,
  infoTaskSave,
  taskInfo
) {
  notePadContainer.classList.add("notePadContainerVanish");
  notesInfo.innerText = notePadInput.value.trim();
  notePadContainer.classList.remove("pointerEventsVisible");
  notePadContainerShow = !notePadContainerShow;
  setTimeout(() => {
    notePadContainer.classList.remove("notePadContainerVanish");
    notePadContainer.classList.add("hide");
    switch (notesInfo.innerText != "" && !inputEquality) {
      case true:
        taskField.classList.add("shakeMove");
        break;
    }
    if (notesInfo.innerText != "") {
      notesBtnAlert.classList.remove("hide");
    } else {
      notesBtnAlert.classList.add("hide");
    }
  }, 200);
  if (notesInfo.innerText != "" && !inputEquality) {
    // Salvar ação no Local Storage
    infoTaskSave.savedNote = [true, notesInfo.innerText];
    localStorage.setItem("tasks", JSON.stringify(dbAllTasks));

    setTimeout(() => {
      const tasks = tasksContainer.childNodes;
      for (const task of tasks) {
        if (task.classList.contains("lowOpacity")) {
          task.classList.remove("lowOpacity");
        }
        task.classList.add("normalOpacity");
      }
      taskField.classList.remove("normalOpacity");
      taskField.classList.remove("shakeMove");
      taskField.classList.remove("active");
      taskInfo.classList.remove("active");
    }, 500);

    setTimeout(() => {
      taskField.classList.add("hover");
      header.classList.remove("pointerEventsNone");
      const tasks = tasksContainer.childNodes;
      for (const task of tasks) {
        task.classList.remove("pointerEventsNone");
        if (task.classList.contains("normalOpacity")) {
          task.classList.remove("normalOpacity");
        }
      }
    }, 800);
  } else {
    if (notesInfo.innerText == "") {
      // Salvar ação no Local Storage
      if (infoTaskSave.savedNote) {
        delete infoTaskSave.savedNote;
        localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
      }
    }
    setTimeout(() => {
      const tasks = tasksContainer.childNodes;
      for (const task of tasks) {
        if (task.classList.contains("lowOpacity")) {
          task.classList.remove("lowOpacity");
        }
        task.classList.add("normalOpacity");
      }
      taskField.classList.remove("normalOpacity");
      taskField.classList.remove("active");
      taskInfo.classList.remove("active");
    }, 300);

    setTimeout(() => {
      taskField.classList.add("hover");
      header.classList.remove("pointerEventsNone");
      const tasks = tasksContainer.childNodes;
      for (const task of tasks) {
        task.classList.remove("pointerEventsNone");
        if (task.classList.contains("normalOpacity")) {
          task.classList.remove("normalOpacity");
        }
      }
    }, 600);
  }
}

function cleanNoteClick(notePadInput, cleanNoteBtn, notePadContainer) {
  notePadInput.value = "";
  notePadInput.focus();
  cleanNoteBtn.classList.add("hide");
  notePadContainer.classList.add("shakeMove");
  setTimeout(() => {
    notePadContainer.classList.remove("shakeMove");
  }, 300);
}

// Configuração para alternar entre dark/white mode
const html = document.querySelector("html");
const themeCheckBox = document.querySelector("#themeCheckBox");
const logoImgMobile = document.querySelector("#logoImgMobile");

function toDarkTheme() {
  html.classList.add("darkTheme");
  scheduleInputDate.classList.add("darkTheme");
  scheduleInputTime.classList.add("darkTheme");
  logoImgMobile.src = "./img/logo_light_mobile.png";
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
  logoImgMobile.src = "./img/logo_dark_mobile.png";
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

function createTask(taskField) {
  taskField.classList.add("taskField");
  taskField.classList.add("hover");
}

function saveCreatedTask(infoTaskSave) {
  infoTaskSave["taskContent"] = newTaskInput.value;
  dbAllTasks.unshift(infoTaskSave);
  localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
}

function insertTextContent(taskField, taskContent, infoTaskSave) {
  taskContent.innerText = infoTaskSave["taskContent"];
  taskContent.classList.add("taskContent");
  taskField.appendChild(taskContent);
  newTaskInput.value = "";
}

function createBtnField(taskField, btnField) {
  taskField.appendChild(btnField);
  btnField.classList.add("btnField");
}

function createTaskInfo(
  taskField,
  taskInfo,
  infoTextContent,
  schedulingRemoveBtn,
  completedTaskIcon,
  btnField,
  infoTaskSave,
  editBtn,
  scheduleBtn
) {
  const schedulingRemoveBtnIcon = document.createElement("i");
  taskInfo.classList.add("taskInfo");
  taskInfo.classList.add("hide");
  infoTextContent.classList.add("infoTextContent");
  completedTaskIcon.classList.add("completedTaskIcon");
  completedTaskIcon.classList.add("fa-solid");
  completedTaskIcon.classList.add("fa-check");
  completedTaskIcon.classList.add("hide");
  taskField.appendChild(taskInfo);
  taskInfo.appendChild(infoTextContent);
  taskInfo.appendChild(schedulingRemoveBtn);
  taskInfo.appendChild(completedTaskIcon);
  schedulingRemoveBtn.classList.add("schedulingRemoveBtn");
  schedulingRemoveBtn.appendChild(schedulingRemoveBtnIcon);
  schedulingRemoveBtnIcon.classList.add("fa-regular");
  schedulingRemoveBtnIcon.classList.add("fa-circle-xmark");
  schedulingRemoveBtn.addEventListener("click", () =>
    schedulingRemoveClick(
      taskInfo,
      taskField,
      scheduleBtn,
      editBtn,
      infoTextContent,
      infoTaskSave,
      btnField
    )
  );
}

function createNotPadContainer(
  taskField,
  notePadContainer,
  notesBtnAlert,
  infoTaskSave,
  notePadInput,
  notesInfo,
  cleanNoteBtn
) {
  const notePadTop = document.createElement("div");
  const notePadBtnField = document.createElement("div");
  const saveNoteBtn = document.createElement("button");
  const notePadTitle = document.createElement("p");
  const cleanNoteBtnIcon = document.createElement("i");
  const saveNoteBtnIcon = document.createElement("i");

  notePadContainer.classList.add("notePadContainer");
  notePadContainer.classList.add("hide");
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
  saveNoteBtnIcon.classList.add("fa-angles-up");
  notePadInput.setAttribute("spellcheck", "false");
  notesInfo.classList.add("notesInfo");
  notesInfo.classList.add("hide");
  taskField.appendChild(notePadContainer);
  notePadContainer.appendChild(notePadTop);
  notePadContainer.appendChild(notePadInput);
  notePadContainer.appendChild(notePadBtnField);
  notePadContainer.appendChild(notesInfo);
  notePadTop.appendChild(notePadTitle);
  notePadTitle.innerText = "Anotações";
  notePadTop.appendChild(saveNoteBtn);
  saveNoteBtn.appendChild(saveNoteBtnIcon);
  notePadBtnField.appendChild(cleanNoteBtn);
  cleanNoteBtn.appendChild(cleanNoteBtnIcon);
  saveNoteBtn.addEventListener("click", () =>
    saveNoteClick(
      notePadContainer,
      taskField,
      notePadInput,
      notesInfo,
      notesBtnAlert,
      infoTaskSave,
      taskInfo
    )
  );
  cleanNoteBtn.addEventListener("click", () =>
    cleanNoteClick(notePadInput, cleanNoteBtn, notePadContainer)
  );
}

function createCompleteTaskBtn(
  taskField,
  taskContent,
  btnField,
  scheduleBtn,
  editBtn,
  checkBtn,
  checkIcon,
  taskInfo,
  infoTextContent,
  completedTaskIcon,
  schedulingRemoveBtn,
  infoTaskSave
) {
  btnField.appendChild(checkBtn);
  checkBtn.classList.add("checkBtn");
  checkBtn.appendChild(checkIcon);
  checkIcon.classList.add("fa-solid");
  checkIcon.classList.add("fa-thumbs-up");
  checkBtn.setAttribute("title", "Concluir");
  checkBtn.addEventListener("click", () =>
    completeTaskClick(
      taskField,
      taskContent,
      scheduleBtn,
      editBtn,
      checkBtn,
      checkIcon,
      taskInfo,
      infoTextContent,
      completedTaskIcon,
      schedulingRemoveBtn,
      infoTaskSave
    )
  );
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

function createScheduleTaskBtn(
  taskField,
  scheduleBtn,
  taskInfo,
  infoTextContent,
  schedulingRemoveBtn,
  infoTaskSave,
  btnField
) {
  const scheduleIcon = document.createElement("i");
  btnField.appendChild(scheduleBtn);
  scheduleBtn.classList.add("scheduleBtn");
  scheduleBtn.appendChild(scheduleIcon);
  scheduleIcon.classList.add("fa-solid");
  scheduleIcon.classList.add("fa-clock");
  scheduleBtn.setAttribute("title", "Definir prazo");
  scheduleBtn.addEventListener("click", () =>
    scheduleClick(
      taskField,
      scheduleBtn,
      taskInfo,
      infoTextContent,
      schedulingRemoveBtn,
      infoTaskSave,
      btnField
    )
  );
}

function createNotesBtn(
  taskField,
  notePadInput,
  notePadContainer,
  cleanNoteBtn,
  notesInfo,
  notesBtn,
  notesBtnAlert,
  infoTaskSave,
  taskInfo,
  btnField
) {
  const notesBtnIcon = document.createElement("i");
  btnField.appendChild(notesBtn);
  notesBtn.classList.add("notesBtn");
  notesBtn.appendChild(notesBtnIcon);
  notesBtn.appendChild(notesBtnAlert);
  notesBtnIcon.classList.add("fa-solid");
  notesBtnIcon.classList.add("fa-file-lines");
  notesBtnAlert.classList.add("notesBtnAlert");
  notesBtnAlert.classList.add("hide");
  notesBtn.setAttribute("title", "Anotações");
  notesBtn.addEventListener("click", () =>
    notesBtnClick(
      taskField,
      notePadInput,
      notePadContainer,
      cleanNoteBtn,
      notesInfo,
      notesBtn,
      notesBtnAlert,
      infoTaskSave,
      taskInfo
    )
  );
}

function createRemoveTaskBtn(
  taskField,
  infoTaskSave,
  notesInfo,
  btnField,
  removeBtn
) {
  const removeIcon = document.createElement("i");
  btnField.appendChild(removeBtn);
  removeBtn.classList.add("removeBtn");
  removeBtn.appendChild(removeIcon);
  removeIcon.classList.add("fa-solid");
  removeIcon.classList.add("fa-trash");
  removeBtn.setAttribute("title", "Excluir tarefa");
  removeBtn.addEventListener("click", () =>
    deleteClick(taskField, infoTaskSave, notesInfo)
  );
}

function taskConstructor(taskField, infoTaskSave) {
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
  const notesInfo = document.createElement("span");
  const notesBtnAlert = document.createElement("span");
  const notePadInput = document.createElement("textarea");
  const taskContent = document.createElement("p");

  // Criação da tarefa
  createTask(taskField);

  // Inserção do texto da tarefa
  insertTextContent(taskField, taskContent, infoTaskSave);

  // Campo dos botões/ícones
  createBtnField(taskField, btnField);

  // Criação do campo de informações da tarefa
  createTaskInfo(
    taskField,
    taskInfo,
    infoTextContent,
    schedulingRemoveBtn,
    completedTaskIcon,
    btnField,
    infoTaskSave,
    editBtn,
    scheduleBtn
  );

  // Campo para anotações da tarefa
  createNotPadContainer(
    taskField,
    notePadContainer,
    notesBtnAlert,
    infoTaskSave,
    notePadInput,
    notesInfo,
    cleanNoteBtn
  );

  // Botão para conclusão da tarefa
  createCompleteTaskBtn(
    taskField,
    taskContent,
    btnField,
    scheduleBtn,
    editBtn,
    checkBtn,
    checkIcon,
    taskInfo,
    infoTextContent,
    completedTaskIcon,
    schedulingRemoveBtn,
    infoTaskSave
  );

  //Botão para edição da tarefa
  createEditTaskBtn(btnField, editBtn, taskContent, infoTaskSave);

  // Botão para agendamento da tarefa
  createScheduleTaskBtn(
    taskField,
    scheduleBtn,
    taskInfo,
    infoTextContent,
    schedulingRemoveBtn,
    infoTaskSave,
    btnField
  );

  // Botão para adiconar anotações sobre a tarefa
  createNotesBtn(
    taskField,
    notePadInput,
    notePadContainer,
    cleanNoteBtn,
    notesInfo,
    notesBtn,
    notesBtnAlert,
    infoTaskSave,
    taskInfo,
    btnField
  );

  // Botão para exclusão da tarefa
  createRemoveTaskBtn(taskField, infoTaskSave, notesInfo, btnField, removeBtn);

  // Recuperação das tarefas em tela, caso seja requisitado
  switch (infoTaskSave.completedTask) {
    case true:
      taskContent.classList.toggle("completed");
      taskField.classList.toggle("completed");
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
      taskField.classList.add("scheduled");
      schedulingRemoveBtn.setAttribute("title", "Cancelar agendamento");
      scheduleBtn.classList.add("disabledBtn");
      infoTextContent.innerText = infoTaskSave.scheduledTask[3];
      break;
  }

  switch (infoTaskSave.savedNote && infoTaskSave.savedNote[0]) {
    case true:
      notesInfo.innerText = infoTaskSave.savedNote[1];
      notesBtnAlert.classList.remove("hide");
      break;
  }

  switch (infoTaskSave.expireAlert) {
    case true:
      taskField.classList.add("expireAlert");
      taskInfo.classList.add("expireAlert");
      break;
  }

  switch (infoTaskSave.expiredTask && infoTaskSave.expiredTask[0]) {
    case true:
      taskField.classList.add("expiredTask");
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

function clearTaskClass(infoTextContent, taskInfo, taskField) {
  if (
    taskField.classList.contains("scheduled") ||
    taskField.classList.contains("expiredTask")
  ) {
    infoTextContent.innerText = "";
  }
  if (!taskInfo.classList.contains("hide")) {
    taskInfo.classList.add("hide");
  }
  if (taskInfo.classList.contains("scheduled")) {
    taskField.classList.remove("scheduled");
    taskInfo.classList.remove("scheduled");
  }
  if (taskField.classList.contains("expireAlert")) {
    taskField.classList.remove("expireAlert");
    taskInfo.classList.remove("expireAlert");
  }
  if (taskField.classList.contains("expiredTask")) {
    taskField.classList.remove("expiredTask");
    taskInfo.classList.remove("expiredTask");
  }
  if (taskField.classList.contains("completed")) {
    taskField.classList.remove("completed");
    taskInfo.classList.remove("completed");
  }
}

function transitionClickProtection(option) {
  const tasks = tasksContainer.childNodes;
  if (option == "add") {
    for (const task of tasks) {
      task.classList.remove("hover");
      task.childNodes[1].classList.add("pointerEventsNone");
    }
  } else {
    for (const task of tasks) {
      task.classList.add("hover");
      task.childNodes[1].classList.remove("pointerEventsNone");
    }
  }
}

function includePointerEventsNoneAllTasks(option) {
  const tasks = tasksContainer.childNodes;
  if (option == "add") {
    for (const task of tasks) {
      task.classList.add("pointerEventsNone");
    }
  } else {
    for (const task of tasks) {
      task.classList.remove("pointerEventsNone");
    }
  }
}

// ----- Funções auxiliares (Completar e restaurar tarefas) -----

function completeTaskBtnToggle(
  taskField,
  taskContent,
  checkIcon,
  checkBtn,
  scheduleBtn,
  editBtn,
  completedTaskIcon,
  schedulingRemoveBtn
) {
  checkIcon.classList.toggle("fa-thumbs-up");
  checkIcon.classList.toggle("fa-rotate");
  checkIcon.classList.toggle("fa-spin");
  if (!taskField.classList.contains("expiredTask")) {
    editBtn.classList.toggle("disabledBtn");
  }
  if (
    !taskField.classList.contains("scheduled") &&
    !taskField.classList.contains("expiredTask")
  ) {
    scheduleBtn.classList.toggle("disabledBtn");
  }
  completedTaskIcon.classList.toggle("hide");
  schedulingRemoveBtn.classList.toggle("hide");
  taskContent.classList.toggle("completed");
  if (!taskField.classList.contains("completed")) {
    checkBtn.setAttribute("title", "Restaurar");
  } else {
    checkBtn.setAttribute("title", "Concluir");
  }
}

function saveCompleteTaskAction(infoTaskSave) {
  if (infoTaskSave.deletedInfoTask) {
    delete infoTaskSave.deletedInfoTask;
  }
  if (infoTaskSave.scheduledTask) {
    delete infoTaskSave.scheduledTask;
  }
  if (infoTaskSave.expireAlert) {
    delete infoTaskSave.expireAlert;
  }
  if (infoTaskSave.expiredTask) {
    delete infoTaskSave.expiredTask;
  }
  if (!infoTaskSave.completedTask) {
    infoTaskSave.completedTask = true;
  } else {
    delete infoTaskSave.completedTask;
  }
  localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
}

function putCompletedTask(taskField, taskInfo, infoTextContent) {
  taskField.classList.add("completed");
  taskInfo.classList.add("completed");
  taskInfo.classList.remove("hide");
  infoTextContent.innerText = "Tarefa concluída";
}

function completeTask(
  taskField,
  taskContent,
  checkBtn,
  checkIcon,
  editBtn,
  scheduleBtn,
  taskInfo,
  infoTextContent,
  schedulingRemoveBtn,
  completedTaskIcon,
  infoTaskSave
) {
  saveCompleteTaskAction(infoTaskSave);
  transitionClickProtection("add");
  taskField.classList.add("vanishTask");
  setTimeout(() => {
    completeTaskBtnToggle(
      taskField,
      taskContent,
      checkIcon,
      checkBtn,
      scheduleBtn,
      editBtn,
      completedTaskIcon,
      schedulingRemoveBtn
    );
    if (taskField.classList.contains("completed")) {
      clearTaskClass(infoTextContent, taskInfo, taskField);
    } else if (
      taskField.classList.contains("scheduled") ||
      taskField.classList.contains("expiredTask")
    ) {
      clearTaskClass(infoTextContent, taskInfo, taskField);
      putCompletedTask(taskField, taskInfo, infoTextContent);
    } else {
      putCompletedTask(taskField, taskInfo, infoTextContent);
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
    taskConstructor(taskField, infoTaskSave);
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
      const taskInfo = taskField.childNodes[2];
      const infoTextContent = taskInfo.firstChild;
      const schedulingRemoveBtn = taskInfo.childNodes[1];
      const scheduleInputDateValue =
        infoTaskSave.scheduledTask?.[1] ?? infoTaskSave.expiredTask[1];
      const scheduleInputTimeValue =
        infoTaskSave.scheduledTask?.[2] ?? infoTaskSave.expiredTask[2];
      const scheduledDate = new Date(
        scheduleInputDateValue + " " + scheduleInputTimeValue
      );
      const btnField = taskField.childNodes[1];
      const editBtn = btnField.childNodes[1];
      const difSeconds =
        (scheduledDate.getTime() - currentFullDate.getTime()) / 1000;
      const difMinutes = difSeconds / 60;
      const difDays = difMinutes / (60 * 24);
      const difGetDayNumber = scheduledDate.getDay() - currentFullDate.getDay();
      const difSecondsCurrentToScheduled =
        (currentFullDate.getTime() - scheduledDate.getTime()) / 1000;
      const difMinutesCurrentToScheduled = difSecondsCurrentToScheduled / 60;
      const difDaysCurrentToScheduled =
        difMinutesCurrentToScheduled / (60 * 24);
      const difGetDayNumberCurrentToScheduled =
        currentFullDate.getDay() - scheduledDate.getDay();

      if (difSeconds <= 0) {
        saveExpiredTaskAction(
          infoTaskSave,
          scheduleInputDateValue,
          scheduleInputTimeValue,
          infoTextContent
        )
        calculateNumberOfTasks();
        checkActivatedClassBtnAndFilter();
        taskInfo.classList.remove("scheduled");
        taskInfo.classList.remove("expireAlert");
        taskInfo.classList.add("expiredTask");
        taskField.classList.remove("scheduled");
        taskField.classList.remove("expireAlert");
        taskField.classList.add("expiredTask");
        schedulingRemoveBtn.setAttribute("title", "Restaurar");
        editBtn.classList.add("disabledBtn");
        if (currentDate === scheduleInputDateValue) {
          infoTextContent.innerText = "Expirou hoje, " + scheduleInputTimeValue;
        } else if (difDaysCurrentToScheduled < 2 && difGetDayNumber == 6) {
          infoTextContent.innerText =
            "Expirou ontem, " + scheduleInputTimeValue;
        } else if (
          difDaysCurrentToScheduled < 2 &&
          difGetDayNumberCurrentToScheduled == 1
        ) {
          infoTextContent.innerText =
            "Expirou ontem, " + scheduleInputTimeValue;
        } else {
          infoTextContent.innerText =
            "Expirou " +
            scheduledDate.toLocaleDateString("pt-BR") +
            ", " +
            scheduleInputTimeValue;
        }
      } else {
        insertSchedulingInfo(
          infoTextContent,
          difDays,
          difMinutes,
          difGetDayNumber,
          scheduleInputTimeValue,
          scheduleInputDateValue,
          currentDate
        );
      }
      if(!infoTaskSave.expiredTask) {
        saveScheduledTaskAction(
          infoTaskSave,
          scheduleInputDateValue,
          scheduleInputTimeValue,
          infoTextContent,
          difMinutes,
          currentDate,
          difDays,
          difGetDayNumber
        );
      }
      putExpireAlertClass(
        taskField,
        taskInfo,
        difMinutes,
        currentDate,
        difDays,
        difGetDayNumber,
        scheduleInputDateValue
      );
    }
  }
}, 1000);

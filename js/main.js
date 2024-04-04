// Campo de texto principal para informar as tarefas que serão adicionadas
const newTaskInput = document.querySelector("#newTaskInput");

// Focar no input ao carregar página
newTaskInput.focus();

// Campo onde as novas tarefas serão adicionadas
const tasksContainer = document.querySelector("#tasksContainer");

// Função para identificar se o campo de tarefas está vazio
const noTaskTextContainer = document.querySelector("#noTaskTextContainer");

// Container principal do projeto
const mainContainer = document.querySelector("#mainContainer");

// Checagem/controle de altura do container onde as tarefas serão adicionadas
const currentHeightMain = mainContainer.offsetHeight;
let currentHeightTasksContainer = tasksContainer.offsetHeight;

function checkTasksContainerHeight() {
  currentHeightTasksContainer = tasksContainer.offsetHeight;
  if (currentHeightTasksContainer > currentHeightMain) {
    mainContainer.classList.add("scrollActive");
  } else {
    mainContainer.classList.remove("scrollActive");
  }
}

// Variáveis para guardar tarefas no banco de dados (Local Storage)
let dbTasks = [];
taskRecover();

// Configuração para guardar imagem do perfil do usuário no localStorage

const inputFileImg = document.querySelector("#inputFileImg");
const uploadedImg = document.querySelector("#uploadedImg");
const inputFileImgLabelIcon = document.querySelector('#inputFileImgLabelIcon')
const inputFileImgIcon = document.querySelector('#inputFileImgIcon')
let dbInfoAccountImg = [];

if (localStorage.getItem("infoAccountImg")) {
  dbInfoAccountImg = JSON.parse(localStorage.getItem("infoAccountImg"));
  window.onload = () => {
    uploadedImg.src = dbInfoAccountImg[0].img;
  };
}

function loadImage(e) {
  const filePath = e.target;
  const file = filePath.files;
  if (file.length > 0 && !file[0].type.includes("image")) {
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
    fileReader.readAsDataURL(file[0]);
    inputFileImgLabelIcon.setAttribute("title", "Remover foto")
    inputFileImg.setAttribute("title", "Alterar foto")
    inputFileImgLabelIcon.removeAttribute("for")
    inputFileImgIcon.classList.remove("fa-plus")
    inputFileImgIcon.classList.add("fa-trash-can")
  }
}

inputFileImg.addEventListener("change", loadImage);

// Nome do usuário

const nameInput = document.querySelector("#nameInput");
const nameIdentIcon = document.querySelector("#nameIdentIcon");
let dbInfoAccountName = [];
if (localStorage.getItem("infoAccountName")) {
  dbInfoAccountName = JSON.parse(localStorage.getItem("infoAccountName"));
  nameInput.value = dbInfoAccountName[0].name.trim();
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

function saveName() {
  nameIdentIcon.classList.remove("active");
  nameInput.classList.remove("active");
  if (nameInput.value.trim() == "" || nameInput.value == "Meu Task Control!") {
    nameInput.value = "Meu Task Control!"
    localStorage.removeItem("infoAccountName")
  } else {
    const nameAccountSave = new Object();
    dbInfoAccountName = [];
    nameAccountSave.name = nameInput.value.trim();
    nameInput.value = nameInput.value.trim();
    dbInfoAccountName.push(nameAccountSave);
    localStorage.setItem("infoAccountName", JSON.stringify(dbInfoAccountName));
  }
}

// Filtros das tarefas
const allFilter = document.querySelector("#filterContainer");
const allTaskFilter = document.querySelector("#allTaskFilter");
const pendingTaskFilter = document.querySelector("#pendingTaskFilter");
const scheduleTaskFilter = document.querySelector("#scheduleTaskFilter");
const expiredTaskFilter = document.querySelector("#expiredTaskFilter");
const completedTaskFilter = document.querySelector("#completedTaskFilter");
const allTaskFilterAmount = document.querySelector("#allTaskFilterAmount");
const pendingTaskFilterAmount = document.querySelector(
  "#pendingTaskFilterAmount"
);
const scheduleTaskFilterAmount = document.querySelector(
  "#scheduleTaskFilterAmount"
);
const expiredTaskFilterAmount = document.querySelector(
  "#expiredTaskFilterAmount"
);
const completedTaskFilterAmount = document.querySelector(
  "#completedTaskFilterAmount"
);

const filters = allFilter.children;
allTaskFilter.classList.add("active");
allTaskFilterAmount.innerText = tasksContainer.childNodes.length;
let pendingTasks = dbTasks.filter((infoTaskSave) => !infoTaskSave.completeTask);
let scheduledTasks = dbTasks.filter(
  (infoTaskSave) => infoTaskSave.scheduledTask
);
let expiredTasks = dbTasks.filter((infoTaskSave) => infoTaskSave.expiredTask);
let completedTasks = dbTasks.filter(
  (infoTaskSave) => infoTaskSave.completeTask
);
pendingTaskFilterAmount.innerText = pendingTasks.length;
scheduleTaskFilterAmount.innerText = scheduledTasks.length;
expiredTaskFilterAmount.innerText = expiredTasks.length;
completedTaskFilterAmount.innerText = completedTasks.length;

const searchTaskInput = document.querySelector("#searchTaskInput");
const searchTaskInputBtn = document.querySelector("#searchCleanBtn");
let inputValue = "";
let filtred = false;
let containsHide = [];

searchTaskInput.onkeyup = () => {
  if (inputValue != searchTaskInput.value.trim()) {
    filtred = true;
    inputValue = searchTaskInput.value.trim();
    if (!allTaskFilter.classList.contains("active")) {
      for (const filter of filters) {
        if (filter.classList.contains("active")) {
          filter.classList.remove("active");
        }
      }
      allTaskFilter.classList.add("active");
      allTaskFilterFunction();
    }
    taskFilter();
    checkTasksContainerHeight();
  }
  if (searchTaskInput.value != "") {
    if (searchTaskInputBtn.classList.contains("hide")) {
      searchTaskInputBtn.classList.remove("hide");
    }
  } else {
    filtred = false;
    if (!searchTaskInputBtn.classList.contains("hide")) {
      searchTaskInputBtn.classList.add("hide");
    }
  }
};

function taskFilter() {
  containsHide = [];
  for (let i = 0; i < dbTasks.length; i++) {
    const infoTaskSave = dbTasks[i];
    const task = tasksContainer.childNodes[i];

    if (
      !infoTaskSave.taskContent
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
          inputValue
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

searchTaskInputBtn.addEventListener("click", () => {
  searchTaskInput.value = "";
  searchTaskInput.focus();
  searchTaskInputBtn.classList.add("hide");
  filtred = false;
  inputValue = "";
  for (const filter of filters) {
    if (filter.classList.contains("active")) {
      filter.classList.remove("active");
    }
  }
  allTaskFilter.classList.add("active");
  allTaskFilterFunction();
});

//Configuração do botão de Menu

const menuBtn = document.querySelector("#menuButton");
const menu = document.querySelector(".menu");
const menuBtnIcon = document.querySelector("#menuButtonIcon");
let menuOpen = false;

function menuOpenFunction() {
  menuOpen = !menuOpen;
  menu.classList.remove("hide");
  menu.classList.add("menuAppear");
  menuBtnIcon.classList.toggle("fa-angles-down");
  menuBtnIcon.classList.toggle("fa-xmark");
  menuBtn.classList.toggle("active");
  menuBtn.disabled = true;
  setTimeout(() => {
    menu.classList.remove("menuAppear");
    searchTaskInput.focus();
    menuBtn.disabled = false;
  }, 300);
}

function menuCloseFunction() {
  menuOpen = !menuOpen;
  menu.classList.add("menuVanish");
  menuBtnIcon.classList.toggle("fa-angles-down");
  menuBtnIcon.classList.toggle("fa-xmark");
  menuBtn.disabled = true;
  setTimeout(() => {
    menu.classList.add("hide");
    menu.classList.remove("menuVanish");
    menuBtn.classList.toggle("active");
    newTaskInput.focus();
    menuBtn.disabled = false;
  }, 300);
}

menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    menuOpenFunction();
  } else {
    menuCloseFunction();
  }
});

// Botão para limpar o campo de texto principal
const cleanInputBtn = document.querySelector("#cleanInputBtn");
cleanInputBtn.setAttribute("title", "Limpar");
cleanInputBtn.addEventListener("click", () => {
  cleanInputBtn.style.display = "none";
  newTaskInput.value = "";
  newTaskInput.focus();
});

newTaskInput.onkeyup = () => {
  const validateField = () => newTaskInput.value != "";
  if (!validateField()) {
    cleanInputBtn.style.display = "none";
  } else {
    cleanInputBtn.style.display = "inline";
  }
};

// Botão para adicionar a nova tarefa
const newTaskBtn = document.querySelector("#newTaskBtn");

newTaskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    insertTask();
  }
});

newTaskBtn.addEventListener("click", insertTask);

function insertTask() {
  // Validação do input principal
  const validateField = () => newTaskInput.value.trim() != "";
  if (!validateField()) {
    // Caso o valor do input seja inválido: Será adicionado a class abaixo no input
    newTaskInput.classList.add("inputError");
    newTaskInput.blur();
    // Evento de foco, para tirar o "erro" do input
    newTaskInput.onfocus = () => {
      if (newTaskInput.classList.contains("inputError")) {
        newTaskInput.classList.remove("inputError");
        cleanInputBtn.style.display = "none";
        newTaskInput.value = "";
      }
    };
  } else {
    // Caso o valor do input seja válido: Criação dos parágrafos e botões referentes a cada tarefa adicionada

    cleanInputBtn.style.display = "none";

    // Tarefa
    const taskField = document.createElement("div");
    newTaskInput.blur();
    taskField.classList.add("taskField");
    taskField.classList.add("hover");
    taskField.classList.add("appearTask");

    setTimeout(() => {
      newTaskInput.focus();
      taskField.classList.remove("appearTask");
    }, 200);
    if (!noTaskTextContainer.classList.contains("hide")) {
      noTaskTextContainer.classList.add("hide");
    }

    // Texto da tarefa
    const taskContent = document.createElement("p");
    taskField.appendChild(taskContent);
    taskContent.classList.add("taskContent");
    taskContent.innerText = newTaskInput.value;
    newTaskInput.value = "";

    // Salvar tarefa no Local Storage
    const infoTaskSave = new Object();
    infoTaskSave.taskContent = taskContent.innerText;
    dbTasks.unshift(infoTaskSave);
    localStorage.setItem("tasks", JSON.stringify(dbTasks));

    pendingTasks = dbTasks.filter((infoTaskSave) => !infoTaskSave.completeTask);
    if (filtred) {
      filtred = false;
      searchTaskInput.value = "";
      inputValue = "";
      searchTaskInputBtn.classList.add("hide");
      for (const filter of filters) {
        if (filter.classList.contains("active")) {
          filter.classList.remove("active");
        }
      }
      pendingTaskFilter.classList.add("active");
      tasksContainer.insertBefore(taskField, tasksContainer.childNodes[0]);
      allTaskFilterAmount.innerText = tasksContainer.childNodes.length;
      pendingTaskFilterAmount.innerText = pendingTasks.length;
      pendingTaskFilterFunction();
    } else {
      if (
        allTaskFilter.classList.contains("active") ||
        pendingTaskFilter.classList.contains("active")
      ) {
        tasksContainer.insertBefore(taskField, tasksContainer.childNodes[0]);
        allTaskFilterAmount.innerText = tasksContainer.childNodes.length;
        pendingTaskFilterAmount.innerText = pendingTasks.length;
      } else if (
        !pendingTaskFilter.classList.contains("active") &&
        !allTaskFilter.classList.contains("active")
      ) {
        for (const filter of filters) {
          if (filter.classList.contains("active")) {
            filter.classList.remove("active");
          }
        }
        pendingTaskFilter.classList.add("active");
        tasksContainer.insertBefore(taskField, tasksContainer.childNodes[0]);
        allTaskFilterAmount.innerText = tasksContainer.childNodes.length;
        pendingTaskFilterAmount.innerText = pendingTasks.length;
        pendingTaskFilterFunction();
      }
    }

    // Campo dos botões/ícones
    const btnField = document.createElement("div");
    taskField.appendChild(btnField);
    btnField.classList.add("btnField");

    // Criação do campo de informações da tarefa
    const taskInfo = document.createElement("div");
    const infoTextContent = document.createElement("p");
    const schedulingRemoveBtn = document.createElement("button");
    const schedulingRemoveBtnIcon = document.createElement("i");
    const appointmentDate = document.createElement("span");
    const appointmentTime = document.createElement("span");
    const completedTaskIcon = document.createElement("i");
    taskInfo.classList.add("taskInfo");
    taskInfo.classList.add("hide");
    infoTextContent.classList.add("infoTextContent");
    appointmentDate.classList.add("appointmentDate");
    appointmentDate.classList.add("hide");
    appointmentTime.classList.add("appointmentTime");
    appointmentTime.classList.add("hide");
    completedTaskIcon.classList.add("completedTaskIcon");
    completedTaskIcon.classList.add("fa-solid");
    completedTaskIcon.classList.add("fa-check");
    completedTaskIcon.classList.add("hide");
    taskField.appendChild(taskInfo);
    taskInfo.appendChild(infoTextContent);
    taskInfo.appendChild(schedulingRemoveBtn);
    taskInfo.appendChild(appointmentDate);
    taskInfo.appendChild(appointmentTime);
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
        appointmentDate,
        appointmentTime,
        editBtn,
        infoTextContent,
        infoTaskSave
      )
    );

    // Campo para anotações da tarefa
    const notePadContainer = document.createElement("div");
    const notePadTop = document.createElement("div");
    const notePadTitle = document.createElement("p");
    const saveNoteBtn = document.createElement("button");
    const notePadInput = document.createElement("textarea");
    const notePadBtnField = document.createElement("div");
    const cleanNoteBtn = document.createElement("button");
    const cleanNoteBtnIcon = document.createElement("i");
    const saveNoteBtnIcon = document.createElement("i");
    const notesInfo = document.createElement("span");
    notePadContainer.classList.add("notePadContainer");
    notePadContainer.classList.add("hide");
    notePadTop.classList.add("notePadTop");
    notePadTitle.classList.add("notePadTitle");
    notePadInput.classList.add("notePadInput");
    notePadInput.setAttribute("name", "notePadInput");
    notePadBtnField.classList.add("notePadBtnField");
    cleanNoteBtn.classList.add("cleanNoteBtn");
    cleanNoteBtn.classList.add("hide");
    cleanNoteBtn.setAttribute("title", "Limpar Anotações");
    cleanNoteBtnIcon.classList.add("fa-solid");
    cleanNoteBtnIcon.classList.add("fa-xmark");
    saveNoteBtn.classList.add("saveNoteBtn");
    saveNoteBtn.setAttribute("title", "Salvar");
    saveNoteBtnIcon.classList.add("fa-solid");
    saveNoteBtnIcon.classList.add("fa-angles-left");
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
        infoTaskSave
      )
    );
    cleanNoteBtn.addEventListener("click", () =>
      cleanNoteClick(notePadInput, cleanNoteBtn, notePadContainer)
    );

    // Botão para conclusão a tarefa
    const checkBtn = document.createElement("button");
    btnField.appendChild(checkBtn);
    checkBtn.classList.add("checkBtn");
    const checkIcon = document.createElement("i");
    checkBtn.appendChild(checkIcon);
    checkIcon.classList.add("fa-solid");
    checkIcon.classList.add("fa-thumbs-up");
    checkBtn.setAttribute("title", "Concluir");
    checkBtn.addEventListener("click", () =>
      completeClick(
        taskField,
        taskContent,
        scheduleBtn,
        editBtn,
        checkBtn,
        checkIcon,
        appointmentDate,
        appointmentTime,
        taskInfo,
        infoTextContent,
        completedTaskIcon,
        schedulingRemoveBtn,
        infoTaskSave
      )
    );

    //Botão para edição da tarefa
    const editBtn = document.createElement("button");
    btnField.appendChild(editBtn);
    editBtn.classList.add("editBtn");
    const editIcon = document.createElement("i");
    editBtn.appendChild(editIcon);
    editIcon.classList.add("fa-solid");
    editIcon.classList.add("fa-pen");
    editBtn.setAttribute("title", "Editar");
    editBtn.addEventListener("click", () =>
      editClick(taskContent, infoTaskSave)
    );

    // Botão para agendamento da tarefa
    const scheduleBtn = document.createElement("button");
    btnField.appendChild(scheduleBtn);
    scheduleBtn.classList.add("scheduleBtn");
    const scheduleIcon = document.createElement("i");
    scheduleBtn.appendChild(scheduleIcon);
    scheduleIcon.classList.add("fa-solid");
    scheduleIcon.classList.add("fa-clock");
    scheduleBtn.setAttribute("title", "Agendar");
    scheduleBtn.addEventListener("click", () =>
      scheduleClick(
        taskField,
        scheduleBtn,
        appointmentDate,
        appointmentTime,
        taskInfo,
        infoTextContent,
        schedulingRemoveBtn,
        infoTaskSave
      )
    );

    // Botão para adiconar anotações sobre a tarefa
    const notesBtn = document.createElement("button");
    btnField.appendChild(notesBtn);
    notesBtn.classList.add("notesBtn");
    const notesBtnIcon = document.createElement("i");
    const notesBtnAlert = document.createElement("span");
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
        infoTaskSave
      )
    );

    // Botão para exclusão da tarefa
    const removeBtn = document.createElement("button");
    btnField.appendChild(removeBtn);
    removeBtn.classList.add("removeBtn");
    const removeIcon = document.createElement("i");
    removeBtn.appendChild(removeIcon);
    removeIcon.classList.add("fa-solid");
    removeIcon.classList.add("fa-trash");
    removeBtn.setAttribute("title", "Excluir tarefa");
    removeBtn.addEventListener("click", () =>
      deleteClick(taskField, infoTaskSave, notesInfo)
    );

    checkTasksContainerHeight();
  }
}

// Variáveis da janela de confirmação
const confirmField = document.querySelector("#confirmField");
const confirmFieldText = document.querySelector("#confirmFieldText");
const btnYes = document.querySelector("#btnYes");
const btnNo = document.querySelector("#btnNo");

// Configuração do botão para conclusão da tarefa
const completeClick = (
  taskField,
  taskContent,
  scheduleBtn,
  editBtn,
  checkBtn,
  checkIcon,
  appointmentDate,
  appointmentTime,
  taskInfo,
  infoTextContent,
  completedTaskIcon,
  schedulingRemoveBtn,
  infoTaskSave
) => {
  if (taskField.classList.contains("scheduled")) {
    header.classList.add("pointerEventsNone");
    tasksContainer.classList.add("tasksContainerHide");
    mainContainer.classList.add("pointerEventsNone");
    confirmFieldText.innerText =
      "Esta tarefa possui um agendamento, tem certeza que deseja concluí-la?";
    confirmField.classList.add("appearWindow");
    confirmField.classList.remove("hide");

    btnYes.onclick = confirmCompletedAction;
    btnYes.focus();

    function confirmCompletedAction() {
      const tasks = tasksContainer.childNodes;
      header.classList.remove("pointerEventsNone");
      tasksContainer.classList.remove("tasksContainerHide");
      mainContainer.classList.remove("pointerEventsNone");
      tasksContainer.classList.add("tasksContainerAppear");
      confirmField.classList.remove("appearWindow");
      confirmField.classList.add("vanishWindow");

      checkIcon.classList.remove("fa-thumbs-up");
      checkIcon.classList.add("fa-rotate");
      checkIcon.classList.add("fa-spin");

      switch (editBtn.classList.contains("disabledBtn")) {
        case false:
          editBtn.classList.add("disabledBtn");
          break;
      }

      for (const task of tasks) {
        task.classList.remove("hover");
        task.childNodes[1].classList.add("pointerEventsNone");
      }

      // Salvar ação no Local Storage
      if (infoTaskSave.deletedInfoTask) {
        delete infoTaskSave.deletedInfoTask;
      }
      if (infoTaskSave.expiredTask) {
        delete infoTaskSave.expiredTask;
      }
      if (infoTaskSave.expireAlert) {
        delete infoTaskSave.expireAlert;
      }
      delete infoTaskSave.scheduledTask;
      infoTaskSave.completeTask = true;
      localStorage.setItem("tasks", JSON.stringify(dbTasks));

      setTimeout(() => {
        taskField.classList.add("vanishTask");
      }, 200);

      setTimeout(() => {
        appointmentTime.innerText = "";
        appointmentDate.innerText = "";
        infoTextContent.innerText = "";
        taskInfo.classList.add("hide");
        taskField.classList.remove("scheduled");
        taskInfo.classList.remove("scheduled");
        if (taskField.classList.contains("expireAlert")) {
          taskField.classList.remove("expireAlert");
        }
        if (taskField.classList.contains("expiredTask")) {
          taskField.classList.remove("expiredTask");
        }
        if (taskInfo.classList.contains("expireAlert")) {
          taskInfo.classList.remove("expireAlert");
        }
        if (taskInfo.classList.contains("expiredTask")) {
          taskInfo.classList.remove("expiredTask");
        }
        tasksContainer.classList.remove("tasksContainerAppear");
        confirmField.classList.remove("vanishWindow");
        confirmField.classList.add("hide");
        taskField.classList.remove("vanishTask");
        taskField.classList.add("appearTask");
        taskContent.classList.add("completed");
        taskField.classList.add("completed");
        taskInfo.classList.add("completed");
        taskInfo.classList.remove("hide");
        infoTextContent.innerText = "Tarefa concluída";
        completedTaskIcon.classList.remove("hide");
        schedulingRemoveBtn.classList.add("hide");

        checkBtn.setAttribute("title", "Restaurar");
        newTaskInput.focus();
        pendingTasks = dbTasks.filter(
          (infoTaskSave) => !infoTaskSave.completeTask
        );
        completedTasks = dbTasks.filter(
          (infoTaskSave) => infoTaskSave.completeTask
        );
        scheduledTasks = dbTasks.filter(
          (infoTaskSave) => infoTaskSave.scheduledTask
        );
        if (scheduleTaskFilter.classList.contains("active")) {
          scheduleTaskFilterFunction();
        } else if (pendingTaskFilter.classList.contains("active")) {
          pendingTaskFilterFunction();
        }
        pendingTaskFilterAmount.innerText = pendingTasks.length;
        completedTaskFilterAmount.innerText = completedTasks.length;
        scheduleTaskFilterAmount.innerText = scheduledTasks.length;
      }, 500);
      setTimeout(() => {
        taskField.classList.remove("appearTask");
        for (const task of tasks) {
          task.classList.add("hover");
          task.childNodes[1].classList.remove("pointerEventsNone");
        }
      }, 800);
    }

    btnNo.onclick = () => {
      header.classList.remove("pointerEventsNone");
      tasksContainer.classList.remove("tasksContainerHide");
      mainContainer.classList.remove("pointerEventsNone");
      tasksContainer.classList.add("tasksContainerAppear");
      confirmField.classList.remove("appearWindow");
      confirmField.classList.add("vanishWindow");

      setTimeout(() => {
        confirmField.classList.remove("vanishWindow");
        confirmField.classList.add("hide");
        tasksContainer.classList.remove("tasksContainerAppear");
        newTaskInput.focus();
      }, 200);
    };
  } else if (taskField.classList.contains("expiredTask")) {
    const tasks = tasksContainer.childNodes;
    for (const task of tasks) {
      task.classList.remove("hover");
      task.childNodes[1].classList.add("pointerEventsNone");
    }
    taskField.classList.add("vanishTask");

    // Salvar ação no Local Storage
    if (infoTaskSave.expiredTask) {
      delete infoTaskSave.expiredTask;
    }
    infoTaskSave.completeTask = true;
    localStorage.setItem("tasks", JSON.stringify(dbTasks));

    setTimeout(() => {
      appointmentTime.innerText = "";
      appointmentDate.innerText = "";
      infoTextContent.innerText = "";
      taskInfo.classList.add("hide");
      taskInfo.classList.remove("expiredTask");
      taskInfo.classList.remove("scheduled");
      taskField.classList.remove("expiredTask");
      taskField.classList.remove("vanishTask");
      taskField.classList.add("appearTask");
      checkIcon.classList.remove("fa-thumbs-up");
      taskContent.classList.add("completed");
      taskField.classList.add("completed");
      checkIcon.classList.add("fa-rotate");
      checkIcon.classList.add("fa-spin");
      checkBtn.setAttribute("title", "Restaurar");
      taskInfo.classList.add("completed");
      taskInfo.classList.remove("hide");
      infoTextContent.innerText = "Tarefa concluída";
      completedTaskIcon.classList.remove("hide");
      schedulingRemoveBtn.classList.add("hide");
      newTaskInput.focus();
      pendingTasks = dbTasks.filter(
        (infoTaskSave) => !infoTaskSave.completeTask
      );
      completedTasks = dbTasks.filter(
        (infoTaskSave) => infoTaskSave.completeTask
      );
      expiredTasks = dbTasks.filter((infoTaskSave) => infoTaskSave.expiredTask);
      if (expiredTaskFilter.classList.contains("active")) {
        expiredTaskFilterFunction();
      } else if (pendingTaskFilter.classList.contains("active")) {
        pendingTaskFilterFunction();
      }
      pendingTaskFilterAmount.innerText = pendingTasks.length;
      completedTaskFilterAmount.innerText = completedTasks.length;
      expiredTaskFilterAmount.innerText = expiredTasks.length;
    }, 300);
    setTimeout(() => {
      taskField.classList.remove("appearTask");
      for (const task of tasks) {
        task.classList.add("hover");
        task.childNodes[1].classList.remove("pointerEventsNone");
      }
    }, 500);
  } else {
    if (taskField.classList.contains("completed")) {
      const tasks = tasksContainer.childNodes;
      for (const task of tasks) {
        task.classList.remove("hover");
        task.childNodes[1].classList.add("pointerEventsNone");
      }
      taskField.classList.add("vanishTask");
      taskField.classList.remove("hover");
      checkBtn.disabled = true;
      newTaskInput.blur();

      // Salvar ação no Local Storage
      delete infoTaskSave.completeTask;
      localStorage.setItem("tasks", JSON.stringify(dbTasks));

      setTimeout(() => {
        checkBtn.setAttribute("title", "Concluir");
        taskContent.classList.toggle("completed");
        taskField.classList.toggle("completed");
        editBtn.classList.toggle("disabledBtn");
        scheduleBtn.classList.toggle("disabledBtn");
        checkIcon.classList.toggle("fa-thumbs-up");
        checkIcon.classList.toggle("fa-rotate");
        checkIcon.classList.toggle("fa-spin");
        taskInfo.classList.remove("completed");
        taskInfo.classList.add("hide");
        infoTextContent.innerText = "";
        completedTaskIcon.classList.add("hide");
        schedulingRemoveBtn.classList.remove("hide");
        taskField.classList.remove("vanishTask");
        taskField.classList.add("appearTask");
        checkBtn.disabled = false;
        newTaskInput.focus();
        pendingTasks = dbTasks.filter(
          (infoTaskSave) => !infoTaskSave.completeTask
        );
        completedTasks = dbTasks.filter(
          (infoTaskSave) => infoTaskSave.completeTask
        );
        if (completedTaskFilter.classList.contains("active")) {
          completedTaskFilterFunction();
        }
        pendingTaskFilterAmount.innerText = pendingTasks.length;
        completedTaskFilterAmount.innerText = completedTasks.length;
      }, 300);
      setTimeout(() => {
        taskField.classList.remove("appearTask");
        for (const task of tasks) {
          task.classList.add("hover");
          task.childNodes[1].classList.remove("pointerEventsNone");
        }
      }, 500);
    } else {
      const tasks = tasksContainer.childNodes;
      for (const task of tasks) {
        task.classList.remove("hover");
        task.childNodes[1].classList.add("pointerEventsNone");
      }
      taskField.classList.add("vanishTask");
      checkBtn.disabled = true;
      newTaskInput.blur();

      // Salvar ação no Local Storage
      if (infoTaskSave.deletedInfoTask) {
        delete infoTaskSave.deletedInfoTask;
      }
      infoTaskSave.completeTask = true;
      localStorage.setItem("tasks", JSON.stringify(dbTasks));

      setTimeout(() => {
        taskField.classList.remove("vanishTask");
        taskField.classList.add("appearTask");
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
        checkBtn.disabled = false;
        newTaskInput.focus();
        pendingTasks = dbTasks.filter(
          (infoTaskSave) => !infoTaskSave.completeTask
        );
        completedTasks = dbTasks.filter(
          (infoTaskSave) => infoTaskSave.completeTask
        );
        if (pendingTaskFilter.classList.contains("active")) {
          pendingTaskFilterFunction();
        }
        pendingTaskFilterAmount.innerText = pendingTasks.length;
        completedTaskFilterAmount.innerText = completedTasks.length;
      }, 300);
      setTimeout(() => {
        taskField.classList.remove("appearTask");
        for (const task of tasks) {
          task.classList.add("hover");
          task.childNodes[1].classList.remove("pointerEventsNone");
        }
      }, 500);
    }
  }
};

// Cabeçalho da aplicação
const header = document.querySelector("#header");

// Janela para edição das tarefas
const editField = document.querySelector("#editField");

// Input de texto para edição das tarefas
const editInput = document.querySelector("#editInput");

// Configuração do botão de confirmação da edição
const confirmEditBtn = document.querySelector("#confirmEditBtn");

// Função responsável pela abertura da janela de edição
const editClick = (taskContent, infoTaskSave) => {
  header.classList.add("pointerEventsNone");
  tasksContainer.classList.add("tasksContainerHide");
  mainContainer.classList.add("pointerEventsNone");
  editField.classList.add("appearWindow");
  editField.classList.remove("hide");

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
  cleanEditInputBtn.style.display = "inline";

  confirmEditBtn.onclick = () => editTask(taskContent, infoTaskSave);

  editInput.onkeypress = (e) => {
    if (e.key === "Enter") {
      editTask(taskContent, infoTaskSave);
    }
  };

  editInput.onkeyup = () => {
    const validateEditField = () => editInput.value != "";
    if (!validateEditField()) {
      cleanEditInputBtn.style.display = "none";
    } else {
      cleanEditInputBtn.style.display = "inline";
    }
  };
};

// Função responsável pelo fechamento da janela de edições
const closeEditField = () => {
  editField.classList.add("vanishWindow");
  editField.classList.remove("appearWindow");
  tasksContainer.classList.add("tasksContainerAppear");
  setTimeout(() => {
    editField.classList.remove("vanishWindow");
    editField.classList.add("hide");
    header.classList.remove("pointerEventsNone");
    tasksContainer.classList.remove("tasksContainerAppear");
    tasksContainer.classList.remove("tasksContainerHide");
    mainContainer.classList.remove("pointerEventsNone");
    newTaskInput.focus();
  }, 200);
  if (editInput.classList.contains("inputError")) {
    editInput.classList.remove("inputError");
  }
};

// Adicionado a função de fechamento nos botões de fechar "X" e "Cancelar"
const closeEditFieldBtn = document.querySelector("#closeEditFieldBtn");
closeEditFieldBtn.setAttribute("title", "Fechar");
closeEditFieldBtn.addEventListener("click", closeEditField);

const cancelEditBtn = document.querySelector("#cancelEditBtn");
cancelEditBtn.addEventListener("click", closeEditField);

// Configuração do botão de limpar o input do campo de edição
const cleanEditInputBtn = document.querySelector("#cleanEditInputBtn");
cleanEditInputBtn.setAttribute("title", "Limpar");
cleanEditInputBtn.addEventListener("click", () => {
  editInput.value = "";
  editInput.focus();
  cleanEditInputBtn.style.display = "none";
});

function editTask(taskContent, infoTaskSave) {
  // Função para validar o input do campo de edição
  const validateEditField = () => editInput.value.trim() != "";
  if (!validateEditField()) {
    // Caso o valor do input seja inválido: Será adicionado a class abaixo no input
    editInput.classList.add("inputError");
    editInput.blur();
  } else {
    // Caso o valor do input seja válido: Será realizado a edição da tarefa conforme config. abaixo
    editField.classList.add("vanishWindow");
    editField.classList.remove("appearWindow");
    tasksContainer.classList.add("tasksContainerAppear");

    // Salvar ação no Local Storage
    infoTaskSave["taskContent"] = editInput.value;
    localStorage.setItem("tasks", JSON.stringify(dbTasks));

    setTimeout(() => {
      editField.classList.remove("vanishWindow");
      editField.classList.add("hide");
      header.classList.remove("pointerEventsNone");
      tasksContainer.classList.remove("tasksContainerAppear");
      tasksContainer.classList.remove("tasksContainerHide");
      mainContainer.classList.remove("pointerEventsNone");
      taskContent.classList.add("contentAnimation");
      taskContent.innerText = editInput.value;
      const tasks = tasksContainer.childNodes;
      for (const task of tasks) {
        task.classList.add("pointerEventsNone");
      }
    }, 300);
    setTimeout(() => {
      taskContent.classList.remove("contentAnimation");
      const tasks = tasksContainer.childNodes;
      for (const task of tasks) {
        task.classList.remove("pointerEventsNone");
      }
      newTaskInput.focus();
    }, 600);
  }
}

// Janela para agendamento de tarefas
const scheduleField = document.querySelector("#scheduleField");

// Botões para fechar o campo de agendamento - "x" e "Cancelar"
const scheduleFieldCloseBtn = document.querySelector("#scheduleFieldCloseBtn");
const cancelScheduletBtn = document.querySelector("#cancelScheduletBtn");

// Campo para colocar data e hora do agendamento
const scheduleInputDate = document.querySelector("#scheduleInputDate");
const scheduleInputTime = document.querySelector("#scheduleInputTime");

// Botão para confirmação do agendamento
const confirmScheduleBtn = document.querySelector("#confirmScheduleBtn");

// Função responsável pela abertura da janela de agendamento
const scheduleClick = (
  taskField,
  scheduleBtn,
  appointmentDate,
  appointmentTime,
  taskInfo,
  infoTextContent,
  schedulingRemoveBtn,
  infoTaskSave
) => {
  header.classList.add("pointerEventsNone");
  tasksContainer.classList.add("tasksContainerHide");
  mainContainer.classList.add("pointerEventsNone");
  scheduleField.classList.add("appearWindow");
  scheduleField.classList.remove("hide");

  const currentDate = new Date();

  const optionsForTimeInput = {
    timeStyle: "short",
  };

  const currentDateForInput = currentDate.toLocaleDateString("fr-CA");
  const currentTimeForInput = currentDate.toLocaleString(
    "pt-BR",
    optionsForTimeInput
  );

  scheduleInputDate.value = currentDateForInput;
  scheduleInputDate.setAttribute("min", currentDateForInput);
  scheduleInputTime.value = currentTimeForInput;

  scheduleInputTime.focus();

  scheduleInputDate.onfocus = () => {
    if (scheduleInputDate.classList.contains("inputError")) {
      scheduleInputDate.classList.remove("inputError");
    }
    if (scheduleInputTime.classList.contains("inputError")) {
      scheduleInputTime.classList.remove("inputError");
    }
  };

  scheduleInputTime.onfocus = () => {
    if (scheduleInputTime.classList.contains("inputError")) {
      scheduleInputTime.classList.remove("inputError");
    }
    if (scheduleInputDate.classList.contains("inputError")) {
      scheduleInputDate.classList.remove("inputError");
    }
  };
  scheduleFieldCloseBtn.setAttribute("title", "Fechar");
  confirmScheduleBtn.onclick = () =>
    confirmSchedule(
      taskField,
      scheduleBtn,
      appointmentDate,
      appointmentTime,
      taskInfo,
      infoTextContent,
      schedulingRemoveBtn,
      infoTaskSave
    );

  scheduleField.onkeypress = (e) => {
    if (e.key === "Enter") {
      confirmSchedule(
        taskField,
        scheduleBtn,
        appointmentDate,
        appointmentTime,
        taskInfo,
        infoTextContent,
        schedulingRemoveBtn,
        infoTaskSave
      );
    }
  };
};

// Função responsável pelo fechamento da janela de agendamento
const closeScheduleField = () => {
  scheduleField.classList.add("vanishWindow");
  scheduleField.classList.remove("appearWindow");
  tasksContainer.classList.add("tasksContainerAppear");
  setTimeout(() => {
    scheduleField.classList.remove("vanishWindow");
    scheduleField.classList.add("hide");
    header.classList.remove("pointerEventsNone");
    tasksContainer.classList.remove("tasksContainerAppear");
    tasksContainer.classList.remove("tasksContainerHide");
    mainContainer.classList.remove("pointerEventsNone");
    scheduleField.classList.add("hide");
    newTaskInput.focus();
  }, 200);
  if (scheduleInputDate.classList.contains("inputError")) {
    scheduleInputDate.classList.remove("inputError");
  }

  if (scheduleInputTime.classList.contains("inputError")) {
    scheduleInputTime.classList.remove("inputError");
  }
};

// Colocando a função nos botões "x" e "Cancelar"
scheduleFieldCloseBtn.addEventListener("click", closeScheduleField);
cancelScheduletBtn.addEventListener("click", closeScheduleField);

// Configuração de botão de confirmação de agendamento
const confirmSchedule = (
  taskField,
  scheduleBtn,
  appointmentDate,
  appointmentTime,
  taskInfo,
  infoTextContent,
  schedulingRemoveBtn,
  infoTaskSave
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
  const validateScheduleInputDate = () =>
    scheduleInputDateValue.trim() != "" &&
    scheduleInputDateValue >= currentDate;

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
    return false;
  };

  if (!validateScheduleInputDate() && !validateScheduleInputTime()) {
    scheduleInputTime.classList.add("inputError");
    scheduleInputDate.classList.add("inputError");
    scheduleInputTime.blur();
    scheduleInputDate.blur();
  } else if (!validateScheduleInputDate()) {
    scheduleInputDate.classList.add("inputError");
    scheduleInputDate.blur();
    scheduleInputTime.blur();
  } else if (!validateScheduleInputTime()) {
    scheduleInputTime.classList.add("inputError");
    scheduleInputTime.blur();
    scheduleInputDate.blur();
  } else {
    scheduleField.classList.add("vanishWindow");
    scheduleField.classList.remove("appearWindow");
    tasksContainer.classList.add("tasksContainerAppear");

    setTimeout(() => {
      scheduleField.classList.remove("vanishWindow");
      scheduleField.classList.add("hide");
      header.classList.remove("pointerEventsNone");
      tasksContainer.classList.remove("tasksContainerAppear");
      tasksContainer.classList.remove("tasksContainerHide");
      mainContainer.classList.remove("pointerEventsNone");
      scheduleField.classList.add("hide");
      scheduleBtn.classList.add("disabledBtn");
      taskField.classList.add("scheduled");
      taskInfo.classList.add("scheduled");
      schedulingRemoveBtn.setAttribute("title", "Cancelar agendamento");
      newTaskInput.focus();

      taskInfo.classList.remove("hide");
      taskInfo.classList.add("appearTaskInfo");
    }, 300);

    setTimeout(() => {
      taskInfo.classList.remove("appearTaskInfo");
    }, 500);

    // Recebimento dos valores colocados nos inputs
    const setDateForScheduling = new Date(
      scheduleInputDateValue + " " + scheduleInputTimeValue
    );

    const optionsSetDate = { dateStyle: "long" };
    const optionsSetTime = { timeStyle: "short" };
    const optionsSetDay = { weekday: "long" };

    const dateForinfoTextContent = setDateForScheduling.toLocaleString(
      "pt-BR",
      optionsSetDate
    );
    const timeForinfoTextContent = setDateForScheduling.toLocaleString(
      "pt-BR",
      optionsSetTime
    );
    const dayForinfoTextContent = setDateForScheduling.toLocaleString(
      "pt-BR",
      optionsSetDay
    );

    // Inclusão dos dados no campo de informações sobre o agendamento
    const difSeconds =
      (setDateForScheduling.getTime() - currentFullDate.getTime()) / 1000;
    const difMinutes = difSeconds / 60;
    const difDays = difMinutes / (60 * 24);
    const difDaysOfTheWeek =
      setDateForScheduling.getDay() - currentFullDate.getDay();

    if (difDays >= 2) {
      infoTextContent.innerText =
        "Agendado para " +
        dayForinfoTextContent +
        ", " +
        dateForinfoTextContent +
        " às " +
        timeForinfoTextContent;
    } else if (difDays > 1 && difDays < 2 && difDaysOfTheWeek >= 2) {
      infoTextContent.innerText =
        "Agendado para " +
        dayForinfoTextContent +
        ", " +
        dateForinfoTextContent +
        " às " +
        timeForinfoTextContent;
    } else if (difDays > 1 && difDays < 2 && difDaysOfTheWeek == -5) {
      infoTextContent.innerText =
        "Agendado para " +
        dayForinfoTextContent +
        ", " +
        dateForinfoTextContent +
        " às " +
        timeForinfoTextContent;
    } else if (
      (difDays < 2 && difDaysOfTheWeek == 1 && difMinutes > 60) ||
      (difDays < 2 && difDaysOfTheWeek == -6 && difMinutes > 60)
    ) {
      infoTextContent.innerText =
        "Agendado para amanhã às " + scheduleInputTimeValue;
    } else if (
      (difDays < 2 &&
        difDaysOfTheWeek == 1 &&
        difMinutes > 30 &&
        difMinutes <= 60) ||
      (difDays < 2 &&
        difDaysOfTheWeek == -6 &&
        difMinutes > 30 &&
        difMinutes <= 60)
    ) {
      infoTextContent.innerText =
        "Agendado para amanhã às " +
        scheduleInputTimeValue +
        " - Expira em " +
        Math.ceil(difMinutes) +
        " min";
    } else if (
      (difDays < 2 &&
        difDaysOfTheWeek == 1 &&
        difMinutes > 0 &&
        difMinutes <= 30) ||
      (difDays < 2 &&
        difDaysOfTheWeek == -6 &&
        difMinutes > 0 &&
        difMinutes <= 30)
    ) {
      infoTextContent.innerText =
        "Agendado para amanhã às " +
        scheduleInputTimeValue +
        " - Expira em " +
        Math.ceil(difMinutes) +
        " min";
      infoTaskSave.expireAlert = true;
      setTimeout(() => {
        taskField.classList.add("expireAlert");
        taskInfo.classList.add("expireAlert");
      }, 300);
    } else if (currentDate === scheduleInputDateValue && difMinutes > 60) {
      infoTextContent.innerText =
        "Agendado para hoje às " + scheduleInputTimeValue;
    } else if (
      difMinutes > 30 &&
      difMinutes <= 60 &&
      currentDate === scheduleInputDateValue
    ) {
      infoTextContent.innerText =
        "Agendado para hoje às " +
        scheduleInputTimeValue +
        " - Expira em " +
        Math.ceil(difMinutes) +
        " min";
    } else if (
      difMinutes > 0 &&
      difMinutes <= 30 &&
      currentDate === scheduleInputDateValue
    ) {
      infoTextContent.innerText =
        "Agendado para hoje às " +
        scheduleInputTimeValue +
        " - Expira em " +
        Math.ceil(difMinutes) +
        " min";
      infoTaskSave.expireAlert = true;
      setTimeout(() => {
        taskField.classList.add("expireAlert");
        taskInfo.classList.add("expireAlert");
      }, 300);
    }

    appointmentDate.innerText = scheduleInputDateValue;
    appointmentTime.innerText = scheduleInputTimeValue;

    // Salvar ação no Local Storage
    if (infoTaskSave.deletedInfoTask) {
      delete infoTaskSave.deletedInfoTask;
    }
    infoTaskSave.scheduledTask = [
      true,
      scheduleInputDateValue,
      scheduleInputTimeValue,
      infoTextContent.innerText,
    ];
    localStorage.setItem("tasks", JSON.stringify(dbTasks));

    setTimeout(() => {
      scheduledTasks = dbTasks.filter(
        (infoTaskSave) => infoTaskSave.scheduledTask
      );
      scheduleTaskFilterAmount.innerText = scheduledTasks.length;
    }, 300);
  }
};

// Configuração do botão de remoção do agendamento
const schedulingRemoveClick = (
  taskInfo,
  taskField,
  scheduleBtn,
  appointmentDate,
  appointmentTime,
  editBtn,
  infoTextContent,
  infoTaskSave
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
  localStorage.setItem("tasks", JSON.stringify(dbTasks));

  setTimeout(() => {
    appointmentTime.innerText = "";
    appointmentDate.innerText = "";
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
    taskField.classList.add("pointerEventsNone");
    taskInfo.classList.add("hide");
    taskInfo.classList.remove("vanishTaskInfo");
    newTaskInput.focus();
    setTimeout(() => {
      scheduledTasks = dbTasks.filter(
        (infoTaskSave) => infoTaskSave.scheduledTask
      );
      expiredTasks = dbTasks.filter((infoTaskSave) => infoTaskSave.expiredTask);
      if (scheduleTaskFilter.classList.contains("active")) {
        scheduleTaskFilterFunction();
      } else if (expiredTaskFilter.classList.contains("active")) {
        expiredTaskFilterFunction();
      }
      scheduleTaskFilterAmount.innerText = scheduledTasks.length;
      expiredTaskFilterAmount.innerText = expiredTasks.length;
    }, 100);
  }, 200);
  setTimeout(() => {
    taskField.classList.remove("pointerEventsNone");
    scheduleBtn.classList.remove("disabledBtn");
    editBtn.classList.remove("disabledBtn");
  }, 500);
};

// Configuração do botão de exclusão da tarefa
const deleteClick = (taskField, infoTaskSave, notesInfo) => {
  if (taskField.classList.contains("scheduled") || notesInfo.innerText != "") {
    header.classList.add("pointerEventsNone");
    tasksContainer.classList.add("tasksContainerHide");
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
      const tasks = tasksContainer.childNodes;
      for (const task of tasks) {
        task.classList.remove("hover");
        task.childNodes[1].classList.add("pointerEventsNone");
      }

      // Salvar ação no Local Storage
      infoTaskSave.deletedInfoTask = true;
      localStorage.setItem("tasks", JSON.stringify(dbTasks));

      setTimeout(() => {
        taskField.classList.add("vanishTask");
      }, 200);
      setTimeout(() => {
        const index = dbTasks.indexOf(infoTaskSave);
        dbTasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(dbTasks));
        if (dbTasks.length < 1) {
          localStorage.removeItem("tasks")
        }
        taskField.remove();
        confirmField.classList.add("hide");
        header.classList.remove("pointerEventsNone");
        tasksContainer.classList.remove("tasksContainerHide");
        mainContainer.classList.remove("pointerEventsNone");
        tasksContainer.classList.remove("tasksContainerAppear");
        confirmField.classList.remove("vanishWindow");
        newTaskInput.focus();
        pendingTasks = dbTasks.filter(
          (infoTaskSave) => !infoTaskSave.completeTask
        );
        scheduledTasks = dbTasks.filter(
          (infoTaskSave) => infoTaskSave.scheduledTask
        );
        if (scheduleTaskFilter.classList.contains("active")) {
          scheduleTaskFilterFunction();
        } else if (pendingTaskFilter.classList.contains("active")) {
          pendingTaskFilterFunction();
        }
        allTaskFilterAmount.innerText = tasksContainer.childNodes.length;
        pendingTaskFilterAmount.innerText = pendingTasks.length;
        scheduleTaskFilterAmount.innerText = scheduledTasks.length;
        setTimeout(() => {
          for (const task of tasks) {
            task.classList.add("hover");
            task.childNodes[1].classList.remove("pointerEventsNone");
          }
        }, 150);
        if (tasksContainer.childNodes.length <= 0) {
          noTaskTextContainer.classList.remove("hide");
        }
        checkTasksContainerHeight();
        if (filtred) {
          taskFilter();
        }
      }, 550);
    }

    btnNo.onclick = () => {
      header.classList.remove("pointerEventsNone");
      tasksContainer.classList.remove("tasksContainerHide");
      mainContainer.classList.remove("pointerEventsNone");
      tasksContainer.classList.add("tasksContainerAppear");
      confirmField.classList.remove("appearWindow");
      confirmField.classList.add("vanishWindow");

      setTimeout(() => {
        confirmField.classList.remove("vanishWindow");
        confirmField.classList.add("hide");
        tasksContainer.classList.remove("tasksContainerAppear");
        newTaskInput.focus();
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
    localStorage.setItem("tasks", JSON.stringify(dbTasks));

    setTimeout(() => {
      const index = dbTasks.indexOf(infoTaskSave);
      dbTasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(dbTasks));
      if (dbTasks.length < 1) {
        localStorage.removeItem("tasks")
      }
      taskField.remove();
      newTaskInput.focus();
      pendingTasks = dbTasks.filter(
        (infoTaskSave) => !infoTaskSave.completeTask
      );
      completedTasks = dbTasks.filter(
        (infoTaskSave) => infoTaskSave.completeTask
      );
      expiredTasks = dbTasks.filter((infoTaskSave) => infoTaskSave.expiredTask);
      scheduledTasks = dbTasks.filter(
        (infoTaskSave) => infoTaskSave.scheduledTask
      );
      if (expiredTaskFilter.classList.contains("active")) {
        expiredTaskFilterFunction();
        expiredTaskFilterAmount.innerText = expiredTasks.length;
      } else if (completedTaskFilter.classList.contains("active")) {
        completedTaskFilterFunction();
        completedTaskFilterAmount.innerText = completedTasks.length;
      } else if (pendingTaskFilter.classList.contains("active")) {
        pendingTaskFilterFunction();
        expiredTaskFilterAmount.innerText = expiredTasks.length;
        completedTaskFilterAmount.innerText = completedTasks.length;
      } else {
        expiredTaskFilterAmount.innerText = expiredTasks.length;
        completedTaskFilterAmount.innerText = completedTasks.length;
      }
      allTaskFilterAmount.innerText = tasksContainer.childNodes.length;
      pendingTaskFilterAmount.innerText = pendingTasks.length;
      setTimeout(() => {
        for (const task of tasks) {
          task.classList.add("hover");
          task.childNodes[1].classList.remove("pointerEventsNone");
        }
      }, 150);
      if (tasksContainer.childNodes.length == 0) {
        if (noTaskTextContainer.classList.contains("hide")) {
          noTaskTextContainer.classList.remove("hide");
        }
      }
      checkTasksContainerHeight();
      if (filtred) {
        taskFilter();
      }
    }, 350);
  }
};

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
  infoTaskSave
) {
  inputEquality = true;
  header.classList.add("pointerEventsNone");
  notePadContainer.classList.remove("hide");
  notePadContainer.classList.add("notePadContainerAppear");
  taskField.classList.remove("hover");
  const tasks = tasksContainer.childNodes;
  for (const task of tasks) {
    task.classList.add("pointerEventsNone");
    task.classList.add("lowOpacity");
  }
  taskField.classList.remove("lowOpacity");
  notePadInput.value = notesInfo.innerText;
  notesBtn.disabled = true;
  notePadInput.focus();
  if (notesInfo.innerText == "") {
    cleanNoteBtn.classList.add("hide");
  } else {
    cleanNoteBtn.classList.remove("hide");
  }
  setTimeout(() => {
    notePadContainer.classList.remove("notePadContainerAppear");
    notePadContainer.classList.add("pointerEventsVisible");
    notesBtn.disabled = false;
  }, 300);
  setTimeout(() => {
    notePadContainerShow = !notePadContainerShow;
  }, 500);
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
        infoTaskSave
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
        infoTaskSave
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
  infoTaskSave
) {
  notePadContainer.classList.add("notePadContainerVanish");
  notesInfo.innerText = notePadInput.value.trim();
  notePadContainer.classList.remove("pointerEventsVisible");
  if (notesInfo.innerText != "") {
    notesBtnAlert.classList.remove("hide");
  } else {
    notesBtnAlert.classList.add("hide");
  }
  notePadContainerShow = !notePadContainerShow;
  setTimeout(() => {
    notePadContainer.classList.remove("notePadContainerVanish");
    notePadContainer.classList.add("hide");
    switch (notesInfo.innerText != "" && !inputEquality) {
      case true:
        taskField.classList.add("shakeMove");
        break;
    }
  }, 300);
  if (notesInfo.innerText != "" && !inputEquality) {
    // Salvar ação no Local Storage
    infoTaskSave.savedNote = [true, notesInfo.innerText];
    localStorage.setItem("tasks", JSON.stringify(dbTasks));

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
      newTaskInput.focus();
    }, 800);
  } else {
    if (notesInfo.innerText == "") {
      // Salvar ação no Local Storage
      if (infoTaskSave.savedNote) {
        delete infoTaskSave.savedNote;
        localStorage.setItem("tasks", JSON.stringify(dbTasks));
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
      newTaskInput.focus();
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

function taskRecover() {
  if (localStorage.getItem("tasks")) {
    dbTasks = JSON.parse(localStorage.getItem("tasks"));
  }
  if (dbTasks.length == 0) {
    noTaskTextContainer.classList.remove("hide");
  } else {
    if (!noTaskTextContainer.classList.contains("hide")) {
      noTaskTextContainer.classList.add("hide");
    }
  }
  tasksContainer.innerHTML = "";
  for (let i = 0; i < dbTasks.length; i++) {
    // Recuperação dos dados de cada tarefa no array e renderização em tela

    const infoTaskSave = dbTasks[i];

    // Tarefa
    const taskField = document.createElement("div");
    taskField.classList.add("taskField");
    taskField.classList.add("hover");
    tasksContainer.appendChild(taskField);

    // Texto da tarefa
    const taskContent = document.createElement("p");
    taskField.appendChild(taskContent);
    taskContent.classList.add("taskContent");
    taskContent.innerText = infoTaskSave["taskContent"];

    // Campo dos botões/ícones
    const btnField = document.createElement("div");
    taskField.appendChild(btnField);
    btnField.classList.add("btnField");

    // Criação do campo de informações da tarefa
    const taskInfo = document.createElement("div");
    const infoTextContent = document.createElement("p");
    const schedulingRemoveBtn = document.createElement("button");
    const schedulingRemoveBtnIcon = document.createElement("i");
    const appointmentDate = document.createElement("span");
    const appointmentTime = document.createElement("span");
    const completedTaskIcon = document.createElement("i");
    taskInfo.classList.add("taskInfo");
    taskInfo.classList.add("hide");
    infoTextContent.classList.add("infoTextContent");
    appointmentDate.classList.add("appointmentDate");
    appointmentDate.classList.add("hide");
    appointmentTime.classList.add("appointmentTime");
    appointmentTime.classList.add("hide");
    completedTaskIcon.classList.add("completedTaskIcon");
    completedTaskIcon.classList.add("fa-solid");
    completedTaskIcon.classList.add("fa-check");
    completedTaskIcon.classList.add("hide");
    taskField.appendChild(taskInfo);
    taskInfo.appendChild(infoTextContent);
    taskInfo.appendChild(schedulingRemoveBtn);
    taskInfo.appendChild(appointmentDate);
    taskInfo.appendChild(appointmentTime);
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
        appointmentDate,
        appointmentTime,
        editBtn,
        infoTextContent,
        infoTaskSave
      )
    );

    // Campo para anotações da tarefa
    const notePadContainer = document.createElement("div");
    const notePadTop = document.createElement("div");
    const notePadTitle = document.createElement("p");
    const saveNoteBtn = document.createElement("button");
    const notePadInput = document.createElement("textarea");
    const notePadBtnField = document.createElement("div");
    const cleanNoteBtn = document.createElement("button");
    const cleanNoteBtnIcon = document.createElement("i");
    const saveNoteBtnIcon = document.createElement("i");
    const notesInfo = document.createElement("span");
    notePadContainer.classList.add("notePadContainer");
    notePadContainer.classList.add("hide");
    notePadTop.classList.add("notePadTop");
    notePadTitle.classList.add("notePadTitle");
    notePadInput.classList.add("notePadInput");
    notePadInput.setAttribute("name", "notePadInput");
    notePadBtnField.classList.add("notePadBtnField");
    cleanNoteBtn.classList.add("cleanNoteBtn");
    cleanNoteBtn.classList.add("hide");
    cleanNoteBtn.setAttribute("title", "Limpar Anotações");
    cleanNoteBtnIcon.classList.add("fa-solid");
    cleanNoteBtnIcon.classList.add("fa-xmark");
    saveNoteBtn.classList.add("saveNoteBtn");
    saveNoteBtn.setAttribute("title", "Salvar");
    saveNoteBtnIcon.classList.add("fa-solid");
    saveNoteBtnIcon.classList.add("fa-angles-left");
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
        infoTaskSave
      )
    );
    cleanNoteBtn.addEventListener("click", () =>
      cleanNoteClick(notePadInput, cleanNoteBtn, notePadContainer)
    );

    // Botão para conclusão a tarefa
    const checkBtn = document.createElement("button");
    btnField.appendChild(checkBtn);
    checkBtn.classList.add("checkBtn");
    const checkIcon = document.createElement("i");
    checkBtn.appendChild(checkIcon);
    checkIcon.classList.add("fa-solid");
    checkIcon.classList.add("fa-thumbs-up");
    checkBtn.setAttribute("title", "Concluir");
    checkBtn.addEventListener("click", () =>
      completeClick(
        taskField,
        taskContent,
        scheduleBtn,
        editBtn,
        checkBtn,
        checkIcon,
        appointmentDate,
        appointmentTime,
        taskInfo,
        infoTextContent,
        completedTaskIcon,
        schedulingRemoveBtn,
        infoTaskSave
      )
    );

    //Botão para edição da tarefa
    const editBtn = document.createElement("button");
    btnField.appendChild(editBtn);
    editBtn.classList.add("editBtn");
    const editIcon = document.createElement("i");
    editBtn.appendChild(editIcon);
    editIcon.classList.add("fa-solid");
    editIcon.classList.add("fa-pen");
    editBtn.setAttribute("title", "Editar");
    editBtn.addEventListener("click", () =>
      editClick(taskContent, infoTaskSave)
    );

    // Botão para agendamento da tarefa
    const scheduleBtn = document.createElement("button");
    btnField.appendChild(scheduleBtn);
    scheduleBtn.classList.add("scheduleBtn");
    const scheduleIcon = document.createElement("i");
    scheduleBtn.appendChild(scheduleIcon);
    scheduleIcon.classList.add("fa-solid");
    scheduleIcon.classList.add("fa-clock");
    scheduleBtn.setAttribute("title", "Agendar");
    scheduleBtn.addEventListener("click", () =>
      scheduleClick(
        taskField,
        scheduleBtn,
        appointmentDate,
        appointmentTime,
        taskInfo,
        infoTextContent,
        schedulingRemoveBtn,
        infoTaskSave
      )
    );

    // Botão para adiconar anotações sobre a tarefa
    const notesBtn = document.createElement("button");
    btnField.appendChild(notesBtn);
    notesBtn.classList.add("notesBtn");
    const notesBtnIcon = document.createElement("i");
    const notesBtnAlert = document.createElement("span");
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
        infoTaskSave
      )
    );

    // Botão para exclusão da tarefa
    const removeBtn = document.createElement("button");
    btnField.appendChild(removeBtn);
    removeBtn.classList.add("removeBtn");
    const removeIcon = document.createElement("i");
    removeBtn.appendChild(removeIcon);
    removeIcon.classList.add("fa-solid");
    removeIcon.classList.add("fa-trash");
    removeBtn.setAttribute("title", "Excluir tarefa");
    removeBtn.addEventListener("click", () =>
      deleteClick(taskField, infoTaskSave, notesInfo)
    );

    switch (infoTaskSave.completeTask) {
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
        appointmentDate.innerText = infoTaskSave.scheduledTask[1];
        appointmentTime.innerText = infoTaskSave.scheduledTask[2];
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
        appointmentDate.innerText = infoTaskSave.expiredTask[1];
        appointmentTime.innerText = infoTaskSave.expiredTask[2];
        break;
    }
  }
  checkTasksContainerHeight();
}

// Configuração dos filtros das tarefas

allTaskFilter.addEventListener("click", () => {
  if (filtred) {
    filtred = false;
    searchTaskInput.value = "";
    inputValue = "";
    searchTaskInputBtn.classList.add("hide");
  }
  for (const filter of filters) {
    if (filter.classList.contains("active")) {
      filter.classList.remove("active");
    }
  }
  allTaskFilter.classList.add("active");
  setTimeout(() => {
    newTaskInput.focus();
    allTaskFilterFunction();
  }, 200);
});

function allTaskFilterFunction() {
  if (tasksContainer.childNodes.length != 0) {
    noTaskTextContainer.classList.add("hide");
  }
  taskRecover();
}

pendingTaskFilter.addEventListener("click", () => {
  if (filtred) {
    filtred = false;
    searchTaskInput.value = "";
    inputValue = "";
    searchTaskInputBtn.classList.add("hide");
  }
  for (const filter of filters) {
    if (filter.classList.contains("active")) {
      filter.classList.remove("active");
    }
  }
  pendingTaskFilter.classList.add("active");
  setTimeout(() => {
    newTaskInput.focus();
    pendingTaskFilterFunction();
  }, 200);
});

function pendingTaskFilterFunction() {
  for (i = 0; i < dbTasks.length; i++) {
    const infoTaskSave = dbTasks[i];
    const task = tasksContainer.childNodes[i];

    if (pendingTasks.length != 0) {
      noTaskTextContainer.classList.add("hide");
    }
    if (task.classList.contains("hide")) {
      task.classList.remove("hide");
    }
    if (infoTaskSave.completeTask) {
      task.classList.add("hide");
    }
    if (pendingTasks.length == 0) {
      noTaskTextContainer.classList.remove("hide");
    }
  }
  checkTasksContainerHeight();
}

scheduleTaskFilter.addEventListener("click", () => {
  if (filtred) {
    filtred = false;
    searchTaskInput.value = "";
    inputValue = "";
    searchTaskInputBtn.classList.add("hide");
  }
  for (const filter of filters) {
    if (filter.classList.contains("active")) {
      filter.classList.remove("active");
    }
  }
  scheduleTaskFilter.classList.add("active");
  setTimeout(() => {
    newTaskInput.focus();
    scheduleTaskFilterFunction();
  }, 200);
});

function scheduleTaskFilterFunction() {
  for (i = 0; i < dbTasks.length; i++) {
    const infoTaskSave = dbTasks[i];
    const task = tasksContainer.childNodes[i];

    if (scheduledTasks.length != 0) {
      noTaskTextContainer.classList.add("hide");
    }
    if (task.classList.contains("hide")) {
      task.classList.remove("hide");
    }
    if (!infoTaskSave.scheduledTask) {
      task.classList.add("hide");
    }
    if (scheduledTasks.length == 0) {
      noTaskTextContainer.classList.remove("hide");
    }
  }
  checkTasksContainerHeight();
}

expiredTaskFilter.addEventListener("click", () => {
  if (filtred) {
    filtred = false;
    searchTaskInput.value = "";
    inputValue = "";
    searchTaskInputBtn.classList.add("hide");
  }
  for (const filter of filters) {
    if (filter.classList.contains("active")) {
      filter.classList.remove("active");
    }
  }
  expiredTaskFilter.classList.add("active");
  setTimeout(() => {
    newTaskInput.focus();
    expiredTaskFilterFunction();
  }, 200);
});

function expiredTaskFilterFunction() {
  for (i = 0; i < dbTasks.length; i++) {
    const infoTaskSave = dbTasks[i];
    const task = tasksContainer.childNodes[i];

    if (expiredTasks.length != 0) {
      noTaskTextContainer.classList.add("hide");
    }
    if (task.classList.contains("hide")) {
      task.classList.remove("hide");
    }
    if (!infoTaskSave.expiredTask) {
      task.classList.add("hide");
    }
    if (expiredTasks.length == 0) {
      noTaskTextContainer.classList.remove("hide");
    }
  }
  checkTasksContainerHeight();
}

completedTaskFilter.addEventListener("click", () => {
  if (filtred) {
    filtred = false;
    searchTaskInput.value = "";
    inputValue = "";
    searchTaskInputBtn.classList.add("hide");
  }
  for (const filter of filters) {
    if (filter.classList.contains("active")) {
      filter.classList.remove("active");
    }
  }
  completedTaskFilter.classList.add("active");
  setTimeout(() => {
    newTaskInput.focus();
    completedTaskFilterFunction();
  }, 200);
});

function completedTaskFilterFunction() {
  for (i = 0; i < dbTasks.length; i++) {
    const infoTaskSave = dbTasks[i];
    const task = tasksContainer.childNodes[i];

    if (completedTasks.length != 0) {
      noTaskTextContainer.classList.add("hide");
    }
    if (task.classList.contains("hide")) {
      task.classList.remove("hide");
    }
    if (!infoTaskSave.completeTask) {
      task.classList.add("hide");
    }
    if (completedTasks.length == 0) {
      noTaskTextContainer.classList.remove("hide");
    }
  }
  checkTasksContainerHeight();
}

// Verificação do status do agendamento em tempo real
setInterval(() => {
  const currentFullDate = new Date();
  const currentDate = currentFullDate.toLocaleDateString("fr-CA");

  for (let i = 0; i < dbTasks.length; i++) {
    const task = tasksContainer.childNodes[i];
    const infoTaskSave = dbTasks[i];

    if (infoTaskSave.scheduledTask || infoTaskSave.expiredTask) {
      const taskInfo = task.childNodes[2];
      const infoTextContent = taskInfo.firstChild;
      const schedulingRemoveBtn = taskInfo.childNodes[1];
      const appointmentDate = taskInfo.childNodes[2];
      const appointmentTime = taskInfo.childNodes[3];
      const schedulingDate = new Date(
        appointmentDate.innerText + " " + appointmentTime.innerText
      );

      const btnField = task.childNodes[1];
      const editBtn = btnField.childNodes[1];
      const difTimeInSeconds =
        (schedulingDate.getTime() - currentFullDate.getTime()) / 1000;
      const difTimeInMinutes = difTimeInSeconds / 60;
      const difTimeInDays = difTimeInMinutes / (60 * 24);
      const difDaysFromScheduledToCurrent =
        schedulingDate.getDay() - currentFullDate.getDay();

      const difSeconds =
        (currentFullDate.getTime() - schedulingDate.getTime()) / 1000;
      const difMinutes = difSeconds / 60;
      const difDays = difMinutes / (60 * 24);
      const difDaysFromCurrentToScheduled =
        currentFullDate.getDay() - schedulingDate.getDay();

      if (difTimeInSeconds <= 0) {
        // Salvar ação no Local Storage
        if (!infoTaskSave.deletedInfoTask) {
          delete infoTaskSave.scheduledTask;
          delete infoTaskSave.expireAlert;

          infoTaskSave.expiredTask = [
            true,
            appointmentDate.innerText,
            appointmentTime.innerText,
            infoTextContent.innerText,
          ];
        }

        // Filtro de tarefas
        expiredTasks = dbTasks.filter(
          (infoTaskSave) => infoTaskSave.expiredTask
        );
        scheduledTasks = dbTasks.filter(
          (infoTaskSave) => infoTaskSave.scheduledTask
        );
        if (expiredTaskFilter.classList.contains("active")) {
          expiredTaskFilterFunction();
        } else if (scheduleTaskFilter.classList.contains("active")) {
          scheduleTaskFilterFunction();
        }
        expiredTaskFilterAmount.innerText = expiredTasks.length;
        scheduleTaskFilterAmount.innerText = scheduledTasks.length;

        // Renderização na tela
        taskInfo.classList.remove("scheduled");
        taskInfo.classList.remove("expireAlert");
        taskInfo.classList.add("expiredTask");
        task.classList.remove("scheduled");
        task.classList.remove("expireAlert");
        task.classList.add("expiredTask");
        schedulingRemoveBtn.setAttribute("title", "Restaurar");
        editBtn.classList.add("disabledBtn");
        if (currentDate === appointmentDate.innerText) {
          infoTextContent.innerText =
            "Expirou hoje às " + appointmentTime.innerText;
        } else if (difDays < 2 && difDaysFromScheduledToCurrent == 6) {
          infoTextContent.innerText =
            "Expirou ontem às " + appointmentTime.innerText;
        } else if (difDays < 2 && difDaysFromCurrentToScheduled == 1) {
          infoTextContent.innerText =
            "Expirou ontem às " + appointmentTime.innerText;
        } else {
          infoTextContent.innerText =
            "Expirou em " +
            schedulingDate.toLocaleDateString("pt-BR") +
            " às " +
            appointmentTime.innerText;
        }
      } else if (
        difTimeInMinutes > 0 &&
        difTimeInMinutes <= 30 &&
        currentDate === appointmentDate.innerText
      ) {
        infoTextContent.innerText =
          "Agendado para hoje às " +
          appointmentTime.innerText +
          " - Expira em " +
          Math.ceil(difTimeInMinutes) +
          " min";
        task.classList.add("expireAlert");
        taskInfo.classList.add("expireAlert");

        // Salvar ação no Local Storage

        if (!infoTaskSave.deletedInfoTask) {
          infoTaskSave.scheduledTask = [
            true,
            appointmentDate.innerText,
            appointmentTime.innerText,
            infoTextContent.innerText,
          ];
          infoTaskSave.expireAlert = true;
        }
      } else if (
        difTimeInMinutes > 30 &&
        difTimeInMinutes <= 60 &&
        currentDate === appointmentDate.innerText
      ) {
        infoTextContent.innerText =
          "Agendado para hoje às " +
          appointmentTime.innerText +
          " - Expira em " +
          Math.ceil(difTimeInMinutes) +
          " min";
      } else if (
        currentDate === appointmentDate.innerText &&
        difTimeInMinutes > 60
      ) {
        infoTextContent.innerText =
          "Agendado para hoje às " + appointmentTime.innerText;
      } else if (
        (difTimeInDays < 2 &&
          difDaysFromScheduledToCurrent == -6 &&
          difTimeInMinutes > 60) ||
        (difTimeInDays < 2 &&
          difDaysFromScheduledToCurrent == 1 &&
          difTimeInMinutes > 60)
      ) {
        infoTextContent.innerText =
          "Agendado para amanhã às " + appointmentTime.innerText;
      } else if (
        (difTimeInDays < 2 &&
          difDaysFromScheduledToCurrent == -6 &&
          difTimeInMinutes > 30 &&
          difTimeInMinutes <= 60) ||
        (difTimeInDays < 2 &&
          difDaysFromScheduledToCurrent == 1 &&
          difTimeInMinutes > 30 &&
          difTimeInMinutes <= 60)
      ) {
        infoTextContent.innerText =
          "Agendado para amanhã às " +
          appointmentTime.innerText +
          " - Expira em " +
          Math.ceil(difTimeInMinutes) +
          " min";
      } else if (
        (difTimeInDays < 2 &&
          difDaysFromScheduledToCurrent == -6 &&
          difTimeInMinutes > 0 &&
          difTimeInMinutes <= 30) ||
        (difTimeInDays < 2 &&
          difDaysFromScheduledToCurrent == 1 &&
          difTimeInMinutes > 0 &&
          difTimeInMinutes <= 30)
      ) {
        infoTextContent.innerText =
          "Agendado para amanhã às " +
          appointmentTime.innerText +
          " - Expira em " +
          Math.ceil(difTimeInMinutes) +
          " min";
        task.classList.add("expireAlert");
        taskInfo.classList.add("expireAlert");

        // Salvar ação no Local Storage
        if (!infoTaskSave.deletedInfoTask) {
          infoTaskSave.scheduledTask = [
            true,
            appointmentDate.innerText,
            appointmentTime.innerText,
            infoTextContent.innerText,
          ];
          infoTaskSave.expireAlert = true;
        }
      }
      if (infoTaskSave.expiredTask) {
        infoTaskSave.expiredTask[3] = infoTextContent.innerText;
      }
      if (infoTaskSave.scheduledTask) {
        infoTaskSave.scheduledTask[3] = infoTextContent.innerText;
      }
      localStorage.setItem("tasks", JSON.stringify(dbTasks));
    }
  }
}, 1000);

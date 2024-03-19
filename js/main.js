// Campo de texto principal para informar as tarefas que serão adicionadas
const newTaskInput = document.querySelector("#newTaskInput");

// Focar no input ao carregar página
newTaskInput.focus();

// Campo onde as novas tarefas serão adicionadas
const tasksContainer = document.querySelector("#tasksContainer");

// Função para identificar se o campo de tarefas está vazio
const noTaskTextContainer = document.querySelector("#noTaskTextContainer");

// Variáveis para guardar tarefas no banco de dados (Local Storage)
let dbTarefas = [];
taskRecover();

// Container principal do projeto
const mainContainer = document.querySelector("#mainContainer");

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

document.addEventListener("click", (e) => {
  if (
    !menu.contains(e.target) &&
    !menuBtn.contains(e.target) &&
    !menuBtnIcon.contains(e.target) &&
    menuOpen
  ) {
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
    taskField.classList.add("appearTask");
    taskField.classList.add("hover");
    setTimeout(() => {
      tasksContainer.insertBefore(taskField, tasksContainer.childNodes[0]);
      newTaskInput.focus();
    }, 100);
    setTimeout(() => {
      taskField.classList.remove("appearTask");
      // taskRecover();
    }, 300);
    if (!noTaskTextContainer.classList.contains("hide")) {
      noTaskTextContainer.classList.add("hide");
    }

    // Texto da tarefa
    const taskContent = document.createElement("p");
    taskField.appendChild(taskContent);
    taskContent.classList.add("taskContent");
    taskContent.innerText = newTaskInput.value;
    newTaskInput.value = "";

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
    cleanNoteBtnIcon.classList.add("fa-broom");
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
      deleteClick(taskField, infoTaskSave)
    );

    // Salvar tarefa no Local Storage
    const infoTaskSave = new Object();
    infoTaskSave.taskContent = taskContent.innerText;

    dbTarefas.unshift(infoTaskSave);
    localStorage.setItem("tarefas", JSON.stringify(dbTarefas));
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

      // Salvar ação no Local Storage
      infoTaskSave.completeTask = true;
      delete infoTaskSave.scheduledTask;
      if (infoTaskSave.expireAlert) {
        delete infoTaskSave.expireAlert;
      }
      localStorage.setItem("tarefas", JSON.stringify(dbTarefas));

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
        // tasksContainer.insertBefore(
        //   taskField,
        //   tasksContainer.childNodes[length - 1]
        // );

        taskInfo.classList.add("completed");
        taskInfo.classList.remove("hide");
        infoTextContent.innerText = "Tarefa concluída";
        completedTaskIcon.classList.remove("hide");
        schedulingRemoveBtn.classList.add("hide");

        checkBtn.setAttribute("title", "Restaurar");
        newTaskInput.focus();
      }, 500);
      setTimeout(() => {
        taskField.classList.remove("appearTask");
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
    taskField.classList.add("vanishTask");

    // Salvar ação no Local Storage
    infoTaskSave.completeTask = true;
    localStorage.setItem("tarefas", JSON.stringify(dbTarefas));

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
      // tasksContainer.insertBefore(
      //   taskField,
      //   tasksContainer.childNodes[length - 1]
      // );
      checkBtn.setAttribute("title", "Restaurar");

      taskInfo.classList.add("completed");
      taskInfo.classList.remove("hide");
      infoTextContent.innerText = "Tarefa concluída";
      completedTaskIcon.classList.remove("hide");
      schedulingRemoveBtn.classList.add("hide");

      newTaskInput.focus();
    }, 300);
    setTimeout(() => {
      taskField.classList.remove("appearTask");
    }, 500);
  } else {
    if (taskField.classList.contains("completed")) {
      taskField.classList.add("vanishTask");
      checkBtn.disabled = true;
      newTaskInput.blur();

      // Salvar ação no Local Storage
      delete infoTaskSave.completeTask;
      localStorage.setItem("tarefas", JSON.stringify(dbTarefas));

      setTimeout(() => {
        checkBtn.setAttribute("title", "Concluir");
        taskContent.classList.toggle("completed");
        taskField.classList.toggle("completed");
        editBtn.classList.toggle("disabledBtn");
        scheduleBtn.classList.toggle("disabledBtn");
        checkIcon.classList.toggle("fa-thumbs-up");
        checkIcon.classList.toggle("fa-rotate");
        checkIcon.classList.toggle("fa-spin");
        // tasksContainer.insertBefore(
        //   taskField,
        //   tasksContainer.childNodes[length - 0]
        // );
        taskInfo.classList.remove("completed");
        taskInfo.classList.add("hide");
        infoTextContent.innerText = "";
        completedTaskIcon.classList.add("hide");
        schedulingRemoveBtn.classList.remove("hide");
        taskField.classList.remove("vanishTask");
        taskField.classList.add("appearTask");
        checkBtn.disabled = false;
        newTaskInput.focus();
      }, 300);
      setTimeout(() => {
        taskField.classList.remove("appearTask");
      }, 500);
    } else {
      taskField.classList.add("vanishTask");
      checkBtn.disabled = true;
      newTaskInput.blur();

      // Salvar ação no Local Storage
      infoTaskSave.completeTask = true;
      localStorage.setItem("tarefas", JSON.stringify(dbTarefas));

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
        // tasksContainer.insertBefore(
        //   taskField,
        //   tasksContainer.childNodes[length - 1]
        // );
        checkBtn.setAttribute("title", "Restaurar");
        taskInfo.classList.add("completed");
        taskInfo.classList.remove("hide");
        infoTextContent.innerText = "Tarefa concluída";
        completedTaskIcon.classList.remove("hide");
        schedulingRemoveBtn.classList.add("hide");
        checkBtn.disabled = false;
        newTaskInput.focus();
      }, 300);
      setTimeout(() => {
        taskField.classList.remove("appearTask");
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
    localStorage.setItem("tarefas", JSON.stringify(dbTarefas));

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
      (difDays < 2 && difDaysOfTheWeek == 1) ||
      (difDays < 2 && difDaysOfTheWeek == -6)
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
    infoTaskSave.scheduledTask = [
      true,
      scheduleInputDateValue,
      scheduleInputTimeValue,
      infoTextContent.innerText,
    ];
    localStorage.setItem("tarefas", JSON.stringify(dbTarefas));
  }
};

// Verificação do status do agendamento em tempo real
setInterval(() => {
  const currentFullDate = new Date();
  const currentDate = currentFullDate.toLocaleDateString("fr-CA");

  const tasks = tasksContainer.childNodes;
  for (const task of tasks) {
    if (
      task.classList.contains("scheduled") ||
      task.classList.contains("expiredTask")
    ) {
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
        (difTimeInDays < 2 && difDaysFromScheduledToCurrent == -6) ||
        (difTimeInDays < 2 && difDaysFromScheduledToCurrent == 1)
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
      }
    }
  }
}, 1000);
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
  delete infoTaskSave.scheduledTask;
  if (infoTaskSave.expireAlert) {
    delete infoTaskSave.expireAlert;
  }
  localStorage.setItem("tarefas", JSON.stringify(dbTarefas));

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
  }, 200);
  setTimeout(() => {
    taskField.classList.remove("pointerEventsNone");
    scheduleBtn.classList.remove("disabledBtn");
    editBtn.classList.remove("disabledBtn");
  }, 500);
};

// Configuração do botão de exclusão da tarefa
const deleteClick = (taskField, infoTaskSave) => {
  if (taskField.classList.contains("scheduled")) {
    header.classList.add("pointerEventsNone");
    tasksContainer.classList.add("tasksContainerHide");
    mainContainer.classList.add("pointerEventsNone");
    confirmFieldText.innerText =
      "Esta tarefa possui um agendamento, tem certeza que deseja removê-la?";
    confirmField.classList.add("appearWindow");
    confirmField.classList.remove("hide");

    btnYes.onclick = confirmDeleteAction;
    btnYes.focus();

    function confirmDeleteAction() {
      confirmField.classList.remove("appearWindow");
      confirmField.classList.add("vanishWindow");
      tasksContainer.classList.add("tasksContainerAppear");

      // Salvar ação no Local Storage
      const index = dbTarefas.indexOf(infoTaskSave);
      dbTarefas.splice(index, 1);
      localStorage.setItem("tarefas", JSON.stringify(dbTarefas));

      setTimeout(() => {
        taskField.classList.add("vanishTask");
      }, 200);
      setTimeout(() => {
        confirmField.classList.add("hide");
        header.classList.remove("pointerEventsNone");
        tasksContainer.classList.remove("tasksContainerHide");
        mainContainer.classList.remove("pointerEventsNone");
        tasksContainer.classList.remove("tasksContainerAppear");
        confirmField.classList.remove("vanishWindow");
        taskField.remove();
        newTaskInput.focus();
        if (tasksContainer.childNodes.length <= 0) {
          noTaskTextContainer.classList.remove("hide");
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

    // Salvar ação no Local Storage
    const index = dbTarefas.indexOf(infoTaskSave);
    dbTarefas.splice(index, 1);
    localStorage.setItem("tarefas", JSON.stringify(dbTarefas));

    setTimeout(() => {
      taskField.remove();
      newTaskInput.focus();
      if (tasksContainer.childNodes.length == 0) {
        if (noTaskTextContainer.classList.contains("hide")) {
          noTaskTextContainer.classList.remove("hide");
        }
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
  if (notesInfo.innerText == "") {
    notePadInput.focus();
    cleanNoteBtn.classList.add("hide");
  } else {
    cleanNoteBtn.classList.remove("hide");
  }
  setTimeout(() => {
    notePadContainer.classList.remove("notePadContainerAppear");
    notePadContainer.classList.add("pointerEventsVisible");
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
  notePadInput.onkeyup = () => {
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
    localStorage.setItem("tarefas", JSON.stringify(dbTarefas));

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
        localStorage.setItem("tarefas", JSON.stringify(dbTarefas));
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
  if (localStorage.getItem("tarefas")) {
    dbTarefas = JSON.parse(localStorage.getItem("tarefas"));
  }
  if (dbTarefas.length == 0) {
    noTaskTextContainer.classList.remove("hide");
  } else {
    if (!noTaskTextContainer.classList.contains("hide")) {
      noTaskTextContainer.classList.add("hide");
    }
  }
  tasksContainer.innerHTML = "";
  for (let i = 0; i < dbTarefas.length; i++) {
    // Recuperação dos dados de cada tarefa no array e renderização em tela

    const infoTaskSave = dbTarefas[i];

    // Tarefa
    const taskField = document.createElement("div");
    taskField.classList.add("taskField");
    taskField.classList.add("hover");
    tasksContainer.appendChild(taskField);

    // Texto da tarefa
    const taskContent = document.createElement("p");
    taskField.appendChild(taskContent);
    taskContent.classList.add("taskContent");
    taskContent.innerText = infoTaskSave.taskContent;

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
    cleanNoteBtnIcon.classList.add("fa-broom");
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
      deleteClick(taskField, infoTaskSave)
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
        // tasksContainer.insertBefore(
        //   taskField,
        //   tasksContainer.childNodes[length - 1]
        // );
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
  }
}

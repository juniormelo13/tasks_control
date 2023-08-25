// Campo de texto principal para informar as tarefas que serão adicionadas
const newTaskInput = document.querySelector("#newTaskInput");
newTaskInput.focus();

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

// Campo onde as novas tarefas serão adicionadas
const tasksContainer = document.querySelector(".tasksContainer");

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
      }
    };
  } else {
    // Caso o valor do input seja válido: Criação dos parágrafos e botões referentes a cada tarefa adicionada

    // Tarefa
    const taskField = document.createElement("div");
    newTaskInput.blur();
    setTimeout(() => {
      tasksContainer.insertBefore(taskField, tasksContainer.childNodes[0]);
      switch (tasksContainer.childNodes.length) {
        case 1:
          tasksContainer.childNodes[0].classList.add("oneTask");
          break;
        case 2:
          tasksContainer.childNodes[0].classList.add("twoTasks");
          tasksContainer.childNodes[1].classList.remove("oneTask");
          tasksContainer.childNodes[1].classList.add("twoTasks");
          break;
        default:
          tasksContainer.childNodes[1].classList.remove("twoTasks");
          tasksContainer.childNodes[2].classList.remove("twoTasks");
      }
      newTaskInput.focus();
    }, 200);
    taskField.classList.add("taskField");
    taskField.classList.add("hover");

    // Texto da tarefa
    const taskContent = document.createElement("p");
    taskField.appendChild(taskContent);
    taskContent.classList.add("taskContent");
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
    checkIcon.classList.add("fa-thumbs-up");
    checkBtn.setAttribute("title", "Concluir");
    checkBtn.addEventListener("click", () =>
      completeClick(
        taskField,
        taskContent,
        scheduleBtn,
        editBtn,
        checkBtn,
        checkIcon
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
    editBtn.addEventListener("click", () => editClick(taskContent, editBtn));

    // Botão para agendamento da tarefa
    const scheduleBtn = document.createElement("button");
    btnField.appendChild(scheduleBtn);
    scheduleBtn.classList.add("scheduleBtn");
    const scheduleIcon = document.createElement("i");
    scheduleBtn.appendChild(scheduleIcon);
    scheduleIcon.classList.add("fa-regular");
    scheduleIcon.classList.add("fa-calendar-days");
    scheduleBtn.setAttribute("title", "Agendar");
    scheduleBtn.addEventListener("click", () =>
      scheduleClick(taskField, scheduleBtn, editBtn)
    );

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

    cleanInputBtn.style.display = "none";

    newTaskInput.value = "";
  }
}

// Variáveis da janela de confirmação
const confirmField = document.querySelector("#confirmField");
const confirmFieldText = document.querySelector("#confirmFieldText");
const btnYes = document.querySelector("#btnYes");
const btnNo = document.querySelector("#btnNo");

// Configuração do botão para conclusão da tarefa
const completeClick = (taskField, taskContent, scheduleBtn, editBtn, checkBtn, checkIcon) => {
  if (taskField.classList.contains("scheduled")) {
    header.classList.add("hide");
    mainContainer.classList.add("hide");
    confirmFieldText.innerText = "Esta tarefa possui um agendamento, tem certeza que deseja concluí-la?";
    confirmField.classList.remove("hide");

    btnYes.onclick = confirmCompletedAction;
    btnYes.focus();

    function confirmCompletedAction() {
      header.classList.remove("hide");
      mainContainer.classList.remove("hide");
      confirmField.classList.add("hide");

      taskField.classList.remove("scheduled");

      if (taskField.classList.contains("expireAlert")) {
        taskField.classList.remove("expireAlert");
      }
      if (taskField.classList.contains("expiredTask")) {
        taskField.classList.remove("expiredTask");
      }

      const tasks = tasksContainer.childNodes;
      for (const task of tasks) {
        const schedulingInfo = task.childNodes[4];
        const appointmentDate = task.childNodes[2];
        const appointmentTime = task.childNodes[3];
        if (task.firstChild.isSameNode(taskContent)) {
          schedulingInfo.remove();
          appointmentTime.remove();
          appointmentDate.remove();
        }
      }

      checkIcon.classList.remove("fa-thumbs-up");

      taskContent.classList.add("completed");
      taskField.classList.add("completed");
      switch (editBtn.classList.contains("disabled")) {
        case false:
          editBtn.classList.add("disabled");
          break;
      }

      checkIcon.classList.add("fa-rotate");
      checkIcon.classList.add("fa-spin");

      const completedTaskInfo = document.createElement("div");
      const completedTaskTextContent = document.createElement("p");
      const completedTaskIcon = document.createElement("i");
      setTimeout(() => {
        tasksContainer.insertBefore(
          taskField,
          tasksContainer.childNodes[length - 1]
        );
      }, 200);
      checkBtn.setAttribute("title", "Restaurar");

      taskField.appendChild(completedTaskInfo);
      completedTaskInfo.classList.add("completedTaskInfo");
      completedTaskInfo.appendChild(completedTaskTextContent);
      completedTaskTextContent.classList.add("completedTaskTextContent");
      completedTaskTextContent.innerText = "Concluído";
      completedTaskInfo.appendChild(completedTaskIcon);
      completedTaskIcon.classList.add("completedTaskIcon");
      completedTaskIcon.classList.add("fa-solid");
      completedTaskIcon.classList.add("fa-check");

      newTaskInput.focus();
    }

    btnNo.onclick = () => {
      header.classList.remove("hide");
      mainContainer.classList.remove("hide");
      confirmField.classList.add("hide");

      newTaskInput.focus();
    };
  } else if (taskField.classList.contains("expiredTask")) {
    taskField.classList.remove("expiredTask");
    checkIcon.classList.remove("fa-thumbs-up");

    const tasks = tasksContainer.childNodes;
    for (const task of tasks) {
      const schedulingInfo = task.childNodes[4];
      const appointmentDate = task.childNodes[2];
      const appointmentTime = task.childNodes[3];
      if (task.firstChild.isSameNode(taskContent)) {
        schedulingInfo.remove();
        appointmentTime.remove();
        appointmentDate.remove();
      }
    }

    taskContent.classList.add("completed");
    taskField.classList.add("completed");
    checkIcon.classList.add("fa-rotate");
    checkIcon.classList.add("fa-spin");

    const completedTaskInfo = document.createElement("div");
    const completedTaskTextContent = document.createElement("p");
    const completedTaskIcon = document.createElement("i");
    setTimeout(() => {
      tasksContainer.insertBefore(
        taskField,
        tasksContainer.childNodes[length - 1]
      );
      checkBtn.setAttribute("title", "Restaurar");
      completedTaskInfo.classList.add("completedTaskInfo");
      completedTaskTextContent.classList.add("completedTaskTextContent");
      completedTaskTextContent.innerText = "Concluído";
      completedTaskIcon.classList.add("completedTaskIcon");
      completedTaskIcon.classList.add("fa-solid");
      completedTaskIcon.classList.add("fa-check");
    }, 200);

    taskField.appendChild(completedTaskInfo);
    completedTaskInfo.appendChild(completedTaskTextContent);
    completedTaskInfo.appendChild(completedTaskIcon);

    newTaskInput.focus();
  } else {
    if (taskField.classList.contains("completed")) {
      taskField.classList.remove("hover");
      newTaskInput.blur();
      setTimeout(() => {
        checkBtn.setAttribute("title", "Concluir");
  
        taskContent.classList.toggle("completed");
        taskField.classList.toggle("completed");
        editBtn.classList.toggle("disabled");
        scheduleBtn.classList.toggle("disabled");
        checkIcon.classList.toggle("fa-thumbs-up");
        checkIcon.classList.toggle("fa-rotate");
        checkIcon.classList.toggle("fa-spin");
  
        const tasks = tasksContainer.childNodes;
        for (const task of tasks) {
          const completedTaskInfo = task.childNodes[2];
          if (task.firstChild.isSameNode(taskContent)) {
            completedTaskInfo.remove();
          }
        }
        newTaskInput.focus();
      }, 200);
      setTimeout(() => {
        taskField.classList.add("hover");
      }, 400);
    } else {
      taskField.classList.remove("hover");
      newTaskInput.blur();
      setTimeout(() => {
        taskContent.classList.toggle("completed");
        taskField.classList.toggle("completed");
        editBtn.classList.toggle("disabled");
        scheduleBtn.classList.toggle("disabled");
        checkIcon.classList.toggle("fa-thumbs-up");
        checkIcon.classList.toggle("fa-rotate");
        checkIcon.classList.toggle("fa-spin");
    
        const completedTaskInfo = document.createElement("div");
        const completedTaskTextContent = document.createElement("p");
        const completedTaskIcon = document.createElement("i");
    
        tasksContainer.insertBefore(taskField, tasksContainer.childNodes[length - 1]);
        checkBtn.setAttribute("title", "Restaurar");
        completedTaskInfo.classList.add("completedTaskInfo");
        completedTaskTextContent.classList.add("completedTaskTextContent");
        completedTaskTextContent.innerText = "Concluído";
        completedTaskIcon.classList.add("completedTaskIcon");
        completedTaskIcon.classList.add("fa-solid");
        completedTaskIcon.classList.add("fa-check");
        taskField.appendChild(completedTaskInfo);
        completedTaskInfo.appendChild(completedTaskTextContent);
        completedTaskInfo.appendChild(completedTaskIcon);
        newTaskInput.focus();
      }, 200);
      setTimeout(() => {
        taskField.classList.add("hover");
      }, 400);
    }
  }
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
const editClick = (taskContent, editBtn) => {
  header.classList.add("hide");
  mainContainer.classList.add("hide");
  editField.classList.add("appear");
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

  taskContent.classList.add("task");
  editBtn.classList.add("editing");
};

// Função responsável pelo fechamento da janela de edições
const closeEditField = () => {
  editField.classList.add("vanish");
  editField.classList.remove("appear");
  mainContainer.classList.add("mainContainerAppear");
  setTimeout(() => {
    editField.classList.remove("vanish");
    editField.classList.add("hide");
    header.classList.remove("hide");
    mainContainer.classList.remove("mainContainerAppear");
    mainContainer.classList.remove("hide");
    newTaskInput.focus();
  }, 200);
  if (editInput.classList.contains("inputError")) {
    editInput.classList.remove("inputError");
  }
  document.querySelector(".task").classList.remove("task");
  document.querySelector(".editing").classList.remove("editing");
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

editInput.onkeyup = () => {
  const validateEditField = () => editInput.value != "";
  if (!validateEditField()) {
    cleanEditInputBtn.style.display = "none";
  } else {
    cleanEditInputBtn.style.display = "inline";
  }
};

// Configuração do botão de confirmação da edição
const confirmEditBtn = document.querySelector("#confirmEditBtn");

editInput.onkeypress = (e) => {
  if (e.key === "Enter") {
    editTask();
  }
};

confirmEditBtn.onclick = editTask;

function editTask() {
  // Função para validar o input do campo de edição
  const validateEditField = () => editInput.value.trim() != "";
  if (!validateEditField()) {
    // Caso o valor do input seja inválido: Será adicionado a class abaixo no input
    editInput.classList.add("inputError");
    editInput.blur();
  } else {
    // Caso o valor do input seja válido: Será realizado a edição da tarefa conforme config. abaixo
    editField.classList.add("vanish");
    editField.classList.remove("appear");
    mainContainer.classList.add("mainContainerAppear");
    setTimeout(() => {
      editField.classList.remove("vanish");
      editField.classList.add("hide");
      header.classList.remove("hide");
      mainContainer.classList.remove("mainContainerAppear");
      mainContainer.classList.remove("hide");
      newTaskInput.focus();
      document.querySelector(".task").classList.add("fadeInFromRight");
      document.querySelector(".task").innerText = editInput.value;
    }, 200);
    setTimeout(() => {
      document.querySelector(".task").classList.remove("fadeInFromRight");
      document.querySelector(".task").classList.remove("task");
      document.querySelector(".editing").classList.remove("editing");
    }, 500);
  }
}

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
const scheduleClick = (taskField, scheduleBtn, editBtn) => {
  header.classList.add("hide");
  mainContainer.classList.add("hide");
  scheduleField.classList.add("appear");
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
    confirmSchedule(taskField, scheduleBtn, editBtn);

  scheduleField.onkeypress = (e) => {
    if (e.key === "Enter") {
      confirmSchedule(taskField, scheduleBtn, editBtn);
    }
  };
};

// Função responsável pelo fechamento da janela de agendamento
const closeScheduleField = () => {
  scheduleField.classList.add("vanish");
  scheduleField.classList.remove("appear");
  mainContainer.classList.add("mainContainerAppear");
  setTimeout(() => {
    scheduleField.classList.remove("vanish");
    scheduleField.classList.add("hide");
    header.classList.remove("hide");
    mainContainer.classList.remove("mainContainerAppear");
    mainContainer.classList.remove("hide");
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
const confirmSchedule = (taskField, scheduleBtn, editBtn) => {
  const currentDate = new Date();
  const scheduleInputDateValue = scheduleInputDate.value;
  const scheduleInputTimeValue = scheduleInputTime.value;
  const currentDateForValidate = currentDate.toLocaleDateString("fr-CA");
  const optionsForCurrentTime = {
    timeStyle: "short",
  };
  const currentTimeForValidate = currentDate.toLocaleString(
    "pt-BR",
    optionsForCurrentTime
  );

  // Funções de validação dos input's de data e hora
  const validateScheduleInputDate = () =>
    scheduleInputDateValue.trim() != "" &&
    scheduleInputDateValue >= currentDateForValidate;

  const validateScheduleInputTime = () => {
    if (
      scheduleInputTimeValue.trim() != "" &&
      scheduleInputDateValue > currentDateForValidate
    ) {
      return true;
    }
    if (
      scheduleInputDateValue === currentDateForValidate &&
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
    scheduleField.classList.add("vanish");
    scheduleField.classList.remove("appear");
    mainContainer.classList.add("mainContainerAppear");

    setTimeout(() => {
      scheduleField.classList.remove("vanish");
      scheduleField.classList.add("hide");
      header.classList.remove("hide");
      mainContainer.classList.remove("mainContainerAppear");
      mainContainer.classList.remove("hide");
      scheduleField.classList.add("hide");
      scheduleBtn.classList.add("disabled");
      taskField.classList.add("scheduled");
      newTaskInput.focus();

      schedulingInfo.classList.add("appear");
      taskField.appendChild(schedulingInfo);
    }, 300);

    setTimeout(() => {
      schedulingInfo.classList.remove("appear");
    }, 500);

    // Criação do campo de informações sobre o agendamento
    const schedulingInfo = document.createElement("div");
    const schedulingTextContent = document.createElement("p");
    const schedulingRemoveBtn = document.createElement("input");

    schedulingInfo.classList.add("schedulingInfo");
    schedulingTextContent.classList.add("schedulingTextContent");
    schedulingInfo.appendChild(schedulingTextContent);
    schedulingInfo.appendChild(schedulingRemoveBtn);
    schedulingRemoveBtn.classList.add("schedulingRemoveBtn");
    schedulingRemoveBtn.setAttribute("title", "Cancelar agendamento");
    schedulingRemoveBtn.setAttribute("type", "button");
    schedulingRemoveBtn.setAttribute("value", "X");
    schedulingRemoveBtn.addEventListener("click", () =>
      schedulingRemoveClick(
        schedulingInfo,
        taskField,
        scheduleBtn,
        appointmentDate,
        appointmentTime,
        editBtn
      )
    );

    // Recebimento dos valores colocados nos inputs
    const setDateForScheduling = new Date(
      scheduleInputDateValue + " " + scheduleInputTimeValue
    );

    const optionsSetDate = {
      dateStyle: "long",
    };
    const optionsSetTime = {
      timeStyle: "short",
    };
    const optionsSetDay = {
      weekday: "long",
    };

    const dateForSchedulingTextContent = setDateForScheduling.toLocaleString(
      "pt-BR",
      optionsSetDate
    );
    const timeForSchedulingTextContent = setDateForScheduling.toLocaleString(
      "pt-BR",
      optionsSetTime
    );
    const dayForSchedulingTextContent = setDateForScheduling.toLocaleString(
      "pt-BR",
      optionsSetDay
    );

    // Inclusão dos dados no campo de informações sobre o agendamento
    const difSeconds =
      (setDateForScheduling.getTime() - currentDate.getTime()) / 1000;
    const difMinutes = difSeconds / 60;
    const difDaysOfTheWeek =
      setDateForScheduling.getDay() - currentDate.getDay();

    if (difMinutes > 2879) {
      schedulingTextContent.innerText =
        "Agendado para " +
        dayForSchedulingTextContent +
        ", " +
        dateForSchedulingTextContent +
        " às " +
        timeForSchedulingTextContent;
    } else if (
      difMinutes > 1440 &&
      difMinutes <= 2879 &&
      difDaysOfTheWeek >= 2
    ) {
      schedulingTextContent.innerText =
        "Agendado para " +
        dayForSchedulingTextContent +
        ", " +
        dateForSchedulingTextContent +
        " às " +
        timeForSchedulingTextContent;
    } else if (
      difMinutes > 1440 &&
      difMinutes <= 2879 &&
      difDaysOfTheWeek == -5
    ) {
      schedulingTextContent.innerText =
        "Agendado para " +
        dayForSchedulingTextContent +
        ", " +
        dateForSchedulingTextContent +
        " às " +
        timeForSchedulingTextContent;
    } else {
      schedulingTextContent.innerText = "";
    }

    const appointmentDate = document.createElement("span");
    appointmentDate.classList.add("appointmentDate");
    appointmentDate.classList.add("hide");
    appointmentDate.innerText = scheduleInputDateValue;

    const appointmentTime = document.createElement("span");
    appointmentTime.classList.add("appointmentTime");
    appointmentTime.classList.add("hide");
    appointmentTime.innerText = scheduleInputTimeValue;

    taskField.appendChild(appointmentDate);
    taskField.appendChild(appointmentTime);
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
      const appointmentDate = task.childNodes[2];
      const appointmentTime = task.childNodes[3];
      const schedulingDate = new Date(
        appointmentDate.innerText + " " + appointmentTime.innerText
      );

      const schedulingInfo = task.childNodes[4];
      const schedulingTextContent = schedulingInfo.firstChild;
      const schedulingRemoveBtn = schedulingInfo.childNodes[1];
      const btnField = task.childNodes[1];
      const editBtn = btnField.childNodes[1];
      const difTimeInSeconds =
        (schedulingDate.getTime() - currentFullDate.getTime()) / 1000;
      const difTimeInMinutes = difTimeInSeconds / 60;
      const difTimeInDays = difTimeInMinutes / (60 * 24);

      const difSeconds =
        (currentFullDate.getTime() - schedulingDate.getTime()) / 1000;
      const difMinutes = difSeconds / 60;
      const difDays = difMinutes / (60 * 24);

      if (difTimeInSeconds <= 0) {
        schedulingInfo.classList.add("expiredTask");
        if (task.classList.contains("expireAlert")) {
          task.classList.remove("expireAlert");
        }
        if (schedulingInfo.classList.contains("expireAlert")) {
          schedulingInfo.classList.remove("expireAlert");
        }
        task.classList.add("expiredTask");
        task.classList.remove("scheduled");
        schedulingRemoveBtn.setAttribute("title", "Restaurar");
        editBtn.classList.add("disabled");

        if (currentDate === appointmentDate.innerText) {
          schedulingTextContent.innerText =
            "Expirou hoje às " + appointmentTime.innerText;
        } else if (
          difDays < 2 &&
          schedulingDate.getDay() == 6 &&
          currentFullDate.getDay() == 0
        ) {
          schedulingTextContent.innerText =
            "Expirou ontem às " + appointmentTime.innerText;
        } else if (
          difDays < 2 &&
          currentFullDate.getDay() - schedulingDate.getDay() == 1
        ) {
          schedulingTextContent.innerText =
            "Expirou ontem às " + appointmentTime.innerText;
        } else {
          schedulingTextContent.innerText =
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
        schedulingTextContent.innerText =
          "Agendado para hoje às " +
          appointmentTime.innerText +
          " - Expira em " +
          Math.ceil(difTimeInMinutes) +
          " min";
        task.classList.add("expireAlert");
        schedulingInfo.classList.add("expireAlert");
      } else if (
        difTimeInMinutes > 30 &&
        difTimeInMinutes <= 60 &&
        currentDate === appointmentDate.innerText
      ) {
        schedulingTextContent.innerText =
          "Agendado para hoje às " +
          appointmentTime.innerText +
          " - Expira em " +
          Math.ceil(difTimeInMinutes) +
          " min";
      } else if (
        currentDate === appointmentDate.innerText &&
        difTimeInMinutes > 60
      ) {
        schedulingTextContent.innerText =
          "Agendado para hoje às " + appointmentTime.innerText;
      } else if (
        difTimeInDays < 2 &&
        schedulingDate.getDay() == 0 &&
        currentFullDate.getDay() == 6
      ) {
        schedulingTextContent.innerText =
          "Agendado para amanhã às " + appointmentTime.innerText;
      } else if (
        difTimeInDays < 2 &&
        schedulingDate.getDay() - currentFullDate.getDay() == 1
      ) {
        schedulingTextContent.innerText =
          "Agendado para amanhã às " + appointmentTime.innerText;
      }
    }
  }
}, 0);
// Configuração do botão de remoção do agendamento
const schedulingRemoveClick = (
  schedulingInfo,
  taskField,
  scheduleBtn,
  appointmentDate,
  appointmentTime,
  editBtn
) => {
  schedulingInfo.classList.add("vanish");
  setTimeout(() => {
    appointmentDate.remove();
    appointmentTime.remove();
    if (taskField.classList.contains("scheduled")) {
      taskField.classList.remove("scheduled");
    }
    if (taskField.classList.contains("expiredTask")) {
      taskField.classList.remove("expiredTask");
    }
    if (schedulingInfo.classList.contains("expiredTask")) {
      schedulingInfo.classList.remove("expiredTask");
    }
    if (taskField.classList.contains("expireAlert")) {
      taskField.classList.remove("expireAlert");
    }
    taskField.style.pointerEvents = "none";
    schedulingInfo.remove();
    newTaskInput.focus();
  }, 200);
  setTimeout(() => {
    taskField.style.pointerEvents = "visible";
    scheduleBtn.classList.remove("disabled");
    editBtn.classList.remove("disabled");
  }, 500);
};

// Configuração do botão de exclusão da tarefa
const deleteClick = (taskField) => {
  if (taskField.classList.contains("scheduled")) {
    header.classList.add("hide");
    mainContainer.classList.add("hide");
    confirmFieldText.innerText =
      "Esta tarefa possui um agendamento, tem certeza que deseja removê-la?";
    confirmField.classList.remove("hide");

    btnYes.onclick = confirmDeleteAction;
    btnYes.focus();

    function confirmDeleteAction() {
      taskField.classList.add("removeTask");
      setTimeout(() => {
        header.classList.remove("hide");
        mainContainer.classList.remove("hide");
        confirmField.classList.add("hide");

        taskField.remove();
        newTaskInput.focus();

        switch (tasksContainer.childNodes.length) {
          case 2:
            tasksContainer.childNodes[0].classList.add("twoTasks");
            tasksContainer.childNodes[1].classList.add("twoTasks");
            break;
          case 1:
            tasksContainer.childNodes[0].classList.remove("twoTasks");
            tasksContainer.childNodes[0].classList.add("oneTask");
        }
      }, 200);
    }

    btnNo.onclick = () => {
      header.classList.remove("hide");
      mainContainer.classList.remove("hide");
      confirmField.classList.add("hide");

      newTaskInput.focus();
    };
  } else {
    taskField.classList.add("removeTask");
    setTimeout(() => {
      taskField.remove();
      newTaskInput.focus();

      switch (tasksContainer.childNodes.length) {
        case 2:
          tasksContainer.childNodes[0].classList.add("twoTasks");
          tasksContainer.childNodes[1].classList.add("twoTasks");
          break;
        case 1:
          tasksContainer.childNodes[0].classList.remove("twoTasks");
          tasksContainer.childNodes[0].classList.add("oneTask");
      }
    }, 200);
  }
};

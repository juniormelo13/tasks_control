const newTaskInput = document.querySelector("#newTaskInput");
const newTaskBtn = document.querySelector("#newTaskAdd");
const tasksContainer = document.querySelector(".tasksContainer");
const resetBtn = document.querySelector('#resetInput')

resetBtn.addEventListener('click', () => {
  newTaskInput.value = ''
  newTaskInput.focus()
})

const validateField = () => newTaskInput.value.trim() != "";


newTaskBtn.addEventListener("click", () => {
  if (!validateField()) {
    console.log("Erro");
  } else {
    const taskField = document.createElement("div");
    taskField.classList.add("taskField");

    const taskContent = document.createElement("p");
    taskContent.innerText = newTaskInput.value;

    const iconsField = document.createElement("div");
    iconsField.classList.add("iconsField");

    const checkBtn = document.createElement("button");
    checkBtn.classList.add("checkBtn");
    const checkIcon = document.createElement("i");
    checkIcon.classList.add("fa-solid");
    checkIcon.classList.add("fa-check");
    checkBtn.setAttribute('title', 'Concluir')
    checkBtn.addEventListener("click", () =>
      completeClick(taskField, taskContent)
    );
    
    const scheduleBtn = document.createElement("button");
    scheduleBtn.classList.add("scheduleBtn");
    const scheduleIcon = document.createElement("i");
    scheduleIcon.classList.add("fa-solid");
    scheduleIcon.classList.add("fa-calendar-days");
    scheduleBtn.setAttribute('title', 'Agendar')
    
    const editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid");
    editIcon.classList.add("fa-file-pen");
    editBtn.setAttribute('title', 'Editar')

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("removeBtn");
    const removeIcon = document.createElement("i");
    removeIcon.classList.add("fa-solid");
    removeIcon.classList.add("fa-trash");
    removeBtn.setAttribute('title', 'Excluir')
    removeBtn.addEventListener("click", () =>
      deleteClick(taskField, taskContent)
    );

    tasksContainer.appendChild(taskField);
    taskField.appendChild(taskContent);
    taskField.appendChild(iconsField);
    iconsField.appendChild(checkBtn);
    checkBtn.appendChild(checkIcon);
    iconsField.appendChild(scheduleBtn);
    scheduleBtn.appendChild(scheduleIcon)
    iconsField.appendChild(editBtn)
    editBtn.appendChild(editIcon)
    iconsField.appendChild(removeBtn);
    removeBtn.appendChild(removeIcon);

    newTaskInput.focus();
    newTaskInput.value = "";
  }
});

const deleteClick = (taskField, taskContent) => {
  const tasks = tasksContainer.childNodes;
  for (const task of tasks) {
    if (task.firstChild.isSameNode(taskContent)) {
      taskField.remove();
    }
  }
  newTaskInput.focus();
};

const completeClick = (taskField, taskContent) => {
  const tasks = tasksContainer.childNodes;
  for (const task of tasks) {
    if (task.firstChild.isSameNode(taskContent)) {
      console.log("Completou");
    }
  }
  newTaskInput.focus();
};

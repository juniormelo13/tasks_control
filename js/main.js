// Input principal para descrição das tarefas
const newTaskInput = document.querySelector("#newTaskInput");
newTaskInput.focus();

// Função para reiniciar input's inválidos
function resetInput() {
  newTaskInput.classList.remove('inputError')
}

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
  editField.style.display = "block";
  header.style.pointerEvents = "none";
  mainContainer.style.pointerEvents = "none";

  editInput.value = taskContent.innerText;
  editInput.select();

  taskContent.classList.add("task");
};

// Função responsável pelo fechamento da janela de edições
const closeEditField = () => {
  editField.style.display = "none";
  header.style.pointerEvents = "auto";
  mainContainer.style.pointerEvents = "auto";

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
    editInput.classList.add("InputError");
  } else {
    // Caso o valor do input seja válido: Será realizado a edição da tarefa conforme config. abaixo
    editField.style.display = "none";
    header.style.pointerEvents = "auto";
    mainContainer.style.pointerEvents = "auto";

    document.querySelector(".task").innerText = editInput.value;
    document.querySelector(".task").classList.remove("task");
  }
});

// Configuração do botão de deleção da tarefa
const deleteClick = (taskField) => {
  taskField.remove();
  newTaskInput.focus();
};



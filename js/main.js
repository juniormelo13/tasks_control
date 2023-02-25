const newTaskField = document.querySelector("#newTaskField");
const newTaskBtn = document.querySelector("#newTaskAdd");

const validateField = () => {
  if (newTaskField.value.trim() == "") {
    return false;
  }
  return true;
};

const tasksContainer = document.querySelector(".tasksContainer");

let contador = 0

newTaskBtn.addEventListener("click", () => {
  if (!validateField()) {
    newTaskField.style.border = "2px solid red";
    
  } else {
    contador += 1

    const taskField = document.createElement("div");
    taskField.classList.add("taskField");
    taskField.classList.add('taskField' + contador);

    const task = document.createElement("p");
    task.innerText = newTaskField.value;
    task.classList.add("task");

    const iconsField = document.createElement("div");
    iconsField.classList.add("iconsField");

    const checkBtn = document.createElement("button");
    checkBtn.classList.add("checkBtn");
    const checkIcon = document.createElement("i");
    checkIcon.classList.add("fa-regular");
    checkIcon.classList.add("fa-circle-check");

    const removeBtn = document.createElement("button");
    // removeBtn.setAttribute('onclick', 'remove()')
    removeBtn.classList.add("removeBtn");
    removeBtn.classList.add('removeBtn' + contador);
    const removeIcon = document.createElement("i");
    removeIcon.classList.add("fa-solid");
    removeIcon.classList.add("fa-trash");

    tasksContainer.appendChild(taskField);
    taskField.appendChild(task);
    taskField.appendChild(iconsField);
    iconsField.appendChild(checkBtn);
    checkBtn.appendChild(checkIcon);
    iconsField.appendChild(removeBtn);
    removeBtn.appendChild(removeIcon);

    newTaskField.focus();
    newTaskField.value = "";
    newTaskField.style.border = "2px solid black";

    
    let removeBtn2 = document.querySelector('.removeBtn' + contador)

    console.log('Adicionou', contador, removeBtn2)

    removeBtn2.addEventListener('click', () => {
      document.querySelector('.taskField' + contador).remove()
      console.log('Removeu', contador)
    })
    
  }
});


// function remove() {
//   
//   console.log('Removeu', contador, removeBtn2)
// }


  


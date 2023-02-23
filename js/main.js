const newTaskField = document.querySelector('#newTaskField')
const newTaskBtn = document.querySelector('#newTaskAdd')

const validateField = () => {
    if (newTaskField.value.trim() == "") {
        return false
    }
    return true
}

const tasksContainer = document.querySelector('.tasksContainer')

newTaskBtn.addEventListener('click', () => {
    if (!validateField()) {
        newTaskField.style.border = "2px solid red"
        newTaskField.focus()
        alert('Favor preencher corretamente o campo!')
    } else {
        const taskField = document.createElement('div')
        taskField.classList.add('taskField')
        const task = document.createElement('p')
        task.innerText = newTaskField.value
        task.classList.add('task')
        const iconsField = document.createElement('div')
        iconsField.classList.add('iconsField')
        const checkIcon = document.createElement('i')
        checkIcon.classList.add('fa-regular')
        checkIcon.classList.add('fa-circle-check')
        const removeIcon = document.createElement('i')
        removeIcon.classList.add('fa-solid')
        removeIcon.classList.add('fa-trash')
        tasksContainer.appendChild(taskField)
        taskField.appendChild(task)
        taskField.appendChild(iconsField)
        iconsField.appendChild(checkIcon)
        iconsField.appendChild(removeIcon)
        newTaskField.focus()
        newTaskField.value = ""
        newTaskField.style.border = "2px solid black"
    }
})

newTaskField.addEventListener('change', () => {
    newTaskField.style.border = "2px solid black"
})

const checkIcon = document.querySelector('.iconsField')
checkIcon.addEventListener('click', () => {
    console.log('Clicou')
})



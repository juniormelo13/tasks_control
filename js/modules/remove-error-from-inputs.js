export default function initRemoveErrorFromInputs() {
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
}
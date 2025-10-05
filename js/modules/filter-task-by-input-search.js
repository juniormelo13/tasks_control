function filterTaskByInput() {
  let containsHide = [];
  for (let i = 0; i < dbAllTasks.length; i++) {
    const infoTaskSave = dbAllTasks[i];
    const taskField = tasksContainer.childNodes[i];
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

export default function initFilterTaskByInputSearch() {

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

  searchTaskInput.onblur = () => {
    clearEmptyInput(searchTaskInput);
  };

  cleanInputSearchBtn.addEventListener("click", () => {
    searchTaskInput.focus();
    cleanInputFilter();
    removeFilter();
    activateFilterBtn(allTasksFilterBtn);
    taskRecover();
  });

}

let flippedTask = false

function notesBtnClick(taskField, task, taskFront, notePadInput, notePadContainer, cleanNoteBtn, notesBtn, infoTaskSave) {
  header.classList.add("pointerEventsNone");
  if(menuOpen) {
    menu.classList.add("pointerEventsNone");
  }
  if(filtred) {
    filterInformationBox.classList.add("pointerEventsNone");
  }
  if (infoTaskSave.savedNote) {
    notePadInput.value = infoTaskSave.savedNote[1];
    cleanNoteBtn.classList.remove("hide");
  } else {
    notePadInput.value == "";
    cleanNoteBtn.classList.add("hide");
  }
  highLight(taskField, notePadContainer, "true")
  taskFront.classList.add("pointerEventsNone")
  task.classList.add("flipAnimate")
  setTimeout(() => {
    flippedTask = true;
  }, 200);
  document.onmousedown = (e) => {
    if (flippedTask && !notePadContainer.contains(e.target)) {
      saveNoteClick(taskField, task, taskFront, notePadContainer, notePadInput, notesBtn, infoTaskSave);
    }
  };
  notePadInput.onblur = () => {
    clearEmptyInput(notePadInput);
  };
}

function saveNoteClick(taskField, task, taskFront, notePadContainer, notePadInput, notesBtn, infoTaskSave) {
  if (notePadInput.value.trim() != "") {
    infoTaskSave.savedNote = [true, notePadInput.value.trim()];
    localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
    notesBtn.classList.add("active");
  } else {
    if (infoTaskSave.savedNote) {
      delete infoTaskSave.savedNote;
    }
    localStorage.setItem("tasks", JSON.stringify(dbAllTasks));
    notesBtn.classList.remove("active");
  }
  task.classList.remove("flipAnimate")
  highLight(taskField, notePadContainer, "false")
  taskFront.classList.remove("pointerEventsNone")
  flippedTask = false
  setTimeout(() => {
    header.classList.remove("pointerEventsNone");
    menu.classList.remove("pointerEventsNone");
    filterInformationBox.classList.remove("pointerEventsNone");
  }, 200);
}
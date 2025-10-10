import { header } from "./auxiliary-func-for-window.js";
import { menuOpen, menu } from "./menu.js";
import { filtred, filterInformationBox } from "./filter-information.js";
import { dbAllTasks } from "./save-actions-to-localstorage.js";
import { clearEmptyInput } from "./auxiliary-func-for-inputs.js";
import { tasksContainer } from "./new-task-input.js";

let flippedTask = false

export function notesBtnClick(taskField, task, taskFront, notePadInput, notePadContainer, cleanNoteBtn, notesBtn, infoTaskSave) {
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

export function saveNoteClick(taskField, task, taskFront, notePadContainer, notePadInput, notesBtn, infoTaskSave) {
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

function highLight(taskField, notePadContainer, option) {
  const taskFields = tasksContainer.childNodes;
  if (option == "true") {
    for (const taskField of taskFields) {
      taskField.classList.add("pointerEventsNone");
      taskField.classList.add("lowOpacity");
    }
    taskField.classList.remove("pointerEventsNone");
    taskField.classList.remove("lowOpacity");
    notePadContainer.classList.add("active");
  } else {
    for (const taskField of taskFields) {
      if (taskField.classList.contains("lowOpacity")) {
        taskField.classList.remove("lowOpacity");
      }
      taskField.classList.add("normalOpacity");
    }
    taskField.classList.remove("normalOpacity");
    notePadContainer.classList.remove("active");
    setTimeout(() => {
      for (const taskField of taskFields) {
        taskField.classList.remove("pointerEventsNone");
        if (taskField.classList.contains("normalOpacity")) {
          taskField.classList.remove("normalOpacity");
        }
      }
    }, 200);
  }
}
import { cleanInputFilter, removeFilter, activateFilterBtn } from "./auxiliary-func-for-filters.js";
import taskRecover from "./task-recover.js";

const cleanFilterBtn = document.querySelector("#cleanFilterBtn");

export default function initFilterInformationField() {
  
  cleanFilterBtn.addEventListener("click", () => {
    cleanInputFilter();
    removeFilter();
    activateFilterBtn(allTasksFilterBtn);
    taskRecover();
  });

}
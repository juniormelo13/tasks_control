import { cleanInputFilter, removeFilter, activateFilterBtn } from "./auxiliary-func-for-filters.js";
import { allTasksFilterBtn, filterTaskByClass } from "./filter-task-by-status.js";

const cleanFilterBtn = document.querySelector("#cleanFilterBtn");

export default function initFilterInformationField() {
  
  cleanFilterBtn.addEventListener("click", () => {
    cleanInputFilter();
    removeFilter();
    activateFilterBtn(allTasksFilterBtn);
    filterTaskByClass("allTask");
  });

}
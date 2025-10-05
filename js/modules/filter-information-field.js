const cleanFilterBtn = document.querySelector("#cleanFilterBtn");

export default function initFilterInformationField() {
  
  cleanFilterBtn.addEventListener("click", () => {
    cleanInputFilter();
    removeFilter();
    activateFilterBtn(allTasksFilterBtn);
    taskRecover();
  });

}
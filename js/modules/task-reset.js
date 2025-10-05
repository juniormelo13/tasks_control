function clearTaskClass(infoTextContent, taskInfo, taskFront) {
  if (taskFront.classList.contains("scheduled") || taskFront.classList.contains("expiredTask")) {
    infoTextContent.innerText = "";
  }
  if (!taskInfo.classList.contains("hide")) {
    taskInfo.classList.add("hide");
  }
  if (taskInfo.classList.contains("scheduled")) {
    taskFront.classList.remove("scheduled");
    taskInfo.classList.remove("scheduled");
  }
  if (taskFront.classList.contains("expireAlert")) {
    taskFront.classList.remove("expireAlert");
    taskInfo.classList.remove("expireAlert");
  }
  if (taskFront.classList.contains("expiredTask")) {
    taskFront.classList.remove("expiredTask");
    taskInfo.classList.remove("expiredTask");
  }
  if (taskFront.classList.contains("completed")) {
    taskFront.classList.remove("completed");
    taskInfo.classList.remove("completed");
  }
}
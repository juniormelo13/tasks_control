function disableBtn(btn) {
  btn.classList.remove("normalOpacity");
  btn.classList.add("lowOpacity");
  btn.classList.remove("hover");
  btn.disabled = true;
}

function enableBtn(btn) {
  btn.classList.remove("lowOpacity");
  btn.classList.add("normalOpacity");
  btn.classList.add("hover");
  btn.disabled = false;
}
const toggle = document.getElementById("themeToggle");

toggle.onclick = function () {

  if(document.body.classList.contains("dark")){
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    toggle.textContent = "🌙";
  } else {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    toggle.textContent = "☀️";
  }

};

function scrollToForm(){
  document.getElementById("leadForm").scrollIntoView({ behavior: "smooth" });
}
function openForm(){
  document.getElementById("popupForm").classList.add("active");
}

function closeForm(){
  document.getElementById("popupForm").classList.remove("active");
}
window.onclick = function(event) {
  const popup = document.getElementById("popupForm");
  if (event.target === popup) {
    popup.classList.remove("active");
  }
}
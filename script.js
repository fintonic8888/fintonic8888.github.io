// THEME TOGGLE
const toggle = document.getElementById("themeToggle");

toggle.onclick = function () {
  document.body.classList.toggle("dark");
};

// POPUP
function openForm(){
  document.getElementById("popupForm").classList.add("active");
}

function closeForm(){
  document.getElementById("popupForm").classList.remove("active");
}

// CLOSE ON OUTSIDE CLICK
window.onclick = function(e){
  const popup = document.getElementById("popupForm");
  if(e.target === popup){
    popup.classList.remove("active");
  }
};

// FORM SUBMIT

document.getElementById("referralForm").addEventListener("submit", function(e){
  e.preventDefault();

  const agree = document.getElementById("agree").checked;

  if(!agree){
    alert("Please accept the terms.");
    return;
  }

  const data = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value
  };

  fetch("https://script.google.com/macros/s/AKfycbxaxhcLJ7TasZG-u08U7VFfTuXOiF_y-wwUJXfnwJ6md3P6JCnjoRGA5TJVj1pPsZi8Dw/exec", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {

  // reset loader
  btn.disabled = false;
  btnText.style.display = "inline";
  loader.style.display = "none";

  const errorBox = document.getElementById("errorBox");
  const successBox = document.getElementById("successBox");

  errorBox.style.display = "none";

  if(res.status === "duplicate"){
    document.getElementById("errorMsg").innerText = "This email is already registered.";
    errorBox.style.display = "block";
    return;
  }

  // 🔥 SUCCESS FLOW
  const name = document.getElementById("name").value;

  document.getElementById("referralForm").style.display = "none";
  successBox.style.display = "block";

  document.getElementById("successMsg").innerText =
    `Nice to have you, ${name}! Your referral code has been sent to your email.`;

  // 🔥 AUTO CLOSE AFTER 3 SEC
  setTimeout(() => {
    function closeForm() {
  document.querySelector(".popup").classList.remove("active");

  document.getElementById("referralForm").style.display = "block";
  document.getElementById("successBox").style.display = "none";
  document.getElementById("errorBox").style.display = "none";

  document.getElementById("referralForm").reset();
};
  }, 3000);

})

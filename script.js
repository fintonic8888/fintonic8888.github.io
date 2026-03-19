document.addEventListener("DOMContentLoaded", function () {
// THEME TOGGLE
const toggle = document.getElementById("themeToggle");

toggle.onclick = function () {
  document.body.classList.toggle("dark");
};

// POPUP
window.openForm = function(){
  document.getElementById("popupForm").classList.add("active");
}

window.closeForm = function(){
  document.getElementById("popupForm").classList.remove("active");

  // reset UI
  document.getElementById("referralForm").style.display = "block";
  document.getElementById("successBox").style.display = "none";
  document.getElementById("errorBox").style.display = "none";

  document.getElementById("referralForm").reset();
}

// CLOSE ON OUTSIDE CLICK
window.onclick = function(e){
  const popup = document.getElementById("popupForm");
  if(e.target === popup){
    closeForm();
  }
};

// FORM SUBMIT

document.getElementById("referralForm").addEventListener("submit", function(e){
  e.preventDefault();

const btn = document.getElementById("submitBtn");
const btnText = document.getElementById("btnText");
const loader = document.getElementById("loader");

// fallback safety
if(btn && btnText && loader){
  btn.disabled = true;
  btnText.style.display = "none";
  loader.style.display = "inline-block";
}

  const agree = document.getElementById("agree").checked;

  if(!agree){
    alert("Please accept the terms.");
    return;
  }

  // 🔥 START LOADER
  btn.disabled = true;
  btnText.style.display = "none";
  loader.style.display = "inline-block";

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

    // 🔥 STOP LOADER
    if(btn && btnText && loader){
  btn.disabled = false;
  btnText.style.display = "inline";
  loader.style.display = "none";
}

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
      closeForm();
    }, 5000);

  })
  .catch(() => {

    // 🔥 STOP LOADER ON ERROR
    btn.disabled = false;
    btnText.style.display = "inline";
    loader.style.display = "none";

    document.getElementById("errorMsg").innerText = "Something went wrong. Please try again.";
    document.getElementById("errorBox").style.display = "block";

  });
});
  });

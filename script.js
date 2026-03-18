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
    if(res.status === "duplicate"){
      alert("Email already registered!");
    } else {
      alert("Success! Check your email for referral code.");
      closeForm();
    }
  })
  .catch(() => alert("Error submitting form"));
});

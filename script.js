document.addEventListener("DOMContentLoaded", function () {

const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const popup = document.getElementById("popupForm");
// CLOSE WHEN CLICKING OUTSIDE FORM
popup.addEventListener("click", function(e) {
  if (e.target === popup) {
    closeForm();
  }
});

const form = document.getElementById("referralForm");
const successBox = document.getElementById("successBox");
const errorBox = document.getElementById("errorBox");

const submitBtn = document.getElementById("submitBtn");
const btnText = document.getElementById("btnText");
const loader = document.getElementById("loader");

openBtn.onclick = () => popup.classList.add("active");
closeBtn.onclick = closeForm;

function closeForm(){
  popup.classList.remove("active");
  form.style.display = "block";
  successBox.style.display = "none";
  errorBox.style.display = "none";
  form.reset();
}

form.addEventListener("submit", function(e){
  e.preventDefault();

  if(!document.getElementById("agree").checked){
    alert("Please accept terms");
    return;
  }

  submitBtn.disabled = true;
  btnText.style.display = "none";
  loader.style.display = "inline";

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");

const data = {
  name: nameInput ? nameInput.value.trim() : "",
  phone: phoneInput ? phoneInput.value.trim() : "",
  email: emailInput ? emailInput.value.trim() : ""
};

  fetch("https://script.google.com/macros/s/AKfycbxaxhcLJ7TasZG-u08U7VFfTuXOiF_y-wwUJXfnwJ6md3P6JCnjoRGA5TJVj1pPsZi8Dw/exec", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {

    submitBtn.disabled = false;
    btnText.style.display = "inline";
    loader.style.display = "none";

    if(res.status === "duplicate"){
      errorBox.style.display = "block";
      document.getElementById("errorMsg").innerText = "Email already exists";
      return;
    }

    form.style.display = "none";
    successBox.style.display = "block";
    document.getElementById("successMsg").innerText =
      "Check your email for referral code";

  })
  .catch(() => {
    submitBtn.disabled = false;
    btnText.style.display = "inline";
    loader.style.display = "none";

    errorBox.style.display = "block";
    document.getElementById("errorMsg").innerText = "Error submitting form";
  });

});

});

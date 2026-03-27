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

<script>
document.addEventListener("DOMContentLoaded", function() {

// OPEN BUTTON
document.getElementById("openBtn3").onclick = function() {
  document.getElementById("emiModal").style.display = "block";
};

// CLOSE BUTTON
document.getElementById("closeEmi").onclick = function() {
  document.getElementById("emiModal").style.display = "none";
};

// CLOSE ON OUTSIDE CLICK
window.onclick = function(e) {
  let modal = document.getElementById("emiModal");
  if (e.target == modal) {
    modal.style.display = "none";
  }
};

// SLIDERS
let loanSlider = document.getElementById("loanSlider");
let rateSlider = document.getElementById("rateSlider");
let tenureSlider = document.getElementById("tenureSlider");

let loanValue = document.getElementById("loanValue");
let rateValue = document.getElementById("rateValue");
let tenureValue = document.getElementById("tenureValue");

let emiResult = document.getElementById("emiResult");

// CALCULATION
function calculateEMI() {
  let loan = loanSlider.value;
  let rate = rateSlider.value / 12 / 100;
  let tenure = tenureSlider.value * 12;

  let emi = loan * rate * Math.pow(1+rate, tenure) / (Math.pow(1+rate, tenure) - 1);

  emiResult.innerText = "Monthly EMI: ₹" + Math.round(emi);
}

// LIVE UPDATE
loanSlider.oninput = function() {
  loanValue.innerText = "₹" + loanSlider.value;
  calculateEMI();
};

rateSlider.oninput = function() {
  rateValue.innerText = rateSlider.value + "%";
  calculateEMI();
};

tenureSlider.oninput = function() {
  tenureValue.innerText = tenureSlider.value + " years";
  calculateEMI();
};

// DEFAULT VALUES
loanSlider.value = 1000000;
rateSlider.value = 10;
tenureSlider.value = 20;

loanValue.innerText = "₹" + loanSlider.value;
rateValue.innerText = rateSlider.value + "%";
tenureValue.innerText = tenureSlider.value + " years";

calculateEMI();

});
</script>

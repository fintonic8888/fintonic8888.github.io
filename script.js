document.addEventListener("DOMContentLoaded", function () {

  // ================= REFER FORM =================
  const openBtn = document.getElementById("openBtn2");
  const closeBtn = document.getElementById("closeBtn");
  const popup = document.getElementById("popupForm");

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

  if(openBtn){   openBtn.onclick = () => popup.classList.add("active"); }
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

  // ================= EMI CALCULATOR =================

function initEMI() {

  const openBtn3 = document.getElementById("openBtn3");
  const emiModal = document.getElementById("emiModal");
  const closeEmi = document.getElementById("closeEmi");

  if (!openBtn3 || !emiModal || !closeEmi) return;

  // OPEN / CLOSE
  openBtn3.onclick = () => emiModal.style.display = "block";
  closeEmi.onclick = () => emiModal.style.display = "none";

  emiModal.addEventListener("click", function(e) {
    if (e.target === emiModal) {
      emiModal.style.display = "none";
    }
  });

  const loanSlider = document.getElementById("loanSlider");
  const rateSlider = document.getElementById("rateSlider");
  const tenureSlider = document.getElementById("tenureSlider");

  const loanInput = document.getElementById("loanInput");
  const rateInput = document.getElementById("rateInput");
  const tenureInput = document.getElementById("tenureInput");

  const emiResult = document.getElementById("emiResult");

  function calculateEMI() {
    const loan = Number(loanInput.value);
    const rate = Number(rateInput.value) / 12 / 100;
    const tenure = Number(tenureInput.value) * 12;

    if (!loan || !rate || !tenure) return;

    const emi = loan * rate * Math.pow(1 + rate, tenure) / (Math.pow(1 + rate, tenure) - 1);

    emiResult.innerText = "Monthly EMI: ₹" + Math.round(emi);
  }

  function sync(slider, input) {
    slider.addEventListener("input", () => {
      input.value = slider.value;
      calculateEMI();
    });

    input.addEventListener("input", () => {
      if (input.value < input.min) input.value = input.min;
      if (input.value > input.max) input.value = input.max;

      slider.value = input.value;
      calculateEMI();
    });
  }

  sync(loanSlider, loanInput);
  sync(rateSlider, rateInput);
  sync(tenureSlider, tenureInput);

  // DEFAULT VALUES
  loanSlider.value = 1000000;
  rateSlider.value = 10;
  tenureSlider.value = 20;

  loanInput.value = loanSlider.value;
  rateInput.value = rateSlider.value;
  tenureInput.value = tenureSlider.value;

  calculateEMI();
}

// CALL inside DOMContentLoaded
initEMI();

});

const steps = document.querySelectorAll(".form-step");

const nextBtns = document.querySelectorAll(".next-btn");

const prevBtns = document.querySelectorAll(".prev-btn");

const progressFill = document.getElementById("progressFill");

const progressSteps = document.querySelectorAll(".step");

const form = document.getElementById("multiStepForm");
const submitBtn = document.querySelector(".submit-btn");

const toast = document.getElementById("toast");

let currentStep = 0;

/* ======================================================
   SHOW STEP
====================================================== */

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
  });

  progressSteps.forEach((step, i) => {
    step.classList.toggle("active", i <= index);
  });

  const progress = ((index + 1) / steps.length) * 100;

  progressFill.style.width = progress + "%";

  localStorage.setItem("registerStep", index);
}

/* ======================================================
   VALIDATION
====================================================== */

function validateStep(step) {
  const inputs = step.querySelectorAll("input[required], textarea[required]");

  let valid = true;

  inputs.forEach((input) => {
    input.classList.remove("error");

    if (
      (input.type === "checkbox" && !input.checked) ||
      (input.type === "radio" &&
        !document.querySelector(`input[name="${input.name}"]:checked`)) ||
      (!input.value.trim() && input.type !== "radio")
    ) {
      input.classList.add("error");
      valid = false;
    }

    if (input.type === "email" && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(input.value)) {
        input.classList.add("error");
        valid = false;
      }
    }
  });

  return valid;
}

/* ======================================================
   NEXT
====================================================== */

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const current = steps[currentStep];

    if (!validateStep(current)) {
      alert("Please complete all required fields correctly.");

      return;
    }

    currentStep++;

    showStep(currentStep);
  });
});

/* ======================================================
   PREVIOUS
====================================================== */

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentStep--;

    showStep(currentStep);
  });
});

/* ======================================================
   AUTOSAVE
====================================================== */

const allInputs = document.querySelectorAll("input, textarea");

allInputs.forEach((input, index) => {
  const key = "field_" + index;

  if (localStorage.getItem(key)) {
    if (input.type === "checkbox") {
      input.checked = localStorage.getItem(key) === "true";
    } else {
      input.value = localStorage.getItem(key);
    }
  }

  input.addEventListener("input", () => {
    if (input.type === "checkbox") {
      localStorage.setItem(key, input.checked);
    } else {
      localStorage.setItem(key, input.value);
    }
  });
});

/* ======================================================
   RESTORE STEP
====================================================== */

const savedStep = localStorage.getItem("registerStep");

if (savedStep) {
  currentStep = parseInt(savedStep);

  showStep(currentStep);
}

/* ======================================================
   SUBMIT + EMAILJS
====================================================== */

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // validate last step
  if (!validateStep(steps[currentStep])) {
    alert("Please complete all required fields.");
    return;
  }

  // collect values
  const templateParams = {
    company_logo:
      "https://swift-trip-holidays.vercel.app/assets/images/logo.jpeg",

    full_name: document.querySelector('[name="full_name"]')?.value || "",

    dob: document.querySelector('[name="dob"]')?.value || "",

    gender: document.querySelector('input[name="gender"]:checked')?.value || "",

    nationality: document.querySelector('[name="nationality"]')?.value || "",

    marital_status:
      document.querySelector('[name="marital_status"]')?.value || "",

    phone: document.querySelector('[name="phone"]')?.value || "",

    whatsapp: document.querySelector('[name="whatsapp"]')?.value || "",

    email: document.querySelector('[name="email"]')?.value || "",

    address: document.querySelector('[name="address"]')?.value || "",

    passport: document.querySelector('[name="passport"]')?.value || "",

    passport_issue:
      document.querySelector('[name="passport_issue"]')?.value || "",

    passport_expiry:
      document.querySelector('[name="passport_expiry"]')?.value || "",

    passport_country:
      document.querySelector('[name="passport_country"]')?.value || "",

    brp: document.querySelector('[name="brp"]')?.value || "",

    uk_status:
      document.querySelector('input[name="uk_status"]:checked')?.value || "",

    destination: document.querySelector('[name="destination"]')?.value || "",

    travel_date: document.querySelector('[name="travel_date"]')?.value || "",

    return_date: document.querySelector('[name="return_date"]')?.value || "",

    purpose:
      document.querySelector('input[name="purpose"]:checked')?.value || "",

    employment:
      document.querySelector('input[name="employment"]:checked')?.value || "",

    employer: document.querySelector('[name="employer"]')?.value || "",

    income: document.querySelector('[name="income"]')?.value || "",

    documents: [...document.querySelectorAll('input[name="documents"]:checked')]
      .map((doc) => doc.value)
      .join(", "),
  };

  emailjs
    .send(
      "service_so7sf9k",
      "template_uvoazx8",
      templateParams,
      "_s4w3GtgFpIO3lZPL",
    )

    .then(() => {
      toast.classList.add("show");

      setTimeout(() => {
        toast.classList.remove("show");

        form.reset();

        localStorage.clear();

        currentStep = 0;

        showStep(currentStep);

        window.location.href = "thankyou.html";
      }, 5000);
    })

    .catch((error) => {
      console.log(error);

      alert("Email failed. Please try again.");
    });
});
/* ======================================================
   CLEAR
====================================================== */

form.addEventListener("reset", () => {
  localStorage.clear();

  setTimeout(() => {
    currentStep = 0;

    showStep(currentStep);
  }, 100);
});

showStep(currentStep);

let submitbtn = document.querySelector(".submit-btn");

submitbtn.addEventListener("click", () => {
  window.location.href = "thankyou.html";
  form.submit();
  toast.classList.add("show");

  setTimeout(() => {
    window.location.href = "thankyou.html";
  }, 0);
});


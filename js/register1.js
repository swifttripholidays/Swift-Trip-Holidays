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

  if (progressFill) {
    progressFill.style.width = progress + "%";
  }

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
      (!input.value?.trim() &&
        input.type !== "radio" &&
        input.type !== "checkbox")
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

    if (currentStep < steps.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  });
});

/* ======================================================
   PREVIOUS
====================================================== */

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });
});

/* ======================================================
   AUTOSAVE
====================================================== */

const allInputs = document.querySelectorAll("input, textarea");

allInputs.forEach((input, index) => {
  const key = "field_" + index;

  const saved = localStorage.getItem(key);

  if (saved !== null) {
    if (input.type === "checkbox" || input.type === "radio") {
      input.checked = saved === "true";
    } else {
      input.value = saved;
    }
  }

  input.addEventListener("input", () => {
    if (input.type === "checkbox" || input.type === "radio") {
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

if (savedStep !== null) {
  currentStep = parseInt(savedStep);
}

showStep(currentStep);

/* ======================================================
   SUBMIT + EMAILJS
====================================================== */

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (!validateStep(steps[currentStep])) {
    alert("Please complete all fields.");
    return;
  }

  const templateParams = {
    company_logo:
      "https://swift-trip-holidays.vercel.app/assets/images/logo.jpeg",

    full_name: document.getElementById("fullName")?.value || "",

    dob: document.getElementById("dob")?.value || "",

    nationality: document.getElementById("nationality")?.value || "",

    phone: document.getElementById("phone")?.value || "",

    whatsapp: document.getElementById("whatsapp")?.value || "",

    email: document.getElementById("email")?.value || "",

    address: document.getElementById("address")?.value || "",

    gender: document.querySelector('input[name="gender"]:checked')?.value || "",

    passport: document.getElementById("passport")?.value || "",

    destination: document.getElementById("destination")?.value || "",

    documents: [...document.querySelectorAll('input[name="documents"]:checked')]
      .map((doc) => doc.value)
      .join(", "),
  };

  emailjs
    .send(
      "service_jph6m4h",
      "template_uvoazx8",
      templateParams,
      "_s4w3GtgFpIO3lZPL",
    )

    .then(() => {
      toast?.classList.add("show");

      setTimeout(() => {
        toast?.classList.remove("show");

        form.reset();

        localStorage.clear();

        currentStep = 0;

        showStep(currentStep);

        window.location.href = "thankyou.html";
      }, 3000);
    })

    .catch((error) => {
      console.log("Email Error:", error);

      alert("Email failed. Try again.");
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

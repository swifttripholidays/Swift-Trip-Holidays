document.addEventListener("DOMContentLoaded", () => {
  /* AOS */
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 900,
      once: true,
    });
  }

  /* Particles */
  if (
    typeof particlesJS !== "undefined" &&
    document.getElementById("particles-contact")
  ) {
    particlesJS("particles-contact", {
      particles: {
        number: {
          value: 90,
        },

        color: {
          value: "#f7941d",
        },

        shape: {
          type: "circle",
        },

        opacity: {
          value: 0.4,
        },

        size: {
          value: 3,
          random: true,
        },

        line_linked: {
          enable: true,
          distance: 140,
          color: "#ffffff",
          opacity: 0.15,
        },

        move: {
          enable: true,
          speed: 1.6,
        },
      },
    });
  }

  /* Contact Form */
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const msg = document.getElementById("form-msg");

      if (msg) {
        msg.style.display = "block";
        msg.innerHTML = "✅ Message Sent Successfully!";
      }

      contactForm.reset();

      setTimeout(() => {
        if (msg) {
          msg.style.display = "none";
        }
      }, 4000);
    });
  }
});

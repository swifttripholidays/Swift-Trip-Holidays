document.addEventListener("DOMContentLoaded", () => {
  /* AOS */

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 900,
      once: true,
    });
  }

  /* PARTICLES */

  if (
    typeof particlesJS !== "undefined" &&
    document.getElementById("particles-terms")
  ) {
    particlesJS("particles-terms", {
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
          random: true,
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

      interactivity: {
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },

          onclick: {
            enable: true,
            mode: "push",
          },
        },
      },

      retina_detect: true,
    });
  }
});

/* FINAL EMERGENCY FIX */

window.addEventListener("load", () => {
  setTimeout(() => {
    document
      .querySelectorAll(
        `
      .card,
      .country-card,
      .policy-card,
      .glass-card,
      .timeline-item,
      .process-card,
      [data-aos]
   `,
      )
      .forEach((el) => {
        el.style.opacity = "1";
        el.style.visibility = "visible";
        el.style.transform = "translateY(0)";
      });
  }, 500);
});
